import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { publicService } from '../services/publicService';
import ParticleBackground from '../components/ParticleBackground';
import {
  EnvelopeIcon,
  LinkIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [linkInput, setLinkInput] = useState('');
  const [linkInfo, setLinkInfo] = useState(null);
  const [isCheckingLink, setIsCheckingLink] = useState(false);
  const [linkError, setLinkError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCheckLink = async (e) => {
    e.preventDefault();
    if (!linkInput.trim()) return;

    setIsCheckingLink(true);
    setLinkError('');
    setLinkInfo(null);

    try {
      const link = linkInput.trim();
      console.log('Checking link:', link);
      
      // Extraire les parties du lien
      const url = new URL(link);
      const pathParts = url.pathname.split('/').filter(part => part);
      
      let info;
      let uniqueLink;
      
      // Format: /message/username/uniqueLink
      if (pathParts.length >= 3 && pathParts[0] === 'message') {
        const username = pathParts[1];
        uniqueLink = pathParts[2];
        console.log('Checking with username:', username, 'uniqueLink:', uniqueLink);
        // L'API backend ne supporte que l'ancien format, donc on utilise seulement uniqueLink
        info = await publicService.checkLink(uniqueLink);
      }
      // Format: /send-message/encodedLink
      else if (pathParts.length >= 2 && pathParts[0] === 'send-message') {
        const encodedLink = pathParts[1];
        const decodedLink = decodeURIComponent(encodedLink);
        const decodedParts = decodedLink.split('/').filter(part => part);
        
        if (decodedParts.length >= 2) {
          const username = decodedParts[decodedParts.length - 2];
          uniqueLink = decodedParts[decodedParts.length - 1];
          console.log('Extracted from encoded link - username:', username, 'uniqueLink:', uniqueLink);
          info = await publicService.checkLink(uniqueLink);
        } else {
          uniqueLink = decodedParts[decodedParts.length - 1];
          info = await publicService.checkLink(uniqueLink);
        }
      }
      // Format direct avec username/uniqueLink
      else if (pathParts.length >= 2) {
        const username = pathParts[pathParts.length - 2];
        uniqueLink = pathParts[pathParts.length - 1];
        console.log('Direct format - username:', username, 'uniqueLink:', uniqueLink);
        info = await publicService.checkLink(uniqueLink);
      }
      else {
        throw new Error('Format de lien non reconnu');
      }
      
      console.log('Link info received:', info);
      setLinkInfo({ ...info, uniqueLink });
    } catch (error) {
      console.error('Error checking link:', error);
      setLinkError('Lien invalide ou inactif');
    } finally {
      setIsCheckingLink(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Messages 100% Anonymes',
      description: 'Envoyez des messages sans révéler votre identité. Votre anonymat est garanti.',
      color: 'from-blue-500 to-blue-600',
      delay: '0ms',
    },
    {
      icon: LinkIcon,
      title: 'Liens Uniques',
      description: 'Chaque utilisateur dispose d\'un lien unique pour recevoir des messages.',
      color: 'from-purple-500 to-purple-600',
      delay: '100ms',
    },
    {
      icon: ClockIcon,
      title: 'Activation Temporaire',
      description: 'Activez votre lien pour 6h, 12h, 24h ou 48h selon vos besoins.',
      color: 'from-green-500 to-green-600',
      delay: '200ms',
    },
    {
      icon: HeartIcon,
      title: 'Réponses Automatiques',
      description: 'Recevez des réponses personnalisées basées sur votre profil.',
      color: 'from-pink-500 to-pink-600',
      delay: '300ms',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background avec particules */}
      <ParticleBackground particleCount={30} />
      
      {/* Hero Section avec gradient moderne */}
      <div className="relative overflow-hidden hero-gradient">
        {/* Background pattern amélioré */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative container-custom py-32 z-10">
          <div className="text-center animate-fade-in">
            {/* Badge d'introduction avec animation */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 animate-float">
              <SparklesIcon className="h-5 w-5 text-white mr-2 animate-pulse" />
              <span className="text-white font-medium">Messages Anonymes Sécurisés</span>
              <StarIcon className="h-4 w-4 text-yellow-300 ml-2 animate-bounce-gentle" />
            </div>
            
            {/* Titre principal avec effet de lueur - CORRIGÉ */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-slide-up" style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)',
              filter: 'none'
            }}>
              MyMessageAnonyme
            </h1>
            
            {/* Sous-titre avec animation - CORRIGÉ */}
            <p className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in font-medium" style={{ 
              animationDelay: '0.2s',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
              filter: 'none'
            }}>
              Partagez vos pensées en toute confidentialité. 
              <br className="hidden md:block" />
              Une plateforme moderne et sécurisée pour les messages anonymes.
            </p>
            
            {isAuthenticated ? (
              <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="card-glass p-8 mb-8 hover-lift">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                    <LinkIcon className="h-8 w-8 mr-3 animate-bounce-gentle" />
                    Votre lien unique
                  </h3>
                  <p className="text-white/80 mb-6">
                    Partagez ce lien pour recevoir des messages anonymes
                  </p>
                  
                  {/* Nouveau design pour le lien */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <code className="text-sm text-white/90 break-all font-mono block">
                          {window.location.origin}/message/{user?.username}/{user?.unique_link}
                        </code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${window.location.origin}/message/${user?.username}/${user?.unique_link}`)}
                        className="ml-4 p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 group border border-white/30"
                        title="Copier le lien"
                      >
                        {copied ? (
                          <CheckIcon className="h-5 w-5 text-green-300" />
                        ) : (
                          <ClipboardDocumentIcon className="h-5 w-5 text-white group-hover:text-green-300 transition-colors duration-300" />
                        )}
                      </button>
                    </div>
                    {copied && (
                      <div className="mt-3 text-center">
                        <span className="text-green-300 text-sm font-medium animate-fade-in">
                          Lien copié dans le presse-papiers !
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/messages"
                      className="btn-primary bg-white text-primary-600 hover:bg-gray-100 flex items-center justify-center btn-morph"
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-2" />
                      Voir mes messages
                    </Link>
                    <Link
                      to="/profile"
                      className="btn-ghost flex items-center justify-center"
                    >
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      Mon profil
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Link
                  to="/register"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 flex items-center justify-center btn-morph"
                >
                  <SparklesIcon className="h-6 w-6 mr-2" />
                  Créer un compte
                </Link>
                <Link
                  to="/login"
                  className="btn-ghost text-lg px-8 py-4 flex items-center justify-center"
                >
                  <ArrowRightIcon className="h-6 w-6 mr-2" />
                  Se connecter
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Link Checker Section avec design moderne */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Envoyer un message anonyme
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Entrez le lien unique de la personne à qui vous voulez envoyer un message
              </p>
            </div>
            
            <div className="card p-8 animate-slide-up hover-lift">
              <form onSubmit={handleCheckLink} className="space-y-6">
                <div>
                  <label htmlFor="link" className="form-label">
                    Lien unique
                  </label>
                  <input
                    type="text"
                    id="link"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="https://example.com/message/username/unique-link"
                    className="input-field"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isCheckingLink}
                  className="btn-primary w-full flex items-center justify-center btn-morph"
                >
                  {isCheckingLink ? (
                    <>
                      <div className="loading-spinner h-5 w-5 mr-2"></div>
                      Vérification...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Vérifier le lien
                    </>
                  )}
                </button>
              </form>

              {linkError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center animate-fade-in">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3" />
                  <p className="text-red-600">{linkError}</p>
                </div>
              )}

              {linkInfo && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                  <div className="flex items-center mb-4">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                    <h3 className="text-lg font-semibold text-green-800">
                      Lien valide !
                    </h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Ce lien est actif et peut recevoir des messages.
                  </p>
                  {linkInfo.link_expires_at && (
                    <p className="text-green-600 text-sm mb-4">
                      ⏰ Expire le {new Date(linkInfo.link_expires_at).toLocaleString('fr-FR')}
                    </p>
                  )}
                  <Link
                    to={`/message/${linkInput.split('/').filter(part => part).slice(-2).join('/')}`}
                    className="btn-primary bg-green-600 hover:bg-green-700 flex items-center justify-center btn-morph"
                  >
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    Envoyer un message
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section avec design moderne */}
      <div className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir MyMessageAnonyme ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme sécurisée et intuitive pour les messages anonymes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group" style={{ animationDelay: feature.delay }}>
                <div className="card hover-lift p-8 text-center h-full animate-fade-in">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:animate-bounce-gentle shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section avec gradient */}
      <div className="py-20 hero-gradient relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Créez votre compte et commencez à recevoir des messages anonymes
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 inline-flex items-center btn-morph"
            >
              <SparklesIcon className="h-6 w-6 mr-2" />
              Créer un compte gratuit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
