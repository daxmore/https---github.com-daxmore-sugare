import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Tag, CheckCircle, XCircle, Calendar, DollarSign, Users, Sparkles } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const initialFormState = {
    code: '',
    discountType: 'PERCENTAGE',
    discountValue: 0,
    minOrderAmount: 0,
    expiryDate: '',
    usageLimit: 100,
    isActive: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchCoupons = async () => {
    try {
        const res = await axios.get('/coupons/all');
        setCoupons(res.data);
    } catch (err) {
        toast.error("Failed to load coupons");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(isEditing ? 'Updating reward...' : 'Creating reward...');
    setLoading(true);

    try {
      if (isEditing) {
        await axios.put(`/coupons/${formData._id}`, formData);
        toast.success("Coupon updated", { id: toastId });
      } else {
        await axios.post('/coupons/create', formData);
        toast.success("New coupon active", { id: toastId });
      }
      setShowModal(false);
      setFormData(initialFormState);
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (coupon) => {
    setFormData({
      ...coupon,
      expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0]
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    const toastId = toast.loading('Deleting...');
    try {
      await axios.delete(`/coupons/${id}`);
      toast.success("Coupon removed", { id: toastId });
      fetchCoupons();
    } catch (err) {
        toast.error("Failed to delete", { id: toastId });
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    const toastId = toast.loading('Syncing status...');
    try {
      await axios.put(`/coupons/${id}`, { isActive: !currentStatus });
      toast.success("Status updated", { id: toastId });
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to update", { id: toastId });
    }
  };

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen font-sans text-gray-900 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
        <div>
            <h1 className="text-4xl font-serif text-brand-900 mb-2 tracking-tight">Reward Catalog</h1>
            <p className="text-gray-500 font-medium">Manage promotional codes and exclusive member rewards.</p>
        </div>
        <button 
            onClick={() => { setIsEditing(false); setFormData(initialFormState); setShowModal(true); }}
            className="btn-elegant px-10"
        >
          <Plus size={18} />
          Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {coupons.map((coupon) => (
          <motion.div 
            layout
            key={coupon._id}
            className={`bg-white rounded-[2rem] p-8 border ${coupon.isActive ? 'border-gray-100 hover:border-brand-200' : 'border-red-50 opacity-70'} shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500 relative overflow-hidden`}
          >
            {!coupon.isActive && <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-lg">Inactive</div>}
            
            <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500">
                    <Tag size={20} strokeWidth={1.5} />
                </div>
                <button onClick={() => handleToggleActive(coupon._id, coupon.isActive)} className={`p-2 rounded-full transition-all ${coupon.isActive ? 'bg-green-50 text-green-500 hover:bg-green-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                    {coupon.isActive ? <CheckCircle size={20} /> : <XCircle size={20} />}
                </button>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-serif text-brand-900 tracking-wider uppercase mb-1">{coupon.code}</h3>
                <p className="text-brand-500 font-black text-xs uppercase tracking-[0.2em] italic">
                    {coupon.discountValue}% Off Entire Order
                </p>
            </div>
            
            <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-widest"><DollarSign size={12}/> Min Order</div>
                    <span className="font-bold text-gray-900">₹{coupon.minOrderAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-widest"><Users size={12}/> Usage</div>
                    <span className="font-bold text-gray-900">{coupon.usedCount} / {coupon.usageLimit}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-widest"><Calendar size={12}/> Expires</div>
                    <span className="font-bold text-gray-900">{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button onClick={() => handleEdit(coupon)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                    <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(coupon._id)} className="p-2.5 text-red-400 hover:bg-red-50 hover:border-red-100 border border-transparent rounded-xl transition-all">
                    <Trash2 size={18} />
                </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl relative overflow-hidden border border-brand-100"
            >
                <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
                    <X size={24} className="text-gray-400" />
                </button>

                <form onSubmit={handleSubmit} className="p-12">
                    <div className="mb-10">
                        <span className="text-brand-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">Reward Editor</span>
                        <h2 className="text-4xl font-serif text-gray-900 tracking-tight">{isEditing ? 'Refine' : 'Compose'} Coupon</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Promotional Code</label>
                            <input type="text" required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-bold text-xl uppercase tracking-[0.2em] transition-all" placeholder="e.g. WELCOME10" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Discount Percentage (%)</label>
                            <div className="relative group">
                                <input type="number" min="1" max="100" required value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: e.target.value})} className="w-full p-5 bg-brand-50/30 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-serif text-3xl text-brand-600 transition-all" />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-serif text-3xl text-brand-200">%</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Min. Spend (₹)</label>
                                <input type="number" min="0" required value={formData.minOrderAmount} onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-bold transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Total Limit</label>
                                <input type="number" min="1" required value={formData.usageLimit} onChange={(e) => setFormData({...formData, usageLimit: e.target.value})} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-bold transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Expiration Date</label>
                            <input type="date" required value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-bold text-gray-500 transition-all" />
                        </div>

                        <div className="flex items-center gap-4 mt-4 px-2">
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                                <label htmlFor="isActive" className="ml-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Active Status</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn-elegant w-full mt-10 py-6 text-base rounded-[1.5rem] shadow-2xl shadow-brand-500/20 uppercase tracking-widest">
                        {loading ? 'Wait...' : (isEditing ? 'Refine Coupon' : 'Activate Coupon')}
                    </button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCoupons;
