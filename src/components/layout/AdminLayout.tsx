"use client";

import React from "react";
import AdminGuard from "@/components/auth/AdminGuard";
import { LayoutDashboard, Users, ShoppingBag, PieChart, Bell, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { logout, user } = useAuth();
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
        { name: "User Management", icon: Users, href: "/admin/users" },
        { name: "Products", icon: ShoppingBag, href: "/admin/products" },
        { name: "Analytics", icon: PieChart, href: "/admin/analytics" },
    ];

    return (
        <AdminGuard>
            <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
                {/* Sidebar */}
                <aside className="w-[280px] bg-[#0B0F19] flex flex-col sticky top-0 h-screen transition-all duration-300">
                    <div className="p-8">
                        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-white block hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 font-bold text-sm flex items-center justify-center text-white">eM</div>
                            e-mart <span className="text-gray-400 font-normal text-sm ml-1">HQ</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-[15px] transition-all duration-200 ${isActive
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon className={`w-[22px] h-[22px] ${isActive ? "text-white" : "text-gray-400"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 mt-auto border-t border-gray-50">
                        <div className="mb-4 px-4 flex items-center gap-3">
                            <Settings className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors cursor-pointer" />
                            <span className="text-gray-400 font-medium text-[15px] cursor-pointer hover:text-white transition-colors">Settings</span>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 mt-4 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-2xl font-medium text-[15px] transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="h-20 bg-transparent flex items-center justify-between px-10 pt-4 pb-2 z-10">
                        <div className="flex items-center gap-2">
                            {/* Title will go dynamically in the page component instead */}
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
                                <Bell className="w-[22px] h-[22px]" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-900">{user?.name || "Administrator"}</span>
                                    <span className="text-[11px] text-gray-500">Admin</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {user?.name?.substring(0, 2).toUpperCase() || "AD"}
                                </div>
                            </div>
                            <div className="w-px h-6 bg-gray-100 mx-2" />
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {user?.name?.[0] || "A"}
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 px-10 py-6 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    );
}
