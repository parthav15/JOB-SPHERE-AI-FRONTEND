import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User, MessageCircle, Send } from 'lucide-react';

const ContactUs = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or need support? Our team is ready to help you accelerate your career journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Your Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <div className="relative">
                  <MessageCircle className="w-5 h-5 text-gray-400 absolute left-3 top-4" />
                  <textarea
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-xl transition-all"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Email</h4>
                    <p className="text-blue-400">support@jobsphere.ai</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Phone</h4>
                    <p className="text-purple-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Address</h4>
                    <p className="text-blue-400">San Francisco, CA</p>
                    <p className="text-blue-400">United States</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">24/7 Support</h3>
              <p className="text-gray-300 mb-6">
                Our dedicated support team is available round the clock to assist you with any inquiries
              </p>
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-2 border-white/20"
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  Supported by real humans
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating cube animation */}
        <div className="absolute left-1/4 top-1/3 -translate-y-1/2 opacity-10 pointer-events-none">
          <motion.div
            animate={{
              rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-64 h-64 border-2 border-white/10 rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;