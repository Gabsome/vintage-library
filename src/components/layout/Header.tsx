import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, LogIn, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerClass = isScrolled
    ? 'bg-forest-900 shadow-lg transition-all duration-300'
    : 'bg-transparent transition-all duration-300';

  return (
    <header className={`${headerClass} fixed w-full z-50 py-4`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-gold-900" />
          <motion.span 
            className="font-display text-xl md:text-2xl font-bold text-parchment-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Vintage Library
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/books" className="text-parchment-500 hover:text-gold-900 transition-colors font-body">
            Browse Books
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-parchment-500 hover:text-gold-900 transition-colors font-body">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="bg-forest-700 hover:bg-forest-800 text-parchment-500 px-4 py-2 rounded border border-gold-900 font-body"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-parchment-500 hover:text-gold-900 transition-colors font-body">
                Login
              </Link>
              <Link 
                to="/signup/reader"
                className="bg-forest-700 hover:bg-forest-800 text-parchment-500 px-4 py-2 rounded border border-gold-900 font-body"
              >
                Join Now
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-parchment-500 hover:text-gold-900"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-forest-900 border-t border-gold-900/30 py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/books" className="text-parchment-500 hover:text-gold-900 py-2 font-body">
              Browse Books
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-parchment-500 hover:text-gold-900 py-2 font-body">
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="bg-forest-700 hover:bg-forest-800 text-parchment-500 px-4 py-2 rounded border border-gold-900 font-body text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-parchment-500 hover:text-gold-900 py-2 font-body">
                  Login
                </Link>
                <Link 
                  to="/signup/reader"
                  className="bg-forest-700 hover:bg-forest-800 text-parchment-500 px-4 py-2 rounded border border-gold-900 font-body"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};