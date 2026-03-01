"use client";

import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardStats from "@/components/sections/admin/DashboardStats";
import RecentActivity from "@/components/sections/admin/RecentActivity";

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="mb-10">
                <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-none mb-2">System Overview</h2>
                <p className="text-[#6B7280] font-medium text-[15px]">Global statistics and performance metrics</p>
            </div>

            <DashboardStats />
            <RecentActivity />
        </AdminLayout>
    );
}
