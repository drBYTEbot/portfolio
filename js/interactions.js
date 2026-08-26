/* ===== interactions.js — neuron hover/click/keyboard + signal ===== */
(function () {
  const B = window.__BRAIN__;
  if (!B) return;
  const app = document.getElementById('app');

  B.neuronG.querySelectorAll('.neuron').forEach((g) => {
    const id = g.getAttribute('data-id');
    const section = B.data.sections.find((s) => s.id === id);

    g.addEventListener('mouseenter', () => section._lobe && section._lobe.classList.add('lit'));
    g.addEventListener('mouseleave', () => section._lobe && section._lobe.classList.remove('lit'));
    g.addEventListener('click', () => activate(id, g));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(id, g); }
    });
  });

  function activate(id, g) {
    document.querySelectorAll('.neuron.active').forEach((n) => n.classList.remove('active'));
    g.classList.add('active');
    const path = document.getElementById('path-' + id);
    if (path) {
      path.classList.add('signal');
      setTimeout(() => path.classList.remove('signal'), 650);
    }
    app.classList.add('show-labels');
    setTimeout(() => { if (window.__APP__) window.__APP__.open(id); }, 280);
  }

  // Reveal region labels on any focus within the brain (keyboard users)
  B.neuronG.addEventListener('focusin', () => app.classList.add('show-labels'));
})();
