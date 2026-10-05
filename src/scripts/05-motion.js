/*
 * Movimiento con propósito: contadores, avance de la ruta del jugador,
 * escalera de proyección y un parallax leve en el hero.
 * Con prefers-reduced-motion no se anima nada: el contenido ya está completo en el HTML.
 */
(() => {
  if (window.HXM.reducedMotion || !('IntersectionObserver' in window)) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function countUp(el) {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target) || target <= 1) return;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * easeOut(p)));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  const once = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        if (el.matches('.stats')) el.querySelectorAll('[data-count]').forEach(countUp);
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    },
    { threshold: 0.35 },
  );

  document.querySelectorAll('.stats, .ladder').forEach((el) => once.observe(el));

  /* La línea de la ruta avanza con el scroll */
  const routes = [...document.querySelectorAll('.timeline--route[data-progress]')];
  const hero = document.querySelector('[data-parallax]');
  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    for (const route of routes) {
      const rect = route.getBoundingClientRect();
      const progress = Math.min(Math.max((vh * 0.8 - rect.top) / (rect.height + vh * 0.35), 0), 1);
      route.style.setProperty('--progress', progress.toFixed(3));
    }
    if (hero && window.scrollY < vh * 1.2) {
      hero.style.transform = `translate3d(0, ${(window.scrollY * 0.18).toFixed(1)}px, 0)`;
    }
  }

  const request = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  if (routes.length || hero) {
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }
})();
