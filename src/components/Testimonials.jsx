import { TestimonialsColumn } from "./ui/TestimonialsColumn";
import { motion } from "motion/react";

const testimonials = [
    {
        text: "ScaleOn's automation tools helped us reduce manual data entry by 80%. As a textile manufacturer, this efficiency is crucial for our margins.",
        name: "Rajesh Kumar",
        role: "Owner, Kumar Textiles",
    },
    {
        text: "The AI chatbot handles customer queries 24/7. We've seen a 40% increase in online orders since integrating it into our website.",
        name: "Priya Sharma",
        role: "Founder, StyleHub Boutique",
    },
    {
        text: "Managing inventory for my three hardware stores was a nightmare. This ERP solution unified everything perfectly.",
        name: "Amit Patel",
        role: "Director, Patel Hardware & Tools",
    },
    {
        text: "Professional and timely delivery. The custom dashboard gave me visibility into my logistics business that I never had before.",
        name: "Suresh Reddy",
        role: "CEO, Reddy Logistics",
    },
    {
        text: "Best decision for our coaching center. The student management system saves us hours of admin work every week.",
        name: "Anjali Gupta",
        role: "Principal, Excel Academy",
    },
    {
        text: "ScaleOn understood our specific needs as a B2B supplier. The automated invoicing system basically pays for itself.",
        name: "Vikram Singh",
        role: "MD, Singh Industrial Supplies",
    },
    {
        text: "Our restaurant chain needed a better POS integration. These guys delivered a seamless solution that works flawlessly.",
        name: "Arjun Nair",
        role: "Founder, Spice Route Kitchens",
    },
    {
        text: "Highly recommended for any Indian SME looking to digitize. The support team speaks our language and understands our market.",
        name: "Swati Deshit",
        role: "Co-founder, Deshmukh Interiors",
    },
    {
        text: "From a local shop to an online brand, ScaleOn's e-commerce tools made the transition incredibly smooth.",
        name: "Manoj Verma",
        role: "Owner, Verma Electronics",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center mb-12"
                >
                    <div className="flex justify-center mb-4">
                        <div className="border border-blue-200 bg-blue-50 text-[#2563EB] py-1 px-4 rounded-full text-sm font-semibold">
                            Testimonials
                        </div>
                    </div>

                    <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-[#101418] mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-lg text-gray-600">
                        See what our customers have to say about us.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
