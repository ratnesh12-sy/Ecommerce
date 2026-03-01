"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Wallet, ShoppingCart, Menu } from "lucide-react";
import { motion } from "framer-motion";

const MobileBottomNav = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (pathname?.startsWith("/admin")) return null;

    const navItems = [
        { label: "Home", icon: Home, href: "/" },
        { label: "Profile", icon: User, href: "/profile" },
        { label: "Wallet", icon: Wallet, href: "/wallet" },
        { label: "Cart", icon: ShoppingCart, href: "/cart" },
        { label: "Menu", icon: Menu, href: "/menu" },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 pb-safe">
            <nav className="h-16 px-2 sm:px-4">
                <ul className="flex justify-between items-center h-full">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <li key={item.label} className="flex-1">
                                <Link
                                    href={item.href}
                                    className="flex flex-col items-center justify-center gap-1 group relative h-full py-1"
                                >
                                    <motion.div
                                        whileTap={{ scale: 0.9 }}
                                        className={`p-2 rounded-2xl transition-colors ${isActive
                                            ? "text-blue-600 bg-blue-50"
                                            : "text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50/50"
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
                                    </motion.div>
                                    <span
                                        className={`text-[9px] font-bold tracking-tight transition-colors ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-500"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-dot"
                                            className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default MobileBottomNav;
