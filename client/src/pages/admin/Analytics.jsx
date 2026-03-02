import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['all-orders'],
    queryFn: async () => {
      const { data } = await axios.get('/orders/all');
      return data;
    },
    refetchInterval: 30000 
  });

  if (isLoading) return <div className="p-10 text-center bg-white min-h-screen">Loading Intelligence...</div>;

  const stats = {
    totalRevenue: orders?.reduce((sum, o) => sum + o.grandTotal, 0) || 0,
    totalOrders: orders?.length || 0,
    averageOrder: orders?.length ? (orders.reduce((sum, o) => sum + o.grandTotal, 0) / orders.length).toFixed(2) : 0,
  };

  const chartData = orders?.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing.revenue += order.grandTotal;
      existing.orders += 1;
    } else {
      acc.push({ date, revenue: order.grandTotal, orders: 1 });
    }
    return acc;
  }, []).slice(-7);

  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen font-sans text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
        <div>
            <h1 className="text-4xl font-serif text-brand-900 mb-2 tracking-tight">Business Intelligence</h1>
            <p className="text-gray-500 font-medium text-sm">Revenue trends, order volume, and growth analytics.</p>
        </div>
        <Link to="/admin/dashboard" className="btn-elegant-outline px-8 border-gray-200">
            <ArrowLeft size={16} /> Back to Hub
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={<DollarSign className="text-brand-500" />} />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingBag className="text-brand-500" />} />
        <StatCard title="Average Order" value={`₹${stats.averageOrder}`} icon={<TrendingUp className="text-brand-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-serif text-gray-900 mb-10 tracking-tight">Revenue Trajectory</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97757" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#D97757" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A3A3A3', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A3A3A3', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D97757" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-serif text-gray-900 mb-10 tracking-tight">Order Volume</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A3A3A3', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A3A3A3', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#FAFAFA' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="orders" fill="#4A2A20" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
    <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</div>
      <div className="text-2xl font-serif text-gray-900">{value}</div>
    </div>
  </div>
);

export default AdminAnalytics;
