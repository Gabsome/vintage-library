// File: src/pages/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { BookOpen, Settings, Library, BookMarked } from 'lucide-react';
import { TabButton } from '../components/dashboard/TabButton';
import { BookSection } from '../components/dashboard/BookSection';
import { SettingsTab } from '../components/dashboard/SettingsTab';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reading');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userReadingList = books.filter((_, idx) => idx % 3 === 0);
  const userShelf = books.filter((_, idx) => idx % 3 === 1);
  const publishedBooks = books.filter((_, idx) => idx % 3 === 2);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('https://gutendex.com/books');
        const data = await res.json();
        setBooks(data.results);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSaveOffline = (book: any) => {
    const saved = JSON.parse(localStorage.getItem('offlineBooks') || '[]');
    const alreadySaved = saved.find((b: any) => b.id === book.id);
    if (!alreadySaved) {
      localStorage.setItem('offlineBooks', JSON.stringify([...saved, book]));
      alert(`"${book.title}" saved for offline reading.`);
    } else {
      alert(`"${book.title}" is already saved.`);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-forest-900 mb-4">
              Authentication Required
            </h1>
            <p className="font-body text-forest-700 mb-6">
              Please log in to access your dashboard.
            </p>
            <button onClick={() => (window.location.href = '/login')} className="px-4 py-2 bg-forest-700 text-white rounded">
              Go to Login
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-28 pb-16 container mx-auto px-4">
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
                  ? 'Manage your published books'
                  : 'Track your reading journey and discover new books'}
              </p>
            </div>
          </motion.div>

          <div className="border-b border-sepia-300">
            <nav className="flex flex-wrap -mb-px" role="tablist">
              <TabButton label="Currently Reading" icon={<BookOpen size={18} />} tabKey="reading" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="My Bookshelf" icon={<Library size={18} />} tabKey="shelf" activeTab={activeTab} setActiveTab={setActiveTab} />
              {user.role === 'publisher' && (
                <TabButton label="Published Books" icon={<BookMarked size={18} />} tabKey="published" activeTab={activeTab} setActiveTab={setActiveTab} />
              )}
              <TabButton label="Settings" icon={<Settings size={18} />} tabKey="settings" activeTab={activeTab} setActiveTab={setActiveTab} />
            </nav>
          </div>
        </div>

        <div className="min-h-[60vh]">
          {activeTab === 'reading' && <BookSection heading="Currently Reading" books={userReadingList} onSave={handleSaveOffline} />}
          {activeTab === 'shelf' && <BookSection heading="My Bookshelf" books={userShelf} onSave={handleSaveOffline} />}
          {activeTab === 'published' && user.role === 'publisher' && (
            <BookSection heading="Published Books" books={publishedBooks} onSave={handleSaveOffline} />
          )}
          {activeTab === 'settings' && <SettingsTab user={user} />}
        </div>
      </div>
    </MainLayout>
  );
};
