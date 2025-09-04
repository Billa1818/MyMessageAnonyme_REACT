import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { SparklesIcon, ArrowLeftIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      // Même en cas d'erreur, on affiche le message de succès
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header avec design moderne */}
          <div className="text-center px-4">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircleIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Email envoyé !
            </h2>
            <p className="mt-2 text-gray-600">
              Vérifiez votre boîte de réception
            </p>
          </div>

          {/* Message de confirmation */}
          <div className="card p-8 mx-4">
            <div className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <EnvelopeIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Email de réinitialisation envoyé
                </h3>
                <p className="text-green-700 text-sm">
                  Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Instructions :</strong>
                </p>
                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                  <li>• Vérifiez votre boîte de réception</li>
                  <li>• Consultez aussi vos spams</li>
                  <li>• Cliquez sur le lien dans l'email</li>
                  <li>• Créez un nouveau mot de passe</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  to="/login"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Retour à la connexion
                </Link>
                
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Envoyer un autre email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header avec design moderne */}
        <div className="text-center px-4">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mb-6">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Mot de passe oublié
          </h2>
          <p className="mt-2 text-gray-600">
            Entrez votre email pour recevoir un lien de réinitialisation
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
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Entrez votre adresse email"
              />
              <p className="mt-2 text-sm text-gray-500">
                Nous vous enverrons un lien pour réinitialiser votre mot de passe
              </p>
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
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    Envoyer le lien
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Retour à la connexion
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center px-4">
          <p className="text-sm text-gray-600">
            Vous vous souvenez de votre mot de passe ?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-500">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
