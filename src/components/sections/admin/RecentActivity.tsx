"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function RecentActivity() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Recent System Activity</h3>
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4">
                            <div className="w-2 h-10 bg-gray-50 rounded-full" />
                            <div>
                                <p className="text-sm font-bold text-gray-900">User roles updated for ID #4292</p>
                                <p className="text-xs text-gray-400">2 minutes ago • System Admin</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-gray-900 p-8 rounded-3xl shadow-xl shadow-gray-200">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    Security Alert
                </h3>
                <p className="text-gray-400 text-sm mb-6">Unusual login attempt from Mumbai, India.</p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10">
                    Review Security Logs
                </button>
            </div>
        </div>
    );
}
