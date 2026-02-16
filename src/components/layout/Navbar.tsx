"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, LogIn, UserPlus, Menu, X, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, isRegistered, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [location] = useState("New York, USA");

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

                    {/* Desktop Navigation & Search */}
                    <div className="hidden md:flex flex-1 items-center justify-center px-8">
                        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full max-w-xl' : 'w-full max-w-sm'}`}>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <AnimatePresence mode="wait">
                            {!user ? (
                                <motion.div
                                    key="guest-actions"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center space-x-3"
                                >
                                    {!isRegistered && (
                                        <>
                                            <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="flex items-center gap-1 text-sm font-semibold px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-sans"
                                            >
                                                <UserPlus className="w-4 h-4" /> Register
                                            </Link>
                                        </>
                                    )}
                                    {isRegistered && (
                                        <Link
                                            href="/login"
                                            className="flex items-center gap-1 text-sm font-semibold px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                                        >
                                            <LogIn className="w-4 h-4" /> Login
                                        </Link>
                                    )}
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
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">Welcome</p>
                                            <p className="text-sm font-semibold text-gray-700 leading-none">{user.name.split(' ')[0]}</p>
                                        </div>
                                    </Link>
                                    <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 font-medium">Logout</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Link href="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors group">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-extrabold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full group-hover:scale-110 transition-transform font-sans">
                                0
                            </span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/cart" className="relative p-2 text-gray-700">
                            <ShoppingCart className="w-6 h-6" />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-6">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Deliver to</p>
                                    <p className="text-sm font-semibold text-gray-900">{location}</p>
                                </div>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                {!user ? (
                                    <>
                                        {!isRegistered && (
                                            <Link
                                                href="/register"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex justify-center items-center gap-2 py-3 text-sm font-bold bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200"
                                            >
                                                <UserPlus className="w-4 h-4" /> Register
                                            </Link>
                                        )}
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex justify-center items-center gap-2 py-3 text-sm font-bold text-gray-700 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                                        >
                                            <LogIn className="w-4 h-4" /> Login
                                        </Link>
                                    </>
                                ) : (
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex justify-center items-center gap-2 py-3 text-sm font-bold text-red-600 bg-red-50 rounded-2xl">
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
