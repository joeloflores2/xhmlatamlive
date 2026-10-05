/**
 * Bloques de contenido compartidos entre la Home y las páginas internas.
 * Cada bloque recibe `tone` y `level` para adaptarse a su contexto.
 */

import { config } from '../config/index.js';
import { environment, facilities, masterplan } from '../data/campus.js';
import { countries, countriesNote } from '../data/countries.js';
import { institutions, institutionsIntro } from '../data/institutions.js';
import { currentStage, playerRoute, projectionPath, projectionText, projectStages } from '../data/journey.js';
import { education, familyBenefits, investment, trainingAreas, valueProposition } from '../data/programs.js';
import { disclaimers, microcopy, site } from '../data/site.js';
import { team } from '../data/team.js';
import { each, esc } from '../utils/html.js';
import { Button, ButtonGroup } from './Button.js';
import { FacilityList } from './CampusCard.js';
import { CardGrid } from './Card.js';
import { CtaBand } from './CTA.js';
import { Flow } from './Flow.js';
import { Icon } from './Icon.js';
import { ConceptFigure } from './Image.js';
import { Notice } from './Notice.js';
import { Placeholder } from './Placeholder.js';
import { ProjectionPath } from './ProjectionPath.js';
import { Section, SectionHeading } from './Section.js';
import { TeamList } from './TeamCard.js';
import { Timeline } from './Timeline.js';

export function ValueBlock({ tone = 'carbon' } = {}) {
  return Section({
    id: 'propuesta',
    tone,
    labelledby: 'propuesta-title',
    content: `${SectionHeading({
      id: 'propuesta-title',
      title: 'Fútbol, estudio y vida en un mismo campus',
      lead: 'La propuesta integra cuatro dimensiones que normalmente están separadas en la carrera de un jugador joven.',
    })}${CardGrid(valueProposition, { variant: 'columns' })}`,
  });
}

export function CampusPreview({ tone = 'black' } = {}) {
  return Section({
    id: 'campus',
    tone,
    labelledby: 'campus-title',
    className: 'campus-preview',
    content: `<div class="split split--media">
      <div class="split__media">${ConceptFigure({ src: masterplan.image, alt: masterplan.alt, width: 1600, height: 1000, caption: masterplan.note })}</div>
      <div class="split__body">
        ${SectionHeading({
          id: 'campus-title',
          title: 'Nuestro campus',
          lead: `${site.campus.name}, Aguascalientes. Infraestructura pensada para entrenar, estudiar, descansar y recuperarse en un solo lugar.`,
        })}
        ${FacilityList(facilities)}
        ${ButtonGroup([
          Button({ href: '/campus/', label: 'Ver el campus', variant: 'primary' }),
          Button({ href: config().mapUrl, label: 'Ver ubicación', variant: 'ghost', icon: 'pin', external: true }),
        ])}
      </div>
    </div>`,
  });
}

export function TrainingBlock({ tone = 'carbon', withButton = true, title = 'Entrenar para competir' } = {}) {
  return Section({
    id: 'formacion-deportiva',
    tone,
    labelledby: 'formacion-deportiva-title',
    content: `${SectionHeading({
      id: 'formacion-deportiva-title',
      title,
      lead: 'Un método que trabaja al jugador completo: lo que hace con el balón, cómo entiende el juego, cómo se prepara y cómo compite.',
    })}${CardGrid(trainingAreas, { variant: 'grid' })}${
      withButton ? ButtonGroup([Button({ href: '/formacion/', label: 'Conoce la formación', variant: 'secondary' })]) : ''
    }`,
  });
}

export function EducationBlock({ tone = 'deep', withButton = true } = {}) {
  return Section({
    id: 'educacion',
    tone,
    labelledby: 'educacion-title',
    className: 'education',
    content: `<div class="split">
      <div class="split__body">
        ${SectionHeading({ id: 'educacion-title', title: education.title })}
        <p class="pull">${esc(education.message)}</p>
        <p class="prose">${esc(education.intro)}</p>
        <h3 class="h4">Instituciones educativas</h3>
        <ul class="institution-pair">${each(
          education.institutions,
          (i) => `<li><span class="institution-pair__name">${esc(i.name)}</span><span class="institution-pair__city">${esc(i.city)}</span></li>`,
        )}</ul>
        <h3 class="h4">La propuesta contempla</h3>
        <ul class="checklist">${each(education.includes, (i) => `<li>${Icon('check', { size: 18 })}<span>${esc(i)}</span></li>`)}</ul>
        <p class="fine">${esc(disclaimers.education)}</p>
        ${withButton ? ButtonGroup([Button({ href: '/formacion/', label: 'Formación académica', variant: 'secondary' })]) : ''}
      </div>
      <div class="split__aside">
        <p class="flow__label">${esc(microcopy.educationForLife)}</p>
        ${Flow(education.flow, { label: 'Modelo de formación integral' })}
      </div>
    </div>`,
  });
}

export function RouteBlock({ tone = 'black', withButton = true, id = 'ruta' } = {}) {
  return Section({
    id,
    tone,
    labelledby: `${id}-title`,
    content: `${SectionHeading({
      id: `${id}-title`,
      title: 'La ruta del jugador',
      lead: 'Siete etapas, desde el primer contacto con el club hasta la proyección hacia el fútbol profesional.',
    })}${Timeline({ steps: playerRoute, label: 'Ruta del jugador en siete etapas', variant: 'route' })}${
      withButton ? ButtonGroup([Button({ href: '/jugadores/', label: 'Conoce el programa para jugadores', variant: 'primary', track: 'player_interest' })]) : ''
    }`,
  });
}

export function CountriesBlock({ level = 3, id = '', size = 'h3' } = {}) {
  return `<div class="borders">
    <h${level}${id ? ` id="${id}"` : ''} class="${size}">Talento sin fronteras</h${level}>
    <p class="borders__lead">${esc(microcopy.noBorders)} La captación contempla jugadores de México, Latinoamérica y otros mercados.</p>
    <ul class="countries">${each(countries, (c) => `<li>${esc(c)}</li>`)}</ul>
    <p class="fine">${esc(countriesNote)} La captación no se limita a esta lista.</p>
  </div>`;
}

export function ProjectionBlock({ tone = 'carbon', withCountries = true, withButton = true } = {}) {
  return Section({
    id: 'proyeccion',
    tone,
    labelledby: 'proyeccion-title',
    content: `${SectionHeading({ id: 'proyeccion-title', title: 'Del campus al mundo', lead: projectionText })}
    ${ProjectionPath(projectionPath)}
    <p class="fine ladder__note">${esc(disclaimers.projection)}</p>
    ${withCountries ? CountriesBlock() : ''}
    ${withButton ? ButtonGroup([Button({ href: '/proyeccion-internacional/', label: 'Proyección internacional', variant: 'secondary' })]) : ''}`,
  });
}

export function InvestmentTeaser({ tone = 'deep' } = {}) {
  return Section({
    id: 'inversion',
    tone,
    labelledby: 'inversion-title',
    className: 'invest-teaser',
    content: `<div class="split">
      <div class="split__body">
        ${SectionHeading({ id: 'inversion-title', title: investment.title, lead: investment.subtitle })}
        <p class="prose">El proyecto busca integrar participantes de ${esc(investment.audiences.join(' y '))}. Compartimos información para potenciales socios dentro de un proceso formal, transparente y documentado.</p>
        ${ButtonGroup([
          Button({ href: '/inversion/', label: 'Quiero conocer el proyecto', variant: 'primary', track: 'investment_interest' }),
          Button({ href: '/inversion/#solicitar-informacion', label: 'Solicitar información', variant: 'ghost', track: 'investment_interest' }),
        ])}
      </div>
      <div class="split__aside">
        <h3 class="h4">La participación está sujeta a</h3>
        <ul class="checklist checklist--plain">${each(investment.conditions, (c) => `<li>${Icon('check', { size: 18 })}<span>${esc(c.title)}</span></li>`)}</ul>
        ${Notice({ text: disclaimers.investment, tone: 'legal' })}
      </div>
    </div>`,
  });
}

export function FamiliesBlock({ tone = 'black', withButton = true } = {}) {
  return Section({
    id: 'familias',
    tone,
    labelledby: 'familias-title',
    content: `${SectionHeading({
      id: 'familias-title',
      title: 'El futuro de tu hijo merece más',
      lead: 'Para las familias, la pregunta no es solo si su hijo va a jugar mejor, sino si va a crecer en un entorno serio, con estudio, disciplina y acompañamiento.',
    })}${CardGrid(familyBenefits, { variant: 'checklist' })}${
      withButton ? ButtonGroup([Button({ href: '/jugadores/', label: 'Conoce el programa para jugadores', variant: 'primary', track: 'player_interest' })]) : ''
    }`,
  });
}

export function TeamBlock({ tone = 'carbon', compact = true, withButton = true } = {}) {
  return Section({
    id: 'equipo',
    tone,
    labelledby: 'equipo-title',
    content: `${SectionHeading({
      id: 'equipo-title',
      title: 'Nuestro equipo',
      lead: 'Un equipo multidisciplinario para acompañar al jugador en lo deportivo, lo físico, lo académico y lo humano. Los perfiles se publicarán conforme se confirmen.',
    })}${TeamList(team, { compact })}${
      withButton ? ButtonGroup([Button({ href: '/el-club/#equipo', label: 'Conoce el club', variant: 'secondary' })]) : ''
    }`,
  });
}

export function InstitutionsBlock({ tone = 'black' } = {}) {
  return Section({
    id: 'respaldo',
    tone,
    labelledby: 'respaldo-title',
    content: `${SectionHeading({ id: 'respaldo-title', title: 'Un proyecto con respaldo institucional', lead: institutionsIntro })}
    <ul class="institutions">${each(
      institutions,
      (i) => `<li class="institution">
        <h3 class="institution__name">${esc(i.name)}</h3>
        <p class="institution__doc">${Icon('document', { size: 18 })}<span>${
          i.document
            ? i.documentUrl
              ? `<a href="${esc(i.documentUrl)}">${esc(i.document)}</a>`
              : esc(i.document)
            : `Documento oficial: ${Placeholder('Tipo, número y fecha del permiso o autorización')}`
        }</span></p>
      </li>`,
    )}</ul>
    <p class="fine">Los documentos oficiales se incorporarán a esta sección conforme se autorice su publicación. No se muestran logotipos institucionales sin autorización expresa.</p>`,
  });
}

export function ProjectStatusBlock({ tone = 'carbon' } = {}) {
  return Section({
    id: 'proyecto-en-desarrollo',
    tone,
    labelledby: 'estado-title',
    content: `${SectionHeading({
      id: 'estado-title',
      title: 'Proyecto en desarrollo',
      lead: `${disclaimers.project} Publicamos con claridad en qué etapa estamos y hacia dónde vamos.`,
    })}${Timeline({ steps: projectStages, label: 'Etapas del proyecto', variant: 'stages', current: currentStage })}${
      currentStage ? '' : `<p class="fine">Etapa actual: ${Placeholder('Confirmar la etapa vigente del proyecto')}</p>`
    }`,
  });
}

export function EnvironmentBlock({ tone = 'carbon' } = {}) {
  return Section({
    id: 'entorno',
    tone,
    labelledby: 'entorno-title',
    content: `${SectionHeading({ id: 'entorno-title', title: environment.title, lead: environment.statement })}${CardGrid(environment.points, {
      variant: 'columns',
      className: 'cards--five',
    })}`,
  });
}

export function FinalCta() {
  return CtaBand({
    title: 'Tu talento puede llegar más lejos',
    text: 'Conoce Halcones Xtreme México y descubre un proyecto que combina fútbol, educación, alto rendimiento y proyección internacional.',
    actions: [
      Button({ href: '/quienes-somos/', label: 'Conoce el proyecto', variant: 'accent' }),
      Button({ href: '/contacto/', label: 'Contacta al club', variant: 'ghost' }),
    ],
  });
}
