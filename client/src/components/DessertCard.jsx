import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { WishlistContext } from '../context/WishlistContext';

export const DessertCard = ({ dessert, onAddToCart }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
    const isWishlisted = isInWishlist(dessert._id);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        if (isWishlisted) {
            removeFromWishlist(dessert._id);
        } else {
            addToWishlist(dessert);
        }
    };

    const getFullImageSrc = (img) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `http://localhost:5000${img}`;
    };

    return (
        <motion.div 
            layout
            className="bg-white rounded-[32px] overflow-hidden shadow-sm group relative border border-gray-100 hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
        >
            <Link to={`/dessert/${dessert._id}`}>
                <div className="relative h-64 overflow-hidden bg-gray-50">
                    <motion.img
                        src={getFullImageSrc(dessert.thumbnail || dessert.image)}
                        alt={dessert.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <motion.button 
                        onClick={handleWishlistClick}
                        whileTap={{ scale: 0.8 }}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-lg ${isWishlisted ? 'bg-orange-500 text-white' : 'bg-white/80 text-gray-900 hover:bg-white'}`}
                    >
                        <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </motion.button>
                </div>
            </Link>
            
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 truncate">{dessert.name}</h3>
                    <span className="text-lg font-black text-orange-600">₹{(dessert.basePrice || dessert.price || 0).toFixed(2)}</span>
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium">{dessert.description}</p>
                
                <div className="flex items-center gap-3">
                    <Link to={`/dessert/${dessert._id}`} className="flex-grow text-center py-2.5 bg-gray-50 text-gray-600 rounded-xl font-black text-xs hover:bg-gray-100 transition-colors uppercase tracking-widest">
                        Details
                    </Link>
                    
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onAddToCart(dessert)}
                        className="w-12 h-10 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-black transition-colors shadow-lg shadow-gray-200"
                    >
                        <ShoppingCart size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
