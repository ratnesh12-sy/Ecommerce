"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getAllCategoriesAPI,
    getProductsBySubCategoryAPI,
    getProductsByCategoryAPI,
    CategoryDTO,
    SubCategoryDTO,
    ProductResponse
} from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { fadeUp, stagger } from "@/lib/animations";
import { useSearchParams } from "next/navigation";

function ShopByCategoryContent() {
    const { addToCart } = useCart();
    const searchParams = useSearchParams();
    const categoryIdParam = searchParams.get("id");

    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>(null);

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial Load: Fetch hierarchical categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getAllCategoriesAPI();
                setCategories(data);

                if (data.length > 0) {
                    const idToSelect = categoryIdParam ? parseInt(categoryIdParam) : data[0].id;
                    setActiveCategoryId(idToSelect);
                    setActiveSubCategoryId(-1);
                }
            } catch (err) {
                const error = err as Error;
                setError(error.message || "Failed to load categories");
            } finally {
                setLoadingCategories(false);
            }
        }
        fetchCategories();
    }, []);

    // Fetch Products whenever the active subcategory changes
    useEffect(() => {
        if (activeSubCategoryId === null || !activeCategoryId) {
            setProducts([]);
            return;
        }

        async function fetchProducts() {
            setLoadingProducts(true);
            try {
                const activeCategory = categories.find(c => c.id === activeCategoryId);
                if (!activeCategory) return;

                let data: ProductResponse[] = [];
                if (activeSubCategoryId === -1) {
                    data = await getProductsByCategoryAPI(activeCategory.name) || [];
                } else if (activeSubCategoryId !== null) {
                    data = await getProductsBySubCategoryAPI(activeSubCategoryId) || [];
                }
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products for subcategory:", err);
            } finally {
                setLoadingProducts(false);
            }
        }
        fetchProducts();
    }, [activeSubCategoryId, activeCategoryId, categories]);

    const activeCategory = categories.find(c => c.id === activeCategoryId);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                >
                    <div className="text-left">
                        <motion.p variants={fadeUp} className="text-sm font-black text-blue-600 uppercase tracking-[0.25em] mb-3">
                            Shop by Category
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Browse <span className="text-gradient-premium">Collections</span>
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp} className="mt-6 md:mt-0">
                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-3 bg-gray-50 text-gray-900 font-bold px-8 py-4 rounded-2xl hover:bg-black hover:text-white transition-all duration-300 group"
                        >
                            Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {loadingCategories ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 font-bold">{error}</p>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center mt-12 mb-12">
                        <p className="text-gray-500 text-lg">New products arriving soon! Check back later.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Category Explorer Tabs */}
                        <div className="w-full">
                            <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 scrollbar-hide">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setActiveCategoryId(category.id);
                                            setActiveSubCategoryId(-1);
                                        }}
                                        className={`flex-shrink-0 px-8 py-3 rounded-full text-sm font-black tracking-wide uppercase transition-all duration-300 ${activeCategoryId === category.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SubCategory Pills */}
                        {activeCategory && activeCategory.subCategories && activeCategory.subCategories.length > 0 && (
                            <div className="flex flex-wrap gap-3 pb-4 border-b border-gray-100">
                                <button
                                    onClick={() => setActiveSubCategoryId(-1)}
                                    className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all duration-300 border ${activeSubCategoryId === -1
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    All
                                </button>
                                {activeCategory.subCategories.map((sub: SubCategoryDTO) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setActiveSubCategoryId(sub.id)}
                                        className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all duration-300 border ${activeSubCategoryId === sub.id
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {sub.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Dynamic Product Grid */}
                        <div className="min-h-[400px]">
                            {loadingProducts ? (
                                <div className="flex justify-center items-center py-20 h-full">
                                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                                </div>
                            ) : products.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 h-full text-center">
                                    <h3 className="text-xl font-bold mb-2">No products found</h3>
                                    <p className="text-gray-500 max-w-sm">We are restocking our inventory. Check back soon for amazing items in this category!</p>
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSubCategoryId || "empty"}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                                    >
                                        {products.map((product, i) => (
                                            <motion.div
                                                key={product.id}
                                                variants={fadeUp}
                                                custom={i}
                                                whileHover={{ y: -12 }}
                                                className="group relative bg-white/70 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer flex flex-col h-full"
                                            >
                                                {/* Image Wrapper */}
                                                <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden flex-shrink-0">
                                                    {product.imageUrl ? (
                                                        <Image
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                            No Image
                                                        </div>
                                                    )}
                                                    {/* Dynamic Overlays */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                    {/* Badge */}
                                                    <div className="absolute top-4 left-4 flex gap-2">
                                                        <span className={`bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md`}>
                                                            {product.stockQuantity > 0 ? "Available" : "Sold Out"}
                                                        </span>
                                                    </div>

                                                    {/* Quick Actions */}
                                                    <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2">
                                                        <button className="w-10 h-10 bg-white shadow-xl rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                                            <Heart className="w-4.5 h-4.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Detailed Info */}
                                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <p className="text-xs text-blue-600 font-black uppercase tracking-widest">{product.category}</p>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                            <span className="text-xs font-bold text-gray-900">4.5</span>
                                                        </div>
                                                    </div>

                                                    <h3 className="font-black text-gray-900 text-lg mb-4 leading-tight group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2 min-h-[50px]">{product.name}</h3>

                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                                        <div className="flex flex-col">
                                                            <span className="text-2xl font-black text-gray-900 tracking-tight">${product.price.toFixed(2)}</span>
                                                        </div>
                                                        <button
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                try {
                                                                    await addToCart(product.id, 1);
                                                                    alert("Added to Cart Successfully!");
                                                                } catch (err) {
                                                                    const error = err as Error;
                                                                    alert("Failed to add to cart: " + error.message);
                                                                }
                                                            }}
                                                            disabled={product.stockQuantity <= 0}
                                                            className="bg-black text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-blue-600 hover:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                                            {product.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                )}

                {/* Mobile view all */}
                {categories.length > 0 && (
                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm"
                        >
                            View All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default function ShopByCategory() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        }>
            <ShopByCategoryContent />
        </Suspense>
    );
}
