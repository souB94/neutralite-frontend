import React, { useState } from 'react';
import InnerBanner from '../../components/InnerBanner/InnerBanner';
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'; // Make sure you import useContext
import { AuthContext } from '../../context/AuthContext'; // Import useAuth hook

function SignIn (){

    const navigate = useNavigate();
     const { login } = useContext(AuthContext); // Get the login function from context
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

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

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Login successful! Redirecting...');
                login(data);
                setTimeout(() => {
                    navigate('/dashboard'); // Redirect to home page after successful login
                }, 2000);
            } else {
                setMessage(data.message || 'Login failed. Please try again.');
                if (data.errors) {
                    setErrors(data.errors);
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return(

        <>
            
            <div className="main_content_wrapper">
                <InnerBanner />
                <div className="create_account_section bg-cream-100 py-10">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper">
                            <div className="account_form_wrapper">
                                <form action="" id="login_account" className="p-6 bg-cream-400 max-w-[600px] mx-auto" onSubmit={handleSubmit}>
                                    <div className="inner_form_wrapper bg-white pt-10 px-5 pb-5">
                                        <h2 className="form_header text-black text-[35px] font-semibold mb-4 text-center">Login</h2>
                                        {message && (
                                            <p className={`text-center text-sm mb-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                                {message}
                                            </p>
                                        )}
                                        <div className="form_group email w-full mt-3">
                                            <input id="email" name="email" type="email" className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                                            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
                                        </div>
                                        <div className="form-group password w-full mt-3">
                                            <input id="password" name="password" type="password" className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                                            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
                                        </div>
                                        <div className="end_note text-gray text-[15px] text-left mt-5"><a href="/reset-password" className="text-black underline">Forgot Your Password? </a> </div>
                                        <div className="submit_btn_wrapper w-full mt-4">
                                            <button className="flex-1 bg-brown-600 text-white py-3 px-4 cursor-pointer w-full font-urbanist font-bold">
                                                Submit
                                            </button>
                                        </div>
                                        <div className="end_note text-gray text-[15px] text-center mt-5">Don't have account? <a href="/signup" className="text-black underline">Sign Up</a> </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignIn;