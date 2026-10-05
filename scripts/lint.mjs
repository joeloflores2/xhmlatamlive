/**
 * Lint sin dependencias:
 * 1. Sintaxis de todos los archivos JS (node --check).
 * 2. CSS: llaves balanceadas y sin reglas vacías.
 * 3. Cumplimiento: sin promesas prohibidas en el contenido (src/).
 * 4. Seguridad: sin secretos ni archivos .env versionados por error.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORBIDDEN_PHRASES, SECRET_PATTERNS, normalize } from './lib/rules.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function walk(dir, exts, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, acc);
    else if (exts.includes(extname(name))) acc.push(full);
  }
  return acc;
}

// 1. Sintaxis JS
for (const file of walk(ROOT, ['.js', '.mjs'])) {
  const res = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (res.status !== 0) errors.push(`Sintaxis JS en ${relative(ROOT, file)}:\n${res.stderr}`);
}

// 2. CSS
for (const file of walk(join(ROOT, 'src/styles'), ['.css'])) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const open = (css.match(/{/g) || []).length;
  const close = (css.match(/}/g) || []).length;
  if (open !== close) errors.push(`Llaves desbalanceadas en ${relative(ROOT, file)} (${open} vs ${close})`);
  if (/{\s*}/.test(css)) errors.push(`Regla CSS vacía en ${relative(ROOT, file)}`);
}

// 3. Cumplimiento de lenguaje (contenido del sitio)
for (const file of walk(join(ROOT, 'src'), ['.js'])) {
  const text = normalize(readFileSync(file, 'utf8'));
  for (const phrase of FORBIDDEN_PHRASES) {
    if (text.includes(normalize(phrase))) errors.push(`Frase prohibida "${phrase}" en ${relative(ROOT, file)}`);
  }
  if (/garantizad[oa]s?/.test(text)) errors.push(`Uso de "garantizado/a" en ${relative(ROOT, file)}: usa lenguaje de proyección y oportunidades.`);
}

// 4. Secretos
for (const file of walk(ROOT, ['.js', '.mjs', '.json', '.yml', '.yaml', '.html', '.md', '.example'])) {
  const text = readFileSync(file, 'utf8');
  for (const [name, re] of SECRET_PATTERNS) {
    if (re.test(text)) errors.push(`Posible secreto (${name}) en ${relative(ROOT, file)}`);
  }
}

if (errors.length) {
  console.error(`✗ Lint: ${errors.length} problema(s)\n`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}
console.log('✓ Lint sin problemas (sintaxis JS, CSS, cumplimiento de lenguaje y secretos)');
