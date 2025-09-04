import api from './api';

export const statisticsService = {
  // Récupération des statistiques
  getStatistics: async () => {
    const response = await api.get('/core/statistics/');
    return response.data;
  }
};
