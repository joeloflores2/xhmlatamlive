import { LegalPage } from '../components/LegalPage.js';
import { config } from '../config/index.js';
import { each, esc } from '../utils/html.js';

const tools = () => {
  const c = config();
  return [
    { name: 'Google Analytics', purpose: 'Medición de visitas y uso del sitio.', type: 'Analítica', active: Boolean(c.gaId) },
    { name: 'Google Tag Manager', purpose: 'Gestión de etiquetas de medición.', type: 'Analítica', active: Boolean(c.gtmId) },
    { name: 'Meta Pixel', purpose: 'Medición de campañas en plataformas de Meta.', type: 'Marketing', active: Boolean(c.metaPixelId) },
  ];
};

export default {
  path: '/politica-de-cookies/',
  slug: 'legal',
  title: 'Política de cookies',
  crumb: 'Política de cookies',
  description: 'Política de cookies de Halcones Xtreme México / HXM LATAM: qué tecnologías usa el sitio y cómo gestionar tu consentimiento.',
  render: () =>
    LegalPage({
      title: 'Política de cookies',
      lead: 'Qué tecnologías de almacenamiento y medición utiliza este sitio y cómo puedes gestionarlas.',
      body: `
<h2>1. ¿Qué son las cookies?</h2>
<p>Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar información sobre tu visita. Tecnologías similares, como el almacenamiento local del navegador, cumplen funciones parecidas.</p>

<h2>2. Tecnologías que utiliza este sitio</h2>
<p><strong>Funcionamiento:</strong> el sitio no necesita cookies para funcionar. Si se muestra el aviso de cookies, tu decisión se guarda en el almacenamiento local del navegador (clave <code>hxm-consent-v1</code>), sin datos personales.</p>
<p><strong>Analítica y marketing:</strong> solo se cargan si están configuradas y las aceptas expresamente.</p>
<div class="table-wrap">
<table>
  <caption class="sr-only">Herramientas de analítica y marketing</caption>
  <thead><tr><th scope="col">Herramienta</th><th scope="col">Tipo</th><th scope="col">Finalidad</th><th scope="col">Estado</th></tr></thead>
  <tbody>${each(
    tools(),
    (t) => `<tr><th scope="row">${esc(t.name)}</th><td>${esc(t.type)}</td><td>${esc(t.purpose)}</td><td>${t.active ? 'Activa, con consentimiento' : 'No utilizada actualmente'}</td></tr>`,
  )}</tbody>
</table>
</div>

<h2>3. Servicios de terceros</h2>
<p>El sitio carga tipografías desde Google Fonts, lo que implica que tu navegador se conecta a servidores de Google. Los enlaces a WhatsApp y Google Maps te llevan a servicios de terceros que aplican sus propias políticas.</p>

<h2>4. Cómo gestionar tu consentimiento</h2>
<p>Cuando la analítica está activa, puedes aceptarla o rechazarla desde el aviso de cookies y cambiar tu decisión en cualquier momento con el botón “Preferencias de cookies” del pie de página. También puedes eliminar o bloquear cookies desde la configuración de tu navegador.</p>

<h2>5. Más información</h2>
<p>El tratamiento de datos personales se describe en el <a href="/aviso-de-privacidad/">Aviso de privacidad</a>. Esta política puede actualizarse cuando cambien las herramientas utilizadas.</p>`,
    }),
};
