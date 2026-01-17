import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DessertCard } from '../components/DessertCard';
import { CartContext } from '../context/CartContext';

const Category = () => {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory === 'All'
          ? 'http://localhost:5000/api/desserts'
          : `http://localhost:5000/api/desserts/category/${selectedCategory}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch desserts');
        }
        const data = await res.json();
        setDesserts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDesserts();
  }, [selectedCategory]);

  const categories = ['All', 'Cake', 'Pastry', 'Cookie'];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Shop Desserts</h1>

      <div className="flex justify-center mb-8">
        <div className="tabs tabs-boxed">
          {categories.map(category => (
            <a
              key={category}
              className={`tab ${selectedCategory === category ? 'tab-active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {loading && <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading && !error && desserts.map((dessert) => (
          <DessertCard
            key={dessert._id}
            dessert={dessert}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
