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
    );
}
