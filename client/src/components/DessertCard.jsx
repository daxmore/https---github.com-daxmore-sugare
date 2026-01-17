import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, TrendingUp } from 'lucide-react';
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

    return (
        <motion.div 
            className="bg-base-100 rounded-xl overflow-hidden shadow-lg group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
        >
            <Link to={`/dessert/${dessert._id}`}>
                <div className="relative h-64 overflow-hidden">
                    <motion.img
                        src={dessert.image}
                        alt={dessert.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {dessert.stock < 5 && (
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
                    <h3 className="text-xl font-bold">{dessert.name}</h3>
                    <span className="text-lg font-bold text-primary">₹{Number(dessert.price).toFixed(2)}</span>
                </div>
                
                <p className="text-base-content/70 text-sm line-clamp-2 mb-6">{dessert.description}</p>
                
                <div className="flex justify-between items-center">
                    <Link to={`/dessert/${dessert._id}`} className="text-primary font-semibold text-sm group-hover:underline">
                        View Details
                    </Link>
                    
                    <div className="flex items-center gap-2">
                        <motion.button 
                            className="btn btn-circle btn-primary btn-sm"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onAddToCart(dessert)}
                        >
                            <ShoppingCart size={16} />
                        </motion.button>
                        <motion.button 
                            className={`btn btn-circle btn-sm ${isWishlisted ? 'btn-primary' : 'btn-outline'}`}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleWishlistClick}
                        >
                            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};