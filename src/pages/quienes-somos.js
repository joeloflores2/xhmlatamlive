import { FinalCta, InstitutionsBlock, ProjectStatusBlock } from '../components/Blocks.js';
import { CardGrid } from '../components/Card.js';
import { PageHero } from '../components/PageHero.js';
import { Section, SectionHeading } from '../components/Section.js';
import { aboutPillars, mission, values, vision } from '../data/programs.js';
import { each, esc } from '../utils/html.js';

export default {
  path: '/quienes-somos/',
  slug: 'quienes-somos',
  title: 'Quiénes somos',
  crumb: 'Quiénes somos',
  schemaType: 'AboutPage',
  description:
    'Halcones Xtreme México nace para identificar, formar y desarrollar talento futbolístico de México, Latinoamérica y otros mercados. Misión, visión y valores de HXM LATAM.',
  render: () =>
    [
      PageHero({
        title: 'Quiénes somos',
        lead: 'Halcones Xtreme México nace con la visión de construir una plataforma deportiva capaz de identificar, formar y desarrollar talento futbolístico de México, Latinoamérica y otros mercados internacionales.',
      }),
      Section({
        id: 'plataforma',
        tone: 'carbon',
        labelledby: 'plataforma-title',
        content: `${SectionHeading({
          id: 'plataforma-title',
          title: 'Una plataforma para el talento',
          lead: 'El proyecto reúne en Aguascalientes lo que un futbolista joven necesita para desarrollarse: entrenamiento, estudio, residencia, competencia y una ruta hacia el fútbol profesional.',
        })}${CardGrid(aboutPillars, { variant: 'grid' })}`,
      }),
      Section({
        id: 'mision-vision',
        tone: 'black',
        labelledby: 'mision-vision-title',
        content: `<h2 id="mision-vision-title" class="sr-only">Misión, visión y valores</h2>
        <div class="purpose">
          <div class="purpose__item"><h3 class="purpose__label">Misión</h3><p class="purpose__text">${esc(mission)}</p></div>
          <div class="purpose__item"><h3 class="purpose__label">Visión</h3><p class="purpose__text">${esc(vision)}</p></div>
        </div>
        <div class="values">
          <h3 class="purpose__label">Valores</h3>
          <ul class="values__list">${each(values, (v) => `<li>${esc(v)}</li>`)}</ul>
        </div>`,
      }),
      ProjectStatusBlock({ tone: 'carbon' }),
      InstitutionsBlock({ tone: 'black' }),
      FinalCta(),
    ].join('\n'),
};
