/*
 * Consentimiento de cookies. Solo se guarda la decisión ("granted"/"denied"),
 * nunca datos personales. Sin analítica configurada no hay banner.
 */
(() => {
  const KEY = 'hxm-consent-v1';
  const read = () => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  };
  const write = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* almacenamiento no disponible: la decisión dura solo esta visita */
    }
  };

  let sessionValue = read();
  const consent = {
    get: () => sessionValue,
    granted: () => sessionValue === 'granted',
    set(value) {
      sessionValue = value;
      write(value);
      document.dispatchEvent(new CustomEvent('hxm:consent', { detail: value }));
    },
  };
  window.HXM.consent = consent;

  const banner = document.querySelector('[data-cookie-banner]');
  if (!banner) return;

  const show = () => {
    banner.hidden = false;
  };
  const hide = () => {
    banner.hidden = true;
  };

  if (!consent.get()) show();

  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-consent]');
    if (!button) return;
    consent.set(button.dataset.consent);
    hide();
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-cookie-settings]')) {
      show();
      banner.querySelector('[data-consent="granted"]')?.focus();
    }
  });
})();
