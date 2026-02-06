import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Mic2, MessageSquare, GraduationCap, ArrowRight, Zap, Grip, ShoppingCart } from 'lucide-react';

const colorVariants = {
    rose: {
        text: "text-rose-400",
        hoverText: "group-hover:text-rose-300",
        bg: "bg-rose-500/10",
        hoverBg: "group-hover:bg-rose-500/20",
    },
    emerald: {
        text: "text-emerald-400",
        hoverText: "group-hover:text-emerald-300",
        bg: "bg-emerald-500/10",
        hoverBg: "group-hover:bg-emerald-500/20",
    },
    blue: {
        text: "text-blue-400",
        hoverText: "group-hover:text-blue-300",
        bg: "bg-blue-500/10",
        hoverBg: "group-hover:bg-blue-500/20",
    },
    violet: {
        text: "text-violet-400",
        hoverText: "group-hover:text-violet-300",
        bg: "bg-violet-500/10",
        hoverBg: "group-hover:bg-violet-500/20",
    }
};

const AuroraCard = ({ title, subtext, tags, icon: Icon, delay, color, className, link }) => {
    const theme = colorVariants[color];

    return (
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "50px" }}
            className={`group relative overflow-hidden rounded-[2rem] bg-[#0A0A0B] border border-zinc-800 p-6 md:p-8 h-[400px] md:h-[380px] flex flex-col justify-between hover:border-zinc-700 transition-colors duration-500 ${className}`}
        >
            {/* Dynamic Aurora Background */}
            <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${theme.bg} rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 ${theme.hoverBg} transition-all duration-700`} />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />

            {/* Content Layer */}
            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300 group-hover:border-zinc-600`}>
                    <Icon className={`w-6 h-6 ${theme.text} ${theme.hoverText} transition-colors duration-300`} />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight font-display tracking-tight">
                    {title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm font-light">
                    {subtext}
                </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {tag}
                        </span>
                    ))}
                </div>

                {link ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center ${theme.text} ${theme.hoverText} font-semibold text-sm transition-colors cursor-pointer`}
                    >
                        Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                ) : (
                    <div className={`flex items-center ${theme.text} ${theme.hoverText} font-semibold text-sm transition-colors cursor-pointer`}>
                        Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const GrowthEngines = () => {
    const products = [
        {
            icon: Mic2,
            title: "The 24/7 Sales Agent That Never Sleeps",
            subtext: "Handles customer calls, books appointments, and syncs data automatically. No more missed opportunities.",
            tags: ["Voice AI", "CRM", "Automation"],
            color: "rose"
        },
        {
            icon: ShoppingCart,
            title: "ScaleOn E-Commerce Engine",
            subtext: "Config-driven platform for Indian SMBs. Fully admin-controlled, ultra-fast, and enterprise-stable. No developer needed after deployment.",
            tags: ["E-Commerce", "SMB India", "Config-Driven"],
            color: "violet",
            link: "https://scale-on-e-commerce-engine-frontend.vercel.app/"
        },
        {
            icon: GraduationCap,
            title: "AI-Powered Learning Management System",
            subtext: "Enterprise-grade platform handling 5000+ users. Features AI-generated quizzes, automated grading, and deep analytics. Built for high-scale education.",
            tags: ["LMS", "Education AI", "Enterprise"],
            color: "blue",
            link: "https://studywise-banking-site.vercel.app/dashboard"
        },
        {
            icon: MessageSquare,
            title: "WhatsApp Growth Engine",
            subtext: "Turn everyday conversations into consistent conversions. Automated follow-ups, broadcast campaigns, and instant support replies.",
            tags: ["WhatsApp API", "Marketing", "Support"],
            color: "emerald"
        }
    ];

    return (

        <section className="py-16 md:py-32 relative overflow-x-clip overflow-y-visible">
            {/* Subtly animated grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-20 md:flex md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <div className="h-px w-8 bg-indigo-500" />
                            <span className="text-indigo-400 font-medium tracking-widest uppercase text-xs">Powerful & Proven</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            className="mobile-h1 text-4xl md:text-5xl font-bold text-white mb-4 font-display"
                        >
                            Growth Engines We Build
                        </motion.h2>
                        <p className="text-xl text-zinc-500 max-w-lg">
                            Proven systems designed to scale real business operations.
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <Grip className="w-12 h-12 text-zinc-800" />
                    </div>
                </div>

                {/* Horizontal scroll carousel for all screen sizes */}
                <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 gap-4 md:gap-5 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                    {products.map((product, index) => (
                        <AuroraCard
                            key={index}
                            {...product}
                            delay={index * 0.1}
                            className="w-[80vw] min-w-[80vw] md:w-[45vw] md:min-w-[45vw] lg:w-[340px] lg:min-w-[340px] shrink-0 snap-center"
                        />
                    ))}
                </div>


                <div className="mt-20 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "50px" }}
                        transition={{ delay: 0.5 }}
                        className="inline-block p-[2px] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"
                    >
                        <div className="px-6 py-2 rounded-full bg-[#0A0A0B] flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400 fill-current" />
                            <p className="text-zinc-400 font-medium">
                                Works with WhatsApp, calls, and existing tools.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default memo(GrowthEngines);
