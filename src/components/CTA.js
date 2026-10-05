import { esc } from '../utils/html.js';
import { ButtonGroup } from './Button.js';

/** Bloque de llamado a la acción con la línea de vuelo de la marca. */
export function CtaBand({ id = 'cta-final', title, text, actions = [] }) {
  return `<section class="cta-band" aria-labelledby="${esc(id)}">
  <svg class="cta-band__flight" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M -4 104 C 30 92, 58 64, 74 40 S 96 4, 108 -6"/></svg>
  <div class="container cta-band__inner">
    <h2 id="${esc(id)}" class="cta-band__title">${esc(title)}</h2>
    ${text ? `<p class="cta-band__text">${esc(text)}</p>` : ''}
    ${ButtonGroup(actions)}
  </div>
</section>`;
}
