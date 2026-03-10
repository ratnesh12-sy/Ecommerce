"use client";

import React from "react";
import Link from "next/link";
import { Smartphone, Shirt, Home, Gift, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

const categories = [
    { icon: Smartphone, label: "Electronics", gradient: "from-blue-500 to-cyan-400", id: 1 },
    { icon: Shirt, label: "Fashion", gradient: "from-pink-500 to-rose-400", id: 3 },
    { icon: Home, label: "Home & Living", gradient: "from-orange-500 to-amber-400", id: 4 },
    { icon: Gift, label: "Beauty", gradient: "from-purple-500 to-violet-400", id: 2 },
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
                    className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 px-2 sm:px-0"
                >
                    <div className="text-left">
                        <motion.p variants={fadeUp} className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.25em] mb-2 md:mb-3">
                            Collections
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Shop by <span className="text-gradient-primary">Category</span>
                        </motion.h2>
                    </div>
                    <motion.p variants={fadeUp} className="text-gray-500 max-w-sm text-sm sm:text-base md:text-lg font-medium">
                        Explore our curated selection of high-quality products across multiple categories.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
                >
                    {categories.map((cat, i) => (
                        <Link href={`/category?id=${cat.id}`} key={cat.label}>
                            <motion.div
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -8 }}
                                className="group relative bg-gray-50/50 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] h-full"
                            >
                                {/* Hover Gradient Border Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

                                <div
                                    className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-3xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 sm:mb-8 shadow-xl shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                                >
                                    <cat.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                                </div>

                                <h3 className="font-black text-gray-900 text-[13px] sm:text-lg md:text-xl tracking-tight mb-3 sm:mb-8 group-hover:text-blue-600 transition-colors uppercase truncate">{cat.label}</h3>

                                <div className="flex items-center gap-1 sm:gap-2 text-blue-600 font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-500">
                                    Explore <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
