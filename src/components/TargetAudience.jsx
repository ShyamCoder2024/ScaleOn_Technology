import React, { useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Utensils, Stethoscope, Briefcase, User, XCircle, ArrowRight } from 'lucide-react';
import { cn } from "../lib/utils";

const SpotlightCard = ({ icon: Icon, label, index, className }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={cn(
                "relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl group",
                className
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(37,99,235,0.08), transparent 40%)`,
                }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50/50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-500 shadow-sm">
                    <Icon className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-semibold text-lg text-zinc-800 tracking-tight group-hover:text-black transition-colors">
                    {label}
                </h3>
            </div>

            <div className="absolute inset-0 border border-indigo-500/0 group-hover:border-indigo-500/10 rounded-2xl transition-all duration-500" />
        </motion.div>
    );

};

const Highlight = ({ children, className }) => {
    return (
        <span className={cn("relative inline-block", className)}>
            <motion.svg
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                style={{ originX: 0 }}
                className="absolute inset-0 top-1/2 -translate-y-1/2 h-[120%] w-full -z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 50 Q 50 40 100 50"
                    vectorEffect="non-scaling-stroke"
                    stroke="#FDE047" // yellow-300
                    strokeWidth="80"
                    fill="none"
                    className="opacity-50 mix-blend-multiply"
                />
            </motion.svg>
            <span className="relative z-10">{children}</span>
        </span>
    );
};

const TargetAudience = () => {
    const audiences = [
        { icon: Stethoscope, label: 'Clinics & Salons' },
        { icon: Building2, label: 'Real Estate Firms' },
        { icon: Utensils, label: 'Restaurants & Cafes' },
        { icon: Briefcase, label: 'Service Agencies' },
        {
            icon: User,
            label: (
                <>
                    <span className="md:hidden">Small and Medium Business Owners</span>
                    <span className="hidden md:inline">SMB Founders</span>
                </>
            )
        },
    ];

    return (
        <section id="industries" className="py-16 md:py-32 bg-zinc-50/50 relative overflow-hidden scroll-mt-24">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        Who We Help
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight font-display"
                    >
                        Built for businesses that want <br className="hidden md:block" />
                        <span className="text-indigo-600">systems, not the manual way</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-20">
                    {audiences.map((item, index) => (
                        <SpotlightCard
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            index={index}
                            className={index === 4 ? "col-span-2 lg:col-span-1" : ""}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center justify-center text-center space-y-6"
                >
                    <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-2xl leading-relaxed">
                        If your business runs on calls, WhatsApp, Excel, or manual follow-ups — <Highlight className="text-zinc-900 font-medium px-1">this is built for you.</Highlight>
                    </p>

                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-700">Built specifically for Indian business workflows</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TargetAudience;
