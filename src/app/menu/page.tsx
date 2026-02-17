"use client";

import React from "react";
import Link from "next/link";
import {
    Smartphone,
    Shirt,
    Home,
    Gift,
    Zap,
    HelpCircle,
    Info,
    ShieldCheck,
    ChevronRight,
    Search,
    ShoppingBag,
    Bell,
    Globe,
    Moon
} from "lucide-react";
import { motion } from "framer-motion";

const MenuPage = () => {
    const categories = [
        { icon: Smartphone, label: "Electronics", sub: "Phones, Laptops & Accessories", color: "bg-blue-50 text-blue-600" },
        { icon: Shirt, label: "Fashion", sub: "Men, Women & Kids", color: "bg-pink-50 text-pink-600" },
        { icon: Home, label: "Home & Living", sub: "Furniture, Decor & Kitchen", color: "bg-orange-50 text-orange-600" },
        { icon: Gift, label: "Beauty & Health", sub: "Skincare, Makeup & Wellness", color: "bg-purple-50 text-purple-600" },
    ];

    const supportItems = [
        { icon: HelpCircle, label: "Help Center", sub: "Find answers and support" },
        { icon: Bell, label: "Notifications", sub: "View your alerts" },
        { icon: Globe, label: "Language", sub: "English (US)", extra: "EN" },
        { icon: Moon, label: "Dark Mode", sub: "Toggle theme preference" },
    ];

    const legalItems = [
        { icon: Info, label: "About e-mart" },
        { icon: ShieldCheck, label: "Privacy Policy" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            {/* Search Bar Placeholder */}
            <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100 sticky top-0 z-40">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search menu..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="max-w-xl mx-auto p-6 space-y-8">
                {/* Categories Section */}
                <section>
                    <div className="flex items-center justify-between px-2 mb-4">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Shop Categories</h2>
                        <Link href="/categories" className="text-xs font-bold text-blue-600">View All</Link>
                    </div>
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 text-left"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${cat.color}`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm leading-none mb-1">{cat.label}</h3>
                                    <p className="text-xs text-gray-400 font-medium">{cat.sub}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-200" />
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Support & Settings */}
                <section>
                    <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none px-2 mb-4">Account & Support</h2>
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        {supportItems.map((item, idx) => (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 text-left"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                    <item.icon className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm leading-none mb-1">{item.label}</h3>
                                    <p className="text-xs text-gray-400 font-medium">{item.sub}</p>
                                </div>
                                {item.extra && <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-lg mr-1">{item.extra}</span>}
                                <ChevronRight className="w-4 h-4 text-gray-200" />
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Sell Section */}
                <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-600 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-blue-200 cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Become a Seller</h3>
                            <p className="text-blue-100 text-xs font-medium">Open your shop today</p>
                        </div>
                    </div>
                    <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                </motion.div>

                {/* Legal */}
                <section>
                    <div className="bg-white/50 rounded-[1.5rem] border border-gray-100 overflow-hidden">
                        {legalItems.map((item, idx) => (
                            <button
                                key={idx}
                                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white transition-all border-b border-gray-100 last:border-0 text-left"
                            >
                                <item.icon className="w-4 h-4 text-gray-400" />
                                <span className="flex-1 font-bold text-gray-600 text-xs">{item.label}</span>
                                <ChevronRight className="w-3 h-3 text-gray-300" />
                            </button>
                        ))}
                    </div>
                </section>

                <div className="text-center pt-4">
                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest tracking-tighter italic">Version 1.0.4 Pre-Alpha</p>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
