import { esc } from '../utils/html.js';

/** Encabezado de páginas internas con migas de pan. */
export function PageHero({ title, lead, crumb, extra = '' }) {
  return `<section class="page-hero" aria-labelledby="page-title">
  <div class="page-hero__grid" aria-hidden="true"></div>
  <div class="container page-hero__inner">
    <nav class="crumbs" aria-label="Ruta de navegación"><ol>
      <li><a href="/">Inicio</a></li>
      <li aria-current="page">${esc(crumb || title)}</li>
    </ol></nav>
    <h1 id="page-title" class="page-hero__title">${esc(title)}</h1>
    ${lead ? `<p class="page-hero__lead">${esc(lead)}</p>` : ''}
    ${extra}
  </div>
</section>`;
}
