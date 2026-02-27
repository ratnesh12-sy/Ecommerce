"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";

const products = [
    {
        id: 1,
        name: "Premium Sneakers",
        price: "$129.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
        delay: 0,
        initialPos: { x: -160, y: -160 },
    },
    {
        id: 2,
        name: "Smartphone Pro",
        price: "$999.00",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
        delay: 0.2,
        initialPos: { x: 180, y: -140 },
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: "$249.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
        delay: 0.4,
        initialPos: { x: -180, y: 150 },
    },
    {
        id: 4,
        name: "Smartwatch Elite",
        price: "$399.00",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop",
        delay: 0.6,
        initialPos: { x: 160, y: 170 },
    },
];

export default function EcommerceHeroAnimation() {
    return (
        <div className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center overflow-visible">
            {/* Central Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-[100px]" />
            <div className="absolute w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[80px] animate-pulse" />

            {/* Main Center Piece - Glassmorphism Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-[3rem] bg-white/40 backdrop-blur-3xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center p-8 text-center overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
                />

                <ShoppingBag className="w-20 h-20 text-blue-600 mb-6 drop-shadow-2xl animate-float" />
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">e-mart</h3>
                <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-[0.3em]">Premium Collection</p>

                <div className="mt-6 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                </div>
            </motion.div>

            {/* Floating Products */}
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                    animate={{
                        opacity: 1,
                        x: product.initialPos.x,
                        y: product.initialPos.y,
                        scale: 1
                    }}
                    transition={{
                        delay: product.delay,
                        duration: 1,
                        type: "spring",
                        stiffness: 80
                    }}
                    className="absolute z-20"
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 8, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5 + product.id,
                            ease: "easeInOut",
                            delay: product.delay
                        }}
                        className="w-28 h-28 md:w-44 md:h-44 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden group hover:scale-110 hover:-translate-y-4 transition-all duration-500 cursor-pointer"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                                <p className="text-[10px] text-white font-bold uppercase tracking-wider truncate mb-0.5">{product.name}</p>
                                <p className="text-sm text-blue-300 font-black">{product.price}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ))}

            {/* Decorative Orbs */}
            {[1, 2, 3].map((orb) => (
                <motion.div
                    key={orb}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, 20, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 6 + orb,
                        ease: "linear"
                    }}
                    className={`absolute rounded-full blur-3xl -z-10 ${orb === 1 ? "w-48 h-48 bg-blue-300/20 -top-24 -left-24" :
                        orb === 2 ? "w-72 h-72 bg-purple-300/10 bottom-0 -right-24" :
                            "w-40 h-40 bg-blue-200/30 top-1/2 left-0"
                        }`}
                />
            ))}
        </div>
    );
}
