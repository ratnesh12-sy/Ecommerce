"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: string;
}

const StatCard = ({ title, value, change, icon: Icon, color }: StatCardProps) => {
    // Map colors to Tailwind classes safely, or use inline styles if needed for dynamic hex colors
    const colorMap: Record<string, string> = {
        blue: "text-blue-600 bg-blue-50",
        orange: "text-orange-500 bg-orange-50",
        green: "text-emerald-500 bg-emerald-50",
        purple: "text-purple-600 bg-purple-50",
    };
    const isPositive = change.startsWith('+');

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3.5 rounded-2xl ${colorMap[color] || 'bg-gray-50 text-gray-600'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {isPositive ? '↗' : '↘'} {change}
                </div>
            </div>
            <p className="text-gray-500 text-[15px] font-medium mb-1.5">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
        </div>
    );
};

export default StatCard;
