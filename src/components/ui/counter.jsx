import React, { useEffect, useRef, memo } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export const Counter = memo(({
    value,
    direction = "up",
    delay = 0,
    className,
    decimalPlaces = 0,
    suffix = "",
    prefix = "",
}) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [motionValue, isInView, direction, value, delay]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = prefix + latest.toFixed(decimalPlaces) + suffix;
            }
        });
    }, [springValue, decimalPlaces, suffix, prefix]);

    return <span ref={ref} className={className} />;
});

Counter.displayName = 'Counter';
