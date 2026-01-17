import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, TrendingUp } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const DessertDetail = () => {
  const [dessert, setDessert] = useState(null);
  const [relatedDesserts, setRelatedDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  // const [isZoomed, setIsZoomed] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchDessertData = async () => {
      setLoading(true);
      try {
        const dessertRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/desserts/${id}`);
        if (!dessertRes.ok) throw new Error('Dessert not found');
        const dessertData = await dessertRes.json();
        setDessert(dessertData);

        const relatedRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/desserts?category=${dessertData.category}&limit=4`);
        const relatedData = await relatedRes.json();
        setRelatedDesserts(relatedData.filter(d => d._id !== id).slice(0, 3));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDessertData();
  }, [id]);

  const handleWishlistClick = () => {
    if (isInWishlist(dessert._id)) {
      removeFromWishlist(dessert._id);
    } else {
      addToWishlist(dessert);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!dessert) return <div className="text-center py-16">Dessert not found.</div>;

  const isWishlisted = isInWishlist(dessert._id);

  return (
    <>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        ) : dessert && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative overflow-hidden rounded-2xl shadow-xl cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}>
                <div className={`transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    className="w-full h-[42rem] object-cover"
                  />
                </div>
                {isZoomed && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <span className="absolute top-4 left-4 bg-primary/80 text-white text-sm font-medium mr-2 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                  {dessert.category}
                </span>
              </div>

              <div className="flex flex-col">
                <h1 className="text-4xl font-bold mb-2">{dessert.name}</h1>

                <div className="text-3xl font-bold text-primary mb-6">
                  ₹{Number(dessert.price).toFixed(2)}
                </div>

                <p className="text-base-content/80 mb-8 text-lg">
                  {dessert.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
                    <div className="bg-base-200 p-6 rounded-xl">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {dessert.ingredients.split(',').map((ingredient, index) => (
                          <li key={index} className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                            {ingredient.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {dessert.allergens && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-xl">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">Allergen Information</h3>
                        <div className="mt-1 text-sm text-amber-700">
                          <p>Contains: {dessert.allergens}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => addToCart(dessert)}
                    className="btn btn-primary flex-1 flex items-center justify-center"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlistClick}
                    className={`btn ${isWishlisted ? 'btn-primary' : 'btn-outline'}`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {relatedDesserts.length > 0 && (
              <div className="mt-24">
                <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedDesserts.map(relatedDessert => {
                    const isRelatedWishlisted = isInWishlist(relatedDessert._id);
                    return (
                      <motion.div
                        key={relatedDessert._id}
                        className="bg-base-100 rounded-xl overflow-hidden shadow-lg group relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -5 }}
                      >
                        <Link to={`/dessert/${relatedDessert._id}`}>
                          <div className="relative h-64 overflow-hidden">
                            <motion.img
                              src={relatedDessert.image}
                              alt={relatedDessert.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {relatedDessert.stock < 5 && (
                              <motion.div
                                className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                              >
                                <div className="flex items-center gap-1">
                                  <span>Limited Stock!</span>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </Link>

                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{relatedDessert.name}</h3>
                            <span className="text-lg font-bold text-primary">₹{Number(relatedDessert.price).toFixed(2)}</span>
                          </div>

                          <p className="text-base-content/70 text-sm line-clamp-2 mb-6">{relatedDessert.description}</p>

                          <div className="flex justify-between items-center">
                            <Link to={`/dessert/${relatedDessert._id}`} className="text-primary font-semibold text-sm group-hover:underline">
                              View Details
                            </Link>

                            <div className="flex items-center gap-2">
                              <motion.button
                                className="btn btn-circle btn-primary btn-sm"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addToCart(relatedDessert)}
                              >
                                <ShoppingCart size={16} />
                              </motion.button>
                              <motion.button
                                className={`btn btn-circle btn-sm ${isRelatedWishlisted ? 'btn-primary' : 'btn-outline'}`}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => isRelatedWishlisted ? removeFromWishlist(relatedDessert._id) : addToWishlist(relatedDessert)}
                              >
                                <Heart size={16} fill={isRelatedWishlisted ? 'currentColor' : 'none'} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DessertDetail;
