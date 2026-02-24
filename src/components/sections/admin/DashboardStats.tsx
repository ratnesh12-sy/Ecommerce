"use client";

import React from "react";
import StatCard from "@/components/ui/StatCard";
import { Users, ShoppingBag, PieChart, LayoutDashboard } from "lucide-react";

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Revenue" value="$128,430" change="+14%" icon={PieChart} color="blue" />
            <StatCard title="Active Users" value="2,482" change="+12%" icon={Users} color="orange" />
            <StatCard title="Total Orders" value="1,842" change="+8%" icon={ShoppingBag} color="green" />
            <StatCard title="Performance" value="98.2%" change="-2%" icon={LayoutDashboard} color="purple" />
        </div>
    );
}
