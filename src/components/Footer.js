import { config } from '../config/index.js';
import { footerNav, legalNav } from '../data/navigation.js';
import { site, socialLabels } from '../data/site.js';
import { each, esc } from '../utils/html.js';
import { addressLine, telHref, whatsappUrl } from '../utils/links.js';
import { Brand } from './Brand.js';
import { Icon } from './Icon.js';

function Social() {
  const entries = Object.entries(site.social);
  return `<ul class="footer__list">${each(entries, ([key, url]) =>
    url
      ? `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(socialLabels[key])}<span class="sr-only"> (se abre en una pestaña nueva)</span></a></li>`
      : `<li class="footer__pending" data-placeholder>${esc(socialLabels[key])} <span>(próximamente)</span></li>`,
  )}</ul>`;
}

export function Footer() {
  const c = config();
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <p class="footer__tagline">${esc(site.tagline)}</p>
      <p class="footer__secondary">${esc(site.secondaryTagline)}</p>
    </div>
    <div class="footer__grid">
      <div class="footer__brand">
        ${Brand({ className: 'brand brand--footer' })}
        <p class="footer__org">${esc(site.name.toUpperCase())}<br>${esc(site.brand)}</p>
        <p class="footer__status">Proyecto deportivo en desarrollo en Aguascalientes, México.</p>
      </div>
      <nav class="footer__col" aria-labelledby="footer-nav-title">
        <h2 id="footer-nav-title" class="footer__heading">Explora</h2>
        <ul class="footer__list">${each(footerNav, (i) => `<li><a href="${i.href}">${esc(i.label)}</a></li>`)}</ul>
      </nav>
      <nav class="footer__col" aria-labelledby="footer-legal-title">
        <h2 id="footer-legal-title" class="footer__heading">Legal</h2>
        <ul class="footer__list">${each(legalNav, (i) => `<li><a href="${i.href}">${esc(i.label)}</a></li>`)}</ul>
      </nav>
      <div class="footer__col">
        <h2 class="footer__heading">Contacto</h2>
        <ul class="footer__list footer__list--contact">
          <li><a href="${telHref()}">${Icon('phone', { size: 18 })}<span>${esc(site.contact.phoneDisplay)}</span></a></li>
          <li><a href="${esc(whatsappUrl())}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">${Icon('whatsapp', { size: 18 })}<span>WhatsApp</span><span class="sr-only"> (se abre en una pestaña nueva)</span></a></li>
          <li><a href="${esc(c.mapUrl)}" target="_blank" rel="noopener noreferrer">${Icon('pin', { size: 18 })}<span>Campus ${esc(site.campus.name)}</span><span class="sr-only"> (se abre en una pestaña nueva)</span></a></li>
        </ul>
        <address class="footer__address">${esc(addressLine())}</address>
      </div>
      <div class="footer__col">
        <h2 class="footer__heading">Redes sociales</h2>
        ${Social()}
      </div>
    </div>
    <div class="footer__bottom">
      <p>© ${site.copyrightYear} ${esc(site.name)} / ${esc(site.brand)}. Todos los derechos reservados.</p>
      <ul class="footer__legal">${each(legalNav, (i) => `<li><a href="${i.href}">${esc(i.label)}</a></li>`)}${
        c.hasTracking ? '<li><button type="button" class="footer__cookie-btn" data-cookie-settings>Preferencias de cookies</button></li>' : ''
      }</ul>
    </div>
  </div>
</footer>`;
}
