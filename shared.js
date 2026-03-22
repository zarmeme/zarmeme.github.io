/* ═══════════════════════════════════════
   ZARA MEME — SHARED JS
   Handles cursor, nav transitions, scroll reveals
═══════════════════════════════════════ */

/* ── CURSOR ───────────────────────── */
(function () {
  const cur = document.getElementById('cur');
  const cdot = document.getElementById('cdot');
  if (!cur || !cdot) return;
  let MX = 0, MY = 0, CX = 0, CY = 0;
  document.addEventListener('mousemove', e => { MX = e.clientX; MY = e.clientY; });
  (function tick() {
    CX += (MX - CX) * .12; CY += (MY - CY) * .12;
    cur.style.left = CX + 'px'; cur.style.top = CY + 'px';
    cdot.style.left = MX + 'px'; cdot.style.top = MY + 'px';
    requestAnimationFrame(tick);
  })();
  function bindHov() {
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
    });
  }
  // bind on load and after any dynamic content mutations
  bindHov();
  new MutationObserver(bindHov).observe(document.body, { childList: true, subtree: true });
})();

/* ── PAGE TRANSITIONS ─────────────── */
(function () {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    // only intercept same-origin .html links, not anchors or external
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = href; }, 290);
  });
})();

/* ── SCROLL REVEALS ───────────────── */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: .1 });
  function bind() { document.querySelectorAll('.rev').forEach(el => io.observe(el)); }
  bind();
  new MutationObserver(bind).observe(document.body, { childList: true, subtree: true });
})();

/* ── COUNTER ANIMATION ────────────── */
window.animateCounters = function () {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let t0 = null;
    (function step(ts) {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / 1500, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + '+';
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  });
};
