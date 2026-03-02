import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Utensils, Heart, Gift, X, ChevronDown, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [showCelebration, setShowCelebration] = useState(null); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
        const today = new Date();
        const celebrate = (type, code) => {
            const hasSeen = sessionStorage.getItem(`${type}_celebrated`);
            if (!hasSeen) {
                setShowCelebration({ type, code });
                triggerConfetti();
                sessionStorage.setItem(`${type}_celebrated`, 'true');
            }
        };

        if (user.birthday) {
            const d = new Date(user.birthday);
            if (today.getDate() === d.getDate() && today.getMonth() === d.getMonth()) {
                celebrate('birthday', 'BDAY20');
            }
        }
        if (user.anniversary) {
            const d = new Date(user.anniversary);
            if (today.getDate() === d.getDate() && today.getMonth() === d.getMonth()) {
                celebrate('anniversary', 'FOREVER15');
            }
        }
    }

    const fetchFeatured = async () => {
      try {
        const res = await axios.get('/desserts?featured=true');
        setFeatured(res.data.slice(0, 4));
      } catch (err) {
        console.error("Featured items load fail");
      }
    };
    fetchFeatured();
  }, [user]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="bg-[#FAFAFA] overflow-hidden">
      <AnimatePresence>
        {showCelebration && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white rounded-[2rem] p-12 max-w-md w-full text-center relative shadow-2xl border border-brand-100"
                >
                    <button onClick={() => setShowCelebration(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-500">
                        <Gift className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-serif text-brand-900 mb-3 tracking-tight">
                        {showCelebration.type === 'birthday' ? `Happy Birthday!` : `Happy Anniversary!`}
                    </h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">A special day deserves a special treat. Enjoy this gift on us.</p>
                    <div className="bg-brand-50 p-6 rounded-2xl border border-brand-200 mb-8">
                        <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-1">Exclusive Code</div>
                        <div className="text-3xl font-serif text-brand-900">{showCelebration.code}</div>
                    </div>
                    <button onClick={() => setShowCelebration(null)} className="btn-elegant w-full">
                        Claim Gift
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Split Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
                <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block text-brand-600 font-semibold text-xs uppercase tracking-[0.3em] mb-6">
                            Sugaré Artisan Bakery
                        </span>
                        <h1 className="text-6xl lg:text-8xl font-serif text-brand-900 mb-6 leading-[1.05] tracking-tight">
                            Sweetness, <br/>
                            <span className="italic text-brand-500 font-light">elevated.</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Handcrafted masterpieces made daily with the finest natural ingredients. Because every slice should be a celebration.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to="/category" className="btn-elegant w-full sm:w-auto">
                                Explore Catalog
                            </Link>
                            <Link to="/about" className="btn-elegant-outline w-full sm:w-auto">
                                Our Story
                            </Link>
                        </div>
                    </motion.div>
                </div>
                
                <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px]">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute inset-0 right-0 lg:-right-20 bg-brand-100 rounded-bl-[10rem] rounded-tr-[10rem] overflow-hidden shadow-2xl"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                            alt="Signature Cake" 
                            className="w-full h-full object-cover opacity-90"
                        />
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="absolute bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 hidden md:flex"
                    >
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm">Freshly Baked</div>
                            <div className="text-xs text-gray-500">Every morning at 4 AM</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-xl">
                    <h2 className="text-4xl lg:text-5xl font-serif text-brand-900 mb-4">Curated Signatures</h2>
                    <p className="text-gray-500 font-light leading-relaxed">The chef's daily selection of our most loved and sought-after treats, crafted with precision.</p>
                </div>
                <Link to="/category" className="inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-800 transition-colors uppercase tracking-widest text-xs group">
                    View Entire Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featured.map((item) => {
                    const imageSrc = item.thumbnail || item.image;
                    const fullImageSrc = imageSrc?.startsWith('http') ? imageSrc : `http://localhost:5000${imageSrc}`;
                    
                    return (
                        <Link key={item._id} to={`/dessert/${item._id}`} className="group">
                            <div className="boutique-card overflow-hidden">
                                <div className="relative h-[280px] overflow-hidden bg-brand-50">
                                    <img src={fullImageSrc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={item.name} />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-semibold text-brand-900 text-xs shadow-sm">
                                        ₹{(item.basePrice || item.price || 0).toFixed(2)}
                                    </div>
                                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        <Heart size={18} />
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{item.category}</span>
                                    <h3 className="text-lg font-serif text-gray-900 group-hover:text-brand-600 transition-colors tracking-tight line-clamp-1">{item.name}</h3>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-brand-50">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                    <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl max-w-md mx-auto lg:mx-0">
                        <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800" alt="Baking" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="order-1 lg:order-2 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-serif text-brand-900 mb-6">Baked with Pure Obsession.</h2>
                    <p className="text-gray-600 leading-relaxed font-light mb-10 max-w-lg mx-auto lg:mx-0">
                        We don't just bake; we compose. Every ingredient is sourced from sustainable farms, every temperature is precise, and every decoration is hand-finished by masters of the craft.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-sm"><Utensils size={20}/></div>
                            <div className="text-left">
                                <div className="font-bold text-gray-900">100% Natural</div>
                                <div className="text-xs text-gray-500">No preservatives</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-sm"><Clock size={20}/></div>
                            <div className="text-left">
                                <div className="font-bold text-gray-900">24h Promise</div>
                                <div className="text-xs text-gray-500">Baked to order</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
            <span className="text-brand-500 font-bold tracking-widest uppercase text-xs mb-6 block">Join the Inner Circle</span>
            <h2 className="text-5xl font-serif text-brand-900 mb-6 tracking-tight">Experience Luxury <br/> Like Never Before.</h2>
            <p className="text-gray-500 mb-10 font-light text-lg">Sign up for the Sugaré Gold plan to receive daily discounts, priority prep-time, and exclusive seasonal invitations.</p>
            <Link to="/register" className="btn-elegant mx-auto w-max px-12">
                Become a Member
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;