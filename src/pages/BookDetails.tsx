import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { OrnateHeading } from '../components/ui/OrnateHeading';
import { Star, Calendar, BookOpen, User, Clock } from 'lucide-react';
import { mockBooks } from '../utils/mockData';
import { motion } from 'framer-motion';
import { Book } from '../types';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  useEffect(() => {
    // Simulate API call to fetch book details
    const fetchBook = () => {
      setLoading(true);
      setTimeout(() => {
        const foundBook = mockBooks.find(b => b.id === id);
        if (foundBook) {
          setBook(foundBook);
        }
        setLoading(false);
      }, 500);
    };
    
    fetchBook();
  }, [id]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-forest-900 font-display text-2xl">
            Loading book details...
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!book) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-bold text-forest-900 mb-4">Book Not Found</h1>
            <p className="font-body text-forest-700 mb-8">
              We couldn't find the book you're looking for.
            </p>
            <Link to="/books">
              <Button>Return to Books</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Book Overview */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Book Cover */}
            <motion.div 
              className="lg:w-1/3 flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-[250px] h-[375px] shadow-book rounded-md overflow-hidden border-4 border-gold-900/20">
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Book Details */}
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                {book.genre.map((genre, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-forest-800 text-parchment-500 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl font-bold text-forest-900 mb-2">
                {book.title}
              </h1>
              
              <p className="font-body text-xl text-forest-700 italic mb-4">
                by {book.author}
              </p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={20}
                      className={`${star <= book.rating ? 'text-gold-900 fill-gold-900' : 'text-gold-900/30'} mr-1`}
                    />
                  ))}
                </div>
                <span className="text-forest-700 ml-2">
                  {book.rating.toFixed(1)} ({book.reviews.length} {book.reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-forest-700">
                  <Calendar size={18} />
                  <span>{new Date(book.publishedDate).getFullYear()}</span>
                </div>
                <div className="flex items-center space-x-2 text-forest-700">
                  <BookOpen size={18} />
                  <span>268 pages</span>
                </div>
                <div className="flex items-center space-x-2 text-forest-700">
                  <Clock size={18} />
                  <span>~4.5 hours</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-display font-bold text-xl text-forest-900 mb-2">Description</h3>
                <p className="font-body text-forest-800 leading-relaxed">
                  {book.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setIsReading(!isReading)} 
                  variant={isReading ? "secondary" : "primary"}
                  size="lg"
                >
                  {isReading ? 'Continue Reading' : 'Start Reading'}
                </Button>
                <Button variant="outline" size="lg">
                  Add to Shelf
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Book Preview */}
          {isReading && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <OrnateHeading className="mb-6">Reading {book.title}</OrnateHeading>
              <div className="bg-parchment-100 border border-sepia-300 rounded-lg p-8 shadow-md font-body text-forest-900 leading-relaxed">
                <p className="text-center font-display text-xl mb-6">{book.title}</p>
                <p className="text-center font-body italic mb-12">by {book.author}</p>
                
                <p className="mb-4 indent-8">
                  It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.
                </p>
                <p className="mb-4 indent-8">
                  However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.
                </p>
                <p className="mb-4 indent-8">
                  "My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"
                </p>
                <p className="mb-4 indent-8">
                  Mr. Bennet replied that he had not.
                </p>
                <p className="mb-4 indent-8">
                  "But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."
                </p>
                <p className="text-center my-8">* * *</p>
                <p className="text-center text-forest-700 italic">
                  Continue reading by signing up for a full account.
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Reviews Section */}
          <div>
            <OrnateHeading className="mb-6">Reviews & Ratings</OrnateHeading>
            
            {/* Rate this book */}
            <div className="bg-parchment-100 border border-sepia-300 rounded-lg p-6 shadow-md mb-8">
              <h3 className="font-display font-bold text-lg text-forest-900 mb-4">Rate this book</h3>
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      size={24}
                      className={`${(hoverRating || rating) >= star ? 'text-gold-900 fill-gold-900' : 'text-gold-900/30'}`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-forest-700">
                  {rating > 0 ? `You rated this ${rating} ${rating === 1 ? 'star' : 'stars'}` : 'Click to rate'}
                </span>
              </div>
              <textarea
                placeholder="Write your review..."
                className="w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body h-24 mb-4"
              />
              <Button>Submit Review</Button>
            </div>
            
            {/* Reviews List */}
            {book.reviews.length > 0 ? (
              <div className="space-y-6">
                {book.reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-parchment-50 border border-sepia-200 rounded-lg p-6 shadow-sm"
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-forest-900 rounded-full flex items-center justify-center text-parchment-500">
                          <User size={20} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display font-bold text-forest-900">{review.userName}</h4>
                          <span className="text-sm text-forest-700">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              size={16}
                              className={`${star <= review.rating ? 'text-gold-900 fill-gold-900' : 'text-gold-900/30'} mr-0.5`}
                            />
                          ))}
                        </div>
                        
                        <p className="font-body text-forest-800">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-parchment-50 border border-sepia-200 rounded-lg">
                <p className="font-body text-forest-700 mb-2">No reviews yet.</p>
                <p className="font-body text-forest-700">Be the first to leave a review!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};