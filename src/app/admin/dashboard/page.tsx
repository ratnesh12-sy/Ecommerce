"use client";

import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardStats from "@/components/sections/admin/DashboardStats";
import RecentActivity from "@/components/sections/admin/RecentActivity";

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Overview</h2>
                <p className="text-gray-500 font-medium">Global statistics and performance metrics</p>
            </div>

            <DashboardStats />
            <RecentActivity />
        </AdminLayout>
    );
}
