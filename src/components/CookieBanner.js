import { config } from '../config/index.js';

/**
 * Aviso de cookies. Solo existe si hay analítica configurada: sin IDs de
 * analítica el sitio no usa cookies de terceros y no se muestra banner.
 */
export function CookieBanner() {
  if (!config().hasTracking) return '';
  return `<div class="cookie-banner" data-cookie-banner role="region" aria-label="Preferencias de cookies" hidden>
  <p>Usamos cookies de analítica para entender cómo se usa el sitio, solo si las aceptas. Consulta la <a href="/politica-de-cookies/">Política de cookies</a>.</p>
  <div class="btn-group">
    <button type="button" class="btn btn--ghost btn--sm" data-consent="denied"><span>Rechazar</span></button>
    <button type="button" class="btn btn--primary btn--sm" data-consent="granted"><span>Aceptar analítica</span></button>
  </div>
</div>`;
}
