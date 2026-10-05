import { each, esc } from '../utils/html.js';

/** Diagrama vertical de flujo (ej. Fútbol → Educación → … → Proyección). */
export function Flow(steps, { label }) {
  return `<ol class="flow" aria-label="${esc(label)}">${each(steps, (s) => `<li class="flow__item"><span>${esc(s)}</span></li>`)}</ol>`;
}
