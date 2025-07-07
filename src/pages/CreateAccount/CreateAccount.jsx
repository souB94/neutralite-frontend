import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../../components/InnerBanner/InnerBanner';
import Footer from "../../components/Footer/Footer";
import {AuthContext } from '../../context/AuthContext'; // Import useAuth hook

function CreateAccount() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get the login function from context 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(''); // For success or general error messages

    // Determine the backend URL based on your build tool (Vite or Create React App)
    // If you are using Vite, this is correct:
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';
    // If you are using Create React App, use this:
    // const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
            isValid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
            isValid = false;
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required.';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        setMessage(''); // Clear previous messages
        setErrors({}); // Clear previous errors

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            if (!backendUrl) { // Check if backendUrl is defined before fetching
                setMessage("Backend URL is not configured. Please check your .env file or VITE_APP_BACKEND_URL.");
                setLoading(false);
                return;
            }

            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) { // Check if the response status is 2xx (e.g., 201 Created)
                setMessage('Account created successfully! Redirecting to login...');
                // Reset formData state
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                console.log('Registration Data:', data);
                // Redirect to login page after a delay
                setTimeout(() => {
                    navigate('/signin'); // Use the correct route name if it's /signin as per your Link
                }, 2000);
            } else {
                // Handle errors from the backend (e.g., 'User already exists', 'Invalid data')
                setMessage(data.message || 'Registration failed. Please try again.');
                // If backend sends detailed errors, set them
                if (data.errors) {
                    setErrors(data.errors);
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="main_content_wrapper">
                <InnerBanner />
                <div className="create_account_section bg-cream-100 py-10">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper">
                            <div className="account_form_wrapper">
                                {/* Attach onSubmit handler to the form */}
                                <form onSubmit={handleSubmit} id="create_account" className="p-6 bg-cream-400 max-w-[600px] mx-auto">
                                    <div className="inner_form_wrapper bg-white pt-10 px-5 pb-5">
                                        <h2 className="form_header text-black text-[35px] font-semibold mb-4 text-center">Create Account</h2>
                                        {message && (
                                            <p className={`text-center text-sm mb-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                                {message}
                                            </p>
                                        )}
                                        <div className="form_group name w-full ">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full"
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
                                        </div>
                                        <div className="form_group email w-full mt-3">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
                                        </div>
                                        <div className="form-group password w-full mt-3">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
                                        </div>
                                        <div className="form-group confirm_password w-full mt-3">
                                            <input
                                                id="confirmpassword"
                                                name="confirmPassword" 
                                                type="password"
                                                className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full"
                                                placeholder="Confirm Password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                            />
                                            {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                        <div className="submit_btn_wrapper w-full mt-4">
                                            <button type="submit" className="flex-1 bg-brown-600 text-white py-3 px-4 cursor-pointer w-full font-urbanist font-bold" disabled={loading}>
                                                {loading ? 'Creating Account...' : 'Create Account'}
                                            </button>
                                        </div>
                                        <div className="end_note text-gray text-[15px] text-center mt-5 font-urbanist">
                                            Already have account? <Link to="/signin" className="text-black underline">Sign In</Link> {/* Corrected href to to */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CreateAccount;