/**
 * Utilidades compartidas para servir dist/ (servidor de desarrollo y de producción).
 */
import { existsSync, statSync } from 'node:fs';
import { join, normalize, sep } from 'node:path';

export const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

/**
 * Resuelve una ruta URL a un archivo dentro de dist.
 * Devuelve { status: 200, file } | { status: 301, location } | { status: 403 } | { status: 404 }.
 */
export function resolveRequest(dist, pathname) {
  let path;
  try {
    path = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  } catch {
    return { status: 400 };
  }
  let file = join(dist, path);
  if (file !== dist && !file.startsWith(dist + sep)) return { status: 403 };
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) return existsSync(join(file, 'index.html')) ? { status: 301, location: `${pathname}/` } : { status: 404 };
    file = join(file, 'index.html');
  }
  return existsSync(file) ? { status: 200, file } : { status: 404 };
}
