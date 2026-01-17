import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidenav from '../components/AdminSidenav';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidenav />
      <main className="flex-grow p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
