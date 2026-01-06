// ========================================
// Geopolitical Analysis Website - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Geopolitical Analysis website loaded');
    
    // Initialize all features
    initNavigation();
    initContactForm();
    initSmoothScroll();
    initActiveNavigation();
});

// ========================================
// Navigation Functionality
// ========================================

function initNavigation() {
    // Mobile menu toggle (for future implementation)
    const navLinks = document.querySelector('.nav-links');
    
    // Add aria labels for accessibility
    if (navLinks) {
        navLinks.setAttribute('role', 'navigation');
        navLinks.setAttribute('aria-label', 'Main navigation');
    }
}

// ========================================
// Active Navigation Highlighting
// ========================================

function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Contact Form Handling
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (validateContactForm(formData)) {
        // In a real implementation, this would send data to a backend
        // For now, we'll just show a success message
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Log form data (for development purposes)
        console.log('Form submitted:', formData);
    }
}

function validateContactForm(data) {
    // Basic validation
    if (!data.name.trim()) {
        showFormMessage('Please enter your name.', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.subject.trim()) {
        showFormMessage('Please enter a subject.', 'error');
        return false;
    }
    
    if (!data.message.trim() || data.message.length < 10) {
        showFormMessage('Please enter a message (at least 10 characters).', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.fontWeight = '600';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    // Insert message before form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.5s';
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// ========================================
// Smooth Scrolling
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore if it's just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
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

// ========================================
// Utility Functions
// ========================================

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

// Throttle function for scroll/resize events
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Analytics & Tracking (Placeholder)
// ========================================

function trackPageView() {
    // Placeholder for analytics integration
    // Example: Google Analytics, Plausible, etc.
    console.log('Page view tracked:', window.location.pathname);
}

// Track page view on load
trackPageView();
