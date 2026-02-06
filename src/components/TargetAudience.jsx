import React, { useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Building2, Utensils, Stethoscope, Briefcase, User, XCircle, ArrowRight } from 'lucide-react';
import { cn } from "../lib/utils";

// PERFORMANCE: Cache touch device check at module level
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

const SpotlightCard = memo(({ icon: Icon, label, index, className }) => {
    const divRef = useRef(null);
    const spotlightRef = useRef(null);

    // PERFORMANCE: Use DOM manipulation instead of React state for mouse position
    const handleMouseMove = useCallback((e) => {
        // Skip on touch devices
        if (isTouchDevice || !spotlightRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Direct DOM update - no React re-render
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(37,99,235,0.08), transparent 40%)`;
        spotlightRef.current.style.opacity = '1';
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (spotlightRef.current) {
            spotlightRef.current.style.opacity = '0';
        }
    }, []);

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.4 }}
            viewport={{ once: true, margin: "50px" }}
            className={cn(
                "relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl group",
                className
            )}
        >
            {/* PERFORMANCE: Spotlight now uses ref-based DOM updates */}
            <div
                ref={spotlightRef}
                className="spotlight-effect pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
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
});
SpotlightCard.displayName = 'SpotlightCard';


const Highlight = ({ children, className }) => {
    return (
        <span className={cn("relative inline-block", className)}>
            <motion.svg
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "50px" }}
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
                        viewport={{ once: true, margin: "50px" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        Who We Help
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "50px" }}
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
                    viewport={{ once: true, margin: "50px" }}
                    transition={{ delay: 0.3 }}
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

export default memo(TargetAudience);
