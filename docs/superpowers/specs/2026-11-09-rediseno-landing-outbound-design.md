# Rediseño de code-assurance.com para outbound — diseño

- Fecha: 2026-11-09
- Branch: `redesign/outbound-landing`
- Diseño visual aprobado: tableros "Home completa — escritorio" y "Home completa — 390 px" en Claude Design
  (https://claude.ai/artifact/Xkoa2YhjSreF2Rodj8mjpg, privado). El tablero es la referencia de layout, copy y
  movimiento; esta spec define cómo se construye.

## 1. Objetivo

Que un CTO o VP de Ingeniería de EE.UU. que llega desde un mensaje frío entienda en segundos qué hace Code
Assurance, por qué es distinto y cómo empezar, y que nada en la página le haga dudar de que la empresa es seria.

### Criterios de éxito (todos verificables)

1. El HTML exportado de `/`, `/es/` y `/how-we-work/` ya contiene el titular, el mapa del codebase y todas las secciones: se
   ven sin esperar JavaScript. No hay preloader.
2. Ningún texto de la web contiene cifras sin respaldo (`99.9%`, `10x`, `Zero downtime`) ni menciona NPM,
   `npx`, "package" referido al agente o `qaa-agent`. El agente se llama siempre "our AI QA agent" /
   "nuestro agente de QA con IA".
3. Ningún link apunta a `#` vacío.
4. Ninguna página tiene scroll horizontal a 375 px ni a 1280 px.
5. `/` se sirve con `<html lang="en">` y `/es/` con `<html lang="es">`, sin `<html>` anidados.
6. Con `prefers-reduced-motion: reduce` no corre ninguna animación y todo el contenido queda visible.
7. Sin `NEXT_PUBLIC_BOOKING_URL`, ningún botón de agenda aparece y el CTA principal pasa a ser el mail.
8. El favicon y los íconos son el escudo de Code Assurance, no el de Next/Vercel.
9. `tsc --noEmit`, `eslint`, los tests y `next build` pasan.
10. El JavaScript de primera carga de `/` es menor que el de hoy (se mide en `main` antes de empezar).

## 2. Decisiones tomadas con el usuario

| Tema | Decisión |
|---|---|
| Referencia de animación | Emil Kowalski, con mucha más vida de la que él usaría: componentes animados de 21st.dev |
| Dirección visual | "B · mapa del codebase" en el hero + el PR en borrador en la sección del agente |
| Logo | Escudo menta con `</>` blanco: `CodeAssurance_shield.svg`. No se rediseña. El escudo azul 3D no se usa |
| Verde de la marca | `#67d69e`, hover `#84e4b5` (el del logo); reemplaza al `#00ff88` actual |
| Agenda | El link no existe todavía: variable `NEXT_PUBLIC_BOOKING_URL`; vacía = sin botón |
| Páginas de servicio | Nuevo estilo, mismo texto, una sola plantilla |
| Sección de confianza | Experiencia del equipo en texto ("Our engineers have delivered QA on teams at…"), sin logos |
| Legales | Solo página de privacidad; sin términos (van en el contrato) |
| Formulario | Simplificado: nombre, mail de trabajo, empresa, teléfono opcional, mensaje. Sigue en Formspree |
| Enfoque técnico | Reescribir la home en el mismo Next.js; sacar three.js, GSAP, Lenis y el preloader; mantener `motion` |

## 3. Arquitectura

### 3.1 Rutas (las URLs públicas no cambian)

```
app/
  global-not-found.tsx                 404 para todo el sitio (experimental.globalNotFound)
  globals.css                          tokens y estilos base
  (en)/layout.tsx                      <html lang="en">, fuentes, header y footer
  (en)/page.tsx                        /
  (en)/services/[slug]/page.tsx        /services/<slug>/   (generateStaticParams con los 4 slugs)
  (en)/privacy/page.tsx                /privacy/           (nueva)
  (en)/how-we-work/page.tsx            /how-we-work/       (nueva: el one-pager de outbound, ver 7.1)
  (es)/es/layout.tsx                   <html lang="es">
  (es)/es/page.tsx                     /es/
  (es)/es/services/[slug]/page.tsx     /es/services/<slug>/
  (es)/es/privacy/page.tsx             /es/privacy/        (nueva)
```

- Slugs: `automated-testing`, `performance-audit`, `security-review`, `code-quality`.
- Dos layouts raíz con route groups, como indica la documentación de Next.js. Así cada idioma tiene su
  `lang` y se elimina el `<html>` anidado de hoy.
- Con varios layouts raíz no hay un layout común para el 404, por eso va `app/global-not-found.tsx` con
  `experimental.globalNotFound: true`. **A verificar en el primer build:** que el export estático genere
  `out/404.html`. Si no lo genera, la alternativa es un único layout raíz con `lang="en"` y `lang="es"` en
  el `<main>` de las páginas en español, y se documenta el desvío.
- `next.config.ts` mantiene `output: "export"`, `trailingSlash: true` e `images.unoptimized`.

### 3.2 Contenido separado del markup

- `content/types.ts`: el tipo `SiteContent` con todas las cadenas de la home, header, footer, formulario y
  privacidad. Las listas (módulos del mapa, planes, pasos) son arrays tipados.
- `content/en.ts` y `content/es.ts`: implementan `SiteContent`. TypeScript obliga a que los dos idiomas
  tengan las mismas claves.
- `content/services/en.ts` y `content/services/es.ts`: el texto actual de las 8 páginas de servicio,
  pasado a datos sin cambiar el contenido.
- `content/how-we-work.ts`: el texto del one-pager de outbound, solo en inglés.
- Los componentes reciben el contenido por props. No hay componentes duplicados por idioma.

### 3.3 Componentes

```
components/
  site/        Header, Footer, LanguageSwitch, BookingLink, SectionHeader, Logo
  home/        Hero, CoverageMap, AgentRun, DraftPullRequest, TriageDemo, StackDiagram,
               StackMarquee, StartingPoints, ProcessTimeline, Plans, Audits, Team, Start, ContactForm
  services/    ServicePage (plantilla)
  ui/          componentes instalados de los registros (ver 5.1), adaptados a los tokens
lib/
  utils.ts     cn() (ya existe)
  booking.ts   lee y valida NEXT_PUBLIC_BOOKING_URL
  contact.ts   validación del formulario y envío a Formspree
```

- Las secciones son Server Components. Solo son Client Components las piezas con estado, medición o
  animación ligada al scroll: `FlickeringGrid`, `TextRotate`, `CoverageMap`, `AgentRun` (terminal),
  `TriageDemo`, `StackDiagram` (animated beam), `ProcessTimeline`, `Spotlight`, `BlurFade`, `TextReveal`,
  `TextHoverEffect` y `ContactForm`.
- Todo el texto de esas piezas también llega en el HTML del servidor; la animación solo cambia cómo aparece.

### 3.4 Agenda y formulario

- `lib/booking.ts` exporta `bookingUrl: string | null`. Si la variable está vacía devuelve `null` y
  `BookingLink` no renderiza nada. Si tiene un valor que no empieza con `https://`, el build falla con un
  error que dice qué variable revisar. No se aceptan valores mal formados en silencio.
- `ContactForm` envía a Formspree, con el mismo formulario que hoy (`mlglpzgn`), por `fetch` con
  `Accept: application/json`. Los campos van con `<label>` reales. El mail se valida con `type="email"` y
  required. El teléfono es opcional y acepta cualquier formato (`+1 (415) 555-0100` incluido). Mantiene el
  honeypot `_gotcha`. Los errores de Formspree o de red se muestran en línea con el paso siguiente
  ("escribinos a …"); ningún error se traga.

### 3.5 Dependencias

- Salen: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react`, `lenis`.
- Animación: `framer-motion` se reemplaza por `motion`, su paquete sucesor, que es el que importan los
  componentes actuales de Magic UI y Aceternity (`motion/react`). Si alguno todavía importa `framer-motion`,
  se ajusta el import al instalarlo.
- Se quedan `clsx` y `tailwind-merge`.
- Fuentes: `next/font/google` con Archivo (eje de ancho, para los títulos expandidos) e IBM Plex Mono. Se
  descargan en el build y se sirven desde el propio sitio: el navegador no le pide nada a Google.

### 3.6 Lo que se borra

`components/sections/*`, `app/es/components/section-es/*`, `app/HomeClient.tsx`, `app/es/HomeClientEs.tsx`,
`components/three/AbstractMesh.tsx`, `hooks/useLenis.ts`, `components/ui/ClutchWidget.tsx`,
`components/ui/ContactModal.tsx`, los 8 `*Client.tsx` de servicios y los `.svg` de la plantilla de Next en
`public/`. `paquetes.txt` dice que se puede borrar; se borra.

No se tocan los archivos compilados de la raíz (`index.html`, `_next/`, `es/index.html`, etc.) ni `docs/`:
publicar es un paso aparte (ver 8).

## 4. Sistema visual

### 4.1 Tokens (`globals.css`, `@theme`)

| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#000000` | fondo |
| `--color-paper` | `#f3f5f2` | texto principal |
| `--color-soft` | `#c9cfca` | texto secundario |
| `--color-muted` | `#9aa39c` | etiquetas, metadatos |
| `--color-dim` | `#5b635c` | estados inactivos |
| `--color-line` | `#252a26` | líneas finas, bordes |
| `--color-surface` | `#0c0f0d` | tarjetas (PR, terminal) |
| `--color-mint` | `#67d69e` | marca, "pasó", CTA principal |
| `--color-mint-hover` | `#84e4b5` | hover del CTA |
| `--color-bug` | `#f87171` | bug real |
| `--color-wait` | `#fbbf24` | esperando aprobación |

Contraste: todo texto sobre negro cumple 4.5:1, incluido `--color-muted` (7.9:1). `--color-dim` solo se usa
en elementos decorativos o en texto de 24 px o más.

### 4.2 Tipografía

- Títulos: Archivo 700, `font-stretch: 125%`, mayúsculas, `letter-spacing: -0.01em`. Hero:
  `clamp(31px, 4.9vw, 62px)`; secciones: `clamp(27px, 3.4vw, 42px)`.
- Texto: Archivo 400 con ancho normal, 16.5 px, `line-height: 1.55`.
- Etiquetas, código, rutas y datos: IBM Plex Mono 12–13.5 px. Las etiquetas de sección van en mayúsculas con
  tracking de `0.08em`.
- Wordmark "Code Assurance" en Archivo 800 con ancho normal, al lado del escudo.

### 4.3 Layout

- Contenedor de 1280 px de ancho máximo, con márgenes laterales `clamp(16px, 3.2vw, 40px)`.
- Estética de hoja de datos: líneas de 1 px, grillas con `gap: 1px` sobre `--color-line` y secciones
  numeradas (`00 / Overview` … `06 / Start`).
- Cada sección arranca con la etiqueta numerada en una columna de 160 px y el título con su intro al lado.
  En pantallas angostas se apilan.
- Header fijo arriba (sticky) con fondo negro translúcido y blur.

## 5. Movimiento

### 5.1 Componentes (todos con licencia MIT; se instalan desde su registro original, no hace falta cuenta en 21st.dev)

| Dónde | Componente | Origen | Comportamiento |
|---|---|---|---|
| Hero, fondo | Flickering Grid | Magic UI | Canvas de cuadritos menta que titilan; enmascarado arriba a la derecha |
| Hero, titular | Text Rotate | Fancy Components | Rota *product → stack → sprints → business rules → release rhythm* cada 2.6 s; el texto accesible dice "product" |
| Hero, mapa | Number Ticker | Magic UI | Los contadores suben de 0 al valor al cargar; barrido de escaneo una vez |
| Hero, mapa | (propio) | — | Cada módulo es un botón; el seleccionado muestra abajo qué encontró el agente (`aria-live`) |
| Agente | Terminal | Magic UI | La corrida de 8 pasos se escribe al entrar en pantalla |
| Agente | Border Beam | Magic UI | Luz que recorre el borde del PR en borrador |
| Agente | Shine Border | Magic UI | Brillo en la falla pendiente hasta que se toca "Approve fix" |
| Agente | Animated Beam | Magic UI | repo / tickets / test plans → agente → draft PRs / test cases / bug reports |
| Agente | Marquee | Magic UI | Dos filas de frameworks y lenguajes en sentidos opuestos; se pausa con el hover |
| Tarjetas | Glowing Effect / Card Spotlight | Aceternity UI | Luz que sigue al cursor en puntos de partida, planes y auditorías |
| Proceso | Timeline | Aceternity UI | La línea se llena con el scroll, los puntos se prenden y los títulos quedan fijos |
| Secciones | Blur Fade | Magic UI | Aparición suave al entrar en pantalla, una sola vez |
| Auditorías | Bento Grid | Magic UI | Cada tarjeta con su mini animación (latencias, endpoints, deuda, suites) |
| Equipo | Text Reveal | Magic UI | La frase principal se ilumina palabra por palabra con el scroll |
| CTA | Interactive Hover Button | Magic UI | La flecha se desplaza con el hover |
| Footer | Text Hover Effect | Aceternity UI | Wordmark gigante en contorno que se enciende alrededor del cursor |

Después de instalar cada componente se lee su código antes de usarlo: que no haga pedidos de red, que use los
tokens en vez de colores fijos y que cumpla las reglas de 5.2. Si alguno no se puede adaptar, se escribe el
equivalente a mano y se anota.

### 5.2 Reglas (las de Emil que se mantienen)

- Nada bloquea el contenido: no hay preloader y el texto nunca depende de que corra una animación.
- Solo se animan `transform`, `opacity`, `filter` y el `clip`/máscara del canvas. No se anima el layout.
- Las respuestas a una acción tardan menos de 300 ms, con ease-out `cubic-bezier(.23, 1, .32, 1)`; los
  botones hacen `scale(.97)` al apretarlos.
- No se secuestra el scroll: no hay scroll suavizado. Las animaciones ligadas al scroll solo leen la posición.
- No se anima lo que dispara el teclado. Hay foco visible en todo control.
- Los hovers solo existen en `(hover: hover) and (pointer: fine)`.
- Los bucles de ambiente (grilla, haz del PR, marquesina, beams) son lentos y se pausan fuera de pantalla.
- Con `prefers-reduced-motion: reduce`: sin animaciones, todo visible en su estado final, el titular fijo en
  "product" y la línea del timeline llena.

## 6. Contenido

La fuente del copy en inglés es el tablero aprobado. El español se traduce manteniendo el voseo que ya usa
el sitio ("Reducí…"). Reglas:

- El agente no tiene nombre propio y nunca se dice dónde se distribuye.
- Las herramientas (Azure DevOps, Jira, Playwright…) se presentan siempre como ejemplos: "These are
  examples, not requirements".
- Afirmaciones permitidas, todas confirmadas por el usuario: QA senior con 8+ años; experiencia del equipo en
  Disney, FIFA, PayPal, Royal Caribbean, Deloitte, Globant y Numerade (confirmado el 2026-11-09: ningún NDA lo
  impide); mes a mes, se paga para empezar y se puede cortar después del primer mes; trabajo en inglés o
  español desde Argentina (UTC−3); el mapa de cobertura es el entregable de la semana 1.
- Todo número del mapa, la terminal, el PR y las mini animaciones de auditoría es de ejemplo, está marcado
  como "example" y cierra entre sí: 14 módulos, 120 tests existentes, 31 agregados, 2 bugs y 1 locator.
- Planes y auditorías con el contenido actual del sitio, todos visibles (sin pestañas que escondan planes).

## 7. Páginas nuevas o rehechas

- **Servicios** (`ServicePage`): header y footer del sitio, título, resumen, "Promise", "What you get", "How it
  works" (acordeón con `<details>`), "Evidence", "Tools & stack" (presentado como ejemplos), FAQs y el CTA de
  arranque. Mismo texto que hoy, en los dos idiomas. Metadata con canonical y hreflang, como ahora.
- **Privacidad** (EN y ES): qué datos junta el formulario (nombre, mail, empresa, teléfono opcional y
  mensaje), para qué se usan (responder), quién los procesa (Formspree), cuánto se guardan, cómo pedir que se
  borren (mail) y que el sitio no usa cookies propias de seguimiento. Firma "Code Assurance" y el mail de
  contacto. **Pendiente antes de publicar:** razón social y país, que el usuario tiene que confirmar.
### 7.1 One-pager de outbound: `/how-we-work/`

Es la página que va enlazada en el segundo mail (E2) de la secuencia a CTOs y VPs de Ingeniería de EE.UU. El
texto es el del one-pager aprobado (`codeassurance-outbound/onepager/index.html`) y se porta tal cual. Usa el
mismo sistema visual, los mismos componentes y el escudo menta.

- **Ruta:** `/how-we-work/`, en lugar de `/qa-agent` como se sugirió. Va en el link de un mail frío, y
  conviene que la URL no se parezca al nombre del paquete del agente. Además, "See how we work" ya es el CTA
  del one-pager.
- **Solo en inglés.** El selector de idioma lleva a `/es/`. Va con `robots: noindex`: repite contenido de la
  home y es una página de campaña, así no le compite a la home en buscadores.
- **Orden, igual que el one-pager:**
  1. Hero: el titular, el texto, los CTA y el PR en borrador de ejemplo (`DraftPullRequest` con Border Beam),
     con su aclaración: "An example of what lands in your repository. Nothing is merged until your team
     approves it."
  2. "We adapt to your stack, your process and your business rules": las 6 filas del one-pager (Code,
     Tickets, Test cases, Frameworks, Languages, Platforms), con Azure DevOps como una opción más, y el
     `StackDiagram`.
  3. "How the agent works on your codebase": las 8 etapas con su descripción (Blur Fade escalonado), los tres
     puntos de partida (`StartingPoints`) y los tres extras del one-pager: "From ticket to tests", "Broken
     locators, fixed with approval" (con la `TriageDemo`) y "Audits with a score".
  4. "Ways to work with us": `Plans` y la línea de auditorías especializadas.
  5. "Senior people lead every engagement" (`Team`) y "How it starts" en 4 pasos.
  6. Cierre: "Month-to-month, no long contract", con agendar o mandar un mail.
- **CTA:** agendar si existe `NEXT_PUBLIC_BOOKING_URL`; si no, mail a `martin.backhaus@code-assurance.com`.
- **URL final:** `https://www.code-assurance.com/how-we-work/`, que existe recién cuando se publica (ver 8).
  Ahí se le avisa a la sesión del pipeline para cargarla como `ONEPAGER_URL`.

### 7.2 Otras piezas

- **404** (`global-not-found`): mismo header, "This page doesn't exist" y links a la home en EN y ES.
- **Íconos**: `app/icon.svg` (el escudo), `app/favicon.ico` (16, 32 y 48 px, generado desde el SVG) y
  `app/apple-icon.png` (180 px, escudo sobre negro). Se borra el `favicon.ico` de la plantilla.
- **Metadata**: títulos y descripciones nuevos en los dos idiomas; `og-image.png` sigue como está;
  `sitemap.xml` suma las páginas de privacidad y actualiza `lastmod`.

## 8. Publicación (fuera de este branch)

El branch tiene solo código fuente. Publicar requiere el OK explícito del usuario y alguien con permiso de
escritura en `Backhaus7997/CodeAssurance-Landing` (la cuenta `gh` de esta máquina solo puede leer). Los pasos
son los del README: `NEXT_PUBLIC_BOOKING_URL=… npm run build`, copiar `out/` a la raíz, commit y push a
`main`. El README se actualiza con la variable de agenda y con la lista de archivos compilados que hay que
reemplazar.

## 9. Pruebas y verificación

- **Vitest** (nuevo, devDependency):
  - Control del contenido: recorre `content/**` y falla si aparece un término prohibido (`npm`, `npx`,
    `qaa-agent`, `99.9`, `10x`, `zero downtime`), un `href` vacío o `#`, o si `en` y `es` no tienen los
    mismos módulos, planes y pasos.
  - `lib/booking.ts`: vacío → `null`; `https://…` → URL; otro valor → error.
  - `lib/contact.ts`: validación de campos y armado del envío.
- **Playwright** (nuevo, devDependency), contra el sitio exportado servido en local:
  - Cada página responde, tiene un solo `h1` y el `lang` correcto.
  - Sin scroll horizontal a 375 px y a 1280 px (`scrollWidth <= clientWidth`).
  - Sin `NEXT_PUBLIC_BOOKING_URL` no hay botón de agenda.
  - Con `reducedMotion: 'reduce'`, `document.getAnimations()` está vacío después de cargar y de scrollear.
  - La demo del locator cambia de estado al tocar "Approve fix", y el mapa muestra el detalle del módulo
    tocado.
  - El formulario muestra el error en línea sin mail y no envía nada (la red se intercepta).
  - Una URL inexistente devuelve el 404 del sitio.
- **Cada incremento**: `tsc --noEmit`, `eslint`, `vitest`. **Al final**: `next build`, Playwright y una
  revisión a ojo en el navegador a 375 px y en escritorio, en inglés y en español.
- Antes de empezar se mide en `main` el JS de primera carga de `/`, para el criterio 10.

## 10. Fuera de alcance y pendientes

- Publicar (sección 8).
- Link de Cal.com: cuando exista, se carga en la variable y se recompila.
- Razón social y país para la página de privacidad.
- Una `og-image` nueva con el wordmark: la actual usa una versión anterior del escudo, con el `</>` oscuro.
