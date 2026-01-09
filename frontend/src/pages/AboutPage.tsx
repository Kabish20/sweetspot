import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">
                        About <span className="gradient-text-pink">SweetSpot</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Crafting delicious memories since 2020, one cake at a time
                    </p>
                </div>

                {/* Story Section */}
                <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold">Our Story</h2>
                        <p className="text-gray-700 leading-relaxed">
                            SweetSpot was born from a passion for creating extraordinary cakes that bring joy to every celebration.
                            What started as a small home bakery has grown into a beloved destination for cake lovers across the city.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We believe that every cake tells a story, and we're honored to be part of your special moments.
                            From birthdays to weddings, from corporate events to intimate gatherings, we pour our heart into every creation.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Our team of skilled bakers and decorators work tirelessly to ensure that each cake not only looks
                            stunning but tastes absolutely divine. We use only the finest ingredients, sourced locally whenever possible.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-600 rounded-3xl blur-2xl opacity-20"></div>
                        <div className="relative text-9xl text-center animate-float">
                            👨‍🍳
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: '🌟',
                                title: 'Quality First',
                                description: 'We never compromise on ingredients or craftsmanship. Every cake is made with premium, fresh ingredients.',
                            },
                            {
                                icon: '💝',
                                title: 'Customer Love',
                                description: 'Your satisfaction is our priority. We listen, customize, and deliver exactly what you envision.',
                            },
                            {
                                icon: '🎨',
                                title: 'Creative Excellence',
                                description: 'From classic designs to innovative creations, we bring artistry to every cake we make.',
                            },
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                className="card-hover glass rounded-2xl p-8 text-center"
                            >
                                <div className="text-6xl mb-4">{value.icon}</div>
                                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { name: 'Sarah Johnson', role: 'Head Baker', emoji: '👩‍🍳' },
                            { name: 'Michael Chen', role: 'Pastry Chef', emoji: '👨‍🍳' },
                            { name: 'Emily Davis', role: 'Cake Designer', emoji: '🎨' },
                            { name: 'David Wilson', role: 'Operations Manager', emoji: '📋' },
                        ].map((member, idx) => (
                            <div
                                key={idx}
                                className="card-hover glass rounded-2xl p-6 text-center"
                            >
                                <div className="text-6xl mb-4">{member.emoji}</div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-12 text-white">
                    <div className="grid gap-8 md:grid-cols-4 text-center">
                        {[
                            { number: '500+', label: 'Happy Customers' },
                            { number: '2000+', label: 'Cakes Delivered' },
                            { number: '20+', label: 'Cake Varieties' },
                            { number: '4.9★', label: 'Average Rating' },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <p className="text-5xl font-bold mb-2">{stat.number}</p>
                                <p className="text-white/90">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
