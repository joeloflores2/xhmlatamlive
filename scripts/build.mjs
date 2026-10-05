/**
 * Generador estático de HXM LATAM (sin dependencias externas).
 * - Renderiza cada página de src/pages a HTML estático (/ruta/index.html).
 * - Empaqueta CSS y JS con hash de contenido para caché.
 * - Genera sitemap.xml, robots.txt y site.webmanifest.
 * Uso: node scripts/build.mjs [--out dist] [--dev]
 */
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from './lib/env.mjs';
import { minifyCss } from './lib/minify.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CSS_ORDER = ['variables.css', 'typography.css', 'globals.css', 'components.css', 'pages.css'];

const hash = (content) => createHash('sha256').update(content).digest('hex').slice(0, 10);

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function copyPublic(from, to) {
  if (!existsSync(from)) return;
  cpSync(from, to, {
    recursive: true,
    filter: (src) => {
      const name = src.split(/[\\/]/).pop();
      return !(name.startsWith('.') && name !== '.well-known') && !name.endsWith('.md');
    },
  });
}

function bundleCss(out) {
  const css = minifyCss(CSS_ORDER.map((f) => readFileSync(join(ROOT, 'src/styles', f), 'utf8')).join('\n'));
  const name = `/assets/css/styles.${hash(css)}.css`;
  write(join(out, name), css);
  return { name, size: css.length };
}

function bundleJs(out) {
  const dir = join(ROOT, 'src/scripts');
  const files = readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
  const js = `/*! HXM LATAM */\n'use strict';\n${files.map((f) => readFileSync(join(dir, f), 'utf8')).join('\n')}`;
  const name = `/assets/js/app.${hash(js)}.js`;
  write(join(out, name), js);
  return { name, size: js.length };
}

function sitemap(pages, cfg) {
  const urls = pages
    .filter((p) => p.sitemap !== false && !p.noindex)
    .map((p) => {
      const priority = p.path === '/' ? '1.0' : p.slug === 'legal' ? '0.3' : '0.8';
      return `  <url>\n    <loc>${cfg.siteUrl}${p.path}</loc>\n    <lastmod>${cfg.buildDate}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const robots = (cfg) => `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`;

const manifest = (site) =>
  JSON.stringify(
    {
      name: `${site.brand} — ${site.name}`,
      short_name: site.brand,
      description: site.seo.defaultDescription,
      lang: site.locale,
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2,
  );

export async function build({ out = join(ROOT, 'dist'), dev = false, env = loadEnv(ROOT), quiet = false } = {}) {
  const started = Date.now();
  const imp = (p) => import(pathToFileURL(join(ROOT, p)).href);
  const { createConfig, setConfig } = await imp('src/config/index.js');
  const { site } = await imp('src/data/site.js');
  const { Document } = await imp('src/components/Layout.js');
  const { pages } = await imp('src/pages/index.js');

  const cfg = createConfig(env, { dev });
  setConfig(cfg);

  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  copyPublic(join(ROOT, 'public'), out);

  const css = bundleCss(out);
  const js = bundleJs(out);
  const assets = { css: css.name, js: js.name };

  const seen = new Set();
  for (const page of pages) {
    if (seen.has(page.path)) throw new Error(`Ruta duplicada: ${page.path}`);
    seen.add(page.path);
    const html = Document({ page, body: page.render(), assets });
    const file = page.output ? join(out, page.output) : join(out, page.path, 'index.html');
    write(file, html);
  }

  write(join(out, 'sitemap.xml'), sitemap(pages, cfg));
  write(join(out, 'robots.txt'), robots(cfg));
  write(join(out, 'site.webmanifest'), manifest(site));
  write(join(out, '.nojekyll'), '');

  if (!quiet) {
    for (const w of cfg.warnings) console.warn(`⚠  ${w}`);
    console.log(`✓ ${pages.length} páginas · CSS ${(css.size / 1024).toFixed(1)} KB · JS ${(js.size / 1024).toFixed(1)} KB · ${Date.now() - started} ms → ${out}`);
  }
  return { out, pages, config: cfg };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf('--out');
  build({
    out: outIdx > -1 ? resolve(args[outIdx + 1]) : undefined,
    dev: args.includes('--dev'),
  }).catch((err) => {
    console.error('✗ Error de build:', err);
    process.exit(1);
  });
}
