// ============================================
// CONFIGURATION FIREBASE (COMPAT HTML)
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
// CONFIGURATION DISCORD WEBHOOK
// ============================================
// ⚠️ METS TON VRAI WEBHOOK DISCORD ICI
// (Sinon les logs Discord seront ignorés sans casser le site)

const DISCORD_WEBHOOK_URL = ""; // ex: https://discord.com/api/webhooks/XXXX/XXXX

// ============================================
// LISTE DES ADMINS (EMAILS OU UID FIREBASE)
// ============================================

const ADMIN_EMAILS = [
    "omegaofficiel02@gmail.com"
];

// ============================================
// INITIALISATION FIREBASE
// ============================================

let app, auth, db;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    console.log("✅ Firebase initialisé avec succès");
} catch (error) {
    console.error("❌ Erreur initialisation Firebase :", error);
}

// ============================================
// ENVOI DES LOGS DISCORD (OPTIONNEL)
// ============================================

async function sendDiscordLog(type, user, details = {}) {
    if (!DISCORD_WEBHOOK_URL) return; // évite toute erreur si vide

    const colors = {
        register: 3066993, // Vert
        login: 3447003,    // Bleu
        logout: 15158332,  // Rouge
        visit: 10181046    // Violet
    };

    const embed = {
        title: `🔔 ${type.toUpperCase()}`,
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
        footer: {
            text: "CRG Services - System Logs"
        },
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
    } catch (e) {
        console.error("❌ Erreur webhook Discord :", e);
    }
}

// ============================================
// VÉRIFICATION ADMIN
// ============================================

function isAdmin(user) {
    if (!user) return false;
    if (ADMIN_EMAILS.includes(user.email)) return true;
    return false;
}

// ============================================
// EXPORT GLOBAL (OBLIGATOIRE POUR register.html)
// ============================================

window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.sendDiscordLog = sendDiscordLog;
window.isAdmin = isAdmin;
