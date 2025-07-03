import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../../components/InnerBanner/InnerBanner';
import Footer from "../../components/Footer/Footer";

function CreateAccount(){

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(''); // For success or general error messages

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
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setErrors({}); // Clear previous errors

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Replace with your actual backend registration endpoint
            const response = await fetch('http://localhost:5000/api/auth/register', {
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

            if (response.ok) {
                setMessage('Account created successfully! Redirecting to login...');
                // Optionally, you might automatically log them in or redirect to login
                setTimeout(() => {
                    navigate('/login'); // Assuming you'll have a /login route
                }, 2000);
            } else {
                setMessage(data.message || 'Registration failed. Please try again.');
                // Handle specific errors from backend if any (e.g., email already exists)
                if (data.errors) {
                    setErrors(data.errors); // If backend sends detailed errors
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
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
                                <form action="" id="create_account" className="p-6 bg-cream-400 max-w-[600px] mx-auto">
                                    <div className="inner_form_wrapper bg-white pt-10 px-5 pb-5">
                                        <h2 className="form_header text-black text-[35px] font-semibold mb-4 text-center">Create Account</h2>
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
                                            id="confirm_password" 
                                            name="confirm_password" 
                                            type="password" 
                                            className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full" 
                                            placeholder="Confirm Password" 
                                            value={formData.confirm_password}
                                            onChange={handleInputChange}
                                            />
                                            {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                         {message && (
                                            <p className={`text-center text-sm mb-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                                {message}
                                            </p>
                                        )}
                                        <div className="submit_btn_wrapper w-full mt-4">
                                            <button className="flex-1 bg-brown-600 text-white py-3 px-4 cursor-pointer w-full font-urbanist font-bold" disabled={loading}>
                                               {loading ? 'Creating Account...' : 'Create Account'}
                                            </button>
                                        </div>
                                        <div className="end_note text-gray text-[15px] text-center mt-5 font-urbanist">Already have account? <Link href="/signin" className="text-black underline">Sign In</Link> </div>
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