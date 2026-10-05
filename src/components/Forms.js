import { config } from '../config/index.js';
import { dominantFoot, investment, playerPositions } from '../data/programs.js';
import { attrs, cx, each, esc } from '../utils/html.js';
import { whatsappUrl } from '../utils/links.js';

/**
 * Formularios sin backend propio. El envío se hace por fetch (JSON) al endpoint
 * configurado en PUBLIC_*_ENDPOINT (compatible con Formspree y APIs propias).
 * Validación en cliente + honeypot + tiempo mínimo de llenado (anti-spam).
 * La validación definitiva SIEMPRE debe repetirse en el servidor receptor.
 */

const PHONE_PATTERN = '[0-9+()\\-\\s]{7,20}';

function describedBy(id, hint) {
  return [hint ? `${id}-hint` : '', `${id}-error`].filter(Boolean).join(' ');
}

function Label(id, label, required) {
  return `<label class="field__label" for="${id}">${esc(label)}${required ? '<span class="req" aria-hidden="true"> *</span>' : ''}</label>`;
}

function Hint(id, hint) {
  return hint ? `<p class="field__hint" id="${id}-hint">${esc(hint)}</p>` : '';
}

const ErrorSlot = (id) => `<p class="field__error" id="${id}-error" hidden></p>`;

/** Campo genérico: text, email, tel, url, date, number, textarea, select. */
export function Field({ form, name, label, type = 'text', required = false, hint, full = false, options, value, conditional, ...rest }) {
  const id = `${form}-${name}`;
  const common = {
    id,
    name,
    required,
    'aria-describedby': describedBy(id, hint),
    ...rest,
  };
  let control;
  if (type === 'textarea') {
    control = `<textarea${attrs({ rows: 5, ...common })}></textarea>`;
  } else if (type === 'select') {
    control = `<select${attrs(common)}><option value="">Selecciona una opción</option>${each(
      options,
      (o) => `<option${attrs({ value: o, selected: o === value })}>${esc(o)}</option>`,
    )}</select>`;
  } else {
    control = `<input${attrs({ type, ...common })}>`;
  }
  return `<div class="${cx('field', full && 'field--full')}"${conditional ? ` data-conditional="${esc(conditional)}"` : ''}>${Label(id, label, required)}${Hint(id, hint)}${control}${ErrorSlot(id)}</div>`;
}

/** Casilla de verificación (consentimiento). `labelHtml` es contenido confiable del propio sitio. */
export function Checkbox({ form, name, labelHtml, required = true, conditional }) {
  const id = `${form}-${name}`;
  return `<div class="field field--full field--check"${conditional ? ` data-conditional="${esc(conditional)}"` : ''}>
    <input${attrs({ type: 'checkbox', id, name, value: 'si', required, 'aria-describedby': `${id}-error` })}>
    <label for="${id}">${labelHtml}${required ? '<span class="req" aria-hidden="true"> *</span>' : ''}</label>
    ${ErrorSlot(id)}
  </div>`;
}

const PRIVACY_CONSENT =
  'Autorizo el tratamiento de mis datos personales conforme al <a href="/aviso-de-privacidad/">Aviso de Privacidad</a>.';

/** Envoltura común: honeypot, estado accesible, mensaje sin JS. */
function FormShell({ id, formName, endpoint, event, title, intro = '', fields, submitLabel }) {
  return `<form${attrs({
    id,
    class: 'form',
    method: 'post',
    action: endpoint || undefined,
    novalidate: true,
    'data-form': formName,
    'data-event': event,
    'data-endpoint': endpoint || '',
    'aria-labelledby': `${id}-title`,
  })}>
  <h2 id="${id}-title" class="form__title">${esc(title)}</h2>
  ${intro}
  <input type="hidden" name="formulario" value="${esc(formName)}">
  <div class="hp" aria-hidden="true">
    <label for="${id}-website">Deja este campo vacío</label>
    <input type="text" id="${id}-website" name="_gotcha" tabindex="-1" autocomplete="off">
  </div>
  <div class="form__grid">${fields}</div>
  <div class="form__footer">
    <button type="submit" class="btn btn--primary"><span>${esc(submitLabel)}</span></button>
    <p class="form__required">Los campos con <span aria-hidden="true">*</span><span class="sr-only">asterisco</span> son obligatorios.</p>
  </div>
  <div class="form__status" role="status" aria-live="polite" tabindex="-1" data-form-status hidden></div>
  ${
    endpoint
      ? ''
      : `<noscript><p class="form__noscript">Para enviar este formulario activa JavaScript o escríbenos por <a href="${esc(whatsappUrl())}">WhatsApp</a>.</p></noscript>`
  }
</form>`;
}

/**
 * Formulario de interés (contacto e inversión). Mismos campos, distinto origen.
 */
export function InterestForm({ id = 'form-contacto', formName = 'contacto', event = 'contact_submit', defaultInterest = '', title = 'Envíanos tus datos', endpointKey = 'contact', submitLabel = 'Enviar solicitud' } = {}) {
  const f = id;
  const fields = [
    Field({ form: f, name: 'nombre', label: 'Nombre', required: true, autocomplete: 'given-name', maxlength: 80 }),
    Field({ form: f, name: 'apellido', label: 'Apellido', required: true, autocomplete: 'family-name', maxlength: 80 }),
    Field({ form: f, name: 'pais', label: 'País', required: true, autocomplete: 'country-name', maxlength: 60 }),
    Field({ form: f, name: 'ciudad', label: 'Ciudad', autocomplete: 'address-level2', maxlength: 80 }),
    Field({ form: f, name: 'telefono', label: 'Teléfono', type: 'tel', required: true, autocomplete: 'tel', inputmode: 'tel', pattern: PHONE_PATTERN, maxlength: 20, hint: 'Incluye la clave de país, por ejemplo +52.' }),
    Field({ form: f, name: 'whatsapp', label: 'WhatsApp', type: 'tel', inputmode: 'tel', pattern: PHONE_PATTERN, maxlength: 20, hint: 'Solo si es distinto al teléfono.' }),
    Field({ form: f, name: 'email', label: 'Correo electrónico', type: 'email', required: true, autocomplete: 'email', maxlength: 120 }),
    Field({ form: f, name: 'tipo_interes', label: 'Tipo de interés', type: 'select', required: true, options: investment.interestTypes, value: defaultInterest }),
    Field({ form: f, name: 'mensaje', label: 'Mensaje', type: 'textarea', full: true, maxlength: 2000, hint: 'Cuéntanos qué te interesa conocer del proyecto.' }),
    Checkbox({ form: f, name: 'consentimiento', labelHtml: PRIVACY_CONSENT }),
  ].join('');
  return FormShell({
    id,
    formName,
    endpoint: config().endpoints[endpointKey],
    event,
    title,
    fields,
    submitLabel,
  });
}

/**
 * Formulario de jugadores. Puede recibir datos de menores de edad:
 * - No se solicitan datos sensibles (salud, identificaciones, fotografías).
 * - Si el jugador es menor de 18 años, se exige nombre y confirmación del padre, madre o tutor.
 */
export function PlayerForm({ id = 'form-jugador' } = {}) {
  const f = id;
  const today = config().buildDate;
  const intro = `<div class="form__intro">
    <p>Los datos serán tratados conforme al <a href="/aviso-de-privacidad/">Aviso de Privacidad</a>.</p>
    <p>Si el jugador es menor de edad, este formulario debe llenarlo su padre, madre o tutor. No solicitamos información médica, documentos de identidad ni fotografías.</p>
  </div>`;
  const fields = [
    Field({ form: f, name: 'nombre', label: 'Nombre del jugador', required: true, autocomplete: 'off', maxlength: 80 }),
    Field({ form: f, name: 'apellido', label: 'Apellido del jugador', required: true, autocomplete: 'off', maxlength: 80 }),
    Field({ form: f, name: 'fecha_nacimiento', label: 'Fecha de nacimiento', type: 'date', required: true, max: today, min: '1960-01-01' }),
    Field({ form: f, name: 'pais', label: 'País', required: true, autocomplete: 'country-name', maxlength: 60 }),
    Field({ form: f, name: 'ciudad', label: 'Ciudad', required: true, autocomplete: 'address-level2', maxlength: 80 }),
    Field({ form: f, name: 'posicion', label: 'Posición', type: 'select', required: true, options: playerPositions }),
    Field({ form: f, name: 'pierna', label: 'Pierna dominante', type: 'select', required: true, options: dominantFoot }),
    Field({ form: f, name: 'altura', label: 'Altura (cm)', type: 'number', min: 120, max: 230, step: 1, inputmode: 'numeric', hint: 'Aproximada, en centímetros.' }),
    Field({ form: f, name: 'nombre_tutor', label: 'Nombre del padre, madre o tutor', autocomplete: 'name', maxlength: 120, hint: 'Obligatorio si el jugador es menor de 18 años.', conditional: 'minor' }),
    Field({ form: f, name: 'telefono_tutor', label: 'Teléfono del padre, madre o tutor', type: 'tel', required: true, autocomplete: 'tel', inputmode: 'tel', pattern: PHONE_PATTERN, maxlength: 20, hint: 'Si el jugador es mayor de edad, puede ser su propio teléfono.' }),
    Field({ form: f, name: 'email', label: 'Correo electrónico de contacto', type: 'email', required: true, autocomplete: 'email', maxlength: 120, hint: 'Si el jugador es menor de edad, usa el correo del padre, madre o tutor.' }),
    Field({ form: f, name: 'video_url', label: 'Video o enlace de highlights', type: 'url', inputmode: 'url', maxlength: 300, hint: 'Enlace público (YouTube, Google Drive u otra plataforma).' }),
    Field({ form: f, name: 'mensaje', label: 'Mensaje', type: 'textarea', full: true, maxlength: 2000, hint: 'Clubes o equipos anteriores, logros deportivos y cualquier dato que quieras compartir.' }),
    Checkbox({
      form: f,
      name: 'confirmacion_tutor',
      required: false,
      conditional: 'minor',
      labelHtml: 'Si el jugador es menor de edad: confirmo que soy su padre, madre o tutor legal y autorizo el envío de sus datos.',
    }),
    Checkbox({ form: f, name: 'consentimiento', labelHtml: PRIVACY_CONSENT }),
  ].join('');
  return FormShell({
    id,
    formName: 'jugador',
    endpoint: config().endpoints.player,
    event: 'player_interest',
    title: 'Registra el perfil del jugador',
    intro,
    fields,
    submitLabel: 'Enviar perfil',
  });
}
