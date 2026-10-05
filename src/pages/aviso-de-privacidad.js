import { LegalPage } from '../components/LegalPage.js';
import { Placeholder } from '../components/Placeholder.js';
import { site } from '../data/site.js';
import { esc } from '../utils/html.js';
import { addressLine } from '../utils/links.js';

const privacyContact = () =>
  site.legal.privacyEmail ? `<a href="mailto:${esc(site.legal.privacyEmail)}">${esc(site.legal.privacyEmail)}</a>` : Placeholder('Correo para solicitudes de privacidad');

export default {
  path: '/aviso-de-privacidad/',
  slug: 'legal',
  title: 'Aviso de privacidad',
  crumb: 'Aviso de privacidad',
  description: 'Aviso de privacidad integral de Halcones Xtreme México / HXM LATAM conforme a la legislación mexicana en materia de protección de datos personales.',
  render: () =>
    LegalPage({
      title: 'Aviso de privacidad',
      lead: 'Cómo tratamos los datos personales que nos compartes a través de este sitio.',
      body: `
<h2>1. Identidad y domicilio del responsable</h2>
<p>${esc(site.name)} / ${esc(site.brand)} (en adelante, “el Responsable”), con domicilio en ${esc(addressLine())}, es responsable del tratamiento de los datos personales que se recaban a través del sitio https://${esc(site.domain)}, en términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares vigente y demás normativa aplicable.</p>
<p>Razón social: ${site.legal.businessName ? esc(site.legal.businessName) : Placeholder('Razón social')}. RFC: ${site.legal.rfc ? esc(site.legal.rfc) : Placeholder('RFC')}.</p>
<p>Contacto para temas de privacidad: ${privacyContact()}. Teléfono: ${esc(site.contact.phoneDisplay)}.</p>

<h2>2. Datos personales que recabamos</h2>
<p>A través de los formularios del sitio podemos recabar los siguientes datos:</p>
<ul>
  <li><strong>Formulario de contacto e inversión:</strong> nombre, apellido, país, ciudad, teléfono, WhatsApp, correo electrónico, tipo de interés y el contenido del mensaje.</li>
  <li><strong>Formulario de jugadores:</strong> nombre y apellido del jugador, fecha de nacimiento, país, ciudad, posición, pierna dominante, altura aproximada, nombre y teléfono del padre, madre o tutor, correo electrónico de contacto, enlace a video de juego y el contenido del mensaje.</li>
  <li><strong>Datos de navegación:</strong> solo si aceptas las cookies de analítica, información técnica sobre el uso del sitio (páginas visitadas, dispositivo, navegador y ubicación aproximada).</li>
</ul>
<p>No solicitamos datos personales sensibles a través de este sitio, como información de salud, origen étnico, creencias, preferencias o datos biométricos. Te pedimos no incluirlos en tus mensajes.</p>

<h2>3. Datos de niñas, niños y adolescentes</h2>
<p>Cuando el jugador sea menor de 18 años, sus datos deberán ser proporcionados por su padre, madre o tutor, quien otorga el consentimiento para su tratamiento. Los datos de menores se tratan exclusivamente para las finalidades primarias descritas en este aviso y con medidas reforzadas de confidencialidad. Si detectamos que se enviaron datos de un menor sin la autorización correspondiente, serán eliminados.</p>

<h2>4. Finalidades del tratamiento</h2>
<p><strong>Finalidades primarias</strong>, necesarias para atender tu solicitud:</p>
<ul>
  <li>Responder solicitudes de información sobre el proyecto, el programa deportivo, la membresía o las opciones de participación.</li>
  <li>Revisar el perfil deportivo del jugador y, en su caso, contactar a su familia para dar seguimiento al proceso de evaluación.</li>
  <li>Compartir información del proyecto con potenciales socios que la hayan solicitado.</li>
  <li>Cumplir obligaciones legales aplicables.</li>
</ul>
<p><strong>Finalidades secundarias</strong>, que no son necesarias para atender tu solicitud:</p>
<ul>
  <li>Enviar información sobre novedades, eventos y convocatorias del proyecto.</li>
  <li>Elaborar estadísticas internas para mejorar el sitio y nuestros procesos de atención.</li>
</ul>
<p>Si no deseas que tus datos se traten para finalidades secundarias, puedes indicarlo en cualquier momento a través del medio señalado en la sección de derechos ARCO. Tu negativa no será motivo para dejar de atender tu solicitud.</p>

<h2>5. Transferencias y encargados</h2>
<p>No transferimos tus datos personales a terceros sin tu consentimiento, salvo en los casos previstos por la ley. Podemos apoyarnos en proveedores de servicios tecnológicos (alojamiento del sitio, recepción de formularios, mensajería y, con tu consentimiento, analítica) que tratan los datos por cuenta del Responsable y bajo obligaciones de confidencialidad.</p>
<p>Si un jugador inicia un proceso con alguna institución educativa relacionada con el proyecto, cualquier envío de sus datos a dicha institución se realizará únicamente con el consentimiento previo y expreso de su padre, madre o tutor, o del propio jugador si es mayor de edad.</p>

<h2>6. Derechos ARCO</h2>
<p>Tienes derecho a acceder a tus datos personales, rectificarlos, cancelarlos u oponerte a su tratamiento (derechos ARCO). Para ejercerlos, envía una solicitud a ${privacyContact()} que incluya:</p>
<ul>
  <li>Nombre del titular y medio para comunicarle la respuesta.</li>
  <li>Documento que acredite la identidad del titular o, en su caso, la representación legal (por ejemplo, del padre, madre o tutor).</li>
  <li>Descripción clara de los datos y del derecho que deseas ejercer.</li>
  <li>Cualquier elemento que facilite la localización de los datos.</li>
</ul>
<p>Daremos respuesta dentro de los plazos establecidos por la legislación aplicable.</p>

<h2>7. Revocación del consentimiento y limitación del uso</h2>
<p>Puedes revocar el consentimiento otorgado o solicitar que limitemos el uso o divulgación de tus datos mediante el mismo procedimiento descrito para los derechos ARCO. La revocación no tendrá efectos retroactivos.</p>

<h2>8. Cookies y tecnologías de rastreo</h2>
<p>Este sitio solo utiliza herramientas de analítica cuando están habilitadas y aceptas su uso. Consulta los detalles en la <a href="/politica-de-cookies/">Política de cookies</a>.</p>

<h2>9. Seguridad y conservación</h2>
<p>Aplicamos medidas de seguridad administrativas, técnicas y físicas razonables para proteger tus datos contra daño, pérdida, alteración, destrucción o uso no autorizado. Conservamos los datos solo durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables.</p>

<h2>10. Cambios a este aviso</h2>
<p>Este aviso puede modificarse para atender cambios legales, de nuestros procesos o del propio sitio. Las modificaciones se publicarán en esta página, indicando la fecha de la última actualización.</p>

<h2>11. Autoridad</h2>
<p>Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la autoridad competente en materia de protección de datos personales en México.</p>`,
    }),
};
