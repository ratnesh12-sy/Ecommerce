"use client";

import React from "react";
import StatCard from "@/components/ui/StatCard";
import { Users, ShoppingBag, PieChart, LayoutDashboard } from "lucide-react";

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Revenue" value="$284,592" change="+12.5%" icon={PieChart} color="green" />
            <StatCard title="Active Users" value="12,847" change="+8.2%" icon={Users} color="purple" />
            <StatCard title="Total Orders" value="3,456" change="+15.3%" icon={ShoppingBag} color="blue" />
            <StatCard title="Performance Score" value="94.2%" change="-2.1%" icon={LayoutDashboard} color="orange" />
        </div>
    );
}
