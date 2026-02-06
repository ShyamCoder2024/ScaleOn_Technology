import React, { useRef, memo, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../../lib/utils';

// Detect touch device
const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
};

export const ScrollReveal = memo(({ text, className }) => {
    const container = useRef(null);
    const [isTouch, setIsTouch] = useState(false);
    // PERFORMANCE: Array of refs for each word span - used for direct DOM manipulation
    const wordSpanRefs = useRef([]);

    useEffect(() => {
        setIsTouch(isTouchDevice());
    }, []);

    const words = useMemo(() => text.split(" "), [text]);

    // Initialize refs array
    useEffect(() => {
        wordSpanRefs.current = wordSpanRefs.current.slice(0, words.length);
    }, [words.length]);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"],
        layoutEffect: false // Better performance
    });

    // Throttle ref for 30fps limit
    const lastUpdateTime = useRef(0);

    // PERFORMANCE: Direct DOM manipulation instead of React state
    // This eliminates React re-renders during scroll!
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (isTouch) return; // Mobile uses simple fade

        // Throttle to ~30fps (32ms)
        const now = Date.now();
        if (now - lastUpdateTime.current < 32) return;
        lastUpdateTime.current = now;

        // Update each word's opacity directly via DOM
        words.forEach((_, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            let opacity;
            if (progress <= start) opacity = 0.1;
            else if (progress >= end) opacity = 1;
            else opacity = 0.1 + ((progress - start) / (end - start)) * 0.9;

            // Direct DOM update - NO React re-render
            if (wordSpanRefs.current[i]) {
                wordSpanRefs.current[i].style.opacity = opacity;
            }
        });
    });

    // Mobile: Simple single opacity animation for entire block
    if (isTouch) {
        return (
            <motion.h2
                ref={container}
                className={cn("flex flex-wrap gap-x-[0.3em] gap-y-2", className)}
                initial={{ opacity: 0.1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6 }}
            >
                {text}
            </motion.h2>
        );
    }

    // Desktop: Per-word reveals using refs (no state updates during scroll)
    return (
        <h2 ref={container} className={cn("flex flex-wrap gap-x-[0.3em] gap-y-2", className)}>
            {words.map((word, i) => (
                <span key={i} className="relative inline-block">
                    <span className="absolute opacity-10">{word}</span>
                    <span
                        ref={el => wordSpanRefs.current[i] = el}
                        style={{ opacity: 0.1 }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </h2>
    );
});
ScrollReveal.displayName = 'ScrollReveal';

