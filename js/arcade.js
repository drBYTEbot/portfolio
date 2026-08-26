/* ===== arcade.js — synthesized chiptune background music (Web Audio API) =====
   No external assets: a looping square-wave arpeggio + triangle bass + noise hats,
   auto-started on the first user gesture (browser autoplay policy). */
(function () {
  let ctx = null, master = null, noiseBuf = null;
  let muted = false, started = false, timer = null, nextTime = 0, step = 0;
  const STEPS = 16;
  const tempo = 138;                       // BPM
  const stepDur = 60 / tempo / 2;          // 8th notes
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

  // Lead (square) arpeggio — Am  F   C   G
  const lead = [69,72,76,72, 65,69,72,69, 72,76,79,76, 67,71,74,71];
  // Bass (triangle) roots on each beat
  const bass = [45,0,0,0, 41,0,0,0, 48,0,0,0, 43,0,0,0];

  function ensureCtx() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.4;
    master.connect(ctx.destination);
    const len = Math.floor(ctx.sampleRate * 0.1);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  function tone(freq, t, dur, type, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function hat(t, vol) {
    if (!noiseBuf) return;
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    s.connect(hp).connect(g).connect(master);
    s.start(t); s.stop(t + 0.05);
  }

  function scheduleStep(i, t) {
    if (bass[i]) tone(mtof(bass[i]), t, stepDur * 1.9, 'triangle', 0.20);
    if (lead[i]) tone(mtof(lead[i]), t, stepDur * 0.9, 'square', 0.09);
    hat(t, 0.022);
  }

  function scheduler() {
    while (nextTime < ctx.currentTime + 0.12) {
      scheduleStep(step, nextTime);
      nextTime += stepDur;
      step = (step + 1) % STEPS;
    }
  }

  function start() {
    ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (started) return;
    started = true;
    nextTime = ctx.currentTime + 0.05; step = 0;
    timer = setInterval(scheduler, 25);
  }

  function setMuted(m) { muted = m; if (master) master.gain.value = muted ? 0 : 0.4; return muted; }
  function toggle() { return setMuted(!muted); }

  // Auto-start on the very first user gesture anywhere on the page.
  function bindAutoStart() {
    const go = () => { start(); };
    document.addEventListener('pointerdown', go, { once: true });
    document.addEventListener('keydown', go, { once: true });
  }
  bindAutoStart();

  window.Arcade = { start, toggle, setMuted, isMuted: () => muted, isStarted: () => started };
})();
