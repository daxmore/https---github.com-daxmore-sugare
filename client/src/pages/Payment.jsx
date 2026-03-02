import React, { useState, useContext } from 'react';
import { CheckCircle, CreditCard, ShoppingBag, Calendar, ArrowRight, Star, Tag, ChevronLeft } from 'lucide-react';
import useCartStore from '../context/useCartStore';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Payment = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { items, getTotal, clearCart, appliedCoupon, clearCoupon } = useCartStore();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = getTotal();
  const isGold = user?.membershipTier === 'GOLD';
  const membershipDiscount = isGold ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
      if (appliedCoupon.discountType === 'PERCENTAGE') {
          couponDiscount = (subtotal * appliedCoupon.discountValue) / 100;
      } else {
          couponDiscount = appliedCoupon.discountValue;
      }
  }
  
  const taxableAmount = Math.max(0, subtotal - membershipDiscount - couponDiscount);
  const gst = Math.round(taxableAmount * 0.05 * 100) / 100;
  const grandTotal = taxableAmount + gst;

  const handlePlaceOrder = async () => {
    if (!pickupDate) {
      return toast.error("Please select a pickup date");
    }

    const toastId = toast.loading('Reserving your treats...');
    setIsProcessing(true);
    try {
      const orderData = {
        items: items.map(item => ({
          dessert: item.dessertId,
          variant: item.variant,
          modifiers: item.modifiers,
          quantity: item.quantity,
          customText: item.customText,
          specialInstructions: item.specialInstructions
        })),
        pickupDate,
        couponCode: appliedCoupon?.couponCode
      };

      const response = await axios.post('/orders', orderData);

      if (response.status === 201) {
        toast.success("Reservation confirmed!", { id: toastId });
        clearCart();
        clearCoupon();
        setShowSuccess(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 font-sans text-gray-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-600 transition-colors mb-10 text-sm font-medium">
            <ChevronLeft size={16} /> Return to Basket
        </Link>

        <div className="flex items-baseline gap-4 mb-16">
            <h1 className="text-5xl font-serif text-brand-900 tracking-tight">Checkout</h1>
            <span className="text-brand-500 font-light italic text-xl">Finalizing your order</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Pickup & Payment Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500">
                        <Calendar size={24} />
                    </div>
                    <h2 className="text-2xl font-serif text-brand-900 tracking-tight">Pickup Schedule</h2>
                </div>
                
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Date</label>
                        <input 
                            type="date" 
                            min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} 
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 font-bold text-gray-700 transition-all"
                        />
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed italic">* Artisan preparation requires a minimum 24-hour lead time.</p>
                </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500">
                        <CreditCard size={24} />
                    </div>
                    <h2 className="text-2xl font-serif text-brand-900 tracking-tight">Payment Method</h2>
                </div>
                
                <div className="p-6 bg-brand-50 rounded-3xl border border-brand-100 flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-sm">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <div className="font-serif text-xl text-brand-900 mb-1">Pay at Boutique</div>
                        <div className="text-sm text-brand-600 font-light italic">Cash or UPI accepted upon pickup.</div>
                    </div>
                </div>
            </div>
          </div>

          {/* Right: Final Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 h-fit lg:sticky lg:top-32">
                <h2 className="text-3xl font-serif text-brand-900 mb-10 tracking-tight">Final Summary</h2>
                
                <div className="space-y-5 mb-10">
                    <div className="flex justify-between text-gray-500 font-medium">
                        <span className="text-sm">Subtotal</span>
                        <span className="font-serif text-brand-900 font-bold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    {isGold && (
                        <div className="flex justify-between text-brand-600 font-medium bg-brand-50 px-4 py-3 rounded-2xl border border-brand-100 italic">
                            <span className="flex items-center gap-2 text-sm"><Star size={14} fill="currentColor" /> Gold Discount</span>
                            <span className="font-serif font-bold">-₹{membershipDiscount.toFixed(2)}</span>
                        </div>
                    )}

                    {appliedCoupon && (
                        <div className="flex justify-between text-green-600 font-medium bg-green-50 px-4 py-3 rounded-2xl border border-green-100 italic">
                            <span className="flex items-center gap-2 text-sm"><Tag size={14} /> Coupon ({appliedCoupon.couponCode})</span>
                            <span className="font-serif font-bold">-₹{couponDiscount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-gray-500 font-medium">
                        <span className="text-sm">GST (5%)</span>
                        <span className="font-serif text-brand-900 font-bold">₹{gst.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mb-10 pt-10 border-t border-gray-50">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Grand Total</span>
                        <span className="text-5xl font-serif text-brand-900 tracking-tighter">₹{grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-4 justify-end text-brand-500 font-bold text-[10px] uppercase tracking-widest">
                        <Sparkles size={12} /> Earn {Math.floor(grandTotal / 10)} Coins
                    </div>
                </div>

                <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="btn-elegant w-full group py-6 text-base shadow-2xl shadow-brand-500/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
                >
                    {isProcessing ? 'Processing' : 'Confirm Reservation'}
                    {!isProcessing && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl border border-gray-100"
            >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <CheckCircle size={48} strokeWidth={1} />
                </div>
                <h2 className="text-4xl font-serif text-gray-900 mb-4 tracking-tight">Order Placed</h2>
                <p className="text-gray-500 font-light text-lg mb-12 leading-relaxed">
                    Your artisan treats are reserved. You can download your invoice in the order history.
                </p>
                <button 
                    onClick={() => navigate('/orders')}
                    className="btn-elegant w-full py-5 text-base"
                >
                    View Order History
                </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;
