# Rediseño de code-assurance.com para outbound — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la home actual (preloader, 3D, cifras sin respaldo) por la home aprobada en Claude Design, con los dos idiomas, las páginas de servicio en una plantilla, `/privacy/` y `/how-we-work/`, todo exportado como sitio estático.

**Architecture:** Dos layouts raíz con route groups (`(en)` y `(es)/es`), uno por idioma. Contenido tipado en `content/*`, con un solo juego de componentes. Las secciones son Server Components con islas cliente para la animación y el estado. Los componentes animados se instalan desde los registros MIT de Magic UI, Aceternity UI y Fancy Components con el CLI de shadcn, y se adaptan a los tokens.

**Tech Stack:** Next.js 16.1.4 (App Router, `output: "export"`), React 19.2.3, Tailwind CSS 4, `motion`, TypeScript strict, Vitest, Playwright, `serve`.

**Spec:** `docs/superpowers/specs/2026-11-09-rediseno-landing-outbound-design.md`. Copy y layout de referencia: `docs/superpowers/specs/2026-11-09-home-board.dc.html`, el tablero aprobado. Su HTML tiene el texto final en inglés y los datos del mapa, de la terminal y del PR, y su `renderVals()` trae las notas de cada módulo.

## Global Constraints

- Las URLs públicas no cambian: `/`, `/es/`, `/services/<slug>/`, `/es/services/<slug>/`, con `trailingSlash: true`. Se suman `/privacy/`, `/es/privacy/` y `/how-we-work/`.
- `next.config.ts` mantiene `output: "export"`, `trailingSlash: true` y `images: { unoptimized: true }`, y suma `experimental: { globalNotFound: true }`.
- Ningún texto contiene `npm`, `npx`, `package(s)` o `paquete(s)`, `qaa-agent`, `99.9`, `10x` ni `zero downtime`. El agente se llama "our AI QA agent" / "nuestro agente de QA con IA".
- Herramientas siempre como ejemplos: "These are examples, not requirements."
- Tokens (spec 4.1): ink `#000000`, paper `#f3f5f2`, soft `#c9cfca`, muted `#9aa39c`, dim `#5b635c`, line `#252a26`, surface `#0c0f0d`, mint `#67d69e`, mint-hover `#84e4b5`, bug `#f87171`, wait `#fbbf24`.
- Fuentes: Archivo (`axes: ['wdth']`) para títulos con `font-stretch: 125%` y para el texto; IBM Plex Mono 400 y 500 para etiquetas y datos. Las dos con `next/font/google`.
- Movimiento (spec 5.2):
  - ease-out `cubic-bezier(.23,1,.32,1)` y menos de 300 ms en respuestas a una acción;
  - solo `transform`, `opacity` y `filter`; `:active` con `scale(.97)`;
  - hovers solo en `(hover: hover) and (pointer: fine)`;
  - sin scroll suavizado;
  - con `prefers-reduced-motion: reduce`, nada se anima y todo queda en su estado final.
- Sin JS, todo el texto es visible: ningún elemento sale del servidor con `opacity: 0`. Lo que se anima al aparecer se oculta solo bajo `html.js`, una clase que agrega un script inline en el `<head>` (Task 4).
- Agenda: `NEXT_PUBLIC_BOOKING_URL`. Vacía = sin botón. Un valor que no empieza con `https://` hace fallar el build.
- Formspree: `https://formspree.io/f/mlglpzgn`.
- Mail de contacto: `martin.backhaus@code-assurance.com`. Teléfono: `+54 9 351 268 2001`.
- Logo: copia exacta de `/Users/ca/Downloads/CodeAssurance Cotizaciones/logo/CodeAssurance_shield.svg`. No se modifica.
- No se tocan los archivos compilados de la raíz (`index.html`, `_next/`, `es/`, `services/`, `404*`, `_not-found*`, `*.txt` de Next) ni `docs/` fuera de `docs/superpowers/`. No hay push ni deploy.
- Cada commit lleva al final: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Sin JavaScript o con JS lento** (un prospecto con mala conexión, o un crawler): el `h1`, los números del mapa, las líneas de la terminal, el texto del equipo y los pasos del proceso tienen que verse. Los componentes de Magic UI salen del servidor con `opacity: 0` o con contadores en 0. Test en Task 6, Task 7 y Task 8: Playwright con `javaScriptEnabled: false` y opacidad calculada mayor que 0.99.
2. **iPhone con Safari:** el header sticky con blur, el Timeline y el Text Reveal no pueden romper el layout ni dejar texto invisible. Test en Task 12: proyecto WebKit `iPhone 13`, sin scroll horizontal y con las secciones visibles después de scrollear.
3. **Solo teclado:** los módulos del mapa, "Approve fix" y el formulario se usan con Tab, Enter y Espacio, con el foco visible. Tests en Task 6 y Task 7.
4. **Formspree caído o red cortada:** error en línea con el mail como alternativa, sin perder lo escrito y sin doble envío. Test en Task 9.
5. **"Reducir movimiento" en un equipo lento:** la grilla de canvas no queda en loop. `FlickeringGrid` expone `data-animating="false"` y el test lo verifica junto a `document.getAnimations()` vacío. Test en Task 6.

---

### Task 1: Línea de base y herramientas de prueba

**Files:**
- Create: `scripts/first-load-js.mjs`, `vitest.config.ts`, `playwright.config.ts`, `components.json`
- Modify: `package.json` (scripts y devDependencies), `eslint.config.mjs` (ignorar los compilados de la raíz), `.gitignore` (`/test-results/`, `/playwright-report/`)
- Copy: `docs/superpowers/specs/2026-11-09-home-board.dc.html` (ya está en el working tree; se commitea acá)

**Interfaces:**
- Produces:
  - `node scripts/first-load-js.mjs <archivo.html>` imprime `first-load-js-gzip-bytes=<n>`: la suma gzip de todos los `<script src>` del HTML, resueltos contra la carpeta del archivo.
  - Scripts de npm:
    - `test`: `vitest run`
    - `test:e2e`: `next build && playwright test`
    - `typecheck`: `tsc --noEmit`
  - En Playwright, `baseURL` es `http://localhost:4173` y el `webServer` corre `serve out -l 4173 --no-port-switching --no-clipboard`.
  - Proyectos de Playwright: `desktop` (Chromium a 1280×800), `mobile` (Chromium a 375×812, `isMobile: true`) y `iphone` (WebKit, `devices['iPhone 13']`).

- [ ] **Step 1:** `npm ci`, y después `npm run lint` y `npx tsc --noEmit`, para registrar el estado de partida.
  Esperado: si lint falla porque recorre `_next/**`, sumar a `globalIgnores` lo siguiente: `_next/**`, `docs/**` salvo `docs/superpowers/**`, `es/**`, `services/**`, `404/**`, `_not-found/**` y `out/**`. Volver a correr lint.
- [ ] **Step 2:** escribir `scripts/first-load-js.mjs` y correrlo sobre `index.html` de la raíz, que es el build de producción actual.
  Esperado: imprime un número. Anotarlo en el mensaje del commit como `baseline first-load-js-gzip-bytes=<n>`. Es el criterio 10 de la spec.
- [ ] **Step 3:** instalar devDependencies: `vitest`, `@playwright/test` y `serve`. Después, `npx playwright install chromium webkit`.
- [ ] **Step 4:** escribir `components.json` a mano, sin `shadcn init`, que reescribiría `globals.css`.
  Valores: `style: "new-york"`, `rsc: true`, `tsx: true`, `tailwind.css: "app/globals.css"`, `tailwind.config: ""`, `cssVariables: true`. Aliases: `components → @/components`, `ui → @/components/ui`, `utils → @/lib/utils`, `lib → @/lib`, `hooks → @/hooks`.
- [ ] **Step 5:** `npm test -- --passWithNoTests` y `npx playwright test --list`.
  Esperado: los dos terminan sin error de configuración.
- [ ] **Step 6:** commit `chore: línea de base de JS y herramientas de prueba`.

### Task 2: Agenda y formulario (lógica pura)

**Files:**
- Create: `lib/booking.ts`, `lib/booking.test.ts`, `lib/contact.ts`, `lib/contact.test.ts`

**Interfaces:**
- Produces:
  - `parseBookingUrl(raw: string | undefined): string | null`
  - `bookingUrl: string | null`, que es `parseBookingUrl(process.env.NEXT_PUBLIC_BOOKING_URL)` a nivel de módulo
  - `type ContactFields = { name: string; email: string; company: string; phone: string; message: string; gotcha: string }`
  - `type FieldError = 'required' | 'invalidEmail' | 'tooShort'`
  - `validateContact(f: ContactFields): Partial<Record<'name' | 'email' | 'message', FieldError>>`
  - `FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlglpzgn'`
  - `sendContact(f: ContactFields, fetchImpl?: typeof fetch): Promise<{ ok: true } | { ok: false; reason: 'rejected' | 'network'; detail?: string }>`

- [ ] **Step 1: tests que fallan.**
  - `parseBookingUrl`:
    - `undefined` y `'  '` devuelven `null`;
    - `'https://cal.com/code-assurance/15min'` devuelve la misma URL;
    - `'cal.com/x'` y `'http://cal.com/x'` tiran un error cuyo mensaje contiene `NEXT_PUBLIC_BOOKING_URL`.
  - `validateContact`:
    - nombre vacío da `{ name: 'required' }`;
    - mail `'a@b'` da `invalidEmail`; `'cto@acme.com'` pasa;
    - un mensaje de 9 caracteres da `tooShort`; uno de 10 pasa;
    - el teléfono `'+1 (415) 555-0100'` no genera error;
    - la empresa y el teléfono vacíos no generan error.
  - `sendContact`:
    - con `gotcha` no vacío devuelve `{ ok: true }` sin llamar a `fetchImpl` (es el honeypot);
    - una respuesta 422 con `{ errors: [{ message: 'x' }] }` da `{ ok: false, reason: 'rejected', detail: 'x' }`;
    - si `fetchImpl` rechaza, da `{ ok: false, reason: 'network' }`;
    - una respuesta 200 da `{ ok: true }`;
    - el body es `FormData` con `name`, `email`, `company`, `phone`, `message` y `_subject = 'New website lead - Code Assurance'`, y el header es `Accept: application/json`.
- [ ] **Step 2:** `npm test` → FAIL (los módulos no existen).
- [ ] **Step 3:** implementar. La regex del mail es la mínima que cumple los tests: `^[^\s@]+@[^\s@]+\.[^\s@]+$`. El nombre necesita 2 caracteres o más, después de `trim`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** commit `feat: lógica de agenda y formulario de contacto`.

### Task 3: Contenido de la home, del sitio y del one-pager, con el control de contenido

**Files:**
- Create: `content/types.ts`, `content/en.ts`, `content/es.ts`, `content/how-we-work.ts`, `content/content.test.ts`

**Interfaces:**
- Produces:
  - `type Locale = 'en' | 'es'`
  - `type ServiceSlug = 'automated-testing' | 'performance-audit' | 'security-review' | 'code-quality'`
  - `type ModuleStatus = 'covered' | 'added' | 'bug' | 'pending' | 'gap'`
  - `type MapModule = { id: string; path: string; tests: number; status: ModuleStatus; note: string }`
  - `type RunLine = { stage: string; detail: string; flags?: { bugs?: string; wait?: string } }`
  - `type Tier = { name: string; size: string; scope: string; team: string }`
  - `type Package = { name: string; tagline: string; summary: string; tiers: Tier[] }`
  - `type Step = { title: string; summary: string; deliverables: string[] }`
  - `type Audit = { title: string; summary: string; slug: ServiceSlug; visual: 'latency' | 'endpoints' | 'debt' | 'suites' }`
  - `type SiteContent`, con las claves `locale`, `meta`, `nav`, `header`, `hero`, `map`, `agent`, `process`, `plans`, `audits`, `team`, `start`, `form`, `footer`, `notFound` y `privacy`. Las listas usan los tipos de arriba. Los textos de error del formulario van en `form.errors: Record<FieldError | 'rejected' | 'network', string>`.
  - `hero.rotatingWords: string[]`. EN: `['product', 'stack', 'sprints', 'business rules', 'release rhythm']`; el primero es el texto accesible y el que se ve con "reducir movimiento".
  - `team.trackRecord: string`
  - `en: SiteContent`, `es: SiteContent` y `howWeWork: HowWeWorkContent`, que es solo inglés y lleva las secciones de spec 7.1 con el texto de `codeassurance-outbound/onepager/index.html`.
  - `HowWeWorkContent` reusa los subtipos de `SiteContent`, así las Tasks 7, 8 y 9 sirven sin cambios:
    - `pr` y `triage` tienen la forma de `agent`;
    - `plans` es `Package[]`;
    - `team` y `closing` tienen la forma de `team` y de `start`;
    - el formulario usa `en.form`.

- [ ] **Step 1: test que falla** (`content/content.test.ts`).
  - Recorrer en profundidad todos los strings de `en`, `es` y `howWeWork`. Ninguno coincide con `/\bnpm\b/i`, `/\bnpx\b/i`, `/\bpackages?\b/i`, `/\bpaquetes?\b/i`, `/qaa[-\s]?agent/i`, `/99\.9/`, `/\b10x\b/i` ni `/zero downtime/i`.
  - Toda clave `href` es distinta de `''` y de `'#'`.
  - Paridad entre `en` y `es`: mismos `map.modules[].id`, mismo largo de `process.steps`, misma forma de `plans.packages[].tiers` y mismos `audits[].slug`.
  - Mapa: hay 14 módulos; la suma de `tests` con estado `added` o `bug` es 31; hay 2 con `bug` y 1 con `pending`; la suma de `tests` con estado `covered` o `pending` es 120.
- [ ] **Step 2:** `npm test` → FAIL (los módulos no existen).
- [ ] **Step 3:** escribir `types.ts` y `en.ts` con el copy del tablero, tal cual.
  - El PR, las 9 líneas de la terminal y las notas de los 14 módulos salen de `renderVals()` del tablero.
  - Planes y pasos, como en el tablero.
  - `how-we-work.ts` lleva el texto del one-pager, tal cual.
  - `privacy` lleva las secciones de spec 7.2, firmadas por "Code Assurance" y con el mail.
  - `notFound` lleva "This page doesn't exist" y los links a las dos homes.
  - `es.ts` es la traducción con voseo ("Reducí…", "Agendá…") y con la misma estructura. Los nombres de planes y tiers no se traducen: Quality Check, Kickstart Basic…
- [ ] **Step 4:** `npm test` y `npx tsc --noEmit` → PASS.
- [ ] **Step 5:** commit `feat: contenido tipado de la home en inglés y español, y del one-pager`.

### Task 4: Estructura: layouts por idioma, tokens, fuentes, íconos, header, footer y 404

**Files:**
- Delete:
  - `app/layout.tsx`, `app/page.tsx`, `app/HomeClient.tsx`, `app/es/`
  - `components/sections/`, `components/three/`, `components/ui/ClutchWidget.tsx`, `components/ui/ContactModal.tsx`
  - `hooks/useLenis.ts`, `app/favicon.ico`, `public/{file,globe,next,vercel,window}.svg`, `paquetes.txt`
  - `app/services/` (la plantilla vuelve en Task 10)
- Create:
  - `app/(en)/layout.tsx`, `app/(en)/page.tsx`, `app/(es)/es/layout.tsx`, `app/(es)/es/page.tsx`, `app/global-not-found.tsx`
  - `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `scripts/make-icons.mjs`
  - `components/site/{Logo,Header,Footer,LanguageSwitch,BookingLink,SectionHeader}.tsx`
  - `lib/metadata.ts`, `e2e/shell.spec.ts`
- Modify: `app/globals.css` (reemplazo completo), `next.config.ts`, `package.json` (sacar `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react` y `lenis`)

**Interfaces:**
- Consumes: `en`, `es` (Task 3), `bookingUrl` (Task 2)
- Produces:
  - `pageMetadata(opts: { locale: Locale; path: string; title: string; description: string; noindex?: boolean; alternatePath?: string }): Metadata`. Arma el canonical, el hreflang (`en`, `es`, `x-default`; se omite `es` si no hay `alternatePath`), OpenGraph con `/og-image.png` y Twitter.
  - `<Header content={SiteContent['header']} homeHref="/" | "/es/" alternateHref={string} />`
  - `<Footer content={SiteContent['footer']} locale={Locale} alternateHref={string} />`
  - `<BookingLink className label>`: devuelve `null` si `bookingUrl` es `null`.
  - `<SectionHeader index="01" label="Agent" title description id>`
  - `<Logo size={number} />`: `<img src="/icon.svg" alt="">`, con el wordmark al lado si se pide.
  - Los dos layouts raíz ponen en el `<head>` el script inline `document.documentElement.classList.add('js')` y las variables de fuente en `<html>`.

- [ ] **Step 1: test que falla** (`e2e/shell.spec.ts`):
  - `/` tiene `html[lang="en"]`; `/es/` tiene `html[lang="es"]`; hay un solo `html` y un solo `h1` en cada uno.
  - Para los anchos 360, 375 y 1280 en `/` y `/es/`: `document.documentElement.scrollWidth <= innerWidth`.
  - `link[rel="icon"]` apunta a `/icon.svg` o a `/favicon.ico`, y no aparece el `favicon.ico` de la plantilla (comparar el hash con `c30c7d42707a47a3f4591831641e50dc`).
  - Sin la variable de entorno no existe ningún `a[data-booking]`.
  - `/does-not-exist/` responde 404 y muestra el texto de `notFound`.
- [ ] **Step 2:** `npm run test:e2e -- e2e/shell.spec.ts` → FAIL.
- [ ] **Step 3:** implementar.
  - `make-icons.mjs` usa `sharp`, que va como devDependency si no lo trae `next`. A partir del escudo genera PNG de 16, 32 y 48 px, los empaqueta en un ICO con entradas PNG, y genera `apple-icon.png` de 180 px con el escudo centrado sobre `#000`.
  - La home de esta tarea renderiza solo `Header`, el `h1` del hero (texto estático) y `Footer`.
  - El header es sticky, con `rgba(0,0,0,.74)` y `backdrop-filter: blur(12px)`. La navegación se oculta por debajo de 760 px.
  - `global-not-found.tsx` importa `globals.css` y las fuentes, y renderiza header y footer en inglés.
- [ ] **Step 4:** `npm run build`.
  Esperado: existe `out/404.html`. Si no existe, aplicar la alternativa de spec 3.1 (un layout raíz único y `lang="es"` en el `<main>`), anotarla en el commit y ajustar el test de `lang` para que busque `main[lang="es"]`.
- [ ] **Step 5:** `npm run test:e2e -- e2e/shell.spec.ts`, `npm run lint` y `npm run typecheck` → PASS.
- [ ] **Step 6:** commit `feat: estructura por idioma, tokens, íconos del escudo y 404`.

### Task 5: Componentes animados de los registros

**Files:**
- Create (con `npx shadcn@latest add <url>`), en `components/ui/`:
  - de `https://magicui.design/r/<name>.json`: `flickering-grid`, `number-ticker`, `terminal`, `border-beam`, `shine-border`, `animated-beam`, `marquee`, `blur-fade`, `text-reveal`, `interactive-hover-button`;
  - de `https://ui.aceternity.com/registry/<name>.json`: `timeline`, `glowing-effect`, `text-hover-effect`;
  - de `https://fancycomponents.dev/r/text-rotate.json`: `text-rotate`.
- Create: `components/ui/reveal.tsx`, `hooks/use-reduced-motion.ts`
- Modify: `package.json` (`framer-motion` → `motion`; sumar lo que pida cada registro), `app/globals.css` (lo que agreguen los registros, revisado)

**Interfaces:**
- Produces:
  - Los componentes con su API original, salvo estas adaptaciones, que se anotan con un comentario de una línea en cada archivo:
    - `FlickeringGrid`: acepta `animate: boolean` y pone `data-animating` en el canvas. Con `animate=false` dibuja una vez y no pide `requestAnimationFrame`. Se pausa fuera de pantalla, y ya lo hace.
    - `NumberTicker`: el servidor renderiza el valor final. Bajo `html.js`, el contador se ve recién cuando arranca la animación.
    - `Terminal`, `TypingAnimation` y `AnimatedSpan`: el servidor renderiza el texto completo y visible; la animación solo corre bajo `html.js`.
    - `TextReveal`: sin JS, el texto sale con opacidad 1. La altura del contenedor se baja de `200vh` a `140vh`.
    - `Timeline`: con "reducir movimiento", la línea va llena y sin `useScroll`.
    - `TextRotate`: el servidor renderiza la primera palabra; con "reducir movimiento" no rota.
  - `<Reveal>` reemplaza a `BlurFade` en las apariciones por sección. Es un wrapper con IntersectionObserver que agrega `data-in` una sola vez. El CSS oculta y difumina solo `html.js [data-reveal]:not([data-in])`. `BlurFade` se usa solo donde la animación la dispara una acción.
  - `useReducedMotion(): boolean`, que viene de `motion/react` o se envuelve si hace falta.
  - Colores: ningún componente deja colores fijos de su demo. Usan los tokens (`text-mint`, `border-line`, etc.).
- `bento-grid` no se instala, porque trae `@radix-ui/react-icons`. El bento se arma con Tailwind en Task 8 y se anota en el commit.
- `card-spotlight` no se instala, porque trae `canvas-reveal-effect`, que usa three.js. El spotlight lo hace `glowing-effect`.

- [ ] **Step 1:** instalar uno por uno y leer cada archivo:
  - que no haga pedidos de red ni cargue scripts externos;
  - que solo anime `transform`, `opacity` y `filter`;
  - que no deje imports sin usar.
  Esperado: `git diff --stat` muestra solo `components/ui/*`, `package.json`, `package-lock.json` y `app/globals.css`.
- [ ] **Step 2:** aplicar las adaptaciones de la lista de Interfaces.
- [ ] **Step 3:** `npm run lint`, `npm run typecheck` y `npm run build` → PASS.
- [ ] **Step 4:** commit `feat: componentes animados de Magic UI, Aceternity y Fancy Components`.

### Task 6: Hero y mapa del codebase

**Files:**
- Create: `components/home/Hero.tsx`, `components/home/CoverageMap.tsx` (cliente), `e2e/home-hero.spec.ts`
- Modify: `app/(en)/page.tsx`, `app/(es)/es/page.tsx` (montan `HomePage`); Create: `components/home/HomePage.tsx`

**Interfaces:**
- Consumes: `SiteContent['hero' | 'map']`, `FlickeringGrid`, `TextRotate`, `NumberTicker`, `SectionHeader`, `BookingLink`
- Produces: `<HomePage content={SiteContent} />`, que monta las secciones en el orden del tablero. Las tareas siguientes le suman las suyas.

- [ ] **Step 1: tests que fallan** (`e2e/home-hero.spec.ts`):
  - El `h1` contiene "QA built around your" y "not a template", y su texto accesible incluye "product".
  - Tocar el botón `auth/password-reset` (`getByRole('button', { name: /auth\/password-reset/ })`) hace que la región `aria-live` muestre "7 added".
  - Por defecto, la región muestra la nota de `billing/refunds`.
  - **Teclado:** Tab hasta `checkout/payment` y Enter muestra "awaiting your approval". El botón enfocado tiene un `outline` no nulo.
  - **Sin JS** (`test.use({ javaScriptEnabled: false })`): el número de `auth/login` muestra "18" y `getComputedStyle(h1).opacity === '1'`.
  - **Reducir movimiento** (`test.use({ reducedMotion: 'reduce' })`): `document.getAnimations().length === 0` después de 1500 ms; `canvas[data-animating="false"]` existe; el `h1` muestra "product" a los 3 s.
- [ ] **Step 2:** `npm run test:e2e -- e2e/home-hero.spec.ts` → FAIL.
- [ ] **Step 3:** implementar según el tablero.
  - Hero con la grilla de fondo enmascarada (`radial-gradient(ellipse 75% 70% at 75% 20%, #000 20%, transparent 72%)`) y la palabra rotativa cada 2600 ms.
  - Mapa en grilla `repeat(auto-fill, minmax(min(160px, 100%), 1fr))` con `gap: 1px`.
  - Cada módulo es un `<button aria-pressed>`. Barrido de escaneo único de 1200 ms.
  - El detalle va en `aria-live="polite"`. La fila de totales y la frase "first deliverable" van abajo.
- [ ] **Step 4:** el test → PASS. Después, `npm test` y `npm run lint`.
- [ ] **Step 5:** commit `feat: hero con grilla, palabra rotativa y mapa del codebase interactivo`.

### Task 7: Sección del agente

**Files:**
- Create: `components/home/{AgentSection,AgentRun,DraftPullRequest,TriageDemo,StackDiagram,StackMarquee,StartingPoints}.tsx`, `e2e/home-agent.spec.ts`
- Modify: `components/home/HomePage.tsx`

**Interfaces:**
- Consumes: `SiteContent['agent']`, `Terminal`, `BorderBeam`, `ShineBorder`, `AnimatedBeam`, `Marquee`, `GlowingEffect`, `Reveal`
- Produces:
  - `<DraftPullRequest content={...} />`, que reusa Task 11;
  - `<TriageDemo content={...} />`, que reusa Task 11;
  - `<StackDiagram labels={...} />`;
  - `<StartingPoints items={...} />`.

- [ ] **Step 1: tests que fallan:**
  - La sección `#agent` contiene las 8 etapas (`scan` … `deliver`) y "waiting for your review".
  - Al tocar "Approve fix", aparecen "Applied in the draft PR. Re-run passed." y un botón "Undo"; Undo vuelve al estado anterior.
  - **Teclado:** Tab hasta "Approve fix" y Espacio aplica el arreglo.
  - **Sin JS:** las 9 líneas de la terminal tienen opacidad calculada 1.
  - El diff muestra `getByRole('button', { name: 'Place order' })`.
  - En el ancho `mobile`, el contenedor del diff scrollea en horizontal y la página no.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** implementar según el tablero.
  - Terminal y PR lado a lado con `flex-wrap`. La terminal arranca al entrar en pantalla.
  - `BorderBeam` alrededor del PR, con `duration` 6 s.
  - `ShineBorder` en la falla pendiente hasta que se aprueba.
  - `AnimatedBeam` con 3 nodos de entrada, el escudo en el centro y 3 nodos de salida.
  - Dos `Marquee` en sentidos opuestos, con `pauseOnHover`.
  - Tres `StartingPoints` con `GlowingEffect`.
- [ ] **Step 4:** → PASS. Después, `npm run lint`.
- [ ] **Step 5:** commit `feat: sección del agente con terminal, PR, demo de triage y diagrama`.

### Task 8: Proceso, planes, auditorías y equipo

**Files:**
- Create: `components/home/{ProcessTimeline,Plans,Audits,AuditVisual,Team}.tsx`, `e2e/home-sections.spec.ts`
- Modify: `components/home/HomePage.tsx`

**Interfaces:**
- Consumes: `SiteContent['process' | 'plans' | 'audits' | 'team']`, `Timeline`, `GlowingEffect`, `TextReveal`, `Reveal`
- Produces:
  - `<Plans packages={Package[]} />`, que reusa Task 11;
  - `<Team content={...} />`, que reusa Task 11;
  - `<AuditVisual kind="latency" | "endpoints" | "debt" | "suites" />`, decorativo, con `aria-hidden` y la etiqueta "example".

- [ ] **Step 1: tests que fallan:**
  - `#process` tiene 4 pasos con sus entregables.
  - `#plans` muestra los 8 tiers a la vez, sin pestañas: Standard, Medium, Premium, Kickstart Basic, Kickstart Standard, Kickstart Full, Part-time y Full-time.
  - Cada auditoría linkea a `/services/<slug>/`, y en `/es/` a `/es/services/<slug>/`.
  - El texto de `team.trackRecord` está presente.
  - **Sin JS:** el texto de `TextReveal` y el de los pasos tienen opacidad 1.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** implementar según el tablero.
  - Timeline con título fijo (sticky, `top: 96px`).
  - Planes en bloques con `gap: 1px`.
  - Bento de 4 auditorías con su mini visual, animado una vez al entrar.
  - Equipo con la frase en `TextReveal` y el track record.
- [ ] **Step 4:** → PASS.
- [ ] **Step 5:** commit `feat: proceso, planes, auditorías y equipo`.

### Task 9: Arranque, formulario y footer con wordmark

**Files:**
- Create: `components/home/{Start,ContactForm}.tsx`, `e2e/contact.spec.ts`
- Modify: `components/home/HomePage.tsx`, `components/site/Footer.tsx` (suma `TextHoverEffect`)

**Interfaces:**
- Consumes: `validateContact`, `sendContact` (Task 2), `SiteContent['start' | 'form']`, `InteractiveHoverButton`, `BorderBeam`, `TextHoverEffect`
- Produces: `<Start content form />`, que reusa Task 11.

- [ ] **Step 1: tests que fallan** (interceptar `https://formspree.io/**` con `page.route`):
  - Enviar vacío muestra el error de nombre y el de mail en línea, y no sale ningún request.
  - Si Formspree responde 500, se muestra `form.errors.rejected` o `network` con el mail como link, y los campos conservan lo escrito.
  - Si la red se aborta, se muestra `form.errors.network`.
  - Con una respuesta 200 se muestra "Message sent". Mientras el request está pendiente, el botón está `disabled` y un segundo clic no genera otro request.
  - El teléfono acepta `+1 (415) 555-0100`.
  - Sin agenda, el CTA de arranque es el link `mailto:`.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** implementar.
  - `<form noValidate>` con validación propia, para poder mostrar los mensajes en el idioma de la página.
  - `aria-invalid` y `aria-describedby` en cada campo con error.
  - El wordmark gigante del footer solo responde al hover en dispositivos con puntero fino.
- [ ] **Step 4:** → PASS.
- [ ] **Step 5:** commit `feat: arranque con formulario y footer con wordmark`.

### Task 10: Páginas de servicio (plantilla + 8 páginas)

**Files:**
- Create:
  - `content/services/types.ts`, `content/services/en.ts`, `content/services/es.ts`
  - `components/services/ServicePage.tsx`
  - `app/(en)/services/[slug]/page.tsx`, `app/(es)/es/services/[slug]/page.tsx`
  - `e2e/services.spec.ts`
- Modify: `content/content.test.ts` (suma `services` al recorrido y a la paridad)

**Interfaces:**
- Consumes: `ServiceSlug`, `pageMetadata`, `Header`, `Footer`, `Start`
- Produces:
  - `type ServiceContent = { slug: ServiceSlug; meta: { title: string; description: string }; title: string; summary: string; promise: string[]; deliverables: { title: string; detail: string }[]; howItWorks: { title: string; bullets: string[] }[]; evidence: string[]; evidenceNote: string; tools: { title: string; detail: string }[]; faqs: { q: string; a: string }[] }`
  - `servicesEn` y `servicesEs`, de tipo `Record<ServiceSlug, ServiceContent>`

- [ ] **Step 1: tests que fallan:**
  - En e2e, las 8 URLs responden 200, tienen un solo `h1` igual al título actual (p. ej. "Performance Audit for predictable speed") y el `lang` correcto.
  - Cada página muestra 8 FAQs; "How it works" usa `<details>` y abre con teclado.
  - En unit, `servicesEn` y `servicesEs` tienen los mismos slugs y la misma cantidad de FAQs y de bloques.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** portar el texto de los 8 `*Client.tsx` que se borraron en Task 4 (`git show main:app/services/<slug>/<File>.tsx` y `git show main:app/es/services/...`) a `content/services/*`, sin cambiar el texto.
  - El título de "Tools & stack" pasa a "Tools we often use (examples)"; en español, "Herramientas que solemos usar (ejemplos)".
  - Metadata: los títulos y las descripciones de los `page.tsx` actuales.
  - `generateStaticParams` devuelve los 4 slugs.
- [ ] **Step 4:** → PASS (e2e y unit).
- [ ] **Step 5:** commit `feat: páginas de servicio en una plantilla`.

### Task 11: `/how-we-work/` (one-pager de outbound)

**Files:**
- Create: `app/(en)/how-we-work/page.tsx`, `components/how-we-work/HowWeWorkPage.tsx`, `e2e/how-we-work.spec.ts`

**Interfaces:**
- Consumes: `howWeWork` (Task 3), `DraftPullRequest`, `StackDiagram`, `StartingPoints`, `TriageDemo`, `Plans`, `Team`, `Start`, `Reveal`, `pageMetadata` con `noindex: true`.

- [ ] **Step 1: tests que fallan:**
  - Responde 200 con `meta[name="robots"]` que contiene `noindex`.
  - El `h1` es "QA built around your product, not a template".
  - Aparecen la aclaración "Nothing is merged until your team approves it", las 8 etapas con su descripción, "From ticket to tests", "Broken locators, fixed with approval", "Audits with a score", los 8 tiers, "Month-to-month, no long contract" y el `mailto:` de contacto.
  - El selector de idioma lleva a `/es/`.
  - Sin scroll horizontal a 375 y a 1280.
- [ ] **Step 2:** → FAIL.
- [ ] **Step 3:** implementar en el orden de spec 7.1, reusando los componentes de las Tasks 7, 8 y 9 con el contenido de `howWeWork`.
- [ ] **Step 4:** → PASS.
- [ ] **Step 5:** commit `feat: one-pager de outbound en /how-we-work/`.

### Task 12: Privacidad, sitemap, README y verificación final

**Files:**
- Create: `app/(en)/privacy/page.tsx`, `app/(es)/es/privacy/page.tsx`, `components/site/PrivacyPage.tsx`, `e2e/final.spec.ts`
- Modify: `public/sitemap.xml` (suma las 2 páginas de privacidad y pone `lastmod` en la fecha del commit), `README.md` (sección de publicación con `NEXT_PUBLIC_BOOKING_URL` y la lista de compilados a reemplazar; se saca lo que describe three.js, GSAP o Lenis)

- [ ] **Step 1: tests que fallan** (`e2e/final.spec.ts`):
  - `/privacy/` y `/es/privacy/` responden 200 y mencionan Formspree y el mail.
  - El footer de todas las páginas linkea a la privacidad de su idioma.
  - En todas las páginas del sitemap y en `/how-we-work/`:
    - no hay ningún `a[href="#"]` ni `a[href=""]`;
    - ningún texto coincide con la lista de términos prohibidos;
    - no hay scroll horizontal a 375 ni a 1280.
  - Proyecto `iphone`: en `/` y `/how-we-work/`, sin scroll horizontal. Después de scrollear hasta el final, los títulos de cada sección son visibles (opacidad 1).
- [ ] **Step 2:** → FAIL. **Step 3:** implementar. **Step 4:** → PASS.
- [ ] **Step 5: verificación completa.**
  - Correr `npm run lint`, `npm run typecheck`, `npm test` y `npm run test:e2e`, todo en verde.
  - Correr `node scripts/first-load-js.mjs out/index.html`: el número tiene que ser menor que la línea de base de Task 1.
- [ ] **Step 6: revisión a ojo.**
  - Servir `out/` y abrir en el navegador del panel, a 375 px y en escritorio: `/`, `/es/`, `/how-we-work/`, un servicio en cada idioma, `/privacy/` y el 404.
  - Repetir con "reducir movimiento" emulado.
  - Anotar en el resumen final cualquier desvío del tablero.
- [ ] **Step 7:** commit `feat: privacidad, sitemap y README de publicación`.
