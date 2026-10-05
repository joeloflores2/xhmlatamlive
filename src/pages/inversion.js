import { Button, ButtonGroup } from '../components/Button.js';
import { CardGrid } from '../components/Card.js';
import { InterestForm } from '../components/Forms.js';
import { Icon } from '../components/Icon.js';
import { Notice } from '../components/Notice.js';
import { PageHero } from '../components/PageHero.js';
import { Placeholder } from '../components/Placeholder.js';
import { Section, SectionHeading } from '../components/Section.js';
import { investment, valueProposition } from '../data/programs.js';
import { disclaimers, site } from '../data/site.js';
import { esc } from '../utils/html.js';
import { telHref, whatsappUrl } from '../utils/links.js';

export default {
  path: '/inversion/',
  slug: 'inversion',
  title: 'Inversión y participación',
  crumb: 'Inversión',
  description:
    'Información para potenciales socios de Halcones Xtreme México / HXM LATAM. Participación sujeta a estructura jurídica, contratos, documentación y procesos de validación. Contenido informativo, sin promesas de rendimiento.',
  render: () =>
    [
      PageHero({
        title: investment.title,
        crumb: 'Inversión',
        lead: investment.subtitle,
        extra: ButtonGroup([
          Button({ href: '#el-proyecto', label: 'Quiero conocer el proyecto', variant: 'primary', track: 'investment_interest' }),
          Button({ href: '#solicitar-informacion', label: 'Solicitar información', variant: 'ghost', track: 'investment_interest' }),
        ]),
      }),
      Section({
        id: 'aviso-inversion',
        tone: 'black',
        className: 'section--tight',
        labelledby: 'aviso-inversion-title',
        content: `<h2 id="aviso-inversion-title" class="sr-only">Aviso importante</h2>${Notice({
          title: 'Aviso importante',
          text: `${disclaimers.investment} Toda persona interesada debe obtener asesoría legal y financiera independiente antes de tomar cualquier decisión.`,
          tone: 'legal',
          className: 'notice--lg',
        })}`,
      }),
      Section({
        id: 'el-proyecto',
        tone: 'black',
        labelledby: 'el-proyecto-title',
        content: `${SectionHeading({
          id: 'el-proyecto-title',
          title: 'Información para potenciales socios',
          lead: `${disclaimers.project} Su propuesta combina infraestructura deportiva, formación de jugadores, educación y la construcción de un club con visión internacional.`,
        })}${CardGrid(valueProposition, { variant: 'columns' })}${ButtonGroup([
          Button({ href: '/campus/', label: 'Ver el campus', variant: 'secondary' }),
          Button({ href: '/el-club/', label: 'Conoce el club', variant: 'ghost' }),
        ])}`,
      }),
      Section({
        id: 'modelo-participacion',
        tone: 'carbon',
        labelledby: 'modelo-participacion-title',
        content: `${SectionHeading({
          id: 'modelo-participacion-title',
          title: 'Modelo de participación',
          lead: `El proyecto busca integrar participantes de ${investment.audiences.join(' y ')}. Las condiciones de cada modalidad se presentan de manera individual, dentro de un proceso formal.`,
        })}
        <p class="prose">La participación estará sujeta a:</p>
        ${CardGrid(investment.conditions, { variant: 'grid' })}
        <p class="fine">Detalle de modalidades de participación: ${Placeholder('Información de inversión y modelo jurídico, tras revisión legal')}</p>`,
      }),
      Section({
        id: 'proceso',
        tone: 'black',
        labelledby: 'proceso-title',
        content: `${SectionHeading({
          id: 'proceso-title',
          title: 'Cómo es el proceso',
          lead: 'Un camino ordenado, con información clara en cada paso y sin compromisos hasta la formalización.',
        })}${CardGrid(investment.process, { variant: 'process', numbered: true })}`,
      }),
      Section({
        id: 'solicitar-informacion',
        tone: 'deep',
        labelledby: 'form-inversion-title',
        content: `<div class="form-layout">
          <div class="form-layout__aside">
            <p class="h2 form-layout__title" aria-hidden="true">Solicitar información</p>
            <p class="prose">Déjanos tus datos y el tipo de interés. Un representante del proyecto se pondrá en contacto contigo para compartir la información correspondiente.</p>
            <ul class="contact-lines">
              <li><a href="${esc(whatsappUrl())}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">${Icon('whatsapp')}<span>WhatsApp</span><span class="sr-only"> (se abre en una pestaña nueva)</span></a></li>
              <li><a href="${telHref()}">${Icon('phone')}<span>${esc(site.contact.phoneDisplay)}</span></a></li>
            </ul>
            <p class="fine">${esc(disclaimers.investment)}</p>
          </div>
          ${InterestForm({
            id: 'form-inversion',
            formName: 'inversion',
            event: 'investment_interest',
            defaultInterest: 'Inversión',
            endpointKey: 'investment',
            title: 'Solicitud de información para potenciales socios',
            submitLabel: 'Solicitar información',
          })}
        </div>`,
      }),
    ].join('\n'),
};
