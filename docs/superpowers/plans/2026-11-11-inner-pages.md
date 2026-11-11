# Páginas internas con el diseño de la home — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que servicios, pricing, guías, índices y privacidad usen el hero, las secciones, las tarjetas y las animaciones de la home, con un visual propio por servicio.

**Architecture:** Un `PageHero` y unos pocos bloques compartidos en `components/content/` reemplazan los encabezados planos. Cada servicio declara su visual en el contenido (`visual`), y un despachador (`ServiceVisual`) elige el componente. Las guías suman barra de progreso, índice y respuesta corta.

**Tech Stack:** Next 16 (export estático), React 19, Tailwind 4, `motion`, componentes ya instalados de 21st.dev (FlickeringGrid, GlowingEffect, Marquee, Terminal, Reveal), Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-11-inner-pages-design.md`

## Global Constraints

- Git: `DEVELOPER_DIR=/Library/Developer/CommandLineTools git …` (la licencia de Xcode está pendiente).
- Sin dependencias nuevas.
- No cambia ningún texto existente; solo se agregan los textos de los visuales y una frase `pull` por guía.
- Reglas de contenido de la spec de SEO para todo texto nuevo (términos prohibidos, sin precios, marcas solo en la frase aprobada); los textos de los visuales entran en `COPY` de `content/content.test.ts`.
- Visuales: `aria-hidden`, quietos con `useLiveMotion() === false`, en pausa fuera de pantalla (`useInView`), sin números salvo los del ejemplo de la home (14 módulos, 120 tests, 31 agregados).
- `Reveal` solo esconde bajo `html.js`; sin JavaScript todo se ve.
- El h1 conserva exactamente su texto: la última palabra va en `<span className="text-mint">` dentro del mismo `<h1>`.
- Techo de peso: el JS de primera carga de cada página interna ≤ el de `/` (se compara en el e2e de la tarea 7).

## Review Focus

1. h1 largos a 375 px ("Mobile app testing services for Android and iOS", los h1 de las guías): no desbordan (tarea 1, e2e en 375).
2. El índice de una guía con subtítulos que terminan en "?": los anclajes no dependen del texto (ids `section-1…`) (tarea 6).
3. Un visual que queda fuera de pantalla sigue animando: la prueba de `robustness.spec.ts` lo cubre si los visuales nuevos usan `useInView` (tareas 3 y 4).
4. Las 4 páginas en español muestran sus visuales en español, no en inglés (paridad en la tarea 4).
5. Un visual con "reducir movimiento" queda en su estado final y legible, no vacío (tarea 7).

---

### Task 1: `PageHero` en todas las páginas internas

**Files:**
- Create: `components/content/PageHero.tsx`
- Modify: `components/home/HeroGrid.tsx` (atributo `data-hero-grid`), `components/services/ServicePage.tsx`, `components/content/TopicPage.tsx`, `components/content/HubPage.tsx`, `components/content/GuidePage.tsx`, `components/site/PrivacyPage.tsx`
- Test: `e2e/inner-pages.spec.ts`

**Interfaces:**
- Produces: `PageHero({ breadcrumbs: Crumb[]; eyebrow: string; h1: string; answer?: string; cta?: { bookLabel: string; emailLabel: string }; secondary?: { label: string; href: string }; visual?: ReactNode; children?: ReactNode })`. Renderiza `HeroGrid` de fondo, migas, eyebrow, `<h1>` con la última palabra envuelta en `span.text-mint`, `AnswerLead`, `PrimaryCta`, enlace secundario, `children` (firma de guías) y `visual` a la derecha (`flex-[1_1_420px]`).
- Eyebrows: servicios `Service / 0N — <h1 sin "services">` usando el orden de `EN_SERVICE_SLUGS` (en español `Servicio / 0N`); pricing `Pricing`; guías `Guide`; índices `Services` / `Guides`; privacidad la actual.

- [ ] **Step 1: Test que falla.** `e2e/inner-pages.spec.ts`, para `["/services/automated-testing/", "/es/services/code-quality/", "/services/mobile-app-testing/", "/services/", "/pricing/", "/guides/", "/guides/how-to-hire-a-qa-company/", "/privacy/"]`: `canvas[data-hero-grid]` cuenta 1 dentro de `main section` de arriba; el `h1` tiene un `span.text-mint` y su `innerText` normalizado es igual al h1 de antes (copiar de `services.spec.ts` / `seo.spec.ts`); a 375 px `scrollWidth <= innerWidth`.
- [ ] **Step 2:** `npx next build && npx playwright test e2e/inner-pages.spec.ts` → FAIL.
- [ ] **Step 3:** Implementar `PageHero` y usarlo en las cinco plantillas (en `ServicePage` reemplaza el bloque superior actual; el recuadro "Promise" pasa abajo del hero como primera tarjeta de la sección "What you get" de la tarea 2).
- [ ] **Step 4:** mismo comando → PASS; `npx playwright test e2e/seo.spec.ts e2e/services.spec.ts` → PASS.
- [ ] **Step 5:** `git commit -m "Give every inner page the home hero"`

### Task 2: Secciones de la home en las páginas de servicio

**Files:**
- Create: `components/content/StepsTimeline.tsx`, `components/content/EvidenceList.tsx`, `components/content/GlowCard.tsx`
- Modify: `components/services/ServicePage.tsx`, `components/content/RelatedLinks.tsx`, `components/content/CtaBand.tsx`, `components/content/Faq.tsx`
- Test: `e2e/inner-pages.spec.ts`

**Interfaces:**
- Produces: `StepsTimeline({ steps: { title: string; bullets?: string[]; text?: string; badge?: string }[] })` (cliente: línea que se llena según scroll con `useScroll` de `motion`, `li[data-lit]` al pasar; quieta y llena sin movimiento); `EvidenceList({ items: string[] })`; `GlowCard({ children, className })` (envuelve `GlowingEffect` como en `Plans.tsx`).
- Secciones del servicio, en orden y numeradas con `SectionHeader` de la home: `01 What you get` (promesa + entregables en `GlowCard`), `02 How it works` (`StepsTimeline`; una tarjeta cuyo título empieza con "Add-on" o "Add-on:" lleva `badge: "Add-on"`), `03 Evidence` (`EvidenceList` + nota), `04 Tools` (cinta `StackMarquee` con los títulos de `tools`, `languages: []`), `05 FAQs`, `06 Related` (`RelatedLinks` con `GlowCard`), cierre `CtaBand` con `PrimaryCta` (botón animado).

- [ ] **Step 1: Test que falla.** En `/services/automated-testing/` y `/es/services/automated-testing/`: los encabezados de sección muestran `01`…`06` en orden; `[data-steps] li` cuenta 4; después de scrollear hasta el final, todos tienen `data-lit`; la cinta de herramientas existe (`[data-marquee]`).
- [ ] **Step 2:** build + `npx playwright test e2e/inner-pages.spec.ts` → FAIL.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** → PASS; además `e2e/services.spec.ts`, `seo.spec.ts`, `robustness.spec.ts` → PASS.
- [ ] **Step 5:** `git commit -m "Use the home sections on service pages"`

### Task 3: Visuales reutilizados de la home

**Files:**
- Create: `components/content/ServiceVisual.tsx`
- Modify: `content/services/types.ts` (campo `visual`), `content/services/en.ts`, `content/services/es.ts`, `content/services/en-only.ts`, `components/services/ServicePage.tsx`, `content/content.test.ts`
- Test: `e2e/inner-pages.spec.ts`

**Interfaces:**
- Produces, en `content/services/types.ts`: `type ServiceVisual = { kind: "run"; run: { title: string; command: string; lines: RunLine[]; done: string } } | { kind: "pr" } | { kind: "audit"; audit: AuditVisualKind } | { kind: "checklist"; title: string; items: { text: string; state: "pass" | "bug" }[] } | { kind: "sprint"; columns: [string, string, string, string]; cards: { title: string; column: 0 | 1 | 2 | 3 }[] } | { kind: "phone"; device: string; rows: { label: string; state: "pass" | "bug" }[] } | { kind: "api"; request: string[]; response: string[]; checks: string[] }`; `ServiceContent.visual: ServiceVisual`.
- `ServiceVisual({ visual, site }: { visual: ServiceVisual; site: SiteContent })`: raíz con `data-visual={visual.kind}`; `run` → `AgentRun`; `pr` → `DraftPullRequest pr={site.agent.pr}`; `audit` → `AuditVisual`; los otros cuatro llegan en la tarea 4.
- Contenido: automated-testing `run` con las líneas del prototipo (scan, map, gaps, write, run, heal, pr) en inglés y en español; ai-qa-agent `pr`; performance-audit `audit: "latency"`; security-review `"endpoints"`; code-quality `"debt"` (en los dos idiomas).

- [ ] **Step 1: Tests que fallan.** e2e: cada uno de los 5 servicios de arriba (y sus pares en español) tiene `[data-visual]` con el tipo esperado dentro del hero. Unitario: los textos de `visual` de los servicios bilingües tienen la misma forma en inglés y en español.
- [ ] **Step 2:** `npx vitest run` y build + e2e → FAIL.
- [ ] **Step 3:** Implementar y pasar `visual={<ServiceVisual …/>}` a `PageHero`.
- [ ] **Step 4:** → PASS (incluido `robustness.spec.ts`).
- [ ] **Step 5:** `git commit -m "Show the home visuals on matching service pages"`

### Task 4: Cuatro visuales nuevos

**Files:**
- Create: `components/content/visuals/ChecklistRun.tsx`, `SprintBoard.tsx`, `PhoneTests.tsx`, `ApiContract.tsx`
- Modify: `components/content/ServiceVisual.tsx`, `content/services/en-only.ts`, `content/content.test.ts`
- Test: `e2e/inner-pages.spec.ts`

**Interfaces:**
- Cada componente recibe su variante de `ServiceVisual`, es cliente, usa `useLiveMotion` y `useInView`, y anima con `motion` (opacidad y transform, < 300 ms por elemento, loop que reinicia cada ~6 s solo en pantalla):
  - `ChecklistRun`: filas que se tildan una por una; la fila `bug` termina en rojo con la etiqueta "bug found".
  - `SprintBoard`: 4 columnas (`To do`, `In progress`, `QA`, `Done`); las tarjetas pasan por `QA` y llegan a `Done`.
  - `PhoneTests`: marco de celular con el nombre de dispositivo arriba y filas que pasan; cambia de dispositivo en cada vuelta.
  - `ApiContract`: bloque de pedido y de respuesta en mono; los `checks` aparecen con tilde.
- Sin movimiento: estado final completo.
- Contenido (solo inglés, en `en-only.ts`): manual-qa-testing, dedicated-qa-engineers, mobile-app-testing y api-testing con textos cortos sin cifras.

- [ ] **Step 1: Test que falla.** e2e: `[data-visual="checklist"|"sprint"|"phone"|"api"]` en sus páginas; con movimiento, después de 3 s el visual cambió (comparar `innerText` antes y después).
- [ ] **Step 2:** build + e2e → FAIL.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** → PASS; `npx vitest run` → PASS; `robustness.spec.ts` → PASS.
- [ ] **Step 5:** `git commit -m "Add checklist, sprint board, phone and API visuals"`

### Task 5: Pricing, índices y privacidad

**Files:**
- Modify: `components/content/TopicPage.tsx`, `content/pricing.ts` (campo `steps`), `content/pages/types.ts`, `components/content/HubPage.tsx`, `components/site/PrivacyPage.tsx`
- Test: `e2e/inner-pages.spec.ts`

**Interfaces:**
- `PageCopy` suma `steps?: { title: string; text: string }[]`; `TopicPage` los muestra con `StepsTimeline` como sección `01 How it works` antes de las secciones de texto, que siguen numeradas.
- `pricing.steps`: "A 15-minute call", "An assessment of your product", "A written quote", "Month one" con textos de una oración sacados de `/pricing/`.
- `HubPage`: ítems en `GlowCard` con su número (`01`…) y `Reveal` escalonado.

- [ ] **Step 1: Test que falla.** `/pricing/` tiene `[data-steps] li` = 4; `/services/` y `/guides/` muestran números `01`… en sus tarjetas; `/privacy/` tiene el hero con grilla.
- [ ] **Step 2–4:** build + e2e FAIL → implementar → PASS.
- [ ] **Step 5:** `git commit -m "Bring pricing, indexes and privacy to the new design"`

### Task 6: Guías

**Files:**
- Create: `components/content/ReadingProgress.tsx`, `components/content/TableOfContents.tsx`, `components/content/ShortAnswer.tsx`
- Modify: `components/content/GuidePage.tsx`, `components/content/ContentSections.tsx`, `content/pages/types.ts` (`ContentSection.pull?: string`), las 4 guías
- Test: `e2e/inner-pages.spec.ts`, `content/content.test.ts`

**Interfaces:**
- `ReadingProgress()`: `div[data-reading-progress]` fijo arriba, `scaleX` según scroll.
- `TableOfContents({ items: { id: string; label: string }[] })`: `<nav aria-label="On this page">` fijo desde 900 px, `a[aria-current="true"]` en la sección visible.
- `ContentSections` en modo guía: cada sección con `id="section-N"`, número `0N` en mono a la izquierda y la frase `pull` como cita si existe.
- `ShortAnswer({ label: "Short answer", text })` reemplaza el `AnswerLead` en guías.
- Cada guía recibe un `pull` en una sección, con una frase de su propio texto.

- [ ] **Step 1: Tests que fallan.** e2e en la guía de contratación (1280 px): existe `[data-reading-progress]`; el índice tiene tantos enlaces como secciones; después de `#section-3` en vista, el enlace 3 tiene `aria-current="true"`; la barra creció; a 375 px el índice no se ve. Unitario: cada guía tiene exactamente una sección con `pull`.
- [ ] **Step 2–4:** FAIL → implementar → PASS (y `seo.spec.ts`).
- [ ] **Step 5:** `git commit -m "Add reading progress, table of contents and pull quotes to guides"`

### Task 7: Movimiento reducido, peso y verificación

**Files:**
- Test: `e2e/inner-pages.spec.ts`

- [ ] **Step 1: Tests.** Con `reducedMotion: "reduce"` en un servicio con visual nuevo y en una guía: `document.getAnimations().length === 0` después de 1.5 s y el visual tiene texto visible. Peso: para cada página interna exportada, la suma gzip de sus `<script src>` (leídos de `out/` con `fs`, como `scripts/first-load-js.mjs`) es ≤ la de `out/index.html`.
- [ ] **Step 2:** `npm run typecheck && npm run lint && npm test && npm run test:e2e` → todo verde. Si el peso falla, mover el componente que más pesa a carga diferida (`next/dynamic` con `ssr: true`) y repetir.
- [ ] **Step 3:** Revisión visual en 1280 y 375 de un servicio con cada tipo de visual, `/pricing/`, una guía y `/services/`.
- [ ] **Step 4:** `git commit -m "Verify motion, weight and layout of the inner pages"`
