import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, ArrowRight, User } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/auth/login', formData);
      const data = response.data;

      login(data.user);
      if (data.user.isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  return (
    <div className="pt-32 pb-20 flex items-center justify-center bg-[#FAFAFA] min-h-screen px-4 font-sans text-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] max-w-4xl w-full overflow-hidden flex flex-col md:flex-row border border-gray-100"
      >
        {/* Left: Branding Image */}
        <div className="w-full md:w-1/2 relative bg-brand-50 flex items-center justify-center p-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1624000961428-eeece184988b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-20" alt="Sugaré Mood" />
            </div>
            <div className="relative z-10 text-center">
                <span className="font-serif text-5xl lg:text-6xl text-brand-900 block mb-4">Welcome Back.</span>
                <p className="text-gray-500 font-light italic text-lg max-w-xs mx-auto leading-relaxed">Your favorites are waiting for you in the kitchen.</p>
            </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-10 lg:p-16">
          <div className="mb-10">
            <span className="text-brand-500 font-bold tracking-widest uppercase text-[10px] mb-2 block">Member Login</span>
            <h1 className="text-4xl font-serif text-gray-900 mb-2">Sign In</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium placeholder:text-gray-300"
                    required
                    onChange={handleChange}
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium placeholder:text-gray-300"
                    required
                    onChange={handleChange}
                />
            </div>

            {error && (
                <div className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-2xl flex items-center gap-2">
                    <Lock size={14} /> {error}
                </div>
            )}

            <button type="submit" className="btn-elegant w-full group py-5 shadow-2xl shadow-brand-500/10">
                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center pt-6">
                <p className="text-sm text-gray-400 font-medium">
                    Don't have an account? 
                    <Link to="/register" className="text-brand-600 font-bold hover:text-brand-800 ml-2">Join Sugaré</Link>
                </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
