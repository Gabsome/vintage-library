import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-900 text-parchment-500 py-12 border-t border-gold-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-gold-900" />
              <span className="font-display text-xl font-bold">The Vintage Library</span>
            </div>
            <p className="font-body text-parchment-300 max-w-xs">
              A digital haven for book lovers, combining the charm of vintage aesthetics with modern reading convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg mb-4 text-gold-900">Quick Links</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link to="/" className="text-parchment-300 hover:text-gold-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-parchment-300 hover:text-gold-500 transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/signup/reader" className="text-parchment-300 hover:text-gold-500 transition-colors">
                  Join as Reader
                </Link>
              </li>
              <li>
                <Link to="/signup/publisher" className="text-parchment-300 hover:text-gold-500 transition-colors">
                  Join as Publisher
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4 text-gold-900">Contact Us</h3>
            <div className="space-y-2 font-body">
              <a 
                href="mailto:info@vintagelibrary.com" 
                className="flex items-center space-x-2 text-parchment-300 hover:text-gold-500 transition-colors"
              >
                <Mail size={18} />
                <span>info@vintagelibrary.com</span>
              </a>
              <a 
                href="https://github.com" 
                className="flex items-center space-x-2 text-parchment-300 hover:text-gold-500 transition-colors"
              >
                <Github size={18} />
                <span>Visit our Repository</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-forest-700 text-center font-body text-parchment-300">
          <p>&copy; {new Date().getFullYear()} The Vintage Library. All rights reserved. Gabsome-X.</p>
        </div>
      </div>
    </footer>
  );
};