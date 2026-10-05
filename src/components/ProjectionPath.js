import { each, esc } from '../utils/html.js';

/** Escalera "Del campus al mundo": niveles de proyección, sin promesas de llegada. */
export function ProjectionPath(levels) {
  return `<ol class="ladder" aria-label="Mercados futbolísticos de referencia para la proyección">${each(
    levels,
    (l) => `<li class="ladder__step"><span class="ladder__flag" aria-hidden="true">${l.flag}</span><span class="ladder__name">${esc(l.name)}</span><span class="ladder__region">${esc(l.region)}</span></li>`,
  )}</ol>`;
}
