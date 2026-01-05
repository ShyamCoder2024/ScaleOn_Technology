import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        businessType: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your interest! We will contact you soon.');
        setFormData({ name: '', mobile: '', businessType: '', message: '' });
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent('Hi, I would like to know more about ScaleOn Technologies services.');
        window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
    };

    return (
        <section id="contact" className="py-16 md:py-28 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#101418] mb-4">
                        Ready to Scale Your Business?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get in touch with us and let's discuss how we can transform your operations
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Mobile */}
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                                    placeholder="Enter your mobile number"
                                />
                            </div>
                        </div>

                        {/* Business Type */}
                        <div>
                            <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 mb-2">
                                Type of Business *
                            </label>
                            <select
                                id="businessType"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all bg-white"
                            >
                                <option value="">Select your business type</option>
                                <option value="retail">Retail & E-commerce</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="agency">Service Agency</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="sme">SME</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                Message (Optional)
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all resize-none"
                                placeholder="Tell us about your business needs..."
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-[#2563EB] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Connect With Us
                            </button>
                            <button
                                type="button"
                                onClick={handleWhatsApp}
                                className="flex-1 border-2 border-[#16A34A] text-[#16A34A] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#16A34A] hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={20} />
                                WhatsApp Chat
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
