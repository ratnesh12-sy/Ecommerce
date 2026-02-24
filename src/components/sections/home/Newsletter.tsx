"use client";

import React from "react";
import { Send } from "lucide-react";
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

export default function Newsletter() {
    return (
        <section className="py-24 bg-gray-50/30 relative">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="relative bg-white rounded-[3.5rem] p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
                >
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 text-center max-w-2xl mx-auto">
                        <motion.div
                            variants={fadeUp}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600 text-white mb-8 shadow-xl shadow-blue-500/20"
                        >
                            <Send className="w-8 h-8" />
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight uppercase">
                            Join the <span className="text-gradient-premium">Exclusive</span> Club
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-500 mt-6 text-lg font-medium leading-relaxed">
                            Stay ahead of the curve. Get early access to new drops, private sales, and curated inspiration delivered weekly.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="mt-12 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                        >
                            <input
                                type="email"
                                placeholder="name@yourmail.com"
                                className="flex-1 px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-base font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-300 shadow-inner"
                            />
                            <button className="bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-blue-600 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                                Subscribe
                            </button>
                        </motion.div>

                        <motion.p variants={fadeUp} className="text-xs text-gray-400 mt-6 font-bold uppercase tracking-widest opacity-60">
                            Strictly no spam. Unsubscribe with one click.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
