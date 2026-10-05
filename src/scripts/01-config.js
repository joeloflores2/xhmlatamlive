/* Configuración pública inyectada en el build (ver src/config/index.js). */
(() => {
  const el = document.getElementById('site-config');
  let cfg = {};
  try {
    cfg = el ? JSON.parse(el.textContent) : {};
  } catch {
    cfg = {};
  }
  window.HXM = Object.assign(window.HXM || {}, { config: cfg });
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.HXM.reducedMotion = reduced;
  if (!reduced && 'IntersectionObserver' in window) document.documentElement.classList.add('motion-ready');
})();
