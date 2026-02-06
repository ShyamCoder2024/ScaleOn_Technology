import { Zap, Shield, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
    {
        icon: Zap,
        title: 'Lightning Fast Deployment',
        description: 'Launch in weeks, not months'
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-grade data protection'
    },
    {
        icon: Users,
        title: 'Dedicated Support',
        description: '24/7 technical assistance'
    },
    {
        icon: Sparkles,
        title: 'Cutting-Edge AI',
        description: 'Latest LLM integration'
    }
];

const Benefits = () => {
    return (
        <section className="py-16 border-y border-zinc-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0.85, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.03 }}
                            className="flex flex-col items-center text-center group cursor-default"
                        >
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                                <benefit.icon className="text-indigo-600 group-hover:text-white transition-colors duration-300" size={32} />
                            </div>
                            <h3 className="font-display font-bold text-lg text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-zinc-500 max-w-[200px]">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
