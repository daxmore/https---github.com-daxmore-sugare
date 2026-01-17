import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import LoadingSpinner from '../../components/LoadingSpinner';

const COLORS = ['#8d639e', '#a97cbbff'];

const Analytics = () => {
  const [topDessertsData, setTopDessertsData] = useState([]);
  const [userRegistrationsData, setUserRegistrationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dessertsResponse = await fetch('http://localhost:5000/api/desserts');
        const dessertsData = await dessertsResponse.json();
        const topDesserts = dessertsData.slice(0, 5).map(dessert => ({ ...dessert, sales: Math.floor(Math.random() * 100) }));
        setTopDessertsData(topDesserts);

        const usersResponse = await fetch('http://localhost:5000/api/auth');
        const usersData = await usersResponse.json();
        const regularUsers = usersData.filter(user => !user.isAdmin);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const newRegistrations = regularUsers.filter(user => new Date(user.createdAt) > sevenDaysAgo).length;
        const oldUsers = regularUsers.length - newRegistrations;

        setUserRegistrationsData([
          { name: 'New Registrations', value: newRegistrations },
          { name: 'Users', value: oldUsers },
        ]);

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
      <h1 className="text-3xl font-bold mb-4">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">Top Selling Desserts</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topDessertsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">User Registrations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRegistrationsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {userRegistrationsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
