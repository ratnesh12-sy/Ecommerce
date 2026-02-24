"use client";

import React, { useEffect, useState } from "react";
import { getAllUsersAdmin, updateUserRolesAdmin, UserProfileResponse } from "@/lib/api";
import AdminLayout from "@/components/layout/AdminLayout";
import UserManagementSection from "@/components/sections/admin/UserManagementSection";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfileResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsersAdmin();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleToggle = async (userId: number, role: string, currentRoles: string[]) => {
        let newRoles: string[];
        if (currentRoles.includes(role)) {
            newRoles = currentRoles.filter((r) => r !== role);
            if (newRoles.length === 0) newRoles = ["ROLE_USER"];
        } else {
            newRoles = [...currentRoles, role];
        }

        setUpdatingUserId(userId);
        try {
            await updateUserRolesAdmin(userId, newRoles);
            setUsers(users.map(u => u.id === userId ? { ...u, roles: newRoles } : u));
        } catch (error) {
            console.error("Failed to update roles", error);
            alert("Failed to update roles. Make sure you have admin permissions.");
        } finally {
            setUpdatingUserId(null);
        }
    };

    return (
        <AdminLayout>
            <UserManagementSection
                users={users}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                updatingUserId={updatingUserId}
                handleRoleToggle={handleRoleToggle}
            />
        </AdminLayout>
    );
}
