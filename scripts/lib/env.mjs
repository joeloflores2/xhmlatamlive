/** Carga variables de entorno: .env (si existe) + process.env (tiene prioridad). */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadEnv(root = process.cwd()) {
  const file = resolve(root, '.env');
  const fromFile = {};
  if (existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      fromFile[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
  const env = { ...fromFile };
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith('PUBLIC_') && value !== undefined) env[key] = value;
  }
  return env;
}
