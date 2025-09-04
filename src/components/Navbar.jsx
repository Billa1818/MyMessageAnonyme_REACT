import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Effet de scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Header principal avec design ultra-moderne */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo avec design premium */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <SparklesIcon className="h-7 w-7 text-white" />
                  </div>
                  {/* Effet de lueur au hover */}
                  <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                  {/* Particules animées */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    MyMessageAnonyme
                  </span>
                  <span className="text-xs text-gray-500 -mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                    Messages Anonymes Sécurisés
                  </span>
                </div>
              </Link>
            </div>

            {/* Espace central vide sur desktop - navigation supprimée */}
            <div className="hidden lg:block lg:flex-1"></div>

            {/* Actions utilisateur avec design premium - Messages déplacé ici */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Bouton Messages à droite */}
                  <Link
                    to="/messages"
                    className={`relative px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                      isActive('/messages')
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className={`h-4 w-4 transition-all duration-300 ${
                        isActive('/messages') ? 'scale-110' : 'group-hover:scale-110'
                      }`} />
                      <span>Messages</span>
                    </div>
                    {/* Effet de fond animé */}
                    {!isActive('/messages') && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    )}
                  </Link>

                  {/* Menu utilisateur avec design premium */}
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center space-x-3 bg-gradient-to-r from-gray-50/80 to-gray-100/80 hover:from-blue-50/80 hover:to-purple-50/80 rounded-2xl px-4 py-3 transition-all duration-300 group border border-gray-200/50 backdrop-blur-sm"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <div className="relative">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <UserIcon className="h-5 w-5 text-white" />
                        </div>
                        {/* Indicateur en ligne avec animation */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse">
                          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900">
                          {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                      <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown menu simplifié */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-xl border border-gray-200/50 py-3 z-50 animate-fade-in">
                        {/* Header du dropdown */}
                        <div className="px-4 py-3 border-b border-gray-200/50">
                          <p className="text-sm font-bold text-gray-900">Mon compte</p>
                          <p className="text-xs text-gray-500">Gérez votre profil</p>
                        </div>
                        
                        {/* Liens du menu - seulement Profil */}
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200 group"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <UserIcon className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                            <span>Profil</span>
                          </Link>
                        </div>
                        
                        {/* Séparateur */}
                        <div className="border-t border-gray-200/50 my-2"></div>
                        
                        {/* Déconnexion */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group"
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-blue-50"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-sm px-6 py-2"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>

            {/* Menu mobile avec design moderne */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-xl bg-gray-100/80 hover:bg-gray-200 backdrop-blur-sm transition-all duration-300 border border-gray-200/50"
              >
                <span className="sr-only">Ouvrir le menu principal</span>
                <div className="relative w-6 h-6">
                  <Bars3Icon className={`absolute inset-0 h-6 w-6 text-gray-600 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                  <XMarkIcon className={`absolute inset-0 h-6 w-6 text-gray-600 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile avec design premium */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
              <div className="container-custom py-4">
                {/* Navigation mobile - Messages */}
                <div className="space-y-2">
                  {isAuthenticated && (
                    <Link
                      to="/messages"
                      className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
                        isActive('/messages')
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-3" />
                      Messages
                    </Link>
                  )}
                </div>

                {/* Actions mobiles */}
                <div className="mt-6 pt-6 border-t border-gray-200/50">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      {/* Profil utilisateur mobile */}
                      <div className="flex items-center px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <UserIcon className="h-6 w-6 text-white" />
                          </div>
                          {/* Indicateur en ligne */}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-base font-bold text-gray-900">
                            {user?.first_name} {user?.last_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Liens mobiles */}
                      <div className="space-y-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <UserIcon className="h-5 w-5 mr-3 text-gray-400" />
                          Profil
                        </Link>
                      </div>

                      {/* Déconnexion mobile */}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                        Déconnexion
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        className="block w-full px-4 py-3 text-center text-base font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Connexion
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full px-4 py-3 text-center text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        Inscription
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Espace pour le header fixe */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
