import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        }, 3000);
    };

    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">
                        Get in <span className="gradient-text-pink">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question or want to place a custom order? We'd love to hear from you!
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="glass rounded-3xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

                        {submitted ? (
                            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
                                <div className="text-6xl mb-4">✓</div>
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                                <p className="text-green-600">We'll get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="custom-order">Custom Order</option>
                                        <option value="general-inquiry">General Inquiry</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="complaint">Complaint</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
                                        placeholder="Tell us about your cake requirements..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-ripple w-full px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:scale-105 transition-transform shadow-lg"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {[
                                {
                                    icon: '📍',
                                    title: 'Visit Us',
                                    info: '123 Sweet Street, Cake City, CC 12345',
                                    subinfo: 'Open Mon-Sat: 9AM - 8PM',
                                },
                                {
                                    icon: '📞',
                                    title: 'Call Us',
                                    info: '+1 (555) 123-4567',
                                    subinfo: 'Available 24/7 for orders',
                                },
                                {
                                    icon: '✉️',
                                    title: 'Email Us',
                                    info: 'hello@sweetspot.com',
                                    subinfo: 'We reply within 24 hours',
                                },
                            ].map((contact, idx) => (
                                <div
                                    key={idx}
                                    className="card-hover glass rounded-2xl p-6 flex items-start gap-4"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-2xl flex-shrink-0">
                                        {contact.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">{contact.title}</h3>
                                        <p className="text-gray-900 font-semibold">{contact.info}</p>
                                        <p className="text-sm text-gray-600">{contact.subinfo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">Find Us on Map</h3>
                            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl h-64 flex items-center justify-center text-6xl">
                                🗺️
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                {[
                                    { emoji: '📘', name: 'Facebook' },
                                    { emoji: '📸', name: 'Instagram' },
                                    { emoji: '🐦', name: 'Twitter' },
                                    { emoji: '📺', name: 'YouTube' },
                                ].map((social, idx) => (
                                    <button
                                        key={idx}
                                        className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-white hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-600 hover:text-white transition-all group"
                                    >
                                        <span className="text-3xl">{social.emoji}</span>
                                        <span className="text-xs font-semibold">{social.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
