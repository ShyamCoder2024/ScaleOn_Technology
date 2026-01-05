import React from 'react';
import { motion, useInView } from 'framer-motion';
import { X } from 'lucide-react';
import { useRef } from 'react';

const NegativeItem = ({ text, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative group cursor-default">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-6 py-6 border-b border-white/5 group-hover:border-white/10 transition-colors"
            >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                    <span className="text-zinc-500 font-mono text-sm group-hover:text-red-400 transition-colors">0{index + 1}</span>
                </div>
                <h3 className="text-xl md:text-2xl text-zinc-400 group-hover:text-zinc-200 transition-colors font-light">
                    {text}
                </h3>
            </motion.div>

            {/* Strike-through effect on hover */}
            <div className="absolute left-16 right-0 top-1/2 h-px bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out opacity-50" />
        </div>
    );
};

const WhatWeDontDo = ({ setTheme }) => {
    const negatives = [
        "We don’t sell generic software.",
        "We don’t force unnecessary tools.",
        "We don’t disappear after delivery.",
        "We don’t build systems you can’t understand."
    ];

    return (
        <section className="py-16 md:py-32 text-white relative overflow-hidden">
            <motion.div
                onViewportEnter={() => setTheme('dark')}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="absolute inset-0 pointer-events-none"
            />
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none brightness-100 contrast-150 mix-blend-overlay" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-6 px-4 py-1.5 border border-red-900/30 bg-red-900/10 rounded-full"
                    >
                        <span className="text-red-400 text-xs font-bold tracking-widest uppercase">Our Anti-Manifesto</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 font-display tracking-tight mb-8"
                    >
                        What We Don’t Do
                    </motion.h2>
                </div>

                <div className="mb-24">
                    {negatives.map((item, index) => (
                        <NegativeItem key={index} text={item} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-zinc-500 text-lg mb-6 tracking-wide uppercase font-medium">
                        We believe simplicity beats complexity every time.
                    </p>
                    <h3 className="text-2xl md:text-4xl font-semibold text-white leading-tight">
                        If it doesn’t reduce the manual way, <span className="text-red-500 italic font-serif">we don’t build it.</span>
                    </h3>
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeDontDo;
