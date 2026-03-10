"use client";

import React from "react";
import ShopByCategory from "@/components/sections/home/ShopByCategory";
import { motion } from "framer-motion";
import { fadeUpFast as fadeUp, staggerFast as stagger } from "@/lib/animations";

export default function CategoryPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 pb-28 md:pb-12 pt-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-8 text-center max-w-2xl mx-auto">
                    <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-3">
                        Discover
                    </motion.p>
                    <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                        All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Categories</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-gray-500 font-medium">
                        Browse our comprehensive collection of premium products organized by category.
                    </motion.p>
                </motion.div>

                {/* We reuse the ShopByCategory component which already has robust category fetching and product listing logic */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <ShopByCategory />
                </div>
            </div>
        </div>
    );
}
