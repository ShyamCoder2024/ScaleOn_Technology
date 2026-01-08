import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ui/scroll-reveal';

const ProblemSolution = () => {
    const [activeTab, setActiveTab] = useState('solution');



    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <ScrollReveal
                            text="Stop running your business on manual mode."
                            className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight font-display mb-6"
                        />
                        <p className="text-xl text-zinc-500 max-w-md mt-6">
                            Most businesses don’t have a growth problem — they have a systems problem.
                        </p>
                    </div>

                    {/* Interactive Toggle */}
                    <div className="flex justify-start lg:justify-end">
                        <div className="p-1.5 bg-zinc-100/80 rounded-full inline-flex relative shadow-inner">
                            {/* PERFORMANCE: Use CSS transition instead of layoutId */}
                            <div
                                className="absolute inset-y-1.5 bg-white rounded-full shadow-sm z-0 w-[calc(50%-6px)] transition-all duration-300 ease-out"
                                style={{ left: activeTab === 'problem' ? '6px' : '50%' }}
                            />
                            <button
                                onClick={() => setActiveTab('problem')}
                                className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200 ${activeTab === 'problem' ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                            >
                                Current Manual Way
                            </button>
                            <button
                                onClick={() => setActiveTab('solution')}
                                className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200 ${activeTab === 'solution' ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                            >
                                The ScaleOn Way
                            </button>
                        </div>
                    </div>
                </div>


                {/* Content Area */}
                <div className="relative h-[500px] md:h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'problem' ? (
                            <motion.div
                                key="problem"
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 bg-red-50/50 rounded-3xl border border-red-100 p-5 md:p-12"
                            >
                                <div className="h-full flex flex-col md:flex-row gap-12 items-center">
                                    <div className="flex-1 space-y-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-3 bg-red-100 rounded-xl">
                                                <XCircle className="w-6 h-6 text-red-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-zinc-900">The "Manual" Trap</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            {[
                                                'Missed calls & leads = Lost revenue',
                                                'Manual follow-ups that never happen',
                                                'No visibility on actual sales numbers',
                                                'Too many disconnected tools & spreadsheets'
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm md:text-lg text-zinc-600">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex-1 w-full flex justify-center opacity-80 mix-blend-multiply">
                                        {/* Abstract visualisation of chaos */}
                                        <div className="relative w-64 h-64">
                                            <div className="absolute inset-0 bg-red-200 rounded-full blur-3xl opacity-20 animate-pulse" />
                                            <div className="grid grid-cols-2 gap-4 rotate-3">
                                                <div className="bg-white p-4 rounded-xl shadow-lg border border-red-100 transform -rotate-6 translate-y-4">
                                                    <div className="h-2 w-12 bg-red-100 rounded mb-2" />
                                                    <div className="h-2 w-full bg-zinc-100 rounded" />
                                                </div>
                                                <div className="bg-white p-4 rounded-xl shadow-lg border border-red-100 transform rotate-12">
                                                    <div className="h-2 w-12 bg-red-100 rounded mb-2" />
                                                    <div className="h-2 w-full bg-zinc-100 rounded" />
                                                </div>
                                                <div className="bg-white p-4 rounded-xl shadow-lg border border-red-100 transform -rotate-3 -translate-y-2">
                                                    <div className="h-2 w-12 bg-red-100 rounded mb-2" />
                                                    <div className="h-2 w-full bg-zinc-100 rounded" />
                                                </div>
                                                <div className="bg-white p-4 rounded-xl shadow-lg border border-red-100 transform rotate-6 translate-x-2">
                                                    <div className="h-2 w-12 bg-red-100 rounded mb-2" />
                                                    <div className="h-2 w-full bg-zinc-100 rounded" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="solution"
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-3xl border border-indigo-800 p-5 md:p-12 text-white overflow-hidden shadow-2xl"
                            >
                                {/* Background glow */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10 h-full flex flex-col md:flex-row gap-12 items-center">
                                    <div className="flex-1 space-y-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-3 bg-indigo-500/20 rounded-xl ring-1 ring-indigo-500/50">
                                                <CheckCircle2 className="w-6 h-6 text-indigo-300" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">The ScaleOn Ecosystem</h3>
                                        </div>
                                        <ul className="space-y-5">
                                            {[
                                                'AI answers calls & books appointments 24/7',
                                                'Auto-WhatsApp follow-ups for every lead',
                                                'Real-time automated business dashboards',
                                                'One unified system for your entire team'
                                            ].map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 + (i * 0.1) }}
                                                    className="flex items-center gap-4 text-sm md:text-lg text-indigo-100/90 font-light"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <div className="pt-4">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm">
                                                <span className="text-sm font-medium text-indigo-200">✨ No extra staff required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full flex justify-center items-center">
                                        {/* Minimalist Dashboard Visual */}
                                        <div className="relative w-full max-w-sm bg-indigo-950/50 rounded-xl border border-indigo-500/30 p-6 backdrop-blur-md shadow-2xl">
                                            <div className="flex gap-4 mb-6">
                                                <div className="flex-1 h-20 rounded-lg bg-indigo-600/20 border border-indigo-500/30"></div>
                                                <div className="flex-1 h-20 rounded-lg bg-indigo-600/20 border border-indigo-500/30"></div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="h-2 w-3/4 bg-indigo-500/20 rounded"></div>
                                                <div className="h-2 w-1/2 bg-indigo-500/20 rounded"></div>
                                                <div className="h-2 w-full bg-indigo-500/20 rounded"></div>
                                            </div>

                                            {/* Floating badge */}
                                            <div className="absolute -right-4 -bottom-4 bg-lime-400 text-indigo-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-indigo-900 animate-pulse" />
                                                SYSTEM ACTIVE
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default memo(ProblemSolution);
