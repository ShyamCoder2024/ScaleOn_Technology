import { memo } from 'react';
import { Mail, MapPin, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#050505] text-white py-8 md:py-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:grid md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <img src="/logo.png" alt="ScaleOn" loading="lazy" decoding="async" fetchPriority="low" className="h-8 md:h-12 w-auto mb-4 opacity-90 invert" />
                        <p className="text-zinc-500 text-xs leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
                            Building the future of business automation. We replace manual workflows with intelligent systems.
                        </p>
                        <div className="flex gap-5 justify-center md:justify-start">
                            <a href="https://www.linkedin.com/in/scaleon-technologies-242840373/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2 -m-2"><Linkedin size={16} /></a>
                            <a href="https://www.instagram.com/scaleon_technologies/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2 -m-2"><Instagram size={16} /></a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="col-span-3 grid grid-cols-2 gap-8 md:gap-8 w-full">
                        <div className="text-center md:text-left">
                            <h4 className="font-semibold text-zinc-100 mb-4 md:mb-6 text-xs md:text-sm tracking-wide uppercase opacity-80">Company</h4>
                            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-zinc-500">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="font-semibold text-zinc-100 mb-4 md:mb-6 text-xs md:text-sm tracking-wide uppercase opacity-80">Services</h4>
                            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-zinc-500">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">AI Automation</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">CRM Solutions</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Consulting</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Section - Minimal Mobile Row */}
                <div className="border-t border-white/5 py-8 md:py-0 md:border-none md:mt-0 flex flex-col items-center md:items-start md:flex-row md:justify-between gap-6 mb-8 md:mb-0">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-8 text-xs md:text-sm text-zinc-500">
                        <a href="mailto:scaleontechnologies@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                <Mail size={14} className="text-white" />
                            </div>
                            scaleontechnologies@gmail.com
                        </a>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-white/5">
                                <MapPin size={14} className="text-white" />
                            </div>
                            <span>Pune, India</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-zinc-600 text-[10px] uppercase tracking-wide">
                        © {new Date().getFullYear()} Scaleon Technologies.
                    </p>
                    <div className="flex gap-6 text-[10px] text-zinc-600 uppercase tracking-wide">
                        <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);
