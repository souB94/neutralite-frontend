import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
  const fetchProfile = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // ✅ Read from userInfo
    const token = userInfo?.token;

    console.log("🔐 Token in fetchProfile:", token); // Optional debug

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get('/api/users/profile', config);
      setName(data.name);
      setEmail(data.email);
      setAddress(data.address || '');
    } catch (err) {
      console.error('❌ Error loading profile:', err);
      toast.error('Failed to load profile');
    }
  };

  fetchProfile();
}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    };

    try {
      await axios.put('/api/users/profile', { name, email, address, password }, config);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <div className="">
      <h2 className='text-xl font-bold text-brown-600 border-b-2  mb-3 pb-2'>Your Profile</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={submitHandler} className="space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-3 border border-amber-200 bg-white" placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3 border border-amber-200 bg-white" placeholder="Email" />
        <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-5 py-3 border border-amber-200 bg-white" placeholder="Address" />
        <h4 className='text-brown-600 font-bold italic'>Update If Required</h4>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-3 border border-amber-200 bg-white" placeholder="New Password" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-5 py-3 border border-amber-200 bg-white" placeholder="Confirm Password" />
        <button type="submit" className="w-full bg-blue-600 text-white px-5 py-3 bg-brown-600 cursor-pointer font-bold font-urbanist">Update</button>
      </form>
    </div>
  );
};

export default Profile;
