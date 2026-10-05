/* Header sticky y menú móvil accesible (Esc, foco, bloqueo de scroll). */
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const label = toggle?.querySelector('[data-menu-label]');

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Si la navegación no cabe (p. ej. tipografía de respaldo más ancha), usar menú hamburguesa */
  const root = document.documentElement;
  const inner = header?.querySelector('.site-header__inner');
  const nav = header?.querySelector('.nav');
  function fitNav() {
    if (!inner || !nav) return;
    root.classList.remove('nav-collapsed');
    if (getComputedStyle(nav).display === 'none') return;
    if (inner.scrollWidth > inner.clientWidth + 1) root.classList.add('nav-collapsed');
  }
  let fitFrame = 0;
  const requestFit = () => {
    cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(fitNav);
  };
  fitNav();
  window.addEventListener('resize', requestFit);
  document.fonts?.ready.then(requestFit);

  if (!toggle || !menu) return;

  const focusables = () => [toggle, ...menu.querySelectorAll('a[href], button:not([disabled])')];

  function open() {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
    if (label) label.textContent = 'Cerrar menú';
    header?.classList.add('is-menu-open');
    document.body.classList.add('menu-open');
    menu.querySelector('a')?.focus();
  }

  function close({ restoreFocus = true } = {}) {
    menu.classList.remove('is-open');
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (label) label.textContent = 'Abrir menú';
    header?.classList.remove('is-menu-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => (menu.hidden ? open() : close()));

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close({ restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (menu.hidden) return;
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key === 'Tab') {
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    const desktopNav = window.matchMedia('(min-width: 80em)').matches && !root.classList.contains('nav-collapsed');
    if (desktopNav && !menu.hidden) close({ restoreFocus: false });
  });
})();
