import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
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
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="nav-header">
      <nav className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <h1 className="logo-text">
              Job <span className="text-gradient">Sphere</span> AI
            </h1>
          </Link>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/resume-analysis" className="nav-link">
                <span>Resume Analysis</span>
              </Link>
            </li>
            <li>
              <Link to="/community" className="nav-link">
                <span>Community</span>
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="nav-link">
                <span>Feedback</span>
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="nav-link">
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="dropdown-toggle flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open dropdown menu</span>
                <UserIcon className="w-6 h-6 text-gray-700" />
                <span className="hidden sm:block">
                  Hi, {user?.first_name || 'Sample'} {user?.last_name || 'Customer'}
                </span>
              </button>
              <div
                className={`dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ${
                  isMenuOpen ? '' : 'hidden'
                }`}
              >
                <Link
                  to="/dashboard"
                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <Link

                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link
              to="/login-register"
              className="login-button px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Login/Signup
            </Link>
          )}
          <Bars3Icon
            onClick={toggleMenu}
            className={`menu-toggle w-6 h-6 text-gray-700 hover:text-gray-900 ${isMenuOpen ? 'hidden' : ''}`}
          />
          <XMarkIcon
            onClick={toggleMenu}
            className={`menu-toggle w-6 h-6 text-gray-700 hover:text-gray-900 ${isMenuOpen ? '' : 'hidden'}`}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;