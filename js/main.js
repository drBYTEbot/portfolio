/* ===== main.js — landing, panel, traditional view, progress, dino ===== */
(function () {
  const data = window.PORTFOLIO;
  const reduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const STORE = 'mind-explored-v1';

  const landing = document.getElementById('landing');
  const app = document.getElementById('app');
  const traditional = document.getElementById('traditional');
  const tradContent = document.getElementById('tradContent');
  const panel = document.getElementById('panel');
  const panelRegion = document.getElementById('panelRegion');
  const panelTitle = document.getElementById('panelTitle');
  const panelBody = document.getElementById('panelBody');

  function getVisited() {
    try { return new Set(JSON.parse(localStorage.getItem(STORE) || '[]')); }
    catch (e) { return new Set(); }
  }
  function setVisited(id) {
    const v = getVisited(); v.add(id);
    localStorage.setItem(STORE, JSON.stringify([...v]));
    updateProgress();
  }
  function updateProgress() {
    const total = data.sections.length;
    const done = getVisited().size;
    const pct = Math.round((done / total) * 100);
    const fill = document.querySelector('.hud-fill');
    const pctEl = document.querySelector('.hud-pct');
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    document.querySelectorAll('.neuron').forEach((n) => {
      if (getVisited().has(n.getAttribute('data-id'))) n.classList.add('visited');
    });
  }

  // ---- Landing ----
  document.getElementById('exploreBtn').addEventListener('click', startExplore);
  document.getElementById('skipBtn').addEventListener('click', () => { window.location.href = 'page.html'; });

  function startExplore() {
    landing.style.display = 'none';
    app.style.display = 'flex';
    document.getElementById('pageBtn').style.display = '';
    if (window.Background) window.Background.start('brainFx');
    updateProgress();
  }

  // ---- Home button: return to the landing / home screen ----
  document.getElementById('homeBtn').addEventListener('click', () => {
    app.style.display = 'none';
    if (window.Background) window.Background.stop('brainFx');
    landing.style.display = 'grid';
    if (window.Background) window.Background.start('landingCanvas');
  });

  // ---- Navigation ----
  document.getElementById('pageBtn').addEventListener('click', () => { window.location.href = 'page.html'; });

  // ---- Arcade music mute toggle ----
  const muteBtn = document.getElementById('muteBtn');
  if (muteBtn && window.Arcade) {
    muteBtn.addEventListener('click', (e) => {
      if (e) e.stopPropagation();
      const m = window.Arcade.toggle();
      muteBtn.textContent = m ? 'Muted' : 'Music';
      muteBtn.setAttribute('aria-pressed', String(m));
    });
  }
  document.getElementById('tradBack').addEventListener('click', () => {
    stopAllDino();
    traditional.style.display = 'none';
    app.style.display = 'flex';
  });

  function showTraditional() {
    stopAllDino();
    landing.style.display = 'none';
    app.style.display = 'none';
    traditional.style.display = 'block';
    document.getElementById('pageBtn').style.display = 'none';
    if (!tradContent.dataset.rendered) {
      tradContent.innerHTML = data.sections.map(renderSection).join('');
      tradContent.dataset.rendered = '1';
    }
    // ensure dino wired
    const dino = tradContent.querySelector('#dinoGame');
    if (dino) initDino(dino);
  }

  // ---- Panel ----
  function open(id) {
    const s = data.sections.find((x) => x.id === id);
    if (!s) return;
    stopAllDino();
    stopTts();
    const reg = data.regions[s.region];
    panelRegion.textContent = reg.theme;
    panelTitle.textContent = s.title;
    panelBody.innerHTML = s.body;
    panel.style.display = 'grid';
    setVisited(id);
    if (s.type === 'game') {
      const dino = panelBody.querySelector('#dinoGame');
      if (dino) initDino(dino);
    }
  }
  window.__APP__ = { open };

  document.getElementById('panelClose').addEventListener('click', closePanel);
  panel.querySelector('.panel-scrim').addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

  // Text-to-speech for About (Web Speech API)
  const synth = window.speechSynthesis;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.tts-btn');
    if (!btn) return;
    if (!synth) { btn.textContent = 'TTS unsupported'; return; }
    if (synth.speaking && !synth.paused) { synth.cancel(); setTts(false); return; }
    const scope = btn.closest('#panelBody') || btn.closest('section') || btn.closest('.panel-body');
    let text = scope ? scope.innerText : '';
    text = text.replace(btn.innerText, '').trim();
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1; u.pitch = 1;
    u.onend = () => setTts(false);
    u.onerror = () => setTts(false);
    synth.cancel();
    synth.speak(u);
    setTts(true);
  });
  function setTts(on) {
    document.querySelectorAll('.tts-btn').forEach((b) => {
      b.classList.toggle('speaking', on);
      b.innerHTML = on ? '&#9632; Stop' : '&#9836; Read aloud';
    });
  }
  function stopTts() { if (synth && synth.speaking) synth.cancel(); setTts(false); }

  // Copy-to-clipboard for email (no native mailto dialog)
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.copy-mail');
    if (!b) return;
    const mail = b.dataset.mail;
    const hint = b.querySelector('.hint');
    const done = () => {
      b.classList.add('copied');
      if (hint) hint.textContent = 'copied!';
      setTimeout(() => { b.classList.remove('copied'); if (hint) hint.textContent = 'click to copy'; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail).then(done).catch(() => fallbackCopy(mail, done));
    } else {
      fallbackCopy(mail, done);
    }
  });
  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); if (cb) cb();
  }
  function closePanel() {
    if (panel.classList.contains('closing')) return;
    if (reduced) { finalClose(); return; }
    const card = panel.querySelector('.panel-card');
    panel.classList.add('closing');
    let finished = false;
    const finish = () => { if (finished) return; finished = true; finalClose(); };
    if (card) card.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 650);
  }

  function finalClose() {
    panel.classList.remove('closing');
    panel.style.display = 'none';
    stopAllDino();
    stopTts();
    document.querySelectorAll('.neuron.active').forEach((n) => n.classList.remove('active'));
  }

  // ---- Section renderer (panel + traditional share markup) ----
  function renderSection(s) {
    return `<section id="sec-${s.id}" aria-labelledby="h-${s.id}">
      <h2 id="h-${s.id}">${s.title}</h2>
      <div class="panel-body">${s.body}</div>
    </section>`;
  }

  // ---- Chrome Dino game (matches main-branch build.js behavior) ----
  const dinoReg = (window.__dino = window.__dino || { instances: [], active: null, keyBound: false });
  function stopAllDino() { dinoReg.instances.forEach((i) => i.stop()); dinoReg.active = null; }

  function initDino(root) {
    if (root.dataset.init) return;
    root.dataset.init = '1';
    const canvas = root.querySelector('#gameCanvas');
    const startBtn = root.querySelector('#gameStart');
    const scoreEl = root.querySelector('#score');
    const hiEl = root.querySelector('#highscore');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = 600, H = 180, groundY = 170;
    canvas.width = W; canvas.height = H;

    let gameRunning = false, score = 0;
    let highscore = parseInt(localStorage.getItem('dinoHighScore') || '0', 10);
    let frame = 0, speed = 4, gravity = 0.5, groundOffset = 0, raf = null;
    const dino = { x: 60, y: groundY - 28, vy: 0, w: 20, h: 28, grounded: true };
    let obstacles = [];

    if (hiEl) hiEl.textContent = highscore;

    function reset() {
      dino.y = groundY - dino.h; dino.vy = 0; dino.grounded = true;
      obstacles = []; score = 0; speed = 4; frame = 0; gameRunning = true;
    }
    function jump() { if (dino.grounded && gameRunning) { dino.vy = -8; dino.grounded = false; } }
    function start() {
      if (gameRunning) return;
      stopAllDino();
      reset();
      dinoReg.active = api;
      startBtn.textContent = 'Playing…';
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function stop() { gameRunning = false; if (raf) { cancelAnimationFrame(raf); raf = null; } }

    function update() {
      if (!gameRunning) return;
      frame++;
      dino.vy += gravity; dino.y += dino.vy;
      if (dino.y >= groundY - dino.h) { dino.y = groundY - dino.h; dino.vy = 0; dino.grounded = true; }
      groundOffset = (groundOffset - speed) % 20;
      if (frame % 80 === 0 && Math.random() > 0.4) {
        const type = Math.random() > 0.5 ? 'cactus' : 'cactus_small';
        const h = type === 'cactus' ? 32 : 20;
        obstacles.push({ x: W, y: groundY - h, w: type === 'cactus' ? 16 : 10, h });
      }
      obstacles.forEach((o) => (o.x -= speed));
      obstacles = obstacles.filter((o) => o.x + o.w > 0);
      for (const o of obstacles) {
        if (dino.x < o.x + o.w && dino.x + dino.w > o.x && dino.y < o.y + o.h && dino.y + dino.h > o.y) {
          gameRunning = false; startBtn.textContent = 'Play Again';
          if (score > highscore) { highscore = score; localStorage.setItem('dinoHighScore', highscore); if (hiEl) hiEl.textContent = highscore; }
          return;
        }
      }
      score = Math.floor(frame / 8);
      if (scoreEl) scoreEl.textContent = score;
      if (score > highscore && hiEl) hiEl.textContent = score;
      if (score < 50) speed = 4; else if (score < 100) speed = 6; else if (score < 200) speed = 8; else speed = 10;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(212,175,55,0.10)';
      ctx.fillRect(0, groundY + 2, W, 1);
      for (let x = groundOffset; x < W; x += 20) ctx.fillRect(x, groundY + 6, 8, 1);
      ctx.fillStyle = '#D4AF37';
      obstacles.forEach((o) => ctx.fillRect(o.x, o.y, o.w, o.h));
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(dino.x + 14, dino.y + 6, 4, 4);
      if (dino.grounded && frame % 10 < 5) { ctx.fillRect(dino.x + 4, dino.y + dino.h, 4, 6); ctx.fillRect(dino.x + 12, dino.y + dino.h, 4, 4); }
      else { ctx.fillRect(dino.x + 4, dino.y + dino.h, 4, 5); ctx.fillRect(dino.x + 12, dino.y + dino.h, 4, 5); }
      if (!gameRunning && score > 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#D4AF37'; ctx.font = '14px DM Mono, monospace'; ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W / 2, H / 2);
      }
    }

    function loop() { update(); draw(); raf = requestAnimationFrame(loop); }

    const api = { start, stop, jump, isRunning: () => gameRunning };
    dinoReg.instances.push(api);

    startBtn.addEventListener('click', start);
    canvas.addEventListener('click', () => { if (gameRunning) jump(); });
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); if (gameRunning) jump(); });
    canvas.setAttribute('tabindex', '0');

    if (!dinoReg.keyBound) {
      dinoReg.keyBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === ' ') {
          const a = dinoReg.active;
          if (a && a.isRunning()) { e.preventDefault(); a.jump(); }
        }
      });
    }

    draw();
    raf = requestAnimationFrame(loop);
  }

  // reduced-motion: skip landing animation auto-start is fine; still allow explore
  updateProgress();

  // Deep-link: "Back to Mind" from the page view should open the brain directly.
  // Consume the hash and strip it so a later refresh returns to the landing screen.
  if (location.hash === '#mind') {
    history.replaceState(null, '', location.pathname + location.search);
    startExplore();
  }
})();
