# Diseño y animaciones de la home en todas las páginas internas — diseño

- Fecha: 2026-11-11
- Branch: `design/inner-pages` (sale de `main` en `44f34f7`, lo publicado)
- Prototipo aprobado por el usuario: `CodeAssurance Cotizaciones/prototipos/paginas-internas.html` (fuera del repo):
  una página de servicio y una guía. Es la referencia de layout, ritmo y movimiento.
- Specs anteriores que siguen vigentes: `2026-11-09-rediseno-landing-outbound-design.md` (sistema visual, reglas de
  movimiento) y `2026-11-10-seo-ai-search-design.md` (estructura para buscadores y reglas de contenido).

## 1. Objetivo

Que cualquier página del sitio se sienta igual de viva que la home: mismo hero animado, mismas secciones numeradas,
mismas tarjetas con brillo y un visual animado propio por página, sin perder nada de lo que hoy sirve para Google y
para los asistentes de IA.

### Criterios de éxito (verificables)

1. Todas las páginas de la sección 3 tienen el hero nuevo: grilla animada de fondo (`canvas` con `data-hero-grid`),
   migas, etiqueta, h1, respuesta directa y llamado a la acción.
2. Cada página de servicio (las 9 en inglés y las 4 en español) muestra su visual propio (`data-visual="<tipo>"`).
3. Las secciones de cada página llevan el encabezado numerado de la home (`01 / …`, `02 / …`).
4. Las guías tienen barra de progreso de lectura, índice fijo en escritorio (≥ 900 px) que marca la sección actual
   y la respuesta corta destacada.
5. Nada de lo de la spec de SEO se pierde: un solo h1, la respuesta directa en el HTML exportado, las preguntas
   frecuentes y el JSON-LD como están, migas. Los e2e de `seo.spec.ts` pasan sin cambios.
6. Con `prefers-reduced-motion: reduce` nada se mueve y todo el contenido queda visible; sin JavaScript también.
7. Los loops animados se frenan fuera de pantalla (la prueba de `robustness.spec.ts` sigue pasando).
8. Ninguna página tiene scroll horizontal a 375 px ni a 1280 px.
9. El JavaScript de primera carga de cada página interna no supera el de la home (260,658 bytes gzip medidos con el
   agua publicada). Reemplaza, para estas páginas, el criterio 10 de la spec de SEO: el usuario prioriza el diseño
   (2026-11-11).
10. `tsc`, `eslint`, los tests unitarios, los e2e y `next build` pasan.

## 2. Decisiones tomadas con el usuario

| Tema | Decisión |
|---|---|
| Nivel de diseño | Opción A: el sistema de la home en todas las páginas + un visual animado propio por página |
| Referencia | El prototipo aprobado; la home publicada para componentes y tokens |
| Peso | Las páginas internas pueden cargar más JavaScript, con techo en el peso de la home |
| Textos | No cambian en este trabajo, salvo los textos cortos que piden los visuales nuevos |

## 3. Páginas en alcance

- Servicios en inglés: `/services/<slug>/` (9) y el índice `/services/`.
- Servicios en español: `/es/services/<slug>/` (4).
- `/pricing/`.
- `/guides/` y las 4 guías.
- `/privacy/` y `/es/privacy/` (solo el hero nuevo; el cuerpo legal queda simple).
- Fuera de alcance: la home, `/how-we-work/` (ya usa las secciones de la home) y el 404.

## 4. Componentes

Todos en `components/content/` salvo que se diga otra cosa. Los que ya existen en la home se reutilizan.

### 4.1 Compartidos

- `PageHero`: migas, etiqueta (`Service / 01 — Test automation`), h1 con la última palabra en menta (como el
  prototipo), respuesta directa, botón principal (`PrimaryCta`, el animado de la home) y un enlace secundario al
  contenido. Fondo: la grilla parpadeante de la home (`FlickeringGrid`) con la misma máscara. Un espacio opcional a la
  derecha para el visual de la página.
- Encabezados de sección: el `SectionHeader` de la home, con índice correlativo por página.
- Tarjetas: entregables, relacionados e ítems de los índices pasan a usar el `GlowingEffect` de la home y `Reveal`
  escalonado.
- `StepsTimeline`: línea vertical que se llena de menta al scrollear y marca cada paso al pasar (la de "How it works"
  del prototipo). Se usa en "How it works" de los servicios y en `/pricing/`.
- `EvidenceList`: la lista de evidencias con tildes que aparecen escalonadas.
- Herramientas: la cinta de la home (`Marquee`), en lugar de la grilla actual.
- Preguntas frecuentes: el `Faq` actual con `Reveal`.
- Cierre: la banda "How it starts" con el botón animado de la home y sin formulario.

### 4.2 Visual propio por página

Todos decorativos (`aria-hidden`), con su texto en los archivos de contenido (en los dos idiomas donde hay página en
español), estáticos con "reducir movimiento" y en pausa fuera de pantalla.

| Página | Visual | Origen |
|---|---|---|
| automated-testing | Terminal del agente: escanea, mapea, encuentra huecos, escribe, corre, arregla, abre el PR | `AgentRun` de la home, con líneas propias |
| ai-qa-agent | El pull request en borrador | `DraftPullRequest` de la home |
| performance-audit | Gráfico de latencia | `AuditVisual kind="latency"` |
| security-review | Endpoints con hallazgos | `AuditVisual kind="endpoints"` |
| code-quality | Barras de deuda técnica | `AuditVisual kind="debt"` |
| manual-qa-testing | Checklist de casos que se va tildando, con un bug encontrado | nuevo: `ChecklistRun` |
| dedicated-qa-engineers | Tablero de sprint con una columna de QA donde avanzan las tarjetas | nuevo: `SprintBoard` |
| mobile-app-testing | Celular con filas de tests que pasan en distintos dispositivos | nuevo: `PhoneTests` |
| api-testing | Pedido y respuesta con el chequeo de contrato | nuevo: `ApiContract` |
| /pricing/ | Los pasos llamada → assessment → cotización → primer mes en `StepsTimeline` | `StepsTimeline` |

Los números que muestran los visuales son los del producto de ejemplo que ya publica la home (14 módulos, 120 tests,
31 agregados) o ninguno; nada que parezca un resultado de un cliente.

### 4.3 Guías

- `ReadingProgress` (cliente): barra menta arriba, con `transform: scaleX` y el evento de scroll; sin loop.
- `TableOfContents` (cliente): índice fijo en escritorio con los subtítulos; `IntersectionObserver` marca el actual.
  En móvil no se muestra.
- `ShortAnswer`: la respuesta directa con borde menta y la etiqueta "Short answer".
- Secciones con número grande en mono a la izquierda. `ContentSection` suma un campo opcional `pull` (una frase
  destacada); si una sección lo tiene, se muestra como cita. Las cuatro guías reciben una frase destacada cada una,
  sacada de su propio texto.

## 5. Reglas

- Movimiento: las de la spec del rediseño (ease-out, transform y opacity, nada bloquea el contenido, "reducir
  movimiento" respetado, loops en pausa fuera de pantalla). Nada nuevo se esconde sin JavaScript: `Reveal` solo actúa
  bajo `html.js`.
- Accesibilidad: los visuales son `aria-hidden`; el índice de las guías es un `<nav aria-label="On this page">` con
  enlaces reales; la barra de progreso es decorativa.
- Contenido: las reglas de la spec de SEO (términos prohibidos, sin precios, marcas solo en la frase aprobada) se
  aplican también a los textos de los visuales; los tests de contenido los recorren.

## 6. Pruebas

- e2e por plantilla: hero con grilla, numeración de secciones, visual presente en cada servicio, índice y barra de
  progreso en guías (el índice marca la sección visible después de scrollear), sin scroll lateral en 375 y 1280.
- e2e de "reducir movimiento": ninguna animación en curso y visuales en su estado final en un servicio y una guía.
- e2e de peso: lee los `<script src>` de cada página interna exportada y compara su gzip con el de la home
  (criterio 9).
- Unitarios: paridad inglés/español de los textos de los visuales en los 4 servicios bilingües; reglas de contenido
  sobre los textos nuevos.
- Los e2e que ya existen (`seo.spec.ts`, `services.spec.ts`, `final.spec.ts`, `robustness.spec.ts`) siguen pasando.

## 7. Fuera de alcance

- Cambios de textos de las páginas (se trabajan aparte).
- La home, `/how-we-work/` y el 404.
- Contenido nuevo (guías, tecnologías, industrias: fases 2 y 3 de SEO).
