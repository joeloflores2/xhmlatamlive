import { esc } from '../utils/html.js';
import { Icon } from './Icon.js';

/** Diálogo modal nativo (<dialog>) accesible. El contenido lo inyecta JS. */
export function Modal({ id, label }) {
  return `<dialog id="${esc(id)}" class="modal" aria-label="${esc(label)}">
  <button type="button" class="modal__close" data-modal-close aria-label="Cerrar">${Icon('close')}</button>
  <div class="modal__body" data-modal-body></div>
</dialog>`;
}
