import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DessertCard } from '../components/DessertCard';
import useCartStore from '../context/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Category = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (urlCategory) {
        setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory === 'All'
          ? '/desserts'
          : `/desserts?category=${selectedCategory}`;

        const { data } = await axios.get(url);
        setDesserts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDesserts();
  }, [selectedCategory]);

  const handleQuickAdd = (dessert) => {
    const baseVariant = dessert.variants?.[0] || { name: 'Standard', price: dessert.basePrice || dessert.price };
    addItem(dessert, baseVariant, [], 1, '', '');
    toast.success(`${dessert.name} added to basket!`);
  };

  const categories = ['All', 'Cake', 'Pastry', 'Cookie'];

  return (
    <div className="bg-gray-50 min-h-screen py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block">The Collection</span>
            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 tracking-tight">Our Masterpieces</h1>
            <p className="text-gray-500 text-lg leading-relaxed font-light max-w-2xl mx-auto">
                Explore our collection of handcrafted desserts, made with the finest ingredients and delivered fresh to your door.
            </p>
        </div>

        <div className="flex justify-center mb-16">
            <div className="flex bg-white p-2 rounded-full shadow-sm border border-gray-100 overflow-x-auto">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                            selectedCategory === category 
                            ? 'bg-gray-900 text-white shadow-md' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        {category}s
                    </button>
                ))}
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-32">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : error ? (
            <div className="text-center py-32 text-red-500 font-bold">Error: {error}</div>
        ) : (
            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            >
                <AnimatePresence>
                    {desserts.map((dessert) => (
                        <DessertCard
                            key={dessert._id}
                            dessert={dessert}
                            onAddToCart={handleQuickAdd}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default Category;
