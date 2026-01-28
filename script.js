// ===== MENU HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(255, 0, 51, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.width = '0';
    
    setTimeout(() => {
        typingText.style.width = '100%';
    }, 1000);
}

// ===== GLITCH EFFECT =====
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0033,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0000ff
            `;
            setTimeout(() => {
                glitchText.style.textShadow = '0 0 10px rgba(255, 0, 51, 0.8), 0 0 20px rgba(255, 0, 51, 0.8)';
            }, 50);
        }
    }, 100);
}

// ===== INTERSECTION OBSERVER POUR ANIMATIONS =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .info-card, .section-title');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// ===== PARALLAX EFFECT SUR LES CERCLES NÉON =====
const neonCircles = document.querySelectorAll('.neon-circle');
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    neonCircles.forEach((circle, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        circle.style.transform = `translate(${x}px, ${y}px) rotate(${index * 120}deg)`;
    });
});

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation de succès
        const button = contactForm.querySelector('.btn-submit');
        const originalText = button.querySelector('span').textContent;
        
        button.querySelector('span').textContent = 'ENVOI EN COURS...';
        button.style.pointerEvents = 'none';
        
        // Simulation d'envoi
        setTimeout(() => {
            button.querySelector('span').textContent = '✓ MESSAGE ENVOYÉ';
            button.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
            button.style.borderColor = '#00ff00';
            button.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.6)';
            
            // Réinitialiser après 3 secondes
            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
                button.style.background = '';
                button.style.borderColor = '';
                button.style.boxShadow = '';
                button.style.pointerEvents = '';
                contactForm.reset();
            }, 3000);
        }, 2000);
    });
}

// ===== ANIMATION DES INPUTS =====
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('.input-line').style.width = '100%';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('.input-line').style.width = '0';
        }
    });
});

// ===== EFFECT CODE RAIN (MATRIX STYLE) =====
const codeRain = document.querySelector('.code-rain');
if (codeRain) {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.color = 'rgba(255, 0, 51, 0.3)';
        span.style.fontSize = '12px';
        span.style.fontFamily = 'monospace';
        span.style.animation = `fall ${5 + Math.random() * 10}s linear infinite`;
        span.style.animationDelay = Math.random() * 5 + 's';
        codeRain.appendChild(span);
    }
}

// Animation de chute pour le code rain
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== BOUTONS NÉON INTERACTIFS =====
const btnNeons = document.querySelectorAll('.btn-neon');
btnNeons.forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Animation ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== CURSOR CUSTOM EFFECT =====
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #ff0033;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    box-shadow: 0 0 20px rgba(255, 0, 51, 0.5);
`;
document.body.appendChild(cursor);

const cursorTrail = document.createElement('div');
cursorTrail.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #ff0033;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.15s ease;
    box-shadow: 0 0 10px rgba(255, 0, 51, 0.8);
`;
document.body.appendChild(cursorTrail);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX - 4 + 'px';
        cursorTrail.style.top = e.clientY - 4 + 'px';
    }, 50);
});

// Agrandir le curseur au survol des éléments cliquables
const clickables = document.querySelectorAll('a, button, .service-card, .portfolio-item');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.marginLeft = '-10px';
        cursor.style.marginTop = '-10px';
        cursor.style.background = 'rgba(255, 0, 51, 0.2)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.marginLeft = '0';
        cursor.style.marginTop = '0';
        cursor.style.background = 'transparent';
    });
});

// ===== STATISTIQUES ANIMÉES =====
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    stat.style.cursor = 'pointer';
    
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 15px rgba(255, 0, 51, 0.6)';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '';
    });
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const easterEgg = document.createElement('div');
        easterEgg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-family: 'Orbitron', sans-serif;
            color: #ff0033;
            text-shadow: 0 0 30px rgba(255, 0, 51, 1);
            z-index: 10000;
            animation: pulse 1s infinite;
        `;
        easterEgg.textContent = '🎮 KONAMI CODE ACTIVATED! 🎮';
        document.body.appendChild(easterEgg);
        
        setTimeout(() => {
            easterEgg.remove();
            document.body.style.animation = '';
        }, 3000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c👾 CRG DIGITAL 👾', 'font-size: 30px; font-weight: bold; color: #ff0033; text-shadow: 0 0 10px rgba(255, 0, 51, 0.8);');
console.log('%cBienvenue dans le code source ! 🚀', 'font-size: 16px; color: #ffffff;');
console.log('%cSupport CRG Activé', 'font-size: 14px; color: #b0b0b0;');

// ===== PERFORMANCES: LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff0033, #ff6666);
    box-shadow: 0 0 10px rgba(255, 0, 51, 0.8);
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

// ===== FPS COUNTER (DEVELOPPEMENT) =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    let lastTime = performance.now();
    let frames = 0;
    
    const fpsDisplay = document.createElement('div');
    fpsDisplay.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: #ff0033;
        padding: 5px 10px;
        font-family: 'Orbitron', monospace;
        font-size: 12px;
        border: 1px solid #ff0033;
        z-index: 10000;
    `;
    document.body.appendChild(fpsDisplay);
    
    function updateFPS() {
        frames++;
        const now = performance.now();
        if (now >= lastTime + 1000) {
            fpsDisplay.textContent = `FPS: ${frames}`;
            frames = 0;
            lastTime = now;
        }
        requestAnimationFrame(updateFPS);
    }
    updateFPS();
}

console.log('%c✨ Script chargé avec succès !', 'color: #0026ff; font-weight: bold;');
