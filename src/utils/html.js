/** Utilidades para generar HTML seguro desde los componentes. */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa texto para insertarlo en HTML o en atributos. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Une clases CSS ignorando valores vacíos. */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/** Serializa atributos: omite null/undefined/false; `true` genera atributo booleano. */
export const attrs = (obj = {}) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== false && v !== '')
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');

/** Mapea una lista a HTML. */
export const each = (list = [], fn) => list.map(fn).join('');

/** Número con dos dígitos para secuencias (01, 02…). */
export const pad = (n) => String(n).padStart(2, '0');
