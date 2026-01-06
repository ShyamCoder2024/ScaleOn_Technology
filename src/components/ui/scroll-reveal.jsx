import React, { useRef, memo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

// Detect touch device
const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
};

export const ScrollReveal = memo(({ text, className }) => {
    const container = useRef(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch(isTouchDevice());
    }, []);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"],
        layoutEffect: false // Better performance
    });

    // On mobile: Simple fade-in for entire text block (no per-word transforms)
    // On desktop: Per-word reveal
    const words = text.split(" ");

    // Single opacity transform for mobile (instead of N transforms per word)
    const mobileOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 1]);

    // Mobile: Simple single opacity animation for entire block
    if (isTouch) {
        return (
            <motion.h2
                ref={container}
                className={cn("flex flex-wrap gap-x-[0.3em] gap-y-2", className)}
                style={{ opacity: mobileOpacity }}
            >
                {text}
            </motion.h2>
        );
    }

    // Desktop: Full per-word reveal effect
    return (
        <h2 ref={container} className={cn("flex flex-wrap gap-x-[0.3em] gap-y-2", className)}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </h2>
    );
});
ScrollReveal.displayName = 'ScrollReveal';

const Word = memo(({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span className="relative inline-block" style={{ willChange: 'opacity' }}>
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
});
Word.displayName = 'Word';
