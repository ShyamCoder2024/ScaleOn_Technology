"use client";

import { useEffect, useId, useRef, useState, memo } from "react";
import { cn } from "../../lib/utils";

// Check if device supports hover (desktop) - cached at module level
const isDesktop = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export const AnimatedGridPattern = memo(function AnimatedGridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 50,
    className,
    maxOpacity = 0.5,
    duration = 4,
    ...props
}) {
    const id = useId();
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // PERFORMANCE: Completely disable on mobile/touch devices
    if (!isDesktop) {
        return (
            <svg
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
                    className,
                )}
                {...props}
            >
                <defs>
                    <pattern
                        id={id}
                        width={width}
                        height={height}
                        patternUnits="userSpaceOnUse"
                        x={x}
                        y={y}
                    >
                        <path
                            d={`M.5 ${height}V.5H${width}`}
                            fill="none"
                            strokeDasharray={strokeDasharray}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${id})`} />
            </svg>
        );
    }

    // Desktop: Use reduced number of squares (12 instead of 30+)
    const optimizedNumSquares = Math.min(numSquares, 12);

    const [squares, setSquares] = useState(() => generateSquares(optimizedNumSquares));

    function getPos() {
        return [
            Math.floor((Math.random() * dimensions.width) / width),
            Math.floor((Math.random() * dimensions.height) / height),
        ];
    }

    // Generate squares with positions
    function generateSquares(count) {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            pos: getPos(),
        }));
    }

    // Update squares only when dimensions change
    useEffect(() => {
        if (dimensions.width && dimensions.height) {
            setSquares(generateSquares(optimizedNumSquares));
        }
    }, [dimensions.width, dimensions.height, optimizedNumSquares]);

    // Resize observer to update container dimensions
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setDimensions({
                    width: entry.contentRect.width, // Use contentRect for accurate SVG dimensions
                    height: entry.contentRect.height,
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [containerRef]);

    return (
        <svg
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
            {/* PERFORMANCE: Use CSS animation instead of Framer Motion */}
            <svg x={x} y={y} className="overflow-visible">
                {squares.map(({ pos: [px, py], id }, index) => (
                    <rect
                        key={`${px}-${py}-${index}`}
                        width={width - 1}
                        height={height - 1}
                        x={px * width + 1}
                        y={py * height + 1}
                        fill="currentColor"
                        strokeWidth="0"
                        className="animate-grid-fade"
                        style={{
                            animationDelay: `${index * 0.3}s`,
                            animationDuration: `${duration}s`,
                        }}
                    />
                ))}
            </svg>
        </svg>
    );
});
