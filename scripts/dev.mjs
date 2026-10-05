/**
 * Servidor de desarrollo sin dependencias.
 * - Compila en modo dev, sirve /dist en http://localhost:4321 y recompila al guardar.
 * - Uso: npm run dev  |  npm run preview (sin vigilancia de archivos)
 */
import { spawnSync } from 'node:child_process';
import { createReadStream, existsSync, statSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 4321;
const WATCH = !process.argv.includes('--no-watch');

const TYPES = {
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
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
};

function build() {
  // Proceso separado: así cada build lee los módulos actualizados.
  const res = spawnSync(process.execPath, [join(ROOT, 'scripts/build.mjs'), '--dev'], { stdio: 'inherit' });
  return res.status === 0;
}

build();

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(DIST, path);
  if (!file.startsWith(DIST)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    if (!path.endsWith('/') && existsSync(join(DIST, path, 'index.html'))) {
      res.writeHead(301, { Location: `${url.pathname}/` }).end();
      return;
    }
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    createReadStream(join(DIST, '404.html')).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`\n▶ HXM LATAM en http://localhost:${PORT}${WATCH ? '  (recompila al guardar)' : ''}\n`));

if (WATCH) {
  let timer;
  for (const dir of ['src', 'public']) {
    watch(join(ROOT, dir), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(build, 150);
    });
  }
}
