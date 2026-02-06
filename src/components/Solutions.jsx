import { useRef } from 'react';
import { Settings, Bot, Cloud, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const solutions = [
    {
        icon: Settings,
        title: 'Business Automation',
        description: 'Streamline your operations with intelligent workflow automation, process optimization, task scheduling, and seamless data synchronization.',
        features: ['Workflow Automation', 'Process Optimization', 'Task Scheduling', 'Data Synchronization']
    },
    {
        icon: Bot,
        title: 'AI Agents',
        description: 'Deploy intelligent chatbots and virtual assistants that handle customer queries, automate responses, and provide smart routing.',
        features: ['Intelligent Chatbots', 'Virtual Assistants', 'Automated Responses', 'Smart Routing']
    },
    {
        icon: Cloud,
        title: 'SaaS Applications',
        description: 'Custom-built software solutions with intuitive dashboards, real-time analytics, secure cloud hosting, and mobile-friendly interfaces.',
        features: ['Custom Dashboards', 'Real-time Analytics', 'Secure Hosting', 'Mobile-friendly']
    }
];

const Solutions = () => {
    return (
        <section id="solutions" className="py-16 md:py-32 px-4 relative overflow-hidden bg-zinc-50/50 scroll-mt-24">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="font-display text-4xl md:text-5xl font-bold text-zinc-900 mb-6"
                    >
                        Solutions Built for Your Business
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-xl text-zinc-500 max-w-2xl mx-auto"
                    >
                        Powerful, scalable solutions designed to accelerate your growth and replace manual work.
                    </motion.p>
                </div>

                {/* Solutions Grid */}
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.035 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl p-8 shadow-lg shadow-zinc-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 border border-zinc-100 hover:border-indigo-500/30 transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                    <solution.icon className="text-white" size={32} />
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-2xl font-bold text-zinc-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                    {solution.title}
                                </h3>

                                {/* Description */}
                                <p className="text-zinc-500 mb-8 leading-relaxed">
                                    {solution.description}
                                </p>

                                {/* Features */}
                                <div className="space-y-3 pt-6 border-t border-zinc-100">
                                    {solution.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-zinc-600 font-medium text-sm">
                                            <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                                                <Check className="text-indigo-600 w-3 h-3" strokeWidth={3} />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
