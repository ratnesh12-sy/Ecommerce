"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

const CartPage = () => {
    // Mock data for initial UI
    const cartItems = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
            color: "Space Gray"
        },
        {
            id: 2,
            name: "Minimalist Leather Watch",
            price: 150.00,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
            color: "Black"
        }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 10.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items List */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                            <span className="text-gray-500 font-medium">{cartItems.length} Items</span>
                        </div>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6"
                                >
                                    <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                                <p className="text-gray-500 text-sm mt-1">{item.color}</p>
                                            </div>
                                            <p className="font-black text-gray-900">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-6">
                                            <div className="flex items-center bg-gray-50 rounded-xl p-1 px-2 border border-gray-100">
                                                <button className="p-1 hover:text-blue-600 transition-colors"><Minus className="w-4 h-4" /></button>
                                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                <button className="p-1 hover:text-blue-600 transition-colors"><Plus className="w-4 h-4" /></button>
                                            </div>
                                            <button className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold mt-8 hover:gap-3 transition-all">
                            <ArrowLeft className="w-5 h-5" /> Continue Shopping
                        </Link>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-gray-900 font-bold">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Estimated Tax</span>
                                    <span className="text-gray-900 font-bold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-50 flex justify-between">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-blue-600">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 mb-6">
                                Checkout Now <CreditCard className="w-5 h-5" />
                            </button>

                            <div className="space-y-4 pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <Truck className="w-4 h-4 text-blue-600" /> Free Shipping on next order
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Checkout Guaranteed
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
