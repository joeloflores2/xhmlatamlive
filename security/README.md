# Seguridad

| Medida | Dónde | Estado en Hostinger |
| --- | --- | --- |
| HTTPS | hPanel → *Seguridad → SSL*; `.htaccess` fuerza la redirección en modo estático | Activo al instalar el SSL |
| Content-Security-Policy | `<meta>` en cada página, generada en `src/config/index.js` según las variables activas | Activo |
| Referrer-Policy | `<meta name="referrer">` y cabecera HTTP | Activo |
| X-Frame-Options / `frame-ancestors` | `server.mjs` (Node.js) · `security/htaccess` → `dist/.htaccess` (estático) | Activo |
| Permissions-Policy, HSTS, nosniff, COOP | `server.mjs` (Node.js) · `security/htaccess` → `dist/.htaccess` (estático) | Activo |
| Validación y saneamiento | `src/scripts/06-forms.js` (cliente) | Activo — **repetir en el servidor receptor** |
| Anti-spam | Honeypot `_gotcha` + tiempo mínimo de llenado | Activo |
| Secretos | Solo variables `PUBLIC_*` (públicas); lint detecta patrones de claves | Activo |

`security/_headers` contiene las mismas cabeceras en formato Netlify / Cloudflare Pages,
por si algún día el sitio se sirve desde esas plataformas o detrás de Cloudflare.

Si cambias una cabecera, actualízala en los tres lugares: `server.mjs`, `htaccess` y `_headers`.
