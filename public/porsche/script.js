/* ═══════════════════════════════════════════════════════════════════════
   PORSCHE 911 GT3 RS — Script
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Loader ──────────────────────────────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      animateHeroImage();
      startCounters();
    }, 1800);
  });

  // ── Custom Cursor ───────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let cx = 0, cy = 0, tx = 0, ty = 0;

  if (cursor && trail && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function animateCursor() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      cursor.style.left = tx + 'px';
      cursor.style.top = ty + 'px';
      trail.style.left = cx + 'px';
      trail.style.top = cy + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states
    document.querySelectorAll('a, button, .spec-card, .gallery-item, .design-feature').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ── Hero Image Load ─────────────────────────────────────────────────
  function animateHeroImage() {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
      if (heroImg.complete) {
        heroImg.classList.add('loaded');
      } else {
        heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
      }
      // Force trigger if already loaded
      setTimeout(() => heroImg.classList.add('loaded'), 100);
    }
  }

  // ── Counter Animation ──────────────────────────────────────────────
  function startCounters() {
    document.querySelectorAll('.stat-value[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const decimal = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        if (decimal) {
          const val = eased * (target + decimal / 10);
          el.textContent = val.toFixed(1);
        } else {
          el.textContent = Math.floor(eased * target).toLocaleString();
        }

        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  // ── Scroll Reveal ──────────────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal-line, .reveal-text, .reveal-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the reveals
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-line, .reveal-text, .reveal-card');
        const index = Array.from(siblings).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 120);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // ── Spec Bar Fill ──────────────────────────────────────────────────
  const specFills = document.querySelectorAll('.spec-fill');
  const specObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.setProperty('--target-width', width + '%');
        entry.target.classList.add('animated');
        specObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  specFills.forEach(el => specObserver.observe(el));

  // ── Navbar Hide on Scroll ─────────────────────────────────────────
  let lastScroll = 0;
  const nav = document.getElementById('nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ── Parallax on Hero ──────────────────────────────────────────────
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      const factor = scrolled / window.innerHeight;
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - factor * 1.2;
      }
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }
  }, { passive: true });

  // ── Smooth scroll for anchor links ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
