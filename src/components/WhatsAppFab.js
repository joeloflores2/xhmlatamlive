import { whatsappUrl } from '../utils/links.js';
import { esc } from '../utils/html.js';
import { Icon } from './Icon.js';

/** Acceso flotante a WhatsApp con mensaje predeterminado. */
export const WhatsAppFab = () =>
  `<a class="wa-fab" href="${esc(whatsappUrl())}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)">${Icon('whatsapp', { size: 26 })}</a>`;
