"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, ArrowRight, Loader2, ShieldCheck, RotateCcw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier | undefined;
        confirmationResult: ConfirmationResult | undefined;
    }
}

type AuthTab = "email" | "phone";
type PhoneStep = "input" | "otp";

const LoginPage = () => {
    const [tab, setTab] = useState<AuthTab>("email");

    // Email state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Phone state
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [phoneStep, setPhoneStep] = useState<PhoneStep>("input");
    const [sending, setSending] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const { login, loginWithPhone, loading, error, clearError } = useAuth();
    const router = useRouter();
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);
    const verifierRef = useRef<RecaptchaVerifier | null>(null);
    const recaptchaInitialized = useRef(false);

    // Initialize invisible reCAPTCHA when phone tab is active
    useEffect(() => {
        if (tab !== "phone" || verifierRef.current || recaptchaInitialized.current) return;

        recaptchaInitialized.current = true;

        const timer = setTimeout(() => {
            try {
                if (!verifierRef.current && recaptchaContainerRef.current) {
                    // Safety: clear container content
                    recaptchaContainerRef.current.innerHTML = "";

                    const v = new RecaptchaVerifier(
                        auth,
                        recaptchaContainerRef.current,
                        { size: "invisible" }
                    );
                    v.render().then(() => {
                        verifierRef.current = v;
                        window.recaptchaVerifier = v;
                    });
                }
            } catch (err) {
                console.error("reCAPTCHA init error:", err);
                recaptchaInitialized.current = false;
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [tab]);

    // Cleanup reCAPTCHA on unmount
    useEffect(() => {
        return () => {
            if (verifierRef.current) {
                try {
                    verifierRef.current.clear();
                } catch (e) {
                    console.warn("reCAPTCHA cleanup error:", e);
                }
                verifierRef.current = null;
                window.recaptchaVerifier = undefined;
                recaptchaInitialized.current = false;
            }
        };
    }, []);

    // Resend countdown
    useEffect(() => {
        if (resendTimer <= 0) return;
        const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [resendTimer]);

    // ─── Email Login ───
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        try {
            await login(email, password);
            router.push("/");
        } catch {
            // error is set in context
        }
    };

    // ─── Send OTP ───
    const sendOTP = useCallback(async () => {
        clearError();
        const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

        if (!verifierRef.current) {
            alert("reCAPTCHA not ready. Please refresh the page.");
            return;
        }

        setSending(true);
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifierRef.current);
            window.confirmationResult = confirmationResult;
            setPhoneStep("otp");
            setResendTimer(30);
            setTimeout(() => otpRefs.current[0]?.focus(), 100);
        } catch (err: any) {
            console.error("Send OTP error:", err);
            if (err.code === "auth/billing-not-enabled") {
                alert("Firebase Phone Auth requires a billing account or 'Test Phone Numbers'. \n\nTo fix this:\n1. Open Firebase Console\n2. Go to Authentication > Search 'Test Phone Numbers'\n3. Add your number and a fixed code (e.g. 123456) for testing.");
            } else {
                alert(err instanceof Error ? err.message : "Failed to send OTP");
            }

            // Critical: Always clear and recreate on failure
            if (verifierRef.current) {
                try { verifierRef.current.clear(); } catch (e) { }
                verifierRef.current = null;
                window.recaptchaVerifier = undefined;
            }
            recaptchaInitialized.current = false;

            setTimeout(() => {
                try {
                    if (!verifierRef.current && recaptchaContainerRef.current) {
                        recaptchaContainerRef.current.innerHTML = "";
                        const v = new RecaptchaVerifier(auth, recaptchaContainerRef.current, { size: "invisible" });
                        v.render().then(() => {
                            verifierRef.current = v;
                            window.recaptchaVerifier = v;
                            recaptchaInitialized.current = true;
                        });
                    }
                } catch (e) {
                    console.error("reCAPTCHA re-init failed:", e);
                    recaptchaInitialized.current = false;
                }
            }, 500);
        } finally {
            setSending(false);
        }
    }, [phone, clearError]);

    // ─── Verify OTP ───
    const verifyOTP = useCallback(async () => {
        const code = otp.join("");
        if (code.length !== 6 || !window.confirmationResult) return;
        clearError();
        try {
            const result = await window.confirmationResult.confirm(code);
            const idToken = await result.user.getIdToken();
            const phoneNumber = result.user.phoneNumber || phone;
            await loginWithPhone(idToken, phoneNumber);
            router.push("/");
        } catch {
            alert("Invalid OTP. Please try again.");
            setOtp(["", "", "", "", "", ""]);
            otpRefs.current[0]?.focus();
        }
    }, [otp, phone, loginWithPhone, clearError, router]);

    // OTP input handlers
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
        if (e.key === "Enter" && otp.join("").length === 6) verifyOTP();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted.length) return;
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) newOtp[i] = pasted[i] || "";
        setOtp(newOtp);
        otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.replace(/\D/g, "").length >= 10) sendOTP();
    };

    const switchTab = (newTab: AuthTab) => {
        clearError();
        setTab(newTab);
        if (newTab === "phone") setPhoneStep("input");
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100"
            >
                {/* ─── Tab Switcher ─── */}
                <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
                    <button
                        onClick={() => switchTab("email")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${tab === "email" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Mail className="w-4 h-4" /> Email
                    </button>
                    <button
                        onClick={() => switchTab("phone")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${tab === "phone" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Phone className="w-4 h-4" /> Phone OTP
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {/* ═══════════ EMAIL TAB ═══════════ */}
                    {tab === "email" && (
                        <motion.div key="email-tab" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-3">
                                    <Mail className="w-7 h-7" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                                <p className="text-gray-500 mt-1 text-sm">Sign in with your email and password</p>
                            </div>

                            {error && (
                                <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">{error}</div>
                            )}

                            <form onSubmit={handleEmailLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm disabled:opacity-50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm disabled:opacity-50" />
                                </div>
                                <button type="submit" disabled={loading}
                                    className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : <>Login In <ArrowRight className="w-5 h-5" /></>}
                                </button>
                            </form>

                            <p className="text-center text-sm text-gray-500 mt-6">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700">Register</Link>
                            </p>
                        </motion.div>
                    )}

                    {/* ═══════════ PHONE TAB ═══════════ */}
                    {tab === "phone" && (
                        <motion.div key="phone-tab" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                            <AnimatePresence mode="wait">
                                {/* ── Phone Number Input ── */}
                                {phoneStep === "input" && (
                                    <motion.div key="phone-input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 text-green-600 mb-3">
                                                <Phone className="w-7 h-7" />
                                            </div>
                                            <h1 className="text-2xl font-bold text-gray-900">Phone Login</h1>
                                            <p className="text-gray-500 mt-1 text-sm">Enter your mobile number to get OTP</p>
                                        </div>

                                        {error && (
                                            <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">{error}</div>
                                        )}

                                        <form onSubmit={handlePhoneSubmit} className="space-y-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number</label>
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-sm font-semibold text-gray-500">+91</span>
                                                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" maxLength={10} disabled={sending}
                                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-widest disabled:opacity-50" />
                                                </div>
                                            </div>
                                            <button type="submit" disabled={sending || phone.length < 10}
                                                className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                                {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending OTP...</> : <>Send OTP <ArrowRight className="w-5 h-5" /></>}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {/* ── OTP Verification ── */}
                                {phoneStep === "otp" && (
                                    <motion.div key="otp-verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="text-center mb-6">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 text-green-600 mb-3">
                                                <ShieldCheck className="w-7 h-7" />
                                            </div>
                                            <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
                                            <p className="text-gray-500 mt-1 text-sm">
                                                Enter the 6-digit code sent to <span className="font-bold text-gray-800">+91 {phone}</span>
                                            </p>
                                        </div>

                                        {error && (
                                            <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">{error}</div>
                                        )}

                                        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
                                            {otp.map((digit, index) => (
                                                <input key={index} ref={(el) => { otpRefs.current[index] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} disabled={loading}
                                                    className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all disabled:opacity-50" />
                                            ))}
                                        </div>

                                        <button onClick={verifyOTP} disabled={loading || otp.join("").length !== 6}
                                            className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mb-4">
                                            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</> : <>Verify & Login <ShieldCheck className="w-5 h-5" /></>}
                                        </button>

                                        <div className="flex items-center justify-between text-sm">
                                            <button onClick={() => { setPhoneStep("input"); setOtp(["", "", "", "", "", ""]); clearError(); }} className="text-gray-500 hover:text-gray-700 font-medium transition-colors">← Change Number</button>
                                            <button onClick={sendOTP} disabled={resendTimer > 0 || sending} className="flex items-center gap-1 text-green-600 font-semibold hover:text-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                <RotateCcw className="w-3.5 h-3.5" /> {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Invisible reCAPTCHA container */}
                {/* Hidden reCAPTCHA container and badge styling */}
                <div ref={recaptchaContainerRef} className="hidden" />
                <style jsx global>{`
                    .grecaptcha-badge { visibility: hidden !important; }
                `}</style>
            </motion.div>
        </div>
    );
};

export default LoginPage;
