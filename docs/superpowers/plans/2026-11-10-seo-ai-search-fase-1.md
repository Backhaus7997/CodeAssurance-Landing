# SEO y búsqueda con IA — Fase 1 — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar code-assurance.com listo para que Google, Bing y los asistentes de IA lo entiendan y lo citen: base técnica completa, servicios por intención de contratación, `/pricing/` y las primeras cuatro guías.

**Architecture:** Igual que hoy: contenido tipado en `content/`, plantillas de servidor en `components/`, rutas estáticas en `app/`. Un registro único de páginas indexables (`lib/routes.ts`) alimenta el sitemap, `llms.txt`, los controles de enlaces y los e2e. El JSON-LD se arma con funciones puras (`lib/jsonld.ts`) y se imprime con un componente.

**Tech Stack:** Next 16.1.4 (App Router, `output: "export"`), React 19, Tailwind 4, Vitest, Playwright. Sin dependencias nuevas.

**Spec:** `docs/superpowers/specs/2026-11-10-seo-ai-search-design.md` (fase 1 = sección 7, punto 1).

## Global Constraints

- Export estático: todo `sitemap.ts`, `robots.ts` y route handler declara `export const dynamic = "force-static"`; las rutas dinámicas usan `generateStaticParams` y `dynamicParams = false`.
- Sin dependencias nuevas de runtime ni de desarrollo.
- Componentes nuevos de servidor (sin `"use client"`); el único movimiento permitido es el `Reveal` existente.
- Enlaces internos siempre con barra final (`/services/api-testing/`). URL absoluta = `SITE_URL` de `content/site.ts` + ruta.
- El agente se llama siempre "our AI QA agent". La lista de términos prohibidos de `content/content.test.ts` aplica a todo el contenido nuevo.
- Sin precios: ningún monto, moneda ni tarifa en ningún texto (control en la tarea 5).
- Marcas del equipo (Disney, FIFA, PayPal, Royal Caribbean, Numerade, Deloitte, Globant) solo como "our engineers have delivered QA on teams at…"; nunca en la misma oración que "client", "customer" o "partner"; sin logos.
- Hechos que se pueden afirmar (y ningún otro): ingenieros con 8+ años de experiencia; trabajo en inglés o español desde Argentina (UTC−3), con buena superposición horaria con EE.UU.; mes a mes, sin contrato largo, y si el primer mes no sirve se corta ahí; el primer entregable es el mapa de cobertura del código (semana 1); el agente es un pipeline de agentes especializados que un QA senior opera y revisa; los tests llegan como pull requests en GitHub, GitLab o Azure DevOps; los casos de prueba van a la herramienta del cliente (Azure DevOps Test Plans incluido); cuando un locator se rompe, el agente lo vuelve a encontrar en la página y propone el arreglo, que espera aprobación; herramientas: las que ya figuran en el sitio, más Appium, Provar y Postman; la cotización sale de un assessment en una llamada.
- Límites: `seo.title` ≤ 60 caracteres y único en el sitio; `seo.description` 120–160; `answer` 40–70 palabras; `faq` ≥ 3; guías ≥ 1,000 palabras.
- Fechas ISO `YYYY-MM-DD`; `updated` y `published` = fecha del día en que se escribe el texto.
- Autor de las guías: `{ name: "Martin Backhaus", role: "Founder" }` (rol pendiente de confirmar por el usuario antes de publicar la fase 1).
- Contenido nuevo solo en inglés. Lo que se toca en español usa voseo.
- JavaScript de primera carga: `/` ≤ 259,103 bytes gzip; cada página de texto nueva ≤ la de `/privacy/`.
- No se hace push ni se publica: la publicación es aparte, con el OK del usuario después de revisar los textos.
- Commits terminan con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. Header de escritorio con seis enlaces entre 760 y 1000 px de ancho: no debe desbordar ni empujar el botón de agenda fuera de pantalla (test en la tarea 10, a 800 px).
2. Build sin `NEXT_PUBLIC_BOOKING_URL` ni variables de verificación: no se imprime ninguna meta de verificación y `llms.txt` ofrece el mail como contacto (tests en las tareas 3 y 11).
3. Alguien pega la etiqueta `<meta …>` completa en la variable de verificación en vez del código: el build falla con un error que nombra la variable (test en la tarea 3).
4. Un texto con `</script>` o comillas dentro de una respuesta frecuente: el JSON-LD no puede cerrar la etiqueta ni romperse (test en la tarea 2).
5. Servicios que existen solo en inglés: no deben anunciar `hreflang` a páginas `/es/` que no existen; todo `hreflang` exportado responde 200 (test en la tarea 7).

---

### Task 1: Registro de páginas, sitemap y robots

**Files:**
- Create: `lib/routes.ts`, `lib/routes.test.ts`, `lib/robots.ts`, `lib/robots.test.ts`, `lib/sitemap.ts`, `lib/sitemap.test.ts`, `app/robots.ts`, `app/sitemap.ts`, `e2e/seo.spec.ts`
- Modify: `content/types.ts` (agregar `updated` a `SiteContent.meta` y a `SiteContent.privacy.meta`), `content/services/types.ts` (agregar `updated: string`), `content/en.ts`, `content/es.ts`, `content/services/en.ts`, `content/services/es.ts` (cargar `updated`)
- Delete: `public/sitemap.xml`, `public/robots.txt`

**Interfaces:**
- Produces:
  - `type PageSection = "home" | "services" | "pricing" | "guides" | "privacy"`
  - `type IndexablePage = { path: string; locale: Locale; alternatePath?: string; label: string; title: string; description: string; updated: string; section: PageSection }` (`label` = el h1 de la página)
  - `indexablePages(): IndexablePage[]`; `NOINDEX_PATHS = ["/how-we-work/"]`; `pageByPath(path: string): IndexablePage | undefined`
  - `AI_CRAWLERS: readonly string[]` y `robotsConfig(): MetadataRoute.Robots`
  - `sitemapEntries(): MetadataRoute.Sitemap`
  - Las tareas 6 a 9 agregan sus páginas a `indexablePages()`.

- [ ] **Step 1: Tests que fallan**

`lib/routes.test.ts`:
```ts
it("lists the ten pages that exist today", () => {
  expect(indexablePages().map((p) => p.path).sort()).toEqual([
    "/", "/es/", "/es/privacy/", "/es/services/automated-testing/", "/es/services/code-quality/",
    "/es/services/performance-audit/", "/es/services/security-review/", "/privacy/",
    "/services/automated-testing/", "/services/code-quality/", "/services/performance-audit/", "/services/security-review/",
  ]);
});
it("never lists a noindex page", () => expect(indexablePages().some((p) => NOINDEX_PATHS.includes(p.path))).toBe(false));
it("pairs every alternate with a listed page", () => { /* cada alternatePath está en la lista y apunta de vuelta */ });
it("uses ISO dates", () => { /* updated cumple /^\d{4}-\d{2}-\d{2}$/ */ });
```
`lib/robots.test.ts`: `robotsConfig()` tiene una regla `userAgent: "*"` con `allow: "/"`, una regla cuyo `userAgent` es exactamente `["Googlebot","Bingbot","Google-Extended","GPTBot","OAI-SearchBot","ChatGPT-User","ClaudeBot","Claude-User","Claude-SearchBot","PerplexityBot","Perplexity-User","Applebot","Applebot-Extended","CCBot"]` con `allow: "/"`, y `sitemap === "https://www.code-assurance.com/sitemap.xml"`; ninguna regla tiene `disallow`.
`lib/sitemap.test.ts`: una entrada por página indexable, `url` absoluta, `lastModified === updated`, y `alternates.languages` con `en`, `es` solo en las páginas con `alternatePath`.

- [ ] **Step 2: Correr y ver que fallan** — `npx vitest run lib/routes.test.ts lib/robots.test.ts lib/sitemap.test.ts` → FAIL (módulos inexistentes).

- [ ] **Step 3: Implementar** `lib/routes.ts`, `lib/robots.ts`, `lib/sitemap.ts`; `app/robots.ts` y `app/sitemap.ts` solo exportan `dynamic = "force-static"` y devuelven `robotsConfig()` / `sitemapEntries()`. Borrar los dos archivos de `public/`.

- [ ] **Step 4: Tests unitarios pasan** — mismo comando → PASS.

- [ ] **Step 5: e2e que falla, después pasa.** En `e2e/seo.spec.ts`:
  - `"sitemap lists exactly the indexable exported pages"`: lee `out/**/index.html` con `fs`, descarta `404/`, `_not-found/` y los que tienen `<meta name="robots" content="noindex`; compara ese conjunto con los `<loc>` de `/sitemap.xml`.
  - `"robots.txt names every AI crawler and the sitemap"`: cada nombre de `AI_CRAWLERS` aparece como `User-Agent:`; aparece `Sitemap: https://www.code-assurance.com/sitemap.xml`.

  Run: `npx next build && npx playwright test e2e/seo.spec.ts` → PASS en desktop, mobile e iphone. Confirmar que existen `out/robots.txt` y `out/sitemap.xml`.

- [ ] **Step 6: Commit** — `git commit -m "Generate sitemap and robots from a page registry"`

### Task 2: JSON-LD y la empresa en todas las páginas

**Files:**
- Create: `lib/jsonld.ts`, `lib/jsonld.test.ts`, `components/content/JsonLd.tsx`, `content/pages/types.ts` (con `FaqItem = { q: string; a: string }` y `Author = { name: string; role: string }`; la tarea 5 agrega el resto)
- Modify: `content/site.ts` (agregar `SAME_AS: string[] = []`), `components/site/PageShell.tsx` (imprime organización y sitio), `e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `SITE_URL`, `BRAND`, `LEGAL_ENTITY`, `CONTACT_EMAIL` de `content/site.ts`.
- Produces (`type Ld = Record<string, unknown>`):
  - `ORG_ID = "https://www.code-assurance.com/#organization"`
  - `organizationLd(): Ld` — `@type: "Organization"`, `@id: ORG_ID`, `name`, `legalName: "Backhaustin S.A.S."`, `url`, `logo: SITE_URL + "/apple-icon.png"`, `email`, `areaServed: { "@type": "Country", name: "United States" }`, `availableLanguage: ["en", "es"]`, `knowsAbout` (QA, test automation, manual testing, performance testing, security testing, API testing, mobile app testing); `sameAs` solo si `SAME_AS` no está vacío.
  - `websiteLd(): Ld`; `serviceLd({ name, description, path, serviceType }): Ld` (con `provider: { "@id": ORG_ID }`); `articleLd({ headline, description, path, author, published, updated }): Ld`; `faqLd(items: FaqItem[]): Ld`; `breadcrumbLd(trail: { name: string; path: string }[]): Ld`; `itemListLd(items: { name: string; path: string }[]): Ld`
  - `serializeJsonLd(data: Ld | Ld[]): string`
  - `<JsonLd data={Ld | Ld[]} />` imprime `<script type="application/ld+json">` con `serializeJsonLd`.

- [ ] **Step 1: Tests que fallan** — en `lib/jsonld.test.ts`:
  - `serializeJsonLd({ text: 'say "hi" </script><script>' })` no contiene `</script` ni `<`, y `JSON.parse` del resultado devuelve el texto original.
  - `organizationLd()` no tiene `sameAs` con `SAME_AS` vacío; tiene `legalName` "Backhaustin S.A.S.".
  - `faqLd([{ q, a }])` produce `FAQPage` con `mainEntity[0]` `Question`/`acceptedAnswer.text === a`.
  - `breadcrumbLd` numera `position` desde 1 con URLs absolutas.
  - Ningún constructor produce las claves `review` ni `aggregateRating` (recorrer el objeto).
- [ ] **Step 2:** `npx vitest run lib/jsonld.test.ts` → FAIL.
- [ ] **Step 3: Implementar.** `serializeJsonLd` = `JSON.stringify(data).replace(/</g, "\\u003c")`.
- [ ] **Step 4:** mismo comando → PASS.
- [ ] **Step 5: e2e.** Para cada `<loc>` del sitemap, en `e2e/seo.spec.ts` (estos tests cubren también las páginas que agreguen las tareas siguientes):
  - `"every indexable page has valid organization data"`: todos los `script[type="application/ld+json"]` se parsean y entre todos aparecen `Organization` y `WebSite`;
  - `"every indexable page has one h1"`;
  - `"no indexable page scrolls sideways"`: `document.documentElement.scrollWidth <= window.innerWidth` en los tres proyectos (1280, 375, iPhone).

  Run: `npx next build && npx playwright test e2e/seo.spec.ts` → PASS.
- [ ] **Step 6: Commit** — `git commit -m "Describe the company with JSON-LD on every page"`

### Task 3: Metas de verificación de Google y Bing

**Files:**
- Create: `lib/verification.ts`, `lib/verification.test.ts`
- Modify: `lib/metadata.ts`, `README.md` (variables de entorno)

**Interfaces:**
- Produces: `parseVerificationToken(envName: string, raw: string | undefined): string | null` y `siteVerification(): Metadata["verification"] | undefined`, que lee `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (→ `google`) y `NEXT_PUBLIC_BING_SITE_VERIFICATION` (→ `other: { "msvalidate.01": … }`). `pageMetadata` agrega `verification` solo si hay algún código.

- [ ] **Step 1: Tests que fallan:** vacío o solo espacios → `null`; `" abc-123_XYZ "` → `"abc-123_XYZ"`; `'<meta name="google-site-verification" content="abc">'` lanza un error que contiene `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; un valor con espacios internos también lanza. Un código válido acepta solo `[A-Za-z0-9_-]`.
- [ ] **Step 2:** `npx vitest run lib/verification.test.ts` → FAIL.
- [ ] **Step 3: Implementar** con el mismo patrón que `lib/booking.ts` (lectura en build, error que nombra la variable).
- [ ] **Step 4:** → PASS. Además: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123 npx next build` y `grep -c 'google-site-verification' out/index.html` → `1`; sin la variable → `0`.
- [ ] **Step 5: Commit** — `git commit -m "Support Search Console and Bing verification tags"`

### Task 4: El h1 de la home dice la frase una sola vez

**Files:**
- Modify: `components/home/RotatingWord.tsx`, `e2e/home-hero.spec.ts`

**Interfaces:**
- Consumes: el `<h1>` de `components/home/Hero.tsx` no cambia (el `sr-only` con la primera palabra sigue siendo el texto accesible).

- [ ] **Step 1: Tests que fallan** en `e2e/home-hero.spec.ts`:
  - `"the exported h1 says the sentence once"`: `request.get("/")` y `request.get("/es/")`; del HTML crudo, el texto del `<h1>` sin etiquetas y con espacios colapsados es exactamente `"QA built around your product, not a template"` y `"QA a medida de tu producto, no de una plantilla"`.
  - Cambiar `"the headline stays on 'product'"`: en vez de `toHaveText("product,")`, el elemento `hero-rotating` tiene `data-word="product,"` y un ancho mayor que 0.
- [ ] **Step 2:** `npx next build && npx playwright test e2e/home-hero.spec.ts` → FAIL en el test nuevo.
- [ ] **Step 3: Implementar.** Los spans que reservan el ancho pasan a `<span data-word={text} className="invisible col-start-1 row-start-1 before:content-[attr(data-word)]" />`. Sin movimiento, el span visible también usa `data-word={texts[0]}` + `before:content-[attr(data-word)]` en vez de texto. Con movimiento, `TextRotate` queda como está.
- [ ] **Step 4:** mismo comando → PASS, incluida la prueba de reflow que ya existe.
- [ ] **Step 5: Commit** — `git commit -m "Keep the rotating words out of the home h1 text"`

### Task 5: Reglas de contenido y metadatos de las páginas existentes

**Files:**
- Create: `content/pages/types.ts`, `lib/content-checks.ts`, `lib/content-checks.test.ts`
- Modify: `content/content.test.ts`, `content/en.ts`, `content/es.ts` (`meta` de la home y de privacidad), `content/services/en.ts`, `content/services/es.ts` (`meta` de los cuatro servicios)

**Interfaces:**
- Produces, en `content/pages/types.ts` (que ya tiene `FaqItem` y `Author` de la tarea 2):
  - `ContentSection = { heading: string; paragraphs: string[]; bullets?: string[] }`
  - `PageCopy = { seo: { title: string; description: string }; eyebrow: string; h1: string; answer: string; sections: ContentSection[]; faq: FaqItem[]; related: string[]; updated: string }`
  - `HubCopy = Pick<PageCopy, "seo" | "eyebrow" | "h1" | "answer" | "updated">`
  - `GuideSlug = "how-to-hire-a-qa-company" | "qa-outsourcing-vs-in-house-qa" | "how-to-improve-qa-in-your-company" | "qa-outsourcing-cost"`; `Guide = PageCopy & { slug: GuideSlug; author: Author; published: string }`
- Produces, en `lib/content-checks.ts`: `wordCount(text: string): number`, `shingles(text: string, n?: number): Set<string>` (n = 5, palabras en minúscula sin puntuación), `jaccard(a: Set<string>, b: Set<string>): number`, `sentences(text: string): string[]`, `hasPriceFigure(text: string): boolean`, `brandNearClient(text: string): string | null` (devuelve la oración culpable).
- `content/content.test.ts` expone un arreglo `COPY` (`{ name: string; copy: unknown }[]`) al que las tareas 6 a 9 agregan sus colecciones. Las reglas de abajo y los tests que ya existen (términos prohibidos, `href` vacíos) recorren `sources` y `COPY`.

- [ ] **Step 1: Tests que fallan** en `lib/content-checks.test.ts`: `wordCount("Hello,  world — again")` → 3; `jaccard` de un texto consigo mismo → 1 y de dos textos sin secuencias en común → 0; `hasPriceFigure` es `true` para `"from $4,000/month"`, `"USD 30"`, `"$25–49 per hour"`, `"30 USD/hr"` y `false` para `"8+ years"` y `"UTC−3"`; `brandNearClient("Our clients include PayPal.")` devuelve esa oración y `brandNearClient("Our engineers have delivered QA on teams at PayPal.")` → `null`.

  En `content/content.test.ts`, nuevos `it` sobre todo `sources` + `COPY`: sin cifras de precio; sin marca junto a client/customer/partner. Y sobre `indexablePages()`: `title.length <= 60`, títulos únicos, `120 <= description.length <= 160`.
- [ ] **Step 2:** `npx vitest run` → FAIL (las descripciones de hoy no cumplen: la de la home tiene 168 caracteres y la de privacidad 79).
- [ ] **Step 3: Implementar** las funciones y reescribir `meta.title` y `meta.description` de `/`, `/es/`, `/privacy/`, `/es/privacy/` y los cuatro servicios en los dos idiomas, con la frase que busca la gente. Ejemplos de dirección, no de texto exacto: home → "QA services and test automation"; automatización → "Test automation services"; en español → "Servicios de QA y automatización de pruebas".
- [ ] **Step 4:** `npx vitest run` → PASS.
- [ ] **Step 5: Commit** — `git commit -m "Add content rules and search-focused titles for existing pages"`

### Task 6: Plantilla de servicio con respuesta directa, migas, relacionados y JSON-LD

**Files:**
- Create: `components/content/AnswerLead.tsx`, `components/content/Faq.tsx`, `components/content/RelatedLinks.tsx`, `components/content/Breadcrumbs.tsx`
- Modify: `content/types.ts`, `content/services/types.ts` (`summary` → `answer`; agregar `related: string[]`; `slug: AnyServiceSlug`), `content/services/en.ts`, `content/services/es.ts`, `components/services/ServicePage.tsx`, `components/site/PrivacyPage.tsx` (migas: `Home › Privacy policy` / `Inicio › Política de privacidad`), `app/(en)/services/[slug]/page.tsx`, `app/(es)/es/services/[slug]/page.tsx`, `lib/routes.ts`, `content/content.test.ts`, `e2e/services.spec.ts`

**Interfaces:**
- Produces, en `content/types.ts`: `EnOnlyServiceSlug = "manual-qa-testing" | "dedicated-qa-engineers" | "ai-qa-agent" | "mobile-app-testing" | "api-testing"`; `AnyServiceSlug = ServiceSlug | EnOnlyServiceSlug`; `EN_ONLY_SERVICE_SLUGS`; `EN_SERVICE_SLUGS = [...SERVICE_SLUGS, ...EN_ONLY_SERVICE_SLUGS]`. `servicesEn: Record<AnyServiceSlug, ServiceContent>` (las cinco nuevas llegan en la tarea 7; hasta entonces el tipo se declara `Partial` y la tarea 7 lo vuelve completo). `servicesEs` sigue siendo `Record<ServiceSlug, ServiceContent>`.
- Produces, componentes: `<AnswerLead text />` (párrafo `data-testid="answer"`); `<Faq title items />` (el markup de `<details>` que hoy está en `ServicePage`, `data-testid="faq"`) más `faqLd`; `<RelatedLinks title hrefs />` (texto = `pageByPath(href).label`; si falta la página, error en build); `<Breadcrumbs trail />` (`<nav aria-label="Breadcrumb">` más `breadcrumbLd`).
- `ServicePage` recibe `breadcrumbs: { name: string; path: string }[]` y `relatedTitle: string`; imprime `serviceLd` y `faqLd`. Migas: EN `Home › Services › {h1}` (la de "Services" apunta a `/services/`, que crea la tarea 7); ES `Inicio › {h1}`.

- [ ] **Step 1: Tests que fallan.**
  - `content/content.test.ts`: agregar los servicios en inglés y en español a `COPY`; `answer` de 40 a 70 palabras; `faqs.length >= 3`; cada `related` está en `indexablePages()`; el test viejo de "8 FAQs en todos" pasa a valer solo para los cuatro bilingües.
  - `e2e/services.spec.ts`: los h1 pasan a ser, en inglés, "Test automation services", "Performance testing and audit services", "Security testing services" y "Code quality review services"; en español, "Servicios de automatización de pruebas", "Servicios de pruebas y auditoría de performance", "Servicios de pruebas de seguridad" y "Servicios de revisión de calidad de código". Cada página tiene `getByTestId("answer")` visible y su JSON-LD incluye `Service`, `FAQPage` y `BreadcrumbList`.
- [ ] **Step 2:** `npx vitest run` → FAIL.
- [ ] **Step 3: Implementar.** Reescribir los cuatro servicios en los dos idiomas: `title` (los h1 del paso 1), `answer` y `related`. Por ahora `related` solo apunta a los otros servicios que existen; las tareas 7, 8 y 9 suman los enlaces a sus páginas cuando ya existen. En inglés, `/services/automated-testing/` reemplaza sus tarjetas de `howItWorks` por los tres casos ("Starting from zero", "You already have a suite", "You need it maintained") y suma una cuarta tarjeta sobre el agente como add-on. En español, `related: []` (no hay destinos en español) y la sección de relacionados no se muestra.
- [ ] **Step 4:** `npx vitest run` → PASS; `npx next build && npx playwright test e2e/services.spec.ts e2e/seo.spec.ts` → PASS.
- [ ] **Step 5: Commit** — `git commit -m "Give service pages direct answers, breadcrumbs and service data"`

### Task 7: Cinco servicios nuevos y el índice `/services/`

**Files:**
- Create: `content/hubs.ts`, `components/content/HubPage.tsx`, `app/(en)/services/page.tsx`
- Modify: `content/services/en.ts` (cinco servicios nuevos; el tipo deja de ser `Partial`), `app/(en)/services/[slug]/page.tsx` (recorre `EN_SERVICE_SLUGS`; `alternatePath` y `hreflang` solo para `SERVICE_SLUGS`; `PageShell alternateHref` = la versión en español o `/es/`), `lib/routes.ts`, `e2e/services.spec.ts`, `e2e/seo.spec.ts`

**Interfaces:**
- Produces: `servicesHub: HubCopy`; `<HubPage hub items={{ label: string; href: string; description: string }[]} breadcrumbs />`, que imprime `itemListLd` y `breadcrumbLd`.

- [ ] **Step 1: Tests que fallan.**
  - `e2e/services.spec.ts`: las cinco rutas nuevas responden 200, con un solo h1 y `getByTestId("faq")`. Los h1 son "Manual QA testing services", "Dedicated QA engineers for your team", "AI QA agent for your test suite", "Mobile app testing services for Android and iOS" y "API testing services". `/services/` tiene el h1 "QA services" y lista exactamente los nueve servicios.
  - `e2e/seo.spec.ts`, `"every hreflang target exists"`: para cada página del sitemap, cada `link[rel=alternate][hreflang]` responde 200. Las cinco nuevas no tienen `hreflang="es"`.
- [ ] **Step 2:** `npx next build && npx playwright test e2e/services.spec.ts e2e/seo.spec.ts` → FAIL.
- [ ] **Step 3: Escribir los cinco servicios** con la forma de `ServiceContent` y los hechos de Global Constraints:
  - `manual-qa-testing`: funcional, regresión, exploratorio, apoyo a UAT.
  - `dedicated-qa-engineers`: testers manuales o de automatización dentro del equipo, participan de sus ceremonias, mes a mes.
  - `ai-qa-agent`: add-on de cualquier paquete; mapa de cobertura, tests en el framework del cliente, locators que se vuelven a encontrar, arreglos como PRs que esperan aprobación, revisión humana.
  - `mobile-app-testing`: Android e iOS, dispositivos reales y emuladores, Appium.
  - `api-testing`: Postman, contratos, validación SQL.

  Escribir también `servicesHub` y la página `/services/`. Sumar enlaces a los servicios nuevos en el `related` de los cuatro que ya existen, en inglés.
- [ ] **Step 4:** `npx vitest run` y el comando del paso 2 → PASS.
- [ ] **Step 5: Commit** — `git commit -m "Add manual, dedicated, AI agent, mobile and API testing pages"`

### Task 8: `/pricing/` (cómo se cotiza)

**Files:**
- Create: `content/pricing.ts`, `components/content/ContentSections.tsx`, `components/content/TopicPage.tsx`, `app/(en)/pricing/page.tsx`
- Modify: `lib/routes.ts`, `content/content.test.ts`, `e2e/seo.spec.ts`

**Interfaces:**
- Produces: `pricing: PageCopy`; `<ContentSections sections />` (cada `heading` es un `<h2>`); `<TopicPage copy breadcrumbs relatedTitle faqTitle children? />` (h1, `AnswerLead`, secciones, `Faq`, `RelatedLinks`, `Start`; el `children` opcional va entre la respuesta y las secciones; la tarea 9 lo usa para la firma).

- [ ] **Step 1: Tests que fallan:** `pricing` entra en `COPY`; `e2e/seo.spec.ts` `"/pricing/ answers how pricing works"`: un solo h1, `answer` visible, JSON-LD con `FAQPage` y `BreadcrumbList`. Las cifras de precio ya las frena el test de contenido de la tarea 5.
- [ ] **Step 2:** `npx vitest run && npx next build && npx playwright test e2e/seo.spec.ts` → FAIL.
- [ ] **Step 3: Escribir `pricing`.**
  - h1: "How pricing works".
  - Secciones:
    - qué se mira en la llamada;
    - qué hace variar el precio: flujos, integraciones, plataformas, estado de la suite (desde cero, ampliar, mantener), manual o automatización, dedicación, el agente como add-on;
    - qué incluye la cotización;
    - cómo corre un trabajo: mes a mes, y se corta si el primer mes no sirve.
  - Al menos cuatro preguntas frecuentes.
  - Sumar `/pricing/` al `related` de los nueve servicios en inglés.
- [ ] **Step 4:** el comando del paso 2 → PASS.
- [ ] **Step 5: Commit** — `git commit -m "Add a pricing page that explains how quotes work"`

### Task 9: Guías: índice, plantilla y las cuatro primeras

**Files:**
- Create: `content/guides/author.ts`, `content/guides/how-to-hire-a-qa-company.ts`, `content/guides/qa-outsourcing-vs-in-house-qa.ts`, `content/guides/how-to-improve-qa-in-your-company.ts`, `content/guides/qa-outsourcing-cost.ts`, `content/guides/index.ts`, `components/content/Byline.tsx`, `components/content/GuidePage.tsx`, `app/(en)/guides/page.tsx`, `app/(en)/guides/[slug]/page.tsx`
- Modify: `content/hubs.ts` (`guidesHub`), `lib/routes.ts`, `content/content.test.ts`, `e2e/seo.spec.ts`

**Interfaces:**
- Produces: `AUTHOR: Author`; `guides: Guide[]` (orden de lectura sugerido) y `guidesByUpdated(): Guide[]` (más nueva primero, para el índice); `<Byline author published updated />` (`<time dateTime>`); `<GuidePage guide />` = `TopicPage` + `Byline` + `articleLd`.

- [ ] **Step 1: Tests que fallan.**
  - Las guías entran en `COPY`; cada una tiene `wordCount(answer + secciones + faq) >= 1000`, `author.name === "Martin Backhaus"`, fechas válidas y `updated >= published`.
  - e2e: `/guides/` (h1 "QA guides") lista las cuatro; cada guía tiene un solo h1, `Byline` con `time[datetime]` y JSON-LD con `Article` (`author.name` "Martin Backhaus"), `FAQPage` y `BreadcrumbList`.
  - e2e `"every page except the home has breadcrumbs"`: cada `<loc>` del sitemap salvo `/` y `/es/` tiene `BreadcrumbList` en su JSON-LD.
- [ ] **Step 2:** `npx vitest run && npx next build && npx playwright test e2e/seo.spec.ts` → FAIL.
- [ ] **Step 3: Escribir las cuatro guías.** Los h1 son los títulos en negrita de la lista. Útiles aunque el lector no nos contrate; el servicio aparece recién en la última sección. Subtítulos en forma de pregunta. Usar `HubPage` (tarea 7) para `/guides/`. Sumar en cada servicio en inglés y en `/pricing/` el enlace a la guía que corresponda.
  1. **How to hire a QA company: a buyer's checklist.** Cuándo conviene; los tres modelos (proyecto, equipo dedicado, testers dentro del equipo); qué preguntar; señales de alerta; cómo debería verse el primer mes; qué preparar antes de la llamada.
  2. **QA outsourcing vs. an in-house QA team.** Qué da cada uno; tiempo para arrancar; conocimiento que se queda; de qué depende el costo, sin cifras; el modelo híbrido; checklist para decidir.
  3. **How to improve QA in your company.** Medir dónde se escapan los bugs; mapa de riesgo; niveles de prueba; automatizar primero los flujos críticos; política de tests inestables; definición de terminado; quién es responsable; ritmo.
  4. **What QA outsourcing costs depend on.** Modelo de trabajo; alcance (flujos, integraciones, plataformas); estado de la suite; dedicación; herramientas e infraestructura; cómo conseguir una cotización precisa: el assessment. Sin cifras.
- [ ] **Step 4:** el comando del paso 2 → PASS.
- [ ] **Step 5: Commit** — `git commit -m "Add the guides section with the first four guides"`

### Task 10: Header y footer enlazan las páginas nuevas

**Files:**
- Modify: `content/types.ts` (`PageLink = { label: string; href: string }`; `header.pages: PageLink[]`; `footer.groups: { title: string; links: PageLink[] }[]`), `content/en.ts`, `content/es.ts`, `components/site/Header.tsx`, `components/site/Footer.tsx`, `content/content.test.ts`, `e2e/shell.spec.ts`

**Interfaces:**
- En inglés: `header.pages` = Services `/services/`, Guides `/guides/` (van antes de los anclajes). `footer.groups` = "Services" (los nueve) y "Resources" (Pricing, Guides).
- En español: `header.pages = []`; `footer.groups` = "Servicios" (los cuatro `/es/services/…`).

- [ ] **Step 1: Tests que fallan.**
  - `content/content.test.ts`: todo `href` de `header.pages` y `footer.groups` está en `indexablePages()`.
  - `e2e/shell.spec.ts`:
    - `"the desktop header fits at 800 px"`: con viewport 800×800 en `/`, `document.documentElement.scrollWidth <= 800` y el botón de agenda o de contacto está dentro del viewport;
    - `"footer links reach every service"`: los nueve enlaces del footer en `/` responden 200.
- [ ] **Step 2:** `npx vitest run && npx next build && npx playwright test e2e/shell.spec.ts` → FAIL.
- [ ] **Step 3: Implementar.** Si a 800 px no entra, el header muestra los anclajes de secciones recién desde 1100 px y los enlaces a páginas desde 760 px.
- [ ] **Step 4:** el comando del paso 2 → PASS.
- [ ] **Step 5: Commit** — `git commit -m "Link services, pricing and guides from the header and footer"`

### Task 11: `llms.txt` y `llms-full.txt`

**Files:**
- Create: `lib/llms.ts`, `lib/llms.test.ts`, `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`
- Modify: `e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `indexablePages()`, `servicesEn`, `pricing`, `guides`, `servicesHub`, `bookingUrl`, `CONTACT_EMAIL`.
- Produces:
  - `buildLlmsTxt(contact: { bookingUrl: string | null; email: string }): string`
  - `buildLlmsFullTxt(): string`
  - Las rutas exportan `dynamic = "force-static"` y un `GET` que devuelve `text/plain; charset=utf-8`.

- [ ] **Step 1: Tests que fallan.**
  - `buildLlmsTxt` empieza con `"# Code Assurance\n\n> "`.
  - Tiene las secciones `## Services`, `## Pricing`, `## Guides` y `## Optional` (privacidad), y enlaza `"https://www.code-assurance.com/"`.
  - Contiene un enlace absoluto a cada página indexable en inglés, y ninguna `/es/` ni `/how-we-work/`.
  - Con `bookingUrl` lo nombra como forma de contacto; con `null` nombra el mail.
  - Dice que no hay precios publicados y que se cotiza tras un assessment.
  - `buildLlmsFullTxt` contiene el `answer` y todas las preguntas frecuentes de cada servicio en inglés, de `/pricing/` y de cada guía.
- [ ] **Step 2:** `npx vitest run lib/llms.test.ts` → FAIL.
- [ ] **Step 3: Implementar** con el formato de llmstxt.org: título, cita de una línea, párrafo de contacto, secciones `- [label](url): description`. `llms-full.txt` en Markdown: `# h1`, `URL: …`, la respuesta, `## sección` y `### pregunta`.
- [ ] **Step 4:** → PASS. e2e `"llms files list every English page"`: `/llms.txt` responde 200 y contiene cada `<loc>` en inglés del sitemap; `/llms-full.txt` responde 200. Run: `npx next build && npx playwright test e2e/seo.spec.ts` → PASS.
- [ ] **Step 5: Commit** — `git commit -m "Publish llms.txt and llms-full.txt for AI assistants"`

### Task 12: IndexNow y los pasos de publicación

**Files:**
- Create: `public/<clave>.txt`, `scripts/indexnow.mjs`
- Modify: `content/site.ts` (`INDEXNOW_KEY`), `content/content.test.ts`, `README.md`

**Interfaces:**
- `INDEXNOW_KEY`: 32 caracteres hexadecimales, generados una vez con `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`.
- `public/${INDEXNOW_KEY}.txt` contiene solo la clave.
- `node scripts/indexnow.mjs [--dry-run]`:
  - lee `out/sitemap.xml` y busca en `public/` el único archivo `/^[0-9a-f]{32}\.txt$/` cuyo contenido es su nombre;
  - hace `POST https://api.indexnow.org/indexnow` con `{ host: "www.code-assurance.com", key, keyLocation, urlList }`;
  - termina con código 1 y un mensaje claro si no encuentra exactamente una clave, si el sitemap no existe o si la respuesta no es 200 ni 202;
  - con `--dry-run` imprime el JSON y no envía nada.

- [ ] **Step 1: Test que falla:** `content/content.test.ts` comprueba que `public/${INDEXNOW_KEY}.txt` existe y su contenido es la clave.
- [ ] **Step 2:** `npx vitest run` → FAIL.
- [ ] **Step 3: Implementar.** Actualizar en `README.md` los pasos de publicación:
  - las variables `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` y `NEXT_PUBLIC_BING_SITE_VERIFICATION`;
  - después del push y del deploy de Pages, correr `node scripts/indexnow.mjs`.
- [ ] **Step 4:** `npx vitest run` → PASS; `npx next build && node scripts/indexnow.mjs --dry-run` imprime un `urlList` con todas las URLs del sitemap y no hace ningún pedido de red.
- [ ] **Step 5: Commit** — `git commit -m "Add IndexNow key and ping script"`

### Task 13: Verificación de la fase, documento de textos y tareas fuera del sitio

**Files:**
- Create (fuera del repo): `/Users/ca/Downloads/CodeAssurance Cotizaciones/seo/fase-1-textos.md`, `/Users/ca/Downloads/CodeAssurance Cotizaciones/seo/tareas-fuera-del-sitio.md`, `/Users/ca/Downloads/CodeAssurance Cotizaciones/seo/preguntas-medicion.md`

- [ ] **Step 1: Corrida completa.** `npm run typecheck && npm run lint && npm test && npm run test:e2e`. Esperado: todo verde (los e2e que hoy se saltean por diseño siguen salteados).
- [ ] **Step 2: Peso de JavaScript.**
  - `node scripts/first-load-js.mjs out/index.html` → `first-load-js-gzip-bytes` ≤ 259103.
  - El número de `out/pricing/index.html` y de `out/guides/how-to-hire-a-qa-company/index.html` ≤ el de `out/privacy/index.html`.
- [ ] **Step 3: Documento de textos.** `fase-1-textos.md` debe tener:
  - una tabla con ruta, título y descripción de cada página del sitemap (sacada de `out/**/index.html`);
  - el contenido de `out/llms-full.txt`;
  - los textos en español que cambiaron.

  Es lo que el usuario revisa antes de publicar.
- [ ] **Step 4: Tareas fuera del sitio.** `tareas-fuera-del-sitio.md` explica paso a paso cada tarea:
  - Search Console: propiedad de dominio por DNS o meta con la variable, y enviar el sitemap;
  - Bing Webmaster: importar desde Search Console y enviar el sitemap;
  - Clutch, a partir de `Clutch_Perfil_CodeAssurance.md`, sin los precios provisorios;
  - GoodFirms;
  - LinkedIn.

  `preguntas-medicion.md` tiene 20 preguntas de compradores de EE.UU. y una tabla mensual por asistente (ChatGPT, Perplexity, Claude, Gemini): ¿cita?, ¿recomienda?, URL citada.
- [ ] **Step 5: Commit en el repo** solo si los pasos 1 y 2 tocaron algo; los documentos de fuera del repo no se commitean.
