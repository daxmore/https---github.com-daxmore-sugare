import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../context/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Calendar, Tag, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal, getItemCount, appliedCoupon, setCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const subtotal = getTotal();
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
      if (appliedCoupon.discountType === 'PERCENTAGE') {
          couponDiscount = (subtotal * appliedCoupon.discountValue) / 100;
      } else {
          couponDiscount = appliedCoupon.discountValue;
      }
  }
  
  const taxableAmount = Math.max(0, subtotal - couponDiscount);
  const gst = Math.round(taxableAmount * 0.05 * 100) / 100;
  const grandTotal = taxableAmount + gst;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsApplying(true);
    setCouponError('');
    try {
        const { data } = await axios.post('/coupons/validate', 
            { code: couponCode, cartTotal: subtotal }
        );
        setCoupon(data);
        toast.success(data.message);
    } catch (err) {
        setCouponError(err.response?.data?.message || "Invalid coupon");
        setCoupon(null);
    } finally {
        setIsApplying(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FAFAFA] pt-24">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-brand-50 rounded-full flex items-center justify-center mb-8 text-brand-500"
        >
            <ShoppingBag size={48} strokeWidth={1} />
        </motion.div>
        <h2 className="text-4xl font-serif text-brand-900 mb-4 tracking-tight">Your basket is empty</h2>
        <p className="text-gray-500 mb-10 text-center max-w-sm font-light text-lg italic leading-relaxed">
          It looks like you haven't added any of our handcrafted treats yet.
        </p>
        <Link to="/category" className="btn-elegant px-12 py-5 text-base">
          Shop the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 font-sans text-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-baseline gap-4 mb-16">
            <h1 className="text-5xl font-serif text-brand-900 tracking-tight">Shopping Basket</h1>
            <span className="text-brand-500 font-light italic text-xl">({getItemCount()} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Item List */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                    key={item.cartId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-wrap md:flex-nowrap items-center gap-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h3 className="text-xl font-serif text-brand-900 mb-2">{item.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.variant.name}</span>
                        {item.modifiers.map(m => (
                            <span key={m.name} className="px-3 py-1 bg-brand-50 border border-brand-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-600">+{m.name}</span>
                        ))}
                    </div>
                    {item.customText && (
                        <div className="text-xs font-medium text-brand-500 italic opacity-70">"{item.customText}"</div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl transition-all text-gray-400 hover:text-brand-500"><Minus size={14} /></button>
                    <span className="font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl transition-all text-gray-400 hover:text-brand-500"><Plus size={14} /></button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <div className="text-xl font-serif text-brand-900 mb-1">₹{item.subtotal.toFixed(2)}</div>
                    <button onClick={() => removeItem(item.cartId)} className="text-[10px] font-black text-red-300 hover:text-red-500 transition-colors uppercase tracking-[0.2em]">Remove</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 lg:sticky lg:top-32">
                <h3 className="text-3xl font-serif text-brand-900 mb-10 tracking-tight">Order Summary</h3>
                
                <div className="space-y-5 mb-10">
                    <div className="flex justify-between text-gray-500 font-medium">
                        <span className="text-sm">Items Subtotal</span>
                        <span className="font-serif text-brand-900 font-bold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {couponDiscount > 0 && (
                        <div className="flex justify-between text-brand-600 font-medium bg-brand-50 px-4 py-3 rounded-2xl border border-brand-100">
                            <span className="flex items-center gap-2 text-sm italic"><Tag size={14} /> Coupon applied</span>
                            <span className="font-serif font-bold">-₹{couponDiscount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-gray-500 font-medium">
                        <span className="text-sm">GST (5%)</span>
                        <span className="font-serif text-brand-900 font-bold">₹{gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                        <span className="text-sm">Shipping</span>
                        <span className="text-green-600 text-xs font-black uppercase tracking-widest">Complimentary</span>
                    </div>
                </div>

                {/* Coupon Input */}
                <div className="mb-10 pb-10 border-b border-gray-50">
                    <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-brand-200 transition-all">
                        <input 
                            type="text" 
                            placeholder="Enter Code" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-grow bg-transparent border-none px-4 py-2 text-sm font-bold focus:ring-0 uppercase placeholder:text-gray-300"
                        />
                        <button 
                            onClick={handleApplyCoupon}
                            disabled={isApplying}
                            className="px-6 bg-brand-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all disabled:bg-gray-200"
                        >
                            {isApplying ? 'Wait' : 'Apply'}
                        </button>
                    </div>
                    {couponError && <p className="text-[10px] text-red-400 font-bold mt-3 ml-2 uppercase tracking-widest italic">{couponError}</p>}
                </div>

                <div className="mb-10">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Est. Grand Total</span>
                        <span className="text-5xl font-serif text-brand-900 tracking-tighter">₹{grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                <Link to="/payment" className="btn-elegant w-full group py-6 text-base shadow-2xl shadow-brand-500/20">
                    Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-8 flex items-center gap-3 justify-center text-gray-400">
                    <Calendar size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Select Pickup Schedule next</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
