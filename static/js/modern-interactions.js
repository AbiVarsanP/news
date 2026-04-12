// ============================================
// Modern News App JavaScript
// Author: AI Assistant
// Date: January 2026
// ============================================

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Hamburger Menu Toggle
// ============================================
function initHamburgerMenu() {
    const hamburgerToggle = document.getElementById('hamburgerToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburgerToggle || !navMenu) return;
    
    // Toggle menu on hamburger click
    hamburgerToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburgerToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update aria-expanded attribute
        const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
        hamburgerToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('active');
            hamburgerToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || hamburgerToggle.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('active')) {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('active');
            hamburgerToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('active');
            hamburgerToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================
// Navigation Scroll Effect
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-modern');
    if (!navbar) return;

    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    const handleScroll = throttle(() => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Toast Notifications
// ============================================
class ToastManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        this.container.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }

    getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        return icons[type] || icons.info;
    }
}

const toast = new ToastManager();

// ============================================
// Form Validation & Enhancement
// ============================================
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add floating label effect
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            }

            input.addEventListener('blur', () => {
                if (input.value) {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });

        // Form submission handling
        form.addEventListener('submit', function(e) {
            // Add loading state to submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
            }
        });
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe article cards and other elements
    document.querySelectorAll('.article-card, .comment-item, .form-modern').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Card Hover 3D Effect
// ============================================
function init3DCardEffect() {
    const cards = document.querySelectorAll('.article-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// Dark Mode Toggle
// ============================================
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        toast.show(`${icon} ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`, 'success');
    });
}

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Character Counter for Textareas
// ============================================
function initCharacterCounter() {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;';
        
        const updateCounter = () => {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 20 ? 'var(--danger-color)' : 'var(--text-muted)';
        };
        
        textarea.parentNode.appendChild(counter);
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });
}

// ============================================
// Dropdown Menu Interactions
// ============================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-modern');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu-modern');
        
        if (!toggle || !menu) return;

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                menu.classList.remove('show');
            }
        });

        // Toggle dropdown on click
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('show');
        });
    });
}

// ============================================
// Copy to Clipboard
// ============================================
function initCopyToClipboard() {
    document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(textToCopy);
                toast.show('Copied to clipboard!', 'success');
            } catch (err) {
                toast.show('Failed to copy', 'error');
            }
        });
    });
}

// ============================================
// Auto-save Forms
// ============================================
function initAutoSave() {
    const forms = document.querySelectorAll('[data-autosave]');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            const saveKey = `autosave_${form.id}_${input.name}`;
            
            // Load saved value
            const savedValue = localStorage.getItem(saveKey);
            if (savedValue && !input.value) {
                input.value = savedValue;
            }
            
            // Save on input
            input.addEventListener('input', debounce(() => {
                localStorage.setItem(saveKey, input.value);
            }, 500));
        });
        
        // Clear saved data on successful submit
        form.addEventListener('submit', () => {
            inputs.forEach(input => {
                const saveKey = `autosave_${form.id}_${input.name}`;
                localStorage.removeItem(saveKey);
            });
        });
    });
}

// ============================================
// Reading Progress Bar
// ============================================
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    const updateProgress = throttle(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
    }, 50);

    window.addEventListener('scroll', updateProgress);
}

// ============================================
// Initialize All Features
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Modern News App initialized');
    
    // Mobile features
    initHamburgerMenu();
    
    // Core features
    initNavbarScroll();
    initBackToTop();
    initSmoothScroll();
    
    // Form enhancements
    initFormEnhancements();
    initCharacterCounter();
    
    // Visual effects
    initScrollReveal();
    init3DCardEffect();
    initLazyLoading();
    
    // Interactive features
    initDropdowns();
    initDarkMode();
    initCopyToClipboard();
    initAutoSave();
    initReadingProgress();
    
    // Show welcome toast for authenticated users
    const username = document.querySelector('.nav-link.dropdown-toggle');
    if (username && window.location.pathname === '/') {
        setTimeout(() => {
            toast.show(`Welcome back, ${username.textContent.trim()}!`, 'success');
        }, 500);
    }
});

// ============================================
// Handle Form Success Messages
// ============================================
window.addEventListener('load', () => {
    // Check for Django messages
    const djangoMessages = document.querySelectorAll('.alert, .message');
    djangoMessages.forEach(message => {
        const text = message.textContent.trim();
        let type = 'info';
        
        if (message.classList.contains('alert-success') || message.classList.contains('success')) {
            type = 'success';
        } else if (message.classList.contains('alert-danger') || message.classList.contains('error')) {
            type = 'error';
        } else if (message.classList.contains('alert-warning') || message.classList.contains('warning')) {
            type = 'warning';
        }
        
        toast.show(text, type);
        message.style.display = 'none';
    });
});

// ============================================
// Export for use in other scripts
// ============================================
window.NewsApp = {
    toast,
    debounce,
    throttle
};
