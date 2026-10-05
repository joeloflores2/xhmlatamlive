import { cx, each, esc } from '../utils/html.js';
import { Placeholder } from './Placeholder.js';

/** Perfil del equipo. Sin nombre confirmado → placeholder (no se inventan nombres). */
export function TeamCard(m, { compact = false, level = 3 } = {}) {
  const initials = m.name
    ? m.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('')
    : '';
  const avatar = m.photo
    ? `<img src="${esc(m.photo)}" alt="" width="96" height="96" loading="lazy" decoding="async">`
    : `<span>${esc(initials)}</span>`;
  return `<li class="${cx('team__item', compact && 'team__item--compact')}">
    <div class="team__avatar" aria-hidden="true">${avatar}</div>
    <div class="team__body">
      <p class="team__area">${esc(m.area)}</p>
      <h${level} class="team__role">${esc(m.role)}</h${level}>
      <p class="team__name">${m.name ? esc(m.name) : Placeholder('Nombre y trayectoria')}</p>
      ${m.credentials ? `<p class="team__credentials">${esc(m.credentials)}</p>` : ''}
      ${compact ? '' : `<p class="team__text">${esc(m.text)}</p>`}
    </div>
  </li>`;
}

export const TeamList = (team, opts = {}) =>
  `<ul class="${cx('team', opts.compact && 'team--compact')}">${each(team, (m) => TeamCard(m, opts))}</ul>`;
