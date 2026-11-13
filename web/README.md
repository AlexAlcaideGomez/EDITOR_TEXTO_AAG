# Editor AAG — sitio web

Web de producto de **Editor AAG** (la app Java Swing de `src/Tema6/EDITOR_TEXTO_AAG/Interfaz.java`).
Incluye una **versión web del editor plenamente funcional**, la **descarga real** de la app de escritorio
(`.jar` compilado desde el código del repositorio) y un formulario de sugerencias conectado a GitHub Issues.

## Stack

- Next.js 16 (App Router) con exportación 100 % estática (`out/`) · React 19 · TypeScript estricto
- Tailwind CSS 4 · Lucide Icons
- Fuentes autoalojadas con `next/font/local` (Instrument Serif, Inter y JetBrains Mono)
- Sin librería de animación: las animaciones se hacen con CSS y un único `IntersectionObserver`
  (`src/components/ui/Reveal.tsx`). Todas respetan `prefers-reduced-motion`.

## Comandos

```bash
npm install
npm run dev         # desarrollo en http://localhost:3000
npm run build       # genera la web estática en out/
npm run start       # sirve out/ en local
npm run typecheck
npm run build:jar   # recompila public/descargas/editor-aag.jar desde el código Java (requiere JDK 11+)
```

Cada vez que cambie `Interfaz.java`, ejecuta `npm run build:jar` y vuelve a compilar la web: el tamaño
de descarga que se muestra en la página se lee del archivo real al compilar.

## Configuración (variables de entorno al compilar)

| Variable | Para qué | Valor por defecto |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica, sitemap, Open Graph y datos estructurados | `https://alexalcaidegomez.github.io/EDITOR_TEXTO_AAG` |
| `NEXT_PUBLIC_BASE_PATH` | Subruta si se publica en GitHub Pages de proyecto | *(vacío)* |
| `NEXT_PUBLIC_OWNER_NAME` | Titular (aviso legal, LSSI-CE art. 10) | *(vacío → «Pendiente de completar»)* |
| `NEXT_PUBLIC_OWNER_TAX_ID` | NIF del titular | *(vacío)* |
| `NEXT_PUBLIC_OWNER_ADDRESS` | Domicilio del titular | *(vacío)* |
| `NEXT_PUBLIC_OWNER_EMAIL` | Email de contacto (aviso legal, privacidad y pie de página) | *(vacío → contacto por GitHub)* |

## Qué funciona de verdad y qué falta por activar

| Elemento | Estado |
| --- | --- |
| Editor web (negrita, cursiva, subrayado, 4 tipografías, 7 tamaños, color, deshacer/rehacer, quitar formato) | ✅ Funciona en el navegador |
| Guardado automático del borrador | ✅ `localStorage` del navegador (clave `editor-aag:borrador:v1`). No se envía a ningún servidor |
| Exportar `.html` / `.txt` y copiar con formato | ✅ |
| Pegado limpio y saneado del HTML guardado/exportado | ✅ Lista blanca en `src/lib/sanitize.ts` |
| Descarga de la app de escritorio | ✅ `public/descargas/editor-aag.jar`, compilado del código del repo |
| Formulario de sugerencias | ✅ Valida los campos y abre GitHub con la incidencia redactada. Publicarla requiere cuenta de GitHub (es pública). **No hay backend propio**: si se quiere recibir mensajes privados (email), hay que añadir un servicio de formularios o una función serverless y sus credenciales |
| Testimonios | ⚠️ Solo ejemplos **marcados como tales** en `src/lib/content.ts`. Sustitúyelos por opiniones reales con permiso y pon `isDemo: false` |
| Aviso legal | ⚠️ Faltan los datos del titular (variables `NEXT_PUBLIC_OWNER_*`) |

## Despliegue

La carpeta `out/` se puede subir a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, un servidor propio…).

**GitHub Pages:** hay un flujo listo en `.github/workflows/deploy-web.yml`. Para activarlo:

1. En GitHub → *Settings → Pages*, elige **Source: GitHub Actions**.
2. En *Actions*, lanza manualmente **Deploy web to GitHub Pages**.

## Estructura

```
src/
  app/            layout, página principal, páginas legales, sitemap, robots, manifest, OG, 404, fuentes
  components/     una sección por archivo (Hero, Value, Features, EditorSection, LiveEditor, Comparison,
                  Install, Testimonials, Faq, Feedback, FinalCta, Footer) + ui/ (Button, Logo, Reveal…)
  lib/            site.ts (configuración central), content.ts (FAQ y testimonios), sanitize.ts, jar.ts
public/descargas/ editor-aag.jar
scripts/          build-jar.sh
```
