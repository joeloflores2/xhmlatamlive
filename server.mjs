/**
 * Servidor de producción sin dependencias (Hostinger Node.js, VPS, etc.).
 * - Sirve dist/ con cabeceras de seguridad, caché y compresión gzip.
 * - Si dist/ no existe (no se ejecutó npm run build), compila antes de arrancar.
 * - Redirige www.<dominio> al dominio principal.
 * Uso: npm start   (puerto: variable PORT, 3000 por defecto)
 */
import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { TYPES, resolveRequest } from './scripts/lib/static.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(process.env.DIST_DIR || join(ROOT, 'dist'));
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Mismas cabeceras que security/_headers. La CSP principal viaja como <meta> en cada página.
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.webmanifest', '.svg', '.xml', '.txt', '.ico']);

function cacheControl(urlPath, ext) {
  if (urlPath.startsWith('/assets/')) return 'public, max-age=31536000, immutable';
  if (ext === '.html' || ext === '.xml' || ext === '.txt' || ext === '.webmanifest') return 'public, max-age=0, must-revalidate';
  return 'public, max-age=86400';
}

function send(req, res, status, file, urlPath) {
  const ext = extname(file);
  const headers = {
    ...SECURITY_HEADERS,
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': status === 200 ? cacheControl(urlPath, ext) : 'no-store',
    Vary: 'Accept-Encoding',
  };
  const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  if (gzip) headers['Content-Encoding'] = 'gzip';
  res.writeHead(status, headers);
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  const stream = createReadStream(file);
  stream.on('error', () => res.destroy());
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}

function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { ...SECURITY_HEADERS, Allow: 'GET, HEAD' }).end();
    return;
  }
  const host = (req.headers.host || '').toLowerCase();
  if (host.startsWith('www.')) {
    const proto = req.headers['x-forwarded-proto'] === 'http' ? 'http' : 'https';
    res.writeHead(301, { Location: `${proto}://${host.slice(4)}${req.url}` }).end();
    return;
  }
  const url = new URL(req.url, 'http://localhost');
  const { status, file, location } = resolveRequest(DIST, url.pathname);
  if (status === 200) return send(req, res, 200, file, url.pathname);
  if (status === 301) {
    res.writeHead(301, { ...SECURITY_HEADERS, Location: location + url.search }).end();
    return;
  }
  if (status === 404) return send(req, res, 404, join(DIST, '404.html'), url.pathname);
  res.writeHead(status, SECURITY_HEADERS).end();
}

export async function start({ port = PORT, host = HOST } = {}) {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.log('dist/ no existe: compilando el sitio…');
    const { build } = await import('./scripts/build.mjs');
    await build({ out: DIST });
  }
  const server = createServer(handler);
  await new Promise((ok) => server.listen(port, host, ok));
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  start()
    .then((server) => console.log(`▶ HXM LATAM en producción · puerto ${server.address().port}`))
    .catch((err) => {
      console.error('✗ No se pudo iniciar el servidor:', err);
      process.exit(1);
    });
}
