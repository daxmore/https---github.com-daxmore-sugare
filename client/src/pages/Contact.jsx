import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Instagram, Twitter, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sending your message...');

    try {
        const { data } = await axios.post('http://localhost:5000/api/messages/send', formData);
        toast.success(data.message, { id: toastId });
        setFormData({ fullname: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
        toast.error("Failed to send message. Please try again.", { id: toastId });
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-white font-black text-xs uppercase tracking-[0.3em] mb-6"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            We'd Love to Hear <br /> From You.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Have a special request or just want to say hi? Our team is always here to help make your day a little sweeter.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <ContactCard 
                icon={<Phone className="text-orange-500" />} 
                title="Call Us" 
                detail="+91 98765 43210" 
                sub="Mon-Sat, 9am - 9pm"
            />
            <ContactCard 
                icon={<Mail className="text-blue-500" />} 
                title="Email Us" 
                detail="hello@donuterria.com" 
                sub="We reply within 24 hours"
            />
            <ContactCard 
                icon={<MapPin className="text-green-500" />} 
                title="Visit Us" 
                detail="123 Delicious Lane, Sweets City" 
                sub="Mumbai, Maharashtra 400001"
            />
            
            <div className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100">
                <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Follow the Sweetness</h4>
                <div className="flex gap-4">
                    <SocialBtn icon={<Instagram />} />
                    <SocialBtn icon={<Twitter />} />
                    <SocialBtn icon={<Facebook />} />
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-gray-100 h-full"
            >
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900">Send a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required placeholder="John Doe" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                        <select name="subject" value={formData.subject} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold">
                            <option>General Inquiry</option>
                            <option>Special Event Order</option>
                            <option>Bulk/Corporate Gifting</option>
                            <option>Feedback & Suggestions</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us what's on your mind..." className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-bold h-40" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3">
                        {loading ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5" />
                    </button>
                </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQItem 
                question="Do you offer same-day delivery?" 
                answer="Currently, we require a minimum 24-hour lead time for all orders to ensure every treat is baked fresh just for you. For complex custom cakes, we recommend 48 hours."
            />
            <FAQItem 
                question="What are your delivery charges?" 
                answer="We offer free delivery on all orders over ₹500 within a 15-mile radius. For orders below this amount, a flat fee of ₹50 is applied."
            />
            <FAQItem 
                question="Are there eggless and sugar-free options?" 
                answer="Yes! Most of our masterpieces can be customized to be eggless or sugar-free. You can select these modifiers directly in the product customizer."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, detail, sub }) => (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-50 flex items-start gap-6">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h4>
            <div className="text-lg font-black text-gray-900 mb-1">{detail}</div>
            <p className="text-gray-500 text-sm font-medium">{sub}</p>
        </div>
    </motion.div>
);

const SocialBtn = ({ icon }) => (
    <button className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all">
        {React.cloneElement(icon, { size: 20 })}
    </button>
);

const FAQItem = ({ question, answer }) => (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        <h4 className="text-xl font-bold text-gray-900 mb-3">{question}</h4>
        <p className="text-gray-500 font-medium leading-relaxed">{answer}</p>
    </div>
);

export default Contact;
