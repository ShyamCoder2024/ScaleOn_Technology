"use client";

import { useRef, memo, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { cn } from "../../lib/utils";

/**
 * PERFORMANCE FIX:
 * - Replaced N useTransform hooks with 1 useMotionValueEvent
 * - Each useTransform was running calculations on every scroll frame
 * - Now we batch all word opacity calculations in a single callback
 */
const TextRevealByWord = memo(({
    text,
    className,
}) => {
    const targetRef = useRef(null);
    const words = useMemo(() => text.split(" "), [text]);
    const [wordOpacities, setWordOpacities] = useState(() =>
        new Array(words.length).fill(0)
    );

    const { scrollYProgress } = useScroll({
        target: targetRef,
        layoutEffect: false // Better mobile performance
    });

    // Throttle ref for 30fps limit
    const lastUpdateTime = useRef(0);

    // PERFORMANCE: Single event listener calculates ALL word opacities at once
    // Throttled to ~30fps to reduce CPU load during slow scroll
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        // Throttle to ~30fps (32ms)
        const now = Date.now();
        if (now - lastUpdateTime.current < 32) return;
        lastUpdateTime.current = now;

        const newOpacities = words.map((_, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            if (progress <= start) return 0;
            if (progress >= end) return 1;
            return (progress - start) / (end - start);
        });
        setWordOpacities(newOpacities);
    });

    return (
        <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
            <div
                className={
                    "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
                }
            >
                <p
                    className={
                        "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
                    }
                >
                    {words.map((word, i) => (
                        <span key={i} className="xl:lg-3 relative mx-1 lg:mx-2.5">
                            <span className={"absolute opacity-30"}>{word}</span>
                            <span
                                style={{ opacity: wordOpacities[i] }}
                                className={"text-black dark:text-white"}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
});
TextRevealByWord.displayName = 'TextRevealByWord';

export { TextRevealByWord };

