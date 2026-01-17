import React, { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import EditUserModal from '../../components/EditUserModal';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/auth');
    const data = await res.json();
    const regularUsers = data.filter(user => !user.isAdmin);
    setUsers(regularUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/auth/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
  };

  const handleSave = async (id, updatedData) => {
    await fetch(`http://localhost:5000/api/auth/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    fetchUsers();
    handleCloseModal();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-info" onClick={() => handleEdit(user)}>
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(user._id)}>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ManageUsers;