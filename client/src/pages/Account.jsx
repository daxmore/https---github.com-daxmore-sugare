import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Heart, MapPin, ShoppingBag, LogOut, Award, Star, TrendingUp, Zap, ChevronRight, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import EditProfileModal from '../components/EditProfileModal';

const Account = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-white"><div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/login" />;

  const isGold = user.membershipTier === 'GOLD';

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 font-sans text-gray-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="relative">
                <div className={`w-32 h-32 rounded-full border-4 p-1.5 ${isGold ? 'border-brand-400' : 'border-gray-100'}`}>
                    <img 
                        src={user.profileImage || `https://ui-avatars.com/api/?name=${user.fullname}&size=128&background=F7EAE3&color=D97757`} 
                        alt="profile" 
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                {isGold && (
                    <div className="absolute -bottom-1 -right-1 bg-brand-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                        <Star size={16} fill="currentColor" />
                    </div>
                )}
            </div>
            <div className="text-center md:text-left flex-grow">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h1 className="text-4xl font-serif text-gray-900">{user.fullname}</h1>
                    <span className={`w-fit mx-auto md:mx-0 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isGold ? 'bg-brand-50 text-brand-600 border-brand-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                        {user.membershipTier} Member
                    </span>
                </div>
                <p className="text-gray-400 font-medium tracking-wide">@{user.username} • {user.email}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn-elegant-outline px-8">
                <Edit2 size={16} /> Edit Profile
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Membership & Coins Card */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
                whileHover={{ y: -5 }}
                className={`p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden ${isGold ? 'bg-brand-900 text-white' : 'bg-white border border-gray-100 text-gray-900'}`}
            >
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isGold ? 'bg-brand-500' : 'bg-brand-50 text-brand-500'}`}>
                            <Award size={24} />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Loyalty Status</div>
                    </div>

                    <div className="mb-10">
                        <div className="text-sm font-medium mb-1 opacity-60">Cake Coins Balance</div>
                        <div className="text-6xl font-serif flex items-baseline gap-3">
                            {user.cakeCoins || 0}
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Coins</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10 opacity-80">
                        <div className="flex items-center gap-3 text-sm">
                            <Zap size={14} className="text-brand-500" />
                            {isGold ? '10% Instant discount on all orders' : 'Earn 1 coin for every ₹10 spent'}
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Zap size={14} className="text-brand-500" />
                            Priority artisan preparation
                        </div>
                    </div>

                    {!isGold && (
                        <button className="w-full py-4 rounded-2xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20">
                            Upgrade to Gold
                        </button>
                    )}
                </div>
            </motion.div>

            <div className="space-y-3">
                <QuickLink to="/orders" icon={<ShoppingBag size={18} />} label="Order History" />
                <QuickLink to="/wishlist" icon={<Heart size={18} />} label="My Wishlist" />
                <button onClick={logout} className="w-full flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-all group text-red-500">
                    <div className="flex items-center gap-4">
                        <LogOut size={18} />
                        <span className="font-bold text-sm">Logout Session</span>
                    </div>
                </button>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-serif text-gray-900 mb-10 tracking-tight">Personal Details</h3>
                <div className="grid md:grid-cols-2 gap-12">
                    <DetailItem label="Full Legal Name" value={user.fullname} />
                    <DetailItem label="Member Since" value={new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} />
                    <DetailItem label="Primary Email" value={user.email} />
                    <DetailItem label="Celebration Date" value={user.birthday ? new Date(user.birthday).toLocaleDateString() : 'Not set'} />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <MapPin className="text-brand-500 mb-6" size={28} strokeWidth={1.5} />
                    <h4 className="text-xl font-serif text-gray-900 mb-3">Saved Address</h4>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 flex-grow italic">
                        {user.addresses?.[0] || 'No delivery or pickup address has been saved to your profile yet.'}
                    </p>
                    <button onClick={() => setIsModalOpen(true)} className="text-brand-600 font-bold text-xs uppercase tracking-widest hover:text-brand-800 transition-colors text-left">
                        Update Location →
                    </button>
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <TrendingUp className="text-brand-500 mb-6" size={28} strokeWidth={1.5} />
                    <h4 className="text-xl font-serif text-gray-900 mb-3">Recent Activity</h4>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 flex-grow">
                        You've completed 0 orders this month. Your next treat is waiting in the catalog!
                    </p>
                    <Link to="/category" className="text-brand-600 font-bold text-xs uppercase tracking-widest hover:text-brand-800 transition-colors">
                        Browse Catalog →
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const QuickLink = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 hover:border-brand-200 transition-all group">
        <div className="flex items-center gap-4">
            <div className="text-gray-400 group-hover:text-brand-500 transition-colors">{icon}</div>
            <span className="font-bold text-gray-700 text-sm">{label}</span>
        </div>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-500 transition-all" />
    </Link>
);

const DetailItem = ({ label, value }) => (
    <div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</div>
        <div className="text-lg font-medium text-gray-900 border-b border-gray-50 pb-2">{value}</div>
    </div>
);

export default Account;
