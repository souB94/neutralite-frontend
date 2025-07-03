// src/context/WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'; // <--- IMPORTANT: Ensure useEffect is imported

// 1. Create the Context
const WishlistContext = createContext();

// Custom hook to consume the wishlist context
export const useWishlist = () => {
    return useContext(WishlistContext);
};

// 2. Create a Provider Component
export const WishlistProvider = ({ children }) => {
    // --- STEP 1: Initialize state from Local Storage ---
    // This function runs ONLY ONCE when the component mounts.
    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const localWishlist = localStorage.getItem('wishlistItems');
            // If there's data in localStorage, parse it from JSON string to JavaScript array
            // Otherwise, start with an empty array
            return localWishlist ? JSON.parse(localWishlist) : [];
        } catch (error) {
            // Log any errors that occur during parsing (e.g., corrupted localStorage data)
            console.error("Failed to parse wishlist items from localStorage:", error);
            return []; // Fallback to an empty array to prevent application errors
        }
    });

    // --- STEP 2: Use useEffect to save wishlistItems to Local Storage whenever it changes ---
    // This effect runs after every render where 'wishlistItems' has changed.
    useEffect(() => {
        try {
            // Convert the current 'wishlistItems' array into a JSON string
            // Then, save this string to localStorage under the key 'wishlistItems'
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        } catch (error) {
            // Log any errors that occur during saving (e.g., browser's localStorage full)
            console.error("Failed to save wishlist items to localStorage:", error);
        }
    }, [wishlistItems]); // Dependency array: Effect re-runs only when wishlistItems changes

    // The value that will be provided to any component that uses `useWishlist()`
    const value = {
        wishlistItems,
        setWishlistItems // It's crucial to expose the setter so components can modify the wishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};