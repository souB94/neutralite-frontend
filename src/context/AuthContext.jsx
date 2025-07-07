// frontend/src/context/AuthContext.jsx (excerpt)

import React, { createContext, useState, useEffect } from 'react'; // Make sure all are imported

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage or null
  const [user, setUser] = useState(() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      return null;
    }
  });

  // --- CRITICAL PART ---
  const login = (userData) => {
    console.log("AuthContext: Login function called with userData:", userData); // This log should show the full user object
    setUser(userData); // <--- This updates the React state
    localStorage.setItem('userInfo', JSON.stringify(userData)); // <--- This saves to local storage
  };

  const logout = () => {
    console.log("AuthContext: Logout function called.");
    setUser(null);
    localStorage.removeItem('userInfo');
  };
  // --- END CRITICAL PART ---

  // Optional: useEffect to re-initialize user on mount if local storage changed (good for refresh)
  useEffect(() => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            if (parsedUser && parsedUser.token) { // Basic check for valid data
                setUser(parsedUser);
            }
        }
    } catch (error) {
        console.error("Error re-initializing user from localStorage on mount:", error);
        setUser(null);
    }
  }, []); // Empty dependency array means run once on mount

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};