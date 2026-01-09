import React, { useState } from 'react';
import { useCakes } from '../api/hooks';
import type { Cake, CakeCustomization, Page } from '../types';
import { useCart } from '../context/CartContext';
import CakeCard from '../components/CakeCard';
import CustomizationModal from '../components/CustomizationModal';

interface HomePageProps {
    onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { data: cakes } = useCakes();
    const { addToCart } = useCart();
    const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = (cake: Cake) => {
        setSelectedCake(cake);
        setIsModalOpen(true);
    };

    const handleConfirmCustomization = (customization: CakeCustomization) => {
        if (selectedCake) {
            addToCart(selectedCake, customization);
            setIsModalOpen(false);
            setSelectedCake(null);
        }
    };

    const featuredCakes = cakes?.slice(0, 6) || [];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="space-y-8 animate-slide-in">
                            <div className="inline-block px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm font-semibold text-pink-600">
                                ✨ Welcome to SweetSpot
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                Delicious Cakes
                                <br />
                                <span className="gradient-text-pink">Made with Love</span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-xl">
                                Indulge in our handcrafted cakes made with the finest ingredients.
                                Perfect for every celebration, customized just for you.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => onNavigate('menu')}
                                    className="btn-ripple px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:scale-105 transition-transform shadow-lg"
                                >
                                    🍰 Order Now
                                </button>
                                <button
                                    onClick={() => onNavigate('about')}
                                    className="px-8 py-4 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-lg"
                                >
                                    Learn More
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-8">
                                <div>
                                    <p className="text-3xl font-bold gradient-text-pink">500+</p>
                                    <p className="text-sm text-gray-600">Happy Customers</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold gradient-text-pink">20+</p>
                                    <p className="text-sm text-gray-600">Cake Varieties</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold gradient-text-pink">4.9★</p>
                                    <p className="text-sm text-gray-600">Average Rating</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-float">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full blur-3xl opacity-20"></div>
                            <div className="relative text-9xl text-center">
                                🎂
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose SweetSpot?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We're committed to delivering the best cake experience with premium quality and service
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: '🎨',
                                title: 'Custom Designs',
                                description: 'Personalize your cake with custom messages, shapes, and toppings',
                            },
                            {
                                icon: '🌟',
                                title: 'Premium Quality',
                                description: 'Made with the finest ingredients for the best taste',
                            },
                            {
                                icon: '🚚',
                                title: 'Fast Delivery',
                                description: 'Same-day delivery available for your convenience',
                            },
                            {
                                icon: '💝',
                                title: 'Special Occasions',
                                description: 'Perfect cakes for birthdays, weddings, and celebrations',
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="card-hover p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 text-center"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Cakes */}
            <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Featured Cakes</h2>
                            <p className="text-gray-600">Our most popular and delicious creations</p>
                        </div>
                        <button
                            onClick={() => onNavigate('menu')}
                            className="px-6 py-3 rounded-xl font-semibold text-pink-600 bg-white hover:bg-gray-50 transition-colors shadow-lg"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredCakes.map((cake) => (
                            <CakeCard
                                key={cake.id}
                                cake={cake}
                                onAddToCart={() => handleAddToCart(cake)}
                            />
                        ))}
                    </div>

                    {featuredCakes.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No cakes available at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Order Your Perfect Cake?
                    </h2>
                    <p className="text-xl mb-8 text-white/90">
                        Browse our full menu and customize your cake exactly how you want it
                    </p>
                    <button
                        onClick={() => onNavigate('menu')}
                        className="btn-ripple px-8 py-4 rounded-xl font-semibold text-pink-600 bg-white hover:scale-105 transition-transform shadow-xl"
                    >
                        Explore Our Menu
                    </button>
                </div>
            </section>

            {/* Customization Modal */}
            <CustomizationModal
                cake={selectedCake}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedCake(null);
                }}
                onConfirm={handleConfirmCustomization}
            />
        </div>
    );
};

export default HomePage;
