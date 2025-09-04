import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  KeyIcon, 
  ArrowLeftIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirm: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation côté client
    if (formData.new_password !== formData.new_password_confirm) {
      setError('Les nouveaux mots de passe ne correspondent pas.');
      setIsLoading(false);
      return;
    }

    const passwordValidation = validatePassword(formData.new_password);
    if (!passwordValidation.isValid) {
      setError('Le nouveau mot de passe ne respecte pas les critères de sécurité.');
      setIsLoading(false);
      return;
    }

    try {
      await authService.changePassword(formData);
      setSuccess(true);
      
      // Déconnexion automatique après 3 secondes
      setTimeout(() => {
        logout();
        navigate('/login', { 
          state: { 
            message: 'Mot de passe modifié avec succès. Veuillez vous reconnecter.' 
          } 
        });
      }, 3000);
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      setError(
        error.response?.data?.old_password?.[0] || 
        error.response?.data?.new_password_confirm?.[0] ||
        error.response?.data?.detail || 
        'Erreur lors du changement de mot de passe'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header avec design moderne */}
          <div className="text-center px-4">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircleIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Mot de passe modifié !
            </h2>
            <p className="mt-2 text-gray-600">
              Votre mot de passe a été modifié avec succès
            </p>
          </div>

          {/* Message de confirmation */}
          <div className="card p-8 mx-4">
            <div className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <KeyIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Modification réussie
                </h3>
                <p className="text-green-700 text-sm">
                  Votre mot de passe a été modifié avec succès. Vous allez être déconnecté automatiquement pour des raisons de sécurité.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Prochaines étapes :</strong>
                </p>
                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                  <li>• Vous allez être redirigé vers la page de connexion</li>
                  <li>• Connectez-vous avec votre nouveau mot de passe</li>
                  <li>• Votre session actuelle sera fermée</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login', { 
                      state: { 
                        message: 'Mot de passe modifié avec succès. Veuillez vous reconnecter.' 
                      } 
                    });
                  }}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Se connecter maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const passwordValidation = validatePassword(formData.new_password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header avec design moderne */}
        <div className="text-center px-4">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mb-6">
            <KeyIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Modifier le mot de passe
          </h2>
          <p className="mt-2 text-gray-600">
            Changez votre mot de passe pour plus de sécurité
          </p>
        </div>

        {/* Formulaire avec design moderne */}
        <div className="card p-8 mx-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Ancien mot de passe */}
            <div>
              <label htmlFor="old_password" className="form-label">
                Ancien mot de passe
              </label>
              <div className="relative">
                <input
                  id="old_password"
                  name="old_password"
                  type={showPasswords.old ? 'text' : 'password'}
                  required
                  value={formData.old_password}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="Entrez votre ancien mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility('old')}
                >
                  {showPasswords.old ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label htmlFor="new_password" className="form-label">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  id="new_password"
                  name="new_password"
                  type={showPasswords.new ? 'text' : 'password'}
                  required
                  value={formData.new_password}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="Entrez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Critères de validation */}
              {formData.new_password && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Critères de sécurité :</p>
                  <div className="space-y-1">
                    <div className={`flex items-center text-sm ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.minLength ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      Au moins 8 caractères
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.hasUpperCase ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      Une lettre majuscule
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.hasLowerCase ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      Une lettre minuscule
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.hasNumbers ? 'text-green-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.hasNumbers ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      Un chiffre
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation du nouveau mot de passe */}
            <div>
              <label htmlFor="new_password_confirm" className="form-label">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  id="new_password_confirm"
                  name="new_password_confirm"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  required
                  value={formData.new_password_confirm}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="Confirmez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Vérification de correspondance */}
              {formData.new_password_confirm && (
                <div className="mt-2">
                  {formData.new_password === formData.new_password_confirm ? (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Les mots de passe correspondent
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-red-600">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                      Les mots de passe ne correspondent pas
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !passwordValidation.isValid || formData.new_password !== formData.new_password_confirm}
                className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner h-5 w-5 mr-2"></div>
                    Modification en cours...
                  </>
                ) : (
                  <>
                    <KeyIcon className="h-5 w-5 mr-2" />
                    Modifier le mot de passe
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Retour au profil
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center px-4">
          <p className="text-sm text-gray-600">
            Après la modification, vous serez déconnecté pour des raisons de sécurité
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
