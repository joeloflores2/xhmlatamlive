# Seguridad

| Medida | Dónde | Estado en GitHub Pages |
| --- | --- | --- |
| HTTPS | Settings → Pages → *Enforce HTTPS* | Activo al configurar el dominio |
| Content-Security-Policy | `<meta>` en cada página, generada en `src/config/index.js` según las variables activas | Activo |
| Referrer-Policy | `<meta name="referrer">` | Activo |
| X-Frame-Options / `frame-ancestors` | `security/_headers` | Requiere proxy (Cloudflare) u otro hosting |
| Permissions-Policy, HSTS, nosniff | `security/_headers` | Requiere proxy (Cloudflare) u otro hosting |
| Validación y saneamiento | `src/scripts/06-forms.js` (cliente) | Activo — **repetir en el servidor receptor** |
| Anti-spam | Honeypot `_gotcha` + tiempo mínimo de llenado | Activo |
| Secretos | Solo variables `PUBLIC_*` (públicas); lint detecta patrones de claves | Activo |

Con Cloudflare como proxy, las cabeceras de `security/_headers` se configuran en
**Rules → Transform Rules → Modify Response Header**.

## Hostinger

- **Node.js:** `server.mjs` envía las mismas cabeceras de `security/_headers`.
- **Aplicación estática / hosting compartido:** `security/htaccess` se copia como `dist/.htaccess` en cada build.

Si cambias una cabecera, actualízala en los tres lugares: `_headers`, `htaccess` y `server.mjs`.
