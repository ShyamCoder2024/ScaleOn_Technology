import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-4"
        >
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-4 md:p-6 rounded-2xl text-left transition-all duration-300 ${isOpen
                    ? 'bg-white shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-50'
                    : 'bg-zinc-50 hover:bg-zinc-100'
                    }`}
            >
                <span className={`text-[15px] md:text-lg font-medium pr-4 md:pr-8 transition-colors duration-300 ${isOpen ? 'text-indigo-900' : 'text-zinc-700'
                    }`}>
                    {question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                    ? 'bg-indigo-600 text-white rotate-180'
                    : 'bg-white text-zinc-400 border border-zinc-200'
                    }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-2 text-zinc-500 leading-relaxed bg-white rounded-b-2xl mx-1 shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-50 border-t-0 -mt-2 relative z-10">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Is this custom-built for my business?',
            answer: 'Yes. We don\'t sell generic templates. We analyze your specific workflow—whether you\'re a clinic, agency, or retailer—and build automation that fits exactly how you operate.'
        },
        {
            question: 'How long does setup take?',
            answer: 'Most systems go live in 2-4 weeks. We handle the entire audit, build, and integration process so you don\'t have to pause your operations.'
        },
        {
            question: 'Is it expensive?',
            answer: 'We prioritize ROI. Our solutions are designed to pay for themselves by recovering lost leads and saving manual labor hours. We offer flexible pricing based on the complexity of your needs.'
        },
        {
            question: 'Do you provide support?',
            answer: 'Always. We don\'t just hand over the keys and leave. You get dedicated support to ensure your systems keep running smoothly as you scale.'
        },
        {
            question: 'Can this integrate with WhatsApp / existing tools?',
            answer: 'Absolutely. We specialize in WhatsApp automation and can integrate with your existing CRM, sheets, or booking software.'
        }
    ];

    return (
        <section id="faq" className="py-16 md:py-24 relative overflow-hidden scroll-mt-24">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                    {/* Left Column: Sticky Title */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="lg:sticky lg:top-16 w-full flex flex-col items-center lg:items-start">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6"
                            >
                                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                                Support
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 font-display tracking-tight"
                            >
                                Frequently Asked <br className="hidden lg:block" /> Questions
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-base md:text-lg text-zinc-500 mb-8 max-w-sm"
                            >
                                Everything you need to know about how ScaleOn transforms your business.
                            </motion.p>

                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                href="#contact"
                                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group"
                            >
                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Chat with our team
                            </motion.a>
                        </div>
                    </div>

                    {/* Right Column: FAQ List */}
                    <div className="lg:col-span-7 w-[95%] mx-auto lg:w-full">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                index={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(FAQ);
