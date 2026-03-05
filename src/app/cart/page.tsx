"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
    const { cart, loading, updateCartItem, removeFromCart } = useCart();
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 bg-gray-50/50">
                <ShoppingBag className="w-20 h-20 text-indigo-200 mb-6" />
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">Please login or register to add items to your cart and checkout securely.</p>
                <Link href="/login" className="bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20">
                    Login / Register
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    const isEmpty = !cart || cart.items.length === 0;

    // Placholders for calculations
    const subtotal = cart?.subtotal || 0;
    const taxes = subtotal * 0.08; // 8% dummy tax
    const shipping = subtotal > 150 ? 0 : 15; // Free shipping over $150
    const total = subtotal + taxes + shipping;

    return (
        <div className="min-h-screen bg-gray-50/50 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
                    <Link href="/menu" className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </Link>
                </div>

                {isEmpty ? (
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-16 text-center shadow-xl shadow-gray-200/20">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is feeling lonely</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Explore our wide selection of products and find something you love!</p>
                        <Link href="/menu" className="inline-flex bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Cart Items List */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden relative">
                                <ul className="divide-y divide-gray-100/80">
                                    {cart.items.map((item) => (
                                        <li key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:bg-gray-50/50 transition-colors">
                                            {/* Item Image */}
                                            <div className="relative w-28 h-28 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                {item.imageUrl ? (
                                                    <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300"><ShoppingBag className="w-8 h-8" /></div>
                                                )}
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate pr-4">{item.productName}</h3>
                                                <p className="text-sm text-gray-500 mb-4 font-medium">Price locked: ${item.priceAtTime.toFixed(2)}</p>

                                                <div className="flex items-center gap-6">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
                                                        <button
                                                            onClick={() => {
                                                                if (item.quantity <= 1) {
                                                                    removeFromCart(item.id);
                                                                } else {
                                                                    updateCartItem(item.id, item.quantity - 1);
                                                                }
                                                            }}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-8 text-center font-bold text-sm text-gray-900">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right sm:ml-auto">
                                                <p className="text-xl font-black text-gray-900">${item.itemTotal.toFixed(2)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 p-8 sticky top-32">
                                <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Order Summary</h2>

                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 text-[15px]">
                                    <div className="flex justify-between font-medium text-gray-600">
                                        <span>Subtotal ({cart.totalItems} items)</span>
                                        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-gray-600">
                                        <span>Tax (8% est.)</span>
                                        <span className="font-bold text-gray-900">${taxes.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-gray-600">
                                        <span>Shipping</span>
                                        <span className={`font-bold ${shipping === 0 ? 'text-emerald-500' : 'text-gray-900'}`}>
                                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1 mb-4">
                                    Proceed to Checkout
                                </button>

                                <p className="text-xs text-center text-gray-400 font-medium">Secured by 256-bit SSL encryption</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
