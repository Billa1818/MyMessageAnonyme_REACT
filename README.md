# 💌 MyMessageAnonyme - Frontend React

> **Plateforme moderne et sécurisée pour les messages anonymes**

Frontend React pour l'application MyMessageAnonyme, une plateforme de messages anonymes avec une interface utilisateur moderne et intuitive.

## ✨ Fonctionnalités Principales

### 🔐 **Authentification Complète**
- **Inscription/Connexion** : Système d'authentification JWT sécurisé
- **Gestion des tokens** : Renouvellement automatique des tokens d'accès
- **Profil utilisateur** : Gestion complète du profil et des préférences
- **Déconnexion sécurisée** : Invalidation des tokens et nettoyage des données

### 💬 **Messages Anonymes**
- **Envoi anonyme** : Envoi de messages sans révéler son identité
- **Liens uniques** : Chaque utilisateur dispose d'un lien unique personnalisé
- **Activation temporaire** : Liens activables pour 6h, 12h, 24h ou 48h
- **Réponses automatiques** : Système de réponses personnalisées
- **Gestion des messages** : Tri intelligent (non lus en haut, lus en bas)

### 🎨 **Interface Moderne**
- **Design responsive** : Compatible mobile, tablette et desktop
- **Animations fluides** : Transitions et effets visuels avancés
- **Thème cohérent** : Design system unifié avec gradients et glassmorphism
- **Accessibilité** : Respect des standards WCAG et navigation au clavier

### 🌐 **Accès Réseau**
- **Accès local** : `http://localhost:5173`
- **Accès réseau** : Accessible depuis d'autres appareils sur le réseau local
- **Configuration automatique** : Scripts de démarrage avec détection IP
- **Multi-plateforme** : Compatible avec tous les navigateurs modernes

## 🛠️ Technologies Utilisées

### **Frontend Core**
- **React 18** - Framework JavaScript moderne
- **Vite** - Build tool ultra-rapide et serveur de développement
- **React Router DOM** - Routage côté client avec navigation fluide
- **Context API** - Gestion d'état globale pour l'authentification

### **Styling & UI**
- **Tailwind CSS (CDN)** - Framework CSS utilitaire via CDN
- **Heroicons** - Bibliothèque d'icônes SVG modernes
- **CSS Custom Properties** - Variables CSS pour la personnalisation
- **Glassmorphism** - Effets de transparence et de flou

### **HTTP & API**
- **Axios** - Client HTTP avec intercepteurs pour JWT
- **Intercepteurs** - Gestion automatique des tokens et erreurs
- **Services modulaires** - Architecture en couches pour les appels API

## 📦 Installation Rapide

### **1. Cloner le projet**
```bash
git clone https://github.com/Billa1818/MyMessageAnonyme_REACT.git
cd MyMessageAnonyme-react
```

### **2. Installer les dépendances**
```bash
npm install
```

### **3. Configurer l'environnement**
Créez un fichier `.env` à la racine :
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### **4. Démarrer l'application**

#### **Mode Local (Recommandé pour le développement)**
```bash
npm run dev
```

#### **Mode Réseau (Accès depuis d'autres appareils)**
```bash
./start-network.sh
# ou
npm run dev:network
```

### **5. Accéder à l'application**
- **Local** : `http://localhost:5173`
- **Réseau** : `http://[VOTRE_IP]:5173`

## 🏗️ Architecture du Projet

```
MyMessageAnonyme-react/
├── 📁 public/                 # Fichiers statiques
├── 📁 src/
│   ├── 📁 components/         # Composants réutilisables
│   │   ├── Navbar.jsx         # Navigation principale avec design moderne
│   │   ├── ProtectedRoute.jsx # Protection des routes privées
│   │   ├── Notification.jsx   # Système de notifications
│   │   └── ParticleBackground.jsx # Effets de particules
│   ├── 📁 contexts/           # Contextes React
│   │   └── AuthContext.jsx    # Gestion globale de l'authentification
│   ├── 📁 pages/              # Pages de l'application
│   │   ├── Home.jsx           # Page d'accueil avec vérificateur de lien
│   │   ├── Login.jsx          # Connexion utilisateur
│   │   ├── Register.jsx       # Inscription utilisateur
│   │   ├── Messages.jsx       # Gestion des messages avec tri intelligent
│   │   ├── Profile.jsx        # Profil utilisateur et gestion des liens
│   │   └── SendMessage.jsx    # Envoi de messages anonymes
│   ├── 📁 services/           # Services API
│   │   ├── api.js             # Configuration Axios et intercepteurs
│   │   ├── authService.js     # Service d'authentification
│   │   ├── messageService.js  # Service des messages
│   │   ├── publicService.js   # Service public (liens, envoi anonyme)
│   │   └── statisticsService.js # Service des statistiques
│   ├── 📁 utils/              # Utilitaires
│   │   └── config.js          # Configuration centralisée
│   ├── App.jsx                # Composant principal avec routage
│   ├── main.jsx              # Point d'entrée de l'application
│   └── index.css             # Styles globaux et animations
├── 📄 vite.config.js         # Configuration Vite avec support réseau
├── 📄 package.json           # Dépendances et scripts
├── 📄 start-network.sh       # Script de démarrage réseau
└── 📄 README.md              # Documentation complète
```

## 🎯 Pages et Fonctionnalités

### **🏠 Page d'Accueil (`/`)**
- **Vérificateur de lien** : Validation des liens de messages
- **Lien unique** : Affichage et copie du lien personnel
- **Design moderne** : Animations et effets visuels
- **Responsive** : Adaptation parfaite sur tous les écrans

### **🔐 Authentification**
- **Connexion (`/login`)** : Interface de connexion sécurisée
- **Inscription (`/register`)** : Création de compte avec validation
- **Gestion des tokens** : Renouvellement automatique
- **Protection des routes** : Accès sécurisé aux pages privées

### **💬 Messages (`/messages`)**
- **Tri intelligent** : Messages non lus en haut, lus en bas
- **Design moderne** : Cartes avec animations et effets
- **Actions contextuelles** : Marquer comme lu, supprimer
- **Détection de type** : Icônes adaptatives selon le contenu
- **Gestion du débordement** : Retour automatique à la ligne

### **👤 Profil (`/profile`)**
- **Gestion des liens** : Activation/désactivation des liens
- **Informations personnelles** : Modification du profil
- **Statistiques** : Compteur de messages reçus
- **Sécurité** : Changement de mot de passe

### **📤 Envoi de Message (`/message/:username/:link`)**
- **Interface épurée** : Focus sur l'envoi du message
- **Affichage du destinataire** : Nom et avatar
- **Compteur de messages** : Nombre de messages reçus
- **Confidentialité** : Informations sur l'anonymat
- **Validation** : Vérification du lien avant envoi

## 🎨 Design System

### **Palette de Couleurs**
- **Primaire** : Bleu (`#3B82F6`) avec gradients
- **Secondaire** : Violet (`#8B5CF6`) et Rose (`#EC4899`)
- **Accents** : Vert, Jaune, Rouge selon le contexte
- **Neutres** : Gris avec différentes opacités

### **Composants**
- **Boutons** : Gradients, ombres et animations
- **Cartes** : Glassmorphism avec bordures arrondies
- **Navigation** : Header fixe avec transparence au scroll
- **Formulaires** : Validation visuelle et feedback

### **Animations**
- **Transitions** : Durées de 300ms à 500ms
- **Hover effects** : Scale, rotation et changement de couleur
- **Loading states** : Spinners et squelettes
- **Page transitions** : Fade in/out et slide

