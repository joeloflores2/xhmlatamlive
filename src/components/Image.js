import { disclaimers } from '../data/site.js';
import { attrs, cx, each, esc } from '../utils/html.js';

/**
 * <picture> con formatos modernos opcionales.
 * sources: [{ srcset: '/images/x.avif', type: 'image/avif' }, { srcset: '/images/x.webp', type: 'image/webp' }]
 */
export function Picture({ src, alt, width, height, sources = [], loading = 'lazy', className, fetchpriority }) {
  const img = `<img${attrs({ src, alt, width, height, loading, decoding: 'async', fetchpriority, class: className })}>`;
  if (!sources.length) return img;
  return `<picture>${each(sources, (s) => `<source${attrs({ srcset: s.srcset, type: s.type })}>`)}${img}</picture>`;
}

/**
 * Figura con etiqueta obligatoria de imagen conceptual cuando corresponda.
 */
export function ConceptFigure({ src, alt, caption, width = 1200, height = 800, className, conceptual = true, sources, loading }) {
  return `<figure class="${cx('figure', conceptual && 'figure--concept', className)}">${Picture({ src, alt, width, height, sources, loading })}<figcaption>${
    conceptual ? `<span class="concept-tag">${esc(disclaimers.concept)}</span>` : ''
  }${caption ? `<span class="figure__caption">${esc(caption)}</span>` : ''}</figcaption></figure>`;
}
