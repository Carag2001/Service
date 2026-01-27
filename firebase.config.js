// ============================================
// CONFIGURATION FIREBASE
// ============================================
// 🔥 Remplacez ces valeurs par celles de VOTRE projet Firebase
// Tutoriel: https://firebase.google.com/docs/web/setup

const firebaseConfig = {
    apiKey: "AIzaSyDubDGWvUQPDuo2pDfyXlrYK5TqqsdhFCw",
    authDomain: "crg-console.firebaseapp.com",
    projectId: "crg-console",
    storageBucket: "crg-console.appspot.com",
    messagingSenderId: "254478831839",
    appId: "1:254478831839:web:2cc70922b4ecb8fd48d96a"
};

// ============================================
// CONFIGURATION DISCORD WEBHOOK
// ============================================
// 🔔 Créez un webhook dans votre serveur Discord
// Serveur > Paramètres > Intégrations > Webhooks > Nouveau Webhook

const DISCORD_WEBHOOK_URL = "VOTRE_WEBHOOK_URL_DISCORD";

// ============================================
// LISTE DES ADMINS (IDs Discord)
// ============================================
// 👑 Seuls ces utilisateurs auront accès au dashboard admin

const ADMIN_DISCORD_IDS = [
    "woody_2009",  // Votre ID Discord
    // Ajoutez d'autres IDs si besoin
];

// ============================================
// NE PAS MODIFIER EN DESSOUS
// ============================================

// Initialiser Firebase
let app, auth, db;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    console.log("✅ Firebase initialisé avec succès");
} catch (error) {
    console.error("❌ Erreur initialisation Firebase:", error);
}

// Fonction pour envoyer des logs à Discord
async function sendDiscordLog(type, user, details = {}) {
    const colors = {
        register: 3066993,  // Vert
        login: 3447003,     // Bleu
        logout: 15158332,   // Rouge
        visit: 10181046     // Violet
    };

    const embed = {
        title: `🔔 ${type.toUpperCase()}`,
        color: colors[type] || 0,
        fields: [
            {
                name: "👤 Utilisateur",
                value: user.email || user.phoneNumber || user.displayName || "Anonyme",
                inline: true
            },
            {
                name: "🕐 Heure",
                value: new Date().toLocaleString('fr-FR'),
                inline: true
            }
        ],
        footer: {
            text: "CRG Services - System Logs"
        },
        timestamp: new Date().toISOString()
    };

    // Ajouter détails supplémentaires
    if (details.provider) {
        embed.fields.push({
            name: "🔑 Méthode",
            value: details.provider,
            inline: true
        });
    }

    if (details.ip) {
        embed.fields.push({
            name: "🌐 IP",
            value: details.ip,
            inline: true
        });
    }

    if (user.uid) {
        embed.fields.push({
            name: "🆔 UID",
            value: user.uid,
            inline: false
        });
    }

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });
    } catch (error) {
        console.error("Erreur envoi Discord:", error);
    }
}

// Fonction pour vérifier si l'utilisateur est admin
function isAdmin(user) {
    if (!user) return false;
    
    // Vérifier par ID Discord (si connecté via Discord)
    if (user.providerData) {
        const discordProvider = user.providerData.find(p => p.providerId === 'discord');
        if (discordProvider && ADMIN_DISCORD_IDS.includes(discordProvider.uid)) {
            return true;
        }
    }
    
    // Vérifier par email admin (optionnel)
    const adminEmails = ['omegaofficiel02@gmail.com'];
    if (adminEmails.includes(user.email)) {
        return true;
    }
    
    return false;
}

// Exporter les fonctions
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.sendDiscordLog = sendDiscordLog;
window.isAdmin = isAdmin;
