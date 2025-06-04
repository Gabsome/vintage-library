import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignupReader } from './pages/SignupReader';
import { SignupPublisher } from './pages/SignupPublisher';
import { BookDetails } from './pages/BookDetails';
import { BrowseBooks } from './pages/BrowseBooks';
import { Dashboard } from './pages/Dashboard';
import UploadBook from './UploadBook'; 
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/reader" element={<SignupReader />} />
          <Route path="/signup/publisher" element={<SignupPublisher />} />
          <Route path="/books" element={<BrowseBooks />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;