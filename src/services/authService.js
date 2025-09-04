import api from './api';

export const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/accounts/register/', userData);
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/accounts/login/', credentials);
    return response.data;
  },

  // Déconnexion de toutes les sessions
  logoutAll: async () => {
    const response = await api.post('/accounts/logout-all/');
    return response.data;
  },

  // Changement de mot de passe
  changePassword: async (passwordData) => {
    const response = await api.post('/accounts/change-password/', passwordData);
    return response.data;
  },

  // Suppression de compte
  deleteAccount: async (password) => {
    const response = await api.post('/accounts/delete-account/', { password });
    return response.data;
  },

  // Récupération de mot de passe
  requestPasswordReset: async (email) => {
    const response = await api.post('/accounts/password-reset/', { email });
    return response.data;
  },

  // Confirmation de récupération de mot de passe
  confirmPasswordReset: async (resetData) => {
    const response = await api.post('/accounts/password-reset/confirm/', resetData);
    return response.data;
  },

  // Récupération du profil
  getProfile: async () => {
    const response = await api.get('/accounts/profile/');
    return response.data;
  },

  // Mise à jour du profil
  updateProfile: async (profileData) => {
    const response = await api.put('/accounts/profile/update/', profileData);
    return response.data;
  },

  // Activation du lien
  activateLink: async (durationHours) => {
    const response = await api.post('/accounts/link/activate/', { duration_hours: durationHours });
    return response.data;
  },

  // Désactivation du lien
  deactivateLink: async () => {
    const response = await api.post('/accounts/link/deactivate/');
    return response.data;
  },

  // Récupération des sessions
  getSessions: async () => {
    const response = await api.get('/accounts/sessions/');
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await api.post('/accounts/token/refresh/', { refresh: refreshToken });
    return response.data;
  }
};
