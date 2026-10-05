import { cx, esc } from '../utils/html.js';

/** Aviso destacado (transparencia, legal, cumplimiento). */
export function Notice({ title, text, tone = 'info', className, html = false }) {
  return `<aside class="${cx('notice', `notice--${tone}`, className)}">${title ? `<p class="notice__title">${esc(title)}</p>` : ''}<p class="notice__text">${
    html ? text : esc(text)
  }</p></aside>`;
}
