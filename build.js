// ==============================================
// Saria Malik — AI Engineer & Creative Technologist
// ==============================================

// --- CURSOR ---
(function cursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    ring.style.left = mx + 'px';
    ring.style.top = my + 'px';
  });
  document.querySelectorAll('a, button, .project-card, .research-card, .contact-link, .filter-btn, .game-start-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// --- LOADER ---
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 800);
});

// --- NAVBAR SCROLL ---
(function navbarScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// --- MOBILE MENU ---
(function mobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    });
  });
})();

// --- SCROLL REVEAL ---
(function reveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
})();

// --- ROTATING TEXT ---
(function rotatingText() {
  const el = document.getElementById('rotatingText');
  if (!el) return;
  const roles = [
    'AI Engineer', 'Cognitive Science', 'Creative Technologist',
    'Future PhD Candidate', 'Problem Solver', 'Writer & Technologist'
  ];
  let i = 0;
  function rotate() {
    el.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % roles.length;
      el.textContent = roles[i];
      el.style.opacity = '1';
    }, 300);
  }
  setInterval(rotate, 2500);
})();

// --- STAT COUNTERS ---
(function statCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(interval);
          } else {
            el.textContent = current;
          }
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
})();

// --- HERO CANVAS (Particles + Neural Net) ---
(function heroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], connections = [];
  const PARTICLE_COUNT = 100;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.5 + 0.5,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// --- NEURAL NETWORK CANVAS (AI & Research section) ---
(function neuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 30; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      layer: Math.floor(Math.random() * 4),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    nodes.forEach((n, i) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.abs(nodes[j].layer - n.layer) !== 1) continue;
        const dx = n.x - nodes[j].x;
        const dy = n.y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.06 * (1 - dist / 200)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// --- PROJECT FILTERS ---
(function projectFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!filters.length) return;
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// --- COPY TO CLIPBOARD ---
(function copyLinks() {
  document.querySelectorAll('.cl-copy').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigator.clipboard.writeText(el.dataset.copy);
      el.textContent = 'Copied!';
      el.classList.add('copied');
      setTimeout(() => {
        el.textContent = 'Copy';
        el.classList.remove('copied');
      }, 2000);
    });
  });
})();

// --- TTS ---
(function tts() {
  const btn = document.getElementById('ttsBtn');
  if (!btn) return;
  let speaking = false;
  let utterance = null;

  const text = "I'm Saria Malik, a cognitive science and writing seminars double major at Johns Hopkins University, driven by the belief that the most powerful technology lives at the intersection of mind, language, and creativity. My work spans cognitive science, writing, programming, and robotics. I'm passionate about research, team leadership, and engineering that's infused with curiosity and craft. I'm a U.S. Congressional App Challenge winner, a Cummings Scholar and Clark Scholar serving on the Student Leadership Board at JHU, and a proud WISE program alum. Whether I'm engineering AI systems at AI&, developing software at nVeris Tech, or exploring performing arts, I bring the same principle to everything: the engineer builds what the artist imagines.";

  btn.addEventListener('click', () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      speaking = false;
      btn.classList.remove('playing');
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>Listen</span>';
      return;
    }
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onend = () => {
      speaking = false;
      btn.classList.remove('playing');
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>Listen</span>';
    };
    window.speechSynthesis.speak(utterance);
    speaking = true;
    btn.classList.add('playing');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg><span>Stop</span>';
  });
})();

// --- SOUND EFFECTS ---
(function sounds() {
  const toggle = document.getElementById('soundToggle');
  let muted = false;
  if (toggle) {
    toggle.classList.remove('muted');
    toggle.addEventListener('click', () => {
      muted = !muted;
      toggle.classList.toggle('muted', muted);
    });
  }

  function play(type) {
    if (muted) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.value = 0.03;
      if (type === 'hover') {
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === 'click') {
        osc.frequency.value = 660;
        osc.type = 'sine';
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch(e) {}
  }

  document.querySelectorAll('a, button, .project-card, .research-card, .contact-link, .filter-btn, .game-start-btn').forEach(el => {
    el.addEventListener('mouseenter', () => play('hover'));
    el.addEventListener('click', () => play('click'));
  });
})();

// --- DINO GAME ---
(function dinoGame() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('gameStart');
  const scoreEl = document.getElementById('score');
  const highscoreEl = document.getElementById('highscore');

  let gameRunning = false;
  let score = 0;
  let highscore = parseInt(localStorage.getItem('dinoHighScore') || '0');
  let frame = 0;
  let speed = 4;
  let gravity = 0.5;
  let groundY = 170;

  const dino = { x: 60, y: groundY, vy: 0, w: 20, h: 28, grounded: true };
  let obstacles = [];
  let groundOffset = 0;

  highscoreEl.textContent = highscore;

  function reset() {
    dino.y = groundY;
    dino.vy = 0;
    dino.grounded = true;
    obstacles = [];
    score = 0;
    speed = 4;
    frame = 0;
    gameRunning = true;
  }

  function jump() {
    if (!dino.grounded || !gameRunning) return;
    dino.vy = -8;
    dino.grounded = false;
  }

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (gameRunning) jump();
    }
  });
  canvas.addEventListener('click', () => { if (gameRunning) jump(); });
  canvas.addEventListener('touchstart', e => { e.preventDefault(); if (gameRunning) jump(); });

  startBtn.addEventListener('click', () => {
    if (!gameRunning) {
      reset();
      startBtn.textContent = 'Playing...';
    }
  });

  function update() {
    if (!gameRunning) return;
    frame++;

    // gravity
    dino.vy += gravity;
    dino.y += dino.vy;
    if (dino.y >= groundY) {
      dino.y = groundY;
      dino.vy = 0;
      dino.grounded = true;
    }

    // ground scroll
    groundOffset = (groundOffset - speed) % 20;

    // spawn obstacles
    if (frame % 80 === 0 && Math.random() > 0.4) {
      const type = Math.random() > 0.5 ? 'cactus' : 'cactus_small';
      obstacles.push({
        x: canvas.width,
        y: type === 'cactus' ? groundY - 32 : groundY - 20,
        w: type === 'cactus' ? 16 : 10,
        h: type === 'cactus' ? 32 : 20,
      });
    }

    // move obstacles
    obstacles.forEach(o => o.x -= speed);
    obstacles = obstacles.filter(o => o.x + o.w > 0);

    // collision
    for (let o of obstacles) {
      if (
        dino.x < o.x + o.w &&
        dino.x + dino.w > o.x &&
        dino.y < o.y + o.h &&
        dino.y + dino.h > o.y
      ) {
        gameRunning = false;
        startBtn.textContent = 'Play Again';
        if (score > highscore) {
          highscore = score;
          localStorage.setItem('dinoHighScore', highscore);
          highscoreEl.textContent = highscore;
        }
        return;
      }
    }

    // score
    score = Math.floor(frame / 8);
    scoreEl.textContent = score;
    if (score > highscore) highscoreEl.textContent = score;

    // speed increase
    if (score < 50) speed = 4;
    else if (score < 100) speed = 6;
    else if (score < 200) speed = 8;
    else speed = 10;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ground
    ctx.fillStyle = 'rgba(212,175,55,0.08)';
    ctx.fillRect(0, groundY + 2, canvas.width, 1);
    for (let x = groundOffset; x < canvas.width; x += 20) {
      ctx.fillRect(x, groundY + 6, 8, 1);
    }

    // obstacles
    ctx.fillStyle = '#D4AF37';
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));

    // dino (stylized T-Rex)
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
    // eye
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(dino.x + 14, dino.y + 6, 4, 4);
    // leg animation
    if (dino.grounded && frame % 10 < 5) {
      ctx.fillRect(dino.x + 4, dino.y + dino.h, 4, 6);
      ctx.fillRect(dino.x + 12, dino.y + dino.h, 4, 4);
    } else {
      ctx.fillRect(dino.x + 4, dino.y + dino.h, 4, 5);
      ctx.fillRect(dino.x + 12, dino.y + dino.h, 4, 5);
    }

    if (!gameRunning && score > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#D4AF37';
      ctx.font = '14px DM Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  loop();
})();
