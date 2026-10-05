import { each, esc } from '../utils/html.js';
import { Button } from './Button.js';

/**
 * Tarjeta de ubicación. No se incrusta mapa ni se inventan coordenadas:
 * el botón abre el enlace oficial proporcionado.
 */
export function LocationCard({ title, lines = [], mapUrl, buttonLabel = 'Ver ubicación', note, level = 3 }) {
  return `<div class="location">
    <h${level} class="location__title">${esc(title)}</h${level}>
    <address class="location__address">${each(lines, (l) => `<span>${esc(l)}</span>`)}</address>
    ${note ? `<p class="location__note">${esc(note)}</p>` : ''}
    ${Button({ href: mapUrl, label: buttonLabel, variant: 'secondary', icon: 'pin', external: true })}
  </div>`;
}
