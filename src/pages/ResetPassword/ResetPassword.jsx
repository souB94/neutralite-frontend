// frontend/src/pages/ResetPassword/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InnerBanner from '../../components/InnerBanner/InnerBanner';
import Footer from "../../components/Footer/Footer";

function ResetPassword() {
    const { token } = useParams(); // Token from URL
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/users/forgotpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Password reset link sent to your email.');
            } else {
                setError(data.message || 'Error sending reset link.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/users/resetpassword/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, confirmPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Password reset successful!');
                setTimeout(() => navigate('/signin'), 3000);
            } else {
                setError(data.message || 'Reset failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
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
                                <form
                                    onSubmit={token ? handleResetSubmit : handleForgotSubmit}
                                    className="p-6 bg-cream-400 max-w-[600px] mx-auto"
                                >
                                    <div className="inner_form_wrapper bg-white pt-10 px-5 pb-5">
                                        <h2 className="form_header text-black text-[30px] font-semibold mb-4 text-center">
                                            {token ? 'Reset Password' : 'Forgot Password'}
                                        </h2>

                                        {message && (
                                            <p className="text-green-500 text-center mb-4">{message}</p>
                                        )}
                                        {error && (
                                            <p className="text-red-500 text-center mb-4">{error}</p>
                                        )}

                                        {token ? (
                                            <>
                                                <div className="form-group password w-full mt-3">
                                                    <label htmlFor="password" className='block mb-2'>New Password</label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full"
                                                        placeholder="Enter new password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group confirm_password w-full mt-3">
                                                    <label htmlFor="confirmPassword" className='block mb-2'>Confirm Password</label>
                                                    <input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type="password"
                                                        className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full"
                                                        placeholder="Confirm new password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="form-group email w-full mt-3">
                                                <label htmlFor="email" className='mb-2 block'>Email Address</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        )}

                                        <div className="submit_btn_wrapper w-full mt-4">
                                            <button
                                                type="submit"
                                                className="flex-1 bg-brown-600 text-white py-3 px-4 cursor-pointer w-full font-urbanist font-bold"
                                                disabled={loading}
                                            >
                                                {loading ? 'Please wait...' : token ? 'Reset Password' : 'Send Reset Link'}
                                            </button>
                                        </div>

                                        {(message || error) && (
                                            <div className="text-center mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/signin')}
                                                    className="bg-gray-800 text-white py-3 px-4  font-urbanist font-bold w-full"
                                                >
                                                    Go to Login
                                                </button>
                                            </div>
                                        )}
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

export default ResetPassword;
