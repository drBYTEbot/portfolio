/* ===== background.js — neon floating brains, neurons, books & planets ===== */
(function () {
  const BRAIN_PATH = 'M250 58 C 178 52, 116 80, 108 142 C 92 178, 98 216, 130 250 ' +
    'C 152 282, 150 302, 176 316 C 200 330, 228 320, 250 322 ' +
    'C 272 320, 300 330, 324 316 C 350 302, 348 282, 370 250 ' +
    'C 402 216, 408 178, 392 142 C 384 80, 322 52, 250 58 Z';
  const brainShape = new Path2D(BRAIN_PATH);

  const DATA = window.PORTFOLIO || {};
  const MEMORIES = DATA.memories || ['Memory'];
  const SKILLS = DATA.skillTags || ['Skill'];
  const pick = (a) => a[(Math.random() * a.length) | 0];

  // Rounded-rect helper
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function createField(canvas, opts) {
    if (!canvas || !canvas.getContext) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const reduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    const DM = (opts && opts.density) || 1;
    const SP = (opts && opts.speed) || 1;
    const AVOID = (opts && opts.avoid) || null;

    let W = 0, H = 0, dpr = 1, raf = null, t = 0, ex = null;
    const brains = [], neurons = [], stars = [], books = [], planets = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth || canvas.parentElement.clientWidth;
      H = canvas.clientHeight || canvas.parentElement.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (AVOID) {
        const el = document.querySelector(AVOID);
        if (el) {
          const cr = canvas.getBoundingClientRect();
          const sr = el.getBoundingClientRect();
          const sx = sr.width / 500, sy = sr.height / 420;
          const bw = 284 * sx, bh = 264 * sy;
          ex = {
            cx: (sr.left - cr.left) + 108 * sx + bw / 2,
            cy: (sr.top - cr.top) + 58 * sy + bh / 2,
            rx: (bw / 2) * 1.16, ry: (bh / 2) * 1.16
          };
        }
      }
      seed();
    }

    function seed() {
      brains.length = 0; neurons.length = 0; stars.length = 0; books.length = 0; planets.length = 0;
      const area = W * H;
      const big = Math.max(2, Math.round((area / 220000) * DM));
      for (let i = 0; i < big; i++) {
        brains.push({
          x: Math.random() * W, y: Math.random() * H,
          s: 0.16 + Math.random() * 0.26, vx: (Math.random() - 0.5) * 0.22 * SP,
          vy: (Math.random() - 0.5) * 0.16 * SP, rot: Math.random() * 6.28,
          vr: (Math.random() - 0.5) * 0.0035 * SP
        });
      }
      const n = Math.max(28, Math.round((area / 12000) * DM));
      for (let i = 0; i < n; i++) {
        neurons.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35 * SP, vy: (Math.random() - 0.5) * 0.35 * SP,
          r: 1.4 + Math.random() * 2.4, ph: Math.random() * 6.28
        });
      }
      const st = Math.max(40, Math.round((area / 9000) * DM));
      for (let i = 0; i < st; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1, tw: Math.random() * 6.28 });

      const nb = Math.max(3, Math.round((area / 200000) * DM));
      for (let i = 0; i < nb; i++) books.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18 * SP, vy: (Math.random() - 0.5) * 0.12 * SP,
        rot: (Math.random() - 0.5) * 0.5, vr: (Math.random() - 0.5) * 0.002 * SP,
        s: 0.7 + Math.random() * 0.5, mem: pick(MEMORIES)
      });
      const np = Math.max(3, Math.round((area / 200000) * DM));
      for (let i = 0; i < np; i++) planets.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.16 * SP, vy: (Math.random() - 0.5) * 0.1 * SP,
        r: 16 + Math.random() * 16, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.004 * SP,
        skill: pick(SKILLS)
      });
      brains.forEach(pushOut); neurons.forEach(pushOut); books.forEach(pushOut); planets.forEach(pushOut);
    }

    // Keep floating objects out of the brain's bounding ellipse
    function pushOut(o) {
      if (!ex) return;
      const dx = o.x - ex.cx, dy = o.y - ex.cy;
      const nx = dx / ex.rx, ny = dy / ex.ry;
      if (nx * nx + ny * ny < 1) {
        let len = Math.hypot(dx, dy);
        let ux, uy;
        if (len < 0.001) { const a = Math.random() * 6.283; ux = Math.cos(a); uy = Math.sin(a); }
        else { ux = dx / len; uy = dy / len; }
        o.x = ex.cx + ux * ex.rx;
        o.y = ex.cy + uy * ex.ry;
        o.vx = Math.abs(o.vx) * ux;
        o.vy = Math.abs(o.vy) * uy;
      }
    }

    function drawBrain(b) {
      ctx.save();
      ctx.translate(b.x, b.y); ctx.rotate(b.rot); ctx.scale(b.s, b.s); ctx.translate(-250, -190);
      ctx.shadowColor = 'rgba(212,175,55,0.5)'; ctx.shadowBlur = 24;
      ctx.fillStyle = 'rgba(212,175,55,0.05)'; ctx.fill(brainShape);
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(232,200,96,0.55)'; ctx.stroke(brainShape);
      ctx.beginPath(); ctx.moveTo(250, 74); ctx.quadraticCurveTo(244, 150, 250, 232); ctx.quadraticCurveTo(256, 290, 250, 318);
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(232,200,96,0.35)'; ctx.stroke();
      ctx.restore();
    }

    function drawBook(b) {
      ctx.save();
      ctx.translate(b.x, b.y); ctx.rotate(b.rot); ctx.scale(b.s, b.s);
      ctx.shadowColor = 'rgba(212,175,55,0.35)'; ctx.shadowBlur = 14;
      rr(ctx, -22, -28, 44, 56, 4);
      ctx.fillStyle = 'rgba(212,175,55,0.12)'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(232,200,96,0.8)'; ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.moveTo(-13, -28); ctx.lineTo(-13, 28); ctx.strokeStyle = 'rgba(232,200,96,0.6)'; ctx.stroke();
      ctx.strokeStyle = 'rgba(250,245,239,0.25)';
      for (let i = -18; i <= 18; i += 9) { ctx.beginPath(); ctx.moveTo(-9, i); ctx.lineTo(18, i); ctx.stroke(); }
      ctx.restore();
      // memory title below the book
      ctx.font = '10px "DM Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(250,245,239,0.82)';
      const label = b.mem.length > 26 ? b.mem.slice(0, 24) + '…' : b.mem;
      ctx.fillText(label, b.x, b.y + 44 * b.s + 12);
    }

    function drawPlanet(p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      const g = ctx.createRadialGradient(-p.r * 0.3, -p.r * 0.3, p.r * 0.2, 0, 0, p.r);
      g.addColorStop(0, 'rgba(232,200,96,0.9)');
      g.addColorStop(1, 'rgba(150,120,30,0.5)');
      ctx.beginPath(); ctx.arc(0, 0, p.r, 0, 6.283);
      ctx.fillStyle = g; ctx.shadowColor = 'rgba(212,175,55,0.5)'; ctx.shadowBlur = 18; ctx.fill();
      ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.ellipse(0, 0, p.r * 1.7, p.r * 0.5, 0, 0, 6.283);
      ctx.strokeStyle = 'rgba(232,200,96,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();
      ctx.font = '10px "DM Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(250,245,239,0.85)';
      ctx.fillText(p.skill, p.x, p.y + p.r + 14);
    }

    function drawNeuron(p) {
      const pulse = 0.6 + 0.4 * Math.sin(t * 0.05 + p.ph);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = 'rgba(232,200,96,' + (0.5 * pulse) + ')';
      ctx.shadowColor = 'rgba(212,175,55,0.9)'; ctx.shadowBlur = 10 * pulse; ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(212,175,55,' + (0.25 * pulse) + ')'; ctx.lineWidth = 0.8;
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * 6.283 + p.ph;
        ctx.beginPath();
        ctx.moveTo(p.x + Math.cos(a) * p.r, p.y + Math.sin(a) * p.r);
        ctx.lineTo(p.x + Math.cos(a) * (p.r + 4 + pulse * 2), p.y + Math.sin(a) * (p.r + 4 + pulse * 2));
        ctx.stroke();
      }
    }

    function frame() {
      if (canvas.offsetParent === null) { raf = null; return; } // auto-pause when hidden
      raf = requestAnimationFrame(frame);
      t++;
      const mB = Math.max(16, Math.min(W, H) * 0.05);
      const mO = Math.max(24, Math.min(W, H) * 0.07);
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        const a = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.03 + s.tw));
        ctx.fillStyle = 'rgba(250,245,239,' + a + ')'; ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      for (const b of brains) {
        b.x += b.vx; b.y += b.vy; b.rot += b.vr;
        if (b.x < -mB) b.x = W + mB; if (b.x > W + mB) b.x = -mB;
        if (b.y < -mB) b.y = H + mB; if (b.y > H + mB) b.y = -mB;
        pushOut(b);
        drawBrain(b);
      }
      for (const p of neurons) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; pushOut(p); }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i], b = neurons[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 9000) { ctx.strokeStyle = 'rgba(212,175,55,' + ((1 - d2 / 9000) * 0.22) + ')'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      for (const p of neurons) drawNeuron(p);
      for (const b of books) {
        b.x += b.vx; b.y += b.vy; b.rot += b.vr;
        if (b.x < -mO) b.x = W + mO; if (b.x > W + mO) b.x = -mO;
        if (b.y < -mO) b.y = H + mO; if (b.y > H + mO) b.y = -mO;
        pushOut(b);
        drawBook(b);
      }
      for (const p of planets) {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.x < -mO) p.x = W + mO; if (p.x > W + mO) p.x = -mO;
        if (p.y < -mO) p.y = H + mO; if (p.y > H + mO) p.y = -mO;
        pushOut(p);
        drawPlanet(p);
      }
    }

    function start() {
      if (reduced) { resize(); drawStatic(); return; }
      if (raf) return;
      resize();
      if (canvas.offsetParent === null) return; // hidden; will start when shown
      raf = requestAnimationFrame(frame);
    }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }
    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      for (const b of brains) drawBrain(b);
      for (const b of books) drawBook(b);
      for (const p of planets) drawPlanet(p);
      for (const p of neurons) drawNeuron(p);
      for (const s of stars) { ctx.fillStyle = 'rgba(250,245,239,0.4)'; ctx.fillRect(s.x, s.y, s.r, s.r); }
    }

    window.addEventListener('resize', () => { if (raf) resize(); else if (canvas.offsetParent !== null) drawStatic(); });
    return { start, stop, canvas };
  }

  const fields = {};
  function mount(id) {
    const c = document.getElementById(id);
    if (!c) return;
    fields[id] = createField(c);
  }
  function start(id) { if (fields[id]) fields[id].start(); }
  function stop(id) { if (fields[id]) fields[id].stop(); }

  mount('landingCanvas', { density: 1, speed: 1 });
  mount('brainFx', { density: 2.1, speed: 1.6, avoid: '#brainSvg' });
  start('landingCanvas');

  window.Background = { mount, start, stop, fields };
})();
