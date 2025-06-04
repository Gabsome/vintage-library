import React from 'react';
import { Book } from '../../types';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <motion.div 
      className="group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/books/${book.id}`} className="block">
        <div className="relative h-[320px] w-[220px] mx-auto shadow-book rounded overflow-hidden transition-all duration-300 group-hover:shadow-lg">
          {/* Book Cover */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 z-10"></div>
          <img 
            src={book.coverImage} 
            alt={`${book.title} cover`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Book Rating */}
          <div className="absolute top-2 right-2 bg-forest-900/80 text-gold-500 rounded-full px-2 py-1 text-xs flex items-center z-20">
            <Star size={12} className="mr-1" />
            {book.rating.toFixed(1)}
          </div>
          
          {/* Book Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forest-900 to-forest-900/0 text-parchment-500 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <h3 className="font-display text-lg font-bold line-clamp-1 mb-1">{book.title}</h3>
            <p className="font-body text-sm text-parchment-300 line-clamp-1 italic">by {book.author}</p>
          </div>
        </div>
        
        {/* Book Title (visible by default) */}
        <h3 className="mt-3 font-display text-center text-forest-900 group-hover:text-forest-700 transition-colors line-clamp-1">
          {book.title}
        </h3>
      </Link>
    </motion.div>
  );
};