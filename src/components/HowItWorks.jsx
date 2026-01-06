import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, TrendingUp, Check } from 'lucide-react';
import { AnimatedGridPattern } from "./ui/animated-grid-pattern";
import { cn } from "../lib/utils";

// Memoized step card for better performance
const StepCard = memo(({ icon: Icon, title, description, stepNumber, isActive, isCompleted }) => {
    return (
        <div className="relative z-10 flex-1">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                    {/* Step Number Badge */}
                    <motion.div
                        initial={false}
                        animate={{
                            backgroundColor: isActive || isCompleted ? '#4F46E5' : '#FFFFFF',
                            borderColor: isActive || isCompleted ? '#4F46E5' : '#F4F4F5',
                            color: isActive || isCompleted ? '#FFFFFF' : '#A1A1AA',
                            scale: isActive ? 1.2 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full border shadow-sm flex items-center justify-center z-20"
                    >
                        <span className="text-sm font-bold">{stepNumber}</span>
                    </motion.div>

                    {/* Icon Circle */}
                    <motion.div
                        animate={{
                            scale: isActive ? 1.1 : 1,
                            borderColor: isActive ? '#E0E7FF' : '#F4F4F5',
                            boxShadow: isActive ? '0 10px 25px -5px rgba(79, 70, 229, 0.1), 0 8px 10px -6px rgba(79, 70, 229, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                        }}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-24 rounded-[2rem] bg-white border flex items-center justify-center relative z-10 overflow-hidden"
                    >
                        <motion.div
                            animate={{ opacity: isActive ? 1 : 0 }}
                            className="absolute inset-0 bg-indigo-50 transition-opacity duration-500"
                        />
                        <Icon
                            className={cn(
                                "w-10 h-10 transition-colors duration-500 relative z-10",
                                isActive || isCompleted ? "text-indigo-600" : "text-zinc-400"
                            )}
                        />
                    </motion.div>

                    {/* PERFORMANCE: Use CSS pulse instead of Framer Motion */}
                    {isActive && (
                        <div className="absolute inset-0 rounded-[2rem] border-2 border-indigo-500 animate-step-pulse" />
                    )}
                </div>

                <motion.h3
                    initial={false}
                    animate={{
                        color: isActive ? '#312E81' : '#18181B',
                        scale: isActive ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold mb-3 origin-center"
                >
                    {title}
                </motion.h3>
                <p className="text-zinc-500 font-medium leading-relaxed max-w-xs mx-auto">
                    {description}
                </p>
            </div>
        </div>
    );
});
StepCard.displayName = 'StepCard';

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);

    // Sequence:
    // 0: Start/Audit Highlighted. Line at 0%.
    // 0.5: Line animates 0 -> 50%.
    // 1: Deploy Highlighted. Line at 50%.
    // 1.5: Line animates 50 -> 100%.
    // 2: Scale Highlighted. Line at 100%.
    // 3: Reset (Wait). Line cuts to 0%.

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => {
                if (prev === 2) return 0; // After 2, snap to 0
                return prev + 1;
            });
        }, 2500); // 2.5 seconds per step
        return () => clearInterval(timer);
    }, []);

    const steps = [
        {
            icon: Search,
            title: "Audit",
            description: "We study where you lose time & money.",
        },
        {
            icon: Settings,
            title: "Deploy",
            description: "We integrate AI into your workflow.",
        },
        {
            icon: TrendingUp,
            title: "Scale",
            description: "You grow without hiring more people.",
        }
    ];

    // Calculate line width based on active step
    // Step 0: 0% start (but we want it to animate TO step 1).
    // Wait, typically "Line to X" means line fills as we approach X.
    // User said: "Start ... audit ... blue line completing to the deployment".
    // This implies while Audit is active, the line grows to Deploy?
    // Let's try:
    // activeStep 0 (Audit): Line needs to be 0 or growing? 
    // If we want the line to "connect" 1 to 2, it should probably fill AFTER 1 is active, LEADING to 2.
    // Let's stick to the visual snapshot: 
    // Step 0: 0% width.
    // Transition to Step 1: Width becomes 50%.
    // Transition to Step 2: Width becomes 100%.

    // To fix 'reverse', we strictly control the transition duration.
    const lineWidth = activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%';
    const isResetting = activeStep === 0;

    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                )}
            />


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        Simple Process
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 font-display"
                    >
                        How It Works
                    </motion.h2>
                    <p className="text-xl text-zinc-500">
                        Three simple steps to automation.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Beam (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[3px] bg-zinc-100 rounded-full z-0 overflow-hidden">
                        {/* Animated Blue Line Fill */}
                        <motion.div
                            className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                            initial={{ width: '0%' }}
                            animate={{ width: lineWidth }}
                            // KEY FIX: Instant duration when reseting to 0 (to avoid reverse animation), smooth otherwise.
                            transition={{ duration: isResetting ? 0 : 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 md:gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <StepCard
                                key={index}
                                {...step}
                                stepNumber={index + 1}
                                isActive={activeStep === index}
                                // isCompleted determines if it stays colored. 
                                // Reset implies we clear history? "cycle cuts... again the audit gets proper effect".
                                // If we want to clear history, then isCompleted should be false when we reset.
                                isCompleted={activeStep > index}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-20 text-center space-y-8">
                    <p className="text-zinc-500 font-medium text-lg">
                        No disruption. No long training. Your team keeps working as usual.
                    </p>

                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-900 font-semibold shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                        We handle the technical setup completely.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(HowItWorks);
