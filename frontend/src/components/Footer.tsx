import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-2xl">
                                🍰
                            </div>
                            <h3 className="text-xl font-bold">SweetSpot</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            Creating delicious moments with handcrafted cakes made with love and the finest ingredients.
                        </p>
                        <div className="flex gap-3">
                            {['📘', '📸', '🐦', '📺'].map((icon, idx) => (
                                <button
                                    key={idx}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-lg hover:bg-pink-600 transition-colors"
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {['Home', 'Menu', 'About Us', 'Contact', 'FAQs', 'Blog'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-pink-400 transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Our Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {[
                                'Custom Cakes',
                                'Birthday Cakes',
                                'Wedding Cakes',
                                'Corporate Orders',
                                'Same Day Delivery',
                                'Cake Consultation',
                            ].map((service) => (
                                <li key={service}>
                                    <a href="#" className="hover:text-pink-400 transition-colors">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>123 Sweet Street, Cake City, CC 12345</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉️</span>
                                <span>hello@sweetspot.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>🕐</span>
                                <span>Mon-Sat: 9AM - 8PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-700 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-gray-400">
                            © 2026 SweetSpot. All rights reserved. Made with ❤️
                        </p>
                        <div className="flex gap-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-pink-400 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-pink-400 transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="hover:text-pink-400 transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
