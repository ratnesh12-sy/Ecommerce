"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mock data for the charts based on the Figma aesthetic
const data = [
    { name: 'Jan', revenue: 4000, users: 2400 },
    { name: 'Feb', revenue: 3000, users: 1398 },
    { name: 'Mar', revenue: 2000, users: 9800 },
    { name: 'Apr', revenue: 2780, users: 3908 },
    { name: 'May', revenue: 1890, users: 4800 },
    { name: 'Jun', revenue: 2390, users: 3800 },
    { name: 'Jul', revenue: 3490, users: 4300 },
];

export default function AnalyticsSection() {
    return (
        <>
            <div className="mb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-[28px] font-bold text-gray-900 tracking-tight leading-none mb-2">Analytics Overview</h1>
                    <p className="text-[#6B7280] font-medium text-[15px]">Detailed metrics and business performance</p>
                </div>

                <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                    <button className="px-4 py-1.5 text-[14px] font-semibold text-gray-500 hover:text-gray-900">7 Days</button>
                    <button className="px-4 py-1.5 text-[14px] font-semibold bg-gray-100 rounded-lg text-gray-900 shadow-sm">30 Days</button>
                    <button className="px-4 py-1.5 text-[14px] font-semibold text-gray-500 hover:text-gray-900">12 Months</button>
                </div>
            </div>

            {/* Top Stat Cards Row matching Figma's Analytics screen */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +18.2%
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium text-[15px] mb-1 relative z-10">Total Revenue</p>
                    <h3 className="text-[32px] font-bold text-gray-900 tracking-tight relative z-10">$284,592</h3>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +12.5%
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium text-[15px] mb-1 relative z-10">Total Orders</p>
                    <h3 className="text-[32px] font-bold text-gray-900 tracking-tight relative z-10">6,890</h3>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +8.1%
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium text-[15px] mb-1 relative z-10">New Customers</p>
                    <h3 className="text-[32px] font-bold text-gray-900 tracking-tight relative z-10">12,847</h3>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-[13px] font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                            <ArrowDownRight className="w-3.5 h-3.5" /> -2.4%
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium text-[15px] mb-1 relative z-10">Conversion Rate</p>
                    <h3 className="text-[32px] font-bold text-gray-900 tracking-tight relative z-10">3.24%</h3>
                </div>
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[18px] font-bold text-gray-900">Revenue Overview</h3>
                        <button className="text-[14px] font-bold text-blue-600 hover:text-blue-700">View Report</button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-[18px] font-bold text-gray-900 mb-6">Traffic Sources</h3>
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="flex justify-between text-[14px] font-medium mb-2">
                                <span className="text-gray-900">Direct Search</span>
                                <span className="text-gray-500">45%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[14px] font-medium mb-2">
                                <span className="text-gray-900">Social Media</span>
                                <span className="text-gray-500">32%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '32%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[14px] font-medium mb-2">
                                <span className="text-gray-900">Referrals</span>
                                <span className="text-gray-500">23%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '23%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
