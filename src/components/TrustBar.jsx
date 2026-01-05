import React, { useEffect, useState, memo } from 'react';
import { Building2, Utensils, Stethoscope, Briefcase, ShoppingBag, Database, Zap, Globe } from 'lucide-react';

const industries = [
    { icon: Stethoscope, label: 'Clinics & Healthcare' },
    { icon: Utensils, label: 'Restaurants & Cafes' },
    { icon: Building2, label: 'Real Estate Firms' },
    { icon: Briefcase, label: 'Service Agencies' },
    { icon: ShoppingBag, label: 'Retail Stores' },
    { icon: Database, label: 'Logistics' },
    { icon: Zap, label: 'Manufacturing' },
    { icon: Globe, label: 'E-commerce' },
];

const TrustBar = () => {
    // Duplicate array for seamless infinite scroll
    const scrollingIndustries = [...industries, ...industries];

    return (
        <section className="py-16 border-b border-zinc-100/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                    Trusted by growing Indian businesses across multiple industries
                </p>
            </div>

            <div className="flex overflow-hidden group">
                <div className="flex gap-16 animate-scroll hover:[animation-play-state:paused] whitespace-nowrap py-2 pl-4">
                    {scrollingIndustries.map((industry, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 text-zinc-400 hover:text-indigo-600 transition-colors duration-300 cursor-default select-none group/item"
                        >
                            <industry.icon className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" />
                            <span className="font-medium text-lg tracking-tight">{industry.label}</span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-16 animate-scroll hover:[animation-play-state:paused] whitespace-nowrap py-2 pl-16" aria-hidden="true">
                    {scrollingIndustries.map((industry, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 text-zinc-400 hover:text-indigo-600 transition-colors duration-300 cursor-default select-none group/item"
                        >
                            <industry.icon className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" />
                            <span className="font-medium text-lg tracking-tight">{industry.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(TrustBar);
