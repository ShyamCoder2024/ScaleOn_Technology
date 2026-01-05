import { motion } from 'framer-motion';

const brands = [
    "TechCorp", "GrowthLytics", "AutoScale", "FutureFlow", "DataMind",
    "CloudSystems", "NextGen", "SmartRetail", "AgencyPro", "InnovateLabs"
];

const TrustedBy = () => {
    return (
        <section className="py-12 bg-zinc-50 border-y border-zinc-100 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase">
                    Trusted by forward-thinking companies
                </p>
            </div>

            <div className="relative flex overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10" />

                <div className="flex animate-scroll whitespace-nowrap gap-16 md:gap-32 px-16">
                    {[...brands, ...brands, ...brands].map((brand, i) => (
                        <div key={i} className="flex items-center gap-2 group cursor-default">
                            <span className="text-2xl font-display font-bold text-zinc-300 group-hover:text-indigo-400 transition-colors duration-300">
                                {brand}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
