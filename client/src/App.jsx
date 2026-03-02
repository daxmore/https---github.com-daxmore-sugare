import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import DessertDetail from './pages/DessertDetail';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDesserts from './pages/admin/ManageDesserts';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCoupons from './pages/admin/ManageCoupons';
import Analytics from './pages/admin/Analytics';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';
import ManageOrders from './pages/admin/ManageOrders';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />

          {/* Private Routes */}
          <Route path='/' element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/dessert/:id" element={<DessertDetail />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="desserts" element={<ManageDesserts />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="coupons" element={<ManageCoupons />} />
              <Route path="orders" element={<ManageOrders />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <Toaster 
            position="top-right" 
            reverseOrder={false} 
            toastOptions={{
              style: {
                borderRadius: '16px',
                background: '#fff',
                color: '#333',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                padding: '16px 24px',
                fontWeight: '600',
                fontSize: '14px',
              },
            }}
          />
          <AppContent />
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
