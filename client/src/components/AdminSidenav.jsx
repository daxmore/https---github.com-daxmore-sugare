import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, Users, Cake, LogOut, TrendingUp, ShoppingBag, Tag } from 'lucide-react';

const AdminSidenav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = ({isActive}) => `flex items-center gap-3 px-6 py-4 font-bold transition-all ${isActive ? 'bg-gray-900 text-white shadow-xl rounded-2xl mx-4' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-2xl mx-4'}`;

  return (
    <div className="w-72 h-full bg-white border-r border-gray-100 flex flex-col pt-8">
      <div className="px-10 mb-10">
        <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Sugaré</h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Boutique Admin</p>
      </div>
      <nav className="flex-grow space-y-2">
        <NavLink to="/admin/dashboard" className={navLinkStyle}>
          <Home className="w-5 h-5" /> Dashboard
        </NavLink>
        <NavLink to="/admin/analytics" className={navLinkStyle}>
          <TrendingUp className="w-5 h-5" /> Analytics
        </NavLink>
        <NavLink to="/admin/desserts" className={navLinkStyle}>
          <Cake className="w-5 h-5" /> Catalog
        </NavLink>
        <NavLink to="/admin/orders" className={navLinkStyle}>
          <ShoppingBag className="w-5 h-5" /> Orders
        </NavLink>
        <NavLink to="/admin/users" className={navLinkStyle}>
          <Users className="w-5 h-5" /> Customers
        </NavLink>
        <NavLink to="/admin/coupons" className={navLinkStyle}>
          <Tag className="w-5 h-5" /> Coupons
        </NavLink>
      </nav>
      <div className="p-4 mb-4">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-6 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-colors">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidenav;
