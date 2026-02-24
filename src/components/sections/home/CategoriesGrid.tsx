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
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="text-center mb-12"
                >
                    <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
                        Browse
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                        Shop by Category
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            variants={fadeUp}
                            custom={i}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all cursor-pointer"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                            >
                                <cat.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">{cat.label}</h3>
                            <p className="text-xs text-gray-400 font-medium mt-1">{cat.count}</p>
                            <ChevronRight className="absolute top-8 right-6 w-5 h-5 text-gray-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
