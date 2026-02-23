"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, LogIn, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [location] = useState("New York, USA");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Location */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-gray-900 flex items-center gap-1">
                            <span className="text-blue-600">e</span>-mart
                        </Link>

                        <button className="hidden lg:flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
                            <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                <MapPin className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">Deliver to</p>
                                <p className="font-semibold text-gray-900 leading-none">{location}</p>
                            </div>
                        </button>
                    </div>

                    {/* Navigation & Search (Visible on Mobile & Desktop) */}
                    <div className="flex-1 flex items-center justify-center px-2 md:px-8">
                        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full max-w-sm md:max-w-xl' : 'w-full max-w-[120px] sm:max-w-xs md:max-w-sm'}`}>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-full bg-gray-50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
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
                                        <Link href="/login" className="text-[11px] md:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-1">
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="flex items-center gap-1 text-[10px] md:text-sm font-bold px-2.5 md:px-5 py-1.5 md:py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-sans whitespace-nowrap"
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
                                        <Link href="/profile" className="flex items-center gap-2 group p-1 pr-3 rounded-full hover:bg-gray-50 transition-colors">
                                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                                <User className="w-3.5 h-3.5 md:w-4 h-4" />
                                            </div>
                                            <div className="hidden lg:block text-left">
                                                <p className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">Welcome</p>
                                                <p className="text-sm font-semibold text-gray-700 leading-none">{user.name.split(' ')[0]}</p>
                                            </div>
                                        </Link>
                                        <button onClick={logout} className="text-xs md:text-sm text-gray-500 hover:text-red-500 font-bold px-2 py-1">Logout</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}

                        <Link href="/cart" className="hidden md:flex relative p-2 text-gray-700 hover:text-blue-600 transition-colors group">
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
