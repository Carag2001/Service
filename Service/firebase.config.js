// ============================================
// CONFIGURATION FIREBASE (HTML COMPAT – OBLIGATOIRE)
// ============================================

// ⚠️ Ce fichier DOIT être chargé APRÈS :
// firebase-app-compat.js
// firebase-auth-compat.js
// firebase-firestore-compat.js

if (typeof firebase === "undefined") {
    console.error("❌ Firebase SDK NON chargé. Vérifie l’ordre des <script>");
}

// ============================================
// CONFIG FIREBASE
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyDubDGWvUQPDuo2pDfyXlrYK5TqqsdhFCw",
    authDomain: "crg-console.firebaseapp.com",
    projectId: "crg-console",
    storageBucket: "crg-console.appspot.com",
    messagingSenderId: "254478831839",
    appId: "1:254478831839:web:2cc70922b4ecb8fd48d96a"
};

// ============================================
// DISCORD WEBHOOK (OPTIONNEL)
// ============================================

const DISCORD_WEBHOOK_URL = ""; 
// https://discord.com/api/webhooks/XXXX/XXXX

// ============================================
// ADMINS
// ============================================

const ADMIN_EMAILS = [
    "omegaofficiel02@gmail.com"
];

// ============================================
// INITIALISATION FIREBASE (ANTI-ERREUR)
// ============================================

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

try {
    if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
        firebaseApp = firebase.app();
    }

    firebaseAuth = firebase.auth();
    firebaseDb = firebase.firestore();

    console.log("✅ Firebase initialisé");
} catch (e) {
    console.error("❌ Erreur Firebase :", e);
}

// ============================================
// LOGS DISCORD
// ============================================

async function sendDiscordLog(type, user, details = {}) {
    if (!DISCORD_WEBHOOK_URL) return;

    const colors = {
        register: 3066993,
        login: 3447003,
        logout: 15158332,
        visit: 10181046
    };

    const embed = {
        title: `🔔 ${String(type).toUpperCase()}`,
        color: colors[type] || 0,
        fields: [
            {
                name: "👤 Utilisateur",
                value: user?.email || user?.displayName || "Anonyme",
                inline: true
            },
            {
                name: "🕐 Heure",
                value: new Date().toLocaleString("fr-FR"),
                inline: true
            }
        ],
        footer: { text: "CRG Services - System Logs" },
        timestamp: new Date().toISOString()
    };

    if (details.provider) {
        embed.fields.push({
            name: "🔑 Méthode",
            value: details.provider,
            inline: true
        });
    }

    if (user?.uid) {
        embed.fields.push({
            name: "🆔 UID",
            value: user.uid,
            inline: false
        });
    }

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] })
        });
    } catch (err) {
        console.error("❌ Erreur Discord webhook :", err);
    }
}

// ============================================
// ADMIN CHECK
// ============================================

function isAdmin(user) {
    if (!user) return false;
    return ADMIN_EMAILS.includes(user.email);
}

// ============================================
// EXPORT GLOBAL (OBLIGATOIRE)
// ============================================

window.firebaseApp = firebaseApp;
window.firebaseAuth = firebaseAuth;
window.firebaseDb = firebaseDb;
window.sendDiscordLog = sendDiscordLog;
window.isAdmin = isAdmin;
