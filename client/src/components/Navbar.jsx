import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import useCartStore from '../context/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { items, getItemCount, getTotal } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = getItemCount();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 glass-nav bg-white/90 py-4">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          
          <button 
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>

          <Link to="/" className="flex flex-col items-center group relative z-10 md:w-1/3 md:items-start">
            <span className="font-serif text-2xl md:text-3xl tracking-tight text-brand-900 transition-colors">
              Sugaré
            </span>
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-8 w-1/3">
            <NavLink to="/" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-500 ${isActive ? 'text-brand-600' : 'text-gray-600'}`}>Home</NavLink>
            <NavLink to="/category" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-500 ${isActive ? 'text-brand-600' : 'text-gray-600'}`}>Catalog</NavLink>
            <NavLink to="/about" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-500 ${isActive ? 'text-brand-600' : 'text-gray-600'}`}>Story</NavLink>
            <NavLink to="/contact" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-500 ${isActive ? 'text-brand-600' : 'text-gray-600'}`}>Contact</NavLink>
          </nav>

          <div className="flex items-center justify-end gap-5 w-1/3 text-gray-700">
            <Link to="/search" className="hover:text-brand-500 transition-colors hidden sm:block">
                <Search size={20} strokeWidth={1.5} />
            </Link>
            
            {user ? (
                <Link to={user.isAdmin ? '/admin' : '/account'} className="hover:text-brand-500 transition-colors">
                    <User size={20} strokeWidth={1.5} />
                </Link>
            ) : (
                <Link to="/login" className="text-sm font-medium hover:text-brand-500 transition-colors hidden sm:block">
                    Log In
                </Link>
            )}

            <Link to="/wishlist" className="hover:text-brand-500 transition-colors hidden sm:block">
                <Heart size={20} strokeWidth={1.5} />
            </Link>

            <Link to="/cart" className="relative hover:text-brand-500 transition-colors group flex items-center gap-2">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-6">
                <NavLink to="/" className="text-xl font-serif text-gray-900">Home</NavLink>
                <NavLink to="/category" className="text-xl font-serif text-gray-900">Catalog</NavLink>
                <NavLink to="/about" className="text-xl font-serif text-gray-900">Our Story</NavLink>
                <NavLink to="/contact" className="text-xl font-serif text-gray-900">Contact</NavLink>
                
                <div className="h-px bg-gray-100 my-2" />
                
                {!user ? (
                    <Link to="/login" className="text-lg font-medium text-brand-600">Login / Register</Link>
                ) : (
                    <Link to="/account" className="text-lg font-medium text-brand-600">My Account</Link>
                )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;