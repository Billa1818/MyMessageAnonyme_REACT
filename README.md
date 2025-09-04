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

## 🌐 Configuration Réseau

### **Accès Local**
```bash
npm run dev
# Accès : http://localhost:5173
```

### **Accès Réseau**
```bash
./start-network.sh
# Accès : http://[VOTRE_IP]:5173
```

### **URLs d'Accès**
- **Local** : `http://localhost:5173`
- **Réseau principal** : `http://192.168.98.6:5173`
- **Réseau secondaire** : `http://10.0.3.1:5173`

### **Configuration Firewall**
```bash
# Linux (UFW)
sudo ufw allow 5173

# Vérification
netstat -tlnp | grep :5173
```

## 🔧 Configuration Avancée

### **Variables d'Environnement**
```env
# API Backend
VITE_API_BASE_URL=http://127.0.0.1:8000/api

# Configuration Vite
VITE_APP_TITLE=MyMessageAnonyme
VITE_APP_VERSION=1.0.0
```

### **Personnalisation du Thème**
Modifiez `index.html` pour personnaliser Tailwind :
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
        }
      }
    }
  }
</script>
```

### **Styles Personnalisés**
Ajoutez vos styles dans `src/index.css` :
```css
@layer components {
  .btn-custom {
    @apply px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500;
  }
}
```

## 🚀 Déploiement

### **Build de Production**
```bash
npm run build
```

### **Prévisualisation**
```bash
npm run preview
```

### **Optimisations**
- **Code splitting** : Chargement asynchrone des composants
- **Tree shaking** : Suppression du code non utilisé
- **Minification** : Compression des assets
- **Gzip** : Compression des fichiers statiques

## 📱 Compatibilité

### **Navigateurs Supportés**
- **Chrome** : 90+
- **Firefox** : 88+
- **Safari** : 14+
- **Edge** : 90+

### **Appareils**
- **Mobile** : iOS 12+, Android 8+
- **Tablette** : iPad, Android tablets
- **Desktop** : Windows, macOS, Linux

## 🧪 Tests et Qualité

### **Scripts Disponibles**
```bash
npm run dev          # Développement local
npm run dev:network  # Développement réseau
npm run build        # Build de production
npm run preview      # Prévisualisation
npm run lint         # Linting ESLint
npm run clean        # Nettoyage des caches
```

### **Standards de Code**
- **ESLint** : Linting automatique
- **Prettier** : Formatage du code
- **Conventions** : Nommage cohérent
- **Documentation** : Commentaires JSDoc

## 🤝 Contribution

### **Workflow de Contribution**
1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### **Guidelines**
- **Code propre** : Respect des conventions
- **Tests** : Vérification des fonctionnalités
- **Documentation** : Mise à jour du README
- **Responsive** : Test sur différents écrans

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support et Aide

### **Documentation**
- **Guide réseau** : `NETWORK_ACCESS_GUIDE.md`
- **Résumés des modifications** : Fichiers `*_SUMMARY.md`
- **API Documentation** : `API_ENDPOINTS.md`

### **Dépannage**
- **Problèmes réseau** : Vérifiez le firewall et l'IP
- **Erreurs de build** : `npm run clean && npm install`
- **Problèmes d'API** : Vérifiez l'URL et la connectivité

### **Contact**
- **Issues GitHub** : Signaler les bugs
- **Discussions** : Questions et suggestions
- **Email** : Support technique

## 🔄 Mise à Jour

### **Mise à Jour du Projet**
```bash
git pull origin main
npm install
npm run dev
```

### **Mise à Jour des Dépendances**
```bash
npm update
npm audit fix
```

## 📊 Statistiques du Projet

- **📁 Fichiers** : 25+ composants et services
- **📦 Dépendances** : 15+ packages optimisés
- **🎨 Styles** : 100+ classes Tailwind personnalisées
- **📱 Responsive** : 3 breakpoints (mobile, tablet, desktop)
- **⚡ Performance** : Build optimisé < 300KB

## 🎉 Fonctionnalités Avancées

### **Intelligence Artificielle**
- **Détection de type** : Classification automatique des messages
- **Icônes adaptatives** : Cœur pour l'amour, Feu pour l'urgence
- **Couleurs dynamiques** : Gradients selon le contenu

### **Expérience Utilisateur**
- **Animations fluides** : 60fps avec CSS transforms
- **Feedback visuel** : États de chargement et confirmations
- **Navigation intuitive** : Breadcrumbs et états actifs
- **Accessibilité** : Support clavier et lecteurs d'écran

---

## 🚀 **Démarrage Rapide**

```bash
# 1. Cloner et installer
git clone <repository-url>
cd MyMessageAnonyme-react
npm install

# 2. Démarrer en mode réseau
./start-network.sh

# 3. Accéder à l'application
# Local : http://localhost:5173
# Réseau : http://192.168.98.6:5173
```

**🎯 MyMessageAnonyme - Partagez vos pensées en toute confidentialité ! ✨**
# MyMessageAnonyme_REACT
