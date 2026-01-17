import React from 'react';
import { MapPin, Clock, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-[400px]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=60)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Our Story</h1>
            <p className="mb-5">From a small kitchen passion to a flourishing bakery, our love for desserts has grown into a mission to share joy through sweet indulgence. We believe in quality ingredients and creating the most delectable treats for every occasion.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        {/* Our Mission Section */}
        <section className="text-center max-w-4xl mx-auto mb-24">
          <div className="relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
                <path d="M10 10h4v2h-4zm0 4h4v2h-4z" />
              </svg>
            </div>

            <h2 className="text-5xl font-bold mb-8 text-primary">Our Mission</h2>

            <p className="text-xl leading-relaxed text-base-content/80 mb-6">
              To inspire joy and celebration through exceptional desserts crafted with love and premium ingredients. We aim to create sweet memories for our customers, one delicious bite at a time.
            </p>

            <div className="flex justify-center gap-8 mt-12">
              <div className="flex flex-col items-center p-6 bg-base-100 rounded-xl shadow-lg max-w-xs transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2z" />
                    <path d="M10 12V8" />
                    <path d="M14 12V8" />
                    <path d="M10 16.5V12.5" />
                    <path d="M14 16.5V12.5" />
                    <rect width="16" height="6" x="4" y="18" rx="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Artisanal Quality</h3>
                <p className="text-center text-sm">Each dessert is crafted by hand with meticulous attention to detail and premium ingredients.</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-base-100 rounded-xl shadow-lg max-w-xs transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M7 2h10" />
                    <path d="M5 6h14" />
                    <rect x="2" y="10" width="20" height="12" rx="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Memorable Moments</h3>
                <p className="text-center text-sm">We believe desserts aren't just food—they're experiences that create lasting memories for special occasions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Pastry Experts</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="card items-center text-center group">
              <figure className="relative w-48 h-48">
                <img src="https://i.pinimg.com/736x/46/3b/b3/463bb35aed09652bf1dbc0c3804cfb35.jpg" alt="Jane Doe" className="rounded-full w-full h-full object-cover shadow-lg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">Eshani Paida</h2>
                <p className="text-base-content/70">Founder & Head Pastry Chef</p>
              </div>
            </div>
            <div className="card items-center text-center group">
              <figure className="relative w-48 h-48">
                <img src="https://i.pinimg.com/736x/dd/9d/9e/dd9d9e317b33730cd553a896d7c0e0cd.jpg" alt="John Smith" className="rounded-full w-full h-full object-cover shadow-lg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">Janvi Patel</h2>
                <p className="text-base-content/70">Cake Decoration Specialist</p>
              </div>
            </div>
            <div className="card items-center text-center group">
              <figure className="relative w-48 h-48">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Emily White" className="rounded-full w-full h-full object-cover shadow-lg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">Hudayani Patel</h2>
                <p className="text-base-content/70">Customer Happiness Manager</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location and Hours Section */}
        <section className="bg-base-200 p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Visit Our Shop</h2>
              <div className="flex items-center mb-4">
                <MapPin className="text-primary mr-3" size={20} />
                <span>123-Donuterria, Shree Darshan Complex,
                  Near L.P. Savani Road, Adajan,
                  Surat, Gujarat – 395009.</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-8">Hours of Operation</h3>
              <div className="flex items-center">
                <Clock className="text-primary mr-3" size={20} />
                <div>
                  <p><b>Monday - Friday:</b> 9:00 AM - 6:00 PM</p>
                  <p><b>Saturday - Sunday:</b> 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="h-80 md:h-full w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41711158758!2d72.73989952589315!3d21.159464567562753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="shadow-lg">
              </iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;