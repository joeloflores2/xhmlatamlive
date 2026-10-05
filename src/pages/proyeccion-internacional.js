import { CountriesBlock, FinalCta, ProjectionBlock, RouteBlock } from '../components/Blocks.js';
import { CardGrid } from '../components/Card.js';
import { Notice } from '../components/Notice.js';
import { PageHero } from '../components/PageHero.js';
import { Section, SectionHeading } from '../components/Section.js';
import { projectionMeaning, projectionText } from '../data/journey.js';
import { disclaimers } from '../data/site.js';

export default {
  path: '/proyeccion-internacional/',
  slug: 'proyeccion-internacional',
  title: 'Proyección internacional',
  crumb: 'Proyección',
  description:
    'Del campus al mundo: preparación y exposición para que jugadores de México y Latinoamérica aprovechen oportunidades en la Liga Premier, Liga de Expansión MX, MLS, Europa y otros mercados.',
  render: () =>
    [
      PageHero({ title: 'Proyección internacional', crumb: 'Proyección', lead: projectionText }),
      ProjectionBlock({ tone: 'black', withCountries: false, withButton: false }),
      Section({
        id: 'que-significa',
        tone: 'carbon',
        labelledby: 'que-significa-title',
        content: `${SectionHeading({
          id: 'que-significa-title',
          title: 'Qué significa proyección',
          lead: 'Proyectar a un jugador es prepararlo y hacer visible su talento. Las oportunidades llegan cuando el nivel, la preparación y la exposición coinciden.',
        })}${CardGrid(projectionMeaning, { variant: 'columns' })}${Notice({ title: 'Transparencia', text: disclaimers.projection, tone: 'legal' })}`,
      }),
      Section({
        id: 'talento-sin-fronteras',
        tone: 'black',
        labelledby: 'talento-title',
        content: CountriesBlock({ level: 2, id: 'talento-title', size: 'h2' }),
      }),
      RouteBlock({ tone: 'carbon' }),
      FinalCta(),
    ].join('\n'),
};
