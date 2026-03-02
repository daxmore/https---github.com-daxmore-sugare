import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const fetchWishlist = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data } = await axios.get('/wishlist');
            setWishlistItems(data);
        } catch (err) {
            console.error("Failed to fetch wishlist", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [user]);

    const addToWishlist = async (dessert) => {
        if (!user) return toast.error("Please login to save favorites");
        try {
            await axios.post('/wishlist/add', { dessertId: dessert._id });
            setWishlistItems((prev) => [...prev, dessert]);
            toast.success(`${dessert.name} added to wishlist!`);
        } catch (err) {
            toast.error("Failed to add to wishlist");
        }
    };

    const removeFromWishlist = async (dessertId) => {
        try {
            await axios.delete(`/wishlist/remove/${dessertId}`);
            setWishlistItems((prev) => prev.filter(item => item._id !== dessertId));
            toast.success("Removed from wishlist");
        } catch (err) {
            toast.error("Failed to remove from wishlist");
        }
    };

    const isInWishlist = (dessertId) => {
        return wishlistItems.some(item => item._id === dessertId);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, loading }}>
            {children}
        </WishlistContext.Provider>
    );
};
