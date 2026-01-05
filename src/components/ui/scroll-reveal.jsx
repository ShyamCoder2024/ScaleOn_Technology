import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export const ScrollReveal = memo(({ text, className }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"],
        layoutEffect: false // Better mobile performance
    });

    const words = text.split(" ");

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
