import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Heart, MapPin, ShoppingBag, LogOut } from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';

const Account = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const res = await fetch(`http://localhost:5000/api/wishlist/${user._id}`);
        if (res.ok) {
          const data = await res.json();
          setWishlistCount(data.desserts ? data.desserts.length : 0);
        }
      } catch (error) {
        console.error('Failed to fetch wishlist count', error);
      }
    };
    fetchWishlist();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-center mb-12">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Card */}
          <div className="lg:w-1/4">
            <div className="bg-base-100 rounded-3xl shadow-xl p-8 sticky top-8">
              <div className="flex flex-col items-center">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring-4 ring-primary">
                    <img src={user.profileImage || `https://ui-avatars.com/api/?name=${user.fullname}&size=128&background=random`} alt="profile" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-4">{user.fullname}</h2>
                <p className="text-sm opacity-70 mb-6">{user.email}</p>
                <div className="flex flex-col w-full gap-3">
                  <Link to="/wishlist" className="btn btn-outline btn-primary gap-2">
                    <Heart size={18} /> Wishlist ({wishlistCount})
                  </Link>
                  <button className="btn btn-ghost gap-2">
                    <MapPin size={18} /> Addresses
                  </button>
                  <button className="btn btn-ghost gap-2">
                    <Link to="/orders" className="btn btn-ghost gap-2">
                      <ShoppingBag size={18} /> Orders
                    </Link>
                  </button>
                  <button onClick={logout} className="btn btn-error gap-2">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            <div className="bg-base-100 rounded-3xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Personal Information</h3>
                <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>Edit</button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-sm opacity-70">Full Name</h4>
                    <p>{user.fullname}</p>
                  </div>
                </div>
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-sm opacity-70">Username</h4>
                    <p>{user.username}</p>
                  </div>
                </div>
                <div className="card bg-base-200 md:col-span-2">
                  <div className="card-body">
                    <h4 className="card-title text-sm opacity-70">Email</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <Heart size={32} />
                  </div>
                  <div className="stat-title">Wishlist Items</div>
                  <div className="stat-value">{wishlistCount}</div>
                  <Link to="/wishlist" className="stat-desc text-primary">View Wishlist →</Link>
                </div>
              </div>

              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <ShoppingBag size={32} />
                  </div>
                  <div className="stat-title">Total Orders</div>
                  <div className="stat-value">0</div>
                  <div className="stat-desc">View History →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Account;