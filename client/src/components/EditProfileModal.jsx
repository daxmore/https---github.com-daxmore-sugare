import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { X, User, Lock, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    fullname: user.fullname,
    username: user.username,
    birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '',
    anniversary: user.anniversary ? new Date(user.anniversary).toISOString().split('T')[0] : '',
    address: user.addresses?.[0] || '', // Using the first address for simplicity
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const payload = {
        ...formData,
        addresses: formData.address ? [formData.address] : []
    };

    try {
      const { data } = await axios.put(`http://localhost:5000/api/auth/update/${user._id}`, payload, { withCredentials: true });
      setUser(data);
      onClose();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error('Failed to update profile', error);
      alert("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
            <X className="w-6 h-6 text-gray-400" />
        </button>

        <form onSubmit={handleSubmit} className="p-10">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Edit Profile</h2>
          
          <div className="space-y-6 max-h-[60vh] overflow-y-auto px-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" value={formData.fullname} onChange={(e) => setFormData({...formData, fullname: e.target.value})} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                    <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Birthday</label>
                    <input type="date" value={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold text-gray-500" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Anniversary</label>
                    <input type="date" value={formData.anniversary} onChange={(e) => setFormData({...formData, anniversary: e.target.value})} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold text-gray-500" />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Address</label>
                <textarea 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})} 
                    placeholder="Enter your street address, apartment, city..."
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold h-24" 
                />
            </div>

            <div className="p-6 bg-orange-50 rounded-3xl space-y-4">
                <h4 className="text-[10px] font-black text-orange-400 uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Security Update
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    <input type="password" placeholder="New Password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-3 bg-white border-none rounded-xl text-sm font-bold" />
                    <input type="password" placeholder="Confirm" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full p-3 bg-white border-none rounded-xl text-sm font-bold" />
                </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-8 py-4 rounded-2xl font-black text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
              <button type="submit" className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 hover:bg-black transition-all">Save Changes</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
