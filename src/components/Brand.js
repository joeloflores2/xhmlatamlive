import { site } from '../data/site.js';
import { esc } from '../utils/html.js';

/**
 * Marca. Mientras no exista logotipo oficial (site.logo = null) se usa un
 * monograma tipográfico PROVISIONAL. Al recibir el logo, colócalo en
 * /public/logos/ y asigna su ruta en src/data/site.js → logo.
 */
export function Brand({ className = 'brand' } = {}) {
  const label = `${site.brand} — ${site.name}, ir al inicio`;
  if (site.logo) {
    return `<a class="${className}" href="/" aria-label="${esc(label)}"><img class="brand__logo" src="${esc(site.logo)}" alt="" width="160" height="48"></a>`;
  }
  return `<a class="${className}" href="/" aria-label="${esc(label)}">
    <span class="brand__mark" aria-hidden="true">HXM</span>
    <span class="brand__text" aria-hidden="true"><span class="brand__latam">LATAM</span><span class="brand__name">${esc(site.name)}</span></span>
  </a>`;
}
