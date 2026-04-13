/* ============================================================
   SPARKS SALON — script.js
   Handles: AOS init, Navbar scroll, Parallax, Counters,
            Gallery Lightbox, Mobile Menu, Form, Back-to-top
============================================================ */

'use strict';

/* ── Init AOS ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 750,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
  });

  initNavbar();
  initHeroParallax();
  initMobileMenu();
  initGalleryLightbox();
  initCounters();
  initForm();
  initBackToTop();
  initActiveNav();
  initHeroBgLoad();
});

/* ── Hero background subtle entrance ─────────────────── */
function initHeroBgLoad() {
  const bg = document.getElementById('heroBg');
  if (!bg) return;
  const img = new Image();
  img.src = 'images/enterance.jpeg';
  img.onload = () => bg.classList.add('loaded');
}

/* ── Navbar ───────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── Active nav link on scroll ───────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ── Parallax on hero ─────────────────────────────────── */
function initHeroParallax() {
  const bg = document.getElementById('heroBg');
  if (!bg) return;

  const onScroll = () => {
    const scrolled = window.pageYOffset;
    // Move bg upward at half speed → classic parallax
    bg.style.transform = `scale(1) translateY(${scrolled * 0.35}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Mobile Menu ─────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks   = document.querySelectorAll('.mob-link');

  if (!hamburger || !mobileMenu) return;

  const toggle = (forceClose = false) => {
    const isOpen = hamburger.classList.contains('open') || forceClose;
    if (isOpen) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  hamburger.addEventListener('click', () => toggle());

  mobLinks.forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggle(true);
    }
  });
}

/* ── Gallery Lightbox ────────────────────────────────── */
function initGalleryLightbox() {
  const items       = document.querySelectorAll('.gallery-item');
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn    = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg) return;

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Clear src after transition to avoid flash
    setTimeout(() => { lightboxImg.src = ''; }, 400);
  };

  items.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;
    item.addEventListener('click', () => openLightbox(img.src, img.alt));
    // Keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(img.src, img.alt);
    });
  });

  closeBtn && closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ── Animated Counters ───────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3); // cubic ease-out

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = target >= 500 ? '+' : target >= 20 ? '+' : '';
    const duration = 1800; // ms
    const start    = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOut(progress) * target);
      el.textContent = value + (progress === 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ── Contact Form ────────────────────────────────────── */
function initForm() {
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const successMsg  = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      shakeForm(form);
      return;
    }

    if (!isValidEmail(email)) {
      highlightError(form.querySelector('#email'));
      return;
    }

    // Disable button & show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Sending…';

    try {
      const action = form.getAttribute('action');
      // If Formspree ID is set, post to it; otherwise simulate success
      if (action && !action.includes('YOUR_FORM_ID')) {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Server error');
      } else {
        // Simulate network delay for demo
        await new Promise((r) => setTimeout(r, 1200));
      }

      // Success
      form.style.display = 'none';
      successMsg && successMsg.classList.add('show');
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.textContent = '⚠️ Error — Please try again';
      setTimeout(() => (submitBtn.innerHTML = originalText), 3000);
    }
  });

  // Remove error style on input
  form.querySelectorAll('.form-input, .form-textarea').forEach((input) => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function highlightError(el) {
  el.style.borderColor = '#e05c5c';
  el.style.boxShadow   = '0 0 0 4px rgba(224,92,92,0.15)';
  el.focus();
}

function shakeForm(form) {
  form.style.animation = 'none';
  form.offsetHeight; // reflow
  form.style.animation = 'shake 0.4s ease';
  setTimeout(() => form.style.animation = '', 400);
}

/* ── Back to Top ─────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Smooth anchor click (belt-and-suspenders) ───────── */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ── CSS Shake keyframe injection ────────────────────── */
(function injectShakeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-8px); }
      40%       { transform: translateX(8px); }
      60%       { transform: translateX(-5px); }
      80%       { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
})();
