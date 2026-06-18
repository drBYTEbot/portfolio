// ==============================================
// Saria Malik — The Artist & The Engineer
// ==============================================

// --- Typewriter ---
(function typewriter() {
  const el = document.getElementById('typewriter');
  const phrases = [
    'CS Student',
    'Woman in STEM',
    'Johns Hopkins',
    'Robotics',
    'Problem Solver',
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

// --- Navbar scroll ---
(function navbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'var(--gold)';
      navbar.style.boxShadow = '0 4px 20px rgba(196, 149, 106, 0.1)';
    } else {
      navbar.style.borderBottomColor = 'var(--line)';
      navbar.style.boxShadow = 'none';
    }
  });
})();

// --- Scroll reveal ---
(function scrollReveal() {
  const els = document.querySelectorAll(
    '.tl-content, .project-card, .spotlight-card, .contact-card, .about-card'
  );
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
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
