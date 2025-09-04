import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { messageService } from '../services/messageService';
import { statisticsService } from '../services/statisticsService';
import {
  UserIcon,
  EnvelopeIcon,
  LinkIcon,
  ClockIcon,
  ChartBarIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statistics, setStatistics] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [linkStatus, setLinkStatus] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        birth_date: user.birth_date || '',
        gender: user.gender || '',
      });
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [stats, unread] = await Promise.all([
        statisticsService.getStatistics(),
        messageService.getUnreadCount(),
      ]);
      setStatistics(stats);
      setUnreadCount(unread.unread_count);
      setLinkStatus({
        is_active: user?.link_is_active || false,
        expires_at: user?.link_activated_at,
        duration_hours: user?.link_duration_hours || 24,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

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
    setSuccess('');

    try {
      const updatedUser = await authService.updateProfile(formData);
      updateUser(updatedUser);
      setSuccess('Profil mis à jour avec succès');
      setIsEditing(false);
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        const firstError = Object.values(errorData)[0];
        if (Array.isArray(firstError)) {
          setError(firstError[0]);
        } else {
          setError(firstError);
        }
      } else {
        setError('Erreur lors de la mise à jour du profil');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateLink = async (durationHours) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      const response = await authService.activateLink(durationHours);
      
      // Mettre à jour l'utilisateur dans le contexte avec les nouvelles données
      updateUser({
        ...user,
        link_is_active: true,
        link_activated_at: response.link_activated_at,
        link_duration_hours: durationHours,
      });
      
      setSuccess(`Lien activé avec succès pour ${durationHours} heures`);
      loadData();
    } catch (error) {
      console.error('Erreur lors de l\'activation du lien:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.error || 
                          'Erreur lors de l\'activation du lien';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateLink = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      await authService.deactivateLink();
      
      // Mettre à jour l'utilisateur dans le contexte
      updateUser({
        ...user,
        link_is_active: false,
        link_activated_at: null,
        link_duration_hours: null,
      });
      
      setSuccess('Lien désactivé avec succès');
      loadData();
    } catch (error) {
      console.error('Erreur lors de la désactivation du lien:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.error || 
                          'Erreur lors de la désactivation du lien';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Lien copié dans le presse-papiers');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non défini';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Mon profil
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et votre lien unique
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 mx-4">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {/* Informations personnelles */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Informations personnelles
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Modifier
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="btn-primary flex items-center"
                    >
                      <CheckIcon className="h-4 w-4 mr-2" />
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          first_name: user.first_name || '',
                          last_name: user.last_name || '',
                          birth_date: user.birth_date || '',
                          gender: user.gender || '',
                        });
                      }}
                      className="btn-secondary flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-2" />
                      Annuler
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="input-field mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="input-field mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleChange}
                        className="input-field mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Sexe
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="input-field mt-1"
                        required
                      >
                        <option value="">Sélectionnez votre sexe</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                        <option value="O">Autre</option>
                      </select>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Prénom</label>
                      <p className="mt-1 text-gray-900">{user?.first_name || 'Non défini'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <p className="mt-1 text-gray-900">{user?.last_name || 'Non défini'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                      <p className="mt-1 text-gray-900">{formatDate(user?.birth_date)}</p>
                      {user?.birth_date && (
                        <p className="text-sm text-gray-500">
                          Âge: {calculateAge(user.birth_date)} ans
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sexe</label>
                      <p className="mt-1 text-gray-900">
                        {user?.gender === 'M' ? 'Masculin' : 
                         user?.gender === 'F' ? 'Féminin' : 
                         user?.gender === 'O' ? 'Autre' : 'Non défini'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{user?.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                    <p className="mt-1 text-gray-900">{user?.username}</p>
                  </div>
                </div>
              )}

              {/* Section Sécurité */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <KeyIcon className="h-5 w-5 mr-2" />
                      Sécurité
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Gérez votre mot de passe et la sécurité de votre compte
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/change-password')}
                    className="btn-secondary flex items-center"
                  >
                    <KeyIcon className="h-4 w-4 mr-2" />
                    Modifier le mot de passe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lien unique et statistiques */}
          <div className="space-y-6">
            {/* Lien unique */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <LinkIcon className="h-5 w-5 mr-2" />
                Lien unique
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut du lien
                  </label>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      user?.link_is_active ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm text-gray-900">
                      {user?.link_is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>

                {user?.link_is_active && user?.link_activated_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expire le
                    </label>
                    <p className="text-sm text-gray-600">
                      {new Date(user.link_activated_at).toLocaleString('fr-FR')}
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre lien public
                  </label>
                  <code className="text-xs text-gray-800 break-all block mb-2">
                    {window.location.origin}/message/{user?.username}/{user?.unique_link}/
                  </code>
                  <button
                    onClick={() => copyToClipboard(`${window.location.origin}/message/${user?.username}/${user?.unique_link}/`)}
                    className="btn-secondary text-xs"
                  >
                    Copier le lien
                  </button>
                </div>

                <div className="space-y-2">
                  {!user?.link_is_active ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activer le lien pour
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[6, 12, 24, 48].map((hours) => (
                          <button
                            key={hours}
                            onClick={() => handleActivateLink(hours)}
                            disabled={isLoading}
                            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? '...' : `${hours}h`}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleDeactivateLink}
                      disabled={isLoading}
                      className="btn-danger w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Désactivation...' : 'Désactiver le lien'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Statistiques */}
            {statistics && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Statistiques
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Messages reçus</span>
                    <span className="text-sm font-medium text-gray-900">
                      {statistics.total_messages || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Messages lus</span>
                    <span className="text-sm font-medium text-gray-900">
                      {statistics.read_messages || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Messages non lus</span>
                    <span className="text-sm font-medium text-red-600">
                      {unreadCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Réponses automatiques</span>
                    <span className="text-sm font-medium text-gray-900">
                      {statistics.auto_responses || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Activations de lien</span>
                    <span className="text-sm font-medium text-gray-900">
                      {statistics.link_activation_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
