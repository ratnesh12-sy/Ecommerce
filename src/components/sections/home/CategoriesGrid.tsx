"use client";

import React from "react";
import { Smartphone, Shirt, Home, Gift, ChevronRight } from "lucide-react";
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

const categories = [
    { icon: Smartphone, label: "Electronics", count: "2.4k Products", gradient: "from-blue-500 to-cyan-400" },
    { icon: Shirt, label: "Fashion", count: "3.1k Products", gradient: "from-pink-500 to-rose-400" },
    { icon: Home, label: "Home & Living", count: "1.8k Products", gradient: "from-orange-500 to-amber-400" },
    { icon: Gift, label: "Beauty", count: "960 Products", gradient: "from-purple-500 to-violet-400" },
];

export default function CategoriesGrid() {
    return (
        <section className="py-24 bg-white relative">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-gray-50/50 to-transparent" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                >
                    <div className="text-left">
                        <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 uppercase tracking-[0.25em] mb-3">
                            Collections
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Shop by <span className="text-gradient-primary">Category</span>
                        </motion.h2>
                    </div>
                    <motion.p variants={fadeUp} className="text-gray-500 max-w-sm mt-4 md:mt-0 text-lg font-medium">
                        Explore our curated selection of high-quality products across multiple categories.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            variants={fadeUp}
                            custom={i}
                            whileHover={{ y: -8 }}
                            className="group relative bg-gray-50/50 rounded-[2.5rem] p-8 md:p-10 border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
                        >
                            {/* Hover Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

                            <div
                                className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                            >
                                <cat.icon className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="font-black text-gray-900 text-xl tracking-tight mb-2 group-hover:text-blue-600 transition-colors uppercase">{cat.label}</h3>
                            <p className="text-sm text-gray-400 font-bold tracking-wide uppercase opacity-70 mb-8">{cat.count}</p>

                            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Explore Now <ChevronRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
