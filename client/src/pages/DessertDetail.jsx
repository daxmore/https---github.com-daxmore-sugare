import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Info, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { WishlistContext } from '../context/WishlistContext';
import CakeCustomizer from '../components/CakeCustomizer';

const DessertDetail = () => {
  const [dessert, setDessert] = useState(null);
  const [relatedDesserts, setRelatedDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchDessertData = async () => {
      setLoading(true);
      try {
        const dessertRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/desserts/${id}`);
        if (!dessertRes.ok) throw new Error('Dessert not found');
        const dessertData = await dessertRes.json();
        setDessert(dessertData);

        const relatedRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/desserts?category=${dessertData.category}`);
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

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-50"><span className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></span></div>;
  if (error) return <div className="text-center py-32 text-red-500 font-bold bg-gray-50 min-h-screen">Error: {error}</div>;
  if (!dessert) return <div className="text-center py-32 bg-gray-50 min-h-screen">Dessert not found.</div>;

  const isWishlisted = isInWishlist(dessert._id);

  const getFullImageSrc = (img) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `http://localhost:5000${img}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/category" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-10 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Image Gallery & Info */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white aspect-[4/3]"
            >
              <img
                src={getFullImageSrc(dessert.image)}
                alt={dessert.name}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => isWishlisted ? removeFromWishlist(dessert._id) : addToWishlist(dessert)}
                className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 ${isWishlisted ? 'bg-orange-500 text-white' : 'bg-white/80 text-gray-900 hover:bg-white'}`}
              >
                <Heart className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <Clock className="w-6 h-6 text-orange-400 mb-3" strokeWidth={1.5} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prep Time</span>
                <span className="font-bold text-gray-900 mt-1">24-48h</span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <ShieldCheck className="w-6 h-6 text-orange-400 mb-3" strokeWidth={1.5} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quality</span>
                <span className="font-bold text-gray-900 mt-1">Premium</span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <Info className="w-6 h-6 text-orange-400 mb-3" strokeWidth={1.5} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Serves</span>
                <span className="font-bold text-gray-900 mt-1">{dessert.servingSize}</span>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900 mb-6">Ingredients & Notes</h3>
              <p className="text-gray-500 leading-relaxed font-light mb-8 text-lg">{dessert.ingredients}</p>
              <div className="flex items-start gap-4 p-5 bg-orange-50/50 rounded-2xl border border-orange-100/50 text-orange-900">
                <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <div className="text-sm">
                  <span className="font-bold uppercase tracking-wide text-xs text-orange-600 block mb-1">Allergy Alert</span>
                  <span className="font-medium text-gray-600">{dessert.allergens}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Customizer & Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="mb-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                {dessert.category}
              </div>
              <h1 className="text-5xl font-serif text-gray-900 mb-6 leading-tight tracking-tight">{dessert.name}</h1>
              <p className="text-lg text-gray-500 leading-relaxed font-light">{dessert.description}</p>
            </div>

            <CakeCustomizer dessert={dessert} />
            
            <p className="mt-8 text-center text-gray-400 text-xs font-medium uppercase tracking-wider">
              * Verification required by bakery staff
            </p>
          </div>
        </div>

        {/* Related Section */}
        {relatedDesserts.length > 0 && (
          <div className="mt-40 border-t border-gray-200 pt-20">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-4xl font-serif text-gray-900 tracking-tight">More from this Collection</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedDesserts.map(related => {
                const fullImageSrc = getFullImageSrc(related.thumbnail || related.image);
                return (
                  <Link key={related._id} to={`/dessert/${related._id}`} className="group">
                    <div className="boutique-card overflow-hidden bg-white">
                      <div className="relative h-[250px] overflow-hidden bg-gray-50">
                        <img src={fullImageSrc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={related.name} />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-gray-900 text-xs shadow-sm">
                          ₹{(related.basePrice || related.price || 0).toFixed(2)}
                        </div>
                      </div>
                      <div className="p-8 text-center">
                        <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:text-orange-500 transition-colors tracking-tight">{related.name}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-light">{related.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DessertDetail;
