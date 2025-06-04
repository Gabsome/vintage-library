import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { BookCard } from '../components/ui/BookCard';
import { FeaturedBook } from '../components/ui/FeaturedBook';
import { OrnateHeading } from '../components/ui/OrnateHeading';
import { Button } from '../components/ui/Button';
import { BookOpen, Users, PenTool } from 'lucide-react';
import { mockBooks, featuredBook } from '../utils/mockData';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  // Get 3 random books
  const randomBooks = [...mockBooks].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-forest-900 bg-wood-texture bg-cover bg-center bg-blend-overlay bg-opacity-90 text-parchment-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                A Digital Haven for <span className="text-gold-900">Book Lovers</span>
              </h1>
              <p className="font-body text-lg md:text-xl mb-8 text-parchment-300 max-w-lg">
                Discover timeless classics and contemporary masterpieces in our beautifully designed vintage reading experience.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/books">
                  <Button size="lg">Explore Library</Button>
                </Link>
                <Link to="/signup/reader">
                  <Button variant="outline" size="lg">Join as Reader</Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gold-900/20 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-sepia-900/20 rounded-full"></div>
                <img 
                  src="https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Vintage library" 
                  className="relative z-10 w-full h-auto rounded-lg shadow-lg border border-gold-900/30"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <OrnateHeading center className="mb-12">Why Choose The Vintage Library?</OrnateHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-parchment-100 p-6 rounded-lg border border-sepia-300 shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-forest-900 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gold-900" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-forest-900">Curated Collection</h3>
              <p className="font-body text-forest-800">
                Discover a carefully curated collection of timeless classics and hidden gems that deserve your attention.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-parchment-100 p-6 rounded-lg border border-sepia-300 shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-forest-900 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gold-900" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-forest-900">Vibrant Community</h3>
              <p className="font-body text-forest-800">
                Join a community of passionate readers who share insights, recommendations, and thoughtful discussions.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-parchment-100 p-6 rounded-lg border border-sepia-300 shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-forest-900 flex items-center justify-center">
                  <PenTool className="h-8 w-8 text-gold-900" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-forest-900">Publisher Platform</h3>
              <p className="font-body text-forest-800">
                Authors and publishers can showcase their works in our beautifully designed vintage-themed platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Book Section */}
      {featuredBook && (
        <section className="py-16 md:py-24 bg-forest-50">
          <div className="container mx-auto px-4">
            <OrnateHeading center className="mb-12">Featured Book of the Month</OrnateHeading>
            <FeaturedBook book={featuredBook} />
          </div>
        </section>
      )}

      {/* Recent Books */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <OrnateHeading>Recent Additions</OrnateHeading>
            <Link to="/books">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {randomBooks.map((book, index) => (
              <motion.div 
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-sepia-900 bg-leather-texture bg-cover bg-center bg-blend-multiply text-parchment-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Are You an Author or Publisher?
            </h2>
            <p className="font-body text-lg md:text-xl mb-8 text-parchment-300 max-w-2xl mx-auto">
              Join our platform to showcase your literary works in our beautifully designed vintage library experience.
            </p>
            <Link to="/signup/publisher">
              <Button size="lg">Become a Publisher</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};