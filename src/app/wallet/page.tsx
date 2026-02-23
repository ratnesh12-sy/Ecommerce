"use client";

import React from "react";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, History, CreditCard, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    }),
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const WalletPage = () => {
    const balance = "1,250.00";
    const transactions = [
        { id: 1, type: "received", title: "Cashback Reward", date: "Today, 2:30 PM", amount: "+$25.00", icon: ArrowDownLeft, color: "text-green-600 bg-green-50" },
        { id: 2, type: "spend", title: "Order #EM-9021", date: "Yesterday", amount: "-$142.50", icon: ArrowUpRight, color: "text-gray-900 bg-gray-50" },
        { id: 3, type: "spend", title: "Order #EM-8945", date: "Feb 14, 2026", amount: "-$64.20", icon: ArrowUpRight, color: "text-gray-900 bg-gray-50" },
        { id: 4, type: "topup", title: "Added from Bank", date: "Feb 10, 2026", amount: "+$500.00", icon: ArrowDownLeft, color: "text-green-600 bg-green-50" },
    ];

    return (
        <div className="min-h-screen bg-white pb-28 md:pb-12 px-4 sm:px-6 pt-8 sm:pt-10">
            <div className="max-w-xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Wallet</h1>
                            <p className="text-sm text-gray-400 mt-0.5">Manage your balance & transactions</p>
                        </div>
                        <button className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                            <History className="w-5 h-5 text-gray-500" />
                        </button>
                    </motion.div>

                    {/* Main Balance Card */}
                    <motion.div
                        variants={fadeUp}
                        className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-[2.5rem] p-7 sm:p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200/50 mb-8"
                    >
                        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">
                                <Wallet className="w-4 h-4" /> Available Balance
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold opacity-60">$</span>
                                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">{balance}</h2>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button className="flex-1 bg-white text-blue-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all">
                                    <Plus className="w-5 h-5" /> Top Up
                                </button>
                                <button className="flex-1 bg-white/15 backdrop-blur-sm text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 border border-white/20 hover:bg-white/25 transition-all">
                                    <CreditCard className="w-5 h-5" /> Withdraw
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-10">
                        <div className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:border-blue-200 hover:shadow-md cursor-pointer transition-all">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <p className="font-bold text-gray-900 text-sm">Linked Cards</p>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Manage 2 cards</p>
                        </div>
                        <div className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:border-blue-200 hover:shadow-md cursor-pointer transition-all">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <History className="w-5 h-5" />
                            </div>
                            <p className="font-bold text-gray-900 text-sm">Monthly Report</p>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">View analytics</p>
                        </div>
                    </motion.div>

                    {/* Transactions */}
                    <motion.div variants={fadeUp} className="space-y-5">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="font-black text-gray-900 tracking-tight">Recent Activity</h3>
                            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View All</button>
                        </div>

                        <div className="space-y-2">
                            {transactions.map((t, i) => (
                                <motion.div
                                    key={t.id}
                                    variants={fadeUp}
                                    custom={i}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-100"
                                >
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${t.color}`}>
                                        <t.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 text-sm leading-none mb-1">{t.title}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{t.date}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className={`font-black text-sm ${t.type === 'spend' ? 'text-gray-900' : 'text-green-600'}`}>
                                            {t.amount}
                                        </p>
                                        <ChevronRight className="w-3 h-3 text-gray-200 ml-auto mt-1" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default WalletPage;
