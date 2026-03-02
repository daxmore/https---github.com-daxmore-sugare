import React, { useState, useEffect } from 'react';
import { Trash2, ShieldCheck, Star, Award, Coins, Search, User as UserIcon, X, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [coinModal, setCoinModal] = useState({ 
    isOpen: false, 
    user: null, 
    addAmount: '', 
    removeAmount: '' 
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
        const { data } = await axios.get('/auth/all');
        setUsers(data.filter(u => !u.isAdmin));
    } catch (err) {
        toast.error("Failed to load users");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleMembership = async (userId, currentTier) => {
    const newTier = currentTier === 'GOLD' ? 'BASIC' : 'GOLD';
    const toastId = toast.loading('Updating membership...');
    try {
        await axios.put(`/auth/update/${userId}`, { membershipTier: newTier });
        toast.success(`User updated to ${newTier}`, { id: toastId });
        fetchUsers();
    } catch (err) {
        toast.error("Failed to update membership", { id: toastId });
    }
  };

  const handleCoinSubmit = async (e) => {
    e.preventDefault();
    if (!coinModal.user) return;

    const currentCoins = coinModal.user.cakeCoins || 0;
    const add = parseInt(coinModal.addAmount || 0);
    const remove = parseInt(coinModal.removeAmount || 0);
    
    // Final balance calculation
    const newBalance = Math.max(0, currentCoins + add - remove);

    const toastId = toast.loading('Updating coins...');
    try {
        await axios.put(`/auth/update/${coinModal.user._id}`, { cakeCoins: newBalance });
        toast.success(`Updated balance: ${newBalance} coins`, { id: toastId });
        setCoinModal({ isOpen: false, user: null, addAmount: '', removeAmount: '' });
        fetchUsers();
    } catch (err) {
        toast.error("Failed to update coins", { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user account forever? This cannot be undone.')) return;
    const toastId = toast.loading('Removing user...');
    try {
        await axios.delete(`/auth/${id}`);
        toast.success("User removed successfully", { id: toastId });
        fetchUsers();
    } catch (err) {
        toast.error("Failed to delete user", { id: toastId });
    }
  };

  const filteredUsers = users.filter(u => 
    u.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
            <h1 className="text-4xl font-serif text-gray-900 mb-2 tracking-tight">Customer CRM</h1>
            <p className="text-gray-500 font-medium text-sm">Customer database, loyalty management, and membership tiers.</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-orange-500" />
            <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchTerm}
                onChange={(e) => setSearchSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-full shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-medium transition-all"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence>
            {filteredUsers.map((user) => (
                <motion.div 
                    layout
                    key={user._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-wrap sm:flex-nowrap items-center gap-6 group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
                >
                    <div className="relative">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-500 ${user.membershipTier === 'GOLD' ? 'bg-orange-500 shadow-lg shadow-orange-200' : 'bg-gray-50'}`}>
                            {user.profileImage ? (
                                <img src={user.profileImage} className="w-full h-full rounded-full object-cover" alt="User profile" />
                            ) : (
                                <UserIcon className={`w-8 h-8 ${user.membershipTier === 'GOLD' ? 'text-white' : 'text-gray-300'}`} />
                            )}
                        </div>
                        {user.membershipTier === 'GOLD' && (
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-pulse">
                                <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                        )}
                    </div>

                    <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold text-gray-900 truncate">{user.fullname}</h3>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${user.membershipTier === 'GOLD' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                {user.membershipTier}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 truncate">@{user.username} • {user.email}</p>
                        
                        <div className="flex gap-8">
                            <div className="group/stat">
                                <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 group-hover/stat:text-orange-400 transition-colors">Balance</div>
                                <div className="flex items-center gap-1.5 font-black text-gray-700 text-lg">
                                    <Coins className="w-4 h-4 text-orange-400" />
                                    {user.cakeCoins || 0}
                                </div>
                            </div>
                            <div className="group/stat">
                                <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 group-hover/stat:text-blue-400 transition-colors">Joined</div>
                                <div className="font-black text-gray-700 text-lg">{new Date(user.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:w-auto">
                        <button 
                            onClick={() => handleToggleMembership(user._id, user.membershipTier)}
                            className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-black transition-all ${user.membershipTier === 'GOLD' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-100'}`}
                        >
                            <Award className="w-4 h-4" />
                            {user.membershipTier === 'GOLD' ? 'Downgrade' : 'Upgrade to Gold'}
                        </button>
                        <button 
                            onClick={() => setCoinModal({ isOpen: true, user: user, addAmount: '', removeAmount: '' })}
                            className="flex items-center justify-center gap-2 py-3 px-5 bg-gray-50 text-gray-600 rounded-xl text-xs font-black hover:bg-gray-900 hover:text-white transition-all border border-transparent hover:border-gray-900"
                        >
                            <Coins className="w-4 h-4" /> Manage Coins
                        </button>
                        <button 
                            onClick={() => handleDelete(user._id)}
                            className="flex items-center justify-center gap-2 py-3 px-5 text-red-400 border border-transparent hover:border-red-100 rounded-xl text-xs font-black hover:bg-red-50 transition-all"
                        >
                            <Trash2 className="w-4 h-4" /> Remove User
                        </button>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Improved Coin Adjustment Modal */}
      <AnimatePresence>
        {coinModal.isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative shadow-2xl border border-gray-100"
                >
                    <button onClick={() => setCoinModal({ isOpen: false, user: null, addAmount: '', removeAmount: '' })} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                        <Coins className="w-8 h-8 text-orange-500" />
                    </div>
                    
                    <h2 className="text-3xl font-serif text-gray-900 mb-2 tracking-tight">Manage Coins</h2>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        Adjust balance for <strong className="text-gray-900 font-bold">{coinModal.user?.fullname}</strong>.<br/>
                        Current: <span className="text-orange-600 font-black">₹{coinModal.user?.cakeCoins || 0} coins</span>
                    </p>

                    <form onSubmit={handleCoinSubmit} className="space-y-8">
                        <div className="space-y-6">
                            {/* ADD FIELD */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Plus size={12} strokeWidth={3} /> Add Coins
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={coinModal.addAmount}
                                        onChange={(e) => setCoinModal({...coinModal, addAmount: e.target.value})}
                                        placeholder="0"
                                        className="w-full p-5 bg-green-50/30 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-3xl outline-none font-black text-2xl text-green-700 transition-all placeholder:text-green-200"
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-green-200 text-sm uppercase">Coins</div>
                                </div>
                            </div>

                            {/* REMOVE FIELD */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Minus size={12} strokeWidth={3} /> Remove Coins
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={coinModal.removeAmount}
                                        onChange={(e) => setCoinModal({...coinModal, removeAmount: e.target.value})}
                                        placeholder="0"
                                        className="w-full p-5 bg-red-50/30 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-3xl outline-none font-black text-2xl text-red-600 transition-all placeholder:text-red-200"
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-red-200 text-sm uppercase">Coins</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="btn-elegant w-full shadow-2xl shadow-gray-200">
                                Apply Adjustment
                            </button>
                            <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">Balance cannot drop below zero</p>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageUsers;
