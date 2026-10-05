import {
  CampusPreview,
  EducationBlock,
  FamiliesBlock,
  FinalCta,
  InstitutionsBlock,
  InvestmentTeaser,
  ProjectionBlock,
  ProjectStatusBlock,
  RouteBlock,
  TeamBlock,
  TrainingBlock,
  ValueBlock,
} from '../components/Blocks.js';
import { Hero } from '../components/Hero.js';
import { Section } from '../components/Section.js';
import { Stats } from '../components/Stats.js';
import { Testimonials } from '../components/Testimonials.js';
import { microcopy, stats } from '../data/site.js';
import { testimonials } from '../data/testimonials.js';
import { esc } from '../utils/html.js';

function Intro() {
  return Section({
    id: 'introduccion',
    tone: 'black',
    className: 'intro',
    labelledby: 'intro-title',
    content: `<div class="intro__grid">
      <h2 id="intro-title" class="intro__statement">${esc(microcopy.peopleFirst)}</h2>
      <div class="intro__body">
        <p class="lead">Halcones Xtreme México nace con la visión de construir una plataforma deportiva capaz de identificar, formar y desarrollar talento futbolístico de México, Latinoamérica y otros mercados internacionales.</p>
        <p class="prose">Un centro de formación en Aguascalientes que integra entrenamiento de alto rendimiento, educación, alojamiento y una ruta clara hacia el fútbol profesional.</p>
        <p class="status-line"><span class="status-line__dot" aria-hidden="true"></span>Proyecto en desarrollo. <a href="#proyecto-en-desarrollo">Conoce sus etapas</a></p>
      </div>
    </div>`,
  });
}

function StatsBand() {
  return Section({
    id: 'cifras',
    tone: 'black',
    className: 'stats-band',
    labelledby: 'cifras-title',
    content: `<h2 id="cifras-title" class="sr-only">El proyecto en cifras</h2>${Stats(stats)}`,
  });
}

export default {
  path: '/',
  slug: 'inicio',
  title: '',
  crumb: 'Inicio',
  description: '',
  preload: '<link rel="preload" as="image" href="/images/hero/estadio-conceptual.svg" fetchpriority="high">',
  render: () =>
    [
      Hero(),
      Intro(),
      StatsBand(),
      ValueBlock({ tone: 'carbon' }),
      CampusPreview({ tone: 'black' }),
      TrainingBlock({ tone: 'carbon' }),
      EducationBlock({ tone: 'deep' }),
      RouteBlock({ tone: 'black' }),
      ProjectionBlock({ tone: 'carbon' }),
      InvestmentTeaser({ tone: 'deep' }),
      FamiliesBlock({ tone: 'black' }),
      TeamBlock({ tone: 'carbon' }),
      Testimonials(testimonials, { tone: 'black' }),
      InstitutionsBlock({ tone: 'black' }),
      ProjectStatusBlock({ tone: 'carbon' }),
      FinalCta(),
    ].join('\n'),
};
