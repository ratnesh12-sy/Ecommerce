"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  Smartphone,
  Shirt,
  Home,
  Gift,
  Sparkles,
  Star,
  Heart,
  ShoppingCart,
  Send,
  TrendingUp,
  Zap,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import StructuredData, {
  emartOrganizationSchema,
  emartWebsiteSchema,
} from "@/components/seo/StructuredData";

/* ───────── Animation Helpers ───────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ───────── Mock Data ───────── */
const categories = [
  { icon: Smartphone, label: "Electronics", count: "2.4k Products", gradient: "from-blue-500 to-cyan-400" },
  { icon: Shirt, label: "Fashion", count: "3.1k Products", gradient: "from-pink-500 to-rose-400" },
  { icon: Home, label: "Home & Living", count: "1.8k Products", gradient: "from-orange-500 to-amber-400" },
  { icon: Gift, label: "Beauty", count: "960 Products", gradient: "from-purple-500 to-violet-400" },
];

const trendingProducts = [
  {
    id: 1,
    name: "Wireless ANC Headphones",
    brand: "SoundCore",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 2841,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    brand: "Nordgreen",
    price: 189.00,
    originalPrice: 249.00,
    rating: 4.9,
    reviews: 1523,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    badge: "New",
    badgeColor: "bg-blue-600",
  },
  {
    id: 3,
    name: "Running Shoes Pro X",
    brand: "AirFlex",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 3210,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    badge: "Trending",
    badgeColor: "bg-rose-500",
  },
  {
    id: 4,
    name: "Smart Water Bottle",
    brand: "HydroTrack",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    badge: "- 29%",
    badgeColor: "bg-green-600",
  },
];

const features = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
  { icon: ShieldCheck, label: "Secure Checkout", desc: "256-bit SSL encryption" },
  { icon: Headphones, label: "24/7 Support", desc: "Chat or call anytime" },
  { icon: CreditCard, label: "Easy Returns", desc: "30-day return policy" },
];

/* ═══════════════════════════════════════ */
/*                HOME PAGE                */
/* ═══════════════════════════════════════ */

export default function HomePage() {
  return (
    <div className="bg-white overflow-hidden">
      <StructuredData data={emartOrganizationSchema} />
      <StructuredData data={emartWebsiteSchema} />

      {/* ━━━━━━━━━━ HERO ━━━━━━━━━━ */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/40 to-violet-100/40 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left – Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                New Season Collection 2026
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 leading-[1.08]"
              >
                Discover{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Premium
                </span>{" "}
                Products
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-6 text-gray-500 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed"
              >
                Curated collections of the finest products at unbeatable prices. Shop smart, live better.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200/50 transition-all hover:shadow-blue-300/60 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Create Account
                </Link>
              </motion.div>

              {/* Trust Row */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    Trusted by <span className="text-gray-700 font-bold">50k+</span> shoppers
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right – Product showcase cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-[3rem] blur-2xl" />

                {/* Main product card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-8 left-8 right-8 bottom-8 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden"
                >
                  <div className="relative w-full h-3/4">
                    <Image
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                      alt="Featured Product"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Featured</p>
                    <h3 className="font-bold text-gray-900 mt-1">Premium Headphones</h3>
                    <p className="text-blue-600 font-black text-lg mt-1">$299.99</p>
                  </div>
                </motion.div>

                {/* Floating badge – top right */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 px-4 py-3 flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Sales</p>
                    <p className="text-sm font-black text-gray-900">+24%</p>
                  </div>
                </motion.div>

                {/* Floating badge – bottom left */}
                <motion.div
                  animate={{ y: [0, 6, 0], rotate: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Rating</p>
                    <p className="text-sm font-black text-gray-900">4.9 / 5.0</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ FEATURES STRIP ━━━━━━━━━━ */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {features.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="flex items-center gap-4 py-6 px-4 md:px-6"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <feat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm leading-none">{feat.label}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ CATEGORIES ━━━━━━━━━━ */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
              Browse
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Shop by Category
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{cat.label}</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">{cat.count}</p>
                <ChevronRight className="absolute top-8 right-6 w-5 h-5 text-gray-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━ TRENDING PRODUCTS ━━━━━━━━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
                What&apos;s Hot
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Trending Now
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/menu"
                className="hidden sm:inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {trendingProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <span
                    className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg`}
                  >
                    {product.badge}
                  </span>
                  {/* Wishlist */}
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-sm">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 md:p-5">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.brand}</p>
                  <h3 className="font-bold text-gray-900 text-sm mt-1 leading-snug line-clamp-1">{product.name}</h3>

                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    <span className="text-[10px] text-gray-400">({product.reviews.toLocaleString()})</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-gray-900">${product.price}</span>
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    </div>
                    <button className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-700 shadow-lg shadow-blue-200/50">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile view all */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ PROMO BANNER ━━━━━━━━━━ */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-[2.5rem] p-10 md:p-16 overflow-hidden text-center md:text-left"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
            <div className="absolute top-6 right-10 opacity-10">
              <Zap className="w-32 h-32 text-white" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">Limited Time Offer</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Get 30% Off Your <br className="hidden sm:block" />
                First Order
              </h2>
              <p className="text-blue-100 mt-4 text-sm sm:text-base max-w-lg">
                Sign up today and enjoy exclusive discounts on the latest arrivals. Use code <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">WELCOME30</span> at checkout.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 group"
                >
                  Claim Offer
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━ NEWSLETTER ━━━━━━━━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-xl mx-auto"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-5"
            >
              <Send className="w-6 h-6" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-gray-900 tracking-tight">
              Stay in the Loop
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 mt-3 text-sm leading-relaxed">
              Get the latest deals, new arrivals, and exclusive offers delivered straight to your inbox.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200/50 transition-all shrink-0">
                Subscribe
              </button>
            </motion.div>
            <motion.p variants={fadeUp} className="text-[11px] text-gray-400 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
