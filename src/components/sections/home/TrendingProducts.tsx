"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getAllProducts, ProductResponse } from "@/lib/api";

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

export default function TrendingProducts() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrendingProducts() {
            try {
                const data = await getAllProducts();
                // Take only up to 4 products for the trending section layout
                setProducts(data.slice(0, 4));
            } catch (err: any) {
                setError(err.message || "Failed to load trending products");
            } finally {
                setLoading(false);
            }
        }
        fetchTrendingProducts();
    }, []);

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

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 font-bold">{error}</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center mt-12 mb-12">
                        <p className="text-gray-500 text-lg">New products arriving soon! Check back later.</p>
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {products.map((product, i) => (
                            <motion.div
                                key={product.id}
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -12 }}
                                className="group relative bg-white/70 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer"
                            >
                                {/* Image Wrapper */}
                                <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    {/* Dynamic Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Badge placeholder (dynamic based on DB logic eventually) */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span
                                            className={`bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md`}
                                        >
                                            Trending
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
                                        <p className="text-xs text-blue-600 font-black uppercase tracking-widest">{product.category}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            {/* Rating placeholder since backend doesn't support it yet */}
                                            <span className="text-xs font-bold text-gray-900">4.5</span>
                                        </div>
                                    </div>

                                    <h3 className="font-black text-gray-900 text-lg mb-4 leading-tight group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2 h-12">{product.name}</h3>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex flex-col">
                                            {/* Original price placeholder logic */}
                                            <span className="text-sm text-gray-400 font-bold line-through tracking-tight">${(product.price * 1.2).toFixed(2)}</span>
                                            <span className="text-2xl font-black text-gray-900 tracking-tight">${product.price.toFixed(2)}</span>
                                        </div>
                                        <button className="bg-black text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-blue-600 hover:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all duration-300">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Mobile view all */}
                {products.length > 0 && (
                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm"
                        >
                            View All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
