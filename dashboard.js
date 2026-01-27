// ============================================
// DASHBOARD HELPER FUNCTIONS
// ============================================

// Fonctions utilitaires pour le dashboard

// Formater une date
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Formater un prix
function formatPrice(price) {
    if (!price || price === 0) return 'Sur demande';
    return price.toFixed(2) + ' €';
}

// Créer un toast de notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const styles = {
        info: { bg: 'rgba(0, 102, 255, 0.2)', border: '#0066ff', color: '#0066ff' },
        success: { bg: 'rgba(81, 207, 102, 0.2)', border: '#51cf66', color: '#51cf66' },
        error: { bg: 'rgba(255, 107, 107, 0.2)', border: '#ff6b6b', color: '#ff6b6b' },
        warning: { bg: 'rgba(255, 211, 61, 0.2)', border: '#ffd93d', color: '#ffd93d' }
    };
    
    const style = styles[type] || styles.info;
    
    Object.assign(toast.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: style.bg,
        border: `2px solid ${style.border}`,
        color: style.color,
        padding: '1rem 2rem',
        borderRadius: '10px',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out',
        fontWeight: 'bold',
        boxShadow: `0 0 20px ${style.border}40`
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Ajouter les animations CSS si elles n'existent pas
if (!document.getElementById('dashboard-animations')) {
    const style = document.createElement('style');
    style.id = 'dashboard-animations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Confirmer une action
function confirmAction(message) {
    return new Promise((resolve) => {
        const confirmed = confirm(message);
        resolve(confirmed);
    });
}

// Loader overlay
function showLoader(show = true) {
    let loader = document.getElementById('globalLoader');
    
    if (show && !loader) {
        loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(10px);
            ">
                <div style="text-align: center;">
                    <div style="
                        border: 4px solid rgba(0, 102, 255, 0.3);
                        border-top: 4px solid #0066ff;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 1rem;
                    "></div>
                    <p style="color: #0066ff; font-weight: bold; font-size: 1.2rem;">
                        Chargement...
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
    } else if (!show && loader) {
        loader.remove();
    }
}

// Copier dans le presse-papiers
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('✅ Copié dans le presse-papiers', 'success');
        return true;
    } catch (error) {
        console.error('Erreur copie:', error);
        showToast('❌ Erreur lors de la copie', 'error');
        return false;
    }
}

// Générer un ID unique
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Valider un email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Valider un numéro de téléphone
function isValidPhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Truncate text
function truncate(text, length = 100) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substr(0, length) + '...';
}

// Débounce function
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Sauvegarder un log d'activité
async function logActivity(action, details = {}) {
    try {
        const user = firebaseAuth.currentUser;
        if (!user) return;
        
        await firebaseDb.collection('logs').add({
            action: action,
            userEmail: user.email,
            userId: user.uid,
            details: details,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Erreur log activité:', error);
    }
}

// Exporter des données en JSON
function exportToJSON(data, filename = 'export') {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${filename}_${Date.now()}.json`;
    link.click();
    
    showToast('📥 Export réussi', 'success');
}

// Exporter des données en CSV
function exportToCSV(data, filename = 'export') {
    if (!data || !data.length) {
        showToast('❌ Aucune donnée à exporter', 'error');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') 
                ? `"${value}"` 
                : value;
        }).join(','))
    ].join('\n');
    
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${filename}_${Date.now()}.csv`;
    link.click();
    
    showToast('📥 Export CSV réussi', 'success');
}

// Calculer des statistiques
function calculateStats(data, field) {
    if (!data || !data.length) return { min: 0, max: 0, avg: 0, sum: 0 };
    
    const values = data.map(item => item[field] || 0);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return { min, max, avg, sum };
}

// Rechercher dans une collection
function searchCollection(collection, searchTerm, fields = []) {
    if (!searchTerm) return collection;
    
    const term = searchTerm.toLowerCase();
    return collection.filter(item => {
        return fields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(term);
        });
    });
}

// Trier une collection
function sortCollection(collection, field, order = 'asc') {
    return [...collection].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        
        if (aVal === bVal) return 0;
        if (order === 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
    });
}

// Paginer une collection
function paginateCollection(collection, page = 1, perPage = 10) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const items = collection.slice(start, end);
    const totalPages = Math.ceil(collection.length / perPage);
    
    return {
        items,
        page,
        perPage,
        totalPages,
        totalItems: collection.length,
        hasNext: page < totalPages,
        hasPrev: page > 1
    };
}

// Créer un badge de statut
function createStatusBadge(status) {
    const badges = {
        active: { text: '✅ Actif', class: 'badge-active' },
        inactive: { text: '❌ Inactif', class: 'badge-inactive' },
        pending: { text: '⏳ En attente', class: 'badge-pending' },
        completed: { text: '✓ Terminé', class: 'badge-completed' },
        cancelled: { text: '✕ Annulé', class: 'badge-cancelled' }
    };
    
    const badge = badges[status] || { text: status, class: 'badge-default' };
    return `<span class="status-badge ${badge.class}">${badge.text}</span>`;
}

// Initialiser les tooltips
function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 102, 255, 0.9);
                color: #fff;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.85rem;
                z-index: 10000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            e.target._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', (e) => {
            if (e.target._tooltip) {
                e.target._tooltip.remove();
                delete e.target._tooltip;
            }
        });
    });
}

// Auto-initialiser les tooltips au chargement
document.addEventListener('DOMContentLoaded', initTooltips);

// Exporter toutes les fonctions
window.dashboardHelpers = {
    formatDate,
    formatPrice,
    showToast,
    confirmAction,
    showLoader,
    copyToClipboard,
    generateId,
    isValidEmail,
    isValidPhone,
    truncate,
    debounce,
    logActivity,
    exportToJSON,
    exportToCSV,
    calculateStats,
    searchCollection,
    sortCollection,
    paginateCollection,
    createStatusBadge,
    initTooltips
};

console.log('✅ Dashboard Helpers chargé avec succès');
