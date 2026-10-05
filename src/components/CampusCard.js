import { each, esc } from '../utils/html.js';
import { ConceptFigure } from './Image.js';

/** Tarjeta de instalación del campus. */
export function CampusCard(f, { level = 3 } = {}) {
  return `<li class="facility" id="${esc(f.id)}">
    <a class="facility__media" href="${esc(f.image)}" data-lightbox data-caption="${esc(`${f.count ? `${f.count} ` : ''}${f.title}`)}" data-conceptual="${f.conceptual ? '1' : ''}" aria-label="${esc(`Ampliar imagen: ${f.title}`)}">
      ${ConceptFigure({ src: f.image, alt: f.alt, conceptual: f.conceptual })}
    </a>
    <div class="facility__body">
      <h${level} class="facility__title">${f.count ? `<span class="facility__count">${esc(f.count)}</span> ` : ''}${esc(f.title)}</h${level}>
      <p class="facility__text">${esc(f.text)}</p>
    </div>
  </li>`;
}

export const CampusGrid = (facilities, opts) => `<ul class="facilities">${each(facilities, (f) => CampusCard(f, opts))}</ul>`;

/** Lista compacta de instalaciones (para la Home). */
export function FacilityList(facilities) {
  return `<ul class="facility-list">${each(
    facilities,
    (f) => `<li><span class="facility-list__count" aria-hidden="true">${esc(f.count || '1')}</span><span class="facility-list__name">${f.count ? '' : '<span class="sr-only">1 </span>'}${
      f.count ? `<span class="sr-only">${esc(f.count)} </span>` : ''
    }${esc(f.title)}</span></li>`,
  )}</ul>`;
}
