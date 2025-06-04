import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const SignupReader: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(name, email, password, 'reader');
      if (success) {
        navigate('/dashboard');
      } else {
        setError('An error occurred during signup');
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
          className="max-w-xl mx-auto bg-parchment-100 rounded-lg shadow-lg p-8 border border-sepia-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-forest-900 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gold-900" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-forest-900 mb-2">Join as a Reader</h1>
            <p className="font-body text-forest-700">Create your account to start your reading journey</p>
          </div>
          
          {error && (
            <div className="bg-mahogany-100 text-mahogany-800 p-3 rounded-md mb-6 font-body text-sm border border-mahogany-300">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              fullWidth
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              fullWidth
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                fullWidth
                required
              />
              
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                fullWidth
                required
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
                className="mb-4"
              >
                Create Account
              </Button>
              
              <p className="text-center font-body text-forest-700">
                Already have an account?{' '}
                <Link to="/login" className="text-forest-900 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
              
              <div className="mt-6 text-center">
                <p className="font-body text-forest-700">
                  Are you a publisher?{' '}
                  <Link to="/signup/publisher" className="text-forest-900 hover:underline font-medium">
                    Sign up as a publisher
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};