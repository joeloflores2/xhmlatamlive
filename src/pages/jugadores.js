import { FamiliesBlock, RouteBlock } from '../components/Blocks.js';
import { Button, ButtonGroup } from '../components/Button.js';
import { CardGrid } from '../components/Card.js';
import { PlayerForm } from '../components/Forms.js';
import { Icon } from '../components/Icon.js';
import { PageHero } from '../components/PageHero.js';
import { Placeholder } from '../components/Placeholder.js';
import { Section, SectionHeading } from '../components/Section.js';
import { playerProfile } from '../data/programs.js';
import { microcopy } from '../data/site.js';
import { esc } from '../utils/html.js';
import { whatsappUrl } from '../utils/links.js';

export default {
  path: '/jugadores/',
  slug: 'jugadores',
  title: 'Programa para jugadores',
  crumb: 'Jugadores',
  description:
    'Programa para jugadores de Halcones Xtreme México: formación deportiva, educación, alojamiento y proyección. Registra el perfil del jugador para iniciar el proceso de evaluación.',
  render: () =>
    [
      PageHero({
        title: 'Programa para jugadores',
        crumb: 'Jugadores',
        lead: `${microcopy.nextTalent} Si tienes el talento y el compromiso, queremos conocerte.`,
        extra: ButtonGroup([
          Button({ href: '#registro', label: 'Registrar perfil', variant: 'primary', track: 'player_interest' }),
          Button({ href: whatsappUrl('Hola, quiero información sobre el programa para jugadores de HXM LATAM / Halcones Xtreme México.'), label: 'WhatsApp', variant: 'whatsapp', icon: 'whatsapp', external: true, track: 'whatsapp_click' }),
        ]),
      }),
      Section({
        id: 'perfil',
        tone: 'black',
        labelledby: 'perfil-title',
        content: `${SectionHeading({
          id: 'perfil-title',
          title: 'Qué buscamos',
          lead: 'El talento es el punto de partida. Lo que define el proceso es la actitud con la que se trabaja cada día.',
        })}${CardGrid(playerProfile, { variant: 'columns' })}
        <p class="fine">Edades, categorías y requisitos de admisión: ${Placeholder('Definir rangos de edad, categorías y documentación requerida')}</p>`,
      }),
      RouteBlock({ tone: 'carbon', withButton: false }),
      FamiliesBlock({ tone: 'black', withButton: false }),
      Section({
        id: 'registro',
        tone: 'deep',
        labelledby: 'form-jugador-title',
        content: `<div class="form-layout">
          <div class="form-layout__aside">
            <p class="h2 form-layout__title" aria-hidden="true">Registro de jugadores</p>
            <p class="prose">El registro es el primer paso de la ruta. Con esta información revisamos el perfil y, si corresponde, te contactamos para continuar con la evaluación.</p>
            <p class="prose">Registrar un perfil no implica admisión al programa.</p>
            <ul class="contact-lines">
              <li><a href="${esc(whatsappUrl())}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">${Icon('whatsapp')}<span>¿Dudas? Escríbenos por WhatsApp</span><span class="sr-only"> (se abre en una pestaña nueva)</span></a></li>
            </ul>
          </div>
          ${PlayerForm()}
        </div>`,
      }),
    ].join('\n'),
};
