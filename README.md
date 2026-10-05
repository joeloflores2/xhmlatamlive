# HXM LATAM

## Halcones Xtreme México

Sitio oficial de **Halcones Xtreme México / HXM LATAM** — *Donde el talento despega*.

Proyecto deportivo en desarrollo en Aguascalientes, México, enfocado en formación futbolística, educación, alto rendimiento y proyección hacia el fútbol profesional.

**Producción:** https://hxmlatam.com

---

## Índice

1. [Tecnología](#tecnología)
2. [Instalación y desarrollo local](#instalación-y-desarrollo-local)
3. [Comandos](#comandos)
4. [Variables de entorno](#variables-de-entorno)
5. [Estructura](#estructura)
6. [Cómo cambiar contenido](#cómo-cambiar-contenido)
7. [Cómo agregar imágenes](#cómo-agregar-imágenes)
8. [Formularios](#formularios)
9. [Analítica y cookies](#analítica-y-cookies)
10. [Deployment en Hostinger](#deployment-en-hostinger)
11. [Deployment en GitHub Pages](#deployment-en-github-pages)
12. [Dominio y DNS](#dominio-y-dns)
13. [Seguridad](#seguridad)
14. [Cumplimiento de contenido](#cumplimiento-de-contenido)
15. [Información pendiente](#información-pendiente)

---

## Tecnología

| Aspecto | Decisión |
| --- | --- |
| Generación | Generador estático propio en Node.js (`scripts/build.mjs`). Cada página se pre-renderiza a HTML real. |
| Dependencias | **Ninguna** en runtime ni en build. Sin riesgos de cadena de suministro ni actualizaciones forzadas. |
| Componentes | Funciones JavaScript que devuelven HTML (`src/components/`). |
| Contenido | Archivos de datos editables (`src/data/`). |
| Estilos | CSS moderno con variables (`src/styles/`), minificado y con hash de caché. |
| JavaScript del cliente | ~19 KB sin dependencias, mejora progresiva: el sitio es legible sin JS. |
| Tipografía | [Archivo](https://fonts.google.com/specimen/Archivo) (variable): extra condensada para titulares, ancho normal para lectura. |
| Tests | `node:test` (incluido en Node). |
| Hosting | Hostinger (Node.js o aplicación estática) o GitHub Pages mediante GitHub Actions. |

Requisitos: **Node.js 20 o superior** (recomendado 22, ver `.nvmrc`).

## Instalación y desarrollo local

```bash
git clone <URL-DEL-REPOSITORIO>
cd <carpeta>
npm ci                 # no descarga paquetes: valida el lockfile
cp .env.example .env   # opcional
npm run dev            # http://localhost:4321 (recompila al guardar)
```

Después de guardar un cambio, refresca el navegador.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Compila en modo desarrollo, sirve en `http://localhost:4321` y recompila al guardar. |
| `npm run preview` | Igual, sin vigilar cambios. |
| `npm run build` | Build de producción en `dist/`. |
| `npm start` | Servidor de producción (`server.mjs`) en el puerto `PORT` (3000 por defecto). Compila si falta `dist/`. |
| `npm run lint` | Sintaxis JS, CSS, lenguaje prohibido y búsqueda de secretos. |
| `npm test` | 36 pruebas: SEO, enlaces, accesibilidad, cumplimiento y seguridad. |
| `npm run check` | Lint + tests + build (lo mismo que ejecuta CI). |
| `npm run art` | Regenera las ilustraciones conceptuales SVG. |

Herramientas opcionales (requieren Python con Pillow y Playwright):

- `python3 scripts/generate-icons.py` regenera `favicon.ico`, `apple-touch-icon.png` y los íconos PWA.
- `python3 scripts/generate-og.py` regenera `public/og-image.jpg` desde `scripts/og-template.html`.

## Variables de entorno

Todas las variables son **públicas** (prefijo `PUBLIC_`): terminan en el HTML. **Nunca** pongas claves secretas aquí.

| Variable | Uso | Ejemplo |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | URL canónica | `https://hxmlatam.com` |
| `PUBLIC_GA_ID` | Google Analytics 4 | `G-XXXXXXXXXX` |
| `PUBLIC_GTM_ID` | Google Tag Manager | `GTM-XXXXXXX` |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel | `123456789012345` |
| `PUBLIC_CONTACT_ENDPOINT` | Endpoint general de formularios | `https://formspree.io/f/xxxxxx` |
| `PUBLIC_INVESTMENT_ENDPOINT` | Formulario de inversión (opcional) | Usa el general si está vacío |
| `PUBLIC_PLAYER_ENDPOINT` | Formulario de jugadores (opcional) | Usa el general si está vacío |
| `PUBLIC_MAP_URL` | Enlace de ubicación del campus | `https://maps.app.goo.gl/J4WKFbJHaZhM87AH6` |

- **Local:** archivo `.env` (ignorado por Git).
- **Producción:** GitHub → *Settings → Secrets and variables → Actions → pestaña **Variables*** → *New repository variable*.

Los valores se validan en el build: IDs con formato incorrecto o endpoints que no sean `https://` se ignoran con una advertencia. La Content-Security-Policy se ajusta automáticamente a los servicios activos.

## Estructura

```text
.
├── .github/
│   ├── workflows/deploy.yml     # CI: lint → tests → build → GitHub Pages
│   └── dependabot.yml           # Actualiza versiones de GitHub Actions
├── public/                      # Se copia tal cual al sitio
│   ├── CNAME                    # hxmlatam.com
│   ├── favicon.ico / favicon.svg / apple-touch-icon.png / og-image.jpg
│   ├── icons/                   # Íconos PWA
│   ├── logos/                   # Logotipo oficial (pendiente)
│   └── images/
│       ├── hero/ campus/ facilities/ players/ coaches/
│       └── education/ training/ gallery/
├── src/
│   ├── components/              # Header, Footer, Hero, Button, Card, Stats, Timeline,
│   │                            # Forms, TeamCard, CampusCard, Gallery, Modal, CTA, ...
│   ├── pages/                   # Una página por archivo + index.js (registro y sitemap)
│   ├── data/                    # CONTENIDO EDITABLE
│   │   ├── site.js              # Nombre, teléfono, dirección, redes, datos legales, cifras
│   │   ├── navigation.js        # Menús
│   │   ├── campus.js            # Instalaciones, entorno, galería
│   │   ├── programs.js          # Formación, educación, familias, club, inversión
│   │   ├── journey.js           # Ruta del jugador, etapas del proyecto, proyección
│   │   ├── team.js              # Equipo (placeholders)
│   │   ├── countries.js         # Mercados de captación
│   │   ├── institutions.js      # Respaldo institucional
│   │   └── testimonials.js      # Testimonios (vacío = sección oculta)
│   ├── styles/                  # variables · typography · globals · components · pages
│   ├── scripts/                 # JS del cliente (consentimiento, analítica, menú, formularios...)
│   ├── config/index.js          # Variables de entorno y CSP
│   └── utils/                   # Helpers HTML y enlaces
├── scripts/                     # build, dev, lint, generadores de arte e íconos
├── security/                    # Cabeceras HTTP: _headers (proxy) y htaccess (Apache/LiteSpeed)
├── server.mjs                   # Servidor de producción para Hostinger Node.js (npm start)
├── tests/                       # site.test.mjs · server.test.mjs
├── .env.example
└── package.json
```

## Cómo cambiar contenido

Casi todo el texto vive en `src/data/`. Ejemplos:

- **Teléfono o WhatsApp:** `src/data/site.js` → `contact`.
- **Correo institucional:** `src/data/site.js` → `contact.email` (hoy vacío → placeholder).
- **Redes sociales:** `src/data/site.js` → `social`. Al completar una URL aparece como enlace en el footer.
- **Razón social, RFC y correo de privacidad:** `src/data/site.js` → `legal`. Se reflejan en las páginas legales.
- **Equipo:** `src/data/team.js` → completa `name`, `credentials` y `photo`.
- **Permisos y autorizaciones:** `src/data/institutions.js` → `document` y, si se autoriza su publicación, `documentUrl` (PDF en `public/docs/`).
- **Etapa actual del proyecto:** `src/data/journey.js` → `currentStage` (ej. `'Planeación'`).
- **Testimonios:** `src/data/testimonials.js`. Solo testimonios reales y autorizados; la sección aparece automáticamente.
- **Colores:** `src/styles/variables.css` → bloque *Identidad* (`--color-primary`, `--color-accent`, etc.).
- **Logotipo:** coloca el archivo en `public/logos/` y asigna su ruta en `src/data/site.js` → `logo`. Reemplaza el monograma tipográfico provisional.

### Placeholders

Toda información no proporcionada se muestra como `PLACEHOLDER — INFORMACIÓN POR PROPORCIONAR`. **No se inventaron** nombres, permisos, folios, cifras, testimonios, razón social ni URLs. El texto del placeholder se cambia en `src/data/site.js` → `PLACEHOLDER` (por ejemplo, a "Próximamente" al lanzar).

### Agregar una página

1. Crea `src/pages/mi-pagina.js` siguiendo cualquier página existente (`path`, `title`, `description`, `render`).
2. Regístrala en `src/pages/index.js` (entra al sitemap automáticamente).
3. Si va en el menú, agrégala en `src/data/navigation.js`.

## Cómo agregar imágenes

Usa las carpetas de `public/images/` según su tema. Recomendaciones:

1. Exporta en **WebP o AVIF** (y JPG de respaldo), a 1600–2400 px de ancho para imágenes completas, comprimidas (< 300 KB).
2. Referencia las rutas sin `public`: `/images/campus/residencia.webp`.
3. Para formatos modernos usa el componente `Picture` de `src/components/Image.js` con `sources`.
4. En `src/data/campus.js`, cada instalación tiene `image`, `alt` y `conceptual`.

> **Importante:** las imágenes actuales son **ilustraciones conceptuales** y están etiquetadas como *Imagen conceptual / proyecto en desarrollo*. Marca `conceptual: false` **solo** si la imagen muestra instalaciones reales ya construidas. No publiques fotografías que sugieran que el campus ya existe si sigue en construcción.

- **Hero:** reemplaza `public/images/hero/estadio-conceptual.svg` o cambia la ruta en `src/components/Hero.js`.
- **Galería:** agrega elementos a `gallery` en `src/data/campus.js`; la sección aparece automáticamente con visor ampliado.

## Formularios

Hay tres formularios: contacto, inversión y jugadores. El sitio **no tiene backend**: cada formulario envía JSON por `POST` al endpoint configurado.

**Opción recomendada: Formspree**

1. Crea un formulario en Formspree y copia su URL (`https://formspree.io/f/xxxxxx`).
2. Guárdala como variable `PUBLIC_CONTACT_ENDPOINT` (y opcionalmente las específicas).
3. Haz un nuevo deploy.

**Otras opciones (Resend, Supabase, Firebase, CRM, API propia):** necesitan una función de servidor intermedia (Supabase Edge Function, Cloudflare Worker, etc.) que reciba el JSON, valide, guarde o envíe el correo y responda `200`. Las API keys viven **solo** en esa función, nunca en este repositorio. La URL pública de la función va en la variable de entorno.

Sin endpoint configurado, los formularios validan y muestran un mensaje que invita a escribir por WhatsApp. No simulan un envío.

Campos que se envían: `formulario`, `pagina` y los `name` de cada campo (ver `src/components/Forms.js`).

**Protección incluida:**
- Validación accesible.
- Saneamiento de caracteres de control.
- Honeypot `_gotcha` (compatible con Formspree).
- Tiempo mínimo de llenado.

**Datos de menores (formulario de jugadores):**
- No se piden datos sensibles: salud, identificaciones ni fotografías.
- Si el jugador es menor de 18 años, son obligatorios el nombre del tutor y su confirmación.

> El servidor receptor debe repetir la validación y aplicar retención mínima de datos, en especial para datos de menores.

## Analítica y cookies

- GA4, GTM y Meta Pixel **solo se cargan si** existe su ID **y** la persona acepta el aviso de cookies.
- Sin IDs configurados no hay aviso de cookies ni scripts de terceros.
- La decisión se guarda en `localStorage` (`hxm-consent-v1`), sin datos personales. Se puede cambiar desde *Preferencias de cookies* en el footer.

**Eventos disponibles:**
- `whatsapp_click`
- `investment_interest`
- `player_interest`
- `contact_submit`
- `form_start`
- `form_submit`

Con GTM, los eventos llegan como `dataLayer.push({ event: '<nombre>' })`.

> Si usas GTM con etiquetas *Custom HTML*, la CSP estricta puede bloquearlas. Prefiere etiquetas nativas o ajusta la CSP en `src/config/index.js`.

## Deployment en Hostinger

En hPanel: **Sitios web → Agregar sitio web → "Sube tu código, nosotros lo alojamos"** y conecta este repositorio de GitHub. Hostinger ofrece dos modos; ambos funcionan.

### Opción A — Node.js (recomendada)

Sirve el sitio con `server.mjs`, que agrega todas las cabeceras de seguridad (HSTS, `X-Frame-Options`, `Permissions-Policy`, `nosniff`), caché larga para `/assets/`, compresión gzip, página 404 y redirección `www` → dominio principal.

| Campo en Hostinger | Valor |
| --- | --- |
| Framework | Otro / Express (sin framework) |
| Versión de Node.js | 22 (mínimo 20) |
| Rama | `main` |
| Comando de instalación | `npm ci` (no descarga paquetes) |
| Comando de build | `npm run build` |
| Comando de inicio | `npm start` |
| Archivo de entrada | `server.mjs` |
| Directorio de salida | `dist` (si lo solicita) |

El servidor escucha en la variable `PORT` que asigna Hostinger. Si el build no se ejecutó, compila al arrancar.

### Opción B — Aplicación estática

| Campo en Hostinger | Valor |
| --- | --- |
| Comando de build | `npm run build` |
| Directorio de salida / publicación | `dist` |

El build genera `dist/.htaccess` (a partir de `security/htaccess`) con HTTPS forzado, redirección `www`, cabeceras de seguridad, caché y la página 404. Lo aplica el servidor Apache/LiteSpeed de Hostinger.

> **Sin despliegue desde Git:** ejecuta `npm run build` en tu equipo y sube el **contenido** de `dist/` (incluidos los archivos ocultos `.htaccess`) a `public_html` con el Administrador de archivos o FTP.

### Variables de entorno

En la configuración del sitio en Hostinger (*Variables de entorno*) agrega las mismas `PUBLIC_*` de la tabla de [Variables de entorno](#variables-de-entorno). Se leen **durante el build**: tras cambiarlas, vuelve a desplegar.

### Dominio

Conecta `hxmlatam.com` desde hPanel (*Dominios → Conectar dominio*). Si el dominio está registrado en Hostinger, el DNS se configura solo; si está en otro registrador, usa los registros o nameservers que indica hPanel **en lugar** de los de GitHub Pages de la sección [Dominio y DNS](#dominio-y-dns). Activa el certificado SSL gratuito en *Seguridad → SSL*.

Si publicas en Hostinger, desactiva el workflow de GitHub Pages (o deja de configurar Pages) para no tener dos sitios con el mismo dominio. El workflow sigue siendo útil para validar lint y tests en cada push.

## Deployment en GitHub Pages

El workflow `.github/workflows/deploy.yml`:

1. Instala dependencias (`npm ci`).
2. Ejecuta `npm run lint`.
3. Ejecuta `npm test`.
4. Ejecuta `npm run build` con las variables del repositorio.
5. Publica `dist/` en GitHub Pages. Esto solo ocurre en la rama `main`; los Pull Requests solo se validan.

**Configuración única:**

1. Sube el código a la rama `main`. Si tu rama principal tiene otro nombre, ajústalo en el workflow.
2. Ve a GitHub → *Settings → Pages → Build and deployment → Source:* **GitHub Actions**.
3. Ve a *Settings → Secrets and variables → Actions → Variables* y agrega las variables `PUBLIC_*` que quieras activar.
4. Haz push a `main` o ejecuta el workflow manualmente (*Actions → Build y deploy → Run workflow*).

## Dominio y DNS

El dominio principal es el apex **`hxmlatam.com`**; `www.hxmlatam.com` redirige a él.

### 1. En GitHub

1. Ve a *Settings → Pages → Custom domain* y escribe `hxmlatam.com`. Guarda.
2. Cuando el DNS verifique y el certificado esté listo (puede tardar hasta 24 h), activa **Enforce HTTPS**.
3. Recomendado: verifica el dominio en *Settings de tu cuenta u organización → Pages → Add a domain*. Así evitas que otra cuenta lo reclame.

> Con despliegue por GitHub Actions, GitHub usa el dominio configurado en *Settings*. El archivo `public/CNAME` se incluye por compatibilidad, pero no sustituye ese paso.

### 2. En tu proveedor de DNS

Elimina primero cualquier registro A, AAAA o CNAME previo del apex o de `www` (por ejemplo, páginas de estacionamiento del registrador).

| Tipo | Nombre / Host | Valor |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA (opcional) | `@` | `2606:50c0:8000::153` |
| AAAA (opcional) | `@` | `2606:50c0:8001::153` |
| AAAA (opcional) | `@` | `2606:50c0:8002::153` |
| AAAA (opcional) | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `<usuario-u-organizacion>.github.io` |

Si tu proveedor admite registros `ALIAS` o `ANAME` para el apex, puedes usarlos apuntando a `<usuario-u-organizacion>.github.io` en lugar de los registros A.

Verifica la propagación con:

```bash
dig hxmlatam.com +noall +answer
dig www.hxmlatam.com +noall +answer
```

Consulta los valores vigentes en la documentación oficial de GitHub Pages ("Managing a custom domain") antes de configurarlos.

## Seguridad

- **HTTPS** forzado desde GitHub Pages.
- **Content-Security-Policy** en cada página. Se genera según los servicios activos y no permite scripts inline.
- **Referrer-Policy** `strict-origin-when-cross-origin`.
- **Enlaces externos** con `rel="noopener noreferrer"`.
- **Sin secretos en el repositorio:** el lint busca patrones de claves y `.env` está en `.gitignore`.
- **`localStorage`** solo guarda la decisión de cookies.

**En Hostinger** las cabeceras de seguridad se aplican automáticamente (`server.mjs` en Node.js, `dist/.htaccess` en modo estático).

**Limitación de GitHub Pages:** no permite cabeceras HTTP propias. `X-Frame-Options`, `Permissions-Policy`, HSTS y `nosniff` están listas en `security/_headers`. Para activarlas, sirve el sitio detrás de Cloudflare (*Transform Rules*) o en Netlify o Cloudflare Pages. Ver `security/README.md`.

## Cumplimiento de contenido

El sitio comunica un **proyecto en desarrollo**.

- **Lenguaje permitido:** *proyección, oportunidades, desarrollo, preparación, formación, exposición, participación, modelo de participación.*
- **Frases prohibidas:** el lint y los tests **bloquean el build** si aparecen promesas como contratos o transferencias garantizadas, rendimientos fijos o retorno asegurado. La lista está en `scripts/lib/rules.mjs`.
- **Aviso de inversión:** la página de Inversión incluye el aviso obligatorio de carácter informativo.
- **Educación:** usa "podrán acceder… de acuerdo con los requisitos y procesos correspondientes".
- **Páginas legales:** son **textos base sujetos a revisión legal**. Antes del lanzamiento deben validarse con un abogado conforme a la legislación mexicana vigente, incluida la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Lo mismo aplica a cualquier modelo de participación o inversión.

## Información pendiente

**Identidad**
- [ ] Logotipo oficial y autorización de uso.
- [ ] Imagen social definitiva (`public/og-image.jpg`).

**Contacto y redes**
- [ ] Correo institucional.
- [ ] Correo para solicitudes de privacidad.
- [ ] URLs de Facebook, Instagram, TikTok, YouTube y LinkedIn.
- [ ] Confirmar que el enlace de Maps corresponde al campus (Ciudad Maderas).

**Legal**
- [ ] Razón social, RFC y representante legal.
- [ ] Revisión legal de aviso de privacidad, términos y cookies.

**Respaldo institucional**
- [ ] Tipo, número y fecha de cada permiso o autorización (Gobierno del Estado, Instituto del Deporte, FMF).
- [ ] Autorización para publicar documentos o logotipos institucionales.

**Imágenes y contenido**
- [ ] Renders oficiales y fotografías del campus y de entrenamientos.
- [ ] Nombres, trayectoria y fotografías del equipo.
- [ ] Etapa actual del proyecto.
- [ ] Edades, categorías y requisitos de admisión del programa de jugadores.
- [ ] Testimonios reales y autorizados.
- [ ] Estadísticas de Aguascalientes, solo si provienen de fuentes oficiales.

**Inversión**
- [ ] Modelo de participación e información de inversión, tras revisión jurídica.

**Configuración técnica**
- [ ] Endpoints de formularios.
- [ ] IDs de analítica.

---

© 2026 Halcones Xtreme México / HXM LATAM. Todos los derechos reservados.
