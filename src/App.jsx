import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PasswordResetRedirect from './pages/PasswordResetRedirect';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import ChangePassword from './pages/ChangePassword';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import SendMessage from './pages/SendMessage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<PasswordResetRedirect />} />
            <Route path="/reset-password-confirm" element={<ResetPasswordConfirm />} />
            
            {/* Route pour les liens de message avec username et unique_link */}
            <Route path="/message/:username/:uniqueLink" element={<SendMessage />} />
            
            {/* Route pour les anciens liens (sans username) */}
            <Route path="/send-message/:link" element={<SendMessage />} />
            
            {/* Routes protégées */}
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/change-password" element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            } />
            
            {/* Route de fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Page non trouvée</p>
                  <a href="/" className="btn-primary">
                    Retour à l'accueil
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
