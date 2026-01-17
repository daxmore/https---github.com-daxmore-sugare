import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HomeIcon, UserGroupIcon, CakeIcon, ArrowLeftOnRectangleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const AdminSidenav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 h-full bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <HomeIcon className="w-6 h-6 mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/analytics" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <ChartBarIcon className="w-6 h-6 mr-2" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/desserts" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <CakeIcon className="w-6 h-6 mr-2" />
              Manage Desserts
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-2" />
              Manage Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <UserGroupIcon className="w-6 h-6 mr-2" />
              Manage Users
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center p-4 text-gray-600 hover:bg-gray-100 w-full text-left">
              <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidenav;
