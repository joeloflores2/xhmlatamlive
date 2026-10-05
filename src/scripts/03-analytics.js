/*
 * Analítica opcional (GA4, GTM, Meta Pixel). Solo se carga si existe un ID
 * configurado Y la persona aceptó las cookies. Eventos disponibles:
 * whatsapp_click, investment_interest, player_interest, contact_submit,
 * form_start, form_submit.
 */
(() => {
  const { config, consent } = window.HXM;
  let loaded = false;

  const loadScript = (src) => {
    const s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  };

  function init() {
    if (loaded || !config.hasTracking || !consent.granted()) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];

    if (config.gtmId) {
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`);
    }

    if (config.gaId) {
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', config.gaId);
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.gaId)}`);
    }

    if (config.metaPixelId && !window.fbq) {
      const fbq = function fbq() {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      };
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      window.fbq = fbq;
      window._fbq = fbq;
      loadScript('https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', config.metaPixelId);
      window.fbq('track', 'PageView');
    }
  }

  function track(name, params = {}) {
    const data = { page_path: location.pathname, ...params };
    if (!loaded) return;
    if (config.gtmId) window.dataLayer.push({ event: name, ...data });
    if (config.gaId && window.gtag) window.gtag('event', name, data);
    if (window.fbq) window.fbq('trackCustom', name, data);
  }

  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-track]');
    if (el) track(el.dataset.track, { link_url: el.getAttribute('href') || '' });
  });

  document.addEventListener('hxm:consent', init);
  window.HXM.analytics = { init, track };
  init();
})();
