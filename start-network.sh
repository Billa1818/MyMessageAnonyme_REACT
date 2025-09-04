#!/bin/bash

# Script pour démarrer l'application en mode réseau
echo "🚀 Démarrage de MyMessageAnonyme en mode réseau..."
echo ""

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer Node.js et npm."
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

# Obtenir l'IP locale
LOCAL_IP=$(hostname -I | awk '{print $1}')
echo "🌐 Configuration réseau :"
echo "   • IP locale : $LOCAL_IP"
echo "   • Port : 5173"
echo "   • URL locale : http://localhost:5173"
echo "   • URL réseau : http://$LOCAL_IP:5173"
echo ""

# Vérifier si le port est libre
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Le port 5173 est déjà utilisé. Vite utilisera un autre port."
    echo ""
fi

echo "🔧 Démarrage du serveur de développement..."
echo "   • Appuyez sur Ctrl+C pour arrêter"
echo "   • L'application sera accessible depuis d'autres appareils sur le réseau"
echo ""

# Démarrer Vite avec l'option --host
npm run dev:network
