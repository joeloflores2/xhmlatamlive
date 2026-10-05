/** Iconografía mínima en SVG inline (decorativa: aria-hidden). */

const PATHS = {
  whatsapp:
    '<path d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.3A9.4 9.4 0 1 0 12 2.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.1 7.6c.3-.3.8-.3 1 .1l.9 1.7c.2.3.1.7-.1 1l-.6.6a5.4 5.4 0 0 0 2.6 2.6l.6-.6c.3-.3.7-.3 1-.1l1.7.9c.4.2.4.7.1 1l-.8.8c-.6.6-1.5.8-2.3.4a9 9 0 0 1-4.9-4.9c-.3-.8-.2-1.7.4-2.3Z" fill="currentColor"/>',
  phone:
    '<path d="M6.6 3.5c.4-.4 1.1-.4 1.4.1l1.6 2.7c.3.4.2 1-.2 1.3l-1.1 1a10.6 10.6 0 0 0 5 5l1-1.1c.4-.4.9-.5 1.3-.2l2.7 1.6c.5.3.5 1 .1 1.4l-1.3 1.3c-.9.9-2.2 1.2-3.4.7A15.3 15.3 0 0 1 5.6 9.2c-.5-1.2-.2-2.5.7-3.4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  pin: '<path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.4" fill="currentColor"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m3.8 6 8.2 6.6L20.2 6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  check: '<path d="m4.5 12.5 4.8 4.8L19.5 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  close: '<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  document:
    '<path d="M7 3h7l4 4v14H7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
};

export function Icon(name, { className = 'icon', size = 20 } = {}) {
  const body = PATHS[name];
  if (!body) return '';
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
}
