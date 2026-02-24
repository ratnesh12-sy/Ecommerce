"use client";

import React from "react";
import AdminGuard from "@/components/auth/AdminGuard";
import { LayoutDashboard, Users, ShoppingBag, PieChart, Bell, Settings, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { logout, user } = useAuth();
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
        { name: "User Management", icon: Users, href: "/admin/users" },
        { name: "Products", icon: ShoppingBag, href: "#" },
        { name: "Analytics", icon: PieChart, href: "#" },
    ];

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <aside className="w-72 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
                    <div className="p-8">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900 block hover:opacity-80 transition-opacity">
                            e-mart <span className="text-blue-600">HQ</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${isActive
                                            ? "bg-blue-50 text-blue-600 shadow-sm"
                                            : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 mt-auto border-t border-gray-50">
                        <div className="mb-4 px-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Authenticated as</p>
                            <p className="text-xs font-bold text-gray-900 truncate">{user?.name || "Administrator"}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl font-bold text-sm transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            System Logout
                        </button>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-bold text-gray-400 tracking-tight uppercase">Admin Console</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                            <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <div className="w-px h-6 bg-gray-100 mx-2" />
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {user?.name?.[0] || "A"}
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 p-8">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    );
}
