import React, { useState, useEffect } from 'react';
import { messageService } from '../services/messageService';
import { useAuth } from '../contexts/AuthContext';
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  TrashIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  FunnelIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  FireIcon,
  StarIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadMessages = async (page = 1, readFilter = null) => {
    try {
      setIsLoading(true);
      const response = await messageService.getMessages(page, readFilter);
      setMessages(response.results);
      setTotalPages(Math.ceil(response.count / 20));
      setCurrentPage(page);
    } catch (error) {
      setError('Erreur lors du chargement des messages');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await messageService.getUnreadCount();
      setUnreadCount(response.unread_count);
    } catch (error) {
      console.error('Erreur lors du chargement du compteur:', error);
    }
  };

  useEffect(() => {
    loadMessages(1, filter);
    loadUnreadCount();
  }, [filter]);

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      await messageService.deleteMessage(messageId);
      setMessages(messages.filter(msg => msg.id !== messageId));
      loadUnreadCount();
    } catch (error) {
      setError('Erreur lors de la suppression du message');
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await messageService.updateMessage(messageId, { is_read: true });
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, is_read: true } : msg
      ));
      loadUnreadCount();
    } catch (error) {
      setError('Erreur lors de la mise à jour du message');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await messageService.markAllAsRead();
      setMessages(messages.map(msg => ({ ...msg, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      setError('Erreur lors du marquage des messages');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Il y a quelques minutes';
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)}h`;
    } else if (diffInHours < 48) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  const getMessagePreview = (content) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  const getMessageTypeIcon = (content) => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('amour') || lowerContent.includes('❤️') || lowerContent.includes('love')) {
      return <HeartIcon className="h-5 w-5 text-pink-500" />;
    } else if (lowerContent.includes('félicitation') || lowerContent.includes('bravo') || lowerContent.includes('🎉')) {
      return <GiftIcon className="h-5 w-5 text-yellow-500" />;
    } else if (lowerContent.includes('urgent') || lowerContent.includes('important')) {
      return <FireIcon className="h-5 w-5 text-red-500" />;
    } else {
      return <EnvelopeIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getMessageTypeColor = (content) => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('amour') || lowerContent.includes('❤️') || lowerContent.includes('love')) {
      return 'from-pink-500 to-rose-500';
    } else if (lowerContent.includes('félicitation') || lowerContent.includes('bravo') || lowerContent.includes('🎉')) {
      return 'from-yellow-500 to-orange-500';
    } else if (lowerContent.includes('urgent') || lowerContent.includes('important')) {
      return 'from-red-500 to-pink-500';
    } else {
      return 'from-blue-500 to-purple-500';
    }
  };

  // Fonction pour trier les messages : non lus en haut, lus en bas
  const sortMessages = (messages) => {
    return [...messages].sort((a, b) => {
      // Si les deux ont le même statut de lecture, trier par date (plus récent en premier)
      if (a.is_read === b.is_read) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      // Les messages non lus (is_read = false) viennent avant les lus (is_read = true)
      return a.is_read - b.is_read;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="loading-spinner h-16 w-16 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de vos messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Header avec design moderne */}
        <div className="mb-8 px-4">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
              <EnvelopeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mes messages
              </h1>
              <p className="text-gray-600">
                Gérez vos messages anonymes reçus
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques et actions avec design moderne */}
        <div className="card p-6 mb-6 mx-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-6 mb-4 lg:mb-0">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-semibold text-gray-900">{messages.length}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <EnvelopeOpenIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Non lus</p>
                  <p className="text-lg font-semibold text-red-600">{unreadCount}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="btn-secondary text-sm flex items-center"
                >
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Tout marquer comme lu
                </button>
              )}
            </div>
          </div>

          {/* Filtres avec design moderne */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 mr-4">Filtrer :</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === null
                      ? 'bg-primary-100 text-primary-800 border-2 border-primary-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilter(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === false
                      ? 'bg-red-100 text-red-800 border-2 border-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  Non lus
                </button>
                <button
                  onClick={() => setFilter(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === true
                      ? 'bg-green-100 text-green-800 border-2 border-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  Lus
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 mx-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Liste des messages avec design moderne */}
        {messages.length === 0 ? (
          <div className="card p-12 text-center mx-4">
            <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <EnvelopeIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun message
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === false 
                ? 'Vous n\'avez pas de messages non lus'
                : filter === true
                ? 'Vous n\'avez pas de messages lus'
                : 'Vous n\'avez pas encore reçu de messages'
              }
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-lg">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Partagez votre lien pour recevoir des messages
            </div>
          </div>
        ) : (
          <div className="space-y-6 px-4">
            {/* Messages non lus en haut */}
            {sortMessages(messages)
              .filter(message => !message.is_read)
              .map((message) => (
                <div
                  key={message.id}
                  className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 ring-2 ring-blue-100 border-blue-200 bg-gradient-to-br from-blue-50/50 to-white"
                >
                  {/* Indicateur de statut avec animation */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="relative">
                      <div className="h-4 w-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute inset-0 h-4 w-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>

                  {/* Gradient de fond pour les messages non lus */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 pointer-events-none"></div>

                  <div className="relative p-8">
                    {/* Header du message avec design moderne */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg bg-gradient-to-r ${getMessageTypeColor(message.content)}`}>
                          {getMessageTypeIcon(message.content)}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-semibold text-gray-900">
                              Message anonyme
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg animate-pulse">
                              <StarIcon className="h-3 w-3 mr-1" />
                              Nouveau
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {formatDate(message.created_at)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions avec design moderne */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-200"
                          title="Marquer comme lu"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-red-200"
                          title="Supprimer"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Contenu du message avec design moderne et gestion du débordement */}
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere text-lg">
                          {message.content}
                        </p>
                      </div>
                    </div>
                    
                    {/* Réponse automatique avec design moderne */}
                    {message.auto_response && (
                      <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-bold text-green-800">
                            Réponse automatique
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed break-words overflow-wrap-anywhere">
                          {message.auto_response}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer simplifié avec seulement la date */}
                  <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                    <div className="flex items-center justify-end text-xs text-gray-500">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>Reçu {formatDate(message.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}

            {/* Messages lus en bas */}
            {sortMessages(messages)
              .filter(message => message.is_read)
              .map((message) => (
                <div
                  key={message.id}
                  className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-gray-50/50 hover:to-white"
                >
                  <div className="relative p-8">
                    {/* Header du message avec design moderne */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="h-14 w-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg bg-gradient-to-r from-gray-100 to-gray-200">
                          <EnvelopeOpenIcon className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-semibold text-gray-900">
                              Message anonyme
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {formatDate(message.created_at)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions avec design moderne */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-red-200"
                          title="Supprimer"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Contenu du message avec design moderne et gestion du débordement */}
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere text-lg">
                          {message.content}
                        </p>
                      </div>
                    </div>
                    
                    {/* Réponse automatique avec design moderne */}
                    {message.auto_response && (
                      <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-bold text-green-800">
                            Réponse automatique
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed break-words overflow-wrap-anywhere">
                          {message.auto_response}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer simplifié avec seulement la date */}
                  <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                    <div className="flex items-center justify-end text-xs text-gray-500">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>Reçu {formatDate(message.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Pagination avec design moderne */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center px-4">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => loadMessages(currentPage - 1, filter)}
                disabled={currentPage === 1}
                className="px-6 py-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
              >
                Précédent
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => loadMessages(page, filter)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg transform scale-110'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:shadow-lg'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => loadMessages(currentPage + 1, filter)}
                disabled={currentPage === totalPages}
                className="px-6 py-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
              >
                Suivant
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
