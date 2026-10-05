import { attrs, cx, esc } from '../utils/html.js';

/**
 * Contenedor de sección. `tone`: black | carbon | deep (azul profundo).
 */
export function Section({ id, tone = 'black', className, labelledby, content, container = true }) {
  const inner = container ? `<div class="container">${content}</div>` : content;
  return `<section${attrs({ id, class: cx('section', `tone-${tone}`, className), 'aria-labelledby': labelledby })}>${inner}</section>`;
}

/** Encabezado de sección: título grande + párrafo introductorio opcional. */
export function SectionHeading({ id, title, lead, level = 2, className, size = 'h2' }) {
  return `<header class="${cx('section-head', className)}"><h${level} id="${esc(id)}" class="${size}">${esc(title)}</h${level}>${
    lead ? `<p class="lead">${esc(lead)}</p>` : ''
  }</header>`;
}
