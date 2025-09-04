import api from './api';

export const messageService = {
  // Récupération des messages
  getMessages: async (page = 1, read = null) => {
    const params = new URLSearchParams();
    params.append('page', page);
    if (read !== null) {
      params.append('read', read);
    }
    
    const response = await api.get(`/core/messages/?${params.toString()}`);
    return response.data;
  },

  // Récupération d'un message spécifique
  getMessage: async (messageId) => {
    const response = await api.get(`/core/messages/${messageId}/`);
    return response.data;
  },

  // Suppression d'un message
  deleteMessage: async (messageId) => {
    const response = await api.delete(`/core/messages/${messageId}/delete/`);
    return response.data;
  },

  // Marquer tous les messages comme lus
  markAllAsRead: async () => {
    const response = await api.post('/core/messages/mark-all-read/');
    return response.data;
  },

  // Récupération du nombre de messages non lus
  getUnreadCount: async () => {
    const response = await api.get('/core/messages/unread-count/');
    return response.data;
  },

  // Mise à jour d'un message (marquer comme lu/non lu)
  updateMessage: async (messageId, data) => {
    const response = await api.patch(`/core/messages/${messageId}/`, data);
    return response.data;
  }
};
