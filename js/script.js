/* ===========================================
   CAP Biluka — Main JavaScript
   Centro de Apoyo Profesional
   =========================================== */

/**
 * CAP Biluka — Main Application Script
 * Handles navigation, forms, animations, modals, and cookies.
 */

(function () {
    'use strict';

    // =============================================
    // MOBILE MENU
    // =============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.innerHTML = menuOpen
                ? '<iconify-icon icon="lucide:x" width="24"></iconify-icon>'
                : '<iconify-icon icon="lucide:menu" width="24"></iconify-icon>';
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuOpen = false;
                mobileMenuBtn.innerHTML = '<iconify-icon icon="lucide:menu" width="24"></iconify-icon>';
            });
        });
    }

    // =============================================
    // NAVBAR SCROLL EFFECT
    // =============================================
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(5,5,5,0.95)';
                navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            } else {
                navbar.style.background = 'rgba(5,5,5,0.8)';
                navbar.style.borderBottom = 'none';
            }
        });
    }

    // =============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('anim-slide');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe pillar cards and service items for scroll animation
    document.querySelectorAll('.pillar-card, .service-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 100}ms`;
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // =============================================
    // DONATION AMOUNT SELECTION
    // =============================================
    const donationAmounts = document.querySelectorAll('.donation-amount');
    const customAmountContainer = document.getElementById('customAmountContainer');

    if (donationAmounts.length > 0 && customAmountContainer) {
        donationAmounts.forEach(btn => {
            btn.addEventListener('click', () => {
                donationAmounts.forEach(b => b.classList.remove('active', 'bg-[#5423E7]', 'border-[#5423E7]', 'text-white'));
                btn.classList.add('active');

                if (btn.dataset.amount === '0') {
                    customAmountContainer.classList.remove('hidden');
                } else {
                    customAmountContainer.classList.add('hidden');
                }
            });
        });
    }

    // =============================================
    // DONATION FORM
    // =============================================
    const donationForm = document.getElementById('donationForm');
    const donationSuccess = document.getElementById('donationSuccess');

    if (donationForm && donationSuccess) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            donationForm.classList.add('hidden');
            donationSuccess.classList.remove('hidden');
        });
    }

    // =============================================
    // CONTACT FORM
    // =============================================
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');

    if (contactForm && contactSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.classList.add('hidden');
            contactSuccess.classList.remove('hidden');
        });
    }

    // =============================================
    // COOKIE BANNER
    // =============================================
    const cookieBanner = document.getElementById('cookieBanner');

    // Check if cookies already accepted
    const cookieChoice = localStorage.getItem('cookiesAccepted');
    if (cookieChoice && cookieBanner) {
        cookieBanner.style.display = 'none';
    }

    /**
     * Accept all cookies
     */
    window.acceptCookies = function () {
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
        localStorage.setItem('cookiesAccepted', 'true');
    };

    /**
     * Reject non-essential cookies
     */
    window.rejectCookies = function () {
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
        localStorage.setItem('cookiesAccepted', 'rejected');
    };

    // =============================================
    // MODALS
    // =============================================

    /**
     * Open a modal by ID
     * @param {string} id - The modal element ID
     */
    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    /**
     * Close a modal by ID
     * @param {string} id - The modal element ID
     */
    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('[id$="Modal"]').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    window.closeModal(modal.id);
                }
            });
        }
    });

    // =============================================
    // SMOOTH SCROLL WITH NAV OFFSET
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = target.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============================================
    // CONSOLE BRANDING
    // =============================================
    console.log(
        '%c CAP Biluka %c Centro de Apoyo Profesional ',
        'background:#5423E7; color:#fff; font-size:14px; font-weight:bold; padding:6px 10px; border-radius:4px 0 0 4px;',
        'background:#0A0A0A; color:#a855f7; font-size:14px; padding:6px 10px; border-radius:0 4px 4px 0;'
    );
    console.log('%c 💜 Acompañamos a cada persona a sanar, crecer y construir.', 'color:#9CA3AF; font-size:12px;');

})();