"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isRegistered: boolean;
    register: () => void;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("emart_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsRegistered(localStorage.getItem("emart_registered") === "true");
    }, []);

    const register = () => {
        // Just mark as registered, don't log in automatically
        setIsRegistered(true);
        localStorage.setItem("emart_registered", "true");
    };

    const login = (email: string) => {
        const newUser = { name: "Demo User", email };
        setUser(newUser);
        localStorage.setItem("emart_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("emart_user");
    };

    return (
        <AuthContext.Provider value={{ user, isRegistered, register, login, logout }}>
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
