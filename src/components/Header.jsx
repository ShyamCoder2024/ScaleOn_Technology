import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ theme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const ticking = useRef(false);
    const lastScrollTime = useRef(0);

    useEffect(() => {
        const updateScrolled = () => {
            setScrolled(window.scrollY > 50);
            ticking.current = false;
        };

        const handleScroll = () => {
            const now = Date.now();
            // Throttle to ~30fps (32ms) for low-end device performance
            if (now - lastScrollTime.current < 32) return;
            lastScrollTime.current = now;

            if (!ticking.current) {
                requestAnimationFrame(updateScrolled);
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateScrolled(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDark = theme === 'dark';

    return (
        <>
            <motion.header
                className={`sticky top-0 left-0 right-0 z-[100] transition-[background-color,padding,border-color] duration-300 md:duration-500 ${scrolled
                    ? isDark
                        ? 'bg-black/90 backdrop-blur-sm md:backdrop-blur-md border-b border-white/10 py-3 shadow-sm'
                        : 'bg-white/80 backdrop-blur-sm md:backdrop-blur-md border-b border-zinc-200/50 py-3 shadow-sm'
                    : isDark
                        ? 'bg-transparent py-5'
                        : 'bg-white py-5'
                    }`}
                style={{ willChange: 'background-color', transform: 'translateZ(0)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 relative z-50">
                            <img
                                src="/logo.png"
                                alt="Scaleon Technologies"
                                width="200"
                                height="80"
                                fetchPriority="high"
                                className={`transition-all duration-300 ${scrolled ? 'h-14 lg:h-16' : 'h-14 md:h-16 lg:h-20'} w-auto ${isDark ? 'brightness-0 invert' : ''}`}
                            />
                        </a>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {['Solutions', 'Industries', 'Testimonials', 'FAQ'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-sm font-medium transition-colors relative group ${isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-indigo-600'
                                        }`}
                                >
                                    {item}
                                    <span className={`absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${isDark ? 'bg-white' : 'bg-indigo-600'
                                        }`} />
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 ${isDark
                                    ? 'bg-white text-black hover:bg-zinc-200 shadow-white/10'
                                    : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-200'
                                    }`}
                            >
                                Contact Us
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden p-2 rounded-full transition-colors relative z-50 ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-zinc-100 text-zinc-900'
                                }`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

            </motion.header>

            {/* Mobile Menu - Floating Glass Box */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Floating Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className={`fixed top-20 left-4 right-4 z-[200] rounded-3xl backdrop-blur-3xl shadow-2xl md:hidden overflow-hidden ${isDark
                                ? 'bg-black/60 border border-white/10'
                                : 'bg-white/40 border border-white/40'
                                }`}
                        >

                            {/* Inner Glass Shine */}
                            <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br to-transparent opacity-50 ${isDark ? 'from-white/5' : 'from-white/40'
                                }`} />

                            <div className="relative z-10 flex flex-col p-6">
                                {/* Menu Header */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Navigation</span>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`p-2 rounded-full transition-colors ${isDark
                                            ? 'bg-white/10 hover:bg-white/20 text-white'
                                            : 'bg-zinc-100/50 hover:bg-zinc-100 text-zinc-500'
                                            }`}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Menu Items */}
                                <div className="space-y-2">
                                    {['Solutions', 'Industries', 'Testimonials', 'FAQ'].map((item, i) => (
                                        <motion.a
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            key={item}
                                            href={`#${item.toLowerCase()}`}
                                            className={`block p-4 rounded-xl transition-all group flex items-center justify-between ${isDark
                                                ? 'hover:bg-white/10'
                                                : 'hover:bg-white/50'
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span className={`text-xl font-bold transition-colors ${isDark
                                                ? 'text-white group-hover:text-indigo-400'
                                                : 'text-zinc-800 group-hover:text-indigo-600'
                                                }`}>
                                                {item}
                                            </span>
                                            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isDark
                                                ? 'text-zinc-400 group-hover:text-indigo-400'
                                                : 'text-zinc-300 group-hover:text-indigo-600'
                                                }`} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
