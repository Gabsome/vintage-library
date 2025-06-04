import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { BookText } from 'lucide-react';

export const SignupPublisher: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword || !bio) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(name, email, password, 'publisher');
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
          className="max-w-2xl mx-auto bg-parchment-100 rounded-lg shadow-lg p-8 border border-sepia-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-forest-900 flex items-center justify-center">
              <BookText className="h-8 w-8 text-gold-900" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-forest-900 mb-2">Join as a Publisher</h1>
            <p className="font-body text-forest-700">Create your account to showcase your literary works</p>
          </div>
          
          {error && (
            <div className="bg-mahogany-100 text-mahogany-800 p-3 rounded-md mb-6 font-body text-sm border border-mahogany-300">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Publishing House / Author Name *"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vintage Classics Publishing"
                  fullWidth
                  required
                />
                
                <Input
                  label="Email Address *"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="publishing@example.com"
                  fullWidth
                  required
                />
                
                <Input
                  label="Password *"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  fullWidth
                  required
                />
                
                <Input
                  label="Confirm Password *"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  fullWidth
                  required
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="bio" 
                    className="block text-sm font-medium text-forest-900 mb-1 font-body"
                  >
                    Biography / About *
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about your publishing house or yourself as an author..."
                    className="w-full rounded-md border bg-parchment-100 border-sepia-300 py-2 px-3 shadow-sm focus:border-gold-900 focus:outline-none focus:ring-1 focus:ring-gold-900 font-body h-32"
                    required
                  />
                </div>
                
                <Input
                  label="Website (Optional)"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  fullWidth
                />
                
                <div>
                  <p className="text-sm text-forest-700 italic">
                    * Required fields
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
                className="mb-4"
              >
                Create Publisher Account
              </Button>
              
              <p className="text-center font-body text-forest-700">
                Already have an account?{' '}
                <Link to="/login" className="text-forest-900 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
              
              <div className="mt-6 text-center">
                <p className="font-body text-forest-700">
                  Looking to join as a reader?{' '}
                  <Link to="/signup/reader" className="text-forest-900 hover:underline font-medium">
                    Sign up as a reader
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