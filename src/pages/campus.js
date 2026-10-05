import { EnvironmentBlock, FinalCta } from '../components/Blocks.js';
import { Button, ButtonGroup } from '../components/Button.js';
import { CampusGrid } from '../components/CampusCard.js';
import { Gallery } from '../components/Gallery.js';
import { ConceptFigure } from '../components/Image.js';
import { LocationCard } from '../components/LocationCard.js';
import { Modal } from '../components/Modal.js';
import { PageHero } from '../components/PageHero.js';
import { Section, SectionHeading } from '../components/Section.js';
import { Stats } from '../components/Stats.js';
import { config } from '../config/index.js';
import { facilities, gallery, masterplan } from '../data/campus.js';
import { site, stats } from '../data/site.js';
import { officeMapUrl } from '../utils/links.js';

export default {
  path: '/campus/',
  slug: 'campus',
  title: 'Nuestro campus',
  crumb: 'Campus',
  description:
    'Campus Halcones Xtreme México en Ciudad Maderas, Aguascalientes: 80 dormitorios, 2 canchas de pasto sintético, 1 cancha de pasto natural, gimnasio, alberca y 2 tinas de hidromasaje. Proyecto en desarrollo.',
  render: () => {
    const c = config();
    const a = site.address;
    return [
      PageHero({
        title: 'Nuestro campus',
        crumb: 'Campus',
        lead: `${site.campus.name}, Aguascalientes. Un campus pensado para que el jugador entrene, estudie, descanse y se recupere en el mismo lugar.`,
        extra: ButtonGroup([Button({ href: c.mapUrl, label: 'Ver ubicación', variant: 'secondary', icon: 'pin', external: true })]),
      }),
      Section({
        id: 'plan',
        tone: 'black',
        labelledby: 'plan-title',
        content: `${SectionHeading({
          id: 'plan-title',
          title: 'Un campus para el alto rendimiento',
          lead: 'El proyecto contempla residencia, tres canchas profesionales y espacios de preparación física y recuperación. Las imágenes de esta página son ilustraciones conceptuales: se sustituirán por renders oficiales y fotografías conforme avance la obra.',
        })}
        ${ConceptFigure({ src: masterplan.image, alt: masterplan.alt, width: 1600, height: 1000, caption: masterplan.note, className: 'figure--wide' })}
        ${Stats(stats.slice(0, 3), { label: 'Campus en cifras' })}`,
      }),
      Section({
        id: 'instalaciones',
        tone: 'carbon',
        labelledby: 'instalaciones-title',
        content: `${SectionHeading({ id: 'instalaciones-title', title: 'Instalaciones' })}${CampusGrid(facilities)}`,
      }),
      gallery.length
        ? Section({
            id: 'galeria',
            tone: 'black',
            labelledby: 'galeria-title',
            content: `${SectionHeading({ id: 'galeria-title', title: 'Galería' })}${Gallery(gallery)}`,
          })
        : '',
      EnvironmentBlock({ tone: 'black' }),
      Section({
        id: 'ubicacion',
        tone: 'carbon',
        labelledby: 'ubicacion-title',
        content: `${SectionHeading({ id: 'ubicacion-title', title: 'Ubicación' })}
        <div class="locations">
          ${LocationCard({ title: 'Campus', lines: [site.campus.name, `${site.campus.city}, ${a.state}`, a.country], mapUrl: c.mapUrl, note: 'Proyecto en desarrollo. Las visitas se coordinan previamente con el club.' })}
          ${LocationCard({ title: 'Oficina de contacto', lines: [a.organization, `${a.street}, ${a.neighborhood}`, `${a.city}, ${a.state}, C.P. ${a.postalCode}`, a.country], mapUrl: officeMapUrl(), buttonLabel: 'Cómo llegar a la oficina' })}
        </div>`,
      }),
      FinalCta(),
      Modal({ id: 'visor', label: 'Imagen ampliada' }),
    ].join('\n');
  },
};
