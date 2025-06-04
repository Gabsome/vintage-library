import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <motion.div 
          className="max-w-md mx-auto bg-parchment-100 rounded-lg shadow-lg p-8 border border-sepia-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-forest-900 mb-2">Welcome Back</h1>
            <p className="font-body text-forest-700">Sign in to continue your reading journey</p>
          </div>
          
          {error && (
            <div className="bg-mahogany-100 text-mahogany-800 p-3 rounded-md mb-6 font-body text-sm border border-mahogany-300">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                fullWidth
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                fullWidth
                required
              />
              
              <div className="text-right">
                <a href="#" className="text-sm text-forest-700 hover:text-forest-900 font-body">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
              className="mb-4"
            >
              Sign In
            </Button>
            
            <p className="text-center font-body text-forest-700">
              Don't have an account?{' '}
              <Link to="/signup/reader" className="text-forest-900 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};