import React from 'react';
import { MapPin, Clock, Utensils, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                className="w-full h-full object-cover" 
                alt="Bakery Story"
            />
            <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-brand-100 font-medium text-xs uppercase tracking-[0.3em] mb-6">Our Legacy</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">The Sugaré Story</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed italic">
                From a small kitchen passion to a flourishing boutique, our mission has always been to share joy through the art of sweet indulgence.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-32">
        {/* Our Mission Section */}
        <section className="max-w-5xl mx-auto mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <span className="text-brand-500 font-bold tracking-widest uppercase text-xs mb-4 block">The Mission</span>
                    <h2 className="text-5xl font-serif text-brand-900 mb-8 leading-tight">Crafting Memories, <br/> One Bite at a Time.</h2>
                    <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                        To inspire joy and celebration through exceptional desserts crafted with love and premium ingredients. We aim to create sweet memories for our customers, ensuring every occasion feels like a masterpiece.
                    </p>
                    <div className="space-y-6">
                        <BenefitItem icon={<Utensils size={20}/>} title="Artisanal Quality" desc="Each dessert is hand-finished with meticulous attention to detail." />
                        <BenefitItem icon={<Award size={20}/>} title="Michelin Standard" desc="Sourced from sustainable farms and masterfully composed." />
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-brand-50 rounded-[3rem] -z-10" />
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745a30d3?auto=format&fit=crop&q=80&w=800" alt="Chef at work" className="rounded-[2.5rem] shadow-2xl" />
                </div>
            </div>
        </section>

        {/* Meet the Team Section */}
        <section className="mb-40 text-center">
          <span className="text-brand-500 font-bold tracking-widest uppercase text-xs mb-4 block">The Artisans</span>
          <h2 className="text-5xl font-serif text-brand-900 mb-20 tracking-tight">Our Master Pastry Chefs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <TeamMember 
                name="Eshani Paida" 
                role="Founder & Executive Chef" 
                img="https://i.pinimg.com/736x/46/3b/b3/463bb35aed09652bf1dbc0c3804cfb35.jpg" 
            />
            <TeamMember 
                name="Janvi Patel" 
                role="Decorating Specialist" 
                img="https://i.pinimg.com/736x/dd/9d/9e/dd9d9e317b33730cd553a896d7c0e0cd.jpg" 
            />
            <TeamMember 
                name="Hudayani Patel" 
                role="Experience Manager" 
                img="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600" 
            />
          </div>
        </section>

        {/* Location Section */}
        <section className="boutique-card overflow-hidden bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20">
              <h2 className="text-4xl font-serif text-brand-900 mb-8">Visit the Boutique</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 flex-shrink-0"><MapPin size={20}/></div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Location</h4>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
                            Shree Darshan Complex, Near L.P. Savani Road, Adajan, Surat, Gujarat – 395009.
                        </p>
                    </div>
                </div>
                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 flex-shrink-0"><Clock size={20}/></div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Service Hours</h4>
                        <p className="text-gray-500 text-sm font-light">Monday – Friday: 09:00 – 18:00</p>
                        <p className="text-gray-500 text-sm font-light">Saturday – Sunday: 10:00 – 16:00</p>
                    </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] lg:h-auto w-full relative grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41711158758!2d72.73989952589315!3d21.159464567562753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Boutique Map"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const BenefitItem = ({ icon, title, desc }) => (
    <div className="flex gap-5 items-start">
        <div className="text-brand-500 mt-1">{icon}</div>
        <div>
            <h4 className="font-bold text-gray-900">{title}</h4>
            <p className="text-gray-500 text-sm font-light">{desc}</p>
        </div>
    </div>
);

const TeamMember = ({ name, role, img }) => (
    <div className="group">
        <div className="relative mb-8 overflow-hidden rounded-[3rem] aspect-square shadow-xl">
            <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-2xl font-serif text-gray-900 mb-2">{name}</h3>
        <p className="text-brand-500 font-medium text-xs uppercase tracking-widest">{role}</p>
    </div>
);

export default About;