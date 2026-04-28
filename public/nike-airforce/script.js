/* ═══════════════════════════════════════════════════════════════════════
   NIKE AIR FORCE 1 — Interactive Showcase Script
   Full theme switching per shoe with animations
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Shoe Data ──────────────────────────────────────────────────────
  const shoes = [
    {
      id: 'white',
      name: "Air Force 1 '07 Low",
      subtitle: "'07 Low",
      eyebrow: 'ICON SINCE 1982',
      image: 'images/af1-white.png',
      desc: "The radiance lives on. The Nike Air Force 1 '07 delivers the same legendary style with a fresh premium look, clean lines, and the perfect amount of flash to make you shine.",
      price: '$110',
      style: 'CW2288-111',
      colorway: 'White / White',
      year: '2023',
      material: 'Full Grain Leather',
      navModel: "AIR FORCE 1 '07",
    },
    {
      id: 'black',
      name: 'Air Force 1 Low',
      subtitle: 'Triple Black',
      eyebrow: 'STEALTH MODE',
      image: 'images/af1-black.png',
      desc: "All-black everything. The Triple Black Air Force 1 is the ultimate in understated dominance — premium leather wrapped in a monochrome shadow that commands every room.",
      price: '$120',
      style: 'CW2288-001',
      colorway: 'Black / Black',
      year: '2023',
      material: 'Full Grain Leather',
      navModel: 'AIR FORCE 1 LOW',
    },
    {
      id: 'red',
      name: 'Air Force 1',
      subtitle: 'University Red',
      eyebrow: 'BOLD STATEMENT',
      image: 'images/af1-red.png',
      desc: "Turn heads. Break necks. The University Red Air Force 1 brings fire to the streets — a bold crimson statement backed by decades of basketball heritage and culture.",
      price: '$130',
      style: 'FD7039-600',
      colorway: 'University Red / White',
      year: '2024',
      material: 'Premium Leather & Suede',
      navModel: 'AIR FORCE 1',
    },
  ];

  let currentIndex = 0;
  let isTransitioning = false;

  // ── DOM Elements ───────────────────────────────────────────────────
  const body = document.body;
  const shoeImage = document.getElementById('shoeImage');
  const shoeWrap = document.getElementById('shoeWrap');
  const shoeTitle = document.getElementById('shoeTitle');
  const titleLine1 = document.getElementById('titleLine1');
  const titleLine2 = document.getElementById('titleLine2');
  const shoeDesc = document.getElementById('shoeDesc');
  const shoePrice = document.getElementById('shoePrice');
  const shoeEyebrow = document.getElementById('shoeEyebrow');
  const navModel = document.getElementById('navModel');
  const currentIdx = document.getElementById('currentIdx');
  const detailStyle = document.getElementById('detailStyle');
  const detailColor = document.getElementById('detailColor');
  const detailYear = document.getElementById('detailYear');
  const detailMaterial = document.getElementById('detailMaterial');
  const dots = document.querySelectorAll('.dot');
  const swatches = document.querySelectorAll('.swatch');
  const prevBtn = document.getElementById('prevShoe');
  const nextBtn = document.getElementById('nextShoe');

  // ── Loader ─────────────────────────────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 2000);
  });

  // ── Custom Cursor ──────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let cx = 0, cy = 0, tx = 0, ty = 0;

  if (cursor && trail && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function animateCursor() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = tx + 'px';
      cursor.style.top = ty + 'px';
      trail.style.left = cx + 'px';
      trail.style.top = cy + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .swatch, .dot, .feature-card').forEach(el => {
      el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });
  }

  // ── Particles ──────────────────────────────────────────────────────
  function createParticles() {
    const container = document.getElementById('particles');
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.setProperty('--duration', (6 + Math.random() * 8) + 's');
      p.style.setProperty('--delay', (Math.random() * 5) + 's');
      p.style.setProperty('--dx', (Math.random() * 100 - 50) + 'px');
      p.style.setProperty('--dy', (Math.random() * 100 - 50) + 'px');
      container.appendChild(p);
    }
  }
  createParticles();

  // ── Switch Shoe ────────────────────────────────────────────────────
  function switchShoe(index) {
    if (isTransitioning || index === currentIndex) return;
    isTransitioning = true;
    const shoe = shoes[index];

    // Animate shoe out
    shoeImage.classList.add('switching');

    // Animate text out
    const textEls = [titleLine1, titleLine2, shoeDesc, shoePrice, shoeEyebrow.querySelector('span:last-child')];
    const detailEls = [detailStyle, detailColor, detailYear, detailMaterial];

    textEls.forEach(el => {
      if (el) {
        el.style.transition = 'opacity 0.3s, transform 0.3s';
        el.style.opacity = '0';
        el.style.transform = 'translateY(-15px)';
      }
    });

    detailEls.forEach(el => {
      if (el) {
        el.style.transition = 'opacity 0.3s, transform 0.3s';
        el.style.opacity = '0';
        el.style.transform = 'translateX(10px)';
      }
    });

    // Update theme
    setTimeout(() => {
      body.setAttribute('data-shoe', index);
    }, 200);

    // Swap content at midpoint of animation
    setTimeout(() => {
      // Update image
      shoeImage.src = shoe.image;

      // Update text
      titleLine1.textContent = shoe.name;
      titleLine2.textContent = shoe.subtitle;
      shoeDesc.textContent = shoe.desc;
      shoePrice.textContent = shoe.price;
      shoeEyebrow.querySelector('span:last-child').textContent = shoe.eyebrow;
      navModel.textContent = shoe.navModel;
      currentIdx.textContent = String(index + 1).padStart(2, '0');

      // Update details
      detailStyle.textContent = shoe.style;
      detailColor.textContent = shoe.colorway;
      detailYear.textContent = shoe.year;
      detailMaterial.textContent = shoe.material;

      // Update dots
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      swatches.forEach((s, i) => s.classList.toggle('active', i === index));

    }, 350);

    // Animate text in
    setTimeout(() => {
      textEls.forEach((el, i) => {
        if (el) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.5s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 80);
        }
      });

      detailEls.forEach((el, i) => {
        if (el) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.4s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
          }, i * 60);
        }
      });
    }, 500);

    // Clean up
    setTimeout(() => {
      shoeImage.classList.remove('switching');
      currentIndex = index;
      isTransitioning = false;
    }, 800);
  }

  // ── Navigation ─────────────────────────────────────────────────────
  prevBtn.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + shoes.length) % shoes.length;
    switchShoe(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % shoes.length;
    switchShoe(newIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      switchShoe(parseInt(dot.dataset.index));
    });
  });

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      switchShoe(parseInt(swatch.dataset.index));
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const newIndex = (currentIndex - 1 + shoes.length) % shoes.length;
      switchShoe(newIndex);
    } else if (e.key === 'ArrowRight') {
      const newIndex = (currentIndex + 1) % shoes.length;
      switchShoe(newIndex);
    }
  });

  // ── Mouse tilt on shoe ─────────────────────────────────────────────
  const shoeStage = document.querySelector('.shoe-stage');
  if (shoeStage && window.matchMedia('(pointer: fine)').matches) {
    shoeStage.addEventListener('mousemove', (e) => {
      const rect = shoeStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      shoeImage.style.transform = `translateY(0) rotate(${x * 5}deg) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    });

    shoeStage.addEventListener('mouseleave', () => {
      shoeImage.style.transform = '';
    });
  }

  // ── Scroll Feature Reveal ──────────────────────────────────────────
  const featureCards = document.querySelectorAll('.feature-card');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  featureCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ${i * 0.1}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s ${i * 0.1}s cubic-bezier(0.22, 1, 0.36, 1)`;
    featureObserver.observe(card);
  });

})();
