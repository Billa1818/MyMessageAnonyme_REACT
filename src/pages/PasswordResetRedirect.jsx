import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon, ExclamationTriangleIcon, KeyIcon } from '@heroicons/react/24/outline';

const PasswordResetRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    // Informations de débogage
    setDebugInfo({
      uid,
      token,
      hasUid: !!uid,
      hasToken: !!token,
      fullUrl: window.location.href,
      searchParams: Object.fromEntries(searchParams.entries())
    });

    console.log('🔍 Password Reset Redirect Debug:', {
      uid,
      token,
      hasUid: !!uid,
      hasToken: !!token,
      fullUrl: window.location.href,
      searchParams: Object.fromEntries(searchParams.entries())
    });

    if (uid && token) {
      // Rediriger vers notre page de confirmation avec les paramètres
      console.log('✅ Redirection vers /reset-password-confirm avec paramètres');
      navigate(`/reset-password-confirm?uid=${uid}&token=${token}`, { replace: true });
    } else {
      // Si pas de paramètres, rediriger vers la page de demande
      console.log('❌ Pas de paramètres, redirection vers /forgot-password');
      navigate('/forgot-password', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center px-4">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
            <KeyIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Traitement du lien
          </h2>
          <p className="mt-2 text-gray-600">
            Redirection vers la page de réinitialisation
          </p>
        </div>

        <div className="card p-8 mx-4">
          <div className="text-center space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <CheckCircleIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Lien de réinitialisation détecté
              </h3>
              <p className="text-blue-700 text-sm">
                Nous traitons votre lien de réinitialisation...
              </p>
            </div>

            {/* Informations de débogage */}
            {debugInfo && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">🔍 Informations de débogage :</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div><strong>UID :</strong> {debugInfo.uid || 'Non fourni'}</div>
                  <div><strong>Token :</strong> {debugInfo.token ? `${debugInfo.token.substring(0, 10)}...` : 'Non fourni'}</div>
                  <div><strong>UID présent :</strong> {debugInfo.hasUid ? '✅ Oui' : '❌ Non'}</div>
                  <div><strong>Token présent :</strong> {debugInfo.hasToken ? '✅ Oui' : '❌ Non'}</div>
                  <div><strong>URL complète :</strong> {debugInfo.fullUrl}</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center">
              <div className="loading-spinner h-8 w-8"></div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Note :</strong> Si la redirection ne fonctionne pas, vérifiez la console du navigateur pour plus d'informations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRedirect;
