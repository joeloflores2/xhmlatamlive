import { cx, each, esc, pad } from '../utils/html.js';

/**
 * Línea de tiempo secuencial. `variant`: route (ruta del jugador, con línea
 * de vuelo que avanza al hacer scroll) | stages (etapas del proyecto).
 */
export function Timeline({ steps, label, variant = 'route', level = 3, current = '' }) {
  return `<ol class="${cx('timeline', `timeline--${variant}`)}" aria-label="${esc(label)}" data-progress>${each(steps, (s, i) => {
    const isCurrent = current && current === s.title;
    return `<li class="${cx('timeline__step', isCurrent && 'is-current')}"${isCurrent ? ' aria-current="step"' : ''}>
      <span class="timeline__num" aria-hidden="true">${pad(i + 1)}</span>
      <h${level} class="timeline__title">${esc(s.title)}</h${level}>
      ${s.text ? `<p class="timeline__text">${esc(s.text)}</p>` : ''}
      ${isCurrent ? '<span class="timeline__badge">Etapa actual</span>' : ''}
    </li>`;
  })}</ol>`;
}
