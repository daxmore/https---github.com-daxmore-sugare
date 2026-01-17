import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Cake, Cookie, Truck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [featuredDesserts, setFeaturedDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedDesserts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/desserts');
        if (!res.ok) {
          throw new Error('Failed to fetch desserts');
        }
        const allDesserts = await res.json();
        const featuredNames = ["Chocolate Lava Cake", "Strawberry Cheesecake", "French Macarons"];
        const filteredDesserts = allDesserts.filter(dessert => featuredNames.includes(dessert.name));
        setFeaturedDesserts(filteredDesserts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDesserts();
  }, []);

  const handleShopNow = () => {
    if (user) {
      navigate('/category');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-base-100 overflow-hidden px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
                🍰 Handcrafted With Love
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Indulge in <span className="text-primary">Sweet</span> Moments
              </h1>
              <p className="text-xl text-base-content/70 mb-8 max-w-lg mx-auto lg:mx-0">
                Discover our exquisite collection of desserts made with premium ingredients and passion by master pastry chefs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={handleShopNow} className="btn btn-primary px-8">
                  Shop Now
                </button>
                <Link to="/about" className="btn btn-outline">
                  Our Story
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto rounded-full overflow-hidden border-8 border-white/50 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1605807646983-377bc5a76493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80"
                  alt="Featured Dessert"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 lg:top-8 lg:-right-8 bg-white p-3 rounded-xl shadow-xl rotate-6 animate-pulse">
                <span className="text-lg font-bold text-primary">Fresh Daily!</span>
              </div>
              <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:left-8 bg-white p-3 rounded-xl shadow-xl -rotate-6">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">★★★★★</span>
                  <span className="font-medium">Top Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
            <path d="M0,96L48,90.7C96,85,192,75,288,69.3C384,64,480,64,576,69.3C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Overview - Redesigned with Tailwind & Micro-animations */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold mb-3 animate-fade-in-up">Our Dessert Categories</h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-6 animate-width-expand"></div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Find the perfect dessert for your cravings and celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Cake Category */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl h-80 cursor-pointer">
            {/* Gradient Overlay that transitions on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/80 opacity-70 
                      group-hover:opacity-90 transition-opacity duration-500 z-10"></div>

            {/* Background Image with zoom effect */}
            <img
              src="https://images.unsplash.com/photo-1733590109295-7b69a44781ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cakes"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
            />

            {/* Content with slide-up animation */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Cake</h2>
              <p className="text-white/90 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm">
                Indulge in our rich, moist cakes perfect for celebrations or everyday treats.
              </p>
              <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                <span className="inline-flex items-center text-white text-sm font-medium">
                  Explore Collection
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:animate-bounce-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Pastry Category */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl h-80 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/80 opacity-70 
                      group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pastries"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Pastry</h2>
              <p className="text-white/90 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm">
                Flaky, buttery pastries that melt in your mouth with each delicate bite.
              </p>
              <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                <span className="inline-flex items-center text-white text-sm font-medium">
                  Explore Collection
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:animate-bounce-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>



          {/* Cookie Category */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl h-80 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/80 opacity-70 
                    group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
            <img
              src="https://plus.unsplash.com/premium_photo-1667621220861-5f297728dd39?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cookies"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Cookie</h2>
              <p className="text-white/90 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm">
                Soft, chewy cookies with perfect texture and delightful flavors.
              </p>
              <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                <span className="inline-flex items-center text-white text-sm font-medium">
                  Explore Collection
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:animate-bounce-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Desserts Section */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-16 relative">
          {/* Animated background element */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>

          {/* Section heading with reveal animation */}
          <div className="relative"
            data-aos="fade-up"
            data-aos-duration="800">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Featured Desserts
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 animate-expandLine"></span>
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto mt-4">
              Our most popular creations that have captivated the hearts and taste buds of our customers
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            {/* Custom loader animation */}
            <div className="relative w-20 h-20">
              <div className="absolute w-full h-full border-4 border-primary/30 rounded-full animate-ping"></div>
              <div className="absolute w-full h-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" opacity="0.3" />
                  <path d="M12 6a1 1 0 011 1v5a1 1 0 01-.293.707l-3 3a1 1 0 01-1.414-1.414L11 11.586V7a1 1 0 011-1z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-10 px-4 bg-red-50 rounded-xl border border-red-100 animate-fadeIn">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {featuredDesserts.map((dessert, index) => (
              <div
                key={dessert._id}
                className="group relative bg-base-100 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                {/* Ribbon for special items */}
                {dessert.featured && (
                  <div className="absolute top-5 -right-12 bg-primary text-white py-1 px-12 text-sm font-medium transform rotate-45 z-10 shadow-md">
                    Featured
                  </div>
                )}

                {/* Image container with hover effects */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Quick view button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      to={`/dessert/${dessert._id}`}
                      className="btn btn-primary btn-sm px-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out"
                    >
                      Quick View
                    </Link>
                  </div>

                  {/* Price badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary font-bold px-3 py-1 rounded-full shadow-md">
                    ₹{Number(dessert.price).toFixed(2)}
                  </div>

                  {/* Category tag */}
                  <div className="absolute bottom-4 left-4 bg-primary/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {dessert.category}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6">
                  <Link to={`/dessert/${dessert._id}`}>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {dessert.name}
                    </h3>
                  </Link>

                  <p className="text-base-content/70 mb-5 line-clamp-2 text-sm">{dessert.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Dynamic star rating based on hypothetical rating */}
                      <div className="flex items-center">
                        {[...Array(Math.floor(4 + Math.random()))].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-base-content/60 ml-1">({Math.floor(Math.random() * 50) + 10})</span>
                    </div>

                    <div className="flex space-x-1">
                      {/* Heart icon for wishlist */}
                      <button className="btn btn-circle btn-xs btn-ghost transition-transform hover:scale-125">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      {/* Cart icon for adding to cart */}
                      <button className="btn btn-circle btn-xs btn-ghost transition-transform hover:scale-125">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Interactive bottom bar that slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary/90 to-secondary/90 text-white py-3 px-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-between items-center">
                  <span className="font-medium">View Details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View all desserts button at bottom */}
        {!loading && !error && featuredDesserts.length > 0 && (
          <div className="text-center mt-16" data-aos="fade-up">
            <Link to="/category" className="btn btn-outline btn-primary btn-lg px-12 group relative overflow-hidden">
              <span className="relative z-10">View All Desserts</span>
              <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-75"></span>
            </Link>
          </div>
        )}
      </section>


      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Why Choose Sweet Delights?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <Cake className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold">Exquisite Desserts</h3>
            <p className="text-base-content/70">We craft each dessert with the finest ingredients for an unforgettable experience.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <Cookie className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold">Artisanal Craftsmanship</h3>
            <p className="text-base-content/70">Our skilled bakers pour their passion into every creation, ensuring perfection.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <Truck className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold">Fast & Fresh Delivery</h3>
            <p className="text-base-content/70">We deliver your favorite desserts fresh to your doorstep, quickly and safely.</p>
          </div>

        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 sm:py-24 overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-3xl shadow-xl overflow-hidden border border-primary/10">
            <div className="md:grid md:grid-cols-5 items-stretch">
              {/* Left decorative column - hidden on mobile */}
              <div className="hidden md:block md:col-span-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary bg-opacity-10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative w-full max-w-sm">
                    {/* Animated cupcake or dessert icon */}
                    <div className="w-32 h-32 mx-auto mb-6">
                      <div className="animate-float relative">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-full h-full text-primary">
                          <path d="M12 2a4 4 0 0 1 4 4c0 .823-.243 1.587-.65 2.23A6.995 6.995 0 0 1 19 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1 6.995 6.995 0 0 1 3.65-5.77A3.987 3.987 0 0 1 8 6a4 4 0 0 1 4-4z" fill="white" />
                          <path d="M6 17a3 3 0 0 1 3 3v1h6v-1a3 3 0 0 1 3-3H6z" fill="white" />
                        </svg>

                        {/* Animated hearts floating up */}
                        <div className="absolute -top-2 -right-2 animate-float-delay-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-pink-400">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.41 9.98 9.98 0 01-2.387-3.561 8.16 8.16 0 01-.594-3.13c0-4.368 3.841-8.591 9.576-4.279 5.736-4.312 9.576-.089 9.576 4.279a8.16 8.16 0 01-.594 3.13 9.98 9.98 0 01-2.387 3.56 15.247 15.247 0 01-5.2 3.41l-.022.013-.007.003-.001.001a.75.75 0 01-.686 0l-.001-.001z" />
                          </svg>
                        </div>
                        <div className="absolute -top-1 -left-4 animate-float-delay-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-300">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.41 9.98 9.98 0 01-2.387-3.561 8.16 8.16 0 01-.594-3.13c0-4.368 3.841-8.591 9.576-4.279 5.736-4.312 9.576-.089 9.576 4.279a8.16 8.16 0 01-.594 3.13 9.98 9.98 0 01-2.387 3.56 15.247 15.247 0 01-5.2 3.41l-.022.013-.007.003-.001.001a.75.75 0 01-.686 0l-.001-.001z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Animated text quotes */}
                    <div className="space-y-4 text-center">
                      <p className="text-lg italic font-medium text-white">
                        "The sweetest updates delivered straight to your inbox!"
                      </p>
                      <div className="flex justify-center">
                        <div className="flex -space-x-2">
                          <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/12.jpg" alt="Customer" />
                          <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" />
                          <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/45.jpg" alt="Customer" />
                        </div>
                      </div>
                      <p className="text-sm text-white/70">Join 2,000+ dessert enthusiasts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right form column */}
              <div className="md:col-span-3 p-8 sm:p-12">
                <div className="max-w-md mx-auto md:max-w-none">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left mb-2 group">
                    <span className="relative inline-block">
                      Sweet Newsletter
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                  </h2>
                  <p className="text-base-content/70 mb-8 text-center md:text-left">
                    Subscribe to receive exclusive offers, seasonal dessert alerts, and baking tips directly to your inbox.
                  </p>

                  <form className="space-y-4">
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                      <div className="flex-grow relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="input input-bordered w-full transition-all duration-300 border-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary relative overflow-hidden transition-all duration-300 group"
                      >
                        <span className="relative z-10">Subscribe</span>
                        <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-75"></span>
                      </button>
                    </div>

                    <div className="flex items-center text-xs text-base-content/50">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-primary">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <p>We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                  </form>

                  {/* Benefits */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs text-base-content/70">Exclusive offers & discounts</p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs text-base-content/70">Seasonal menu updates</p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs text-base-content/70">10% off first order</p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs text-base-content/70">Special event invitations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;