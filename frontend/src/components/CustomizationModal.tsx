import React, { useState } from 'react';
import type { Cake, CakeCustomization } from '../types';

interface CustomizationModalProps {
    cake: Cake | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (customization: CakeCustomization) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
    cake,
    isOpen,
    onClose,
    onConfirm,
}) => {
    const [message, setMessage] = useState('');
    const [eggVersion, setEggVersion] = useState(false);
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [shape, setShape] = useState('Round');

    const toppingOptions = [
        '🍓 Strawberries',
        '🍫 Chocolate Chips',
        '🥜 Nuts',
        '🍒 Cherries',
        '🍑 Peaches',
        '🫐 Blueberries',
        '🥥 Coconut',
        '🍬 Sprinkles',
    ];

    const shapeOptions = ['Round', 'Square', 'Heart', 'Rectangle', 'Custom'];

    const toggleTopping = (topping: string) => {
        setSelectedToppings((prev) =>
            prev.includes(topping)
                ? prev.filter((t) => t !== topping)
                : [...prev, topping]
        );
    };

    const handleConfirm = () => {
        onConfirm({
            message,
            egg_version: eggVersion,
            toppings: selectedToppings,
            shape,
        });
        // Reset form
        setMessage('');
        setEggVersion(false);
        setSelectedToppings([]);
        setShape('Round');
    };

    if (!isOpen || !cake) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-rose-600 p-6 text-white rounded-t-3xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-bold">Customize Your Cake</h2>
                    <p className="text-sm text-white/80 mt-1">{cake.name}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Custom Message (Optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g., Happy Birthday Sarah!"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                            rows={3}
                            maxLength={100}
                        />
                        <p className="text-xs text-gray-500 mt-1">{message.length}/100 characters</p>
                    </div>

                    {/* Egg Version */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Cake Type
                        </label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setEggVersion(false)}
                                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${!eggVersion
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🥚 Eggless
                            </button>
                            <button
                                onClick={() => setEggVersion(true)}
                                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${eggVersion
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🥚 With Egg
                            </button>
                        </div>
                    </div>

                    {/* Toppings */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Select Toppings (Optional)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {toppingOptions.map((topping) => (
                                <button
                                    key={topping}
                                    onClick={() => toggleTopping(topping)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all ${selectedToppings.includes(topping)
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {topping}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Shape */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Cake Shape
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {shapeOptions.map((shapeOption) => (
                                <button
                                    key={shapeOption}
                                    onClick={() => setShape(shapeOption)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all ${shape === shapeOption
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {shapeOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">Customization Summary</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Type: {eggVersion ? 'With Egg' : 'Eggless'}</li>
                            <li>• Shape: {shape}</li>
                            <li>• Toppings: {selectedToppings.length > 0 ? selectedToppings.join(', ') : 'None'}</li>
                            {message && <li>• Message: "{message}"</li>}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl">
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:scale-105 transition-transform shadow-lg btn-ripple"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizationModal;
