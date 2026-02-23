"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, Shield, Package, Settings, LogOut, Star, Heart, ChevronRight, Edit3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type SectionKey = "account" | "orders" | "wishlist" | "security";

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [activeSection, setActiveSection] = useState<SectionKey>("account");
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <User className="w-10 h-10 text-gray-300" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h1>
                <p className="text-gray-500 mb-8 max-w-xs">You need to be logged in to view your profile and manage your account.</p>
                <Link
                    href="/login"
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                    Log In
                </Link>
            </div>
        );
    }

    const sidebarItems: { key: SectionKey; icon: React.ElementType; label: string }[] = [
        { key: "orders", icon: Package, label: "My Orders" },
        { key: "wishlist", icon: Heart, label: "Wishlist" },
        { key: "security", icon: Shield, label: "Security" },
        { key: "account", icon: Settings, label: "Account Details" },
    ];

    return (
        <div className="min-h-screen bg-gray-100/80">
            {/* Profile Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 pt-10 pb-12 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-5 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-2xl font-extrabold text-white mb-1">{user.name}</h1>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 text-sm">
                            {user.email ? <><Mail className="w-4 h-4" />{user.email}</> : <><Phone className="w-4 h-4" />{user.phone}</>}
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider mb-0.5">Status</p>
                        <p className="text-white font-bold text-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Gold Member
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Layout: Sidebar + Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col md:flex-row gap-5">

                    {/* ─── Sidebar ─── */}
                    <aside className="w-full md:w-64 shrink-0">
                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                            className="md:hidden w-full flex items-center justify-between bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 mb-3 font-semibold text-gray-700"
                        >
                            <span className="flex items-center gap-2">
                                <Settings className="w-4 h-4 text-blue-600" />
                                {sidebarItems.find(i => i.key === activeSection)?.label}
                            </span>
                            <ChevronRight className={`w-4 h-4 transition-transform ${mobileSidebarOpen ? "rotate-90" : ""}`} />
                        </button>

                        {/* Sidebar content — always visible on desktop, toggle on mobile */}
                        <div className={`${mobileSidebarOpen ? "block" : "hidden"} md:block`}>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {sidebarItems.map((item) => {
                                    const isActive = activeSection === item.key;
                                    return (
                                        <button
                                            key={item.key}
                                            onClick={() => {
                                                setActiveSection(item.key);
                                                setMobileSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-5 py-4 text-left text-sm font-medium transition-all border-l-4 ${isActive
                                                ? "bg-blue-50/60 text-blue-700 border-blue-600 font-semibold"
                                                : "text-gray-600 hover:bg-gray-50 border-transparent hover:text-gray-900"
                                                }`}
                                        >
                                            <item.icon className={`w-[18px] h-[18px] ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                            {item.label}
                                        </button>
                                    );
                                })}

                                {/* Logout */}
                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-3 px-5 py-4 text-left text-sm font-medium text-red-500 hover:bg-red-50 transition-all border-l-4 border-transparent"
                                >
                                    <LogOut className="w-[18px] h-[18px]" />
                                    Logout
                                </button>
                            </div>

                            {/* Loyalty Card (Moved to Sidebar) */}
                            <div className="mt-5 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white relative overflow-hidden group shadow-lg shadow-indigo-100">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <Star className="w-20 h-20 text-white" />
                                </div>
                                <p className="text-indigo-100 font-bold text-[10px] uppercase tracking-wider mb-1">Loyalty Program</p>
                                <h2 className="text-lg font-black leading-tight mb-3">You&apos;re close to Platinum!</h2>
                                <button className="w-full py-2 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl text-xs border border-white/30 hover:bg-white hover:text-indigo-700 transition-all">
                                    View Perks
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* ─── Main Content Area ─── */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {activeSection === "account" && (
                                <motion.div
                                    key="account"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    {/* Account Details Card */}
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                                <p className="text-sm text-gray-400 mt-1">Manage your identity and contact details.</p>
                                            </div>
                                            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all">
                                                <Edit3 className="w-4 h-4" /> Edit Profile
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                                    <User className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                                                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                                                    <Mail className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                                                    <p className="text-sm font-bold text-gray-800">{user.email || "Not Linked"}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                                                    <Phone className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
                                                    <p className="text-sm font-bold text-gray-800">{user.phone || "Not Linked"}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                                                        <Star className="w-5 h-5 text-yellow-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Membership</label>
                                                        <p className="text-sm font-bold text-gray-800">Gold Member</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                                                        <Settings className="w-5 h-5 text-indigo-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Member Since</label>
                                                        <p className="text-sm font-bold text-gray-800">January 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { value: "12", label: "Orders" },
                                            { value: "3", label: "Coupons" },
                                            { value: "840", label: "Points" },
                                        ].map((stat) => (
                                            <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
                                                <p className="text-2xl font-black text-gray-900 leading-none mb-1">{stat.value}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>



                                    {/* Logout Session Button */}
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => logout()}
                                        className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all border border-red-100/50"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout Session
                                    </motion.button>
                                </motion.div>
                            )}

                            {activeSection === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-lg font-bold text-gray-900 mb-2">My Orders</h2>
                                        <p className="text-sm text-gray-500 mb-6">Track and manage your past and current orders.</p>
                                        <div className="border border-dashed border-gray-200 rounded-xl p-10 text-center">
                                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-400 font-medium text-sm">Your order history will appear here.</p>
                                            <Link href="/orders" className="inline-block mt-4 text-blue-600 font-semibold text-sm hover:underline">
                                                View All Orders →
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === "wishlist" && (
                                <motion.div
                                    key="wishlist"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-lg font-bold text-gray-900 mb-2">Wishlist</h2>
                                        <p className="text-sm text-gray-500 mb-6">Products you&apos;ve saved for later.</p>
                                        <div className="border border-dashed border-gray-200 rounded-xl p-10 text-center">
                                            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-400 font-medium text-sm">Your wishlist items will appear here.</p>
                                            <Link href="/wishlist" className="inline-block mt-4 text-blue-600 font-semibold text-sm hover:underline">
                                                View Wishlist →
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === "security" && (
                                <motion.div
                                    key="security"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-lg font-bold text-gray-900 mb-2">Security</h2>
                                        <p className="text-sm text-gray-500 mb-6">Manage your password and security settings.</p>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">Password</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">Last changed: Never</p>
                                                </div>
                                                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                                                    Change
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">Two-Factor Authentication</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">Add extra security to your account</p>
                                                </div>
                                                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                                                    Enable
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">Active Sessions</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">1 active session</p>
                                                </div>
                                                <button className="text-red-500 text-sm font-semibold hover:text-red-600 transition-colors">
                                                    Sign Out All
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
