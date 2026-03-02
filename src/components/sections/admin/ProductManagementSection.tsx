"use client";

import React, { useState } from "react";
import { Search, Plus, Package, Box, AlertTriangle, DollarSign, LayoutGrid, List } from "lucide-react";

export default function ProductManagementSection() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchTerm, setSearchTerm] = useState("");

    // Dummy data to match Figma visual
    const products = [
        { id: 1, name: "Wireless Headphones", sku: "WH-2023-BK", price: 129.99, stock: 45, status: "In Stock" },
        { id: 2, name: "Smart Watch Pro", sku: "SW-PRO-S1", price: 299.50, stock: 12, status: "Low Stock" },
        { id: 3, name: "Mechanical Keyboard", sku: "MK-104-BL", price: 159.00, stock: 85, status: "In Stock" },
        { id: 4, name: "Ergonomic Mouse", sku: "EM-WIRE-01", price: 49.99, stock: 0, status: "Out of Stock" }
    ];

    return (
        <>
            <div className="mb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-[28px] font-bold text-gray-900 tracking-tight leading-none mb-2">Products</h1>
                    <p className="text-[#6B7280] font-medium text-[15px]">Manage your product inventory</p>
                </div>
                <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md shadow-purple-500/20 text-[15px]">
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                            <Box className="w-5 h-5" />
                        </div>
                        <p className="text-gray-500 text-[14px] font-medium">Total Products</p>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 ml-1">8</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                            <Package className="w-5 h-5" />
                        </div>
                        <p className="text-gray-500 text-[14px] font-medium">In Stock</p>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 ml-1">5</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-xl">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <p className="text-gray-500 text-[14px] font-medium">Low Stock</p>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 ml-1">2</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <p className="text-gray-500 text-[14px] font-medium">Inventory Value</p>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 ml-1">$23.3k</h3>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative w-full md:w-96 flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm text-[15px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    All Categories
                </button>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm mr-auto md:mr-0">
                    All Status
                </button>

                {/* View Toggles */}
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area Based on View Mode */}
            {viewMode === "list" ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                                    <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">SKU</th>
                                    <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                                    <th className="px-8 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Status / Stock</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                                                    <Box className="w-6 h-6" />
                                                </div>
                                                <div className="text-[15px] font-bold text-gray-900">{p.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-[14px] text-gray-500 font-medium">{p.sku}</td>
                                        <td className="px-8 py-5 whitespace-nowrap text-[15px] font-bold text-gray-900">${p.price.toFixed(2)}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold self-start ${p.stock > 20 ? 'bg-emerald-50 text-emerald-600' :
                                                    p.stock > 0 ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'
                                                    }`}>
                                                    {p.status}
                                                </span>
                                                <span className="text-[12px] text-gray-400 font-medium ml-1">{p.stock} in stock</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Grid View */}
                    {products.map((p) => (
                        <div key={p.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-full h-40 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                <Box className="w-12 h-12 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{p.name}</h3>
                            <p className="text-sm text-gray-500 font-medium mb-4">{p.sku}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xl font-bold text-gray-900">${p.price.toFixed(2)}</span>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${p.stock > 20 ? 'bg-emerald-50 text-emerald-600' :
                                    p.stock > 0 ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'
                                    }`}>
                                    {p.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
