import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, CheckCircle, Package, AlertCircle, FileText, User, Calendar, Flag, MessageSquare, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ManageOrders = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('ALL');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data } = await axios.get('/orders/all');
      return data;
    },
    refetchInterval: 30000 
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axios.patch(`/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
      toast.success('Kitchen status synced');
    },
    onError: (err) => {
        toast.error("Failed to update kitchen flow");
    }
  });

  const filteredOrders = orders?.filter(o => filter === 'ALL' || o.status === filter);

  if (isLoading) return <div className="flex justify-center items-center min-h-screen bg-white"><div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;

  const statusColors = {
    'PENDING': 'bg-amber-50 text-amber-600 border-amber-100',
    'VERIFIED': 'bg-blue-50 text-blue-600 border-blue-100',
    'PREPARING': 'bg-indigo-50 text-indigo-600 border-indigo-100',
    'READY': 'bg-green-50 text-green-600 border-green-100',
    'COMPLETED': 'bg-gray-50 text-gray-400 border-gray-100',
    'CANCELLED': 'bg-red-50 text-red-400 border-red-100'
  };

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen font-sans text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
        <div>
            <h1 className="text-4xl font-serif text-brand-900 mb-2 tracking-tight">Kitchen Monitor</h1>
            <p className="text-gray-500 font-medium text-sm">Manage live artisan preparations and order flow.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            {['ALL', 'PENDING', 'VERIFIED', 'PREPARING', 'READY'].map(s => (
                <button 
                    key={s} 
                    onClick={() => setFilter(s)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === s ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    {s}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-8">
        {filteredOrders?.length > 0 ? filteredOrders.map((order) => (
          <motion.div 
            layout
            key={order._id}
            className={`bg-white rounded-[2.5rem] border ${order.isReported ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-500`}
          >
            <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12">
                {/* Left: Customer & Status */}
                <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-50 pb-10 lg:pb-0 lg:pr-12">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-brand-500" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">{order.user?.fullname}</div>
                                <div className="text-xs text-gray-400 font-medium tracking-wide">@{order.user?.username}</div>
                            </div>
                        </div>
                    </div>

                    {order.isReported && (
                        <div className="mb-8 p-5 bg-red-50 rounded-3xl border border-red-100 animate-pulse">
                            <div className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest mb-2">
                                <AlertCircle size={14} /> Reported by Customer
                            </div>
                            <p className="text-sm text-red-700 font-medium leading-relaxed italic">"{order.reportReason}"</p>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Flow Status</span>
                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${statusColors[order.status]}`}>
                                {order.status}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400 font-medium">Pickup Date</span>
                            <span className="text-gray-900 font-bold">{new Date(order.pickupDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400 font-medium">Total Value</span>
                            <span className="text-brand-600 font-serif text-2xl font-bold">₹{order.grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                        <div className="mt-10 pt-10 border-t border-gray-50">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5">Advance Stage</div>
                            <div className="grid grid-cols-2 gap-3">
                                <StageBtn active={order.status === 'VERIFIED'} disabled={order.status === 'PREPARING' || order.status === 'READY'} onClick={() => updateStatusMutation.mutate({ id: order._id, status: 'VERIFIED' })} label="Verify" />
                                <StageBtn active={order.status === 'PREPARING'} disabled={order.status === 'READY'} onClick={() => updateStatusMutation.mutate({ id: order._id, status: 'PREPARING' })} label="Bake" />
                                <StageBtn active={order.status === 'READY'} onClick={() => updateStatusMutation.mutate({ id: order._id, status: 'READY' })} label="Ready" />
                                <button onClick={() => updateStatusMutation.mutate({ id: order._id, status: 'COMPLETED' })} className="py-3 bg-gray-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all">Complete</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Baking Specifications */}
                <div className="lg:flex-grow">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                        <Package size={14} className="text-brand-500" /> Composition Specifications
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {order.items.map((item, i) => (
                            <div key={i} className="p-8 bg-[#FAFAFA] rounded-[2rem] relative overflow-hidden group border border-transparent hover:border-brand-100 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                    <FileText size={80} strokeWidth={1} />
                                </div>
                                <div className="font-serif text-2xl text-gray-900 mb-3 tracking-tight">{item.dessert?.name}</div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest">{item.variant.name}</span>
                                    {item.modifiers.map(m => (
                                        <span key={m.name} className="px-3 py-1 bg-brand-50 text-brand-600 border border-brand-100 rounded-full text-[9px] font-black uppercase tracking-widest">{m.name}</span>
                                    ))}
                                </div>
                                
                                {item.customText && (
                                    <div className="mt-6 p-5 bg-white rounded-2xl border border-brand-100 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2 opacity-10"><Sparkles size={16} /></div>
                                        <div className="text-[9px] font-black text-brand-400 uppercase tracking-[0.2em] mb-2">Artisan Text</div>
                                        <div className="text-xl font-serif text-brand-600 italic leading-relaxed">"{item.customText}"</div>
                                    </div>
                                )}

                                {item.specialInstructions && (
                                    <div className="mt-6 text-sm font-light text-gray-500 flex gap-3 italic">
                                        <MessageSquare size={16} className="flex-shrink-0 text-brand-200" />
                                        <p>{item.specialInstructions}</p>
                                    </div>
                                )}

                                <div className="mt-8 pt-6 border-t border-gray-200/50 flex justify-between items-end">
                                    <div>
                                        <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Qty</div>
                                        <div className="font-black text-gray-900 text-lg">× {item.quantity}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Subtotal</div>
                                        <div className="text-xl font-serif text-brand-900 font-bold">₹{item.subtotal.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </motion.div>
        )) : (
            <div className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                    <Clock size={40} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-2">No active orders</h3>
                <p className="text-gray-500 font-light italic">When customers reserve treats, they'll appear here for monitor.</p>
            </div>
        )}
      </div>
    </div>
  );
};

const StageBtn = ({ active, disabled, onClick, label }) => (
    <button 
        disabled={disabled || active}
        onClick={onClick} 
        className={`py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
            active ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20' : 
            disabled ? 'bg-gray-50 text-gray-300 border-gray-100 opacity-50' : 
            'bg-white text-gray-600 border-gray-100 hover:border-brand-200 hover:bg-brand-50'
        }`}
    >
        {label}
    </button>
);

export default ManageOrders;
