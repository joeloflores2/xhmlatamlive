import { Button, ButtonGroup } from '../components/Button.js';
import { InterestForm } from '../components/Forms.js';
import { Icon } from '../components/Icon.js';
import { PageHero } from '../components/PageHero.js';
import { Placeholder } from '../components/Placeholder.js';
import { Section } from '../components/Section.js';
import { config } from '../config/index.js';
import { site } from '../data/site.js';
import { esc } from '../utils/html.js';
import { officeMapUrl, telHref, whatsappUrl } from '../utils/links.js';

export default {
  path: '/contacto/',
  slug: 'contacto',
  title: 'Contacto',
  crumb: 'Contacto',
  schemaType: 'ContactPage',
  description:
    'Contacta a Halcones Xtreme México / HXM LATAM: Altamira 125, Fracc. Municipio Libre, Aguascalientes, C.P. 20199. Teléfono y WhatsApp +52 449 256 8899.',
  render: () => {
    const a = site.address;
    return [
      PageHero({
        title: 'Contacto',
        lead: 'Escríbenos para conocer el proyecto, el programa para jugadores o las opciones de participación.',
      }),
      Section({
        id: 'datos-contacto',
        tone: 'black',
        labelledby: 'form-contacto-title',
        content: `<div class="form-layout">
          <div class="form-layout__aside contact-card">
            <p class="contact-card__org">${esc(site.name.toUpperCase())}</p>
            <address class="contact-card__address">
              <span>${esc(a.street)}</span>
              <span>${esc(a.neighborhood)}</span>
              <span>${esc(a.city)}, ${esc(a.state)}</span>
              <span>C.P. ${esc(a.postalCode)}</span>
              <span>${esc(a.country)}</span>
            </address>
            <ul class="contact-lines">
              <li><a href="${telHref()}">${Icon('phone')}<span>${esc(site.contact.phoneDisplay)}</span></a></li>
              <li>${Icon('mail')}<span>${site.contact.email ? `<a href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a>` : Placeholder('Correo institucional')}</span></li>
            </ul>
            ${ButtonGroup([
              Button({ href: whatsappUrl(), label: 'WhatsApp', variant: 'whatsapp', icon: 'whatsapp', external: true, track: 'whatsapp_click' }),
              Button({ href: config().mapUrl, label: 'Ver ubicación', variant: 'ghost', icon: 'pin', external: true }),
            ])}
            <p class="fine">El botón muestra la ubicación del campus en ${esc(site.campus.name)}, Aguascalientes. Para llegar a la oficina: <a href="${esc(officeMapUrl())}" target="_blank" rel="noopener noreferrer">ver dirección en Google Maps<span class="sr-only"> (se abre en una pestaña nueva)</span></a>.</p>
          </div>
          ${InterestForm({ id: 'form-contacto', title: 'Envíanos un mensaje', submitLabel: 'Enviar mensaje' })}
        </div>`,
      }),
    ].join('\n');
  },
};
