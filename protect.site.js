// ============================================
// SCRIPT DE PROTECTION DU SITE
// ============================================
// Ce script vérifie si l'utilisateur est connecté
// Si non connecté → Redirection vers page de connexion

(function() {
    'use strict';
    
    // Pages publiques (accessibles sans connexion)
    const PUBLIC_PAGES = [
        '/auth/login.html',
        '/auth/register.html'
    ];
    
    // Vérifier si la page actuelle est publique
    function isPublicPage() {
        const currentPath = window.location.pathname;
        return PUBLIC_PAGES.some(page => currentPath.includes(page));
    }
    
    // Fonction de protection
    function protectPage() {
        // Ne pas protéger les pages publiques
        if (isPublicPage()) {
            return;
        }
        
        // Vérifier l'état de connexion
        firebaseAuth.onAuthStateChanged((user) => {
            if (!user) {
                // Utilisateur non connecté → Redirection
                console.log('🔒 Accès refusé - Connexion requise');
                window.location.href = '/auth/login.html';
            } else {
                // Utilisateur connecté → Autoriser l'accès
                console.log('✅ Utilisateur connecté:', user.email || user.phoneNumber);
                
                // Log de visite sur Discord
                sendDiscordLog('visit', user, {
                    page: window.location.pathname
                });
                
                // Afficher les informations utilisateur dans le header (optionnel)
                displayUserInfo(user);
            }
        });
    }
    
    // Afficher les infos utilisateur
    function displayUserInfo(user) {
        // Créer un élément dans le header pour afficher l'utilisateur
        const nav = document.querySelector('nav ul');
        if (nav && !document.getElementById('userInfo')) {
            const userInfo = document.createElement('li');
            userInfo.id = 'userInfo';
            userInfo.style.cssText = 'display: flex; align-items: center; gap: 10px; border-left: 2px solid rgba(0, 102, 255, 0.3); padding-left: 1rem; margin-left: 1rem;';
            
            userInfo.innerHTML = `
                <span style="color: #0066ff;">👤 ${user.displayName || user.email || 'Utilisateur'}</span>
                <button onclick="logout()" style="
                    background: rgba(255, 0, 0, 0.1);
                    border: 2px solid rgba(255, 0, 0, 0.3);
                    color: #ff6b6b;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: bold;
                ">
                    🚪 Déconnexion
                </button>
            `;
            
            nav.appendChild(userInfo);
        }
    }
    
    // Fonction de déconnexion
    window.logout = async function() {
        try {
            const user = firebaseAuth.currentUser;
            await sendDiscordLog('logout', user);
            await firebaseAuth.signOut();
            window.location.href = '/auth/login.html';
        } catch (error) {
            console.error('Erreur déconnexion:', error);
        }
    };
    
    // Lancer la protection au chargement
    if (typeof firebaseAuth !== 'undefined') {
        protectPage();
    } else {
        // Attendre que Firebase soit chargé
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(protectPage, 1000);
        });
    }
    
})();
