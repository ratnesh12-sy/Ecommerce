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
        <section className="py-16 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-[2.5rem] p-10 md:p-16 overflow-hidden text-center md:text-left"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
                    <div className="absolute top-6 right-10 opacity-10">
                        <Zap className="w-32 h-32 text-white" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">Limited Time Offer</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                            Get 30% Off Your <br className="hidden sm:block" />
                            First Order
                        </h2>
                        <p className="text-blue-100 mt-4 text-sm sm:text-base max-w-lg">
                            Sign up today and enjoy exclusive discounts on the latest arrivals. Use code <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">WELCOME30</span> at checkout.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 group"
                            >
                                Claim Offer
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
