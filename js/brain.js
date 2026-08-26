/* ===== brain.js — builds SVG brain, neurons, pathways, ambient FX ===== */
(function () {
  const SVGNS = 'http://www.w3.org/2000/svg';
  const data = window.PORTFOLIO;
  const svg = document.getElementById('brainSvg');
  const baseG = document.getElementById('brainBase');
  const pathG = document.getElementById('pathways');
  const neuronG = document.getElementById('neurons');
  const fx = document.getElementById('brainFx');

  function el(name, attrs) {
    const e = document.createElementNS(SVGNS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // --- Brain outline (stylized) ---
  baseG.appendChild(el('path', {
    class: 'brain-outline',
    d: 'M250 58 C 178 52, 116 80, 108 142 C 92 178, 98 216, 130 250 ' +
       'C 152 282, 150 302, 176 316 C 200 330, 228 320, 250 322 ' +
       'C 272 320, 300 330, 324 316 C 350 302, 348 282, 370 250 ' +
       'C 402 216, 408 178, 392 142 C 384 80, 322 52, 250 58 Z'
  }));
  // central fissure
  baseG.appendChild(el('path', {
    class: 'brain-outline', style: 'opacity:0.5',
    d: 'M250 74 Q 244 150 250 232 Q 256 290 250 318'
  }));

  // --- Region lobes + labels ---
  const regionEls = {};
  Object.keys(data.regions).forEach((r) => {
    const reg = data.regions[r];
    regionEls[r] = el('ellipse', {
      class: 'brain-lobe', cx: reg.anchor.x, cy: reg.anchor.y, rx: 80, ry: 64, 'data-region': r
    });
    baseG.appendChild(regionEls[r]);
    const label = el('text', { class: 'region-label', x: reg.anchor.x, y: reg.anchor.y - 72, 'text-anchor': 'middle' });
    label.textContent = reg.name.toUpperCase();
    baseG.appendChild(label);
  });

  // --- Group sections by region, place neurons ---
  const byRegion = {};
  data.sections.forEach((s) => { (byRegion[s.region] = byRegion[s.region] || []).push(s); });
  const hub = data.regions.brainstem.anchor;

  data.sections.forEach((s) => {
    const reg = data.regions[s.region];
    const list = byRegion[s.region];
    const idx = list.indexOf(s);
    const n = list.length;
    const spread = (idx - (n - 1) / 2) * 0.55;
    const rad = 26 + (idx % 2) * 18;
    const x = reg.anchor.x + Math.sin(spread) * rad + (idx % 2 ? 16 : -16);
    const y = reg.anchor.y + Math.cos(spread) * rad * 0.5 + (idx % 2 ? 12 : -6);
    s._pos = { x, y };

    const path = el('path', {
      class: 'pathway', id: 'path-' + s.id,
      d: `M${hub.x} ${hub.y} Q ${(hub.x + x) / 2 + (y - hub.y) * 0.18} ${(hub.y + y) / 2 - (x - hub.x) * 0.18} ${x} ${y}`
    });
    pathG.appendChild(path);

    const g = el('g', { class: 'neuron', 'data-id': s.id, tabindex: '0', role: 'button', 'aria-label': s.title });
    g.appendChild(el('circle', { class: 'node-pulse', cx: x, cy: y, r: 13 }));
    g.appendChild(el('circle', { class: 'node-glow', cx: x, cy: y, r: 11 }));
    g.appendChild(el('circle', { class: 'node', cx: x, cy: y, r: 7 }));
    const t = el('text', { class: 'n-label', x: x, y: y - 15 }); t.textContent = s.title;
    const sub = el('text', { class: 'n-sub', x: x, y: y + 19 });
    sub.textContent = reg.theme.split('·')[0].trim().split(' ')[0];
    g.appendChild(t); g.appendChild(sub);
    neuronG.appendChild(g);
    s._el = g; s._lobe = regionEls[s.region];
  });

  window.__BRAIN__ = { data, svg, baseG, pathG, neuronG, regionEls, hub, fx };

  // --- Ambient particle FX (canvas) ---
  const BrainFX = (function () {
    let ctx, raf, parts = [], W = 0, H = 0;
    function init() {
      if (!fx || !fx.getContext) return;
      ctx = fx.getContext('2d');
      if (!ctx) return;
      resize(); window.addEventListener('resize', resize);
      loop();
    }
    function resize() {
      const r = fx.getBoundingClientRect();
      fx.width = r.width * devicePixelRatio; fx.height = r.height * devicePixelRatio;
      W = r.width; H = r.height;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      if (!parts.length) seed();
    }
    function seed() {
      parts = [];
      for (let i = 0; i < 60; i++) parts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4
      });
    }
    function loop() {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = 'rgba(212,175,55,0.32)'; ctx.fill();
      }
    }
    return { init };
  })();
  window.__BRAIN_FX__ = BrainFX;
})();
