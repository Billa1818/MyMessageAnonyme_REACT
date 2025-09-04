#!/bin/bash

# Script de démarrage pour MyMessageAnonyme Frontend

echo "🚀 Démarrage de MyMessageAnonyme Frontend"
echo "=========================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation des dépendances"
        exit 1
    fi
    echo "✅ Dépendances installées"
else
    echo "✅ Dépendances déjà installées"
fi

# Vérifier si l'API est accessible
echo "🔍 Vérification de l'API backend..."
if curl -s http://127.0.0.1:8000/api/ > /dev/null; then
    echo "✅ API backend accessible"
else
    echo "⚠️  API backend non accessible sur http://127.0.0.1:8000"
    echo "   Assurez-vous que l'API est démarrée"
fi

# Démarrer le serveur de développement
echo "🌐 Démarrage du serveur de développement..."
echo "   L'application sera disponible sur http://localhost:5173"
echo "   Appuyez sur Ctrl+C pour arrêter"
echo ""

npm run dev
