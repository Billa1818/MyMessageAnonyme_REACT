import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon, SparklesIcon, ArrowRightIcon, KeyIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({
    email_or_username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.response?.data?.non_field_errors?.[0] || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header avec design moderne */}
        <div className="text-center px-4">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mb-6">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Connexion
          </h2>
          <p className="mt-2 text-gray-600">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Formulaire avec design moderne */}
        <div className="card p-8 mx-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email_or_username" className="form-label">
                Email ou nom d'utilisateur
              </label>
              <input
                id="email_or_username"
                name="email_or_username"
                type="text"
                required
                value={formData.email_or_username}
                onChange={handleChange}
                className="input-field"
                placeholder="Entrez votre email ou nom d'utilisateur"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="Entrez votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200 flex items-center"
                >
                  <KeyIcon className="h-4 w-4 mr-1" />
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner h-5 w-5 mr-2"></div>
                    Connexion...
                  </>
                ) : (
                  <>
                    <ArrowRightIcon className="h-5 w-5 mr-2" />
                    Se connecter
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                >
                  Pas encore de compte ? Créer un compte
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center px-4">
          <p className="text-sm text-gray-600">
            En vous connectant, vous acceptez nos{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              conditions d'utilisation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
