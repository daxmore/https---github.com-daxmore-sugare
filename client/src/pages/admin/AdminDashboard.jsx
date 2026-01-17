import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserGroupIcon, CakeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDesserts, setTotalDesserts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:5000/api/auth');
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.length);

        const dessertsResponse = await fetch('http://localhost:5000/api/desserts');
        const dessertsData = await dessertsResponse.json();
        setTotalDesserts(dessertsData.length);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <UserGroupIcon className="w-12 h-12 text-blue-500 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-3xl">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <CakeIcon className="w-12 h-12 text-pink-500 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Total Desserts</h2>
            <p className="text-3xl">{totalDesserts}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <ShoppingCartIcon className="w-12 h-12 text-green-500 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Total Orders</h2>
            <p className="text-3xl">5,678</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/desserts" className="bg-white p-4 rounded-lg shadow hover:bg-gray-100">
            <h3 className="text-xl font-bold">Manage Desserts</h3>
            <p>Add, edit, or delete desserts.</p>
          </Link>
          <Link to="/admin/users" className="bg-white p-4 rounded-lg shadow hover:bg-gray-100">
            <h3 className="text-xl font-bold">Manage Users</h3>
            <p>View and manage user accounts.</p>
          </Link>
          <Link to="/admin/analytics" className="bg-white p-4 rounded-lg shadow hover:bg-gray-100">
            <h3 className="text-xl font-bold">Analytics</h3>
            <p>View website analytics.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;