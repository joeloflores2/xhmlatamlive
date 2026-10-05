import { disclaimers, site } from '../data/site.js';
import { esc } from '../utils/html.js';
import { Button, ButtonGroup } from './Button.js';

/**
 * Hero principal. Fondo: estadio nocturno conceptual (SVG generado por
 * scripts/generate-art.mjs) + "línea de vuelo" ámbar que se dibuja al cargar.
 * Para usar una fotografía real, reemplaza /images/hero/estadio-conceptual.svg
 * y conserva la etiqueta conceptual solo si la imagen no es real.
 */
export function Hero() {
  const flight = 'M 60 1060 C 520 930, 900 660, 1120 420 S 1470 70, 1720 -60';
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="hero__scene" aria-hidden="true">
    <img class="hero__img" src="/images/hero/estadio-conceptual.svg" alt="" width="1600" height="1000" fetchpriority="high" decoding="async" data-parallax>
    <svg class="hero__flight" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" focusable="false">
      <path class="hero__flight-glow" d="${flight}" pathLength="1"/>
      <path class="hero__flight-line" d="${flight}" pathLength="1"/>
    </svg>
  </div>
  <div class="container hero__inner">
    <p class="hero__org"><span>${esc(site.name)}</span><span class="hero__org-brand">${esc(site.brand)}</span></p>
    <h1 id="hero-title" class="hero__title"><span class="hero__line">Donde el</span> <span class="hero__line">talento</span> <span class="hero__line">despega</span></h1>
    <p class="hero__sub">Centro internacional de formación deportiva, educación y desarrollo de futbolistas con visión hacia el fútbol profesional.</p>
    ${ButtonGroup([
      Button({ href: '/quienes-somos/', label: 'Conoce el proyecto', variant: 'primary' }),
      Button({ href: '/jugadores/', label: 'Quiero ser parte', variant: 'secondary', track: 'player_interest' }),
    ], 'hero__actions')}
  </div>
  <div class="container hero__meta">
    <p class="hero__place">HXM LATAM · Aguascalientes · México</p>
    <p class="concept-tag">${esc(disclaimers.concept)}</p>
  </div>
</section>`;
}
