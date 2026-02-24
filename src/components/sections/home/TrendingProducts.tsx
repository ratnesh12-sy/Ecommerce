"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, ShoppingCart } from "lucide-react";
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

const trendingProducts = [
    {
        id: 1,
        name: "Wireless ANC Headphones",
        brand: "SoundCore",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 2841,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
        badge: "Best Seller",
        badgeColor: "bg-amber-500",
    },
    {
        id: 2,
        name: "Minimalist Leather Watch",
        brand: "Nordgreen",
        price: 189.00,
        originalPrice: 249.00,
        rating: 4.9,
        reviews: 1523,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
        badge: "New",
        badgeColor: "bg-blue-600",
    },
    {
        id: 3,
        name: "Running Shoes Pro X",
        brand: "AirFlex",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.7,
        reviews: 3210,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        badge: "Trending",
        badgeColor: "bg-rose-500",
    },
    {
        id: 4,
        name: "Smart Water Bottle",
        brand: "HydroTrack",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.6,
        reviews: 987,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
        badge: "- 29%",
        badgeColor: "bg-green-600",
    },
];

export default function TrendingProducts() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                >
                    <div className="text-left">
                        <motion.p variants={fadeUp} className="text-sm font-black text-blue-600 uppercase tracking-[0.25em] mb-3">
                            Trending Now
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Latest <span className="text-gradient-premium">Arrivals</span>
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp} className="mt-6 md:mt-0">
                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-3 bg-gray-50 text-gray-900 font-bold px-8 py-4 rounded-2xl hover:bg-black hover:text-white transition-all duration-300 group"
                        >
                            Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {trendingProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            variants={fadeUp}
                            custom={i}
                            whileHover={{ y: -12 }}
                            className="group relative bg-white/70 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer"
                        >
                            {/* Image Wrapper */}
                            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Dynamic Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Badge */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span
                                        className={`${product.badgeColor} text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md`}
                                    >
                                        {product.badge}
                                    </span>
                                </div>

                                {/* Quick Actions */}
                                <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2">
                                    <button className="w-10 h-10 bg-white shadow-xl rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                        <Heart className="w-4.5 h-4.5" />
                                    </button>
                                    <button className="w-10 h-10 bg-white shadow-xl rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                        <ShoppingCart className="w-4.5 h-4.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Detailed Info */}
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs text-blue-600 font-black uppercase tracking-widest">{product.brand}</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                                    </div>
                                </div>

                                <h3 className="font-black text-gray-900 text-lg mb-4 leading-tight group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2 h-12">{product.name}</h3>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-400 font-bold line-through tracking-tight">${product.originalPrice}</span>
                                        <span className="text-2xl font-black text-gray-900 tracking-tight">${product.price}</span>
                                    </div>
                                    <button className="bg-black text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-blue-600 hover:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile view all */}
                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm"
                    >
                        View All Products <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
