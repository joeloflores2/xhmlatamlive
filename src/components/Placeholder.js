import { PLACEHOLDER } from '../data/site.js';
import { esc } from '../utils/html.js';

/** Marca visible de información pendiente. Nunca se reemplaza con datos inventados. */
export const Placeholder = (context = '') =>
  `<span class="ph" data-placeholder>${esc(PLACEHOLDER)}${context ? `<span class="ph__context">${esc(context)}</span>` : ''}</span>`;
