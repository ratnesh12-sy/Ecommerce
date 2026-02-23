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
    ShoppingBag,
    Bell,
    Globe,
    Moon,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const MenuPage = () => {
    const categories = [
        { icon: Smartphone, label: "Electronics", sub: "Phones, Laptops & Accessories", gradient: "from-blue-500 to-cyan-400" },
        { icon: Shirt, label: "Fashion", sub: "Men, Women & Kids", gradient: "from-pink-500 to-rose-400" },
        { icon: Home, label: "Home & Living", sub: "Furniture, Decor & Kitchen", gradient: "from-orange-500 to-amber-400" },
        { icon: Gift, label: "Beauty & Health", sub: "Skincare, Makeup & Wellness", gradient: "from-purple-500 to-violet-400" },
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
        <div className="min-h-screen bg-gray-50/50 pb-28 md:pb-12">
            <div className="max-w-xl mx-auto p-6 space-y-8 pt-8">
                {/* Page Header */}
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.h1 variants={fadeUp} className="text-2xl font-black text-gray-900 tracking-tight">
                        Menu
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-sm text-gray-400 mt-1">
                        Explore categories, settings & more
                    </motion.p>
                </motion.div>

                {/* Categories Section */}
                <motion.section initial="hidden" animate="visible" variants={stagger}>
                    <motion.div variants={fadeUp} className="flex items-center justify-between px-2 mb-4">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Shop Categories</h2>
                        <Link href="/menu" className="text-xs font-bold text-blue-600">View All</Link>
                    </motion.div>
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={idx}
                                variants={fadeUp}
                                custom={idx}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50/80 transition-all border-b border-gray-50 last:border-0 text-left"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                                    <cat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm leading-none mb-1">{cat.label}</h3>
                                    <p className="text-xs text-gray-400 font-medium">{cat.sub}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-200" />
                            </motion.button>
                        ))}
                    </div>
                </motion.section>

                {/* Support & Settings */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                    <motion.h2 variants={fadeUp} className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none px-2 mb-4">
                        Account & Support
                    </motion.h2>
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        {supportItems.map((item, idx) => (
                            <motion.button
                                key={idx}
                                variants={fadeUp}
                                custom={idx}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50/80 transition-all border-b border-gray-50 last:border-0 text-left"
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
                </motion.section>

                {/* Seller Banner */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-blue-200/50 cursor-pointer group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Become a Seller</h3>
                            <p className="text-blue-100 text-xs font-medium">Open your shop today</p>
                        </div>
                    </div>
                    <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 relative z-10" />
                </motion.div>

                {/* Legal */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                    <div className="bg-white/50 rounded-[1.5rem] border border-gray-100 overflow-hidden">
                        {legalItems.map((item, idx) => (
                            <motion.button
                                key={idx}
                                variants={fadeUp}
                                custom={idx}
                                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white transition-all border-b border-gray-100 last:border-0 text-left"
                            >
                                <item.icon className="w-4 h-4 text-gray-400" />
                                <span className="flex-1 font-bold text-gray-600 text-xs">{item.label}</span>
                                <ChevronRight className="w-3 h-3 text-gray-300" />
                            </motion.button>
                        ))}
                    </div>
                </motion.section>

                <div className="text-center pt-4">
                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic">Version 1.0.4 Pre-Alpha</p>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
