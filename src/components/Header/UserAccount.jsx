// src/components/UserAccountControl/UserAccountControl.js
import React, { useState, useEffect, useContext } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function UserAccountControl() {
    const navigate = useNavigate();
    const { user, logout } =  useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // New state to control menu visibility

     // Add this useEffect to see user changes
    useEffect(() => {
        console.log("UserAccountControl: Current user state from AuthContext:", user);
    }, [user]); // Re-run effect whenever 'user' changes


    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home page or login page after logout
        setIsMenuOpen(false); // Close the menu after logout
    };

    // Close the menu if clicked outside (optional, but good UX)
    // You'd typically use a ref and an effect for this, but for simplicity,
    // we'll rely on clicks on the links/buttons to close it.

    return (
        <>
            <i className="fi fi-rr-circle-user cursor-pointer" onClick={toggleMenu}></i>
            {/* Conditionally render the dropdown menu based on isMenuOpen state */}
            {isMenuOpen && (
                <div className="user_account_control absolute flex items-center gap-4">
                    <ul className="flex items-center flex-col justify-start border-1 border-gray-300 w-[100px] bg-cream-100">
                        {user ? ( // Conditionally render based on 'user' state
                            <>
                                <li className="my_account w-full">
                                    <Link to="/dashboard" onClick={toggleMenu} className="py-2 px-3 text-[14px] block w-full text-gray-600 transition-colors duration-300 hover:text-white">
                                        <span className="fi fi-rr-user mr-2"></span>My Account
                                    </Link>
                                </li>
                                <li className="sign_out w-full">
                                    <a onClick={handleLogout} className="py-2 px-3 text-[14px] block w-full text-gray-600 transition-colors duration-300 hover:text-white cursor-pointer">
                                        <span className="fi fi-rr-sign-out mr-2"></span>Sign Out
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="log_in w-full">
                                    <Link to="/signin" onClick={toggleMenu} className="py-2 px-3 text-[14px] block w-full text-gray-600 transition-colors duration-300 hover:text-white">
                                        <span className="fi fi-rr-user mr-2"></span>Log In
                                    </Link>
                                </li>
                                <li className="sign_up w-full">
                                    <Link to="/signup" onClick={toggleMenu} className="py-2 px-3 text-[14px] block w-full text-gray-600 transition-colors duration-300 hover:text-white">
                                        <span className="fi fi-rr-user-add mr-2"></span>Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
}
export default UserAccountControl;