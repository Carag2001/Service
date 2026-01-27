# 🚀 GUIDE D'INSTALLATION RAPIDE - CRG SERVICES

## ⚡ Installation en 10 minutes

### 1️⃣ Télécharger les fichiers (FAIT ✅)

Vous avez reçu les dossiers suivants :
```
├── auth/                  (2 fichiers)
├── dashboard/             (2 fichiers pour le moment)
├── config/                (2 fichiers)
├── assets/                (1 fichier CSS)
└── README.md              (Documentation complète)
```

### 2️⃣ Copier les fichiers sur votre serveur

Placez tous ces dossiers **à la racine** de votre site :

```
votre-site/
├── index.html         ← VOTRE FICHIER EXISTANT
├── services/          ← VOS DOSSIERS EXISTANTS
├── recrutement.html   ← VOS FICHIERS EXISTANTS
│
├── auth/              ← ✨ NOUVEAU (à copier)
├── dashboard/         ← ✨ NOUVEAU (à copier)
├── config/            ← ✨ NOUVEAU (à copier)
└── assets/            ← ✨ NOUVEAU (à copier)
```

### 3️⃣ Configurer Firebase (5 minutes)

1. Allez sur https://console.firebase.google.com
2. Créez un projet "CRG-Services"
3. Activez **Authentication** → Email, Google, Téléphone
4. Activez **Firestore Database** (mode test)
5. Récupérez vos clés dans Paramètres du projet
6. Collez les clés dans `/config/firebase-config.js`

### 4️⃣ Configurer Discord Webhook (2 minutes)

1. Sur votre serveur Discord → Modifier le salon → Intégrations
2. Créez un Webhook → Copiez l'URL
3. Collez l'URL dans `/config/firebase-config.js`
4. Ajoutez votre ID Discord dans la liste des admins

### 5️⃣ Protéger votre site (3 minutes)

Dans **CHAQUE** page de votre site (`index.html`, `services/*.html`, etc.), ajoutez **AVANT** `</body>` :

```html
<!-- Protection du site -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="config/firebase-config.js"></script>
<script src="config/protect-site.js"></script>
</body>
```

**Note** : Pour les pages dans des sous-dossiers (`/services/`), utilisez :
```html
<script src="../config/firebase-config.js"></script>
<script src="../config/protect-site.js"></script>
```

### 6️⃣ Tester ! (1 minute)

1. Ouvrez `votre-site.com` → Devrait rediriger vers login
2. Créez un compte avec Email ou Google
3. Une fois connecté → Accès au site ✅
4. Allez sur `votre-site.com/dashboard/` → Dashboard admin ✅
5. Vérifiez Discord → Vous devriez voir des logs ✅

---

## ✅ FONCTIONNALITÉS INSTALLÉES

### Pour les Visiteurs
- ✅ **Connexion obligatoire** (Email, Google, Téléphone, Discord, Apple)
- ✅ **Inscription simple** en quelques clics
- ✅ **Session persistante** (pas besoin de se reconnecter)
- ✅ **Accès total** au site après connexion

### Pour Vous (Admin)
- ✅ **Dashboard complet** accessible à `/dashboard/`
- ✅ **Gestion des services** (ajouter, modifier, supprimer, changer les prix)
- ✅ **Statistiques en temps réel** (visiteurs, inscriptions)
- ✅ **Logs Discord automatiques** pour chaque action
- ✅ **Vérification par ID Discord** (seuls les admins autorisés)
- ✅ **Gestion des utilisateurs** (bannir, autoriser)

---

## 📋 CHECKLIST AVANT MISE EN LIGNE

- [ ] Fichiers copiés sur le serveur
- [ ] Firebase configuré (Auth + Firestore activés)
- [ ] Clés Firebase dans `firebase-config.js`
- [ ] Webhook Discord configuré
- [ ] Votre ID Discord ajouté comme admin
- [ ] Scripts de protection ajoutés à `index.html`
- [ ] Scripts de protection ajoutés à toutes les pages
- [ ] Test de connexion Email réussi
- [ ] Test de connexion Google réussi
- [ ] Accès dashboard vérifié
- [ ] Logs Discord fonctionnels

---

## 🆘 PROBLÈMES FRÉQUENTS

### "Firebase not defined"
→ Les scripts Firebase ne sont pas chargés
→ Vérifiez l'ordre des `<script>` dans votre HTML

### "Redirection infinie"
→ La page `/auth/login.html` n'est pas dans les pages publiques
→ Vérifiez `protect-site.js`

### "Accès dashboard refusé"
→ Votre ID Discord n'est pas dans la liste
→ Vérifiez `ADMIN_DISCORD_IDS` dans `firebase-config.js`

### "Pas de logs Discord"
→ L'URL du webhook est incorrecte
→ Revérifiez le webhook dans `firebase-config.js`

---

## 📞 BESOIN D'AIDE ?

📧 Email : omegaofficiel02@gmail.com
💬 Discord : woody_2009

---

## 🎉 PROCHAINES ÉTAPES

Une fois l'installation terminée, vous pouvez :

1. **Personnaliser les couleurs** du dashboard dans `/assets/dashboard.css`
2. **Ajouter des services** via le dashboard
3. **Configurer l'agenda** (bientôt disponible)
4. **Ajouter d'autres admins** dans `firebase-config.js`
5. **Analyser les statistiques** dans le dashboard

---

## 🔒 SÉCURITÉ

N'oubliez pas de configurer les règles Firestore (voir README.md complet) !

---

**Félicitations ! Votre site est maintenant sécurisé et dispose d'un système de gestion professionnel ! 🚀**
