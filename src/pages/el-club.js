import { FinalCta, TeamBlock } from '../components/Blocks.js';
import { Button, ButtonGroup } from '../components/Button.js';
import { CardGrid } from '../components/Card.js';
import { PageHero } from '../components/PageHero.js';
import { Section, SectionHeading } from '../components/Section.js';
import { Testimonials } from '../components/Testimonials.js';
import { clubPillars } from '../data/programs.js';
import { microcopy } from '../data/site.js';
import { testimonials } from '../data/testimonials.js';
import { esc } from '../utils/html.js';

export default {
  path: '/el-club/',
  slug: 'el-club',
  title: 'El club',
  crumb: 'El club',
  description:
    'El club Halcones Xtreme México: captación, evaluación, formación, competencia y proyección de futbolistas, con la aspiración de competir profesionalmente en México.',
  render: () =>
    [
      PageHero({
        title: 'El club',
        lead: 'La construcción de una institución futbolística con la aspiración de competir profesionalmente en México.',
      }),
      Section({
        id: 'institucion',
        tone: 'carbon',
        labelledby: 'institucion-title',
        content: `<div class="split">
          <div class="split__body">
            ${SectionHeading({ id: 'institucion-title', title: 'Una institución en construcción' })}
            <p class="prose">Halcones Xtreme México se plantea como algo más que una academia: un club con estructura deportiva, método de trabajo y equipos que compitan con regularidad.</p>
            <p class="prose">La participación en competencias profesionales está sujeta a los procesos, requisitos y decisiones de las instancias correspondientes. Mientras tanto, el trabajo se concentra en lo que depende del club: formar bien, competir con seriedad y ofrecer a cada jugador un entorno profesional.</p>
          </div>
          <div class="split__aside">
            <p class="pull">${esc(microcopy.buildOpportunities)}</p>
          </div>
        </div>`,
      }),
      Section({
        id: 'modelo',
        tone: 'black',
        labelledby: 'modelo-title',
        content: `${SectionHeading({
          id: 'modelo-title',
          title: 'El modelo del club',
          lead: 'Cinco etapas conectadas, desde que un jugador es identificado hasta que está preparado para aprovechar oportunidades.',
        })}${CardGrid(clubPillars, { variant: 'process', numbered: true })}${ButtonGroup([
          Button({ href: '/jugadores/', label: 'Conoce el programa para jugadores', variant: 'primary', track: 'player_interest' }),
        ])}`,
      }),
      TeamBlock({ tone: 'carbon', compact: false, withButton: false }),
      Testimonials(testimonials, { tone: 'black' }),
      FinalCta(),
    ].join('\n'),
};
