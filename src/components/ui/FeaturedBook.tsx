import React from 'react';
import { Book } from '../../types';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedBookProps {
  book: Book;
}

export const FeaturedBook: React.FC<FeaturedBookProps> = ({ book }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg bg-forest-900 border border-gold-900/30">
      <div className="absolute top-0 right-0 bg-gold-900 text-forest-900 py-1 px-4 font-display font-bold tracking-wide z-10">
        Book of the Month
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Book Cover (Left Side) */}
        <motion.div 
          className="md:w-1/3 h-[300px] md:h-auto relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/5"></div>
          <img 
            src={book.coverImage} 
            alt={`${book.title} cover`} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Book Details (Right Side) */}
        <motion.div 
          className="md:w-2/3 p-6 md:p-8 text-parchment-500"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex items-center text-gold-900">
              <Star size={18} className="fill-gold-900" />
              <Star size={18} className="fill-gold-900" />
              <Star size={18} className="fill-gold-900" />
              <Star size={18} className="fill-gold-900" />
              <Star size={18} className={book.rating >= 4.8 ? "fill-gold-900" : "text-gold-900/30"} />
            </div>
            <span className="text-parchment-300 text-sm">({book.rating.toFixed(1)})</span>
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{book.title}</h2>
          <p className="font-body text-parchment-300 italic mb-4">by {book.author}</p>
          
          <div className="mb-4 flex items-center text-sm text-parchment-300">
            <Clock size={16} className="mr-1" />
            <span>Published {new Date(book.publishedDate).getFullYear()}</span>
            <span className="mx-2">•</span>
            <span>{book.genre.join(', ')}</span>
          </div>
          
          <p className="font-body text-parchment-300 mb-6 line-clamp-3 md:line-clamp-4">
            {book.description}
          </p>
          
          <div className="flex space-x-4">
            <Link to={`/books/${book.id}`}>
              <Button variant="primary">Read Now</Button>
            </Link>
            <Button variant="outline">Add to Shelf</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};