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
    const [wordOpacities, setWordOpacities] = useState([]);

    useEffect(() => {
        setIsTouch(isTouchDevice());
    }, []);

    const words = useMemo(() => text.split(" "), [text]);

    // Initialize opacities
    useEffect(() => {
        setWordOpacities(new Array(words.length).fill(0.1));
    }, [words.length]);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"],
        layoutEffect: false // Better performance
    });

    // PERFORMANCE: Single event listener calculates ALL word opacities at once
    // Instead of N useTransform hooks, we use 1 useMotionValueEvent
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (isTouch) return; // Mobile uses simple fade

        const newOpacities = words.map((_, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            // Map progress within [start, end] to [0.1, 1]
            if (progress <= start) return 0.1;
            if (progress >= end) return 1;
            return 0.1 + ((progress - start) / (end - start)) * 0.9;
        });
        setWordOpacities(newOpacities);
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

    // Desktop: Batched per-word reveal using single state
    return (
        <h2 ref={container} className={cn("flex flex-wrap gap-x-[0.3em] gap-y-2", className)}>
            {words.map((word, i) => (
                <span key={i} className="relative inline-block">
                    <span className="absolute opacity-10">{word}</span>
                    <span style={{ opacity: wordOpacities[i] || 0.1 }}>{word}</span>
                </span>
            ))}
        </h2>
    );
});
ScrollReveal.displayName = 'ScrollReveal';

