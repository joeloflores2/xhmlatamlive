import { site } from '../data/site.js';

/** Enlace de WhatsApp con mensaje predeterminado. */
export const whatsappUrl = (message = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const telHref = () => `tel:${site.contact.phoneE164}`;

/** Búsqueda en Google Maps a partir de la dirección proporcionada (sin coordenadas inventadas). */
export const officeMapUrl = () => {
  const a = site.address;
  const q = `${a.street}, ${a.neighborhood}, ${a.postalCode} ${a.city}, ${a.state}, ${a.country}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
};

/** Dirección en una sola línea. */
export const addressLine = () => {
  const a = site.address;
  return `${a.street}, ${a.neighborhood}, ${a.city}, ${a.state}, C.P. ${a.postalCode}, ${a.country}`;
};
