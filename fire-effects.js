/**
 * Cobalt Caffe — Shared Fire Effects
 * Ember particles + fire cursor trail + staggered card reveal
 */

// ============================================
//  EMBER PARTICLE CANVAS SYSTEM
// ============================================
(function initEmberCanvas() {
  // Inject canvas if not already present
  let canvas = document.getElementById('ember-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ember-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
  }
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const EMBER_COUNT = 50;
  const embers = [];

  function rand(a, b) { return a + Math.random() * (b - a); }

  function spawnEmber() {
    return {
      x: rand(0, canvas.width),
      y: rand(canvas.height * 0.5, canvas.height + 40),
      vx: rand(-0.5, 0.5),
      vy: rand(-1.8, -0.7),
      size: rand(1.5, 4.5),
      opacity: rand(0.55, 1),
      life: 0,
      maxLife: rand(80, 210),
      hue: rand(15, 48),
    };
  }

  for (let i = 0; i < EMBER_COUNT; i++) {
    const e = spawnEmber();
    e.life = rand(0, e.maxLife);
    embers.push(e);
  }

  function drawEmber(e) {
    const p = e.life / e.maxLife;
    const alpha = e.opacity * (1 - Math.pow(p, 1.5));
    const r = e.size * (1 - p * 0.5);
    const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, r * 4);
    grad.addColorStop(0,   `hsla(${e.hue}, 100%, 82%, ${alpha})`);
    grad.addColorStop(0.4, `hsla(${e.hue - 10}, 100%, 60%, ${alpha * 0.7})`);
    grad.addColorStop(1,   `hsla(${e.hue - 20}, 100%, 40%, 0)`);
    ctx.beginPath();
    ctx.arc(e.x, e.y, r * 4, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    // Bright core
    ctx.beginPath();
    ctx.arc(e.x, e.y, r * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(60, 100%, 96%, ${alpha})`;
    ctx.fill();
  }

  let frameId;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    embers.forEach((e, i) => {
      e.x += e.vx + Math.sin(e.life * 0.08 + i) * 0.35;
      e.y += e.vy;
      e.life++;
      drawEmber(e);
      if (e.life >= e.maxLife) embers[i] = spawnEmber();
    });
    frameId = requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else tick();
  });
})();

// ============================================
//  FIRE CURSOR TRAIL
// ============================================
(function initFireCursor() {
  let lx = -999, ly = -999, thr = false;
  document.addEventListener('mousemove', ev => {
    if (thr) return;
    thr = true;
    setTimeout(() => { thr = false; }, 38);
    if (Math.abs(ev.clientX - lx) < 4 && Math.abs(ev.clientY - ly) < 4) return;
    lx = ev.clientX; ly = ev.clientY;
    const dot = document.createElement('div');
    dot.className = 'fire-cursor-dot';
    const sz = Math.random() * 8 + 6;
    dot.style.cssText = `left:${ev.clientX - sz/2}px;top:${ev.clientY - sz/2}px;width:${sz}px;height:${sz}px;--drift:${(Math.random()-.5)*30}px;`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 1000);
  });
})();

// ============================================
//  DIRECTIONAL SCROLL-IN ANIMATION SYSTEM
// ============================================
(function initDirectionalReveal() {
  const DIRECTIONS = ['reveal-left','reveal-right','reveal-bottom','reveal-top','reveal-zoom'];
  const allSelectors = [
    '.reveal-left', '.reveal-right', '.reveal-bottom',
    '.reveal-top', '.reveal-zoom', '.reveal'
  ].join(',');

  // Prevent horizontal scroll caused by off-screen elements
  document.body.style.overflowX = 'hidden';

  // --- Bento Grid: left card ← | middle ↑ | right card → ---
  const bentoCards = document.querySelectorAll('.bento-grid .card');
  const bDirs = ['reveal-left', 'reveal-bottom', 'reveal-right'];
  bentoCards.forEach((card, i) => {
    card.classList.add(bDirs[i % bDirs.length]);
    if (i > 0) card.classList.add(`delay-${Math.min(i, 5)}`);
  });

  // --- Menu / Item cards: fan in alternating left ↔ right ---
  const menuCards = document.querySelectorAll(
    '.menu-card, .menu-item-card, #featured-menu-grid .card'
  );
  menuCards.forEach((card, i) => {
    card.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    card.classList.add(`delay-${Math.min((i % 4) + 1, 5)}`);
  });

  // --- Value cards: left → right → left → right ---
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach((card, i) => {
    card.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    card.classList.add(`delay-${Math.min(i + 1, 5)}`);
  });

  // --- Stat cards: zoom in with stagger ---
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, i) => {
    card.classList.add('reveal-zoom');
    card.classList.add(`delay-${Math.min(i + 1, 5)}`);
  });

  // --- About story: text from left, image from right ---
  const aboutStory = document.querySelector('.about-story');
  if (aboutStory) {
    const [textCol, imgCol] = aboutStory.children;
    if (textCol) textCol.classList.add('reveal-left');
    if (imgCol)  imgCol.classList.add('reveal-right');
  }

  // --- Team cards inside about: alternating bottom + zoom ---
  const teamCardRows = document.querySelectorAll('.about-story ~ * .card, .timeline-team-grid .card');
  teamCardRows.forEach((card, i) => {
    card.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    card.classList.add(`delay-${Math.min(i + 1, 5)}`);
  });

  // --- Gallery items: fan from all directions ---
  const galleryItems = document.querySelectorAll('.g-item');
  const gDirs = ['reveal-left','reveal-bottom','reveal-right','reveal-zoom'];
  galleryItems.forEach((item, i) => {
    item.classList.add(gDirs[i % gDirs.length]);
  });

  // --- Section headings: drop from top ---
  document.querySelectorAll('.section-title').forEach(el => {
    if (!el.closest('.hero')) {
      el.classList.add('reveal-top');
    }
  });

  // --- Section labels: slide from left ---
  document.querySelectorAll('.section-label').forEach(el => {
    el.classList.add('reveal-left');
  });

  // --- Info blocks on contact page: alternating ---
  document.querySelectorAll('.info-block').forEach((block, i) => {
    block.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
  });

  // --- Contact form card: from right ---
  const contactFormCard = document.querySelector('.contact-form-card');
  if (contactFormCard) contactFormCard.classList.add('reveal-right');

  // --- Quote block: zoom in ---
  const quoteBlock = document.querySelector('.quote-block');
  if (quoteBlock) quoteBlock.classList.add('reveal-zoom');

  // --- Footer grid columns: fan in from bottom ---
  document.querySelectorAll('.footer-grid > div').forEach((col, i) => {
    col.classList.add('reveal-bottom');
    col.classList.add(`delay-${Math.min(i + 1, 5)}`);
  });

  // --- IntersectionObserver for ALL directional classes ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll(allSelectors).forEach(el => {
    revealObserver.observe(el);
  });
})();

