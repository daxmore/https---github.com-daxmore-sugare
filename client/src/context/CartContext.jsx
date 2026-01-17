import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plant) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item._id === plant._id);

      if (isItemInCart) {
        // If item is already in cart, increase quantity
        return prevItems.map(item =>
          item._id === plant._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If not, add it to the cart with quantity 1
        alert(`Added ${plant.name} to your cart!`);
        return [...prevItems, { ...plant, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (plantId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== plantId));
  };

  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(plantId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === plantId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};