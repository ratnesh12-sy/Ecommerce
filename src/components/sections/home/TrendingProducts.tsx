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
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
                            What&apos;s Hot
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                            Trending Now
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp}>
                        <Link
                            href="/menu"
                            className="hidden sm:inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {trendingProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            variants={fadeUp}
                            custom={i}
                            whileHover={{ y: -4 }}
                            className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative aspect-square bg-gray-50">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Badge */}
                                <span
                                    className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg`}
                                >
                                    {product.badge}
                                </span>
                                {/* Wishlist */}
                                <button className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-sm">
                                    <Heart className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-4 md:p-5">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.brand}</p>
                                <h3 className="font-bold text-gray-900 text-sm mt-1 leading-snug line-clamp-1">{product.name}</h3>

                                <div className="flex items-center gap-1.5 mt-2">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                                    <span className="text-[10px] text-gray-400">({product.reviews.toLocaleString()})</span>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-black text-gray-900">${product.price}</span>
                                        <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                                    </div>
                                    <button className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-700 shadow-lg shadow-blue-200/50">
                                        <ShoppingCart className="w-4 h-4" />
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
