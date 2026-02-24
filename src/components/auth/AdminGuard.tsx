"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AdminGuardProps {
    children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Not logged in -> admin login
                router.push("/admin/login");
            } else if (!user.roles?.includes("ROLE_ADMIN")) {
                // Logged in but not admin -> home
                router.push("/");
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-gray-400 font-medium animate-pulse">Authenticating Admin Access...</p>
                </div>
            </div>
        );
    }

    if (!user || !user.roles?.includes("ROLE_ADMIN")) {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
};

export default AdminGuard;
