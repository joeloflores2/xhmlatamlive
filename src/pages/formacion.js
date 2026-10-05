import { EducationBlock, FamiliesBlock, FinalCta, TrainingBlock } from '../components/Blocks.js';
import { CardGrid } from '../components/Card.js';
import { PageHero } from '../components/PageHero.js';
import { Section, SectionHeading } from '../components/Section.js';

const residence = [
  { title: 'Residencia en el campus', text: '80 dormitorios diseñados para jugadores y estudiantes, a pasos de las canchas.' },
  { title: 'Traslado a la universidad', text: 'La propuesta contempla el traslado de los jugadores a las instituciones educativas.' },
  { title: 'Rutina estructurada', text: 'Horarios de entrenamiento, estudio, alimentación y descanso que forman hábitos profesionales.' },
  { title: 'Acompañamiento', text: 'Seguimiento deportivo, académico y personal, con comunicación con las familias.' },
];

export default {
  path: '/formacion/',
  slug: 'formacion',
  title: 'Formación deportiva y académica',
  crumb: 'Formación',
  description:
    'Formación deportiva, educación y desarrollo humano en Halcones Xtreme México: entrenamiento de alto rendimiento, acceso a oportunidades académicas en Aguascalientes, alojamiento y traslado.',
  render: () =>
    [
      PageHero({
        title: 'Formación',
        lead: 'Deportiva, académica y humana: tres frentes de un mismo proceso. Educación para la vida. Fútbol para el futuro.',
      }),
      TrainingBlock({ tone: 'black', withButton: false, title: 'Formación deportiva' }),
      EducationBlock({ tone: 'deep', withButton: false }),
      Section({
        id: 'residencia',
        tone: 'carbon',
        labelledby: 'residencia-title',
        content: `${SectionHeading({
          id: 'residencia-title',
          title: 'Alojamiento y acompañamiento',
          lead: 'Vivir en el campus permite concentrarse en lo importante y convivir con compañeros que persiguen el mismo objetivo.',
        })}${CardGrid(residence, { variant: 'columns' })}`,
      }),
      FamiliesBlock({ tone: 'black' }),
      FinalCta(),
    ].join('\n'),
};
