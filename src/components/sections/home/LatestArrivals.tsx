"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getLatestProductsAPI, ProductResponse } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { fadeUp, stagger } from "@/lib/animations";

export default function LatestArrivals() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data = await getLatestProductsAPI();
                setProducts(data);
            } catch (err) {
                const error = err as Error;
                setError(error.message || "Failed to load latest arrivals");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <section className="py-24 bg-gray-50/50 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                >
                    <div className="text-left">
                        <motion.p variants={fadeUp} className="text-sm font-black text-indigo-600 uppercase tracking-[0.25em] mb-3">
                            Fresh Drops
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Latest <span className="text-gradient-premium">Arrivals</span>
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp} className="mt-6 md:mt-0">
                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-900 font-bold px-8 py-4 rounded-2xl hover:border-gray-900 hover:shadow-lg transition-all duration-300 group"
                        >
                            View All <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 font-bold bg-red-50 rounded-3xl mx-4">
                        <p>{error}</p>
                    </div>
                ) : products.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                variants={fadeUp}
                                custom={index}
                                className="group bg-white rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 border border-gray-100 flex flex-col h-full"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex justify-center items-center bg-gray-100 text-gray-400 font-medium">
                                            No Image
                                        </div>
                                    )}

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                        <span className="bg-white/90 backdrop-blur tracking-widest text-gray-900 text-[10px] uppercase font-black px-3 py-1.5 rounded-full shadow-sm">
                                            NEW
                                        </span>
                                    </div>

                                    <button className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={`w-3.5 h-3.5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}`} />
                                        ))}
                                        <span className="text-xs font-bold text-gray-500 ml-1">(4.0)</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                                    <div className="mt-auto flex items-end justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Price</span>
                                            <span className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await addToCart(product.id);
                                                } catch (err) {
                                                    const error = err as Error;
                                                    alert(error.message || "Failed to add to cart");
                                                }
                                            }}
                                            className="w-12 h-12 rounded-full bg-gray-50 text-gray-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all transform group-hover:-translate-y-1 shadow-sm font-bold text-2xl pb-1"
                                            aria-label="Add to Cart"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 text-gray-500 font-medium">
                        <p>No new products available right now.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
