"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/admin/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(res.data.admin));
        toast.success('Login successful!');
        router.push('/admin');
      } else {
        toast.error(res.data.error || 'Login failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4FAFB] via-white to-[#E8F4F7] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-[#D9EEF2] p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#1A4D3E]">Admin Login</h1>
          <p className="text-[#64748B] text-sm mt-1">Access the GutTalks admin panel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1A4D3E] mb-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#D9EEF2] rounded-xl focus:ring-2 focus:ring-[#18606D] focus:outline-none"
                placeholder="admin@guttalks.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#1A4D3E] mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#D9EEF2] rounded-xl focus:ring-2 focus:ring-[#18606D] focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#18606D] to-[#2A7F8F] text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FaSignInAlt /> Sign In
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}