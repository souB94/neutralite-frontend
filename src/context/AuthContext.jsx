// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
export const AuthContext = createContext();

// Create the Provider Component
export const AuthProvider = ({ children }) => {
    // State to hold user info (including token)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To manage initial loading state

    // Load user from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("AuthContext: User loaded from localStorage:", parsedUser); // Add this
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user info from localStorage:", error);
                localStorage.removeItem('userInfo'); // Clear invalid data
            }
        }
        setLoading(false); // Done loading
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData); // Set user state
        localStorage.setItem('userInfo', JSON.stringify(userData)); // Store in localStorage
    };

    // Logout function
    const logout = () => {
        setUser(null); // Clear user state
        localStorage.removeItem('userInfo'); // Remove from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext easily        
export const useAuth = () => useContext(AuthContext);