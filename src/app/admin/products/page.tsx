"use client";

import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ProductManagementSection from "@/components/sections/admin/ProductManagementSection";

export default function AdminProducts() {
    return (
        <AdminLayout>
            <ProductManagementSection />
        </AdminLayout>
    );
}
