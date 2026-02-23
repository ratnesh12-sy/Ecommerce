"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-100 pb-28 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-gray-900 flex items-center gap-1">
                            <span className="text-blue-600">e</span>-mart
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your premium destination for curated high-quality products. Experience seamless shopping with fast delivery and secure payments.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-blue-400 hover:border-blue-100 transition-all shadow-sm">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-pink-600 hover:border-pink-100 transition-all shadow-sm">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all shadow-sm">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Sections */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Shop</h3>
                        <ul className="space-y-4">
                            <li><Link href="/shop" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Best Sellers</Link></li>
                            <li><Link href="/shop" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Special Offers</Link></li>
                            <li><Link href="/shop" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Modern Collection</Link></li>
                        </ul>
                    </div>

                    {/* Support Sections */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><Link href="/faq" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Help & FAQ</Link></li>
                            <li><Link href="/shipping" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                                <p className="text-gray-500 text-sm">123 Commerce St,mumbai,maharashtra,400066</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                                <p className="text-gray-500 text-sm">+91 8169740973</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                                <p className="text-gray-500 text-sm">ratneshwaghare114@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs font-medium">
                        © {currentYear} e-mart Premium Store. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="text-gray-400 hover:text-gray-900 text-xs transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-gray-900 text-xs transition-colors">Privacy Policy</Link>
                        <Link href="/cookies" className="text-gray-400 hover:text-gray-900 text-xs transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
