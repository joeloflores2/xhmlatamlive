import { each, esc } from '../utils/html.js';
import { Section, SectionHeading } from './Section.js';

/** Testimonios: solo se renderiza si existen testimonios reales en src/data/testimonials.js. */
export function Testimonials(items = [], { tone = 'carbon' } = {}) {
  if (!items.length) return '';
  return Section({
    id: 'testimonios',
    tone,
    labelledby: 'testimonios-title',
    content: `${SectionHeading({ id: 'testimonios-title', title: 'Testimonios' })}
    <ul class="quotes">${each(
      items,
      (t) => `<li class="quote"><blockquote><p>${esc(t.quote)}</p></blockquote><p class="quote__author">${esc(t.name)}${
        t.role ? `<span>${esc(t.role)}</span>` : ''
      }</p></li>`,
    )}</ul>`,
  });
}
