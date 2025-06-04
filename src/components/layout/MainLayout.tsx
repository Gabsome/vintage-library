import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
  bgClass?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  bgClass = 'bg-parchment-500 bg-paper-texture bg-cover bg-fixed'
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};