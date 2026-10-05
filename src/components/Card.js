import { cx, each, esc, pad } from '../utils/html.js';

/**
 * Lista de bloques título + texto. Variantes de presentación:
 * columns (columnas con divisor vertical), grid (rejilla con línea superior),
 * checklist (lista con marca), numbered (secuencia real).
 */
export function Card({ title, text, lead, num, level = 3 }) {
  return `${num ? `<span class="card__num" aria-hidden="true">${num}</span>` : ''}<h${level} class="card__title">${esc(title)}</h${level}>${
    lead ? `<p class="card__lead">${esc(lead)}</p>` : ''
  }${text ? `<p class="card__text">${esc(text)}</p>` : ''}`;
}

export function CardGrid(items, { variant = 'grid', numbered = false, level = 3, className, label } = {}) {
  const tag = numbered ? 'ol' : 'ul';
  return `<${tag} class="${cx('cards', `cards--${variant}`, className)}"${label ? ` aria-label="${esc(label)}"` : ''}>${each(
    items,
    (it, i) => `<li class="card">${Card({ ...it, num: numbered ? pad(i + 1) : '', level })}</li>`,
  )}</${tag}>`;
}
