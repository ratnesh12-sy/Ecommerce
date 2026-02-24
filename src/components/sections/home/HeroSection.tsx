"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
};

export default function HeroSection() {
    return (
        <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/40 to-violet-100/40 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left – Text */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            variants={fadeUp}
                            custom={0}
                            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            New Season Collection 2026
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            custom={1}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 leading-[1.08]"
                        >
                            Discover{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                Premium
                            </span>{" "}
                            Products
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            className="mt-6 text-gray-500 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed"
                        >
                            Curated collections of the finest products at unbeatable prices. Shop smart, live better.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            custom={3}
                            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="/menu"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200/50 transition-all hover:shadow-blue-300/60 hover:-translate-y-0.5 active:translate-y-0 group"
                            >
                                Shop Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                            >
                                Create Account
                            </Link>
                        </motion.div>

                        {/* Trust Row */}
                        <motion.div
                            variants={fadeUp}
                            custom={4}
                            className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                                    Trusted by <span className="text-gray-700 font-bold">50k+</span> shoppers
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right – Product showcase cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-[3rem] blur-2xl" />

                            {/* Main product card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="absolute top-8 left-8 right-8 bottom-8 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden"
                            >
                                <div className="relative w-full h-3/4">
                                    <Image
                                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                                        alt="Featured Product"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Featured</p>
                                    <h3 className="font-bold text-gray-900 mt-1">Premium Headphones</h3>
                                    <p className="text-blue-600 font-black text-lg mt-1">$299.99</p>
                                </div>
                            </motion.div>

                            {/* Floating badge – top right */}
                            <motion.div
                                animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                                className="absolute -top-2 -right-2 bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 px-4 py-3 flex items-center gap-2"
                            >
                                <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">Sales</p>
                                    <p className="text-sm font-black text-gray-900">+24%</p>
                                </div>
                            </motion.div>

                            {/* Floating badge – bottom left */}
                            <motion.div
                                animate={{ y: [0, 6, 0], rotate: [0, -2, 0] }}
                                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 px-4 py-3 flex items-center gap-3"
                            >
                                <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">Rating</p>
                                    <p className="text-sm font-black text-gray-900">4.9 / 5.0</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
