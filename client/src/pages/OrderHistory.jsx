import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Package, Clock, CheckCircle, XCircle, ChevronRight, Download, X, Calendar, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const OrderHistory = () => {
    const { user } = useContext(AuthContext);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const queryClient = useQueryClient();

    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['my-orders', user?._id],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/api/orders/my-orders', { withCredentials: true });
            return data;
        },
        enabled: !!user
    });

    const reportOrderMutation = useMutation({
        mutationFn: async ({ id, reason }) => {
            const { data } = await axios.patch(`http://localhost:5000/api/orders/${id}/report`, { reportReason: reason }, { withCredentials: true });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['my-orders', user?._id]);
            toast.success('Issue reported successfully. We will contact you soon.');
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to report order");
        }
    });

    const handleReport = (e, orderId) => {
        e.stopPropagation();
        const reason = prompt("Please describe the issue with this order:");
        if (reason && reason.trim()) {
            reportOrderMutation.mutate({ id: orderId, reason: reason.trim() });
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'VERIFIED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'PREPARING': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'READY': return 'bg-green-100 text-green-700 border-green-200';
            case 'COMPLETED': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Order History</h1>
                        <p className="text-gray-500 font-medium">Manage and track your delicious reservations.</p>
                    </div>
                    <Link to="/category" className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Package className="w-5 h-5" />
                        Order More
                    </Link>
                </div>

                {!orders || orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-orange-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-8">You haven't placed any orders yet. Time to treat yourself!</p>
                        <Link to="/category" className="btn btn-primary px-8">Browse Desserts</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, idx) => (
                            <motion.div 
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</span>
                                                <span className="text-sm font-mono font-bold text-gray-800">{order._id.slice(-8).toUpperCase()}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusStyles(order.status)}`}>
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {order.items.slice(0, 2).map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                                <img 
                                                    src={item.dessert?.thumbnail || item.dessert?.image} 
                                                    alt={item.dessert?.name} 
                                                    className="w-16 h-16 rounded-xl object-cover bg-white p-1 border border-gray-100"
                                                />
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-900">{item.dessert?.name}</h4>
                                                    <p className="text-xs text-gray-500 font-medium">{item.variant.name} • Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-black text-gray-900">₹{item.subtotal.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-xs text-gray-400 font-bold ml-4">+ {order.items.length - 2} more items</p>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-100">
                                        <div className="flex gap-8">
                                            <div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</div>
                                                <div className="text-xl font-black text-gray-900">₹{order.grandTotal.toFixed(2)}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pickup Date</div>
                                                <div className="text-sm font-bold text-gray-800">{new Date(order.pickupDate).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-3">
                                            {!order.isReported ? (
                                                <button 
                                                    onClick={(e) => handleReport(e, order._id)}
                                                    className="flex items-center gap-2 bg-white border border-red-200 text-red-500 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 transition-all"
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    Report Issue
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2.5 rounded-xl font-bold text-xs border border-red-100">
                                                    Issue Reported
                                                </div>
                                            )}
                                            {order.invoicePath && (
                                                <a 
                                                    href={`http://localhost:5000${order.invoicePath}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Invoice
                                                </a>
                                            )}
                                            <button 
                                                onClick={() => setSelectedOrder(order)}
                                                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                                            >
                                                Details
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Details Modal */}
                <AnimatePresence>
                    {selectedOrder && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                className="bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
                            >
                                <button onClick={() => setSelectedOrder(null)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>

                                <div className="p-10">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-black text-gray-900 mb-2">Order Details</h2>
                                        <p className="text-gray-500 font-medium">Order ID: {selectedOrder._id.toUpperCase()}</p>
                                    </div>

                                    <div className="space-y-6 mb-10">
                                        {selectedOrder.items.map((item, i) => (
                                            <div key={i} className="bg-gray-50 p-6 rounded-3xl">
                                                <div className="flex gap-6">
                                                    <img src={item.dessert?.thumbnail || item.dessert?.image} className="w-20 h-20 rounded-2xl object-cover bg-white p-1" />
                                                    <div className="flex-grow">
                                                        <h4 className="text-xl font-bold text-gray-900">{item.dessert?.name}</h4>
                                                        <div className="flex gap-2 mt-1">
                                                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px] font-black uppercase tracking-wider">{item.variant.name}</span>
                                                            {item.modifiers.map(m => (
                                                                <span key={m.name} className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-black uppercase tracking-wider">{m.name}</span>
                                                            ))}
                                                        </div>
                                                        {item.customText && (
                                                            <div className="mt-3 p-3 bg-white rounded-xl border border-orange-100 text-xs font-bold text-orange-600 italic">
                                                                "{item.customText}"
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-bold text-gray-400">Qty: {item.quantity}</div>
                                                        <div className="text-lg font-black text-gray-900">₹{item.subtotal.toFixed(2)}</div>
                                                    </div>
                                                </div>
                                                {item.specialInstructions && (
                                                    <div className="mt-4 text-xs font-medium text-gray-500 bg-white/50 p-3 rounded-xl">
                                                        <span className="font-black uppercase text-[10px] block mb-1">Your Note:</span>
                                                        {item.specialInstructions}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gray-900 text-white p-8 rounded-[32px]">
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between text-gray-400 text-sm font-bold">
                                                <span>Subtotal</span>
                                                <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
                                            </div>
                                            {selectedOrder.discountApplied > 0 && (
                                                <div className="flex justify-between text-orange-400 text-sm font-bold">
                                                    <span>Discounts</span>
                                                    <span>-₹{selectedOrder.discountApplied.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-gray-400 text-sm font-bold">
                                                <span>Tax (GST 5%)</span>
                                                <span>₹{selectedOrder.gstAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-500">Grand Total</span>
                                            <span className="text-4xl font-black">₹{selectedOrder.grandTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OrderHistory;
