import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { BookCard } from '../components/ui/BookCard';
import { OrnateHeading } from '../components/ui/OrnateHeading';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Search, Filter } from 'lucide-react';
import { mockBooks } from '../utils/mockData';
import { motion } from 'framer-motion';

export const BrowseBooks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  
  // Extract unique genres from books
  const allGenres = Array.from(
    new Set(mockBooks.flatMap(book => book.genre))
  ).sort();
  
  // Filter books based on search term and selected genre
  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre.includes(selectedGenre) : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <OrnateHeading center>Browse Our Collection</OrnateHeading>
            <p className="font-body text-forest-700 mt-4 max-w-2xl mx-auto">
              Explore our carefully curated collection of timeless classics and contemporary masterpieces.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-parchment-100 rounded-lg shadow-md p-6 mb-12 border border-sepia-300">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-forest-700" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="md:w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Filter className="h-5 w-5 text-forest-700" />
                  </div>
                  <select
                    className="pl-10 w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body appearance-none"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                  >
                    <option value="">All Genres</option>
                    {allGenres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-forest-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Books Grid */}
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-forest-900 mb-6">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Found
            </h2>
            
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                {filteredBooks.map((book, index) => (
                  <motion.div 
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex justify-center"
                  >
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-body text-forest-700 text-lg mb-4">No books found matching your criteria.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};