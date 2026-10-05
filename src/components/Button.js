import { attrs, cx, esc } from '../utils/html.js';
import { Icon } from './Icon.js';

/**
 * Botón-enlace. Variantes: primary | secondary | ghost | whatsapp | accent.
 * `track` agrega data-track para analítica (ej. whatsapp_click).
 */
export function Button({ href, label, variant = 'primary', track, external = false, icon, className, size }) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return `<a${attrs({
    class: cx('btn', `btn--${variant}`, size && `btn--${size}`, className),
    href,
    'data-track': track,
    ...ext,
  })}>${icon ? Icon(icon) : ''}<span>${esc(label)}</span>${
    external ? '<span class="sr-only"> (se abre en una pestaña nueva)</span>' : ''
  }</a>`;
}

export const ButtonGroup = (buttons, className) => `<div class="${cx('btn-group', className)}">${buttons.join('')}</div>`;
