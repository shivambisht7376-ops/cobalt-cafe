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
//  STAGGERED CARD ENTRANCE
// ============================================
(function staggerCards() {
  const cards = document.querySelectorAll('.card, .value-card, .stat-card, .info-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${(i % 5) * 0.1}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(22px)';
    c.style.transition = 'opacity .65s ease, transform .65s ease';
    obs.observe(c);
  });
})();
