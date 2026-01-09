import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { Page } from '../types';

interface NavbarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
    const { cartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks: { name: string; page: Page }[] = [
        { name: 'Home', page: 'home' },
        { name: 'Menu', page: 'menu' },
        { name: 'About', page: 'about' },
        { name: 'Contact', page: 'contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 glass shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => onNavigate('home')}
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                            🍰
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold gradient-text-pink">SweetSpot</h1>
                            <p className="text-xs text-gray-600">Delicious Moments</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.page}
                                onClick={() => onNavigate(link.page)}
                                className={`relative text-sm font-semibold transition-colors ${currentPage === link.page
                                    ? 'text-pink-600'
                                    : 'text-gray-700 hover:text-pink-600'
                                    }`}
                            >
                                {link.name}
                                {currentPage === link.page && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Cart & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onNavigate('cart')}
                            className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg hover:scale-110 transition-transform btn-ripple"
                        >
                            🛒
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md hover:bg-gray-50 transition-colors"
                        >
                            {mobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 animate-fade-in">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.page}
                                    onClick={() => {
                                        onNavigate(link.page);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-3 rounded-xl font-semibold transition-colors ${currentPage === link.page
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                                        : 'text-gray-700 hover:bg-white/50'
                                        }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
