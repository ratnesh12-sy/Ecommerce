"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getCartAPI, addToCartAPI, updateCartItemAPI, removeFromCartAPI, CartResponse } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface CartContextType {
    cart: CartResponse | null;
    loading: boolean;
    error: string | null;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    updateCartItem: (itemId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshCart = useCallback(async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("emart_token") : null;
        if (!user || !token) {
            setCart(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await getCartAPI();
            setCart(data);
            setError(null);
        } catch (err) {
            const e = err as Error;
            // Silently handle auth errors (stale/expired token) — don't show error to user
            if (e.message.includes("401") || e.message.includes("403")) {
                console.warn("[CartContext] Auth error fetching cart — token may be expired. Clearing cart.");
                setCart(null);
            } else {
                setError(e.message || "Failed to load cart");
                setCart(null);
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = async (productId: number, quantity: number = 1) => {
        if (!user) {
            throw new Error("You must be logged in to add items to your cart.");
        }

        try {
            const data = await addToCartAPI(productId, quantity);
            setCart(data); // Immediate update from response
            setError(null);
        } catch (err) {
            const e = err as Error;
            setError(e.message || "Failed to add item to cart");
            throw e; // Rethrow to let components handle their own alert logic
        }
    };

    const updateCartItem = async (itemId: number, quantity: number) => {
        try {
            const data = await updateCartItemAPI(itemId, quantity);
            setCart(data);
            setError(null);
        } catch (err) {
            const e = err as Error;
            setError(e.message || "Failed to update item quantity");
            throw e;
        }
    };

    const removeFromCart = async (itemId: number) => {
        try {
            const data = await removeFromCartAPI(itemId);
            setCart(data);
            setError(null);
        } catch (err) {
            const e = err as Error;
            setError(e.message || "Failed to remove item from cart");
            throw e;
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, error, addToCart, updateCartItem, removeFromCart, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
