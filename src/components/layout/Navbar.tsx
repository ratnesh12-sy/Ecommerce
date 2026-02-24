"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, MapPin, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [location] = useState("Mumbai, India");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 w-full glass-dark border-b border-white/10 shadow-2xl">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Location */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-1">
                            <span className="text-blue-500 font-black">e</span>-mart
                        </Link>

                        <button className="hidden lg:flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group">
                            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                <MapPin className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] text-white/40 font-medium leading-none mb-0.5">Deliver to</p>
                                <p className="font-semibold text-white leading-none text-xs">{location}</p>
                            </div>
                        </button>
                    </div>

                    {/* Navigation & Search (Visible on Mobile & Desktop) */}
                    <div className="flex-1 flex items-center justify-center px-2 md:px-8">
                        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full max-w-sm md:max-w-xl' : 'w-full max-w-[120px] sm:max-w-xs md:max-w-sm'}`}>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-3.5 w-3.5 text-white/40" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full pl-9 pr-3 py-1.5 border border-white/10 rounded-full bg-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm placeholder:text-white/30"
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </div>
                    </div>

                    {/* User Actions & Auth (Visible on Mobile & Desktop) */}
                    <div className="flex items-center space-x-1.5 md:space-x-6">
                        {mounted && (
                            <AnimatePresence mode="wait">
                                {!user ? (
                                    <motion.div
                                        key="guest-actions"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center space-x-1 md:space-x-3"
                                    >
                                        <Link href="/login" className="text-[11px] md:text-sm font-semibold text-white/80 hover:text-white transition-colors px-1">
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="flex items-center gap-1 text-[10px] md:text-sm font-bold px-2.5 md:px-5 py-1.5 md:py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all font-sans whitespace-nowrap"
                                        >
                                            Register
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="user-actions"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center space-x-4"
                                    >
                                        <Link href="/profile" className="flex items-center gap-2 group p-1 pr-3 rounded-full hover:bg-white/5 transition-colors">
                                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                                <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                            </div>
                                            <div className="hidden lg:block text-left">
                                                <p className="text-[10px] text-white/40 font-medium leading-none mb-0.5">Welcome</p>
                                                <p className="text-sm font-semibold text-white leading-none">{user.name.split(' ')[0]}</p>
                                            </div>
                                        </Link>

                                        {user.roles?.includes("ROLE_ADMIN") && (
                                            <Link
                                                href="/admin/dashboard"
                                                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-all text-xs font-bold"
                                            >
                                                <Shield className="w-3.5 h-3.5" />
                                                Admin Panel
                                            </Link>
                                        )}

                                        <button onClick={logout} className="text-xs md:text-sm text-white/60 hover:text-red-400 font-bold px-2 py-1">Logout</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}

                        <Link href="/cart" className="hidden md:flex relative p-2 text-white/80 hover:text-white transition-colors group">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-extrabold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full group-hover:scale-110 transition-transform font-sans">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
