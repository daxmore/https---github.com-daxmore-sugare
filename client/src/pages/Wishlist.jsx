import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import useCartStore from '../context/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { wishlistItems, removeFromWishlist, loading } = useContext(WishlistContext);
  const addItem = useCartStore((state) => state.addItem);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[#FAFAFA] pt-24">
        <div className="w-32 h-32 bg-brand-50 rounded-full flex items-center justify-center mb-10 text-brand-500">
            <Lock size={48} strokeWidth={1} />
        </div>
        <h2 className="text-4xl font-serif text-brand-900 mb-4 tracking-tight">Your wishlist is private</h2>
        <p className="text-gray-500 mb-10 max-w-sm font-light text-lg italic leading-relaxed">Please sign in to your account to view your personalized collection of sweet favorites.</p>
        <Link to="/login" className="btn-elegant px-12 py-5 text-base">Sign In Now</Link>
      </div>
    );
  }

  const handleAddToCart = (dessert) => {
    const baseVariant = dessert.variants?.[0] || { name: 'Standard', price: dessert.basePrice || dessert.price };
    addItem(dessert, baseVariant, [], 1, '', '');
    toast.success(`${dessert.name} added to basket!`);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAFAFA]">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 font-sans text-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
                <h1 className="text-5xl font-serif text-brand-900 tracking-tight mb-2">My Wishlist</h1>
                <p className="text-brand-500 font-light italic text-lg">Your curated selection of artisan desserts.</p>
            </div>
            <Link to="/category" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-600 transition-colors border-b border-gray-200 pb-1">Continue Shopping</Link>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            <AnimatePresence>
                {wishlistItems.map((dessert) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={dessert._id} 
                        className="boutique-card overflow-hidden bg-white"
                    >
                        <div className="relative h-72 overflow-hidden bg-brand-50">
                            <img
                                src={dessert.image}
                                alt={dessert.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <button
                                onClick={(e) => { e.preventDefault(); removeFromWishlist(dessert._id); }}
                                className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-400 shadow-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="absolute top-5 left-5 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-brand-900 text-[10px] shadow-sm">
                                ₹{(dessert.basePrice || dessert.price || 0).toFixed(2)}
                            </div>
                        </div>

                        <div className="p-8 text-center">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{dessert.category}</span>
                            <h3 className="text-xl font-serif text-brand-900 mb-6 tracking-tight line-clamp-1 group-hover:text-brand-600 transition-colors">{dessert.name}</h3>
                            
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => handleAddToCart(dessert)}
                                    className="btn-elegant w-full py-3"
                                >
                                    <ShoppingBag size={14} /> Add to Basket
                                </button>
                                <Link to={`/dessert/${dessert._id}`} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 transition-all flex items-center justify-center gap-2">
                                    View Details <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 text-gray-200">
                <Heart size={40} strokeWidth={1} />
            </div>
            <h3 className="text-3xl font-serif text-brand-900 mb-4 tracking-tight">Your collection is empty</h3>
            <p className="text-gray-500 mb-12 max-w-sm mx-auto font-light text-lg italic leading-relaxed text-balance">Save your most-loved masterpieces here to revisit them whenever you crave something sweet.</p>
            <Link to="/category" className="btn-elegant inline-flex px-12">
              Browse the Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
