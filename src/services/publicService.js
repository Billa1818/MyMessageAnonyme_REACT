import api from './api';

export const publicService = {
  // Envoi d'un message anonyme
  sendMessage: async (uniqueLink, message) => {
    const response = await api.post('/public/send-message/', {
      content: message,
      recipient_link: uniqueLink
    });
    return response.data;
  },
  
  // Vérification du statut d'un lien (format supporté par l'API)
  checkLink: async (uniqueLink) => {
    const response = await api.get(`/public/check-link/${uniqueLink}/`);
    return response.data;
  },
  
  // Vérification du statut d'un lien avec username (fallback vers l'ancien format)
  checkLinkWithUsername: async (usernameSlug, uniqueLink) => {
    // L'API backend ne supporte que l'ancien format, donc on utilise seulement uniqueLink
    const response = await api.get(`/public/check-link/${uniqueLink}/`);
    return response.data;
  },
  
  // Récupération des informations publiques d'un utilisateur (format supporté)
  getUserInfo: async (uniqueLink) => {
    const response = await api.get(`/public/user/${uniqueLink}/`);
    return response.data;
  },
  
  // Récupération des informations publiques d'un utilisateur avec username (fallback)
  getUserInfoWithUsername: async (usernameSlug, uniqueLink) => {
    // L'API backend ne supporte que l'ancien format, donc on utilise seulement uniqueLink
    const response = await api.get(`/public/user/${uniqueLink}/`);
    return response.data;
  },
  
  // Récupération du nom de l'utilisateur qui reçoit le message
  getUserName: async (uniqueLink) => {
    const response = await api.get(`/public/user-name/${uniqueLink}/`);
    return response.data;
  }
};
