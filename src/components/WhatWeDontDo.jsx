import React, { useRef, memo, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useInView } from 'framer-motion';

const NegativeItem = memo(({ text, index, strikeScale, isTouchDevice }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative group cursor-default">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ index: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-6 py-6 border-b border-white/5 group-hover:border-white/10 transition-colors"
            >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                    <span className="text-zinc-500 font-mono text-sm group-hover:text-red-400 transition-colors">0{index + 1}</span>
                </div>

                {/* Text with strikethrough positioned relative to it */}
                <div className="relative">
                    <h3 className="text-xl md:text-2xl text-zinc-400 group-hover:text-zinc-200 transition-colors font-light">
                        {text}
                    </h3>

                    {/* Desktop: Hover-based strikethrough - only on non-touch devices */}
                    {!isTouchDevice && (
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out opacity-60 pointer-events-none" />
                    )}

                    {/* Mobile/Touch: Scroll-based strikethrough using CSS transform */}
                    {isTouchDevice && (
                        <div
                            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-red-500 via-red-400 to-red-500 origin-left opacity-70 pointer-events-none transition-transform duration-100"
                            style={{ transform: `scaleX(${strikeScale})` }}
                        />
                    )}
                </div>
            </motion.div>
        </div>
    );
});
NegativeItem.displayName = 'NegativeItem';


const WhatWeDontDo = () => {
    const sectionRef = useRef(null);

    // Detect touch device on client side
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    // PERFORMANCE: Single state for all strikethrough scales
    const [strikeScales, setStrikeScales] = useState([0, 0, 0, 0]);

    useEffect(() => {
        // Check if device is touch-based (no hover support)
        const checkTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        setIsTouchDevice(checkTouch);
    }, []);

    // Track scroll progress through this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.8", "end 0.4"], // Extended range for all items to complete
        layoutEffect: false // Better performance
    });

    // Throttle ref for 30fps limit
    const lastUpdateTime = useRef(0);

    // PERFORMANCE: Single event listener calculates ALL strikethrough scales at once
    // Throttled to ~30fps to reduce CPU load during slow scroll
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (!isTouchDevice) return; // Only needed for touch devices

        // Throttle to ~30fps (32ms)
        const now = Date.now();
        if (now - lastUpdateTime.current < 32) return;
        lastUpdateTime.current = now;

        const newScales = [0, 1, 2, 3].map((index) => {
            const itemStart = index * 0.18;
            const itemEnd = itemStart + 0.22;
            if (progress <= itemStart) return 0;
            if (progress >= itemEnd) return 1;
            return (progress - itemStart) / (itemEnd - itemStart);
        });
        setStrikeScales(newScales);
    });

    const negatives = [
        "We don't sell generic software.",
        "We don't force unnecessary tools.",
        "We don't disappear after delivery.",
        "We don't build systems you can't understand."
    ];

    return (
        <section ref={sectionRef} className="py-16 md:py-32 text-white relative overflow-hidden">
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none brightness-100 contrast-150 mix-blend-overlay" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-15%" }}
                        className="inline-block mb-6 px-4 py-1.5 border border-red-900/30 bg-red-900/10 rounded-full"
                    >
                        <span className="text-red-400 text-xs font-bold tracking-widest uppercase">Our Anti-Manifesto</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 font-display tracking-tight mb-8"
                    >
                        What We Don't Do
                    </motion.h2>
                </div>

                <div className="mb-24">
                    {negatives.map((item, index) => (
                        <NegativeItem
                            key={index}
                            text={item}
                            index={index}
                            strikeScale={strikeScales[index]}
                            isTouchDevice={isTouchDevice}
                        />
                    ))}

                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    className="text-center"
                >
                    <p className="text-zinc-500 text-lg mb-6 tracking-wide uppercase font-medium">
                        We believe simplicity beats complexity every time.
                    </p>
                    <h3 className="text-2xl md:text-4xl font-semibold text-white leading-tight">
                        If it doesn't reduce the manual way, <span className="text-red-500 italic font-serif">we don't build it.</span>
                    </h3>
                </motion.div>
            </div>
        </section>
    );
};

export default memo(WhatWeDontDo);
