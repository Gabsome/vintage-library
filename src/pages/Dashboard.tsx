import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { BookCard } from '../components/ui/BookCard';
import { OrnateHeading } from '../components/ui/OrnateHeading';
import { Button } from '../components/ui/Button';
import { Upload, BookOpen, Settings, Library, BookMarked } from 'lucide-react';
import { mockBooks } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reading');
  
  // In a real app, we'd fetch this data from an API
  const userReadingList = mockBooks.slice(0, 2);
  const userShelf = mockBooks.slice(2, 5);
  const publishedBooks = user?.role === 'publisher' ? mockBooks.filter(book => book.publisherId === user.id) : [];
  
  if (!user) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-forest-900 mb-4">Authentication Required</h1>
            <p className="font-body text-forest-700 mb-6">
              Please log in to access your dashboard.
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="mb-12">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-forest-900 mb-2">
                  Welcome, {user.name}
                </h1>
                <p className="font-body text-forest-700">
                  {user.role === 'publisher' 
                    ? 'Manage your published books and upload new ones'
                    : 'Track your reading journey and discover new books'}
                </p>
              </div>
              
              {user.role === 'publisher' && (
                <Button className="mt-4 md:mt-0">
                  <Upload size={18} className="mr-2" />
                  Upload New Book
                </Button>
              )}
            </motion.div>
            
            {/* Dashboard Tabs */}
            <div className="border-b border-sepia-300">
              <nav className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('reading')}
                  className={`inline-flex items-center py-4 px-1 mr-8 border-b-2 font-medium text-sm ${
                    activeTab === 'reading'
                      ? 'border-forest-900 text-forest-900'
                      : 'border-transparent text-forest-600 hover:text-forest-800 hover:border-forest-300'
                  }`}
                >
                  <BookOpen size={18} className="mr-2" />
                  Currently Reading
                </button>
                
                <button
                  onClick={() => setActiveTab('shelf')}
                  className={`inline-flex items-center py-4 px-1 mr-8 border-b-2 font-medium text-sm ${
                    activeTab === 'shelf'
                      ? 'border-forest-900 text-forest-900'
                      : 'border-transparent text-forest-600 hover:text-forest-800 hover:border-forest-300'
                  }`}
                >
                  <Library size={18} className="mr-2" />
                  My Bookshelf
                </button>
                
                {user.role === 'publisher' && (
                  <button
                    onClick={() => setActiveTab('published')}
                    className={`inline-flex items-center py-4 px-1 mr-8 border-b-2 font-medium text-sm ${
                      activeTab === 'published'
                        ? 'border-forest-900 text-forest-900'
                        : 'border-transparent text-forest-600 hover:text-forest-800 hover:border-forest-300'
                    }`}
                  >
                    <BookMarked size={18} className="mr-2" />
                    Published Books
                  </button>
                )}
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-forest-900 text-forest-900'
                      : 'border-transparent text-forest-600 hover:text-forest-800 hover:border-forest-300'
                  }`}
                >
                  <Settings size={18} className="mr-2" />
                  Settings
                </button>
              </nav>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[60vh]">
            {/* Currently Reading */}
            {activeTab === 'reading' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <OrnateHeading className="mb-8">Currently Reading</OrnateHeading>
                {userReadingList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {userReadingList.map((book, index) => (
                      <motion.div 
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex justify-center"
                      >
                        <BookCard book={book} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-parchment-50 rounded-lg border border-sepia-200">
                    <p className="font-body text-forest-700 mb-4">
                      You're not reading any books right now.
                    </p>
                    <Button onClick={() => window.location.href = '/books'}>
                      Browse Books
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* My Bookshelf */}
            {activeTab === 'shelf' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <OrnateHeading className="mb-8">My Bookshelf</OrnateHeading>
                {userShelf.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {userShelf.map((book, index) => (
                      <motion.div 
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex justify-center"
                      >
                        <BookCard book={book} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-parchment-50 rounded-lg border border-sepia-200">
                    <p className="font-body text-forest-700 mb-4">
                      Your bookshelf is empty.
                    </p>
                    <Button onClick={() => window.location.href = '/books'}>
                      Add Books to Shelf
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Published Books (Publishers Only) */}
            {activeTab === 'published' && user.role === 'publisher' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <OrnateHeading className="mb-8">Your Published Books</OrnateHeading>
                {publishedBooks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {publishedBooks.map((book, index) => (
                      <motion.div 
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex justify-center"
                      >
                        <BookCard book={book} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-parchment-50 rounded-lg border border-sepia-200">
                    <p className="font-body text-forest-700 mb-4">
                      You haven't published any books yet.
                    </p>
                    <Button>
                      <Upload size={18} className="mr-2" />
                      Upload Your First Book
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Settings */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <OrnateHeading className="mb-8">Account Settings</OrnateHeading>
                <div className="bg-parchment-100 rounded-lg shadow-md p-6 border border-sepia-300">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-forest-900 mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-forest-900 mb-1 font-body">
                            Name
                          </label>
                          <input
                            type="text"
                            value={user.name}
                            className="w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-900 mb-1 font-body">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            className="w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {user.role === 'publisher' && (
                      <div>
                        <h3 className="font-display text-xl font-bold text-forest-900 mb-4">Publisher Information</h3>
                        <div>
                          <label className="block text-sm font-medium text-forest-900 mb-1 font-body">
                            Biography
                          </label>
                          <textarea
                            value={user.bio || ''}
                            className="w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body h-32"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-display text-xl font-bold text-forest-900 mb-4">Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-forest-900 mb-1 font-body">
                            Current Password
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-900 mb-1 font-body">
                            New Password
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border bg-white border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};