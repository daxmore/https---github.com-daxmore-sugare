import React from 'react';
import { Phone, Mail, MapPin, Clock, Cake, Heart, CakeIcon } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-amber-50">
      {/* /* Hero Section*/}
          <div className="hero min-h-[500px]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170)' }}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="hero-content text-center text-white">
              <div className="max-w-2xl">
            <CakeIcon className="mx-auto mb-4" size={48} />
            <h1 className="mb-5 text-5xl font-bold font-serif">Sweet Connections</h1>
            <p className="mb-5 text-xl">Have a question about our delicious treats? We're here to satisfy your cravings and answer all your dessert-related queries!</p>
              </div>
            </div>
          </div>

        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100">
            <h2 className="text-3xl font-bold mb-6 text-pink-900 font-serif">Visit Our Sweet Spot</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-pink-600 mr-4 mt-1" size={24} />
                <span className="text-gray-700">123-Donuterria, Shree Darshan Complex,
                  Near L.P. Savani Road, Adajan,
                  Surat, Gujarat – 395009.</span>
              </div>
              <div className="flex items-start">
                <Mail className="text-pink-600 mr-4 mt-1" size={24} />
                <a href="mailto:hello@sweetdelights.com" className="link link-hover text-gray-700 hover:text-pink-600">donuterria@gmail.com</a>
              </div>
              <div className="flex items-start">
                <Phone className="text-pink-600 mr-4 mt-1" size={24} />
                <a href="tel:+15551234567" className="link link-hover text-gray-700 hover:text-pink-600">(555) 123-4567</a>
              </div>
              <div className="flex items-start">
                <Clock className="text-pink-600 mr-4 mt-1" size={24} />
                <div className="text-gray-700">
                  <p><span className="font-bold">Monday - Friday:</span> 8:00 AM - 8:00 PM</p>
                  <p><span className="font-bold">Weekend Bliss:</span> 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-pink-50 rounded-2xl">
              <h3 className="text-xl font-bold mb-3 text-pink-900">Sweet Reminders</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <Heart className="text-pink-400 mr-2" size={16} />
                  Custom orders require 48 hours notice
                </li>
                <li className="flex items-center">
                  <Heart className="text-pink-400 mr-2" size={16} />
                  Free delivery on orders over $50
                </li>
                <li className="flex items-center">
                  <Heart className="text-pink-400 mr-2" size={16} />
                  Weekend pickup available by appointment
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41711158758!2d72.73989952589315!3d21.159464567562753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-2xl shadow-md"
                title="Our Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100">
            <h2 className="text-3xl font-bold mb-6 text-pink-900 font-serif">Send Us a Sweet Message</h2>
            <form className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1 font-semibold text-gray-700">Full Name</span>
                </label>
                <input type="text" placeholder="Your sweet name" className="input input-bordered rounded-xl w-full border-pink-200 focus:border-pink-400" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1 font-semibold text-gray-700">Email</span>
                </label>
                <input type="email" placeholder="your.sweet@email.com" className="input input-bordered rounded-xl w-full border-pink-200 focus:border-pink-400" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1 font-semibold text-gray-700">Sweet Inquiry Type</span>
                </label>
                <select className="select select-bordered rounded-xl w-full border-pink-200 focus:border-pink-400">
                  <option disabled selected>What's on your mind?</option>
                  <option>Custom Cake Order</option>
                  <option>Delivery Inquiry</option>
                  <option>Allergy/Dietary Questions</option>
                  <option>Catering for Events</option>
                  <option>General Question</option>
                  <option>Feedback & Suggestions</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1 font-semibold text-gray-700">Your Sweet Message</span>
                </label>
                <textarea className="textarea textarea-bordered rounded-xl w-full h-32 border-pink-200 focus:border-pink-400" placeholder="Tell us about your dessert dreams..."></textarea>
              </div>
              <button className="btn w-full bg-gradient-to-r from-pink-500 to-amber-500 border-0 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300">
                Send Sweet Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="text-center mb-16">
            <Cake className="mx-auto mb-4 text-pink-600" size={48} />
            <h2 className="text-4xl font-bold font-serif text-pink-900 mb-4">Sweet Questions Answered</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We know you have questions about our delicious treats! Here are some common ones.</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="collapse collapse-plus bg-white shadow-xl rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 transition-all duration-300">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium flex items-center text-pink-900">
                <span className="text-pink-500 mr-3">🎂</span>
                <span>How far in advance should I order custom cakes?</span>
              </div>
              <div className="collapse-content">
                <p className="pt-2 leading-relaxed text-gray-700">We recommend ordering custom cakes at least 48 hours in advance. For elaborate wedding cakes or large orders, please allow 1-2 weeks to ensure we can create your perfect dessert masterpiece!</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white shadow-xl rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 transition-all duration-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium flex items-center text-pink-900">
                <span className="text-pink-500 mr-3">🚚</span>
                <span>Do you offer delivery and what are the areas?</span>
              </div>
              <div className="collapse-content">
                <p className="pt-2 leading-relaxed text-gray-700">Yes! We deliver within a 15-mile radius of our bakery. Delivery is free on orders over $50. We use special packaging to ensure your treats arrive in perfect condition.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white shadow-xl rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 transition-all duration-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium flex items-center text-pink-900">
                <span className="text-pink-500 mr-3">🌱</span>
                <span>Do you have vegan or gluten-free options?</span>
              </div>
              <div className="collapse-content">
                <p className="pt-2 leading-relaxed text-gray-700">Absolutely! We offer a variety of vegan, gluten-free, and other dietary-friendly options. All allergens are clearly marked, and we take cross-contamination seriously in our kitchen.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white shadow-xl rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 transition-all duration-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium flex items-center text-pink-900">
                <span className="text-pink-500 mr-3">💝</span>
                <span>Can I schedule a tasting for my wedding?</span>
              </div>
              <div className="collapse-content">
                <p className="pt-2 leading-relaxed text-gray-700">Of course! We offer complimentary tasting sessions for wedding cakes and large event orders. Please contact us to schedule an appointment at least 2 weeks in advance.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white shadow-xl rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-300 transition-all duration-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium flex items-center text-pink-900">
                <span className="text-pink-500 mr-3">⏰</span>
                <span>How long do your desserts stay fresh?</span>
              </div>
              <div className="collapse-content">
                <p className="pt-2 leading-relaxed text-gray-700">Most of our cakes and pastries stay fresh for 3-5 days when refrigerated. Cookies and brownies can last up to a week in airtight containers. We provide detailed storage instructions with every order.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
