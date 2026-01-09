import React from 'react';
import type { Cake } from '../types';

interface CakeCardProps {
    cake: Cake;
    onSelect?: () => void;
    onAddToCart?: () => void;
}

const imageUrl = (cake: Cake) => {
    const img = cake.image_url || cake.image;
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `http://127.0.0.1:8000${img}`;
};

const CakeCard: React.FC<CakeCardProps> = ({ cake, onSelect, onAddToCart }) => {
    const imgUrl = imageUrl(cake);

    return (
        <div className="group card-hover rounded-2xl bg-white p-5 shadow-lg">
            {/* Image */}
            <div
                className="relative mb-4 overflow-hidden rounded-xl cursor-pointer"
                onClick={onSelect}
            >
                {imgUrl ? (
                    <img
                        src={imgUrl}
                        alt={cake.name}
                        className="h-56 w-full object-cover transition-transform group-hover:scale-110"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback flex h-56 w-full items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 text-6xl';
                                fallback.textContent = '🍰';
                                parent.appendChild(fallback);
                            }
                        }}
                    />
                ) : (
                    <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 text-6xl">
                        🍰
                    </div>
                )}

                {/* Availability Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${cake.available
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}>
                    {cake.available ? '✓ Available' : '✗ Out of Stock'}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{cake.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {cake.flavour} • {cake.size}
                    </p>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                    {cake.description || 'Delicious handcrafted cake made with love'}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-2xl font-bold gradient-text-pink">₹{Number(cake.price)}</p>
                    </div>

                    <button
                        onClick={onAddToCart}
                        disabled={!cake.available}
                        className={`btn-ripple px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all ${cake.available
                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:scale-105 hover:shadow-xl'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {cake.available ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CakeCard;
