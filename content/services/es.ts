import type { ServiceContent } from "./types";

// Ported verbatim from the previous service pages; only the tools heading now says they are examples.
export const servicesEs: Record<ServiceContent["slug"], ServiceContent> = {
  "automated-testing": {
    slug: "automated-testing",
    meta: {
      title: "Automatización de pruebas | Code Assurance",
      description:
        "Automatización de pruebas en tu framework: armamos la suite desde cero, ampliamos la que ya tenés o la mantenemos, con un agente de QA con IA como add-on.",
    },
    updated: "2026-11-10",
    title: "Testing Automatizado para confianza en releases",
    summary: "Cobertura E2E + API/contract enfocada en flujos críticos con estabilidad real en CI.",
    promiseLabel: "Promesa",
    promise: [
      "Cobertura basada en riesgo (no “testear todo”)",
      "Evidencia lista para CI (runs, logs, screenshots)",
      "Triage de pruebas inestables + reglas de mantenimiento",
    ],
    headings: {
      deliverables: "Qué recibís",
      howItWorks: "Cómo funciona",
      evidence: "Evidencia que realmente vas a ver",
      tools: "Herramientas que solemos usar (ejemplos)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Plan de automatización",
        detail: "Qué automatizar primero + por qué, incluyendo flakiness / pass rate / tendencias de runtime",
      },
      {
        title: "Incremento de suite",
        detail: "Nuevos tests + ownership claro + reglas que mantienen la suite estable en el tiempo",
      },
      {
        title: "Perfil de ejecución en CI",
        detail: "Objetivos de runtime + estrategia de ejecución para mantener CI rápido y confiable",
      },
    ],
    howItWorks: [
      {
        title: "Estrategia de cobertura (qué se automatiza primero)",
        bullets: [
          "Primero los journeys críticos: auth, roles/permisos, aprobaciones, pagos, integraciones",
          "Capa correcta por riesgo: API/contract donde es más barato + estable; E2E solo donde realmente hace falta",
        ],
      },
      {
        title: "Confiabilidad por diseño (cómo evitamos flakiness)",
        bullets: [
          "Selectores estables + esperas determinísticas (sin automation basada en “sleep”)",
          "Estrategia de datos + política de flakes (fix/quarantine/remove) con ownership asignado",
        ],
      },
      {
        title: "Modelo de ejecución en CI (cómo encaja en tu pipeline)",
        bullets: [
          "Suite para PR (rápida): smoke + flujos críticos, diseñada para bloquear merges",
          "Gates explícitos: reglas pass/fail atadas al riesgo (no “se ve bien”)",
        ],
      },
    ],
    evidence: [
      "Links y resúmenes de runs de PR/release (qué se cubrió + qué falló)",
      "Logs + screenshots + traces/video (cuando aplica)",
      "Clustering de fallos (tests que más fallan, hotspots de flakiness, componentes afectados)",
      "Snapshots de tendencia: pass rate, flake rate, evolución del runtime",
    ],
    evidenceNote: "Evidencia sobre opiniones: cada afirmación se respalda con un run.",
    tools: [
      {
        title: "Playwright",
        detail: "E2E para journeys críticos + traces/video para debuggear fallos rápido.",
      },
      {
        title: "Cypress / Selenium",
        detail: "Cuando ya hay suites existentes o se necesita compatibilidad con tooling actual.",
      },
      {
        title: "Postman / API testing",
        detail: "Feedback rápido en endpoints e integraciones antes de pagar el costo del UI.",
      },
      {
        title: "CI/CD (Jenkins + Git)",
        detail: "PR gates, smoke suites y evidencia en runs atada a merges/releases.",
      },
      {
        title: "Jira + TestRail",
        detail: "Trazabilidad: planes, packs de regresión y ciclo de defectos claro.",
      },
      {
        title: "SQL validation",
        detail: "Chequeos de integridad backend (CRUD, consistencia) donde el sistema lo necesita.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto tarda en quedar lista una suite de regresión automatizada lista para CI?",
        a: "Depende del scope. Se arranca con 3–5 flujos críticos + gates en PR y se escala iterativamente midiendo flake rate y runtime.",
      },
      {
        q: "¿Qué automatizás primero en un producto nuevo?",
        a: "Journeys críticos: autenticación, roles/permisos, aprobaciones, pagos, integraciones. Priorizamos lo que más afecta releases.",
      },
      {
        q: "¿Cómo reducís tests flaky en Playwright/Cypress?",
        a: "Selectores estables, esperas determinísticas (sin sleep), datos controlados y política de flake (fix/quarantine/remove) con ownership.",
      },
      {
        q: "¿Enfocás API/contract testing o E2E?",
        a: "Ambos: API/contract donde es más barato/estable; E2E solo donde la integración UI es el riesgo real.",
      },
      {
        q: "¿Cómo corrés automation en CI/CD (PR gates vs nightly)?",
        a: "Suite rápida en PR para bloquear merges + corridas programadas para regresión más amplia. Gates explícitos y con evidencia.",
      },
      {
        q: "¿Podés trabajar con React / backends .NET y workflows complejos?",
        a: "Sí. Validamos workflows complejos y sistemas multi-módulo alineando el scope a paths críticos de negocio.",
      },
      {
        q: "¿Qué evidencia recibe el equipo de ingeniería?",
        a: "Links de runs, logs, screenshots, traces/video (si aplica) y snapshots de tendencias (flake/runtime).",
      },
      {
        q: "¿Cómo manejás datos de test y ambientes de forma segura?",
        a: "Definimos estrategia de datos (fixtures/seed/reset), aislamos operaciones riesgosas y evitamos impacto en producción por diseño.",
      },
    ],
  },
  "performance-audit": {
    slug: "performance-audit",
    meta: {
      title: "Pruebas y auditoría de performance | Code Assurance",
      description:
        "Pruebas y auditorías de performance para apps web y APIs: línea base de tus recorridos críticos, sus cuellos de botella y un plan respaldado por mediciones.",
    },
    updated: "2026-11-10",
    title: "Auditoría de Performance para velocidad predecible",
    summary: "Baseline + identificación de cuellos de botella enfocada en journeys reales, respaldada por evidencia medible.",
    promiseLabel: "Promesa",
    promise: [
      "Métricas baseline para trackear (error rate, páginas/endpoints más lentos)",
      "Hallazgos ligados a journeys y endpoints (sin conjeturas vagas)",
      "Plan de optimización priorizado (quick wins + fixes de alto impacto)",
    ],
    headings: {
      deliverables: "Qué obtenés",
      howItWorks: "Cómo funciona",
      evidence: "Evidencia que realmente vas a ver",
      tools: "Herramientas que solemos usar (ejemplos)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Reporte de baseline + métricas",
        detail: "Páginas/endpoints clave, p95/p99, error rate y tendencias de performance.",
      },
      {
        title: "Bottlenecks + hipótesis de causa raíz",
        detail: "Principales puntos + causas probables (API/DB/query/render/terceros) con guía de “dónde mirar”.",
      },
      {
        title: "Plan de acción + validación",
        detail:
          "Fixes priorizados (impacto/esfuerzo), sugerencia de owner, plan de test seguro y checklist de re-test para confirmar mejoras.",
      },
    ],
    howItWorks: [
      {
        title: "Primero el baseline (qué medimos)",
        bullets: [
          "Primero los journeys críticos (login, checkout/pago, aprobaciones, búsqueda, dashboards clave)",
          "Definimos expectativas (p95/p99, error rate) + restricciones (entorno/datos/patrones de tráfico)",
        ],
      },
      {
        title: "Aislamiento del bottleneck (cómo acotamos la causa)",
        bullets: [
          "Triage por capas: UI vs API vs señales de DB vs dependencias de terceros",
          "Mediciones a nivel API: endpoints lentos, payload size, llamadas ineficientes, timeouts",
          "Validación de datos cuando aplica (chequeos SQL / señales de consistencia) para confirmar impacto",
        ],
      },
      {
        title: "Mentalidad de verificación (cómo lo mantenemos real)",
        bullets: [
          "Hallazgos con evidencia (métricas + ejecuciones reproducibles)",
          "Próximos pasos priorizados: quick wins vs investigación profunda",
          "Plan de re-test para validar mejoras luego de los cambios",
        ],
      },
    ],
    evidence: [
      "Snapshot baseline: p95/p99, latencia + error rate + endpoints más lentos.",
      "Principales cuellos de botella rankeados por impacto",
      "Modelo de comparación before/after para el equipo",
      "Notas de restricciones (datos, entorno, terceros)",
    ],
    evidenceNote: "Evidencia sobre opiniones: cada afirmación se respalda con ejecuciones medidas.",
    tools: [
      {
        title: "Load & performance testing (k6 / JMeter)",
        detail: "Baselines para journeys clave, p95/p99, throughput y error rate bajo tráfico realista.",
      },
      {
        title: "Frontend profiling (DevTools / Lighthouse)",
        detail: "Detectar bottlenecks de render/JS/assets y latencia percibida (señales CWV cuando aplica).",
      },
      {
        title: "API & endpoint diagnostics (Postman / curl)",
        detail: "Mediciones reproducibles de endpoints, payload checks, patrones de timeouts y comportamiento de integraciones.",
      },
      {
        title: "Backend & DB investigation (SQL checks)",
        detail: "Validar queries lentas, patrones N+1, señales de consistencia y confirmar “¿es la DB?”.",
      },
      {
        title: "Monitoring & tracing (APM: Datadog / New Relic / OpenTelemetry)",
        detail: "Correlacionar requests lentos entre servicios, dependencias y terceros con evidencia de trazas.",
      },
      {
        title: "CI execution & reporting (Jenkins + Git workflows)",
        detail: "Runs repetibles, evidencia apta para PRs y comparaciones before/after después de cambios.",
      },
    ],
    faqs: [
      {
        q: "¿Qué medís en una Auditoría de Performance?",
        a: "Journeys reales con p95/p99, throughput y error rate más las páginas/endpoints más lentos.",
      },
      {
        q: "¿Cómo elegís qué journeys testear primero?",
        a: "Empezamos por flujos críticos para releases (login, checkout/pago, aprobaciones, búsqueda, dashboards clave).",
      },
      {
        q: "¿Testeás performance de UI o de API?",
        a: "Ambos: UI para latencia percibida y API/DB para el bottleneck real.",
      },
      {
        q: "¿Cómo aislás dónde está el bottleneck?",
        a: "Hacemos triage por capa (UI vs API vs DB vs terceros) y validamos con ejecuciones reproducibles.",
      },
      {
        q: "¿Esto impacta tráfico de producción?",
        a: "No por defecto: usamos planes seguros, carga controlada y staging cuando es posible.",
      },
      {
        q: "¿Qué recibe el equipo al final?",
        a: "Reporte baseline, mapa rankeado de bottlenecks con causas probables y un plan de acción priorizado.",
      },
      {
        q: "¿Cómo probás mejoras después de fixes?",
        a: "Re-ejecutamos los mismos escenarios y entregamos comparaciones before/after con las mismas métricas.",
      },
      {
        q: "¿Cuánto tarda un audit típico?",
        a: "Scopes chicos pueden ser rápidos; sistemas grandes tardan más, pero entregamos valor temprano (baseline + top bottlenecks primero).",
      },
    ],
  },
  "security-review": {
    slug: "security-review",
    meta: {
      title: "Pruebas de seguridad | Code Assurance",
      description:
        "Pruebas de seguridad manuales enfocadas en lo que tu próximo release pone en riesgo: superficie de ataque, hallazgos con evidencia, guía de arreglo y retest.",
    },
    updated: "2026-11-10",
    title: "Revisión de Seguridad para releases de alta visibilidad",
    summary:
      "Testing manual + descubrimiento de vulnerabilidades enfocado en riesgo real de despliegue, respaldado por evidencia reproducible.",
    promiseLabel: "Promesa",
    promise: [
      "Testing manual de seguridad alineado a riesgo crítico de despliegue",
      "Evaluación asistida por herramientas (Nmap, Nikto) + casos de prueba",
      "Hallazgos claros + guía de remediación para el equipo de ingeniería",
    ],
    headings: {
      deliverables: "Qué obtenés",
      howItWorks: "Cómo funciona",
      evidence: "Evidencia que realmente vas a ver",
      tools: "Herramientas que solemos usar (ejemplos)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Reporte de hallazgos de seguridad",
        detail: "Problemas validados con severidad, impacto y pasos de reproducción.",
      },
      {
        title: "Casos de prueba de seguridad",
        detail: "Casos concretos reutilizables para futuros releases y regresiones.",
      },
      {
        title: "Checklist de re-test",
        detail: "Checklist práctico para confirmar fixes antes de publicar.",
      },
    ],
    howItWorks: [
      {
        title: "Discovery + mapeo de superficie de ataque",
        bullets: [
          "Identificamos flujos críticos para el release (auth, roles/permisos, acciones sensibles)",
          "Mapeamos entry points y servicios/endpoints expuestos",
          "Escaneo baseline para detectar exposición obvia (ej. puertos/servicios abiertos)",
        ],
      },
      {
        title: "Testing manual de seguridad (hallazgos validados)",
        bullets: [
          "Testing manual para confirmar explotabilidad real (no solo “ruido” de scanners)",
          "Usamos Nmap/Nikto para apoyar discovery y detección de vulnerabilidades",
          "Ejecutamos casos de prueba de seguridad estructurados a través de flujos",
        ],
      },
      {
        title: "Colaboración + verificación de fixes",
        bullets: [
          "Alineamos alcance y requisitos con equipos cross-funcionales",
          "Entregamos pasos claros de reproducción y comportamiento esperado “secure”",
          "Re-testeamos fixes para reducir riesgo de release y prevenir incidentes",
        ],
      },
    ],
    evidence: [
      "Pasos de reproducción (claros y repetibles)",
      "Outputs de herramientas cuando aplique (resúmenes de Nmap/Nikto)",
      "Set de casos de prueba (qué testear la próxima vez)",
      "Notas de confirmación en re-test (fixed / sigue fallando)",
    ],
    evidenceNote: "Evidencia sobre opiniones: cada afirmación se respalda con un resultado reproducible.",
    tools: [
      {
        title: "Nmap (Discovery & exposición)",
        detail: "Descubrimiento de puertos/servicios, footprint de red y verificación de exposición no intencional.",
      },
      {
        title: "Nikto (chequeos baseline de servidor web)",
        detail: "Detección rápida de misconfigurations comunes y defaults riesgosos.",
      },
      {
        title: "Burp Suite / OWASP ZAP (validación manual)",
        detail: "Interceptar tráfico, reproducir issues y validar explotabilidad (reducir falsos positivos).",
      },
      {
        title: "Code scanning (SAST + dependencias)",
        detail: "Detectar patrones riesgosos y librerías vulnerables temprano en PRs.",
      },
      {
        title: "Threat modeling (STRIDE-lite)",
        detail: "Mapear entry points, trust boundaries y “lo que importa” antes de profundizar.",
      },
      {
        title: "Tracking & evidencia (Jira + reportes)",
        detail: "Repro steps claros, severidad, comportamiento seguro esperado y notas de re-test.",
      },
    ],
    faqs: [
      {
        q: "¿Qué incluye una Revisión de Seguridad?",
        a: "Mapeo de superficie de ataque + escaneo baseline + testing manual para validar explotabilidad real, con guía clara de remediación y verificación de fixes.",
      },
      {
        q: "¿Hacen pentesting o solo vulnerability scanning?",
        a: "Ambos. Los scans encuentran señales rápido; el testing manual confirma qué es realmente explotable y reduce falsos positivos.",
      },
      {
        q: "¿Cómo deciden qué testear primero?",
        a: "Priorizamos flujos críticos de despliegue: auth, roles/permisos, acciones sensibles, integraciones y cualquier dato con riesgo legal o de negocio.",
      },
      {
        q: "¿Esto afecta producción o datos de usuarios?",
        a: "Planificamos ejecución segura: entornos de test cuando se puede, rate limits, técnicas no destructivas, scope acordado y stop conditions claras.",
      },
      {
        q: "¿Qué evidencia recibimos de los hallazgos?",
        a: "Repro steps, endpoints/flujos impactados, severidad, proof-of-concept (seguro) y comportamiento seguro esperado — más resultados de re-test post-fix.",
      },
      {
        q: "¿Pueden trabajar con frontends React y backends .NET / APIs?",
        a: "Sí. Testeamos flujos end-to-end y superficies API, y comunicamos hallazgos de forma accionable para ingeniería.",
      },
      {
        q: "¿Cubren OWASP Top 10 y riesgos web comunes?",
        a: "Sí: auth/session, access control, injection, misconfigurations, exposición de datos sensibles e integraciones inseguras son foco central.",
      },
      {
        q: "¿Pueden integrar checks de seguridad en CI/CD?",
        a: "Podemos recomendar gates livianos (SAST/dependency scans) y una cadencia de reviews manuales antes de releases de alta visibilidad.",
      },
    ],
  },
  "code-quality": {
    slug: "code-quality",
    meta: {
      title: "Revisión de calidad de código | Code Assurance",
      description:
        "Revisiones de calidad de código: quality gates acordes al riesgo real, los puntos que generan regresiones y la deuda técnica ordenada por impacto en el negocio.",
    },
    updated: "2026-11-10",
    title: "Calidad de Código que previene regresiones",
    summary: "Estándares, puntos críticos de riesgo y control de deuda técnica para que tu delivery sea predecible.",
    promiseLabel: "Promesa",
    promise: [
      "Quality gates que reflejan riesgo real (no burocracia)",
      "Lista de deuda accionable (priorizada por impacto)",
      "PRs más limpios, menos ciclos de rework",
    ],
    headings: {
      deliverables: "Qué te llevás",
      howItWorks: "Cómo funciona",
      evidence: "Evidencia que realmente vas a ver",
      tools: "Herramientas que solemos usar (ejemplos)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Baseline de calidad",
        detail: "Hotspots, señales de complejidad, churn y dónde se repiten bugs—para arreglar primero lo que más duele.",
      },
      {
        title: "Quality gates y estándares",
        detail: "Checklist de PR + Definition of Done + checks automáticos alineados al workflow del equipo.",
      },
      {
        title: "Plan de deuda priorizado",
        detail: "Fixes y refactors de alto ROI rankeados por impacto × probabilidad (no “limpieza cosmética”).",
      },
    ],
    howItWorks: [
      {
        title: "Evaluar el riesgo de calidad (dónde se rompe)",
        bullets: [
          "Identificar hotspots: módulos que cambian mucho (alto churn), zonas con bugs recurrentes, límites frágiles",
          "Mapear riesgo → controles recomendados (tests, checks, targets de refactor)",
        ],
      },
      {
        title: "Aplicar estándares (quality gates que se sostienen)",
        bullets: [
          "Definir reglas “merge-ready”: lint/format/static analysis + umbrales cuando aplique",
          "Higiene de PR: templates, checklists, ownership y señales de review",
        ],
      },
      {
        title: "Reducir deuda sin frenar el delivery",
        bullets: [
          "Targets de refactor elegidos por riesgo de negocio (bugs/rework/mantenibilidad), no por preferencia",
          "Estrategia segura: PRs chicos, guardrails y evidencia en CI",
        ],
      },
    ],
    evidence: [
      "Reporte baseline de calidad (hotspots + rationale)",
      "Checklist de quality gates + template de PR",
      "Ejemplos antes/después (lint issues, duplicación, áreas frágiles)",
      "Backlog de deuda (impacto, owner, ETA, por qué ahora)",
    ],
    evidenceNote: "Evidence over opinions: cada recomendación mapea a riesgo medible.",
    tools: [
      {
        title: "Static Analysis & Type Safety (ESLint / SonarQube / TypeScript)",
        detail:
          "Lint + reglas strict para prevenir patrones riesgosos y atrapar regresiones temprano (contratos, nullability, llamadas inseguras).",
      },
      {
        title: "CI Quality Gates (Jenkins + Git workflows)",
        detail: "Reglas “merge-ready”: lint, tests, umbrales de cobertura y checks de calidad en cada PR.",
      },
      {
        title: "Automation Signals (Playwright / Cypress / Selenium)",
        detail: "Señales de calidad en CI desde journeys críticos/regresión para mantener la suite y evitar roturas silenciosas.",
      },
      {
        title: "API & Contract Checks (Postman / contract checks)",
        detail: "Feedback más rápido: validar integraciones sin el costo/flake risk de depender solo de UI.",
      },
      {
        title: "Tracking & Test Management (Jira + TestRail)",
        detail: "Trazabilidad, hotspots recurrentes, ownership y regression packs accionables.",
      },
      {
        title: "Safe Refactoring + Data Integrity (small PRs + guardrails + SQL validation)",
        detail:
          "Refactors seguros con impacto medible; validación de integridad de datos para detectar flujos rotos por cambios de backend.",
      },
    ],
    faqs: [
      {
        q: "¿Qué significa “calidad de código” en la práctica?",
        a: "Es qué tan seguro es cambiar el código. Enfocamos estándares + feedback rápido en CI para reducir regresiones.",
      },
      {
        q: "¿Cómo encuentran hotspots de calidad rápido?",
        a: "Buscamos módulos con alto churn, bugs repetidos y límites frágiles (UI/API/DB). Cada hotspot mapea a un control concreto.",
      },
      {
        q: "¿Se pueden aplicar estándares sin frenar el delivery?",
        a: "Sí. Los PR gates quedan mínimos pero efectivos (format/lint + tests clave). Lo estricto se sube por fases.",
      },
      {
        q: "¿Qué debería bloquear un merge vs ser warning?",
        a: "Blockers: lint/format rotos, tests críticos fallando, types/security checks fallando. Warnings: mejoras de estilo y reglas no críticas.",
      },
      {
        q: "¿Cómo bajan deuda técnica sin reescrituras enormes?",
        a: "Priorizamos deuda por riesgo de negocio y refactorizamos en PRs chicos con guardrails + evidencia en CI.",
      },
      {
        q: "¿Pueden trabajar con React y backends .NET / flujos complejos?",
        a: "Sí. Ponemos controles en límites reales: permisos, integraciones y consistencia de datos.",
      },
      {
        q: "¿Qué entregables recibe el equipo de ingeniería?",
        a: "Setup de PR gates, mapa de hotspots, targets de refactor priorizados y checklists reutilizables. Todo accionable.",
      },
      {
        q: "¿Cómo miden mejora con el tiempo?",
        a: "Menos regresiones y rework, y CI más estable (mejor pass/flake rate). PRs más rápidos porque se detecta antes.",
      },
    ],
  },
};

export const serviceEyebrowEs = "Servicio";
