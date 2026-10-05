/**
 * Genera las ilustraciones conceptuales del sitio (SVG, deterministas):
 * - public/images/hero/estadio-conceptual.svg  (estadio nocturno en perspectiva)
 * - public/images/campus/*.svg                  (serie de planos conceptuales)
 * - public/favicon.svg (marca provisional)
 *
 * Son imágenes CONCEPTUALES: no representan instalaciones construidas.
 * Reemplázalas por renders o fotografías oficiales cuando existan.
 * Uso: npm run art
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (rel, svg) => {
  const file = join(ROOT, 'public', rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.replace(/\n\s*/g, '\n'));
  console.log(`✓ ${rel} (${(svg.length / 1024).toFixed(1)} KB)`);
};

const r = (n) => Math.round(n * 10) / 10;

/** Generador pseudoaleatorio determinista. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const HEADER = '<!-- Imagen conceptual / proyecto en desarrollo · generada por scripts/generate-art.mjs -->';

/* ───────────────────────────── Hero: estadio ───────────────────────────── */
function hero() {
  const W = 1600;
  const H = 1000;
  const HORIZON = 520;
  const F = 533; // focal
  const CAM = 18; // altura de cámara (m)
  const CX = 800;
  const P = (X, Z) => [r(CX + (F * X) / Z), r(HORIZON + (F * CAM) / Z)];
  const poly = (pts) => pts.map((p) => p.join(',')).join(' ');
  const line = (a, b) => `M${a.join(',')}L${b.join(',')}`;

  const Z0 = 12; // línea de meta cercana (fuera de cuadro)
  const Z1 = 117; // línea de meta lejana
  const HW = 34; // medio ancho del campo

  // Franjas de corte del pasto
  let stripes = '';
  const n = 20;
  for (let i = 0; i < n; i++) {
    const za = Z0 + (i * (Z1 - Z0)) / n;
    const zb = Z0 + ((i + 1) * (Z1 - Z0)) / n;
    const fill = i % 2 ? '#0a1a2c' : '#08162a';
    stripes += `<polygon points="${poly([P(-HW - 6, za), P(HW + 6, za), P(HW + 6, zb), P(-HW - 6, zb)])}" fill="${fill}"/>`;
  }

  // Líneas del campo
  const half = (Z0 + Z1) / 2;
  const lines = [
    line(P(-HW, Z0), P(-HW, Z1)),
    line(P(HW, Z0), P(HW, Z1)),
    line(P(-HW, Z1), P(HW, Z1)),
    line(P(-HW, half), P(HW, half)),
    // área grande lejana
    line(P(-20.16, Z1), P(-20.16, Z1 - 16.5)),
    line(P(-20.16, Z1 - 16.5), P(20.16, Z1 - 16.5)),
    line(P(20.16, Z1 - 16.5), P(20.16, Z1)),
    // área chica lejana
    line(P(-9.16, Z1), P(-9.16, Z1 - 5.5)),
    line(P(-9.16, Z1 - 5.5), P(9.16, Z1 - 5.5)),
    line(P(9.16, Z1 - 5.5), P(9.16, Z1)),
    // área grande cercana
    line(P(-20.16, Z0), P(-20.16, Z0 + 16.5)),
    line(P(-20.16, Z0 + 16.5), P(20.16, Z0 + 16.5)),
    line(P(20.16, Z0 + 16.5), P(20.16, Z0)),
  ].join('');

  // Círculo central como polilínea proyectada
  const circle = [];
  for (let a = 0; a <= 360; a += 6) {
    const rad = (a * Math.PI) / 180;
    circle.push(P(9.15 * Math.cos(rad), half + 9.15 * Math.sin(rad)));
  }
  const [gl, gy] = P(-3.66, Z1);
  const [gr] = P(3.66, Z1);
  const crossbar = r(gy - (F * 2.44) / Z1);
  const spotNear = P(0, Z0 + 11);
  const spotFar = P(0, Z1 - 11);
  const center = P(0, half);

  // Tribuna con luces de público
  const rand = rng(7);
  let crowd = '';
  for (let i = 0; i < 260; i++) {
    const x = r(rand() * W);
    const y = r(392 + rand() * 118);
    crowd += `<circle cx="${x}" cy="${y}" r="${r(0.6 + rand() * 1.1)}" fill="#cfe0ff" opacity="${r(0.08 + rand() * 0.35) / 1}"/>`;
  }

  // Torres de iluminación
  const tower = (x, flip) => {
    let panel = '';
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        panel += `<rect x="${x - 54 + col * 18}" y="${118 + row * 14}" width="12" height="9" rx="1.5" fill="#f4f8ff"/>`;
      }
    }
    const beamX = flip ? -1 : 1;
    return `<g>
      <path d="M${x} 166 L${x - 6} 470 L${x + 6} 470 Z" fill="#0d1526"/>
      <rect x="${x - 60}" y="112" width="120" height="50" fill="#0b111d"/>
      ${panel}
      <polygon points="${x - 50},150 ${x + 50},150 ${x + beamX * 520 + 260},1000 ${x + beamX * 520 - 360},1000" fill="url(#beam)" opacity="0.5" filter="url(#soft)"/>
      <polygon points="${x - 30},150 ${x + 30},150 ${x + beamX * 180 + 120},1000 ${x + beamX * 180 - 160},1000" fill="url(#beam)" opacity="0.35" filter="url(#soft)"/>
      <circle cx="${x}" cy="140" r="300" fill="url(#glow)"/>
    </g>`;
  };

  return `${HEADER}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000"/><stop offset="0.5" stop-color="#030714"/><stop offset="0.58" stop-color="#071433"/>
    </linearGradient>
    <radialGradient id="glow"><stop offset="0" stop-color="#dfe9ff" stop-opacity="0.55"/><stop offset="0.25" stop-color="#7fa2ff" stop-opacity="0.16"/><stop offset="1" stop-color="#2b66ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f0ff" stop-opacity="0.32"/><stop offset="1" stop-color="#e8f0ff" stop-opacity="0"/></linearGradient>
    <radialGradient id="pool" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#9db9ff" stop-opacity="0.16"/><stop offset="1" stop-color="#9db9ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b66ff" stop-opacity="0"/><stop offset="0.5" stop-color="#2b66ff" stop-opacity="0.16"/><stop offset="1" stop-color="#2b66ff" stop-opacity="0"/></linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/></linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <path d="M0 380 L240 352 L560 372 L800 360 L1040 372 L1360 352 L1600 380 L1600 ${HORIZON} L0 ${HORIZON} Z" fill="#050a17"/>
  <path d="M0 380 L240 352 L560 372 L800 360 L1040 372 L1360 352 L1600 380" fill="none" stroke="#9db9ff" stroke-opacity="0.28" stroke-width="2"/>
  <g stroke="#9db9ff" stroke-opacity="0.07">${[410, 440, 470, 498].map((y) => `<path d="M0 ${y} H${W}"/>`).join('')}</g>
  ${crowd}
  <rect y="${HORIZON - 70}" width="${W}" height="150" fill="url(#haze)"/>
  ${stripes}
  <ellipse cx="560" cy="760" rx="520" ry="200" fill="url(#pool)"/>
  <ellipse cx="1040" cy="760" rx="520" ry="200" fill="url(#pool)"/>
  <g fill="none" stroke="#eef3ff" stroke-opacity="0.62" stroke-width="2.2" stroke-linejoin="round">
    <path d="${lines}"/>
    <polyline points="${poly(circle)}"/>
    <path d="M${gl} ${gy} V${crossbar} H${gr} V${gy}" stroke-opacity="0.8"/>
  </g>
  <g fill="#eef3ff" fill-opacity="0.7">
    <circle cx="${center[0]}" cy="${center[1]}" r="2.5"/><circle cx="${spotNear[0]}" cy="${spotNear[1]}" r="4"/><circle cx="${spotFar[0]}" cy="${spotFar[1]}" r="1.8"/>
  </g>
  ${tower(230, false)}
  ${tower(1370, true)}
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
</svg>`;
}

/* ─────────────────────── Serie de planos conceptuales ──────────────────── */
const INK = '#e2eaff';
const SOFT = '#9db9ff';
const AMBER = '#ffb020';

function blueprint(w, h, content) {
  const marks = [
    [24, 24, 1, 1],
    [w - 24, 24, -1, 1],
    [24, h - 24, 1, -1],
    [w - 24, h - 24, -1, -1],
  ]
    .map(([x, y, dx, dy]) => `<path d="M${x} ${y + dy * 22}V${y}H${x + dx * 22}"/>`)
    .join('');
  return `${HEADER}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <pattern id="minor" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="${SOFT}" stroke-opacity="0.07"/></pattern>
    <pattern id="major" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="url(#minor)"/><path d="M100 0H0V100" fill="none" stroke="${SOFT}" stroke-opacity="0.14"/></pattern>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${SOFT}"/></marker>
  </defs>
  <rect width="${w}" height="${h}" fill="#0a1c40"/>
  <rect width="${w}" height="${h}" fill="url(#major)"/>
  <g fill="none" stroke="${SOFT}" stroke-opacity="0.55" stroke-width="1.5">${marks}</g>
  ${content}
</svg>`;
}

const dim = (x1, y1, x2, y2) =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${SOFT}" stroke-width="1.2" stroke-opacity="0.8" marker-start="url(#arrow)" marker-end="url(#arrow)" fill="none"/>`;

/** Cancha vista desde arriba, escalada al rectángulo dado (105 × 68 m). */
function pitch(x, y, w, { stripes = 'none', id = 'p' } = {}) {
  const s = w / 105;
  const h = 68 * s;
  const m = (v) => r(v * s);
  let pattern = '';
  if (stripes === 'bands') {
    for (let i = 0; i < 14; i++) if (i % 2 === 0) pattern += `<rect x="${r(x + (i * w) / 14)}" y="${r(y)}" width="${r(w / 14)}" height="${r(h)}" fill="${SOFT}" fill-opacity="0.07"/>`;
  } else if (stripes === 'checker') {
    const cols = 14;
    const rows = 8;
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++)
        if ((i + j) % 2 === 0)
          pattern += `<rect x="${r(x + (i * w) / cols)}" y="${r(y + (j * h) / rows)}" width="${r(w / cols)}" height="${r(h / rows)}" fill="#7fe0a8" fill-opacity="0.09"/>`;
  }
  const cy = y + h / 2;
  const box = (side) => {
    const gx = side < 0 ? x : x + w;
    const d = side < 0 ? 1 : -1;
    const big = `M${gx} ${r(cy - m(20.16))}H${r(gx + d * m(16.5))}V${r(cy + m(20.16))}H${gx}`;
    const small = `M${gx} ${r(cy - m(9.16))}H${r(gx + d * m(5.5))}V${r(cy + m(9.16))}H${gx}`;
    const goal = `M${gx} ${r(cy - m(3.66))}H${r(gx - d * m(2))}V${r(cy + m(3.66))}H${gx}`;
    const spotX = r(gx + d * m(11));
    const arcR = m(9.15);
    const dx = m(16.5) - m(11);
    const dy = r(Math.sqrt(arcR * arcR - dx * dx));
    const ax = r(gx + d * m(16.5));
    const arc = `M${ax} ${r(cy - dy)}A${arcR} ${arcR} 0 0 ${side < 0 ? 1 : 0} ${ax} ${r(cy + dy)}`;
    return `<path d="${big}${small}${goal}${arc}"/><circle cx="${spotX}" cy="${r(cy)}" r="${r(Math.max(2, m(0.4)))}" fill="${INK}"/>`;
  };
  return `<g id="${id}">
    ${pattern}
    <g fill="none" stroke="${INK}" stroke-opacity="0.85" stroke-width="2">
      <rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}"/>
      <path d="M${r(x + w / 2)} ${r(y)}V${r(y + h)}"/>
      <circle cx="${r(x + w / 2)}" cy="${r(cy)}" r="${m(9.15)}"/>
      ${box(-1)}${box(1)}
    </g>
    <circle cx="${r(x + w / 2)}" cy="${r(cy)}" r="3" fill="${INK}"/>
  </g>`;
}

function dormitorios() {
  const x0 = 120;
  const x1 = 1080;
  const top = 230;
  const floorH = 100;
  const rand = rng(11);
  let windows = '';
  for (let f = 0; f < 4; f++) {
    for (let i = 0; i < 20; i++) {
      const wx = x0 + 9 + i * 48;
      const wy = top + 22 + f * floorH;
      const lit = rand() > 0.62;
      windows += `<rect x="${wx}" y="${wy}" width="30" height="58" ${lit ? `fill="${AMBER}" fill-opacity="0.55" stroke="${AMBER}"` : 'fill="none"'}/>`;
    }
  }
  const floors = [1, 2, 3].map((f) => `<path d="M${x0} ${top + f * floorH}H${x1}" stroke-opacity="0.45"/>`).join('');
  const trees = [60, 1140].map((cx) => `<circle cx="${cx}" cy="588" r="34"/><path d="M${cx} 622V640"/>`).join('');
  return blueprint(
    1200,
    800,
    `<g fill="none" stroke="${INK}" stroke-width="2" stroke-opacity="0.85">
      <rect x="${x0}" y="${top}" width="${x1 - x0}" height="${floorH * 4}"/>
      <path d="M${x0 - 30} ${top}H${x1 + 30}" stroke-width="3"/>
      ${floors}
      <path d="M40 ${top + floorH * 4}H1160" stroke-width="2.5"/>
      <path d="M520 ${top + floorH * 4}V${top + floorH * 4 + 26}H680V${top + floorH * 4}" stroke-opacity="0.6"/>
      ${windows}
      ${trees}
    </g>
    ${dim(x0, top - 50, x1, top - 50)}
    ${dim(x1 + 50, top, x1 + 50, top + floorH * 4)}`,
  );
}

function canchasSinteticas() {
  return blueprint(
    1200,
    800,
    `${pitch(60, 230, 520, { stripes: 'bands', id: 'a' })}${pitch(620, 230, 520, { stripes: 'bands', id: 'b' })}
    ${dim(60, 190, 580, 190)}${dim(620, 190, 1140, 190)}
    <path d="M600 210V600" stroke="${AMBER}" stroke-width="2" stroke-dasharray="6 8"/>`,
  );
}

function canchaNatural() {
  return blueprint(1200, 800, `${pitch(150, 110, 900, { stripes: 'checker', id: 'n' })}${dim(150, 74, 1050, 74)}${dim(1090, 110, 1090, 693)}`);
}

function gimnasio() {
  let racks = '';
  for (let i = 0; i < 6; i++) {
    const x = 200 + i * 115;
    racks += `<rect x="${x}" y="180" width="90" height="70"/><path d="M${x + 10} 215H${x + 80}" stroke="${AMBER}"/>`;
  }
  let bells = '';
  for (let i = 0; i < 9; i++) {
    const y = 300 + i * 34;
    bells += `<circle cx="168" cy="${y}" r="9"/><circle cx="212" cy="${y}" r="9"/><path d="M177 ${y}H203"/>`;
  }
  let platforms = '';
  for (let i = 0; i < 3; i++) {
    const x = 330 + i * 170;
    platforms += `<rect x="${x}" y="320" width="130" height="130"/><rect x="${x + 35}" y="320" width="60" height="130" stroke-opacity="0.5"/>`;
  }
  let cardio = '';
  for (let i = 0; i < 5; i++) {
    const y = 190 + i * 66;
    cardio += `<rect x="900" y="${y}" width="130" height="44" rx="10"/><path d="M915 ${y + 22}H1015" stroke-opacity="0.5"/>`;
  }
  let lane = '';
  for (let i = 0; i < 11; i++) lane += `<path d="M${200 + i * 80} 560V620" stroke-opacity="0.45"/>`;
  return blueprint(
    1200,
    800,
    `<g fill="none" stroke="${INK}" stroke-width="2" stroke-opacity="0.85">
      <rect x="120" y="140" width="960" height="520" stroke-width="3"/>
      <path d="M1080 600V660" stroke="#0a1c40" stroke-width="5"/>
      <path d="M1080 600A60 60 0 0 0 1020 660" stroke-opacity="0.6" stroke-dasharray="4 5"/>
      ${racks}${bells}${platforms}${cardio}
      <rect x="160" y="550" width="800" height="80"/>
      ${lane}
    </g>
    <path d="M200 550V630" stroke="${AMBER}" stroke-width="3"/>
    ${dim(120, 100, 1080, 100)}`,
  );
}

function alberca() {
  const x0 = 180;
  const x1 = 1020;
  const y0 = 220;
  const lanes = 6;
  const laneH = 360 / lanes;
  let ropes = '';
  for (let i = 1; i < lanes; i++) {
    const y = y0 + i * laneH;
    let floats = '';
    for (let x = x0 + 14; x < x1 - 8; x += 16) floats += `<circle cx="${x}" cy="${y}" r="3.2"/>`;
    ropes += `<g fill="${SOFT}" fill-opacity="0.55">${floats}</g>`;
  }
  let marks = '';
  for (let i = 0; i < lanes; i++) {
    const y = r(y0 + i * laneH + laneH / 2);
    marks += `<path d="M${x0 + 60} ${y}H${x1 - 60}M${x0 + 60} ${y - 12}V${y + 12}M${x1 - 60} ${y - 12}V${y + 12}" stroke-opacity="0.35"/>`;
    marks += `<rect x="${x0 - 30}" y="${y - 14}" width="22" height="28"/>`;
  }
  return blueprint(
    1200,
    800,
    `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="360" fill="${SOFT}" fill-opacity="0.08"/>
    <g fill="none" stroke="${INK}" stroke-width="2" stroke-opacity="0.85">
      <rect x="${x0 - 40}" y="${y0 - 40}" width="${x1 - x0 + 80}" height="440" stroke-opacity="0.45"/>
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="360" stroke-width="3"/>
      ${marks}
      <path d="M${x1 - 120} ${y0 - 2}a14 14 0 0 1 28 0M${x1 - 80} ${y0 - 2}a14 14 0 0 1 28 0"/>
    </g>
    ${ropes}
    <path d="M${x0 + 4} ${y0 + 4}V${y0 + 356}" stroke="${AMBER}" stroke-width="3"/>
    ${dim(x0, y0 - 80, x1, y0 - 80)}`,
  );
}

function hidromasaje() {
  const tub = (cx) => {
    let jets = '';
    for (let a = 0; a < 360; a += 30) {
      const rad = (a * Math.PI) / 180;
      jets += `<circle cx="${r(cx + 122 * Math.cos(rad))}" cy="${r(400 + 122 * Math.sin(rad))}" r="5" fill="${AMBER}" fill-opacity="0.8" stroke="none"/>`;
    }
    return `<circle cx="${cx}" cy="400" r="150" fill="${SOFT}" fill-opacity="0.08"/>
      <circle cx="${cx}" cy="400" r="150" stroke-width="3"/>
      <circle cx="${cx}" cy="400" r="104" stroke-opacity="0.55"/>
      <circle cx="${cx}" cy="400" r="72" stroke-dasharray="5 8" stroke-opacity="0.45"/>
      <circle cx="${cx}" cy="400" r="40" stroke-dasharray="3 7" stroke-opacity="0.35"/>
      <path d="M${cx - 34} 550h68v26h-68z M${cx - 34} 576h68v24h-68z" stroke-opacity="0.6"/>
      ${jets}`;
  };
  return blueprint(
    1200,
    800,
    `<g fill="none" stroke="${INK}" stroke-width="2" stroke-opacity="0.85">
      <rect x="160" y="180" width="880" height="460" stroke-opacity="0.4"/>
      ${tub(400)}${tub(800)}
    </g>
    ${dim(250, 210, 550, 210)}`,
  );
}

function planMaestro() {
  const rand = rng(23);
  let trees = '';
  const border = [
    [140, 120, 1460, 120],
    [1460, 120, 1500, 880],
    [1500, 880, 100, 900],
    [100, 900, 140, 120],
  ];
  for (const [ax, ay, bx, by] of border) {
    for (let t = 0.04; t < 1; t += 0.05) {
      const x = ax + (bx - ax) * t + (rand() - 0.5) * 14;
      const y = ay + (by - ay) * t + (rand() - 0.5) * 14;
      trees += `<circle cx="${r(x)}" cy="${r(y)}" r="${r(9 + rand() * 7)}"/>`;
    }
  }
  let rooms = '';
  for (let i = 0; i < 10; i++) rooms += `<path d="M${230 + i * 34} 190V250M${230 + i * 34} 270V330"/>`;
  for (let i = 0; i < 6; i++) rooms += `<path d="M190 ${360 + i * 30}H250M270 ${360 + i * 30}H330"/>`;
  let parking = '';
  for (let i = 0; i < 16; i++) parking += `<path d="M${610 + i * 30} 790V840"/>`;
  return blueprint(
    1600,
    1000,
    `<g fill="none" stroke="${INK}" stroke-width="2" stroke-opacity="0.85">
      <path d="M140 120L1460 120L1500 880L100 900Z" stroke-dasharray="14 8" stroke-opacity="0.6"/>
      <g fill="${SOFT}" fill-opacity="0.12" stroke="${SOFT}" stroke-opacity="0.5" stroke-width="1.5">${trees}</g>
      <path d="M180 760H1420M560 160V760" stroke="${SOFT}" stroke-width="14" stroke-opacity="0.18"/>
      <path d="M180 170H520V350H360V540H180Z" stroke-width="3"/>
      ${rooms}
      <rect x="380" y="390" width="140" height="150"/>
      <path d="M380 420H520M380 450H520" stroke-opacity="0.4"/>
      <rect x="190" y="580" width="230" height="110" fill="${SOFT}" fill-opacity="0.1"/>
      <path d="M190 602H420M190 624H420M190 646H420M190 668H420" stroke-opacity="0.35"/>
      <circle cx="465" cy="610" r="28" fill="${SOFT}" fill-opacity="0.1"/>
      <circle cx="465" cy="670" r="28" fill="${SOFT}" fill-opacity="0.1"/>
      <rect x="590" y="780" width="500" height="70" stroke-opacity="0.5"/>
      ${parking}
    </g>
    ${pitch(620, 200, 470, { stripes: 'checker', id: 'm1' })}
    ${pitch(1130, 180, 280, { stripes: 'bands', id: 'm2' })}
    ${pitch(1130, 470, 280, { stripes: 'bands', id: 'm3' })}
    <path d="M840 900V856" stroke="${AMBER}" stroke-width="4"/>
    <path d="M824 872L840 852L856 872" fill="none" stroke="${AMBER}" stroke-width="4"/>
    <g transform="translate(1480 960)" fill="none" stroke="${SOFT}" stroke-width="1.5"><circle r="22"/><path d="M0 -18L8 10L0 4L-8 10Z" fill="${SOFT}"/></g>
    <g transform="translate(60 962)"><rect width="40" height="8" fill="${SOFT}"/><rect x="40" width="40" height="8" fill="none" stroke="${SOFT}"/><rect x="80" width="40" height="8" fill="${SOFT}"/><rect x="120" width="40" height="8" fill="none" stroke="${SOFT}"/></g>`,
  );
}

/* ───────────────────────────── Marca provisional ───────────────────────── */
const favicon = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#000"/>
  <path d="M16 14h8v14h16V14h8v36h-8V36H24v14h-8z" fill="#f4f6fa"/>
  <path d="M10 56L58 10" stroke="#ffb020" stroke-width="5" stroke-linecap="round"/>
</svg>`;

out('images/hero/estadio-conceptual.svg', hero());
out('images/campus/plan-maestro-conceptual.svg', planMaestro());
out('images/campus/dormitorios.svg', dormitorios());
out('images/campus/canchas-sinteticas.svg', canchasSinteticas());
out('images/campus/cancha-natural.svg', canchaNatural());
out('images/campus/gimnasio.svg', gimnasio());
out('images/campus/alberca.svg', alberca());
out('images/campus/hidromasaje.svg', hidromasaje());
out('favicon.svg', favicon());
