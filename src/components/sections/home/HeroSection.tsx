"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import EcommerceHeroAnimation from "./EcommerceHeroAnimation";
import { fadeUp, stagger } from "@/lib/animations";

export default function HeroSection() {
    const { user } = useAuth();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-[92vh] w-full max-w-[100vw] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/40 to-violet-100/40 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10 w-full overflow-hidden">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="grid grid-cols-2 gap-2 sm:gap-6 lg:gap-12 items-center"
                >
                    {/* Left – Text */}
                    <div className="text-left min-w-0 col-span-1">
                        <motion.div
                            variants={fadeUp}
                            custom={0}
                            className="inline-flex items-center gap-1 sm:gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-[8px] sm:text-xs font-bold px-2 py-1 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-6"
                        >
                            <Sparkles className="w-2 h-2 sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">New Season Collection 2026</span>
                            <span className="sm:hidden">New Season</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            custom={1}
                            className="text-2xl min-[400px]:text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05] sm:leading-[1.08]"
                        >
                            Discover{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent block sm:inline">
                                Premium
                            </span>{" "}
                            Products
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            className="mt-2 sm:mt-6 text-gray-500 text-[10px] min-[400px]:text-xs sm:text-lg max-w-md mx-0 leading-snug sm:leading-relaxed pr-2 sm:pr-0"
                        >
                            Curated collections of the finest products at unbeatable prices.
                        </motion.p>
                    </div>

                    {/* Right – Animated Product Showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                        className="relative block min-w-0 w-full flex items-center justify-center col-span-1 lg:row-span-2"
                    >
                        <EcommerceHeroAnimation />
                    </motion.div>

                    {/* Bottom – Buttons & Trust */}
                    <div className="col-span-2 lg:col-span-1 w-full text-center lg:text-left mt-2 sm:mt-0">
                        <motion.div
                            variants={fadeUp}
                            custom={3}
                            className="mt-0 sm:mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="/menu"
                                className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 text-white font-bold px-3 py-2 sm:px-8 sm:py-4 text-[12px] sm:text-base rounded-lg sm:rounded-2xl hover:bg-blue-700 shadow-lg sm:shadow-xl shadow-blue-200/50 transition-all hover:-translate-y-0.5"
                            >
                                Shop Now
                                <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5" />
                            </Link>
                            {!user && mounted && (
                                <Link
                                    href="/register"
                                    className="hidden sm:inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 text-base rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                                >
                                    Create Account
                                </Link>
                            )}
                        </motion.div>

                        {/* Trust Row */}
                        <motion.div
                            variants={fadeUp}
                            custom={4}
                            className="mt-4 sm:mt-8 hidden min-[400px]:flex items-center gap-2 sm:gap-4 justify-center lg:justify-start"
                        >
                            <div className="flex -space-x-1 sm:-space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-5 h-5 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 border sm:border-2 border-white flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-0.5 sm:gap-1 justify-center lg:justify-start">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-[8px] sm:text-[11px] text-gray-400 font-medium mt-0.5">
                                    <span className="text-gray-700 font-bold">50k+</span> shoppers
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
