import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { wishlistItems, removeFromWishlist, loading } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Please log in</h2>
        <p>You need to be logged in to view your wishlist.</p>
        <Link to="/login" className="btn btn-primary mt-4">Login</Link>
      </div>
    );
  }

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">My Wishlist</h1>
        <Link to="/category" className="btn btn-outline btn-primary">Continue Shopping</Link>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((dessert) => (
            <Link to={`/dessert/${dessert._id}`} key={dessert._id} className="group relative bg-base-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block">
              <div className="relative h-64 overflow-hidden">
                  <img
                      src={dessert.image}
                      alt={dessert.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <button
                          onClick={(e) => { e.preventDefault(); addToCart(dessert); }}
                          className="btn btn-primary btn-sm rounded-full"
                      >
                          <ShoppingCart size={16} className="mr-1" /> Add to Cart
                      </button>
                      <button
                          onClick={(e) => { e.preventDefault(); removeFromWishlist(dessert._id); }}
                          className="btn btn-circle btn-sm btn-ghost bg-white/80 hover:bg-white"
                      >
                          <Trash2 size={16} className="text-red-500" />
                      </button>
                  </div>
              </div>

              <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold transition-colors hover:text-primary">{dessert.name}</h3>
                      <span className="text-base-content text-lg font-semibold">₹{Number(dessert.price).toFixed(2)}</span>
                  </div>
                  <p className="text-base-content/70 text-sm line-clamp-2 mb-3">{dessert.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-2xl font-bold mb-2">Your wishlist is empty</h3>
          <p className="mb-6">Browse our delicious desserts and add your favorites to your wishlist!</p>
          <Link to="/category" className="btn btn-primary">
            Browse Desserts
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;