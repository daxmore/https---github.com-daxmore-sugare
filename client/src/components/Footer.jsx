import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer className="relative bg-base-200 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-12 text-base-100" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 pt-24 pb-12 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-2"
        >
          {/* Brand section */}
          <motion.div variants={fadeIn} className="space-y-6">
            <Link to="/" className="inline-block text-primary hover:opacity-80 transition-opacity">
              <span className="text-3xl font-bold">Sugaré</span>
            </Link>

            <p className="mt-4 text-base-content/80 max-w-xs">
              Your ultimate destination for delectable desserts. Indulge in our sweet creations for every occasion.
            </p>

            <motion.div
              className="flex space-x-4"
              variants={staggerContainer}
            >
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-focus transition-colors"
              >
                <Instagram size={18} />
              </motion.a>

              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-focus transition-colors"
              >
                <Facebook size={18} />
              </motion.a>

              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-focus transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeIn} className="space-y-6">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/about" className="text-base-content/80 hover:text-primary transition-colors flex items-center">
                  <span className="h-px w-5 bg-primary/50 mr-2"></span>
                  About Us
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/category" className="text-base-content/80 hover:text-primary transition-colors flex items-center">
                  <span className="h-px w-5 bg-primary/50 mr-2"></span>
                  Shop Desserts
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/contact" className="text-base-content/80 hover:text-primary transition-colors flex items-center">
                  <span className="h-px w-5 bg-primary/50 mr-2"></span>
                  Contact Us
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/account" className="text-base-content/80 hover:text-primary transition-colors flex items-center">
                  <span className="h-px w-5 bg-primary/50 mr-2"></span>
                  My Account
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Dessert Categories */}
          <motion.div variants={fadeIn} className="space-y-6">
            <h3 className="text-xl font-bold">Dessert Categories</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/category" className="text-base-content/80 hover:text-primary transition-colors flex items-center">
                  <span className="h-px w-5 bg-primary/50 mr-2"></span>
                  Cakes
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/category" className="text-base-content/80 hover:text-primary transition-colors flex items-center">
                  <span className="h-px w-5 bg-primary/50 mr-2"></span>
                  Pastries
                </Link>
              </motion.li>

              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/category" className="text-base-content/80 hover:text-primary transition-colors flex items-center">
                  <span className="h-px w-5 bg-primary/50 mr-2"></span>
                  Cookies
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Subscribe to our Newsletter</h3>
            <p className="mb-4 text-base-content/70">Get updates on new desserts and seasonal offers.</p>

            <form className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input input-bordered w-full pr-12 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
                <motion.div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </motion.div>
              </div>
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>

            <p className="text-sm text-base-content/50 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>

        {/* Bottom section with copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.5 } }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-base-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base-content/70 mb-4 md:mb-0">
              &copy; 2025 Sugaré. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/faq" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cookie consent banner - Optional */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base-content/80 text-sm">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost">Learn More</button>
            <button className="btn btn-sm btn-primary">Accept</button>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;