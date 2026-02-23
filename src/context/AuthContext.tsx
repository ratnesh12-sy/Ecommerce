"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginAPI, registerAPI, firebaseLoginAPI, getUserProfile } from "@/lib/api";

interface User {
    name: string;
    email?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    loginWithPhone: (idToken: string, phone: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Restore user session from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("emart_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("emart_user");
                localStorage.removeItem("emart_token");
            }
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    /** Helper: fetch real profile from backend and save it */
    const fetchAndStoreProfile = useCallback(async (fallbackName: string, fallbackEmail?: string, fallbackPhone?: string) => {
        try {
            const profile = await getUserProfile();
            const newUser: User = {
                name: profile.name || fallbackName,
                email: profile.email || fallbackEmail,
                phone: profile.mobileNumber || fallbackPhone,
            };
            setUser(newUser);
            localStorage.setItem("emart_user", JSON.stringify(newUser));
        } catch {
            // If profile fetch fails, use fallback values
            const newUser: User = { name: fallbackName, email: fallbackEmail, phone: fallbackPhone };
            setUser(newUser);
            localStorage.setItem("emart_user", JSON.stringify(newUser));
        }
    }, []);

    // ─── Email + Password Login ───
    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginAPI(email, password);
            localStorage.setItem("emart_token", response.accessToken);

            // Fetch real profile from backend to get actual name
            await fetchAndStoreProfile(email.split("@")[0], email);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed. Please try again.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchAndStoreProfile]);

    // ─── Email + Password Register ───
    const register = useCallback(async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            await registerAPI(name, email, password);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Registration failed. Please try again.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // ─── Firebase Phone OTP Login ───
    const loginWithPhone = useCallback(async (idToken: string, phone: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await firebaseLoginAPI(idToken);
            localStorage.setItem("emart_token", response.accessToken);

            // Fetch real profile from backend to get actual name
            await fetchAndStoreProfile(phone, undefined, phone);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed. Please try again.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchAndStoreProfile]);

    const updateUser = useCallback((updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem("emart_user", JSON.stringify(updatedUser));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setError(null);
        localStorage.removeItem("emart_user");
        localStorage.removeItem("emart_token");
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, loginWithPhone, logout, clearError, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
