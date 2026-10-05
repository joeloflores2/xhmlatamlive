import { config, publicConfig } from '../config/index.js';
import { site } from '../data/site.js';
import { esc } from '../utils/html.js';
import { CookieBanner } from './CookieBanner.js';
import { Footer } from './Footer.js';
import { Header } from './Header.js';
import { structuredData } from './StructuredData.js';
import { WhatsAppFab } from './WhatsAppFab.js';

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&display=swap';

/** JSON seguro para incrustar dentro de <script>. */
const safeJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

/** Documento HTML completo con SEO técnico, seguridad y accesibilidad. */
export function Document({ page, body, assets }) {
  const c = config();
  const canonical = `${c.siteUrl}${page.path}`;
  const title = page.title ? `${page.title} | ${site.seo.titleSuffix}` : site.seo.defaultTitle;
  const description = page.description || site.seo.defaultDescription;
  const ogImage = `${c.siteUrl}${site.seo.ogImage}`;
  const ld = structuredData(page, { title, description, canonical });

  return `<!doctype html>
<html lang="${site.locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="${esc(c.csp)}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
${page.noindex ? '' : `<link rel="canonical" href="${esc(canonical)}">`}
<meta name="theme-color" content="#000000">
<meta name="color-scheme" content="dark">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.ogLocale}">
<meta property="og:site_name" content="${esc(site.brand)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.seo.ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<meta name="twitter:image:alt" content="${esc(site.seo.ogImageAlt)}">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONT_URL}">
<link rel="stylesheet" href="${assets.css}">
${page.preload || ''}
<script type="application/ld+json">${safeJson(ld)}</script>
<script id="site-config" type="application/json">${safeJson(publicConfig())}</script>
<script src="${assets.js}" defer></script>
</head>
<body class="page-${esc(page.slug)}">
${Header(page.path)}
<main id="contenido" tabindex="-1">
${body}
</main>
${Footer()}
${WhatsAppFab()}
${CookieBanner()}
</body>
</html>
`;
}
