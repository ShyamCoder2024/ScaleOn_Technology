import { useState, useEffect, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { SplineScene } from './ui/SplineScene';

const typingWords = ['Business Automation', 'AI Agents', 'SaaS Apps'];

const Hero = memo(() => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = typingWords[currentWordIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentWord.length) {
                    setDisplayText(currentWord.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentWordIndex]);

    return (
        <section className="w-full px-4 py-6 md:py-10">
            <div className="max-w-7xl mx-auto">
                <div className="w-full bg-white relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl border border-gray-100">

                    <div className="flex flex-col md:flex-row">
                        {/* LEFT on Desktop / TOP on Mobile - 3D Robot */}
                        <div className="w-full md:flex-1 h-[250px] sm:h-[320px] md:h-[550px] lg:h-[600px] relative z-10 bg-gradient-to-br from-slate-50 to-blue-50 will-change-transform" style={{ position: 'relative' }}>
                            <SplineScene
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                className="w-full h-full"
                            />
                        </div>

                        {/* RIGHT on Desktop / BOTTOM on Mobile - Text Content */}
                        <div className="w-full md:flex-1 p-5 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                            {/* Main Headline */}
                            <h1 className="mobile-h1 font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#101418] leading-tight mb-2 md:mb-4 uppercase tracking-tighter">
                                We Build the Tools That Build Your Growth.
                            </h1>

                            {/* Typing Animation */}
                            <div className="h-8 sm:h-10 md:h-12 flex items-center mb-3 md:mb-5">
                                <span className="font-montserrat text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2563EB] uppercase tracking-tight">
                                    {displayText}
                                    <span className="typing-cursor text-[#2563EB]">|</span>
                                </span>
                            </div>

                            {/* Value Proposition */}
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-lg mb-4 md:mb-6">
                                AI-powered tools that work at the speed of thought. Trustworthy, powerful, and ready to transform your manual operations.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4">
                                <a
                                    href="#contact"
                                    className="bg-[#101418] text-white px-6 py-4 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-bold text-base sm:text-base hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-gray-200/50 active:scale-95"
                                >
                                    Get Your Free Automation Plan
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={18} />
                                </a>
                                <a
                                    href="#solutions"
                                    className="border-2 border-[#101418] text-[#101418] px-6 py-4 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-bold text-base sm:text-base hover:bg-[#101418] hover:text-white transition-all duration-200 text-center active:scale-95"
                                >
                                    Explore Solutions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;
