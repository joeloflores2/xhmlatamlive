import { disclaimers, site } from '../data/site.js';
import { esc } from '../utils/html.js';
import { Notice } from './Notice.js';
import { PageHero } from './PageHero.js';
import { Section } from './Section.js';

/** Plantilla de páginas legales: aviso de texto base + contenido en prosa. */
export function LegalPage({ title, lead, body }) {
  return [
    PageHero({ title, lead }),
    Section({
      id: 'contenido-legal',
      tone: 'black',
      labelledby: 'page-title',
      content: `<div class="legal">
        ${Notice({ title: 'Texto base', text: disclaimers.legalDraft, tone: 'legal' })}
        <div class="legal__body">${body}</div>
        <p class="legal__updated">Última actualización: ${esc(site.legal.lastUpdated)}.</p>
      </div>`,
    }),
  ].join('\n');
}
