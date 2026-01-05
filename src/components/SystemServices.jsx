import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Users, BarChart3, Bot, Sparkles } from 'lucide-react';


const MagicCard = ({ icon: Icon, title, description, delay }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden rounded-3xl bg-white border border-zinc-200 p-8 h-full transition-all duration-300 hover:shadow-2xl group"
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Icon className="w-7 h-7 text-zinc-600 group-hover:text-indigo-600 transition-colors duration-300 relative z-10" />
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-indigo-900 transition-colors">
                    {title}
                </h3>

                <p className="text-base text-zinc-500 leading-relaxed max-w-sm">
                    {description}
                </p>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/10 rounded-3xl transition-colors duration-300 pointer-events-none" />
        </motion.div>
    );
};

const SystemServices = () => {
    const services = [
        {
            icon: PhoneCall,
            title: 'AI Calling & Support Agents',
            description: 'Never miss a call. Appointments booked automatically.',
        },
        {
            icon: Users,
            title: 'Sales & CRM Automation',
            description: 'Every lead tracked. Every follow-up automated.',
        },
        {
            icon: BarChart3,
            title: 'SAAS Application',
            description: 'Custom cloud platforms to manage your entire business from anywhere.',
        },
        {
            icon: Bot,
            title: 'Custom Business Automation',
            description: 'Built specifically for how your business works.',
        },
    ];


    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
                    >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Our Core Systems
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 font-display tracking-tight"
                    >
                        We replace people-dependent manual work with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">reliable systems</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {services.map((service, index) => (
                        <MagicCard
                            key={index}
                            {...service}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                        <p className="text-zinc-600 text-sm font-medium">
                            ⚡ This works even if you are not tech-savvy.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SystemServices;
