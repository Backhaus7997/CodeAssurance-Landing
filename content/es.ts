import { CONTACT_EMAIL, LEGAL_ENTITY, LEGAL_TAX_ID } from "./site";
import type { SiteContent } from "./types";

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Servicios de QA y automatización de pruebas | Code Assurance",
    description:
      "Ingenieros de QA senior y un agente de QA con IA para tu producto: QA manual, automatización de pruebas y QA dedicado, mes a mes. Cotizamos tras una llamada.",
    ogAlt: "Code Assurance — servicios de QA y automatización de pruebas",
    updated: "2026-11-10",
  },
  header: {
    pages: [],
    nav: [
      { label: "Agente", section: "agent" },
      { label: "Proceso", section: "process" },
      { label: "Planes", section: "plans" },
      { label: "Auditorías", section: "audits" },
    ],
    book: "Agendá una llamada",
    contact: "Contacto",
    switchLabel: "View in English",
    switchTo: "EN",
  },
  hero: {
    label: "00 / Resumen",
    titleBefore: "QA a medida de tu",
    rotatingWords: ["producto", "stack", "equipo", "negocio", "ritmo de releases"],
    titleAfter: "no de una plantilla",
    lead: "Ingenieros de QA senior y un agente de QA con IA que trabaja dentro de tus repositorios, tus tickets y el framework de testing que ya usás. Probamos a mano, automatizamos lo que vale la pena automatizar y mantenemos la suite sana release tras release.",
    primaryCta: "Agendá una llamada de 15 minutos",
    secondaryCta: "Mirá cómo trabaja el agente",
    emailCta: "Escribinos",
    emailPrefix: "o",
  },
  map: {
    label: "Mapa de cobertura",
    labelNote: "— producto de ejemplo, elegí un módulo",
    legend: {
      covered: "cubierto",
      added: "tests agregados",
      bug: "bug de la aplicación",
      pending: "esperando aprobación",
      gap: "hueco, en backlog",
    },
    statusLabel: {
      covered: "cubierto",
      added: "tests agregados",
      bug: "tests agregados, 1 bug de la aplicación",
      pending: "arreglo de locator esperando aprobación",
      gap: "hueco, riesgo bajo, en backlog",
    },
    modules: [
      { id: "login", path: "auth/login", tests: 18, status: "covered", note: "18 tests existentes, todos pasan. No hace falta agregar nada." },
      { id: "reset", path: "auth/password-reset", tests: 7, status: "added", note: "No había tests. Se agregaron 7: pedido, link vencido, link reutilizado y límite de intentos." },
      { id: "invoices", path: "billing/invoices", tests: 24, status: "covered", note: "24 tests existentes, todos pasan." },
      { id: "refunds", path: "billing/refunds", tests: 9, status: "bug", note: "Se agregaron 9 tests. Un reembolso parcial no cambia el total de la orden: se envió a tus desarrolladores con pasos y logs." },
      { id: "cart", path: "checkout/cart", tests: 15, status: "covered", note: "15 tests existentes, todos pasan." },
      { id: "payment", path: "checkout/payment", tests: 21, status: "pending", note: "21 tests existentes. Un locator se rompió después de un refactor; el arreglo espera tu aprobación." },
      { id: "roles", path: "roles/permissions", tests: 11, status: "bug", note: "Se agregaron 11 tests. Un usuario al que le bajan el rol sigue con acceso de admin hasta el próximo login: se envió a tus desarrolladores." },
      { id: "search", path: "search", tests: 9, status: "covered", note: "9 tests existentes, todos pasan." },
      { id: "notifications", path: "notifications", tests: 6, status: "covered", note: "6 tests existentes, todos pasan." },
      { id: "admin", path: "admin/users", tests: 12, status: "covered", note: "12 tests existentes, todos pasan." },
      { id: "export", path: "reports/export", tests: 0, status: "gap", note: "Sin tests. El riesgo es bajo, así que por ahora queda en el backlog." },
      { id: "onboarding", path: "onboarding", tests: 8, status: "covered", note: "8 tests existentes, todos pasan." },
      { id: "profile", path: "settings/profile", tests: 7, status: "covered", note: "7 tests existentes, todos pasan." },
      { id: "webhooks", path: "api/webhooks", tests: 4, status: "added", note: "No había tests. Se agregaron 4 para la verificación de firmas y los reintentos." },
    ],
    defaultModule: "refunds",
    totals: "14 módulos mapeados · 31 tests agregados · 2 bugs de la aplicación · 1 arreglo esperando aprobación",
    firstDeliverable: "El primer entregable de cada proyecto es este mapa, armado con tu código.",
  },
  agent: {
    index: "01",
    label: "Agente",
    title: "Cómo trabaja el agente en tu código",
    description:
      "Un pipeline de agentes especializados, cada uno a cargo de una etapa. Un ingeniero de QA senior de nuestro equipo lo corre, revisa lo que produce y decide qué llega a tu repositorio.",
    run: {
      title: "corrida del agente · acme/web",
      command: "run qa agent · acme/web",
      lines: [
        { stage: "scan", detail: "Playwright + Jest, TypeScript" },
        { stage: "map", detail: "14 módulos · 120 tests existentes · 5 sin tests" },
        { stage: "research", detail: "documentación actual de Playwright y Jest revisada" },
        { stage: "analyze", detail: "4 módulos sin tests con riesgo alto, 1 bajo" },
        { stage: "plan", detail: "31 casos de prueba en 4 funcionalidades" },
        { stage: "generate", detail: "31 tests en 4 archivos, 1 fixture compartido" },
        { stage: "validate", detail: "29 pasan", flags: { bugs: "2 bugs de la aplicación", wait: "1 arreglo de locator propuesto" } },
        { stage: "deliver", detail: "PR en borrador abierto: qa/password-reset-refunds" },
      ],
      done: "esperando tu revisión",
    },
    pr: {
      title: "qa: password reset and refunds coverage",
      ticket: "PROJ-123",
      badge: "Draft",
      branch: "qa/password-reset-refunds → main",
      status: "esperando tu revisión",
      summary: [
        { text: "Mapeó 14 módulos. Password reset, refunds, roles y webhooks no tenían tests." },
        { text: "Agregó 31 tests en tu setup de Playwright y Jest, siguiendo tus convenciones de nombres y carpetas." },
        { text: "2 fallas parecen bugs de la aplicación. Se marcaron para tus desarrolladores, no se taparon.", tone: "bug" },
        { text: "Un locator roto del checkout se volvió a encontrar en la página real. El arreglo está propuesto y espera aprobación.", tone: "wait" },
      ],
      files: [
        { path: "tests/e2e/password-reset.spec.ts", added: 84 },
        { path: "tests/e2e/refunds.spec.ts", added: 121 },
        { path: "tests/api/roles.test.ts", added: 96 },
        { path: "tests/api/webhooks.test.ts", added: 38 },
        { path: "tests/fixtures/users.ts", added: 22 },
      ],
      checks: ["unit (Jest) pasó", "e2e (Playwright) pasó", "control de estándares de tests pasó"],
      caption: "Lo que llega a tu repositorio. Es un ejemplo: nada se mergea sin que tu equipo lo apruebe.",
    },
    triage: {
      label: "¿Bug o error del test? Te dice cuál es",
      bug: {
        test: "refunds.spec.ts › partial refund updates order total",
        verdict: "bug de la aplicación",
        error: "Expected order total 80.00, received 100.00",
        explanation: "La API de reembolsos responde 200, pero el total de la orden nunca cambia. Se reprodujo a mano en staging.",
        outcome: "Se envió a tus desarrolladores con pasos y logs. El test queda en rojo a propósito.",
      },
      locator: {
        test: "checkout.spec.ts › place order",
        pendingVerdict: "error del test, esperando aprobación",
        fixedVerdict: "arreglado, la re-corrida pasó",
        error: "Timeout: getByTestId('checkout-btn') not found",
        explanation: "El botón sigue ahí. Un refactor le sacó el test id, así que el agente lo volvió a encontrar en la página real.",
        removed: "- await page.getByTestId('checkout-btn').click();",
        added: "+ await page.getByRole('button', { name: 'Place order' }).click();",
        approve: "Aprobar arreglo",
        approveHint: "No cambia nada hasta que alguien de tu equipo dice que sí.",
        applied: "Aplicado en el PR en borrador. La re-corrida pasó.",
        undo: "Deshacer",
      },
    },
    stack: {
      title: "Dentro de tu stack, con tus reglas",
      description:
        "Son ejemplos, no requisitos. Cada proyecto empieza por entender cómo trabaja tu equipo. Si ya tienen reglas para escribir tests, las seguimos, y el agente las sigue también.",
      rows: [
        { label: "Código", value: "GitHub, GitLab o Azure DevOps. Los tests llegan como pull requests." },
        { label: "Tickets", value: "Jira, Linear o GitHub Issues. Un ticket puede convertirse en un plan de pruebas y sus tests." },
        { label: "Casos", value: "En la herramienta que ya usan, incluido Azure DevOps Test Plans." },
      ],
      diagram: {
        label: "De dónde lee el agente y qué te devuelve",
        inputs: ["repo", "tickets", "test plans"],
        outputs: ["PRs en borrador", "casos de prueba", "reportes de bugs"],
      },
      marquee: {
        tools: ["Playwright", "Cypress", "Selenium", "Robot Framework", "Jest", "Vitest", "pytest", "Azure DevOps", "Jira", "Linear", "GitHub", "GitLab"],
        languages: ["TypeScript", "JavaScript", "Python", "Java", ".NET", "Go", "Ruby", "PHP", "Web", "Android", "iOS", "dispositivos reales y emuladores"],
      },
    },
    startingPoints: [
      { tag: "todavía sin tests", tone: "mint", title: "Armamos la suite", text: "Diseñamos el repositorio de tests desde cero y entregamos una primera suite sobre tus flujos críticos." },
      { tag: "tests que se rompen", tone: "wait", title: "La estabilizamos", text: "Arreglamos lo que está roto, estandarizamos el resto y cubrimos los huecos que importan." },
      { tag: "una suite madura", tone: "muted", title: "Sumamos donde falta", text: "Solo agregamos donde la cobertura es débil. Los tests que funcionan no se tocan." },
    ],
  },
  process: {
    index: "02",
    label: "Proceso",
    title: "Evaluar, planificar, entregar, estabilizar",
    description: "Los mismos cuatro pasos en cada proyecto, a la medida de tu producto y de tu ritmo de releases.",
    deliverablesLabel: "Recibís",
    steps: [
      {
        title: "Evaluar",
        summary: "Evaluación de riesgos y una mirada honesta a tu producto, tu CI y dónde fallan las cosas.",
        deliverables: ["Mapa de riesgos por módulo", "Problemas principales y mejoras rápidas", "Backlog de pruebas priorizado por nivel: smoke, regresión, E2E, API"],
      },
      {
        title: "Planificar",
        summary: "Estrategia de pruebas, plan de cobertura y quality gates medibles.",
        deliverables: ["Una estrategia de pruebas de 1–2 páginas, lista para ejecutar", "Matriz de riesgo contra cobertura", "Gates de CI/CD: qué bloquea un merge o un release, y quién es responsable"],
      },
      {
        title: "Entregar",
        summary: "Pruebas acotadas a cada cambio y automatización donde rinde.",
        deliverables: ["Reportes de pruebas por release y por PR, con evidencia", "Un incremento de automatización con reglas de mantenimiento", "Un checklist de salida antes de cada deploy"],
      },
      {
        title: "Estabilizar",
        summary: "Visibilidad del pipeline, triage de tests inestables y CI más robusto.",
        deliverables: ["Tablero de estabilidad: fallas, tests inestables, tiempos", "Una decisión, causa y responsable para cada test inestable", "Resumen del endurecimiento del CI, antes y después"],
      },
    ],
  },
  plans: {
    index: "03",
    label: "Planes",
    title: "Formas de trabajar con nosotros",
    description:
      "Un equipo de QA que se suma al tuyo, part-time o full-time. Lo dimensionamos según tu alcance después de un assessment, es mes a mes y podés ampliarlo o achicarlo.",
    packages: [
      {
        name: "Quality Squad",
        tagline: "Un equipo de QA dedicado",
        summary: "Capacidad de QA estable para equipos con poco o nada de QA interno, trabajando dentro de tus sprints.",
        tiers: [
          { name: "Part-time", size: "soporte flexible", scope: "QA asignado a uno o más proyectos. Participa de las ceremonias clave, diseña y ejecuta pruebas funcionales y reporta avances.", team: "compartido entre tus proyectos" },
          { name: "Full-time", size: "dedicación completa", scope: "QA en tus proyectos críticos: dailies, planning, refinamiento, pruebas funcionales y exploratorias continuas y seguimiento completo de defectos.", team: "dedicado a tu equipo" },
        ],
      },
    ],
  },
  audits: {
    index: "04",
    label: "Auditorías",
    title: "Auditorías y automatización",
    description: "Solas o junto a cualquier plan. Cada una termina con hallazgos que tus ingenieros pueden resolver y una forma de volver a probarlos.",
    exampleLabel: "ejemplo",
    visualText: {
      authOk: "autenticación ✓",
      authFail: "autorización ✗",
      debt: ["lógica de checkout duplicada", "cliente de API sin tipos", "feature flags que nadie usa"],
      suites: ["smoke", "regresión", "end-to-end"],
    },
    items: [
      { title: "Auditoría de performance", summary: "Mediciones base de tus recorridos críticos y de los cuellos de botella detrás, con corridas medidas.", slug: "performance-audit", visual: "latency", cta: "Auditoría de performance" },
      { title: "Revisión de seguridad", summary: "Pruebas de seguridad manuales enfocadas en lo que tu próximo release pone en riesgo, con guía para resolverlo.", slug: "security-review", visual: "endpoints", cta: "Revisión de seguridad" },
      { title: "Revisión de calidad de código", summary: "Quality gates acordes al riesgo real y deuda técnica ordenada por impacto.", slug: "code-quality", visual: "debt", cta: "Revisión de calidad de código" },
      { title: "Automatización de pruebas", summary: "Automatización basada en riesgo, en tu framework, con evidencia que tu CI puede mostrar.", slug: "automated-testing", visual: "suites", cta: "Automatización de pruebas" },
    ],
  },
  team: {
    index: "05",
    label: "Equipo",
    title: "Gente senior al frente de cada proyecto",
    statement:
      "Un ingeniero de QA con más de 8 años de experiencia es dueño de la estrategia, revisa cada test que escribe el agente y trabaja al ritmo de tu equipo.",
    location: "Trabajamos en inglés o en español desde Argentina (UTC−3).",
    trackRecordLabel: "Experiencia",
    trackRecord: "Nuestros ingenieros hicieron QA en equipos de Disney, FIFA, PayPal, Royal Caribbean, Deloitte, Globant y Numerade.",
  },
  start: {
    index: "06",
    label: "Arranque",
    title: "Cómo se empieza",
    description: "Mes a mes, sin contratos largos. Pagás para empezar, y si el primer mes no te sirve, cortás ahí.",
    steps: [
      { title: "Una llamada de 15 minutos", text: "Tu producto, tu stack y qué te está doliendo hoy." },
      { title: "Semana 1: el mapa de cobertura", text: "Mapa de riesgos por módulo, problemas principales con mejoras rápidas y un backlog de pruebas priorizado, armado con tu código." },
      { title: "Plan", text: "Estrategia de pruebas, plan de cobertura y quality gates medibles." },
      { title: "Entrega", text: "Pruebas y automatización dentro de tus sprints, con los tests inestables resueltos y el pipeline más robusto." },
    ],
    primaryCta: "Agendá una llamada de 15 minutos",
    emailCta: "Escribinos",
  },
  form: {
    label: "O dejanos un mensaje",
    fields: {
      name: "Nombre",
      email: "Mail de trabajo",
      company: "Empresa",
      phone: "Teléfono",
      optional: "(opcional)",
      message: "¿Qué necesitás?",
      messagePlaceholder: "Tu producto, tu stack, qué se está rompiendo…",
    },
    submit: "Enviar mensaje",
    sending: "Enviando…",
    sentTitle: "Mensaje enviado",
    sentText: "Te respondemos por mail.",
    errors: {
      required: "Completá este campo.",
      invalidEmail: "Usá un mail completo, por ejemplo vos@empresa.com.",
      tooShort: "Contanos un poco más: 10 caracteres o más.",
      rejected: "El mensaje no se aceptó.",
      network: "No pudimos llegar al servidor. Revisá tu conexión.",
    },
    fallback: "También podés escribirnos a",
  },
  footer: {
    tagline: "Building Trust Through Quality Code",
    nav: [
      { label: "Cómo trabaja el agente", section: "agent" },
      { label: "Proceso", section: "process" },
      { label: "Planes", section: "plans" },
      { label: "Auditorías", section: "audits" },
    ],
    groups: [
      {
        title: "Servicios",
        links: [
          { label: "Automatización de pruebas", href: "/es/services/automated-testing/" },
          { label: "Pruebas de performance", href: "/es/services/performance-audit/" },
          { label: "Pruebas de seguridad", href: "/es/services/security-review/" },
          { label: "Revisión de calidad de código", href: "/es/services/code-quality/" },
        ],
      },
    ],
    privacy: "Política de privacidad",
    rights: "Code Assurance",
  },
  notFound: {
    title: "Esta página no existe",
    text: "Puede que el link sea viejo o tenga un error. Estos te llevan a algo útil:",
    homeEn: "Code Assurance in English",
    homeEs: "Code Assurance en español",
  },
  privacy: {
    meta: {
      title: "Política de privacidad | Code Assurance",
      description:
        "Qué recibe Code Assurance desde este sitio, para qué lo usa, quién lo procesa, cuánto tiempo lo guarda y cómo pedir verlo, corregirlo o borrarlo.",
      updated: "2026-11-10",
    },
    title: "Política de privacidad",
    updated: "Última actualización: 9 de noviembre de 2026",
    sections: [
      {
        heading: "Qué cubre",
        body: [
          `Code Assurance presta servicios de aseguramiento de calidad de software y es operada por ${LEGAL_ENTITY} (CUIT ${LEGAL_TAX_ID}), sociedad registrada en Argentina y responsable de la información que se describe acá.`,
          "Esta página explica qué pasa con la información que nos enviás desde este sitio.",
        ],
      },
      {
        heading: "Qué datos recibimos",
        body: [
          "Cuando usás el formulario de contacto recibimos tu nombre, tu mail de trabajo, tu empresa, tu teléfono si lo agregás y tu mensaje. No pedimos nada más.",
          "Este sitio no usa cookies, analítica ni seguimiento. Nuestro proveedor de hosting, GitHub Pages, puede guardar registros estándar del servidor, como direcciones IP, por seguridad.",
        ],
      },
      {
        heading: "Para qué los usamos",
        body: ["Solo para responderte y, si querés, para hablar de trabajar juntos. No vendemos tu información ni la compartimos con fines de marketing."],
      },
      {
        heading: "Quién los procesa",
        body: [
          "El formulario lo entrega Formspree (formspree.io), que guarda los mensajes en nuestro nombre. Si agendás una llamada, la página de agenda la opera el proveedor de turnos y aplica su propia política de privacidad.",
        ],
      },
      {
        heading: "Cuánto tiempo los guardamos",
        body: ["Mientras los necesitemos para responderte. Los borramos cuando nos lo pidas."],
      },
      {
        heading: "Qué podés pedir",
        body: [`Para ver, corregir o borrar lo que nos enviaste, escribí a ${CONTACT_EMAIL}.`],
      },
    ],
  },
};
