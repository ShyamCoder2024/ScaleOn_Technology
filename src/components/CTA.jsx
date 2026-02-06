import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const TypingHeadline = memo(({ text, className }) => {
    const [displayedText, setDisplayedText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "50px" });

    useEffect(() => {
        if (isInView) {
            let i = 0;
            const timer = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i === text.length) clearInterval(timer);
            }, 50);
            return () => clearInterval(timer);
        }
    }, [isInView, text]);

    return (
        <div className={`relative ${className}`} ref={ref}>
            <span className="opacity-0 select-none block" aria-hidden="true">
                {text}
            </span>
            <span className="absolute top-0 left-0">
                {displayedText}
                {/* PERFORMANCE: Use CSS animation instead of Framer Motion */}
                <span className="inline-block w-[3px] h-[0.8em] bg-indigo-600 ml-1 align-middle typing-cursor" />
            </span>
        </div>
    );
});
TypingHeadline.displayName = 'TypingHeadline';

const CTA = () => {
    const containerRef = useRef(null);
    const [buttonHover, setButtonHover] = useState(false);

    return (
        <section ref={containerRef} id="contact" className="py-16 pb-24 md:py-32 relative overflow-hidden isolate">
            <div className="absolute inset-0 -z-10" />

            {/* Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-50/80 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-50/80 blur-[120px] rounded-full pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left w-full flex flex-col items-center lg:items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
                        >
                            <Sparkles className="w-3.5 h-3.5 fill-indigo-600" />
                            <span>Transform Today</span>
                        </motion.div>

                        {/* Stable Typewriter Headline */}
                        <div className="mb-8 min-h-[120px] flex items-center justify-center lg:justify-start">
                            <TypingHeadline
                                text="Ready to remove the manual work?"
                                className="text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.1] text-zinc-900"
                            />
                        </div>

                        <p className="text-zinc-500 text-lg leading-relaxed max-w-xl mb-10">
                            Get a free automation plan tailored to your business structure. Practical steps you can implement next week.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ delay: 0.15 }}
                            className="flex flex-col items-center lg:items-start gap-4"
                        >
                            <a
                                href="https://wa.me/918459311191?text=Hi%2C%20I%27m%20interested%20in%20your%20automation%20services"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setButtonHover(true)}
                                onMouseLeave={() => setButtonHover(false)}
                                className="relative px-10 py-4 bg-zinc-900 text-white rounded-full font-bold text-lg transition-transform active:scale-95 group overflow-hidden shadow-2xl shadow-zinc-200 hover:shadow-zinc-300"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Get Free Plan
                                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${buttonHover ? 'translate-x-1' : ''}`} />
                                </span>
                            </a>


                            <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium pl-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                                100% Free · No Obligation
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Interactive Visual */}
                    <div className="w-full lg:w-[45%] flex justify-center lg:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ duration: 0.4 }}
                            className="relative aspect-auto md:aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-white to-indigo-50/50 border border-indigo-100 p-6 md:p-8 flex flex-col justify-center items-center text-center overflow-hidden shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] backdrop-blur-sm w-[90%] max-w-[340px] mx-auto md:max-w-none md:w-full"
                        >
                            <div className="absolute inset-0 bg-grid-zinc-900/[0.02] -z-10" />

                            {/* Decorative Rings */}
                            <div className="hidden md:block absolute inset-0 border border-indigo-100 rounded-[2.5rem] scale-90" />
                            <div className="hidden md:block absolute inset-0 border border-indigo-50 rounded-[2.5rem] scale-75" />

                            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3 font-display relative z-10 pt-6 md:pt-0">Book Your Strategy Call</h3>
                            <p className="text-zinc-500 text-sm md:text-base mb-8 md:mb-10 max-w-xs leading-relaxed relative z-10">
                                15-minute call to identify your biggest automation opportunities.
                            </p>

                            {/* Interactive Connection Visual */}
                            <div className="w-full max-w-[260px] md:max-w-xs bg-white border border-indigo-100 shadow-xl shadow-indigo-100/50 rounded-2xl p-4 flex items-center justify-between gap-2 relative z-20 mb-6 md:mb-0">

                                {/* YOU Node */}
                                <div className="flex flex-col items-center gap-2 relative z-10">
                                    {/* PERFORMANCE: Use CSS animation instead of Framer Motion */}
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center shadow-lg shadow-indigo-100 animate-pulse-scale">
                                        <span className="text-indigo-600 font-bold text-[10px] md:text-sm">You</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-200" />
                                </div>

                                {/* Connection Line */}
                                <div className="h-[2px] flex-1 bg-indigo-100 relative rounded-full overflow-hidden">
                                    {/* PERFORMANCE: Use CSS animations for moving dots */}
                                    <div className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px] animate-connection-dot" />
                                    <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px] animate-connection-dot-delayed" />
                                </div>

                                {/* AI Node */}
                                <div className="flex flex-col items-center gap-2 relative z-10">
                                    {/* PERFORMANCE: Use CSS animation for pulse */}
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-xl relative animate-ai-pulse">
                                        <span className="text-white font-bold text-[10px] md:text-sm relative z-10">AI</span>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full animate-pulse" />
                                    </div>
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zinc-300" />
                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default memo(CTA);
