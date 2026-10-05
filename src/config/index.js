/**
 * Configuración de build a partir de variables de entorno PUBLIC_*.
 * Todas son públicas (terminan en el HTML). Los valores se validan para
 * evitar inyecciones o URLs inseguras.
 */

import { site } from '../data/site.js';

let current = null;

const PATTERNS = {
  ga: /^G-[A-Z0-9]{4,20}$/,
  gtm: /^GTM-[A-Z0-9]{4,12}$/,
  pixel: /^\d{6,20}$/,
};

const warnings = [];

function validId(value, pattern, name) {
  const v = (value || '').trim();
  if (!v) return '';
  if (pattern.test(v)) return v;
  warnings.push(`${name} con formato inválido ("${v}"): se ignora.`);
  return '';
}

function httpsUrl(value, name) {
  const v = (value || '').trim();
  if (!v) return '';
  try {
    const url = new URL(v);
    if (url.protocol === 'https:') return url.href;
  } catch {
    /* se reporta abajo */
  }
  warnings.push(`${name} debe ser una URL https válida ("${v}"): se ignora.`);
  return '';
}

export function createConfig(env = {}, { dev = false } = {}) {
  warnings.length = 0;
  const siteUrl = (httpsUrl(env.PUBLIC_SITE_URL, 'PUBLIC_SITE_URL') || `https://${site.domain}`).replace(/\/+$/, '');
  const contact = httpsUrl(env.PUBLIC_CONTACT_ENDPOINT, 'PUBLIC_CONTACT_ENDPOINT');

  const cfg = {
    dev,
    siteUrl,
    gaId: validId(env.PUBLIC_GA_ID, PATTERNS.ga, 'PUBLIC_GA_ID'),
    gtmId: validId(env.PUBLIC_GTM_ID, PATTERNS.gtm, 'PUBLIC_GTM_ID'),
    metaPixelId: validId(env.PUBLIC_META_PIXEL_ID, PATTERNS.pixel, 'PUBLIC_META_PIXEL_ID'),
    endpoints: {
      contact,
      investment: httpsUrl(env.PUBLIC_INVESTMENT_ENDPOINT, 'PUBLIC_INVESTMENT_ENDPOINT') || contact,
      player: httpsUrl(env.PUBLIC_PLAYER_ENDPOINT, 'PUBLIC_PLAYER_ENDPOINT') || contact,
    },
    mapUrl: httpsUrl(env.PUBLIC_MAP_URL, 'PUBLIC_MAP_URL') || site.campus.mapUrl,
    buildDate: new Date().toISOString().slice(0, 10),
  };
  cfg.hasTracking = Boolean(cfg.gaId || cfg.gtmId || cfg.metaPixelId);
  cfg.csp = buildCsp(cfg);
  cfg.warnings = [...warnings];
  return cfg;
}

/** Content Security Policy por meta (GitHub Pages no permite cabeceras propias). */
function buildCsp(cfg) {
  const script = ["'self'"];
  const connect = ["'self'"];
  const img = ["'self'", 'data:'];
  const formAction = ["'self'"];

  if (cfg.gaId || cfg.gtmId) {
    script.push('https://www.googletagmanager.com');
    connect.push('https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.googletagmanager.com');
    img.push('https://*.google-analytics.com', 'https://*.googletagmanager.com');
  }
  if (cfg.metaPixelId) {
    script.push('https://connect.facebook.net');
    connect.push('https://www.facebook.com', 'https://connect.facebook.net');
    img.push('https://www.facebook.com');
  }
  const origins = new Set(
    Object.values(cfg.endpoints)
      .filter(Boolean)
      .map((u) => new URL(u).origin),
  );
  for (const origin of origins) {
    connect.push(origin);
    formAction.push(origin);
  }

  const directives = [
    "default-src 'self'",
    `script-src ${script.join(' ')}`,
    "style-src 'self' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    `img-src ${img.join(' ')}`,
    `connect-src ${connect.join(' ')}`,
    `form-action ${formAction.join(' ')}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "manifest-src 'self'",
  ];
  if (!cfg.dev) directives.push('upgrade-insecure-requests');
  return directives.join('; ');
}

export function setConfig(cfg) {
  current = cfg;
}

export function config() {
  if (!current) throw new Error('La configuración no ha sido inicializada (setConfig).');
  return current;
}

/** Subconjunto seguro que se expone al navegador. */
export function publicConfig() {
  const c = config();
  return {
    gaId: c.gaId,
    gtmId: c.gtmId,
    metaPixelId: c.metaPixelId,
    hasTracking: c.hasTracking,
    whatsapp: site.contact.whatsappNumber,
    whatsappMessage: site.contact.whatsappMessage,
  };
}
