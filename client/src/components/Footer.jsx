import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 pt-24 pb-12 border-t border-gray-100 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-4 md:grid-cols-2">
          
          {/* Brand section */}
          <div className="space-y-8">
            <Link to="/" className="inline-block transition-opacity hover:opacity-80">
              <span className="font-serif text-3xl font-bold tracking-tight text-brand-900">Sugaré</span>
            </Link>

            <p className="text-gray-500 max-w-xs text-sm leading-relaxed font-light">
              Elevating the art of dessert. Every cake, pastry, and cookie is a handcrafted masterpiece designed to bring joy to your table.
            </p>

            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 transition-colors">
                <Instagram strokeWidth={1.5} size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 transition-colors">
                <Facebook strokeWidth={1.5} size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 transition-colors">
                <Twitter strokeWidth={1.5} size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium">Our Story</Link>
              </li>
              <li>
                <Link to="/category" className="text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium">The Catalog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium">Contact Concierge</Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium">Member Portal</Link>
              </li>
            </ul>
          </div>

          {/* Dessert Categories */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">Collections</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/category?category=Cake" className="text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium">Signature Cakes</Link>
              </li>
              <li>
                <Link to="/category?category=Pastry" className="text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium">French Pastries</Link>
              </li>
              <li>
                <Link to="/category?category=Cookie" className="text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium">Artisan Cookies</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">Join the Inner Circle</h3>
            <p className="mb-6 text-gray-500 text-sm font-light leading-relaxed">Exclusive previews, seasonal flavors, and special member invites.</p>

            <form className="flex flex-col gap-3">
              <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm"
                  required
              />
              <button type="submit" className="w-full py-3 bg-brand-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} Sugaré Artisan Bakery. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-xs text-gray-400 hover:text-brand-500 transition-colors font-medium">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-brand-500 transition-colors font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;