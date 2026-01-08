// ===== DOM ELEMENTS =====
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const mobileLangToggle = document.getElementById('mobileLangToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.querySelector('.mobile-menu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.querySelector('.contact-form');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

// ===== THEME TOGGLE =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
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
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            // For demo purposes, we'll just show the success modal
            
            // Simulate API call
            setTimeout(() => {
                contactForm.reset();
                formInputs.forEach(input => input.removeAttribute('data-filled'));
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 1000);
        });
    }
    
    // Modal close
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.style.width;
                skillLevel.style.width = '0';
                
                setTimeout(() => {
                    skillLevel.style.width = width;
                }, 300);
                
                skillObserver.unobserve(skillLevel);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ===== INITIALIZATION =====
function init() {
    // Initialize theme
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize language
    initLanguage();
    langToggle.addEventListener('click', toggleLanguage);
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', toggleLanguage);
    }
    
    // Initialize mobile menu
    menuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize back to top
    initBackToTop();
    
    // Initialize form
    initForm();
    
    // Initialize animations
    initAnimations();
    
    // Initialize skill bars
    initSkillBars();
    
    // Close mobile menu on resize (if desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', init);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle theme with Alt+T
    if (e.altKey && e.key === 't') {
        toggleTheme();
    }
    
    // Toggle language with Alt+L
    if (e.altKey && e.key === 'l') {
        toggleLanguage();
    }
    
    // Escape key closes modals and mobile menu
    if (e.key === 'Escape') {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        if (successModal.classList.contains('active')) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});