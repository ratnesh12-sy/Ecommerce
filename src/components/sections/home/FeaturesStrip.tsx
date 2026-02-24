"use client";

import React from "react";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const features = [
    { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
    { icon: ShieldCheck, label: "Secure Checkout", desc: "256-bit SSL encryption" },
    { icon: Headphones, label: "24/7 Support", desc: "Chat or call anytime" },
    { icon: CreditCard, label: "Easy Returns", desc: "30-day return policy" },
];

export default function FeaturesStrip() {
    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:divide-x md:divide-gray-100">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.label}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            custom={i}
                            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 px-6"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-50/50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                <feat.icon className="w-6 h-6 text-blue-600 drop-shadow-sm" />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 text-base tracking-tight uppercase">{feat.label}</h4>
                                <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">{feat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
