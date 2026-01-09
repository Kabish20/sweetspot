import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    const imageUrl = (imageField: string) => {
        if (!imageField) return '';
        if (imageField.startsWith('http')) return imageField;
        return `http://127.0.0.1:8000${imageField}`;
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-8xl mb-6">🛒</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">
                        Add some delicious cakes to your cart to get started!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Shopping <span className="gradient-text-pink">Cart</span>
                        </h1>
                        <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
                    </div>
                    <button
                        onClick={clearCart}
                        className="px-4 py-2 rounded-xl font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => {
                            const imgUrl = imageUrl(item.cake.image_url || item.cake.image);

                            return (
                                <div
                                    key={item.id}
                                    className="glass rounded-2xl p-6 shadow-lg"
                                >
                                    <div className="flex gap-6">
                                        {/* Image */}
                                        <div className="flex-shrink-0">
                                            {imgUrl ? (
                                                <img
                                                    src={imgUrl}
                                                    alt={item.cake.name}
                                                    className="h-32 w-32 rounded-xl object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        const parent = target.parentElement;
                                                        if (parent && !parent.querySelector('.fallback')) {
                                                            const fallback = document.createElement('div');
                                                            fallback.className = 'fallback flex h-32 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 text-4xl';
                                                            fallback.textContent = '🍰';
                                                            parent.appendChild(fallback);
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 text-4xl">
                                                    🍰
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{item.cake.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.cake.flavour} • {item.cake.size}
                                                </p>
                                            </div>

                                            {/* Customization */}
                                            {item.customization && (
                                                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-3 text-sm">
                                                    <p className="font-semibold text-gray-900 mb-1">Customization:</p>
                                                    <ul className="space-y-1 text-gray-700">
                                                        <li>• Type: {item.customization.egg_version ? 'With Egg' : 'Eggless'}</li>
                                                        <li>• Shape: {item.customization.shape}</li>
                                                        {item.customization.toppings.length > 0 && (
                                                            <li>• Toppings: {item.customization.toppings.join(', ')}</li>
                                                        )}
                                                        {item.customization.message && (
                                                            <li>• Message: "{item.customization.message}"</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Quantity & Price */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-2xl font-bold gradient-text-pink">
                                                        ₹{(Number(item.cake.price) * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-xs text-gray-500">₹{Number(item.cake.price)} each</p>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-sm font-semibold text-red-600 hover:text-red-700"
                                            >
                                                🗑️ Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 glass rounded-2xl p-6 shadow-lg space-y-6">
                            <h3 className="text-2xl font-bold">Order Summary</h3>

                            <div className="space-y-3 border-b border-gray-200 pb-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Delivery Fee</span>
                                    <span className="font-semibold">₹50.00</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span className="font-semibold">-₹0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="gradient-text-pink">₹{(cartTotal + 50).toFixed(2)}</span>
                            </div>

                            <button className="btn-ripple w-full px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:scale-105 transition-transform shadow-lg">
                                Proceed to Checkout
                            </button>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span>✓</span>
                                    <span>Free delivery on orders above ₹500</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>✓</span>
                                    <span>100% secure payment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>✓</span>
                                    <span>Same-day delivery available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
