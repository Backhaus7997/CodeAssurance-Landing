# SEO y visibilidad en asistentes de IA para code-assurance.com — diseño

- Fecha: 2026-11-10
- Branch: `seo/ai-search` (sale de `main` en `2aa7cb8`, el sitio publicado)
- Spec anterior, cuyas reglas siguen vigentes: `2026-11-09-rediseno-landing-outbound-design.md`

## 1. Objetivo

Que alguien de EE.UU. que le pregunta a Google o a un asistente de IA (ChatGPT, Perplexity, Claude, Gemini,
AI Overviews de Google, Copilot) cómo contratar una empresa de QA, cómo mejorar el QA de su empresa o de su
aplicación, o algo vecino, encuentre a code-assurance.com o lo vea citado como fuente.

Lo que el sitio puede resolver por sí mismo: estar indexado en Google y Bing, tener una página que responda cada
pregunta de forma directa y citable, y describir la empresa y sus servicios en datos que las máquinas entienden.
La otra mitad del resultado (menciones en Clutch, directorios, LinkedIn, reseñas) se trabaja fuera del sitio y
queda como lista de tareas para el usuario (sección 9). No se puede garantizar aparecer en todas las búsquedas.

### Criterios de éxito (todos verificables en el build)

1. Cada página indexable tiene un título único de hasta 60 caracteres, una descripción de 120 a 160, una URL
   canónica y un solo `<h1>`.
2. El texto del `<h1>` de `/` y de `/es/` aparece una sola vez en el HTML exportado (hoy aparece con todas las
   palabras que rotan: "QA built around your product , product, stack, sprints, …").
3. Cada página indexable tiene JSON-LD válido (se parsea) con los tipos que le corresponden (sección 6.1).
4. `sitemap.xml` lista exactamente las páginas indexables exportadas, ni una más ni una menos.
5. `robots.txt` permite explícitamente a los bots de IA de la sección 6.2 y apunta al sitemap.
6. `llms.txt` enlaza todas las páginas indexables en inglés; `llms-full.txt` contiene el texto de servicios,
   `/pricing/` y guías.
7. Los controles de contenido de la sección 5.3 pasan para todo el contenido, viejo y nuevo.
8. Todos los enlaces internos apuntan a una ruta exportada.
9. Ninguna página nueva tiene scroll horizontal a 375 px ni a 1280 px.
10. El JavaScript de primera carga de `/` no supera los 259,103 bytes gzip medidos al publicar `2aa7cb8`, y el de
    cada página de texto nueva no supera el de `/privacy/`.
11. `tsc --noEmit`, `eslint`, los tests unitarios, los e2e y `next build` pasan.

## 2. Decisiones tomadas con el usuario

| Tema | Decisión |
|---|---|
| Mercado | EE.UU. primero. Todo el contenido nuevo en inglés. En español solo se ajustan títulos, descripciones y datos estructurados de las páginas que ya existen |
| Contenido | Enfoque C: páginas por intención de contratación + `/guides/` que crece + páginas por tecnología y por industria |
| Precios | Ninguno en el sitio. Cada trabajo se cotiza después de un assessment en la llamada. `/pricing/` explica de qué depende el precio, sin cifras |
| Oferta | Automatización en tres casos (desde cero, ampliar o adoptar la suite que ya tienen, mantenimiento); QA manual, incluidos testers dentro del equipo del cliente; el agente de QA con IA como add-on de cualquier paquete |
| Mapa de páginas | Aprobado tal como está en la sección 3, incluidos mobile, API, Appium y Provar |
| Autor de las guías | Martin Backhaus, con rol y fecha de actualización (el rol se confirma antes de publicar la fase 1) |
| Revisión de textos | El usuario lee todos los textos nuevos de cada fase antes de publicarla |
| Publicación | Por fases, cada una con el OK explícito del usuario |

Reglas que se heredan de la spec anterior y aplican a todo lo nuevo: el agente se llama siempre "our AI QA
agent"; no se mencionan el registro de paquetes, el comando para ejecutarlo ni el nombre del paquete (lista en
`content/content.test.ts`); ningún número sin respaldo; ningún enlace a `#`; las marcas donde trabajó el equipo
aparecen solo como "our engineers have delivered QA on teams at…", nunca como clientes y nunca con logos.

## 3. Mapa de páginas

Todas en inglés salvo donde se indica. Las URLs que ya existen no cambian.

### 3.1 Servicios

| URL | Estado | Contenido |
|---|---|---|
| `/services/` | nueva | Índice de servicios, con una línea por servicio |
| `/services/automated-testing/` | se rearma | Tres casos con secciones propias: suite desde cero, ampliar o adoptar la que existe, mantenimiento. El agente como add-on |
| `/services/manual-qa-testing/` | nueva | Funcional, regresión, exploratorio, aceptación |
| `/services/dedicated-qa-engineers/` | nueva | Testers manuales o de automatización dentro del equipo del cliente (QA staff augmentation) |
| `/services/ai-qa-agent/` | nueva | Qué hace el agente, cómo se revisa lo que produce, cómo se suma a cualquier paquete |
| `/services/mobile-app-testing/` | nueva | Android e iOS, dispositivos reales y emuladores |
| `/services/api-testing/` | nueva | Pruebas de API y de contratos |
| `/services/performance-audit/`, `/services/security-review/`, `/services/code-quality/` | se mejoran | Títulos, respuesta directa, preguntas frecuentes, JSON-LD |

Las cuatro páginas de servicio que hoy existen en español (`/es/services/…`) se mantienen y reciben títulos,
descripciones y JSON-LD nuevos. Las páginas nuevas no tienen versión en español ni `hreflang`.

### 3.2 Cómo se cotiza

- `/pricing/`: "How pricing works". Assessment en una llamada, qué hace variar el precio (cantidad de flujos,
  integraciones, estado de la suite, plataformas, dedicación), qué recibe el cliente con la cotización. Sin cifras.

### 3.3 Guías

- `/guides/`: índice, ordenado por fecha de actualización.
- `/guides/<slug>/`, las ocho iniciales:
  1. How to hire a QA company
  2. QA outsourcing vs. an in-house QA team
  3. How to improve QA in your company
  4. How to improve your app's quality before a release
  5. How to build a test automation suite from scratch
  6. How to fix a flaky test suite
  7. What a QA audit includes
  8. What QA outsourcing costs depend on

### 3.4 Tecnologías

- `/technologies/` + `/technologies/<slug>/` para: Playwright, Cypress, Selenium, Robot Framework, Postman,
  k6 y JMeter (una sola página de pruebas de carga), Appium, Azure DevOps Test Plans, Provar.

### 3.5 Industrias

- `/industries/` + `/industries/<slug>/` para: fintech y pagos, media y streaming, deportes, viajes y
  hospitalidad, edtech, SaaS B2B.

### 3.6 Lo que no cambia

`/how-we-work/` sigue con `noindex` y fuera del sitemap y de `llms.txt`. `/privacy/` y `/es/privacy/` se indexan
como hoy.

## 4. Arquitectura

### 4.1 Contenido separado del markup (mismo patrón que hoy)

- Un archivo TypeScript por página en `content/guides/`, `content/technologies/`, `content/industries/`, y los
  servicios nuevos en `content/services/`. Cada colección tiene un `index.ts` que exporta la lista; agregar una
  guía es agregar un archivo y una línea en ese índice.
- Tipos nuevos en `content/types.ts` (o en el `types.ts` de cada colección):
  - Bloques comunes: `seo` (title, description), `h1`, `answer` (la respuesta directa), `sections` (subtítulo y
    párrafos o listas), `faq` (pregunta y respuesta), `related` (slugs de servicios, guías, tecnologías e
    industrias), `updated` (fecha ISO de la última modificación del texto; las páginas que ya existen también la
    reciben).
  - Guía: además `author` y `published` (fecha ISO).
- Los servicios que existen en los dos idiomas siguen en `SERVICE_SLUGS`; los nuevos van en una lista aparte de
  solo inglés, para que `/es/services/[slug]` no los exporte.

### 4.2 Rutas

- `app/(en)/services/page.tsx` (índice) y el `[slug]` existente, que pasa a recorrer las dos listas.
- `app/(en)/pricing/page.tsx`.
- `app/(en)/guides/page.tsx` y `app/(en)/guides/[slug]/page.tsx`.
- `app/(en)/technologies/…` e `app/(en)/industries/…` con la misma forma.
- Todas con `generateStaticParams` y `dynamicParams = false`, como los servicios.

### 4.3 Componentes

- Bloques nuevos en `components/content/`: `AnswerLead`, `ContentSections`, `Faq`, `RelatedLinks`,
  `Breadcrumbs`, `JsonLd`, `Byline`.
- Plantillas: `GuidePage`, `TopicPage` (tecnologías e industrias) y `HubPage` (índices). `ServicePage` se
  extiende con respuesta directa, preguntas frecuentes y relacionados.
- Son componentes de servidor: texto en el HTML exportado, sin JavaScript propio. Se reutilizan `PageShell`,
  `SectionHeader`, los tokens y la tipografía actuales. El único movimiento es el `Reveal` que ya existe.
- Header: se suman "Services" y "Guides" a la navegación de escritorio. Footer: enlaces a servicios, pricing,
  guías, tecnologías e industrias, para que todo quede enlazado desde todas las páginas.

### 4.4 Arreglo del h1 de la home

`RotatingWord` apila todas las palabras como texto invisible para reservar el ancho, y por eso el `<h1>` contiene
todas. Las palabras que solo reservan espacio pasan a pseudo-elementos (`content: attr(data-word)`), que no son
texto del documento. El HTML queda con la frase una sola vez y el ancho reservado no cambia (la prueba de
"sin reflow" que ya existe lo cubre).

## 5. Reglas de contenido

### 5.1 Estructura de cada página

1. Un `<h1>` con la frase que busca la gente ("Playwright test automation services").
2. Respuesta directa debajo del h1: de 40 a 70 palabras que contestan la pregunta sin rodeos.
3. Subtítulos en forma de pregunta cuando corresponde.
4. Al menos tres preguntas frecuentes propias, visibles.
5. Enlaces a servicios, guías, tecnologías e industrias relacionados.
6. Llamado a agendar al final (el `PrimaryCta` actual: agenda si hay link, mail si no).

### 5.2 Calidad

- Tecnologías e industrias: al menos 600 palabras. Guías: al menos 1,000. Cada página explica cómo trabaja el
  equipo con esa herramienta o en esa industria, qué problemas típicos resuelve y cuándo no conviene; no es
  una plantilla con el nombre cambiado.
- Industrias: la experiencia se cuenta como experiencia del equipo, sin inventar resultados ni métricas.
- Guías: útiles aunque el lector no nos contrate; el servicio aparece al final, no en cada párrafo.

### 5.3 Controles automáticos (Vitest, sobre el contenido tipado)

- Términos prohibidos y números sin respaldo: la lista actual de `content/content.test.ts` se aplica a todas las
  colecciones nuevas.
- Ningún `href` vacío o `#`; todo enlace interno apunta a una ruta que se exporta.
- Las marcas del equipo no aparecen en la misma oración que "client", "customer" ni "partner".
- `seo.title` hasta 60 caracteres y único en todo el sitio; `seo.description` de 120 a 160.
- `answer` de 40 a 70 palabras; `faq` con al menos tres preguntas.
- Largo mínimo por colección (5.2).
- Similitud: dentro de tecnologías y dentro de industrias, ningún par de páginas supera 0.25 de similitud
  Jaccard sobre secuencias de cinco palabras. El umbral se calibra en el plan con las primeras páginas reales
  y queda fijo en el test.
- Todas las páginas: `updated` es una fecha válida. Guías: además `author` y `published`, y `updated` no es
  anterior a `published`.

## 6. Base técnica

### 6.1 JSON-LD

- En todas las páginas: `Organization` / `ProfessionalService` (nombre, `legalName` Backhaustin S.A.S., URL,
  logo, email, idiomas, `areaServed` Estados Unidos, `knowsAbout`) y `WebSite`. Los enlaces a LinkedIn y Clutch
  (`sameAs`) se agregan cuando existan.
- Servicios: `Service` con `provider` y `serviceType`.
- Guías: `Article` con `author` (`Person`), `datePublished` y `dateModified`.
- Páginas con preguntas: `FAQPage` con las mismas preguntas y respuestas visibles.
- Todas salvo la home: `BreadcrumbList`. Índices: `ItemList`.
- Prohibido: `Review`, `AggregateRating` o cualquier dato que no esté visible en la página.
- Se arma desde el contenido tipado con funciones puras en `lib/jsonld.ts` (con tests) y se imprime con
  `JsonLd`, escapando `<` para que el JSON no pueda cerrar el `<script>`.

### 6.2 robots.txt

Se genera desde `app/robots.ts`. Permite todo y nombra explícitamente a: `Googlebot`, `Bingbot`,
`Google-Extended`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`,
`PerplexityBot`, `Perplexity-User`, `Applebot`, `Applebot-Extended`, `CCBot`. Incluye la URL del sitemap.
Reemplaza a `public/robots.txt`.

### 6.3 Sitemap

`app/sitemap.ts` genera `sitemap.xml` desde las mismas listas de contenido que usan las rutas, con `lastModified`
tomado del campo `updated` de cada página y las alternativas de idioma
donde existen. Reemplaza a `public/sitemap.xml`.

### 6.4 llms.txt y llms-full.txt

Route handlers estáticos (`GET` con `dynamic = "force-static"`) que se exportan como archivos:

- `llms.txt`: formato de llmstxt.org. Una línea sobre qué es Code Assurance, cómo se contrata (assessment, sin
  precios publicados) y listas de enlaces por sección: home, servicios, pricing, guías, tecnologías, industrias y,
  en la sección "Optional", privacidad.
- `llms-full.txt`: el texto completo (respuesta directa, secciones y preguntas) de servicios, `/pricing/` y guías,
  en Markdown.

Antes de implementar se confirma en la documentación de Next 16 que `sitemap.ts`, `robots.ts` y los route
handlers estáticos funcionan con `output: "export"`.

### 6.5 Verificación y aviso a buscadores

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` y `NEXT_PUBLIC_BING_SITE_VERIFICATION`: si tienen valor, se imprimen
  las metas de verificación; si están vacías, no se imprime nada (igual que el link de agenda). Si el usuario
  verifica con un registro DNS, quedan vacías.
- IndexNow: archivo de clave en `public/` (la clave es pública por diseño) y `scripts/indexnow.mjs`, que envía la
  lista de URLs del sitemap a `api.indexnow.org`. Se corre a mano después de cada publicación y falla con un
  error claro si la respuesta no es 200 o 202.

### 6.6 Metadatos de las páginas existentes

Títulos y descripciones de `/`, `/es/` y de los servicios, en inglés y en español, reescritos con las frases que
busca la gente, dentro de los límites de 5.3. `pageMetadata` no cambia de forma.

## 7. Fases

Cada fase es su propio plan de implementación y su propia publicación con el OK del usuario.

1. **Fase 1:** base técnica completa (sección 6), arreglo del h1, metadatos de las páginas existentes, los
   servicios de 3.1, `/pricing/`, `/guides/` con las guías 1, 2, 3 y 8, header y footer. Es la que cubre las
   búsquedas de contratación.
2. **Fase 2:** tecnologías e industrias, con sus índices.
3. **Fase 3:** las guías 4 a 7.

Después: guías nuevas a pedido del usuario; ritmo sugerido, una cada dos semanas.

## 8. Pruebas y verificación

- Unitarias (Vitest): controles de 5.3, constructores de JSON-LD, generación de `llms.txt` y del sitemap.
- e2e (Playwright, contra `out/`, en los proyectos desktop, mobile e iphone que ya existen): un solo h1 por
  página; el h1 de la home sin repeticiones; el JSON-LD de cada página se parsea y tiene los tipos esperados;
  `sitemap.xml`, `robots.txt`, `llms.txt` y `llms-full.txt` responden y su contenido coincide con las páginas
  exportadas; sin scroll horizontal en las plantillas nuevas; los enlaces del header y del footer llegan.
- `scripts/first-load-js.mjs` para el criterio 10.
- Revisión de textos del usuario antes de cada publicación: todos los textos nuevos de la fase en un solo
  documento.

## 9. Fuera del sitio (tareas del usuario, con los pasos detallados en un documento aparte)

1. Google Search Console: verificar el dominio y enviar el sitemap.
2. Bing Webmaster Tools: importar desde Search Console y enviar el sitemap.
3. Clutch: terminar el perfil a partir del borrador y pedir dos o tres reseñas a clientes directos.
4. GoodFirms y otros directorios de empresas de software, con el mismo texto que Clutch.
5. Página de empresa en LinkedIn que enlace al sitio, y una publicación por cada guía nueva.

La lista de pasos y la planilla de medición viven fuera del repo (que es público), en la carpeta de trabajo de
Code Assurance.

## 10. Medición

- Unas 20 preguntas fijas de compradores reales ("best QA outsourcing company for startups", "how to fix flaky
  Playwright tests", …), que se le hacen una vez por mes a ChatGPT, Perplexity, Claude y Gemini, anotando si
  citan o recomiendan a Code Assurance.
- Search Console y Bing Webmaster: impresiones, clics y consultas por página.
- Expectativa: Google indexa en semanas; los asistentes suelen tardar de uno a tres meses en citar un sitio
  nuevo, y antes si hay menciones de terceros.

## 11. Fuera de alcance

- Versión en español del contenido nuevo.
- Imágenes de Open Graph por página (todas siguen usando `og-image.png`).
- Casos de estudio con métricas: solo cuando haya proyectos reales que los respalden.
- Las etiquetas en inglés de `AuditVisual` en `/es/` (pendiente menor de la spec anterior).
- Cualquier cambio en el diseño visual o en las secciones de la home más allá del h1, el header y el footer.
