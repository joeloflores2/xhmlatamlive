/** Reglas compartidas por lint y tests. */

/** Lenguaje prohibido por el brief (promesas deportivas o financieras). */
export const FORBIDDEN_PHRASES = [
  'contrato garantizado',
  'transferencia garantizada',
  'llegarás a Europa',
  'serás profesional',
  'ganancias garantizadas',
  'ganancia garantizada',
  'retorno garantizado',
  'ganancia segura',
  'rendimiento fijo',
  'retorno asegurado',
  'multiplica tu dinero',
  'recupera tu inversión',
];

/** Patrones de secretos comunes. */
export const SECRET_PATTERNS = [
  ['clave privada', /-----BEGIN (RSA |EC )?PRIVATE KEY-----/],
  ['AWS', /AKIA[0-9A-Z]{16}/],
  ['Stripe', /sk_live_[0-9a-zA-Z]{16,}/],
  ['Resend', /re_[A-Za-z0-9]{8}_[A-Za-z0-9]{16,}/],
  ['Supabase service role', /service_role[^\n]{0,40}eyJ[A-Za-z0-9_-]{20,}/],
  ['GitHub token', /gh[pousr]_[A-Za-z0-9]{36,}/],
  ['Google API key', /AIza[0-9A-Za-z_-]{35}/],
];

/** Normaliza texto para comparar sin acentos ni mayúsculas. */
export const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
