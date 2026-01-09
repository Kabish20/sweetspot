import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Cake, CakeCustomization } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (cake: Cake, customization?: CakeCustomization) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem('sweetspot_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('sweetspot_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (cake: Cake, customization?: CakeCustomization) => {
        const newItem: CartItem = {
            id: `${cake.id}-${Date.now()}`,
            cake,
            quantity: 1,
            customization,
        };
        setCartItems((prev) => [...prev, newItem]);
    };

    const removeFromCart = (itemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + Number(item.cake.price) * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
