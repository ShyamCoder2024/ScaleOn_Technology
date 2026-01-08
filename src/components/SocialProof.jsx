import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Counter } from './ui/counter';

import { cn } from '../lib/utils';

const testimonials = [
    {
        text: "ScaleOn's automation tools helped us reduce manual data entry by 80%. As a textile manufacturer, this efficiency is crucial for our margins.",
        name: "Rajesh Kumar",
        role: "Owner, Kumar Textiles",
    },
    {
        text: "The AI chatbot handles customer queries 24/7. We've seen a 40% increase in online orders since integrating it into our website.",
        name: "Priya Sharma",
        role: "Founder, StyleHub Boutique",
    },
    {
        text: "Managing inventory for my three hardware stores was a nightmare. This ERP solution unified everything perfectly.",
        name: "Amit Patel",
        role: "Director, Patel Hardware & Tools",
    },
    {
        text: "Professional and timely delivery. The custom dashboard gave me visibility into my logistics business that I never had before.",
        name: "Suresh Reddy",
        role: "CEO, Reddy Logistics",
    },
    {
        text: "Best decision for our coaching center. The student management system saves us hours of admin work every week.",
        name: "Anjali Gupta",
        role: "Principal, Excel Academy",
    },
    {
        text: "ScaleOn understood our specific needs as a B2B supplier. The automated invoicing system basically pays for itself.",
        name: "Vikram Singh",
        role: "MD, Singh Industrial Supplies",
    },
    {
        text: "Our restaurant chain needed a better POS integration. These guys delivered a seamless solution that works flawlessly.",
        name: "Arjun Nair",
        role: "Founder, Spice Route Kitchens",
    },
    {
        text: "Highly recommended for any Indian SME looking to digitize. The support team speaks our language and understands our market.",
        name: "Swati Deshit",
        role: "Co-founder, Deshmukh Interiors",
    },
    {
        text: "From a local shop to an online brand, ScaleOn's e-commerce tools made the transition incredibly smooth.",
        name: "Manoj Verma",
        role: "Owner, Verma Electronics",
    },
];

const TestimonialCard = memo(({ data, theme }) => (
    <div className="mb-6 break-inside-avoid">
        <div className={cn(
            "rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300",
            theme === 'dark'
                ? "bg-[#0A0A0B] border-zinc-800"
                : "bg-white border-zinc-100"
        )}>
            <Quote className={cn(
                "w-8 h-8 mb-4 fill-current transition-colors duration-300",
                theme === 'dark' ? "text-indigo-500/30" : "text-indigo-100"
            )} />
            <p className={cn(
                "mb-6 leading-relaxed font-light transition-colors duration-300",
                theme === 'dark' ? "text-zinc-400" : "text-zinc-600"
            )}>"{data.text}"</p>
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300",
                    theme === 'dark'
                        ? "bg-zinc-800 text-indigo-400"
                        : "bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-700"
                )}>
                    {data.name.charAt(0)}
                </div>
                <div>
                    <h4 className={cn(
                        "font-bold text-sm transition-colors duration-300",
                        theme === 'dark' ? "text-zinc-100" : "text-zinc-900"
                    )}>{data.name}</h4>
                    <p className={cn(
                        "text-xs transition-colors duration-300",
                        theme === 'dark' ? "text-zinc-500" : "text-zinc-500"
                    )}>{data.role}</p>
                </div>
            </div>
        </div>
    </div>
));
TestimonialCard.displayName = 'TestimonialCard';

// PERFORMANCE: Use pure CSS animation instead of Framer Motion
const InfiniteColumn = memo(({ children, duration = 20, className = "", theme }) => (
    <div className={`relative overflow-hidden ${className}`}>
        <div
            className="flex flex-col gpu-accel"
            style={{
                animation: `scrollUp ${duration}s linear infinite`,
                willChange: 'transform',
            }}
        >
            {children}
            {children}
        </div>

        {/* Gradients to fade in/out - Adaptive */}
        <div className={cn(
            "absolute top-0 inset-x-0 h-24 z-10 pointer-events-none transition-colors duration-300",
            theme === 'dark' ? "bg-gradient-to-b from-[#050505] to-transparent" : "bg-gradient-to-b from-white to-transparent"
        )} />
        <div className={cn(
            "absolute bottom-0 inset-x-0 h-24 z-10 pointer-events-none transition-colors duration-300",
            theme === 'dark' ? "bg-gradient-to-t from-[#050505] to-transparent" : "bg-gradient-to-t from-white to-transparent"
        )} />
    </div>
));
InfiniteColumn.displayName = 'InfiniteColumn';


const SocialProof = ({ theme }) => {
    const list1 = testimonials.slice(0, 3);
    const list2 = testimonials.slice(3, 6);
    const list3 = testimonials.slice(6, 9);

    return (
        <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Stats */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <div className={cn(
                            "inline-block mb-3 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                            theme === 'dark'
                                ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                                : "bg-indigo-50 border-indigo-100 text-indigo-600"
                        )}>
                            Proven Results
                        </div>
                        <h3 className={cn(
                            "text-3xl font-bold transition-colors duration-300",
                            theme === 'dark' ? "text-white" : "text-zinc-900"
                        )}>Real outcomes from real Indian businesses</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                        {[
                            { value: 70, suffix: "%", label: "Fewer no-shows" },
                            { value: 40, suffix: "%", label: "Higher conversions" },
                            { value: 24, suffix: "/7", label: "Automated operations" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                viewport={{ once: true, margin: "-15%" }}
                                className={cn(
                                    "p-8 rounded-2xl shadow-sm border transition-all duration-300",
                                    index === 2 ? "col-span-2 md:col-span-1" : "",
                                    theme === 'dark'
                                        ? "bg-[#0A0A0B] border-zinc-800 hover:border-zinc-700"
                                        : "bg-white border-zinc-100 hover:border-indigo-100"
                                )}
                            >
                                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-400 mb-2 font-display tracking-tight">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-zinc-500 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Wall of Love */}
                <div className="relative">
                    <h2 className={cn(
                        "text-3xl font-bold text-center mb-12 transition-colors duration-300",
                        theme === 'dark' ? "text-white" : "text-zinc-900"
                    )}>Trusted by Indian Businesses</h2>
                    <div className="grid md:grid-cols-3 gap-6 h-[600px] overflow-hidden">
                        <InfiniteColumn duration={25} theme={theme}>
                            {list1.map((t, i) => <TestimonialCard key={i} data={t} theme={theme} />)}
                        </InfiniteColumn>
                        <InfiniteColumn duration={35} className="hidden md:block" theme={theme}>
                            {list2.map((t, i) => <TestimonialCard key={i} data={t} theme={theme} />)}
                        </InfiniteColumn>
                        <InfiniteColumn duration={30} className="hidden lg:block" theme={theme}>
                            {list3.map((t, i) => <TestimonialCard key={i} data={t} theme={theme} />)}
                        </InfiniteColumn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
