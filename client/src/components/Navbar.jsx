import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, ChevronDown, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [showCartPreview, setShowCartPreview] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const dessertCategories = [
    { name: 'All Desserts', path: '/category' },
    { name: 'Cakes', path: '/category?category=Cake' },
    { name: 'Pastries', path: '/category?category=Pastry' },
    { name: 'Cookies', path: '/category?category=Cookie' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Donuterria</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-medium" : "text-base-content hover:text-primary transition"
              }
            >
              Home
            </NavLink>

            {/* Dessert Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-base-content hover:text-primary transition group-hover:text-primary">
                Shop Desserts
                <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 -translate-y-2">
                <div className="py-2 rounded-md bg-base-100 shadow-xl border border-base-300">
                  {dessertCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-sm hover:bg-base-200 hover:text-primary transition"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-primary font-medium" : "text-base-content hover:text-primary transition"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-primary font-medium" : "text-base-content hover:text-primary transition"
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Icons Section */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="btn btn-sm btn-ghost btn-circle"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="btn btn-sm btn-ghost btn-circle"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <div className="relative">
              <button
                className="btn btn-ghost btn-circle"
                onMouseEnter={() => setShowCartPreview(true)}
                onMouseLeave={() => setShowCartPreview(false)}
              >
                <div className="indicator">
                  <Link
                    to="/cart"
                    className="btn btn-sm btn-ghost btn-circle"
                    aria-label="cart"
                  >
                    <ShoppingCart size={20} />
                    {cartItems.length > 0 && (
                      <span className="badge badge-sm badge-primary indicator-item">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                      </span>
                    )}
                  </Link>
                </div>
              </button>

              {showCartPreview && cartItems.length > 0 && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-base-100 rounded-xl shadow-2xl z-50 overflow-hidden"
                  onMouseEnter={() => setShowCartPreview(true)}
                  onMouseLeave={() => setShowCartPreview(false)}
                >
                  <div className="p-4 bg-base-200">
                    <h3 className="font-bold text-lg">Your Cart</h3>
                  </div>
                  <div className="p-4 max-h-60 overflow-y-auto">
                    {cartItems.slice(0, 3).map(item => (
                      <div key={item._id} className="flex items-center gap-3 py-2 border-b">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-sm text-base-content/70">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                    {cartItems.length > 3 && (
                      <p className="text-sm text-center mt-2 text-base-content/70">
                        +{cartItems.length - 3} more items
                      </p>
                    )}
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex justify-between font-bold mb-3">
                      <span>Total:</span>
                      <span>
                        ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                    <Link to="/cart" className="btn btn-primary w-full">
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="btn btn-sm btn-ghost btn-circle">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 -translate-y-2">
                  <div className="py-2 rounded-md bg-base-100 shadow-xl border border-base-300">
                    <div className="px-4 py-2 text-sm font-medium border-b border-base-200">
                      Hi, {user.fullname}
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm hover:bg-base-200 transition"
                    >
                      Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm hover:bg-base-200 transition"
                    >
                      My Orders
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm hover:bg-base-200 transition"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm btn-ghost"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="btn btn-sm btn-ghost btn-circle md:hidden"
              aria-label="Open Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-16 bg-base-100 shadow-md p-4 animate-fade-in-down">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for desserts..."
                className="input input-bordered flex-grow"
                autoFocus
              />
              <button type="submit" className="btn btn-primary ml-2">
                <Search size={20} />
              </button>
              <button
                type="button"
                onClick={toggleSearch}
                className="btn btn-ghost ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 shadow-md animate-fade-in-down">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium" : "px-4 py-2 rounded-lg hover:bg-base-200 transition"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <div className="px-4 py-2 font-medium border-t border-base-200 pt-4 mt-2">Shop Desserts</div>

            {dessertCategories.map((category) => (
              <NavLink
                key={category.name}
                to={category.path}
                className={({ isActive }) =>
                  isActive
                    ? "px-8 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                    : "px-8 py-2 rounded-lg hover:bg-base-200 transition text-sm"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </NavLink>
            ))}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium" : "px-4 py-2 rounded-lg hover:bg-base-200 transition"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium" : "px-4 py-2 rounded-lg hover:bg-base-200 transition"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>

            <div className="border-t border-base-200 pt-4 mt-2">
              {!user && (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="btn btn-primary flex-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-outline flex-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;