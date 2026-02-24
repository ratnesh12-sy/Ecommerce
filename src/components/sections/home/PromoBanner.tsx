"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function PromoBanner() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    className="relative bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900 rounded-[3rem] p-12 md:p-24 overflow-hidden shadow-[0_48px_100px_-24px_rgba(37,99,235,0.3)]"
                >
                    {/* Decorative high-end background elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

                    {/* Animated Lines/Shapes for premium feel */}
                    <motion.div
                        animate={{ rotate: [0, 90], scale: [1, 1.2, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -right-20 opacity-20"
                    >
                        <Zap className="w-64 h-64 text-white" />
                    </motion.div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <motion.div
                                variants={fadeUp}
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8"
                            >
                                <Zap className="w-4 h-4 text-amber-400" />
                                Exclusive Flash Deal
                            </motion.div>

                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                                Get <span className="text-blue-300">30% Off</span> <br />
                                Your First Order
                            </h2>

                            <p className="text-blue-100/80 mt-8 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                                Join thousands of smart shoppers and enjoy premium products at incredible prices. Use code <span className="font-black text-white px-3 py-1 bg-white/20 rounded-xl">WELCOME30</span>
                            </p>

                            <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center gap-3 bg-white text-blue-800 font-black px-12 py-5 rounded-2xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-[1.05] active:scale-[0.98] group"
                                >
                                    Claim This Offer
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                                </Link>
                                <button className="glass border border-white/20 text-white font-black px-12 py-5 rounded-2xl hover:bg-white/10 transition-all">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Right side visual element */}
                        <div className="hidden lg:block relative">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full aspect-square bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-2xl flex items-center justify-center scale-90"
                            >
                                <div className="text-center p-12">
                                    <span className="text-8xl font-black text-white tracking-tight leading-none">30%</span>
                                    <p className="text-blue-200 font-bold uppercase tracking-[0.4em] mt-4 text-sm">Discount</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
