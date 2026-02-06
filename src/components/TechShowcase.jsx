import { useState } from 'react';
import { LayoutDashboard, Heart, Headphones, ArrowRight, BarChart3, Users, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
    {
        id: 'dashboard',
        icon: LayoutDashboard,
        title: 'SaaS Management Dashboard',
        description: 'Real-time clarity for every decision.',
        visual: (
            <div className="w-full h-full p-6 flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex-1 h-32 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                        <div className="text-xs text-indigo-400 mb-2">Total Revenue</div>
                        <div className="text-2xl font-bold text-white mb-2">$124,500</div>
                        <div className="h-1 w-full bg-indigo-500/20 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} className="h-full bg-indigo-500 rounded-full" />
                        </div>
                    </div>
                    <div className="flex-1 h-32 rounded-xl bg-pink-500/10 border border-pink-500/20 p-4">
                        <div className="text-xs text-pink-400 mb-2">Active Users</div>
                        <div className="text-2xl font-bold text-white mb-2">1,240</div>
                        <div className="h-8 flex items-end gap-1">
                            {[40, 60, 45, 80, 55, 90].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.03 }}
                                    className="flex-1 bg-pink-500/50 rounded-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-zinc-400 font-medium">Recent Activity</div>
                        <BarChart3 className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs">US</div>
                                <div className="flex-1 h-2 bg-zinc-700 rounded w-full" />
                                <div className="w-12 h-2 bg-zinc-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'crm',
        icon: Heart,
        title: 'AI-Powered CRM Suite',
        description: 'The CRM that works while your team sleeps.',
        visual: (
            <div className="w-full h-full p-6 flex flex-col justify-center">
                <div className="space-y-4">
                    {[
                        { name: 'Sarah Miller', status: 'Interested', score: 92 },
                        { name: 'TechCorp Inc', status: 'Negotiation', score: 85 },
                        { name: 'David Chen', status: 'New Lead', score: 45 }
                    ].map((lead, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.035 }}
                            className="bg-zinc-800/80 border border-zinc-700 rounded-xl p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
                                    {lead.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-bold">{lead.name}</div>
                                    <div className="text-xs text-zinc-400">{lead.status}</div>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${lead.score > 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {lead.score}%
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 'support',
        icon: Headphones,
        title: 'Customer Support Hub',
        description: 'Auto-resolve 80% of queries instantly.',
        visual: (
            <div className="w-full h-full p-6 flex flex-col justify-end space-y-4">
                <motion.div
                    initial={{ opacity: 0.85, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="self-start max-w-[80%] bg-zinc-800 rounded-2xl rounded-tl-none p-3 text-sm text-zinc-300 border border-zinc-700"
                >
                    How do I reset my API key?
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.85, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="self-end max-w-[80%] bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 text-sm shadow-lg shadow-indigo-500/20"
                >
                    <div className="flex items-center gap-2 mb-1 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" /> AI Assistant
                    </div>
                    You can reset your API key in the Settings dashboard under the "Security" tab. Would you like me to send you a direct link?
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.85, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="self-start max-w-[80%] bg-zinc-800 rounded-2xl rounded-tl-none p-3 text-sm text-zinc-300 border border-zinc-700"
                >
                    Yes, please!
                </motion.div>
            </div>
        )
    }
];

const TechShowcase = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <section className="py-16 md:py-32 bg-zinc-900 relative overflow-hidden">
            {/* Simple Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Content */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0.85, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white mb-6 font-display"
                        >
                            What We Build <br /> For You
                        </motion.h2>
                        <p className="text-zinc-400 text-lg mb-12 max-w-md">
                            We don't just write code. We build intelligent engines that drive your business forward.
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveFeature(index)}
                                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border ${activeFeature === index
                                        ? 'bg-zinc-800 border-zinc-700 shadow-xl'
                                        : 'bg-transparent border-transparent hover:bg-zinc-800/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeFeature === index ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700'
                                            }`}>
                                            <feature.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-bold mb-1 transition-colors ${activeFeature === index ? 'text-white' : 'text-zinc-400'}`}>
                                                {feature.title}
                                            </h3>
                                            <p className={`text-sm transition-colors ${activeFeature === index ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Interactive Visual */}
                    <div className="relative h-[400px] lg:h-[600px]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-3xl border border-zinc-700 shadow-2xl overflow-hidden">
                            {/* Window Chromes */}
                            <div className="h-12 border-b border-zinc-700 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            </div>

                            {/* Content Stage */}
                            <div className="p-1 h-[calc(100%-48px)] relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={features[activeFeature].id}
                                        initial={{ opacity: 0.85, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0.85, scale: 1.05, filter: "blur(10px)" }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full"
                                    >
                                        {features[activeFeature].visual}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Decor elements */}
                        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechShowcase;
