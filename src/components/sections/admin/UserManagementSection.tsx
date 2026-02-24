"use client";

import React from "react";
import { UserProfileResponse } from "@/lib/api";
import { Check, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WorkerRoles = ["ROLE_USER", "ROLE_ADMIN", "ROLE_INVENTORY", "ROLE_SUPPORT", "ROLE_MARKETING", "ROLE_SHIPPER"];

interface UserManagementSectionProps {
    users: UserProfileResponse[];
    loading: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    updatingUserId: number | null;
    handleRoleToggle: (userId: number, role: string, currentRoles: string[]) => Promise<void>;
}

export default function UserManagementSection({
    users,
    loading,
    searchTerm,
    setSearchTerm,
    updatingUserId,
    handleRoleToggle
}: UserManagementSectionProps) {

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (u.mobileNumber && u.mobileNumber.includes(searchTerm))
    );

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        Staff & User Management
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 font-medium">Assign roles and manage permissions for all users.</p>
                </div>

                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">User Details</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Information</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Permission Roles</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            <AnimatePresence mode="popLayout">
                                {filteredUsers.map((u) => (
                                    <motion.tr
                                        key={u.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                        className="hover:bg-gray-50/30 transition-colors"
                                    >
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                                                    {u.name[0]}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{u.name}</div>
                                                    <div className="text-[10px] text-blue-600 font-black uppercase tracking-tighter">{u.membershipLevel}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-600">{u.email || u.mobileNumber}</div>
                                            <div className="text-[10px] text-gray-400 font-medium">Joined {new Date(u.createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-wrap gap-2">
                                                {WorkerRoles.map((role) => {
                                                    const isActive = u.roles.includes(role);
                                                    const isUpdating = updatingUserId === u.id;
                                                    return (
                                                        <button
                                                            key={role}
                                                            onClick={() => handleRoleToggle(u.id, role, u.roles)}
                                                            disabled={isUpdating}
                                                            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 border ${isActive
                                                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                                                : "bg-white text-gray-400 border-gray-100 hover:border-blue-200 hover:text-blue-600"
                                                                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                                                        >
                                                            {isActive && <Check className="w-3 h-3" />}
                                                            {role.replace("ROLE_", "")}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-50 mb-4">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-400 font-bold">No users found matching your search</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
