import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    anniversary: ''
  });
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (passwordStrength < 3) {
        return setError('Please choose a stronger password');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const response = await axios.post('/auth/register', formData);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];

  return (
    <div className="pt-32 pb-20 flex items-center justify-center bg-[#FAFAFA] min-h-screen px-4 font-sans text-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] max-w-5xl w-full overflow-hidden flex flex-col md:flex-row border border-gray-100"
      >
        {/* Left: Branding/Hero */}
        <div className="w-full md:w-5/12 bg-brand-900 p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                    <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-5xl font-serif mb-6 leading-tight tracking-tight">
                    Pure. <br />Artisan. <br />Secure.
                </h2>
                <div className="space-y-6 mt-10">
                    <div className="flex items-center gap-4 opacity-80">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-200" />
                        <span className="text-sm font-light tracking-wide">Member-only curated previews</span>
                    </div>
                    <div className="flex items-center gap-4 opacity-80">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-200" />
                        <span className="text-sm font-light tracking-wide">Priority preparation slots</span>
                    </div>
                    <div className="flex items-center gap-4 opacity-80">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-200" />
                        <span className="text-sm font-light tracking-wide">End-to-end encrypted orders</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-7/12 p-10 lg:p-16">
          <div className="mb-10">
            <span className="text-brand-500 font-bold tracking-widest uppercase text-[10px] mb-2 block">New Member</span>
            <h1 className="text-4xl font-serif text-gray-900 mb-2 tracking-tight">Join Sugaré</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" name="fullname" placeholder="John Doe" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium placeholder:text-gray-300" required onChange={handleChange} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
                    <input type="text" name="username" placeholder="johndoe" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium placeholder:text-gray-300" required onChange={handleChange} />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" name="email" placeholder="john@example.com" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium placeholder:text-gray-300" required onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Birthday</label>
                    <input type="date" name="birthday" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium text-gray-500" required onChange={handleChange} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Anniversary (Optional)</label>
                    <input type="date" name="anniversary" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium text-gray-500" onChange={handleChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                    <input type="password" name="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium placeholder:text-gray-300" required onChange={handleChange} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
                    <input type="password" name="confirmPassword" placeholder="••••••••" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium placeholder:text-gray-300" required onChange={handleChange} />
                </div>
            </div>

            {/* Strength Meter */}
            {formData.password && (
                <div className="px-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strength</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${passwordStrength < 2 ? 'text-red-400' : 'text-green-500'}`}>
                            {strengthLabels[passwordStrength - 1] || 'Too Short'}
                        </span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden flex gap-1">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className={`h-full flex-1 transition-all duration-500 ${passwordStrength >= s ? strengthColors[passwordStrength - 1] : 'bg-transparent'}`} />
                        ))}
                    </div>
                </div>
            )}

            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-2xl text-xs font-bold"
                    >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <button type="submit" className="btn-elegant w-full group py-5 shadow-2xl shadow-brand-500/10 mt-4">
                Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="text-center pt-4">
                <p className="text-sm text-gray-400 font-medium">
                    Already a member?
                    <Link to="/login" className="text-brand-600 font-bold hover:text-brand-800 ml-2">Sign in here</Link>
                </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
