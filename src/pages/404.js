import { Button, ButtonGroup } from '../components/Button.js';
import { PageHero } from '../components/PageHero.js';

export default {
  path: '/404.html',
  output: '404.html',
  slug: 'error',
  title: 'Página no encontrada',
  crumb: 'Página no encontrada',
  noindex: true,
  sitemap: false,
  description: 'La página que buscas no existe o cambió de dirección.',
  render: () =>
    PageHero({
      title: 'Página no encontrada',
      lead: 'La dirección que buscas no existe o cambió. Vuelve al inicio o escríbenos si necesitas información.',
      extra: ButtonGroup([
        Button({ href: '/', label: 'Ir al inicio', variant: 'primary' }),
        Button({ href: '/contacto/', label: 'Contactar al club', variant: 'ghost' }),
      ]),
    }),
};
