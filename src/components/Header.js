import { headerCta, mainNav, mobileCta } from '../data/navigation.js';
import { site } from '../data/site.js';
import { cx, each, esc } from '../utils/html.js';
import { telHref, whatsappUrl } from '../utils/links.js';
import { Brand } from './Brand.js';
import { Button } from './Button.js';

const isCurrent = (href, path) => (href === '/' ? path === '/' : path.startsWith(href));

export function Header(currentPath = '/') {
  const link = (item, cls) =>
    `<li><a class="${cls}" href="${item.href}"${isCurrent(item.href, currentPath) ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;

  return `<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="${cx('site-header', currentPath === '/' && 'site-header--over-hero')}" data-header>
  <div class="container site-header__inner">
    ${Brand()}
    <nav class="nav" aria-label="Principal">
      <ul class="nav__list">${each(mainNav, (i) => link(i, 'nav__link'))}</ul>
    </nav>
    ${Button({ href: headerCta.href, label: headerCta.label, variant: 'primary', size: 'sm', className: 'site-header__cta' })}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-movil" data-menu-toggle>
      <span class="sr-only" data-menu-label>Abrir menú</span>
      <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
    </button>
  </div>
</header>
<div id="menu-movil" class="mobile-menu" data-menu hidden>
  <div class="container mobile-menu__inner">
    <nav aria-label="Menú móvil">
      <ul class="mobile-menu__list">${each(mainNav, (i) => link(i, 'mobile-menu__link'))}<li><a class="mobile-menu__link" href="/jugadores/"${isCurrent('/jugadores/', currentPath) ? ' aria-current="page"' : ''}>Jugadores</a></li></ul>
    </nav>
    <div class="mobile-menu__footer">
      ${Button({ href: mobileCta.href, label: mobileCta.label, variant: 'primary' })}
      ${Button({ href: whatsappUrl(), label: 'WhatsApp', variant: 'whatsapp', icon: 'whatsapp', external: true, track: 'whatsapp_click' })}
      <a class="mobile-menu__phone" href="${telHref()}">${esc(site.contact.phoneDisplay)}</a>
    </div>
  </div>
</div>`;
}
