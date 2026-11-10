import { CONTACT_EMAIL, LEGAL_ENTITY, LEGAL_TAX_ID } from "./site";
import type { SiteContent } from "./types";

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "QA Services and Test Automation | Code Assurance",
    description:
      "Senior QA engineers and an AI QA agent for your product: manual QA, test automation and dedicated QA engineers, month-to-month. Quoted after a short call.",
    ogAlt: "Code Assurance — QA services and test automation",
    updated: "2026-11-10",
  },
  header: {
    nav: [
      { label: "Agent", section: "agent" },
      { label: "Process", section: "process" },
      { label: "Plans", section: "plans" },
      { label: "Audits", section: "audits" },
    ],
    book: "Book a call",
    contact: "Contact",
    switchLabel: "Ver en español",
    switchTo: "ES",
  },
  hero: {
    label: "00 / Overview",
    titleBefore: "QA built around your",
    rotatingWords: ["product", "stack", "sprints", "business rules", "release rhythm"],
    titleAfter: "not a template",
    lead: "Senior QA engineers plus an AI QA agent that works inside your repositories, your tickets and the test framework you already use. We test manually, automate what's worth automating and keep the suite healthy release after release.",
    primaryCta: "Book a 15-minute call",
    secondaryCta: "See how the agent works",
    emailCta: "Email us",
    emailPrefix: "or",
  },
  map: {
    label: "Coverage map",
    labelNote: "— example product, select a module",
    legend: {
      covered: "covered",
      added: "tests added",
      bug: "application bug",
      pending: "awaiting approval",
      gap: "gap, in backlog",
    },
    statusLabel: {
      covered: "covered",
      added: "tests added",
      bug: "tests added, 1 application bug",
      pending: "locator fix awaiting approval",
      gap: "gap, low risk, in backlog",
    },
    modules: [
      { id: "login", path: "auth/login", tests: 18, status: "covered", note: "18 existing tests, all passing. Nothing to add." },
      { id: "reset", path: "auth/password-reset", tests: 7, status: "added", note: "No tests before. 7 added: request, expired link, reused link, rate limit." },
      { id: "invoices", path: "billing/invoices", tests: 24, status: "covered", note: "24 existing tests, all passing." },
      { id: "refunds", path: "billing/refunds", tests: 9, status: "bug", note: "9 tests added. A partial refund leaves the order total unchanged: sent to your developers with steps and logs." },
      { id: "cart", path: "checkout/cart", tests: 15, status: "covered", note: "15 existing tests, all passing." },
      { id: "payment", path: "checkout/payment", tests: 21, status: "pending", note: "21 existing tests. One locator broke after a refactor; the fix is awaiting your approval." },
      { id: "roles", path: "roles/permissions", tests: 11, status: "bug", note: "11 tests added. A downgraded user keeps admin access until the next login: sent to your developers." },
      { id: "search", path: "search", tests: 9, status: "covered", note: "9 existing tests, all passing." },
      { id: "notifications", path: "notifications", tests: 6, status: "covered", note: "6 existing tests, all passing." },
      { id: "admin", path: "admin/users", tests: 12, status: "covered", note: "12 existing tests, all passing." },
      { id: "export", path: "reports/export", tests: 0, status: "gap", note: "No tests. Low risk, so it stays in the backlog for now." },
      { id: "onboarding", path: "onboarding", tests: 8, status: "covered", note: "8 existing tests, all passing." },
      { id: "profile", path: "settings/profile", tests: 7, status: "covered", note: "7 existing tests, all passing." },
      { id: "webhooks", path: "api/webhooks", tests: 4, status: "added", note: "No tests before. 4 added for signature checks and retries." },
    ],
    defaultModule: "refunds",
    totals: "14 modules mapped · 31 tests added · 2 application bugs flagged · 1 fix awaiting approval",
    firstDeliverable: "The first deliverable of every engagement is this map, built from your code.",
  },
  agent: {
    index: "01",
    label: "Agent",
    title: "How the agent works on your codebase",
    description:
      "A pipeline of specialized agents, each responsible for one stage. A senior QA engineer from our team runs it, reviews the output and decides what goes to your repository.",
    run: {
      title: "agent run · acme/web",
      command: "run qa agent · acme/web",
      lines: [
        { stage: "scan", detail: "Playwright + Jest, TypeScript" },
        { stage: "map", detail: "14 modules · 120 existing tests · 5 untested" },
        { stage: "research", detail: "current Playwright and Jest docs checked" },
        { stage: "analyze", detail: "4 untested modules ranked high risk, 1 low" },
        { stage: "plan", detail: "31 test cases across 4 features" },
        { stage: "generate", detail: "31 tests in 4 files, 1 shared fixture" },
        { stage: "validate", detail: "29 passing", flags: { bugs: "2 application bugs", wait: "1 locator fix proposed" } },
        { stage: "deliver", detail: "draft PR opened: qa/password-reset-refunds" },
      ],
      done: "waiting for your review",
    },
    pr: {
      title: "qa: password reset and refunds coverage",
      ticket: "PROJ-123",
      badge: "Draft",
      branch: "qa/password-reset-refunds → main",
      status: "waiting for your review",
      summary: [
        { text: "Mapped 14 modules. Password reset, refunds, roles and webhooks had no tests." },
        { text: "Added 31 tests in your existing Playwright and Jest setup, following your naming and folder conventions." },
        { text: "2 failures look like application bugs. Flagged for your developers, not patched over.", tone: "bug" },
        { text: "1 broken checkout locator re-matched against the live page. Fix proposed, waiting for approval.", tone: "wait" },
      ],
      files: [
        { path: "tests/e2e/password-reset.spec.ts", added: 84 },
        { path: "tests/e2e/refunds.spec.ts", added: 121 },
        { path: "tests/api/roles.test.ts", added: 96 },
        { path: "tests/api/webhooks.test.ts", added: 38 },
        { path: "tests/fixtures/users.ts", added: 22 },
      ],
      checks: ["unit (Jest) passed", "e2e (Playwright) passed", "test standards check passed"],
      caption: "What lands in your repository. An example: nothing is merged until your team approves it.",
    },
    triage: {
      label: "Bug or test mistake? It tells you which",
      bug: {
        test: "refunds.spec.ts › partial refund updates order total",
        verdict: "application bug",
        error: "Expected order total 80.00, received 100.00",
        explanation: "The refund API answers 200, but the order total never changes. Reproduced by hand on staging.",
        outcome: "Sent to your developers with steps and logs. The test stays red on purpose.",
      },
      locator: {
        test: "checkout.spec.ts › place order",
        pendingVerdict: "test mistake, awaiting approval",
        fixedVerdict: "fixed, re-run passed",
        error: "Timeout: getByTestId('checkout-btn') not found",
        explanation: "The button is still there. A refactor removed its test id, so the agent re-matched it against the live page.",
        removed: "- await page.getByTestId('checkout-btn').click();",
        added: "+ await page.getByRole('button', { name: 'Place order' }).click();",
        approve: "Approve fix",
        approveHint: "Nothing changes until someone on your team says yes.",
        applied: "Applied in the draft PR. Re-run passed.",
        undo: "Undo",
      },
    },
    stack: {
      title: "Inside your stack, by your rules",
      description:
        "These are examples, not requirements. Every engagement starts by learning how your team ships. If you already have rules for how tests are written, we follow them, and the agent keeps following them.",
      rows: [
        { label: "Code", value: "GitHub, GitLab or Azure DevOps. Tests arrive as pull requests." },
        { label: "Tickets", value: "Jira, Linear or GitHub Issues. A ticket can become a test plan and its tests." },
        { label: "Test cases", value: "In the tool you already use, Azure DevOps Test Plans included." },
      ],
      diagram: {
        label: "Where the agent reads from and what it hands back",
        inputs: ["repo", "tickets", "test plans"],
        outputs: ["draft PRs", "test cases", "bug reports"],
      },
      marquee: {
        tools: ["Playwright", "Cypress", "Selenium", "Robot Framework", "Jest", "Vitest", "pytest", "Azure DevOps", "Jira", "Linear", "GitHub", "GitLab"],
        languages: ["TypeScript", "JavaScript", "Python", "Java", ".NET", "Go", "Ruby", "PHP", "Web", "Android", "iOS", "real devices and emulators"],
      },
    },
    startingPoints: [
      { tag: "no tests yet", tone: "mint", title: "We start the suite", text: "We design the test repository from scratch and deliver a first suite on your critical flows." },
      { tag: "tests that keep breaking", tone: "wait", title: "We stabilize it", text: "We fix what's broken, standardize the rest and fill the coverage gaps that matter." },
      { tag: "a mature suite", tone: "muted", title: "We add where it's thin", text: "Targeted additions only, where coverage is thin. Working tests stay untouched." },
    ],
  },
  process: {
    index: "02",
    label: "Process",
    title: "Assess, plan, deliver, stabilize",
    description: "The same four steps on every engagement, sized to your product and your release rhythm.",
    deliverablesLabel: "You get",
    steps: [
      {
        title: "Assess",
        summary: "Risk assessment and a reality check of your product, your CI and where things fail.",
        deliverables: ["Risk map by module", "Top issues and quick wins", "Prioritized test backlog by level: smoke, regression, E2E, API"],
      },
      {
        title: "Plan",
        summary: "Test strategy, coverage plan and quality gates you can measure.",
        deliverables: ["A 1–2 page test strategy, ready to execute", "Risk-to-coverage matrix", "CI/CD gates: what blocks a merge or a release, and who owns it"],
      },
      {
        title: "Deliver",
        summary: "Testing scoped to each change, and automation where it pays off.",
        deliverables: ["Release and PR test reports with evidence", "An automation increment with maintenance rules", "A pre-deploy exit checklist"],
      },
      {
        title: "Stabilize",
        summary: "Pipeline visibility, flaky-test triage and CI hardening.",
        deliverables: ["Stability dashboard: flakes, failures, runtime", "A decision, root cause and owner for each flaky test", "CI hardening summary, before and after"],
      },
    ],
  },
  plans: {
    index: "03",
    label: "Plans",
    title: "Ways to work with us",
    description:
      "Pick the one that fits where your product is today. Each is sized to your scope, runs month-to-month, and you can move between them.",
    packages: [
      {
        name: "Quality Check",
        tagline: "Manual functional QA, by project",
        summary: "Find functional defects before go-live and lower the risk of big changes or new modules.",
        tiers: [
          { name: "Standard", size: "small or medium module", scope: "A new module or related features. 5–10 screens or flows, moderate business rules.", team: "1 senior QA + 1 QA" },
          { name: "Medium", size: "complex module", scope: "Important business modules. 10–20 flows and several integrations: APIs, payment gateways, internal services.", team: "1 senior QA + 2 QAs" },
          { name: "Premium", size: "high impact", scope: "High-impact changes. 20+ flows, many integrations, end-to-end flows validated from start to finish.", team: "1 senior QA + 2–3 QAs" },
        ],
      },
      {
        name: "Quality Booster",
        tagline: "Continuous regression and automation kickstart",
        summary: "A working automation framework with a first automated regression set on your critical flows.",
        tiers: [
          { name: "Kickstart Basic", size: "small product", scope: "Small apps or modules, 1–2 critical flows. Base framework and the first automated set.", team: "1 senior automation QA + 1 automation QA" },
          { name: "Kickstart Standard", size: "medium product", scope: "Several modules and 2–3 user roles. Framework with reporting and pipelines, stabilization and docs.", team: "1 senior + 1–2 automation QAs" },
          { name: "Kickstart Full", size: "complex product", scope: "Core systems with complex rules. Full stabilization, complete documentation and team training.", team: "1 senior + 2 automation QAs" },
        ],
      },
      {
        name: "Quality Squad",
        tagline: "A dedicated QA team",
        summary: "Steady QA capacity for teams with little or no QA in-house, working inside your sprints.",
        tiers: [
          { name: "Part-time", size: "flexible support", scope: "QA assigned to one or more projects. Joins key ceremonies, designs and runs functional tests, reports progress regularly.", team: "shared across your projects" },
          { name: "Full-time", size: "full dedication", scope: "QA on your critical projects: dailies, planning, refinement, continuous functional and exploratory testing, full defect tracking.", team: "dedicated to your team" },
        ],
      },
    ],
  },
  audits: {
    index: "04",
    label: "Audits",
    title: "Audits and test automation",
    description: "On their own or alongside any plan. Each one ends with findings your engineers can act on and a way to re-test them.",
    exampleLabel: "example",
    items: [
      { title: "Performance audit", summary: "Baselines for your critical journeys and the bottlenecks behind them, backed by measured runs.", slug: "performance-audit", visual: "latency", cta: "Performance audit" },
      { title: "Security review", summary: "Manual security testing focused on what your next release puts at risk, with remediation guidance.", slug: "security-review", visual: "endpoints", cta: "Security review" },
      { title: "Code quality review", summary: "Quality gates that match real risk, and technical debt ordered by impact.", slug: "code-quality", visual: "debt", cta: "Code quality review" },
      { title: "Test automation", summary: "Risk-based automation in your framework, with evidence your CI can show.", slug: "automated-testing", visual: "suites", cta: "Test automation" },
    ],
  },
  team: {
    index: "05",
    label: "Team",
    title: "Senior people lead every engagement",
    statement:
      "A QA engineer with 8+ years of experience owns the strategy, reviews every test the agent writes and works in your team's cadence.",
    location: "We work in English or Spanish from Argentina (UTC−3), so most of our day overlaps with yours.",
    trackRecordLabel: "Track record",
    trackRecord: "Our engineers have delivered QA on teams at Disney, FIFA, PayPal, Royal Caribbean, Deloitte, Globant and Numerade.",
  },
  start: {
    index: "06",
    label: "Start",
    title: "How it starts",
    description: "Month-to-month, no long contract. You pay to start, and if the first month doesn't work for you, you stop there.",
    steps: [
      { title: "A 15-minute call", text: "Your product, your stack and what's hurting today." },
      { title: "Week 1: the coverage map", text: "Risk map by module, top issues with quick wins and a prioritized test backlog, built from your code." },
      { title: "Plan", text: "Test strategy, coverage plan and quality gates you can measure." },
      { title: "Delivery", text: "Testing and automation inside your sprints, with flaky tests triaged and the pipeline hardened." },
    ],
    primaryCta: "Book a 15-minute call",
    emailCta: "Email us",
  },
  form: {
    label: "Or send us a note",
    fields: {
      name: "Name",
      email: "Work email",
      company: "Company",
      phone: "Phone",
      optional: "(optional)",
      message: "What do you need?",
      messagePlaceholder: "Your product, your stack, what's breaking…",
    },
    submit: "Send message",
    sending: "Sending…",
    sentTitle: "Message sent",
    sentText: "We'll get back to you by email.",
    errors: {
      required: "Please fill this in.",
      invalidEmail: "Use a full email address, like you@company.com.",
      tooShort: "Tell us a bit more: 10 characters or more.",
      rejected: "The message wasn't accepted.",
      network: "We couldn't reach the server. Check your connection.",
    },
    fallback: "You can also write to us at",
  },
  footer: {
    tagline: "Building Trust Through Quality Code",
    nav: [
      { label: "How the agent works", section: "agent" },
      { label: "Process", section: "process" },
      { label: "Plans", section: "plans" },
      { label: "Audits", section: "audits" },
    ],
    privacy: "Privacy policy",
    rights: "Code Assurance",
  },
  notFound: {
    title: "This page doesn't exist",
    text: "The link may be old or mistyped. These will take you somewhere useful:",
    homeEn: "Code Assurance in English",
    homeEs: "Code Assurance en español",
  },
  privacy: {
    meta: {
      title: "Privacy Policy | Code Assurance",
      description:
        "What Code Assurance collects through this website, why we use it, who processes it, how long we keep it and how to see, correct or delete it.",
      updated: "2026-11-10",
    },
    title: "Privacy policy",
    updated: "Last updated: November 9, 2026",
    sections: [
      {
        heading: "What this covers",
        body: [
          `Code Assurance provides software quality assurance services and is operated by ${LEGAL_ENTITY} (CUIT ${LEGAL_TAX_ID}), a company registered in Argentina, which is responsible for the information described here.`,
          "This page explains what happens with the information you send us through this website.",
        ],
      },
      {
        heading: "What we collect",
        body: [
          "When you use the contact form we receive your name, work email, company, phone number if you add it, and your message. We don't ask for anything else.",
          "This site does not use cookies, analytics or tracking. Our hosting provider, GitHub Pages, may keep standard server logs such as IP addresses for security.",
        ],
      },
      {
        heading: "Why we use it",
        body: ["Only to answer you and, if you want, to talk about working together. We don't sell your information or share it for marketing."],
      },
      {
        heading: "Who processes it",
        body: [
          "The contact form is delivered by Formspree (formspree.io), which stores submissions on our behalf. If you book a call, the booking page is run by the scheduling provider and its own privacy policy applies.",
        ],
      },
      {
        heading: "How long we keep it",
        body: ["As long as we need it to follow up with you. We delete it when you ask."],
      },
      {
        heading: "Your choices",
        body: [`To see, correct or delete what you sent us, write to ${CONTACT_EMAIL}.`],
      },
    ],
  },
};
