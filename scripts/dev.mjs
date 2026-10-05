/**
 * Servidor de desarrollo sin dependencias.
 * - Compila en modo dev, sirve /dist en http://localhost:4321 y recompila al guardar.
 * - Uso: npm run dev  |  npm run preview (sin vigilancia de archivos)
 */
import { spawnSync } from 'node:child_process';
import { createReadStream, watch } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TYPES, resolveRequest } from './lib/static.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 4321;
const WATCH = !process.argv.includes('--no-watch');

function build() {
  // Proceso separado: así cada build lee los módulos actualizados.
  const res = spawnSync(process.execPath, [join(ROOT, 'scripts/build.mjs'), '--dev'], { stdio: 'inherit' });
  return res.status === 0;
}

build();

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const { status, file, location } = resolveRequest(DIST, url.pathname);
  if (status === 301) {
    res.writeHead(301, { Location: location }).end();
    return;
  }
  if (status === 404) {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    createReadStream(join(DIST, '404.html')).pipe(res);
    return;
  }
  if (status !== 200) {
    res.writeHead(status).end();
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
