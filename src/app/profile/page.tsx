"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Package, Settings, LogOut, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const ProfilePage = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <User className="w-10 h-10 text-gray-300" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h1>
                <p className="text-gray-500 mb-8 max-w-xs">You need to be logged in to view your profile and manage your account.</p>
                <Link
                    href="/login"
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                    Log In
                </Link>
            </div>
        );
    }

    const menuItems = [
        { icon: Package, label: "My Orders", sub: "Track & manage your orders", href: "/orders" },
        { icon: Star, label: "Wishlist", sub: "Products you've saved", href: "/wishlist" },
        { icon: Shield, label: "Security", sub: "Password & 2FA settings", href: "/security" },
        { icon: Settings, label: "Account Details", sub: "Edit personal information", href: "/settings" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            {/* Header / Banner */}
            <div className="bg-blue-600 pt-20 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-extrabold text-white mb-1">{user.name}</h1>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 text-sm">
                            <Mail className="w-4 h-4" />
                            {user.email}
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider mb-0.5">Status</p>
                        <p className="text-white font-bold text-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Gold Member
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 -translate-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Main Menu */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 space-y-2 h-fit"
                    >
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-2 mb-2">Manage Account</p>
                        {menuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                            >
                                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm leading-none mb-1">{item.label}</h3>
                                    <p className="text-xs text-gray-400 font-medium">{item.sub}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                            </Link>
                        ))}
                    </motion.div>

                    {/* Stats & Banner */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex justify-between"
                        >
                            <div className="text-center">
                                <p className="text-2xl font-black text-gray-900 leading-none mb-1">12</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Orders</p>
                            </div>
                            <div className="w-px h-10 bg-gray-100" />
                            <div className="text-center">
                                <p className="text-2xl font-black text-gray-900 leading-none mb-1">3</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Coupons</p>
                            </div>
                            <div className="w-px h-10 bg-gray-100" />
                            <div className="text-center">
                                <p className="text-2xl font-black text-gray-900 leading-none mb-1">840</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Points</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white relative overflow-hidden group h-64 flex flex-col justify-end shadow-xl shadow-indigo-200"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                                <Star className="w-32 h-32 text-white" />
                            </div>
                            <p className="text-indigo-100 font-bold text-xs uppercase tracking-[0.2em] mb-2 font-sans">Loyalty Program</p>
                            <h2 className="text-2xl font-black leading-tight mb-4">You're close to <br />Platinum!</h2>
                            <button className="w-full py-3 bg-white text-indigo-700 font-black rounded-xl text-sm shadow-lg hover:scale-[1.02] transition-transform">
                                View Perks
                            </button>
                        </motion.div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => logout()}
                            className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-[1.5rem] font-bold hover:bg-red-100 transition-all border border-red-100/50"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout Session
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
