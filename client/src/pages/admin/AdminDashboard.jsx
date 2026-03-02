import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Users, Cake, ShoppingBag, DollarSign, TrendingUp, ArrowRight, Clock, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-summary'],
    queryFn: async () => {
      const [users, desserts, orders, messages] = await Promise.all([
        axios.get('/auth/all'),
        axios.get('/desserts'),
        axios.get('/orders/all'),
        axios.get('/messages/all')
      ]);
      
      return {
        users: users.data.filter(u => !u.isAdmin).length,
        desserts: desserts.data.length,
        orders: orders.data.length,
        revenue: orders.data.reduce((sum, o) => sum + o.grandTotal, 0),
        recentOrders: orders.data.slice(0, 5),
        unreadMessages: messages.data.filter(m => m.status === 'NEW').length
      };
    },
    refetchInterval: 60000
  });

  if (isLoading) return <div className="p-10 text-center bg-white min-h-screen flex items-center justify-center font-serif text-2xl animate-pulse text-brand-900">Sugaré Hub</div>;

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen font-sans text-gray-900">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
            <h1 className="text-5xl font-serif text-brand-900 mb-2 tracking-tight">The Artisan Hub</h1>
            <p className="text-gray-500 font-medium text-sm">Welcome to your boutique dashboard. Here's your business pulse.</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-brand-50 border border-brand-100 px-6 py-3 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-600">Live Backend Status</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatBox icon={<Users className="text-brand-500" />} title="Members" value={stats.users} />
        <StatBox icon={<Cake className="text-brand-500" />} title="Masterpieces" value={stats.desserts} />
        <StatBox icon={<ShoppingBag className="text-brand-500" />} title="Reservations" value={stats.orders} />
        <StatBox icon={<DollarSign className="text-brand-500" />} title="Revenue" value={`₹${stats.revenue.toLocaleString()}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Quick Links */}
        <div className="lg:col-span-4 space-y-4">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-2">Command Center</h2>
            <QuickLink to="/admin/desserts" title="Catalog Master" desc="Refine your sweet collection" icon={<Cake />} />
            <QuickLink to="/admin/orders" title="Kitchen Prep" desc="View live artisan instructions" icon={<ShoppingBag />} />
            <QuickLink to="/admin/users" title="Customer CRM" desc="Manage loyalty & memberships" icon={<Users />} />
            <QuickLink to="/admin/coupons" title="Rewards Hub" desc="Configure exclusive codes" icon={<Star />} />
            
            {stats.unreadMessages > 0 && (
                <div className="p-6 bg-brand-900 text-white rounded-[2rem] flex items-center justify-between shadow-xl shadow-brand-900/20 group cursor-pointer hover:bg-black transition-all">
                    <div className="flex items-center gap-4">
                        <MessageSquare size={20} className="text-brand-400" />
                        <div>
                            <div className="font-bold text-sm">{stats.unreadMessages} New Messages</div>
                            <div className="text-[10px] opacity-60 uppercase tracking-widest">Inquiry concierge</div>
                        </div>
                    </div>
                    <ArrowRight size={16} />
                </div>
            )}
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm h-full">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-serif text-brand-900 tracking-tight">Recent Reservations</h2>
                    <Link to="/admin/orders" className="text-brand-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-brand-800 transition-colors group">
                        Live Monitor <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {stats.recentOrders.length > 0 ? stats.recentOrders.map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl hover:bg-gray-50 hover:shadow-inner transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-gray-300 text-xs shadow-sm group-hover:scale-110 transition-transform">
                                    #{order._id.slice(-4).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-base">{order.user?.fullname || 'Guest'}</div>
                                    <div className="text-[10px] text-gray-400 flex items-center gap-1.5 font-bold uppercase tracking-widest mt-1">
                                        <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-serif text-xl text-brand-900 font-bold mb-1">₹{order.grandTotal.toFixed(2)}</div>
                                <div className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                                    order.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-brand-50 text-brand-600 border-brand-100'
                                }`}>
                                    {order.status}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 text-gray-400 font-light italic">No activity recorded today.</div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon, title, value }) => (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center">
            {React.cloneElement(icon, { size: 28, strokeWidth: 1.5 })}
        </div>
        <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</div>
            <div className="text-3xl font-serif text-brand-900 tracking-tight">{value}</div>
        </div>
    </motion.div>
);

const QuickLink = ({ to, title, desc, icon }) => (
    <Link to={to} className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-gray-100 hover:border-brand-200 hover:shadow-xl transition-all duration-500 group">
        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors duration-500">
            {React.cloneElement(icon, { size: 20, strokeWidth: 1.5 })}
        </div>
        <div>
            <div className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{title}</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{desc}</div>
        </div>
    </Link>
);

export default AdminDashboard;
