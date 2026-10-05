import { each, esc } from '../utils/html.js';

/** Banda de estadísticas con contador animado (respeta prefers-reduced-motion). */
export function Stats(items, { label = 'El proyecto en cifras' } = {}) {
  return `<ul class="stats" aria-label="${esc(label)}">${each(
    items,
    (s) => `<li class="stat"><span class="stat__value" data-count="${Number(s.value)}" aria-hidden="true">${esc(s.value)}</span><span class="stat__label"><span class="sr-only">${esc(s.value)} </span>${esc(s.label)}</span></li>`,
  )}</ul>`;
}
