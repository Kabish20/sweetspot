import React, { useState, useMemo } from 'react';
import { useCakes } from '../api/hooks';
import type { Cake, CakeCustomization } from '../types';
import { useCart } from '../context/CartContext';
import CakeCard from '../components/CakeCard';
import CustomizationModal from '../components/CustomizationModal';

const MenuPage: React.FC = () => {
    const { data: cakes } = useCakes();
    const { addToCart } = useCart();
    const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

    // Get unique flavours and sizes
    const flavours = useMemo(() => {
        const uniqueFlavours = new Set(cakes?.map((c) => c.flavour) || []);
        return Array.from(uniqueFlavours).sort();
    }, [cakes]);

    const sizes = useMemo(() => {
        const uniqueSizes = new Set(cakes?.map((c) => c.size) || []);
        return Array.from(uniqueSizes).sort();
    }, [cakes]);

    // Filter and sort cakes
    const filteredCakes = useMemo(() => {
        let filtered = cakes || [];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (cake) =>
                    cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cake.flavour.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Flavour filter
        if (selectedFlavour) {
            filtered = filtered.filter((cake) => cake.flavour === selectedFlavour);
        }

        // Size filter
        if (selectedSize) {
            filtered = filtered.filter((cake) => cake.size === selectedSize);
        }

        // Sort
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return Number(a.price) - Number(b.price);
                case 'price-high':
                    return Number(b.price) - Number(a.price);
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }, [cakes, searchQuery, selectedFlavour, selectedSize, sortBy]);

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

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedFlavour(null);
        setSelectedSize(null);
        setSortBy('name');
    };

    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        Our <span className="gradient-text-pink">Delicious Menu</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our collection of {cakes?.length || 0} handcrafted cakes, each made with love and premium ingredients
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-8 space-y-6">
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for cakes, flavours, or descriptions..."
                            className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all text-lg"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                    </div>

                    {/* Filter Pills */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h3 className="font-semibold text-gray-900">Filters</h3>
                            {(searchQuery || selectedFlavour || selectedSize || sortBy !== 'name') && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm font-semibold text-pink-600 hover:text-pink-700"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>

                        {/* Flavour Filter */}
                        <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Flavour</p>
                            <div className="flex flex-wrap gap-2">
                                {flavours.map((flavour) => (
                                    <button
                                        key={flavour}
                                        onClick={() =>
                                            setSelectedFlavour(selectedFlavour === flavour ? null : flavour)
                                        }
                                        className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedFlavour === flavour
                                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        {flavour}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                                        className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedSize === size
                                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Sort By</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'name', label: 'Name (A-Z)' },
                                    { value: 'price-low', label: 'Price: Low to High' },
                                    { value: 'price-high', label: 'Price: High to Low' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setSortBy(option.value as typeof sortBy)}
                                        className={`px-4 py-2 rounded-xl font-medium transition-all ${sortBy === option.value
                                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{filteredCakes.length}</span> cake
                        {filteredCakes.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Cakes Grid */}
                {filteredCakes.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredCakes.map((cake) => (
                            <CakeCard
                                key={cake.id}
                                cake={cake}
                                onAddToCart={() => handleAddToCart(cake)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No cakes found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters or search query
                        </p>
                        <button
                            onClick={clearFilters}
                            className="btn-ripple px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:scale-105 transition-transform shadow-lg"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

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

export default MenuPage;
