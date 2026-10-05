import { disclaimers } from '../data/site.js';
import { each, esc } from '../utils/html.js';

/**
 * Galería con visor ampliado. Sin JavaScript, cada enlace abre la imagen.
 * items: [{ src, alt, caption, conceptual }]
 * Requiere Modal({ id: 'visor' }) en la página (ver pages/campus.js).
 */
export function Gallery(items) {
  if (!items.length) return '';
  return `<ul class="gallery">${each(
    items,
    (it) => `<li class="gallery__item"><a class="gallery__link" href="${esc(it.src)}" data-lightbox data-caption="${esc(it.caption || '')}" data-conceptual="${it.conceptual ? '1' : ''}">
      <img src="${esc(it.src)}" alt="${esc(it.alt)}" width="1200" height="800" loading="lazy" decoding="async">
      <span class="gallery__caption">${esc(it.caption || '')}${it.conceptual ? `<span class="concept-tag">${esc(disclaimers.concept)}</span>` : ''}</span>
    </a></li>`,
  )}</ul>`;
}
