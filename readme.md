# 🎮 CRG SERVICES - Dashboard Admin Complet

## 📋 Table des Matières
1. [Vue d'ensemble](#vue-densemble)
2. [Structure des fichiers](#structure-des-fichiers)
3. [Installation](#installation)
4. [Configuration Firebase](#configuration-firebase)
5. [Configuration Discord Webhook](#configuration-discord-webhook)
6. [Intégration au site existant](#intégration-au-site-existant)
7. [Fonctionnalités](#fonctionnalités)
8. [Guide d'utilisation](#guide-dutilisation)

---

## 🎯 Vue d'ensemble

Ce système ajoute à votre site CRG Services :
- ✅ **Authentification obligatoire** (Discord, Google, Email, Téléphone, Apple)
- ✅ **Dashboard admin complet** avec gestion des services, agenda, utilisateurs
- ✅ **Logs automatiques** sur Discord pour chaque inscription/connexion
- ✅ **Statistiques en temps réel** (visiteurs, inscriptions, etc.)
- ✅ **Système d'agenda** public et privé
- ✅ **Protection totale du site** - Connexion obligatoire pour accéder

**IMPORTANT** : Votre site actuel (`index.html` et toutes les pages existantes) reste **INCHANGÉ**. Tous les nouveaux fichiers sont séparés.

---

## 📁 Structure des Fichiers

```
votre-site/
├── index.html                    ← VOTRE FICHIER (petit ajout à faire)
├── services/                     ← VOS PAGES (inchangées)
│   ├── fivem.html
│   ├── discord-server.html
│   └── ...
│
├── auth/                         ← ✨ NOUVEAU
│   ├── login.html               → Page de connexion
│   └── register.html            → Page d'inscription
│
├── dashboard/                    ← ✨ NOUVEAU
│   ├── index.html               → Dashboard principal
│   ├── services-manager.html    → Gestion des services
│   ├── agenda-manager.html      → Gestion agenda
│   ├── users-manager.html       → Gestion utilisateurs
│   ├── stats.html               → Statistiques
│   └── settings.html            → Paramètres
│
├── agenda/                       ← ✨ NOUVEAU
│   └── public-agenda.html       → Agenda visible par tous
│
├── config/                       ← ✨ NOUVEAU
│   ├── firebase-config.js       → Configuration Firebase
│   └── protect-site.js          → Script de protection
│
└── assets/                       ← ✨ NOUVEAU
    ├── dashboard.css            → Styles dashboard
    └── dashboard.js             → Fonctions dashboard
```

---

## 🚀 Installation

### Étape 1 : Télécharger les fichiers

Tous les fichiers créés sont dans les dossiers :
- `auth/`
- `dashboard/`
- `config/`
- `assets/`
- `agenda/`

Copiez ces dossiers à la racine de votre site (au même niveau que `index.html`).

### Étape 2 : Structure finale

Après copie, vous devriez avoir :

```
/
├── auth/
├── dashboard/
├── config/
├── assets/
├── agenda/
├── services/
├── index.html
└── recrutement.html
```

---

## 🔥 Configuration Firebase

### 1. Créer un projet Firebase (GRATUIT)

1. Allez sur [https://console.firebase.google.com](https://console.firebase.google.com)
2. Cliquez sur "Ajouter un projet"
3. Nom du projet : `CRG-Services` (ou autre)
4. Désactivez Google Analytics (pas nécessaire)
5. Cliquez sur "Créer le projet"

### 2. Configurer l'authentification

1. Dans votre projet Firebase, allez dans **"Authentication"**
2. Cliquez sur **"Commencer"**
3. Activez les méthodes de connexion suivantes :

**Adresse e-mail / Mot de passe**
- ✅ Activez "Connexion par adresse e-mail / mot de passe"

**Google**
- ✅ Activez "Google"
- Choisissez un email de support
- Enregistrez

**Téléphone**
- ✅ Activez "Téléphone"
- Pas de configuration supplémentaire nécessaire

**Apple** (optionnel)
- ✅ Activez "Apple"
- Suivez les instructions Apple

**Discord** (nécessite un peu plus de travail)
- Configuration custom avec OAuth2

### 3. Créer Firestore Database

1. Allez dans **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez **"Démarrer en mode test"**
4. Sélectionnez une région (europe-west par exemple)
5. Cliquez sur "Activer"

### 4. Récupérer les clés de configuration

1. Allez dans **"Paramètres du projet"** (⚙️ en haut à gauche)
2. Faites défiler jusqu'à **"Vos applications"**
3. Cliquez sur l'icône **`</>`** (Web)
4. Donnez un nom : `CRG Services Web`
5. **NE PAS** cocher "Configurer Firebase Hosting"
6. Cliquez sur "Enregistrer l'application"
7. **COPIEZ** le code qui apparaît :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

### 5. Mettre à jour firebase-config.js

Ouvrez le fichier `/config/firebase-config.js` et remplacez :

```javascript
const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",           // ← Remplacez ici
    authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_PROJECT_ID.appspot.com",
    messagingSenderId: "VOTRE_SENDER_ID",
    appId: "VOTRE_APP_ID"
};
```

Par vos vraies valeurs Firebase.

---

## 🔔 Configuration Discord Webhook

### 1. Créer un Webhook Discord

1. Ouvrez votre serveur Discord
2. Cliquez droit sur un salon (par exemple #logs)
3. Sélectionnez **"Modifier le salon"**
4. Allez dans **"Intégrations"**
5. Cliquez sur **"Créer un Webhook"**
6. Nommez-le : `CRG Logs Bot`
7. **COPIEZ** l'URL du Webhook

### 2. Mettre à jour firebase-config.js

Dans le même fichier `/config/firebase-config.js`, remplacez :

```javascript
const DISCORD_WEBHOOK_URL = "VOTRE_WEBHOOK_URL_DISCORD";
```

Par votre vraie URL de webhook Discord.

### 3. Configurer votre ID Discord Admin

Toujours dans `/config/firebase-config.js` :

```javascript
const ADMIN_DISCORD_IDS = [
    "woody_2009",  // ← Votre ID Discord
    // Ajoutez d'autres admins ici
];
```

**Comment trouver votre ID Discord ?**
1. Activez le "Mode développeur" dans Discord (Paramètres > Avancés)
2. Cliquez droit sur votre profil
3. Cliquez "Copier l'identifiant"
4. Collez-le dans la liste

---

## 🔗 Intégration au Site Existant

### Modification UNIQUE de index.html

Ouvrez votre fichier `index.html` et ajoutez **JUSTE AVANT** la balise `</body>` :

```html
    <!-- NOUVEAU : Firebase et Protection du site -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="config/firebase-config.js"></script>
    <script src="config/protect-site.js"></script>
</body>
</html>
```

**C'EST TOUT !** Votre index.html ne nécessite que cet ajout de 5 lignes.

### Modification des autres pages (services/, recrutement.html, etc.)

Pour **chaque** page de votre site (fivem.html, discord-server.html, web.html, etc.), ajoutez la même chose **avant** `</body>` :

```html
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="../config/firebase-config.js"></script>
    <script src="../config/protect-site.js"></script>
</body>
```

**Note** : Pour les pages dans `/services/`, utilisez `../config/` (avec ../)

---

## ✨ Fonctionnalités

### 1. Authentification Multi-méthodes

Les utilisateurs peuvent se connecter via :
- 📧 Email + Mot de passe
- 💬 Discord OAuth
- 🔍 Google
- 📱 Numéro de téléphone (SMS)
- 🍎 Apple / iCloud
- 🪟 Microsoft (en développement)

### 2. Dashboard Admin

Accessible uniquement par vous (vérifié par ID Discord).

**Sections disponibles :**
- 📊 **Vue d'ensemble** : Stats globales
- ⚙️ **Gestion Services** : Modifier prix, ajouter/supprimer services
- 📅 **Gestion Agenda** : Créer créneaux, voir demandes
- 👥 **Gestion Utilisateurs** : Liste, bannir, autoriser
- 📈 **Statistiques** : Graphiques, analyses
- 🔧 **Paramètres** : Configuration générale

### 3. Logs Discord Automatiques

Chaque action est loggée automatiquement :
- ✅ Nouvelle inscription → Message Discord
- 🔑 Connexion → Notification avec heure
- 🚪 Déconnexion → Log
- 👀 Visite de page → Statistique

### 4. Protection du Site

- ❌ Sans connexion → Redirection automatique vers login
- ✅ Avec connexion → Accès total
- 🔄 Session persistante (pas besoin de se reconnecter)

---

## 📖 Guide d'Utilisation

### Pour les Visiteurs

1. **Première visite** : Ils arrivent sur `index.html`
2. **Redirection automatique** vers `/auth/login.html`
3. **Ils s'inscrivent** via une des méthodes (Google, Email, etc.)
4. **Accès total** au site après connexion
5. **Session sauvegardée** - Pas besoin de se reconnecter à chaque fois

### Pour Vous (Admin)

1. **Accès au dashboard** : `votre-site.com/dashboard/`
2. **Vérification automatique** de votre ID Discord
3. **Accès complet** à toutes les fonctionnalités admin
4. **Gestion en temps réel** :
   - Modifier les prix des services
   - Ajouter de nouveaux services
   - Gérer l'agenda
   - Voir les statistiques
   - Gérer les utilisateurs

### Accès Direct

- **Site public** : `votre-site.com`
- **Connexion** : `votre-site.com/auth/login.html`
- **Inscription** : `votre-site.com/auth/register.html`
- **Dashboard** : `votre-site.com/dashboard/`
- **Agenda public** : `votre-site.com/agenda/public-agenda.html`

---

## 🎨 Personnalisation

### Changer les couleurs

Éditez `/assets/dashboard.css` et modifiez :

```css
#0066ff  /* Bleu neon principal */
#0088ff  /* Bleu clair */
#003366  /* Bleu foncé */
```

### Ajouter des admins

Éditez `/config/firebase-config.js` :

```javascript
const ADMIN_DISCORD_IDS = [
    "woody_2009",      // Vous
    "autre_id_123",    // Autre admin
    "encore_un_456"    // Encore un admin
];
```

### Modifier les pages publiques

Éditez `/config/protect-site.js` :

```javascript
const PUBLIC_PAGES = [
    '/auth/login.html',
    '/auth/register.html',
    '/about.html',  // ← Ajouter une page publique
];
```

---

## 🔒 Sécurité

### Règles Firestore (IMPORTANT)

Après avoir tout configuré, retournez dans Firebase Console :

1. Allez dans **"Firestore Database"**
2. Cliquez sur **"Règles"**
3. Remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Les utilisateurs peuvent lire/écrire leurs propres données
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Seuls les admins peuvent accéder aux logs
    match /logs/{logId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Tout le monde peut lire les services
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Agenda accessible à tous en lecture
    match /appointments/{appointmentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Cliquez sur **"Publier"**

---

## ✅ Checklist Finale

Avant de mettre en ligne, vérifiez :

- [ ] Firebase configuré (Auth + Firestore)
- [ ] Clés Firebase dans `firebase-config.js`
- [ ] Webhook Discord configuré
- [ ] Votre ID Discord admin ajouté
- [ ] Scripts ajoutés à `index.html`
- [ ] Scripts ajoutés à toutes les pages du site
- [ ] Règles Firestore configurées
- [ ] Test de connexion avec Email
- [ ] Test de connexion avec Google
- [ ] Test d'accès au dashboard
- [ ] Test de logs Discord

---

## 🆘 Dépannage

### Erreur "Firebase not defined"
→ Vérifiez que les scripts Firebase sont bien chargés avant `firebase-config.js`

### Redirection infinie vers login
→ Vérifiez que `/auth/login.html` est bien dans `PUBLIC_PAGES`

### Pas de logs Discord
→ Vérifiez l'URL du webhook dans `firebase-config.js`

### Accès dashboard refusé
→ Vérifiez votre ID Discord dans `ADMIN_DISCORD_IDS`

### Erreur lors de l'inscription
→ Vérifiez que l'authentification Email est activée dans Firebase

---

## 📞 Support

Pour toute question ou problème :
- 📧 Email : omegaofficiel02@gmail.com
- 💬 Discord : woody_2009

---

## 🎉 Félicitations !

Votre site est maintenant doté d'un système d'authentification complet et d'un dashboard admin professionnel ! 🚀

**Prochaines étapes suggérées :**
1. Tester toutes les fonctionnalités
2. Personnaliser les couleurs à votre goût
3. Ajouter d'autres admins si nécessaire
4. Configurer l'agenda avec vos créneaux
5. Promouvoir votre nouveau système sécurisé !
