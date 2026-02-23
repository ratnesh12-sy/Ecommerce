"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginAPI, registerAPI, firebaseLoginAPI } from "@/lib/api";

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

    // ─── Email + Password Login ───
    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginAPI(email, password);
            localStorage.setItem("emart_token", response.accessToken);

            const newUser: User = { name: email.split("@")[0], email };
            setUser(newUser);
            localStorage.setItem("emart_user", JSON.stringify(newUser));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed. Please try again.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

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

            const newUser: User = { name: phone, phone };
            setUser(newUser);
            localStorage.setItem("emart_user", JSON.stringify(newUser));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed. Please try again.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

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
