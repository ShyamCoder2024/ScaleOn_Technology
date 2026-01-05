import { ShoppingCart, Factory, Briefcase, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const industries = [
    {
        icon: ShoppingCart,
        title: 'Retail & E-commerce',
        description: 'Inventory management, sales automation, and customer experience optimization.'
    },
    {
        icon: Factory,
        title: 'Manufacturing',
        description: 'Process optimization, supply chain automation, and quality control systems.'
    },
    {
        icon: Briefcase,
        title: 'Service Agencies',
        description: 'CRM solutions, lead management, and automated client communication.'
    },
    {
        icon: User,
        title: 'Freelancers',
        description: 'Workflow automation, invoicing, and project management solutions.'
    }
];

const Industries = () => {
    return (
        <section id="industries" className="py-24 md:py-32 px-4 relative">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl md:text-5xl font-bold text-zinc-900 mb-4"
                    >
                        Industry-Specific Solutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-zinc-500 max-w-2xl mx-auto"
                    >
                        Tailored automation solutions optimized for your specific sector.
                    </motion.p>
                </div>

                {/* Industries Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300 group cursor-pointer h-full flex flex-col"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 transition-colors duration-300">
                                <industry.icon className="text-indigo-600 group-hover:text-white transition-colors duration-300" size={24} />
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-xl font-bold text-zinc-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {industry.title}
                            </h3>

                            {/* Description */}
                            <p className="text-zinc-500 text-sm mb-6 flex-grow leading-relaxed">
                                {industry.description}
                            </p>

                            {/* Learn More Link */}
                            <div className="flex items-center text-indigo-600 font-semibold text-sm mt-auto">
                                <span>Explore Solutions</span>
                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
