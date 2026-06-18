// ==============================================
// Saria @ AI& — FEMININE AI PORTFOLIO
// ==============================================

// --- Typewriter ---
(function typewriter() {
  const el = document.getElementById('typewriter');
  const phrases = [
    'CS Student',
    'Woman in STEM',
    'Johns Hopkins',
    'Robotics',
    'Future Engineer',
  ];
  let idx = 0, char = 0, deleting = false, paused = false;

  function tick() {
    const cur = phrases[idx];
    if (paused) { paused = false; deleting = true; setTimeout(tick, 60); return; }
    if (!deleting) {
      el.textContent = cur.substring(0, char + 1);
      char++;
      if (char === cur.length) { paused = true; setTimeout(tick, 2000); return; }
      setTimeout(tick, 80);
    } else {
      el.textContent = cur.substring(0, char - 1);
      char--;
      if (char === 0) { deleting = false; idx = (idx + 1) % phrases.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 40);
    }
  }
  tick();
})();

// --- Background Music — girly synth melody ---
(function bgMusic() {
  let ctx = null;
  let playing = false;
  let timeoutId = null;
  let noteIdx = 0;

  const melody = [
    { note: 523, dur: 0.3 }, { note: 587, dur: 0.3 }, { note: 659, dur: 0.4 },
    { note: 659, dur: 0.2 }, { note: 523, dur: 0.3 }, { note: 659, dur: 0.3 },
    { note: 784, dur: 0.5 },
    { note: 659, dur: 0.3 }, { note: 784, dur: 0.3 }, { note: 880, dur: 0.4 },
    { note: 880, dur: 0.2 }, { note: 659, dur: 0.3 }, { note: 784, dur: 0.3 },
    { note: 1047, dur: 0.5 },
    { note: 784, dur: 0.2 }, { note: 880, dur: 0.2 }, { note: 784, dur: 0.2 },
    { note: 659, dur: 0.3 }, { note: 587, dur: 0.2 }, { note: 659, dur: 0.2 },
    { note: 523, dur: 0.4 }, { note: 523, dur: 0.3 }, { note: 659, dur: 0.3 },
    { note: 784, dur: 0.5 },
    { note: 1047, dur: 0.5 }, { note: 880, dur: 0.3 }, { note: 784, dur: 0.4 },
    { note: 659, dur: 0.3 }, { note: 784, dur: 0.3 }, { note: 880, dur: 0.5 },
  ];

  function playNote(freq, dur, delay) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.connect(g);
    g.connect(ctx.destination);
    const t = ctx.currentTime + delay;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.04, t);
    g.gain.linearRampToValueAtTime(0.03, t + dur * 0.5);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t);
    o.stop(t + dur);
  }

  function playChime(freq, delay) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.connect(g);
    g.connect(ctx.destination);
    const t = ctx.currentTime + delay;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.linearRampToValueAtTime(freq * 1.5, t + 0.5);
    g.gain.setValueAtTime(0.03, t);
    g.gain.linearRampToValueAtTime(0.02, t + 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1);
    o.start(t);
    o.stop(t + 1);
  }

  function scheduleLoop() {
    if (!playing) return;
    let t = 0;
    for (let i = 0; i < melody.length; i++) {
      playNote(melody[i].note, melody[i].dur, t);
      t += melody[i].dur;
      if (i % 8 === 7) playChime(melody[i].note * 2, t - 0.1);
    }
    timeoutId = setTimeout(scheduleLoop, t * 1000 + 2000);
  }

  const toggle = document.createElement('button');
  toggle.id = 'musicToggle';
  toggle.textContent = '♫ Music Off';
  toggle.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; z-index: 9999;
    padding: 8px 16px; border-radius: 20px; border: 2px solid var(--pink);
    background: white; color: var(--pink); font-family: var(--font-body);
    font-size: 0.75rem; font-weight: 700; cursor: pointer;
    box-shadow: 0 4px 12px var(--shadow-pink); transition: all 0.2s;
    letter-spacing: 0.5px;
  `;
  toggle.addEventListener('mouseenter', () => {
    toggle.style.transform = 'scale(1.05)';
  });
  toggle.addEventListener('mouseleave', () => {
    toggle.style.transform = 'scale(1)';
  });
  toggle.addEventListener('click', () => {
    if (!playing) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      playing = true;
      toggle.textContent = '♫ Music On';
      toggle.style.background = 'var(--pink)';
      toggle.style.color = 'white';
      scheduleLoop();
    } else {
      playing = false;
      toggle.textContent = '♫ Music Off';
      toggle.style.background = 'white';
      toggle.style.color = 'var(--pink)';
      if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
    }
  });
  document.body.appendChild(toggle);
})();

// --- Sounds for icons ---
(function iconSounds() {
  document.querySelectorAll('.tag, .btn, .cc-link, .tl-content, .spotlight-card').forEach(el => {
    el.addEventListener('mouseenter', function() {
      playTinkle();
    });
    el.addEventListener('click', function() {
      playSparkle();
    });
  });

  // floating icons — gentle twinkle on hover
  document.querySelectorAll('.float-icon').forEach(icon => {
    icon.style.pointerEvents = 'auto';
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', function() {
      playChimeSound();
      this.style.transform = 'scale(1.5)';
      this.style.opacity = '0.8';
      this.style.transition = 'all 0.3s';
      setTimeout(() => {
        this.style.transform = '';
        this.style.opacity = '';
      }, 400);
    });
  });
})();

// --- Mini chime (gentle, high-pitched) ---
function playTinkle() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.setValueAtTime(1760, ctx.currentTime);
    g.gain.setValueAtTime(0.02, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    o.start();
    o.stop(ctx.currentTime + 0.08);
  } catch(e) {}
}

// --- Chime for floating icons ---
function playChimeSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [1319, 1568, 1760];
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      g.gain.setValueAtTime(0.03, ctx.currentTime + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3);
      o.start(ctx.currentTime + i * 0.08);
      o.stop(ctx.currentTime + i * 0.08 + 0.3);
    });
  } catch(e) {}
}

// --- Sparkle click on tags (kept for click burst) ---
(function tagSparkles() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
      const rect = this.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        s.textContent = ['♥','✦','🌸','♡','🎀','●'][Math.floor(Math.random() * 6)];
        s.style.cssText = `
          position: fixed; z-index: 9999; pointer-events: none;
          font-size: ${Math.random() * 8 + 8}px; color: var(--pink);
          text-shadow: 0 0 6px var(--pink);
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
          animation: sparkBurst ${0.5 + Math.random() * 0.3}s ease forwards;
        `;
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 50;
        s.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        s.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1000);
      }
    });
  });
})();

// --- Heart particles on buttons ---
(function buttonHearts() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      for (let i = 0; i < 10; i++) {
        const h = document.createElement('span');
        h.textContent = ['♥','♡','🌸','🎀'][Math.floor(Math.random() * 4)];
        h.style.cssText = `
          position: fixed; z-index: 9999; pointer-events: none;
          font-size: ${Math.random() * 10 + 12}px;
          color: var(--pink); text-shadow: 0 0 8px var(--pink);
          left: ${e.clientX}px; top: ${e.clientY}px;
          animation: sparkBurst ${0.6 + Math.random() * 0.4}s ease forwards;
        `;
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 80;
        h.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        h.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1200);
      }
    });
  });
})();

// --- Hover rose bloom on project cards ---
(function projectHover() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      const bow = this.querySelector('.pc-bow');
      if (bow) {
        bow.style.transform = 'scale(1.3)';
        setTimeout(() => bow.style.transform = '', 300);
      }
    });
  });
})();

// --- Navbar scroll ---
(function navbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'var(--pink)';
      navbar.style.boxShadow = '0 4px 20px var(--shadow-pink)';
    } else {
      navbar.style.borderBottomColor = 'var(--pink-border)';
      navbar.style.boxShadow = 'none';
    }
  });
})();

// --- Scroll reveal ---
(function scrollReveal() {
  const els = document.querySelectorAll(
    '.tl-content, .project-card, .spotlight-card, .contact-card, .about-card, .letter-envelope'
  );
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'all 0.7s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
})();

// --- Sound functions ---
function playSparkle() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [1047, 1319, 1568];
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
      g.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.2);
      o.start(ctx.currentTime + i * 0.06);
      o.stop(ctx.currentTime + i * 0.06 + 0.2);
    });
  } catch(e) {}
}

// --- Inject sparkle keyframes ---
(function injectFrames() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes sparkBurst {
      0% { opacity: 1; transform: translate(0, 0) scale(1); }
      100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.2); }
    }
  `;
  document.head.appendChild(s);
})();
