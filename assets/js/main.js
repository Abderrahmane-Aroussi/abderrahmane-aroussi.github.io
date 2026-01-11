// ===== DOM ELEMENTS =====
const langToggle = document.getElementById('langToggle');
const mobileLangToggle = document.getElementById('mobileLangToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.querySelector('.mobile-menu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.querySelector('.contact-form');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

// ===== SKILLS DATA =====
const skillsData = {
    networkSecurity: {
        title: "Network & Security",
        icon: "fas fa-shield-alt",
        skills: [
            { name: "Packet Tracer", icon: "fas fa-network-wired" },
            { name: "Wireshark", icon: "fas fa-eye" },
            { name: "Snort", icon: "fas fa-shield-alt" },
            { name: "TCP/IP", icon: "fas fa-sitemap" },
            { name: "VLAN", icon: "fas fa-project-diagram" },
            { name: "VPN", icon: "fas fa-lock" },
            { name: "Firewall", icon: "fas fa-fire" },
            { name: "Cryptography", icon: "fas fa-key" }
        ]
    },
    development: {
        title: "Development",
        icon: "fas fa-code",
        skills: [
            { name: "Python", icon: "fab fa-python" },
            { name: "Java", icon: "fab fa-java" },
            { name: "HTML/CSS", icon: "fab fa-html5" },
            { name: "JavaScript", icon: "fab fa-js" },
            { name: "SQL", icon: "fas fa-database" },
            { name: "Flask", icon: "fas fa-flask" },
            { name: "C Language", icon: "fas fa-c" },
            { name: "API REST", icon: "fas fa-exchange-alt" }
        ]
    },
    toolsSystems: {
        title: "Tools & Systems",
        icon: "fas fa-tools",
        skills: [
            { name: "Linux", icon: "fab fa-linux" },
            { name: "Windows Server", icon: "fab fa-windows" },
            { name: "Docker", icon: "fab fa-docker" },
            { name: "VirtualBox", icon: "fas fa-cube" },
            { name: "GitHub", icon: "fab fa-github" },
            { name: "MySQL", icon: "fas fa-database" },
            { name: "SQLite", icon: "fas fa-database" },
            { name: "MongoDB", icon: "fab fa-envira" },
            { name: "Arduino", icon: "fas fa-microchip" }
        ]
    },
    softSkills: {
        title: "Soft Skills",
        icon: "fas fa-users",
        skills: [
            { name: "Communication", icon: "fas fa-comments" },
            { name: "Teamwork", icon: "fas fa-handshake" },
            { name: "Problem Solving", icon: "fas fa-lightbulb" },
            { name: "Organization", icon: "fas fa-tasks" },
            { name: "Adaptability", icon: "fas fa-random" },
            { name: "Leadership", icon: "fas fa-flag" },
            { name: "Time Management", icon: "fas fa-clock" }
        ]
    }
};

// ===== SKILLS SECTION RENDER =====
function renderSkillsGrid() {
    // Network & Security
    const networkGrid = document.getElementById('network-skills-grid');
    if (networkGrid) {
        skillsData.networkSecurity.skills.forEach(skill => {
            const skillBox = createSkillBox(skill);
            networkGrid.appendChild(skillBox);
        });
    }
    
    // Development
    const developmentGrid = document.getElementById('development-skills-grid');
    if (developmentGrid) {
        skillsData.development.skills.forEach(skill => {
            const skillBox = createSkillBox(skill);
            developmentGrid.appendChild(skillBox);
        });
    }
    
    // Tools & Systems
    const toolsGrid = document.getElementById('tools-skills-grid');
    if (toolsGrid) {
        skillsData.toolsSystems.skills.forEach(skill => {
            const skillBox = createSkillBox(skill);
            toolsGrid.appendChild(skillBox);
        });
    }
    
    // Soft Skills
    const softSkillsGrid = document.getElementById('soft-skills-grid');
    if (softSkillsGrid) {
        skillsData.softSkills.skills.forEach(skill => {
            const skillBox = createSkillBox(skill);
            softSkillsGrid.appendChild(skillBox);
        });
    }
}

function createSkillBox(skill) {
    const skillBox = document.createElement('div');
    skillBox.className = 'skill-box';
    skillBox.innerHTML = `
        <div class="skill-icon">
            <i class="${skill.icon}"></i>
        </div>
        <span class="skill-name">${skill.name}</span>
    `;
    
    // Add hover effect
    skillBox.addEventListener('mouseenter', () => {
        skillBox.style.transform = 'translateY(-4px)';
    });
    
    skillBox.addEventListener('mouseleave', () => {
        skillBox.style.transform = 'translateY(0)';
    });
    
    return skillBox;
}

// ===== LANGUAGE TOGGLE =====
function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'fr';
    updateLanguage(savedLang);
}

function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    
    updateLanguage(newLang);
    localStorage.setItem('language', newLang);
}

function updateLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update text content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            element.textContent = translations[key][lang];
        }
    });
    
    // Update flags and language text
    const flags = document.querySelectorAll('.lang-flag');
    const langTexts = document.querySelectorAll('.lang-text');
    
    flags.forEach(flag => {
        flag.textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
    });
    
    langTexts.forEach(text => {
        text.textContent = lang === 'fr' ? 'FR' : 'EN';
    });
    
    if (mobileLangToggle) {
        const mobileLangText = mobileLangToggle.querySelector('.lang-text');
        mobileLangText.textContent = lang === 'fr' ? 'Français' : 'English';
    }
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu after clicking a link
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FORM HANDLING =====
function initForm() {
    // No longer need to handle form submission locally
    // Form will submit to Formspree directly
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Floating labels
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.setAttribute('data-filled', 'true');
            } else {
                input.removeAttribute('data-filled');
            }
        });
        
        // Trigger on page load if input has value
        if (input.value.trim() !== '') {
            input.setAttribute('data-filled', 'true');
        }
    });
}

// ===== PROJECT CARD HOVER EFFECTS =====
function initProjectHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// ===== SKILL BOX HOVER =====
function initSkillBoxes() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    skillBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'translateY(-4px)';
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateY(0)';
        });
    });
}

// ===== INITIALIZATION =====
function init() {
    // Initialize skills grid
    renderSkillsGrid();
    
    // Initialize language
    initLanguage();
    langToggle.addEventListener('click', toggleLanguage);
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', toggleLanguage);
    }
    
    // Initialize mobile menu
    menuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    
    // Initialize scroll reveal
    initScrollReveal();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize back to top
    initBackToTop();
    
    // Initialize form
    initForm();
    
    // Initialize project hover effects
    initProjectHover();
    
    // Initialize skill boxes hover
    initSkillBoxes();
    
    // Close mobile menu on resize (if desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Add reveal class to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', init);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle language with Alt+L
    if (e.altKey && e.key === 'l') {
        toggleLanguage();
    }
    
    // Escape key closes modals and mobile menu
    if (e.key === 'Escape') {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Handle scroll for animations
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100);
        });
    }, 500);
});
