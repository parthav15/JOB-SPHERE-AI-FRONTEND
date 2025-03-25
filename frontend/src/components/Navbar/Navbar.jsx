import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem('user');
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Resume Analysis', path: '/resume-analysis' },
    { name: 'Community', path: '/community' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const dropdownVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  const mobileMenuVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Job Sphere AI
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User/Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="hidden sm:inline font-medium">
                    Hi, {user?.first_name || 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={dropdownVariants}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login-register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-md transition-all"
                >
                  Login/Signup
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              transition={{ type: 'tween' }}
              className="md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg border-l border-gray-100"
            >
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {isLoggedIn ? (
                  <div className="mt-auto mb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                      >
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto mb-4"
                  >
                    <Link
                      to="/login-register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-md"
                    >
                      Login/Signup
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;