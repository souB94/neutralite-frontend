// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
export const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

// 2. Create a Provider Component
export const CartProvider = ({ children }) => {
    // 1. Initialize state from Local Storage
    // Try to parse existing items from 'cartItems' in localStorage,
    // otherwise default to an empty array if nothing is found or parsing fails.
    // { _id: 'product123', name: 'Product Name', price: 25, imageUrl: '...', quantity: 1 }
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localCartItems = localStorage.getItem('cartItems');
            return localCartItems ? JSON.parse(localCartItems) : [];
        } catch (error) {
            console.error("Failed to parse cart items from localStorage:", error);
            return []; // Return empty array on error
        }
    });

  // 2. Use useEffect to save cartItems to Local Storage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart items to localStorage:", error);
        }
    }, [cartItems]); // This effect runs whenever cartItems state changes

    // The value provided to consumers of this context
    const value = {
        cartItems,
        setCartItems
    };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

