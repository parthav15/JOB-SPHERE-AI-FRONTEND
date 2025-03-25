import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const links = [
    {
      title: "Product",
      items: ["Features", "Pricing", "API", "Integrations"]
    },
    {
      title: "Company",
      items: ["About", "Blog", "Careers", "Press"]
    },
    {
      title: "Resources",
      items: ["Help Center", "Community", "Webinars", "Status"]
    },
    {
      title: "Legal",
      items: ["Privacy", "Terms", "Cookie Policy", "GDPR"]
    }
  ];

  const socialLinks = [
    { icon: <Linkedin />, url: "#" },
    { icon: <Twitter />, url: "#" },
    { icon: <Github />, url: "#" },
    { icon: <Mail />, url: "#" }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-white/10">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Job Sphere AI
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Revolutionizing career growth with AI-powered tools and community insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {links.map((link, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-4">{link.title}</h3>
              <ul className="space-y-3">
                {link.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Job Sphere AI. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </footer>
  );
};

export default Footer;