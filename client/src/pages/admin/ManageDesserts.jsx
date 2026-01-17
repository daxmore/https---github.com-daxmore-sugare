import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const ManageDesserts = () => {
  const [desserts, setDesserts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDessert, setCurrentDessert] = useState(null);
  const [newDessert, setNewDessert] = useState({ name: '', category: '', price: '', description: '', image: '', ingredients: '', allergens: '', servingSize: '', stock: '' });

  const fetchDesserts = async () => {
    const res = await fetch('http://localhost:5000/api/desserts');
    const data = await res.json();
    setDesserts(data);
  };

  useEffect(() => {
    fetchDesserts();
  }, []);

  const handleAddModal = () => setShowAddModal(!showAddModal);
  const handleEditModal = (dessert) => {
    setCurrentDessert(dessert);
    setShowEditModal(!showEditModal);
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this dessert?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/desserts/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete dessert');
      }
      
      alert('Dessert deleted successfully');
      await fetchDesserts();
    } catch (error) {
      alert('Failed to delete dessert. Please try again.');
      console.error('Delete error:', error);
    }
  };

  const handleAddDessert = async (e) => {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields = ['name', 'category', 'price', 'description', 'image', 'ingredients', 'allergens', 'servingSize', 'stock'];
    const missingFields = requiredFields.filter(field => !newDessert[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Format the data properly
    const formattedDessert = {
      ...newDessert,
      price: Number(newDessert.price),
      stock: Number(newDessert.stock),
      category: newDessert.category.charAt(0).toUpperCase() + newDessert.category.slice(1) // Ensure proper case for category
    };

    // Validate category
    if (!['Cake', 'Pastry', 'Cookie'].includes(formattedDessert.category)) {
      alert('Category must be one of: Cake, Pastry, Cookie');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/desserts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedDessert),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add dessert');
      }

      setNewDessert({ name: '', category: '', price: '', description: '', image: '', ingredients: '', allergens: '', servingSize: '', stock: '' });
      setShowAddModal(false);
      fetchDesserts();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateDessert = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/desserts/${currentDessert._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentDessert),
    });
    setShowEditModal(false);
    fetchDesserts();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Desserts</h1>
      <button className="btn btn-primary mb-4" onClick={handleAddModal}>
        <PlusIcon className="w-6 h-6 mr-2" />
        Add Dessert
      </button>
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Ingredients</th>
              <th>Allergens</th>
              <th>Serving Size</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {desserts.map((dessert) => (
              <tr key={dessert._id}>
                <td>{dessert.name}</td>
                <td>{dessert.category}</td>
                <td>₹{dessert.price}</td>
                <td>{dessert.ingredients}</td>
                <td>{dessert.allergens}</td>
                <td>{dessert.servingSize}</td>
                <td>{dessert.stock}</td>
                <td className="flex">
                  <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditModal(dessert)}>
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(dessert._id)}>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Dessert Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4">Add New Dessert</h3>
            <form onSubmit={handleAddDessert}>
              <div className="form-control">
                <label className="label mb-6 mr-4">Name</label>
                <input type="text" className="input input-bordered" value={newDessert.name} onChange={(e) => setNewDessert({ ...newDessert, name: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4">Category</label>
                <input type="text" className="input input-bordered" value={newDessert.category} onChange={(e) => setNewDessert({ ...newDessert, category: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4">Price</label>
                <input type="number" className="input input-bordered" value={newDessert.price} onChange={(e) => setNewDessert({ ...newDessert, price: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4">Description</label>
                <textarea className="textarea textarea-bordered" value={newDessert.description} onChange={(e) => setNewDessert({ ...newDessert, description: e.target.value })}></textarea>
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4 mt-4">Image URL</label>
                <input type="text" className="input input-bordered" value={newDessert.image} onChange={(e) => setNewDessert({ ...newDessert, image: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4">Ingredients</label>
                <textarea className="textarea textarea-bordered" value={newDessert.ingredients} onChange={(e) => setNewDessert({ ...newDessert, ingredients: e.target.value })}></textarea>
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4 mt-4">Allergens</label>
                <input type="text" className="input input-bordered" value={newDessert.allergens} onChange={(e) => setNewDessert({ ...newDessert, allergens: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4">Serving Size</label>
                <input type="text" className="input input-bordered" value={newDessert.servingSize} onChange={(e) => setNewDessert({ ...newDessert, servingSize: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label mb-2 mr-4">Stock</label>
                <input type="number" className="input input-bordered" value={newDessert.stock} onChange={(e) => setNewDessert({ ...newDessert, stock: e.target.value })} />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn" onClick={handleAddModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dessert Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-6 mr-4">Edit Dessert</h3>
            <form onSubmit={handleUpdateDessert}>
              <div className="form-control">
                <label className="label mb-6 mr-4 ">Name</label>
                <input type="text" className="input input-bordered" value={currentDessert.name} onChange={(e) => setCurrentDessert({ ...currentDessert, name: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label mb-6 mr-4">Category</label>
                <input type="text" className="input input-bordered" value={currentDessert.category} onChange={(e) => setCurrentDessert({ ...currentDessert, category: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label  mb-6 mr-4">Price</label>
                <input type="number" className="input input-bordered" value={currentDessert.price} onChange={(e) => setCurrentDessert({ ...currentDessert, price: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label  mb-6 mr-4">Description</label>
                <textarea className="textarea textarea-bordered" value={currentDessert.description} onChange={(e) => setCurrentDessert({ ...currentDessert, description: e.target.value })}></textarea>
              </div>
              <div className="form-control">
                <label className="label  mb-6 mr-4 mt-4">Image URL</label>
                <input type="text" className="input input-bordered" value={currentDessert.image} onChange={(e) => setCurrentDessert({ ...currentDessert, image: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label  mb-6 mr-4">Ingredients</label>
                <textarea className="textarea textarea-bordered" value={currentDessert.ingredients} onChange={(e) => setCurrentDessert({ ...currentDessert, ingredients: e.target.value })}></textarea>
              </div>
              <div className="form-control">
                <label className="label  mb-6 mr-4 mt-4">Allergens</label>
                <input type="text" className="input input-bordered" value={currentDessert.allergens} onChange={(e) => setCurrentDessert({ ...currentDessert, allergens: e.target.value })} />
              </div> 
              <div className="form-control">
                <label className="label  mb-6 mr-4">Serving Size</label>
                <input type="text" className="input input-bordered" value={currentDessert.servingSize} onChange={(e) => setCurrentDessert({ ...currentDessert, servingSize: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label  mb-2 mr-4">Stock</label>
                <input type="number" className="input input-bordered" value={currentDessert.stock} onChange={(e) => setCurrentDessert({ ...currentDessert, stock: e.target.value })} />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDesserts;