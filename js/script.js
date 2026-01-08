// ========================================
// Geopolitical Analysis Website - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('Geopolitical Analysis website loaded');

    // Initialize all features
    initNavigation();
    initContactForm();
    initSmoothScroll();
    initActiveNavigation();
    initReportsCarousel();
    initContentRender();
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
        anchor.addEventListener('click', function (e) {
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
// Reports Carousel
// ========================================

function initReportsCarousel() {
    const container = document.querySelector('.reports-container');
    const grid = document.getElementById('reportsGrid');
    if (!container || !grid) return;

    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    if (!prevBtn || !nextBtn) return;

    const cards = Array.from(grid.querySelectorAll('.report-card'));
    if (cards.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    function updateMode() {
        const needsCarousel = cards.length > 4;
        if (needsCarousel) {
            container.classList.add('is-carousel');
            grid.classList.add('is-carousel');
            prevBtn.style.display = 'grid';
            nextBtn.style.display = 'grid';
        } else {
            container.classList.remove('is-carousel');
            grid.classList.remove('is-carousel');
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            grid.scrollLeft = 0;
        }
    }

    function slide(direction) {
        const firstCard = cards[0];
        const style = window.getComputedStyle(firstCard);
        const marginRight = parseFloat(style.marginRight) || 0;
        const marginLeft = parseFloat(style.marginLeft) || 0;
        const cardWidth = firstCard.getBoundingClientRect().width + marginLeft + marginRight;
        const step = Math.max(cardWidth, grid.clientWidth * 0.8);
        grid.scrollBy({ left: direction * step, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => slide(-1));
    nextBtn.addEventListener('click', () => slide(1));

    window.addEventListener('resize', throttle(updateMode, 200));
    updateMode();
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

// ========================================
// Content Render / Article Modal (SPA)
// ========================================
function loadLanguageToggle() {
    document.querySelectorAll(".include-lang-toggle").forEach(async (el) => {
        const articlePath = el.getAttribute("data-article");
        const label = el.getAttribute("data-label");
        const html = await fetch("components/language-toggle.html").then(res => res.text());
        el.innerHTML = html;
        const btn = el.querySelector(".lang-toggle");
        if (btn) {
            btn.setAttribute("data-article", articlePath);
            btn.textContent = label;
        }
    });
}


function initContentRender() {
    const contentRender = document.getElementById('contentRender');
    const contentFrame = document.getElementById('contentFrame');
    const closeBtn = document.getElementById('contentCloseBtn');

    if (!contentRender) return;

    // Add click handlers to all read-more buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('read-more')) {
            e.preventDefault();
            const articleUrl = e.target.getAttribute('data-article');
            if (articleUrl) {
                openArticle(articleUrl);
            }
        }
        if (e.target.classList.contains('lang-toggle')) {
            e.preventDefault();
            const articleUrl = e.target.getAttribute('data-article');
            if (articleUrl) {
                openArticle(articleUrl);
            }
        }
    });

    // Close button handler
    if (closeBtn) {
        closeBtn.addEventListener('click', closeArticle);
    }

    // Keyboard escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && contentRender.classList.contains('active')) {
            closeArticle();
        }
    });

    function openArticle(url) {
        console.log(`Loading article:${window.location.origin + '/' + url}`);
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load article');
                return response.text();
            })
            .then(html => {
                // google analytics tracking for SPA article views
                const urlObj = new URL(`${window.location.origin + '/' + url}`);
                console.log('Tracking page view for:', urlObj.pathname);
                gtag('event', 'page_view', {                   
                    page_location: `${window.location.origin + '/' + url}`,
                    page_path: urlObj.pathname
                });
                // Parse the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extract the article content
                const articleContent = doc.querySelector('.article-content');

                if (articleContent) {
                    // Clear previous content and inject new article
                    contentFrame.innerHTML = '';
                    contentFrame.appendChild(articleContent.cloneNode(true));

                    // Add language toggle
                    loadLanguageToggle()

                    // Show the modal
                    contentRender.classList.add('active');

                    if (document.querySelector('.content-render.active')) {
                        document.querySelector('.featured-reports').style.display = 'none';
                        document.querySelector('.categories').style.display = 'none';
                    }
                } else {
                    contentFrame.innerHTML = '<p style="padding: 2rem; color: red;">Error: Could not load article content</p>';
                    contentRender.classList.add('active');
                }
                document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error loading article:', error);
                contentFrame.innerHTML = '<p style="padding: 2rem; color: red;">Error loading article. Please try again.</p>';
                contentRender.classList.add('active');
            });
    }

    function closeArticle() {
        contentRender.classList.remove('active');
        contentFrame.innerHTML = '';
        document.querySelector('.featured-reports').style.display = 'block';
        document.querySelector('.categories').style.display = 'block';
        document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
    }
}

