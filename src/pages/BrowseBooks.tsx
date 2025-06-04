import React, { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { BookCard } from '../components/ui/BookCard';
import { OrnateHeading } from '../components/ui/OrnateHeading';
import { Button } from '../components/ui/Button';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string }[];
  subjects: string[];  // genres
  // add other fields if needed
}

export const BrowseBooks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [books, setBooks] = useState<GutendexBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch books from API with pagination
  const fetchBooks = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);

    // Build URL with pagination and filters
    let url = `https://gutendex.com/books/?page=${pageNum}`;
    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }
    if (selectedGenre) {
      url += `&topic=${encodeURIComponent(selectedGenre)}`; // Gutendex uses topic param for subjects/genres
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();

      if (pageNum === 1) {
        setBooks(data.results);
      } else {
        setBooks(prev => [...prev, ...data.results]);
      }
      setHasMore(Boolean(data.next)); // API sends 'next' if there is a next page
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [searchTerm, selectedGenre]);

  // Initial load and refetch on search/genre change
  useEffect(() => {
    setPage(1);
    fetchBooks(1);
  }, [fetchBooks]);

  // Infinite scroll handler
  useEffect(() => {
    if (!hasMore || loading) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  // Fetch next page when page state changes (except initial)
  useEffect(() => {
    if (page === 1) return;
    fetchBooks(page);
  }, [page, fetchBooks]);

  // Extract all unique genres from loaded books for filter dropdown
  const allGenres = Array.from(
    new Set(books.flatMap(book => book.subjects))
  ).sort();

  // Client-side filtering of loaded books (optional, but minimal since we query API filtered)
  const filteredBooks = books.filter(book => {
    const searchText = searchTerm.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(searchText) ||
      book.authors.some(a => a.name.toLowerCase().includes(searchText));

    const matchesGenre = selectedGenre ? book.subjects.includes(selectedGenre) : true;

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
                    onChange={e => setSearchTerm(e.target.value)}
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
                    onChange={e => setSelectedGenre(e.target.value)}
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
                    <BookCard
                      book={{
                        id: book.id,
                        title: book.title,
                        author: book.authors.map(a => a.name).join(', '),
                        genre: book.subjects,
                      }}
                    />
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
                    setPage(1);
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {loading && (
              <div className="text-center py-8 font-body text-forest-700">
                Loading more books...
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
