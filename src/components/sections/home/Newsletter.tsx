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
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="text-center max-w-xl mx-auto"
                >
                    <motion.div
                        variants={fadeUp}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-5"
                    >
                        <Send className="w-6 h-6" />
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="text-3xl font-black text-gray-900 tracking-tight">
                        Stay in the Loop
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-gray-500 mt-3 text-sm leading-relaxed">
                        Get the latest deals, new arrivals, and exclusive offers delivered straight to your inbox.
                    </motion.p>
                    <motion.div
                        variants={fadeUp}
                        className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                        <button className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200/50 transition-all shrink-0">
                            Subscribe
                        </button>
                    </motion.div>
                    <motion.p variants={fadeUp} className="text-[11px] text-gray-400 mt-4">
                        No spam, unsubscribe anytime. We respect your privacy.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
