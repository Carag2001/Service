// ===== MENU HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== ANIMATION DES COMPTEURS =====
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 secondes
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statsSection = document.querySelector('.stats-section');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, {
    threshold: 0.5
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== SMOOTH SCROLL POUR LES BOUTONS =====
const btnPrimary = document.querySelector('.btn-primary');
const btnSecondary = document.querySelector('.btn-secondary');

if (btnPrimary) {
    btnPrimary.addEventListener('click', () => {
        document.querySelector('#services').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

if (btnSecondary) {
    btnSecondary.addEventListener('click', () => {
        document.querySelector('#portfolio').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

// ===== GESTION DU FORMULAIRE DE CONTACT =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Le formulaire est géré par FormSubmit
        // Animation du bouton submit
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.querySelector('span').textContent = 'ENVOI EN COURS...';
        submitBtn.style.pointerEvents = 'none';
    });
}

// ===== EFFET HOVER SUR LES CARTES PORTFOLIO =====
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== ANIMATION AU CHARGEMENT =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== NAVIGATION ACTIVE =====
const sections = document.querySelectorAll('section[id]');

const navHighlighter = () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', navHighlighter);
