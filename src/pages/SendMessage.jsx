import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicService } from '../services/publicService';
import { 
  ArrowLeftIcon, 
  PaperAirplaneIcon, 
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  EyeSlashIcon,
  XMarkIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const SendMessage = () => {
  const { username, uniqueLink, link } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [linkInfo, setLinkInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isCheckingLink, setIsCheckingLink] = useState(true);

  useEffect(() => {
    const checkLink = async () => {
      setIsCheckingLink(true);
      setError('');
      
      try {
        let info;
        let actualUniqueLink;
        
        // Nouveau format avec username et uniqueLink
        if (username && uniqueLink) {
          console.log('Checking link with username:', username, 'uniqueLink:', uniqueLink);
          // L'API backend ne supporte que l'ancien format, donc on utilise seulement uniqueLink
          actualUniqueLink = uniqueLink;
          info = await publicService.checkLink(actualUniqueLink);
        }
        // Ancien format avec link complet
        else if (link) {
          console.log('Checking link (legacy format):', link);
          const decodedLink = decodeURIComponent(link);
          const parts = decodedLink.split('/');
          
          if (parts.length >= 2) {
            const username = parts[parts.length - 2];
            actualUniqueLink = parts[parts.length - 1];
            console.log('Extracted from legacy link - username:', username, 'uniqueLink:', actualUniqueLink);
            info = await publicService.checkLink(actualUniqueLink);
          } else {
            actualUniqueLink = parts[parts.length - 1];
            info = await publicService.checkLink(actualUniqueLink);
          }
        }
        else {
          throw new Error('Format de lien non reconnu');
        }
        
        console.log('Link info received:', info);
        setLinkInfo(info);
        
        // Récupérer les informations de l'utilisateur
        try {
          const userData = await publicService.getUserName(actualUniqueLink);
          console.log('User info received:', userData);
          setUserInfo(userData);
        } catch (userError) {
          console.warn('Could not fetch user info:', userError);
          // On continue même si on ne peut pas récupérer les infos utilisateur
        }
        
      } catch (error) {
        console.error('Error checking link:', error);
        setError('Lien invalide ou inactif');
      } finally {
        setIsCheckingLink(false);
      }
    };

    checkLink();
  }, [username, uniqueLink, link]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      let actualUniqueLink;
      
      // Nouveau format avec username et uniqueLink
      if (username && uniqueLink) {
        actualUniqueLink = uniqueLink;
      }
      // Ancien format avec link complet
      else if (link) {
        const decodedLink = decodeURIComponent(link);
        const parts = decodedLink.split('/');
        actualUniqueLink = parts[parts.length - 1];
      }
      else {
        throw new Error('Format de lien non reconnu');
      }

      await publicService.sendMessage(actualUniqueLink, message);
      setSuccess(true);
      setMessage('');
      
      // Recharger les informations du lien pour mettre à jour le compteur
      const updatedInfo = await publicService.checkLink(actualUniqueLink);
      setLinkInfo(updatedInfo);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Erreur lors de l\'envoi du message');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingLink) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification du lien...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <XMarkIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Lien invalide
            </h2>
            <p className="text-red-600 mb-4">
              {error}
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Message envoyé !
            </h2>
            <p className="text-green-600 mb-4">
              Votre message anonyme a été envoyé avec succès.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Envoyer un message anonyme
          </h1>
        </div>

        <div className="card p-8">
          {/* Informations du destinataire avec compteur de messages */}
          {userInfo && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Message pour {userInfo.full_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {userInfo.first_name} {userInfo.last_name}
                    </p>
                  </div>
                </div>
                
                {/* Compteur de messages */}
                {linkInfo && linkInfo.messages_count !== undefined && (
                  <div className="flex items-center bg-white/60 rounded-lg px-3 py-2">
                    <EnvelopeIcon className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {linkInfo.messages_count} message{linkInfo.messages_count > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
              
              
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Votre message anonyme
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                maxLength={1000}
                className="input-field"
                placeholder="Tapez votre message ici... (maximum 1000 caractères)"
                required
              />
              <div className="mt-1 text-sm text-gray-500">
                {message.length}/1000 caractères
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-sm font-medium text-blue-800">
                  Confidentialité
                </h3>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-center">
                  <EyeSlashIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Votre message est 100% anonyme</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Votre identité ne sera jamais révélée</span>
                </li>
                <li className="flex items-center">
                  <XMarkIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Le destinataire ne peut pas vous répondre directement</span>
                </li>
                <li className="flex items-center">
                  <TrashIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Le message sera supprimé automatiquement après 72h</span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
