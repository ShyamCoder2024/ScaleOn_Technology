import React, { useEffect, useRef, useState, memo } from "react";
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
    const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });
    // Use positive margin for reliable mobile detection
    const isInView = useInView(ref, { once: true, margin: "50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [motionValue, isInView, direction, value, delay]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            const newValue = prefix + latest.toFixed(decimalPlaces) + suffix;
            setDisplayValue(newValue);
            if (ref.current) {
                ref.current.textContent = newValue;
            }
        });
        return () => unsubscribe();
    }, [springValue, decimalPlaces, suffix, prefix]);

    // Show initial value immediately (important for mobile)
    return <span ref={ref} className={className}>{prefix}{(direction === "down" ? value : 0).toFixed(decimalPlaces)}{suffix}</span>;
});

Counter.displayName = 'Counter';
