import { LegalPage } from '../components/LegalPage.js';
import { Placeholder } from '../components/Placeholder.js';
import { disclaimers, site } from '../data/site.js';
import { esc } from '../utils/html.js';

export default {
  path: '/terminos-y-condiciones/',
  slug: 'legal',
  title: 'Términos y condiciones',
  crumb: 'Términos y condiciones',
  description: 'Términos y condiciones de uso del sitio de Halcones Xtreme México / HXM LATAM.',
  render: () =>
    LegalPage({
      title: 'Términos y condiciones',
      lead: 'Condiciones de uso de este sitio web.',
      body: `
<h2>1. Aceptación</h2>
<p>Al acceder y utilizar https://${esc(site.domain)} (el “Sitio”) aceptas estos términos y condiciones. Si no estás de acuerdo con ellos, te pedimos no utilizar el Sitio.</p>

<h2>2. Titular del sitio</h2>
<p>El Sitio es operado por ${esc(site.name)} / ${esc(site.brand)}. Razón social: ${site.legal.businessName ? esc(site.legal.businessName) : Placeholder('Razón social')}.</p>

<h2>3. Carácter informativo y proyecto en desarrollo</h2>
<p>${esc(disclaimers.project)} La información sobre instalaciones, programas, alianzas y etapas del proyecto puede cambiar conforme avance su desarrollo. Las imágenes identificadas como conceptuales son ilustraciones y no representan instalaciones construidas ni el diseño arquitectónico definitivo.</p>

<h2>4. Inversión y participación</h2>
<p>${esc(disclaimers.investment)}</p>
<p>Cualquier modalidad de participación en el proyecto estará sujeta a la estructura jurídica correspondiente, a la firma de los contratos aplicables, a la revisión de documentación y a los procesos de validación que se establezcan, conforme a la legislación mexicana. Recomendamos obtener asesoría legal y financiera independiente antes de tomar cualquier decisión.</p>

<h2>5. Programa deportivo y académico</h2>
<p>El envío de un formulario o de información de un jugador no implica admisión al programa ni genera obligación alguna para las partes. El acceso a oportunidades académicas está sujeto a los requisitos y procesos de cada institución educativa.</p>
<p>${esc(disclaimers.projection)} Ningún contenido del Sitio debe interpretarse como un compromiso de contratación, transferencia o participación en una liga o club determinado.</p>

<h2>6. Uso permitido</h2>
<p>Te comprometes a usar el Sitio de forma lícita. Queda prohibido, entre otros:</p>
<ul>
  <li>Enviar información falsa o datos de terceros sin su autorización, incluidos datos de menores de edad sin el consentimiento de su padre, madre o tutor.</li>
  <li>Enviar publicidad no solicitada, código malicioso o intentar afectar el funcionamiento del Sitio.</li>
  <li>Usar el contenido del Sitio para fines que puedan inducir a error sobre el proyecto.</li>
</ul>

<h2>7. Propiedad intelectual</h2>
<p>Los nombres ${esc(site.name)} y ${esc(site.brand)}, así como los textos, diseños, gráficos y demás contenidos del Sitio, están protegidos por la legislación aplicable. No se permite su reproducción con fines comerciales sin autorización previa y por escrito.</p>

<h2>8. Enlaces a terceros</h2>
<p>El Sitio contiene enlaces a servicios de terceros, como WhatsApp y Google Maps. Su uso se rige por los términos y políticas de privacidad de dichos terceros.</p>

<h2>9. Limitación de responsabilidad</h2>
<p>Procuramos que la información del Sitio sea precisa y esté actualizada, pero no garantizamos que esté libre de errores u omisiones. El uso de la información es responsabilidad de quien la consulta.</p>

<h2>10. Protección de datos personales</h2>
<p>El tratamiento de los datos personales se rige por el <a href="/aviso-de-privacidad/">Aviso de privacidad</a>.</p>

<h2>11. Modificaciones</h2>
<p>Podemos modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor a partir de su publicación en esta página.</p>

<h2>12. Legislación aplicable y jurisdicción</h2>
<p>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para su interpretación y cumplimiento, las partes se someten a los tribunales competentes de la ciudad de Aguascalientes, Aguascalientes, sin perjuicio de los derechos que la legislación aplicable reconozca a los usuarios.</p>`,
    }),
};
