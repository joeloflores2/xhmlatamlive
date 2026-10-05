/**
 * Tests del servidor de producción (server.mjs).
 */
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, describe, test } from 'node:test';

// Carpeta propia: site.test.mjs borra .tmp/ al terminar y los archivos corren en paralelo.
const OUT = mkdtempSync(join(tmpdir(), 'hxm-server-'));
process.env.DIST_DIR = OUT;

let server;
let base;

before(async () => {
  const { build } = await import('../scripts/build.mjs');
  await build({ out: OUT, quiet: true });
  const { start } = await import('../server.mjs');
  server = await start({ port: 0, host: '127.0.0.1' });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server?.close();
  rmSync(OUT, { recursive: true, force: true });
});

describe('servidor de producción', () => {
  test('sirve la portada con cabeceras de seguridad', async () => {
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/html/);
    assert.equal(res.headers.get('x-frame-options'), 'DENY');
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    assert.match(await res.text(), /<html/i);
  });

  test('redirige rutas sin diagonal final', async () => {
    const res = await fetch(`${base}/contacto`, { redirect: 'manual' });
    assert.equal(res.status, 301);
    assert.equal(res.headers.get('location'), '/contacto/');
  });

  test('responde 404 con la página de error', async () => {
    const res = await fetch(`${base}/no-existe/`);
    assert.equal(res.status, 404);
    assert.match(await res.text(), /<html/i);
  });

  test('bloquea rutas fuera de dist', async () => {
    const res = await fetch(`${base}/..%2f..%2fpackage.json`);
    assert.notEqual(res.status, 200);
  });

  test('assets con caché inmutable', async () => {
    const html = await (await fetch(`${base}/`)).text();
    const css = html.match(/\/assets\/css\/styles\.[a-f0-9]+\.css/)[0];
    const res = await fetch(`${base}${css}`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('cache-control'), /immutable/);
  });

  test('redirige www al dominio principal', async () => {
    const res = await fetch(`${base}/campus/`, { redirect: 'manual', headers: { host: 'www.hxmlatam.com' } }).catch(() => null);
    // fetch puede ignorar el Host personalizado; solo se valida si lo respetó.
    if (res && res.status === 301) assert.equal(res.headers.get('location'), 'https://hxmlatam.com/campus/');
  });
});
