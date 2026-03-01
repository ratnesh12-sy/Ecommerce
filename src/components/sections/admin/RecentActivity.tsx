"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function RecentActivity() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-[18px] font-bold text-gray-900 mb-6 tracking-tight">Recent System Activity</h3>
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4">
                            <div className="w-1.5 h-10 bg-gray-100 rounded-full" />
                            <div>
                                <p className="text-[15px] font-semibold text-gray-900">User roles updated for ID #4292</p>
                                <p className="text-xs text-gray-500 font-medium">2 minutes ago • System Admin</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#0B0F19] p-8 rounded-3xl shadow-xl shadow-gray-200 border border-t-4 border-[#0B0F19] border-t-red-500 relative overflow-hidden">
                <h3 className="text-[18px] font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                    <Shield className="w-[20px] h-[20px] text-red-500" />
                    Security Alert
                </h3>
                <p className="text-gray-400 text-[15px] font-medium mb-8">Unusual login attempt from Mumbai, India.</p>
                <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl transition-all border border-white/10 text-[15px]">
                    Review Security Logs
                </button>
            </div>
        </div>
    );
}
