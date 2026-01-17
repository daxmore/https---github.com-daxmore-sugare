import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user || !user._id) {
        setWishlistItems([]);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/wishlist/${user._id}`);
        if (res.ok) {
          const data = await res.json();
          setWishlistItems(data.desserts || []);
        } else if (res.status === 404) {
          // If wishlist doesn't exist, create one
          const createRes = await fetch('http://localhost:5000/api/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id, desserts: [] })
          });
          if (createRes.ok) {
            setWishlistItems([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
        setWishlistItems([]);
      }
    };
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (dessert) => {
    if (!user) {
      alert('Please login to add items to your wishlist.');
      return;
    }
    try {
      await fetch('http://localhost:5000/api/wishlist',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dessertId: dessert._id, userId: user._id }),
        }
      );
      setWishlistItems([...wishlistItems, dessert]);
    } catch (err) {
      console.error('Failed to add to wishlist', err);
    }
  };

  const removeFromWishlist = async (dessertId) => {
    if (!user) return;
    try {
      await fetch('http://localhost:5000/api/wishlist',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dessertId, userId: user._id }),
        }
      );
      setWishlistItems(wishlistItems.filter(item => item._id !== dessertId));
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  const isInWishlist = (dessertId) => {
    return wishlistItems.some(item => item._id === dessertId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};