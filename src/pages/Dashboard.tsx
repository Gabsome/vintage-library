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

  // Controlled form state for settings tab
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Sample data slices
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

  const handleSaveSettings = () => {
    // TODO: Connect with API to save updated user info
    alert('Save settings clicked - functionality not yet implemented.');
  };

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
                <Button 
                  className="mt-4 md:mt-0"
                  onClick={() => window.location.href = '/upload'}
                >
                  <Upload size={18} className="mr-2" />
                  Upload New Book
                </Button>
              )}
            </motion.div>
            
            {/* Dashboard Tabs */}
            <div className="border-b border-sepia-300">
              <nav className="flex flex-wrap -mb-px" role="tablist">
                <button
                  onClick={() => setActiveTab('reading')}
                  aria-current={activeTab === 'reading' ? 'page' : undefined}
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
                  aria-current={activeTab === 'shelf' ? 'page' : undefined}
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
                    aria-current={activeTab === 'published' ? 'page' : undefined}
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
                  aria-current={activeTab === 'settings' ? 'page' : undefined}
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
                      Explore Books
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Published Books (Publisher only) */}
            {activeTab === 'published' && user.role === 'publisher' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <OrnateHeading className="mb-8">Published Books</OrnateHeading>
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
                    <Button onClick={() => window.location.href = '/upload'}>
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
                className="max-w-xl"
              >
                <OrnateHeading className="mb-8">Settings</OrnateHeading>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSaveSettings();
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-forest-900 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="block w-full rounded border border-sepia-300 px-3 py-2 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-forest-900 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="block w-full rounded border border-sepia-300 px-3 py-2 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-forest-900 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      className="block w-full rounded border border-sepia-300 px-3 py-2 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      rows={3}
                    />
                  </div>
                  
                  <fieldset>
                    <legend className="text-sm font-medium text-forest-900 mb-2">Change Password</legend>
                    <div className="mb-4">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-forest-900 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="block w-full rounded border border-sepia-300 px-3 py-2 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-forest-900 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="block w-full rounded border border-sepia-300 px-3 py-2 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      />
                    </div>
                  </fieldset>
                  
                  <Button type="submit" className="mt-4">
                    Save Changes
                  </Button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
