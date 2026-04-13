/* ===================================
   DentCare Pro — Interactive Features
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initTestimonialsSlider();
  initContactForm();
  initScrollTop();
  initActiveNavLink();
});

/* ========== SMOOTH SCROLL (LENIS) ========== */
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ========== NAVBAR SCROLL ========== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });
}

/* ========== MOBILE MENU ========== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ========== SCROLL REVEAL (GSAP) ========== */
function initScrollReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Parallax the hero elements
  gsap.fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 });
  gsap.fromTo(".hero-description", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 });
  gsap.fromTo(".hero-buttons", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 });
  gsap.fromTo(".hero-stats", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.7 });
  gsap.fromTo(".hero-image", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.3 });
  
  // Floating cards parallax
  gsap.to(".hero-floating-card.card-1", {
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  gsap.to(".hero-floating-card.card-2", {
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  // Reveal all sections
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    gsap.fromTo(el, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
  
  // Make section headers smooth
  const headers = document.querySelectorAll('.section-header');
  headers.forEach(header => {
    gsap.fromTo(header.children, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 80%"
        }
      }
    );
  });
}

/* ========== ANIMATED COUNTERS ========== */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const start = performance.now();
  const isLarge = target >= 1000;
  const suffix = isLarge ? '+' : (el.closest('.hero-stat') && target === 98 ? '%' : '+');

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * target);
    
    if (isLarge) {
      el.textContent = current.toLocaleString() + (progress >= 1 ? '+' : '');
    } else {
      el.textContent = current + (progress >= 1 ? suffix : '');
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

/* ========== TESTIMONIALS SLIDER ========== */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialsTrack');
  const cards = track.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');
  
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  let totalSlides = Math.ceil(cards.length / cardsPerView);
  let autoplayInterval;

  function getCardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    totalSlides = Math.ceil(cards.length / cardsPerView);
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex >= totalSlides) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalSlides - 1;

    const cardWidth = cards[0].offsetWidth + 16; // includes margin
    const offset = currentIndex * cardsPerView * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;

    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoplay();
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => goToSlide(currentIndex + 1), 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  track.addEventListener('mouseleave', startAutoplay);

  // Handle resize
  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    createDots();
    goToSlide(0);
  });

  createDots();
  startAutoplay();
}

/* ========== LIGHTBOX ========== */
function openLightbox(el) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const img = el.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ========== CONTACT FORM ========== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value,
    };

    // Construct mailto link as a simple backend-less email solution
    const subject = encodeURIComponent(`New Appointment Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`
    );
    
    // Open email client
    window.location.href = `mailto:info@dentcarepro.com?subject=${subject}&body=${body}`;

    // Show success message
    form.style.display = 'none';
    success.classList.add('show');

    // Reset after 5 seconds
    setTimeout(() => {
      form.style.display = '';
      form.reset();
      success.classList.remove('show');
    }, 5000);
  });
}

/* ========== SCROLL TO TOP ========== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ========== ACTIVE NAV LINK ========== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}
