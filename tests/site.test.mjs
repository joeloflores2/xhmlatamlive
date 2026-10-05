/**
 * Tests del sitio generado (node:test, sin dependencias).
 * Compila en una carpeta temporal y verifica SEO, enlaces, accesibilidad,
 * cumplimiento de lenguaje y seguridad.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { rmSync } from 'node:fs';
import { build } from '../scripts/build.mjs';
import { FORBIDDEN_PHRASES, normalize } from '../scripts/lib/rules.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, '.tmp', 'test-dist');
const SITE = 'https://hxmlatam.com';

const REQUIRED_ROUTES = [
  '/',
  '/quienes-somos/',
  '/el-club/',
  '/campus/',
  '/formacion/',
  '/proyeccion-internacional/',
  '/inversion/',
  '/jugadores/',
  '/contacto/',
  '/aviso-de-privacidad/',
  '/terminos-y-condiciones/',
  '/politica-de-cookies/',
];

let pages = [];

/** Archivo HTML de una ruta del sitio. */
const fileFor = (route) => (route.endsWith('.html') ? join(OUT, route) : join(OUT, route, 'index.html'));

function htmlFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) htmlFiles(full, acc);
    else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const ids = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');

before(async () => {
  // Build con entorno vacío: así se valida el estado por defecto (sin IDs ni endpoints).
  await build({ out: OUT, env: {}, quiet: true });
  pages = htmlFiles(OUT).map((file) => ({ file, rel: file.slice(OUT.length).replace(/\\/g, '/'), html: readFileSync(file, 'utf8') }));
});

after(() => rmSync(join(ROOT, '.tmp'), { recursive: true, force: true }));

describe('Estructura y despliegue', () => {
  test('existen todas las rutas obligatorias y la página 404', () => {
    for (const route of REQUIRED_ROUTES) assert.ok(existsSync(fileFor(route)), `Falta ${route}`);
    assert.ok(existsSync(join(OUT, '404.html')), 'Falta 404.html');
  });

  test('CNAME apunta al dominio oficial', () => {
    assert.equal(readFileSync(join(OUT, 'CNAME'), 'utf8').trim(), 'hxmlatam.com');
  });

  test('.nojekyll, robots.txt y manifest existen', () => {
    assert.ok(existsSync(join(OUT, '.nojekyll')));
    assert.match(readFileSync(join(OUT, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/hxmlatam\.com\/sitemap\.xml/);
    const manifest = JSON.parse(readFileSync(join(OUT, 'site.webmanifest'), 'utf8'));
    for (const icon of manifest.icons) assert.ok(existsSync(join(OUT, icon.src)), `Falta ícono ${icon.src}`);
  });

  test('sitemap incluye todas las páginas indexables con URL canónica', () => {
    const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
    for (const route of REQUIRED_ROUTES) assert.ok(sitemap.includes(`<loc>${SITE}${route}</loc>`), `Sitemap sin ${route}`);
    assert.ok(!sitemap.includes('404'), 'La 404 no debe estar en el sitemap');
  });

  test('imágenes sociales y favicons existen', () => {
    for (const f of ['og-image.jpg', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png']) assert.ok(existsSync(join(OUT, f)), `Falta ${f}`);
  });
});

describe('SEO técnico', () => {
  test('cada página tiene title, description, lang y Open Graph', () => {
    for (const { rel, html } of pages) {
      assert.match(html, /<html lang="es-MX">/, `${rel}: lang`);
      assert.equal((html.match(/<title>/g) || []).length, 1, `${rel}: title único`);
      assert.match(html, /<meta name="description" content="[^"]{50,}">/, `${rel}: description`);
      assert.match(html, /<meta property="og:image" content="https:\/\/hxmlatam\.com\/og-image\.jpg">/, `${rel}: og:image absoluta`);
      assert.match(html, /<meta name="twitter:card" content="summary_large_image">/, `${rel}: twitter card`);
    }
  });

  test('canonical correcta en páginas indexables y noindex en la 404', () => {
    for (const route of REQUIRED_ROUTES) {
      const html = readFileSync(fileFor(route), 'utf8');
      assert.ok(html.includes(`<link rel="canonical" href="${SITE}${route}">`), `${route}: canonical`);
    }
    const notFound = readFileSync(join(OUT, '404.html'), 'utf8');
    assert.match(notFound, /noindex/);
    assert.ok(!notFound.includes('rel="canonical"'));
  });

  test('título de la Home según el brief', () => {
    const home = readFileSync(fileFor('/'), 'utf8');
    assert.ok(home.includes('<title>HXM LATAM | Halcones Xtreme México — Formación de Futbolistas</title>'));
  });

  test('exactamente un H1 por página', () => {
    for (const { rel, html } of pages) assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${rel}: debe tener un solo h1`);
  });

  test('JSON-LD válido con SportsOrganization', () => {
    for (const { rel, html } of pages) {
      const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      assert.ok(raw, `${rel}: falta JSON-LD`);
      const data = JSON.parse(raw[1]);
      assert.ok(data['@graph'].some((n) => n['@type'] === 'SportsOrganization'), `${rel}: SportsOrganization`);
    }
  });
});

describe('Enlaces e integridad', () => {
  test('todos los enlaces y recursos internos existen', () => {
    for (const { rel, html } of pages) {
      const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
      for (const ref of refs) {
        if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
        const [path] = ref.split('#');
        const target = path.endsWith('/') ? join(OUT, path, 'index.html') : join(OUT, path);
        assert.ok(existsSync(target), `${rel}: enlace roto ${ref}`);
      }
    }
  });

  test('las anclas (#id) apuntan a elementos existentes', () => {
    for (const { rel, html } of pages) {
      for (const [, ref] of html.matchAll(/\shref="([^"]*#[^"]+)"/g)) {
        if (/^https?:/.test(ref)) continue;
        const [path, anchor] = ref.split('#');
        const targetHtml = path ? readFileSync(fileFor(path), 'utf8') : html;
        assert.ok(ids(targetHtml).includes(anchor), `${rel}: ancla inexistente ${ref}`);
      }
    }
  });

  test('sin IDs duplicados y aria-* referenciando IDs existentes', () => {
    for (const { rel, html } of pages) {
      const list = ids(html);
      const dupes = list.filter((id, i) => list.indexOf(id) !== i);
      assert.deepEqual(dupes, [], `${rel}: IDs duplicados`);
      for (const [, refsAttr] of html.matchAll(/aria-(?:labelledby|describedby|controls)="([^"]+)"/g)) {
        for (const id of refsAttr.split(/\s+/)) assert.ok(list.includes(id), `${rel}: aria apunta a #${id} inexistente`);
      }
    }
  });

  test('enlaces externos en pestaña nueva usan rel="noopener noreferrer"', () => {
    for (const { rel, html } of pages) {
      for (const [tag] of html.matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)) {
        assert.ok(tag.includes('rel="noopener noreferrer"'), `${rel}: ${tag}`);
      }
    }
  });

  test('WhatsApp usa el número oficial y el mensaje predeterminado', () => {
    const home = readFileSync(fileFor('/'), 'utf8');
    const expected = `https://wa.me/524492568899?text=${encodeURIComponent('Hola, quiero conocer el proyecto HXM LATAM / Halcones Xtreme México.')}`;
    assert.ok(home.includes(expected.replace(/&/g, '&amp;')), 'Enlace de WhatsApp');
  });

  test('el botón "Ver ubicación" usa el enlace de Maps proporcionado', () => {
    for (const route of ['/campus/', '/contacto/']) {
      assert.ok(readFileSync(fileFor(route), 'utf8').includes('https://maps.app.goo.gl/J4WKFbJHaZhM87AH6'), route);
    }
  });
});

describe('Accesibilidad', () => {
  test('todas las imágenes tienen atributo alt', () => {
    for (const { rel, html } of pages) {
      for (const [tag] of html.matchAll(/<img\s[^>]*>/g)) assert.match(tag, /\salt="/, `${rel}: img sin alt ${tag}`);
    }
  });

  test('todos los campos de formulario tienen label asociado', () => {
    for (const { rel, html } of pages) {
      for (const [tag] of html.matchAll(/<(?:input|select|textarea)\s[^>]*>/g)) {
        if (/type="hidden"/.test(tag)) continue;
        const id = tag.match(/\sid="([^"]+)"/)?.[1];
        assert.ok(id, `${rel}: campo sin id ${tag}`);
        assert.ok(html.includes(`for="${id}"`), `${rel}: campo #${id} sin label`);
      }
    }
  });

  test('enlace para saltar al contenido y landmark main', () => {
    for (const { rel, html } of pages) {
      assert.ok(html.includes('href="#contenido"'), `${rel}: skip link`);
      assert.ok(html.includes('<main id="contenido"'), `${rel}: main`);
    }
  });

  test('formularios con consentimiento de privacidad obligatorio', () => {
    for (const route of ['/contacto/', '/inversion/', '/jugadores/']) {
      const html = readFileSync(fileFor(route), 'utf8');
      assert.match(html, /name="consentimiento" value="si" required/, `${route}: consentimiento`);
      assert.ok(html.includes('Autorizo el tratamiento de mis datos personales conforme al'), `${route}: texto`);
    }
    const player = readFileSync(fileFor('/jugadores/'), 'utf8');
    assert.ok(player.includes('Los datos serán tratados conforme al'), 'Aviso en formulario de jugadores');
  });
});

describe('Cumplimiento y contenido', () => {
  test('sin frases prohibidas de promesas deportivas o financieras', () => {
    for (const { rel, html } of pages) {
      const text = normalize(textOf(html));
      for (const phrase of FORBIDDEN_PHRASES) assert.ok(!text.includes(normalize(phrase)), `${rel}: "${phrase}"`);
      assert.ok(!/garantizad[oa]s?/.test(text), `${rel}: "garantizado"`);
    }
  });

  test('la página de inversión incluye el aviso legal obligatorio', () => {
    const html = readFileSync(fileFor('/inversion/'), 'utf8');
    assert.ok(
      html.includes('no constituye por sí misma una oferta pública, promesa de rendimiento, asesoría financiera ni garantía de resultados'),
    );
  });

  test('las imágenes conceptuales están identificadas', () => {
    for (const route of ['/', '/campus/']) {
      assert.ok(readFileSync(fileFor(route), 'utf8').includes('Imagen conceptual / proyecto en desarrollo'), route);
    }
  });

  test('páginas legales marcadas como texto base sujeto a revisión', () => {
    for (const route of ['/aviso-de-privacidad/', '/terminos-y-condiciones/', '/politica-de-cookies/']) {
      assert.ok(readFileSync(fileFor(route), 'utf8').includes('Texto base sujeto a revisión legal'), route);
    }
  });

  test('sin errores de plantilla (undefined, [object Object], NaN)', () => {
    for (const { rel, html } of pages) {
      const text = textOf(html);
      for (const bad of ['undefined', '[object Object]', 'NaN']) assert.ok(!text.includes(bad), `${rel}: "${bad}"`);
      assert.ok(!/="undefined"|="null"/.test(html), `${rel}: atributo vacío mal renderizado`);
    }
  });
});

describe('Seguridad', () => {
  test('CSP y Referrer-Policy en todas las páginas, sin scripts inline ejecutables', () => {
    for (const { rel, html } of pages) {
      assert.match(html, /http-equiv="Content-Security-Policy" content="default-src &#39;self&#39;/, `${rel}: CSP`);
      assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin">/, `${rel}: referrer`);
      for (const [tag] of html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>/g)) {
        assert.match(tag, /type="application\/(ld\+)?json"/, `${rel}: script inline ejecutable ${tag}`);
      }
      assert.ok(!/\son[a-z]+="/i.test(html), `${rel}: manejador de evento inline`);
    }
  });

  test('sin analítica ni endpoints cuando no hay variables configuradas', () => {
    for (const { rel, html } of pages) {
      assert.ok(!html.includes('googletagmanager.com'), `${rel}: GTM sin ID`);
      assert.ok(!html.includes('data-cookie-banner'), `${rel}: banner sin analítica`);
    }
  });

  test('con variables configuradas: CSP las permite y los formularios usan el endpoint', async () => {
    const out = join(ROOT, '.tmp', 'test-dist-env');
    await build({
      out,
      quiet: true,
      env: { PUBLIC_GA_ID: 'G-TEST1234', PUBLIC_CONTACT_ENDPOINT: 'https://formspree.io/f/demo', PUBLIC_PLAYER_ENDPOINT: 'javascript:alert(1)' },
    });
    const contact = readFileSync(join(out, 'contacto', 'index.html'), 'utf8');
    assert.ok(contact.includes('data-endpoint="https://formspree.io/f/demo"'));
    assert.ok(contact.includes('https://www.googletagmanager.com'));
    assert.ok(contact.includes('data-cookie-banner'), 'Banner de cookies con analítica');
    const players = readFileSync(join(out, 'jugadores', 'index.html'), 'utf8');
    assert.ok(!players.includes('javascript:'), 'Endpoint inseguro rechazado');
    assert.ok(players.includes('data-endpoint="https://formspree.io/f/demo"'), 'Usa el endpoint general como respaldo');
  });

  test('ningún archivo .env en el build', () => {
    assert.ok(!existsSync(join(OUT, '.env')));
  });
});
