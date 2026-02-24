"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, ShieldCheck, Truck, Tag, Gift } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const CartPage = () => {
    const cartItems = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
            color: "Space Gray",
        },
        {
            id: 2,
            name: "Minimalist Leather Watch",
            price: 150.00,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
            color: "Black",
        },
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-gray-50/50 min-h-screen py-8 md:py-12 pb-28 md:pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items List */}
                    <motion.div className="flex-1" initial="hidden" animate="visible" variants={stagger}>
                        <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
                                <p className="text-sm text-gray-400 mt-1">{cartItems.length} items in your cart</p>
                            </div>
                        </motion.div>

                        <div className="space-y-4">
                            {cartItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    variants={fadeUp}
                                    custom={i}
                                    className="bg-white p-4 sm:p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 sm:gap-6 group hover:shadow-md hover:border-gray-200/80 transition-all"
                                >
                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug truncate">{item.name}</h3>
                                                <p className="text-gray-400 text-xs mt-0.5">{item.color}</p>
                                            </div>
                                            <p className="font-black text-gray-900 text-sm sm:text-base shrink-0">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center bg-gray-50 rounded-xl p-1 px-2 border border-gray-100">
                                                <button className="p-1.5 hover:text-blue-600 transition-colors rounded-lg hover:bg-white">
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                <button className="p-1.5 hover:text-blue-600 transition-colors rounded-lg hover:bg-white">
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <button className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Promo Code */}
                        <motion.div variants={fadeUp} className="mt-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                    <Tag className="w-5 h-5 text-blue-600" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter promo code"
                                    className="flex-1 text-sm font-medium bg-transparent outline-none placeholder:text-gray-300"
                                />
                                <button className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors px-3 py-2 bg-blue-50 rounded-xl">
                                    Apply
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold mt-6 hover:gap-3 transition-all text-sm">
                                <ArrowLeft className="w-4 h-4" /> Continue Shopping
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Checkout Summary */}
                    <motion.div
                        className="lg:w-96"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-black text-gray-900 mb-6 pb-4 border-b border-gray-50">Order Summary</h2>

                            <div className="space-y-3 mb-6 text-sm">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Estimated Tax</span>
                                    <span className="text-gray-900 font-bold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-50 flex justify-between">
                                    <span className="text-base font-bold text-gray-900">Total</span>
                                    <span className="text-xl font-black text-blue-600">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200/40 transition-all flex items-center justify-center gap-3 mb-5 hover:-translate-y-0.5 active:translate-y-0">
                                Checkout Now <CreditCard className="w-5 h-5" />
                            </button>

                            {/* Free gift threshold */}
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">
                                <div className="flex items-center gap-3">
                                    <Gift className="w-5 h-5 text-amber-600 shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-amber-800">You&apos;re $50 away from a free gift!</p>
                                        <div className="w-full bg-amber-200/50 rounded-full h-1.5 mt-2">
                                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "70%" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <Truck className="w-4 h-4 text-blue-600" /> Free Shipping on this order
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Checkout Guaranteed
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
