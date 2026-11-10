import type { ServiceSlug } from "../types";
import type { ServiceContent } from "./types";

// Titles, direct answers, related links and the automation cases were written for search (SEO spec, 3.1);
// the rest was ported from the previous service pages.
export const servicesEn: Record<ServiceSlug, ServiceContent> = {
  "automated-testing": {
    slug: "automated-testing",
    meta: {
      title: "Test Automation Services | Code Assurance",
      description:
        "Test automation services in your framework: we build a suite from zero, extend the one you have or keep it maintained, with an AI QA agent as an add-on.",
    },
    updated: "2026-11-10",
    title: "Test automation services",
    answer:
      "We build, extend or maintain your automated test suite in the framework your team already uses. Starting from zero, we map your codebase and automate the critical flows first; with an existing suite, we stabilize it and close the coverage gaps; after that we keep it green in CI. Our AI QA agent can be added to any engagement.",
    related: ["/services/code-quality/", "/services/performance-audit/"],
    promiseLabel: "Promise",
    promise: [
      "Risk based coverage (not “test everything”)",
      "CI ready evidence (runs, logs, screenshots)",
      "Flake triage + maintenance rules",
    ],
    headings: {
      deliverables: "What you get",
      howItWorks: "How it works",
      evidence: "Evidence you will actually see",
      tools: "Tools we often use (examples)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Automation plan",
        detail: "What to automate first + why, including flake rate / pass rate / runtime trends",
      },
      {
        title: "Test suite increment",
        detail: "New tests + clear ownership + rules that keep the suite stable over time",
      },
      {
        title: "CI execution profile",
        detail: "Runtime targets + execution strategy to keep CI fast and reliable",
      },
    ],
    howItWorks: [
      {
        title: "Starting from zero: we build the suite",
        bullets: [
          "We map your codebase and critical flows first, then set up the framework in your stack: Playwright by default, or the one your team prefers",
          "The first critical flows run in CI early; coverage then grows by risk: auth, roles, payments, integrations",
        ],
      },
      {
        title: "You already have a suite: we adopt and extend it",
        bullets: [
          "We keep your framework and conventions, fix what is broken and standardize the rest",
          "Coverage gaps from the codebase map become a prioritized backlog of new tests",
        ],
      },
      {
        title: "You need it maintained: we keep it green",
        bullets: [
          "A flake policy with an owner: every unstable test is fixed, quarantined or removed, never ignored",
          "Tests change with the product, with run evidence on every release",
        ],
      },
      {
        title: "Add-on: our AI QA agent",
        bullets: [
          "Writes tests in your framework and sends them as pull requests that a senior QA engineer reviews",
          "When a locator breaks, it finds the element again on the live page and proposes the fix for your approval",
        ],
      },
    ],
    evidence: [
      "PR/release run links and summaries (what was covered + what failed)",
      "Logs + screenshots + traces/video (when applicable)",
      "Failure clustering (top failing tests, flaky hotspots, failing components)",
      "Trend snapshots: pass rate, flake rate, runtime evolution",
    ],
    evidenceNote: "Evidence over opinions: every claim is backed by a run.",
    tools: [
      {
        title: "Playwright",
        detail: "E2E for critical journeys + traces/video to debug failures fast.",
      },
      {
        title: "Cypress / Selenium",
        detail: "When teams already have suites or need compatibility with existing tooling.",
      },
      {
        title: "Postman / API testing",
        detail: "Fast feedback on endpoints and integrations before UI breaks.",
      },
      {
        title: "CI/CD (Jenkins + Git)",
        detail: "PR gates, smoke suites, and run evidence tied to merges/releases.",
      },
      {
        title: "Jira + TestRail",
        detail: "Traceability: plans, regression packs, and clear defect lifecycle.",
      },
      {
        title: "SQL validation",
        detail: "Backend integrity checks (CRUD, consistency) where the system needs it.",
      },
    ],
    faqs: [
      {
        q: "How long does it take to get a CI-ready automated regression suite?",
        a: "Depends on scope and maturity. We start with 3–5 critical flows + PR smoke gates, then expand iteratively while tracking pass rate, flake rate, and runtime.",
      },
      {
        q: "What do you automate first in a new product?",
        a: "Critical journeys: authentication, roles/permissions, approvals, payments, integrations. We prioritize flows that block revenue or create release risk.",
      },
      {
        q: "How do you reduce flaky tests in Playwright/Cypress?",
        a: "Stable-first selectors, deterministic waits (no sleep), controlled test data, and a clear flake policy (fix/quarantine/remove) with ownership.",
      },
      {
        q: "Do you focus on API/contract testing or E2E?",
        a: "Both. API/contract where it’s cheaper and more stable; E2E only where UI integration is the real risk. Right layer per risk.",
      },
      {
        q: "How do you run test automation in CI/CD?",
        a: "Fast PR suite to gate merges (smoke + critical flows) plus scheduled runs for broader regression. Gates are explicit and evidence-backed.",
      },
      {
        q: "Can you work with React / .NET backends and complex workflows?",
        a: "Yes. We’ve validated complex business workflows and multi-module systems; we align test scope with business-critical paths.",
      },
      {
        q: "What evidence do engineers get?",
        a: "Run links, logs, screenshots, traces/video (when applicable), and trend snapshots (pass rate, flake rate, runtime).",
      },
      {
        q: "How do you handle test data and environments safely?",
        a: "We define test data strategy up front (fixtures/seed/reset), isolate risky operations, and avoid production impact by design.",
      },
    ],
  },
  "performance-audit": {
    slug: "performance-audit",
    meta: {
      title: "Performance Testing and Audit Services | Code Assurance",
      description:
        "Performance testing and audits for web apps and APIs: baselines for your critical user journeys, the bottlenecks behind them and a plan backed by measured runs.",
    },
    updated: "2026-11-10",
    title: "Performance testing and audit services",
    answer:
      "We measure how your web app and APIs behave on the journeys that matter, find the bottlenecks behind slow pages and endpoints, and hand you a prioritized plan with the evidence to back it. Every finding comes from a measured run, and every fix is validated with the same measurement before we call it done.",
    related: ["/services/automated-testing/", "/services/code-quality/"],
    promiseLabel: "Promise",
    promise: [
      "Baseline metrics you can track (p95/p99, error rate, slowest pages/endpoints)",
      "Findings tied to journeys and endpoints (not vague guesses)",
      "Prioritized optimization plan (quick wins + high-impact fixes)",
    ],
    headings: {
      deliverables: "What you get",
      howItWorks: "How it works",
      evidence: "Evidence you will actually see",
      tools: "Tools we often use (examples)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Baseline & metrics report",
        detail: "Key pages/endpoints, p95/p99, error rate, and performance trends.",
      },
      {
        title: "Bottlenecks & root-cause hypotheses",
        detail: "Top slow points + likely causes (API/DB/query/render/third-party) with “where to look” guidance.",
      },
      {
        title: "Action + validation plan",
        detail: "Prioritized fixes (impact/effort), owner suggestions, safe test plan, and a re-test checklist to confirm improvements.",
      },
    ],
    howItWorks: [
      {
        title: "Baseline first (what we measure)",
        bullets: [
          "Critical journeys first (login, checkout/payment, approvals, search, key dashboards)",
          "Define performance expectations (p95/p99 goals, error rate) + constraints (env/data/traffic patterns)",
        ],
      },
      {
        title: "Bottleneck isolation (how we narrow causes)",
        bullets: [
          "Triage across layers: UI vs API vs DB signals vs third-party dependencies",
          "API-level measurements: slow endpoints, payload size, inefficient calls, timeouts",
          "Data validation where relevant (SQL checks / consistency signals) to confirm impact",
        ],
      },
      {
        title: "Verification mindset (how we keep it real)",
        bullets: [
          "Evidence-driven findings (numbers + reproducible runs)",
          "Prioritized next steps: quick wins vs deeper investigation",
          "Re-test plan to validate improvements after changes",
        ],
      },
    ],
    evidence: [
      "Baseline snapshot: p95/p99, latency + error rate + slowest endpoints.",
      "Top bottlenecks ranked by impact",
      "Before/after comparison template for engineers",
      "Constraints notes (data, environment, third parties)",
    ],
    evidenceNote: "Evidence over opinions: every claim is backed by measured runs.",
    tools: [
      {
        title: "Load & performance testing (k6 / JMeter)",
        detail: "Baselines for key journeys, p95/p99, throughput, and error rate under realistic traffic.",
      },
      {
        title: "Frontend profiling (DevTools / Lighthouse)",
        detail: "Identify render/JS/asset bottlenecks and user-perceived latency (CWV signals when relevant).",
      },
      {
        title: "API & endpoint diagnostics (Postman / curl)",
        detail: "Reproducible endpoint measurements, payload checks, timeout patterns, integration behavior.",
      },
      {
        title: "Backend & DB investigation (SQL checks)",
        detail: "Validate slow queries, N+1 patterns, data consistency signals, and “is it the DB?” confirmations.",
      },
      {
        title: "Monitoring & tracing (APM: Datadog / New Relic / OpenTelemetry)",
        detail: "Correlate slow requests across services, dependencies, and third parties with trace evidence.",
      },
      {
        title: "CI execution & reporting (Jenkins + Git workflows)",
        detail: "Repeatable runs, PR-friendly evidence, and “before/after” comparisons after changes.",
      },
    ],
    faqs: [
      {
        q: "What do you measure in a Performance Audit?",
        a: "We baseline real journeys with p95/p99, throughput, and error rate—plus the slowest pages/endpoints.",
      },
      {
        q: "How do you choose which journeys to test first?",
        a: "We start with release-critical flows (login, checkout/payment, approvals, search, key dashboards).",
      },
      {
        q: "Do you test UI performance or API performance?",
        a: "Both—UI for user-perceived latency and API/DB for the underlying bottlenecks.",
      },
      {
        q: "How do you isolate where the bottleneck is?",
        a: "We triage by layer (UI vs API vs DB vs third-party) and validate with reproducible runs.",
      },
      {
        q: "Will this impact production traffic?",
        a: "Not by default—we use safe test plans, controlled load, and staging where possible.",
      },
      {
        q: "What do engineers actually get at the end?",
        a: "A baseline report, a ranked bottleneck map with likely causes, and a prioritized action plan.",
      },
      {
        q: "How do you prove improvements after fixes?",
        a: "We re-run the same scenarios and provide before/after comparisons using the same metrics.",
      },
      {
        q: "How long does a typical audit take?",
        a: "Small scopes can be quick; larger systems take longer—but we deliver value early with a baseline + top bottlenecks first.",
      },
    ],
  },
  "security-review": {
    slug: "security-review",
    meta: {
      title: "Security Testing Services | Code Assurance",
      description:
        "Manual security testing focused on what your next release puts at risk: attack surface mapping, validated findings with evidence, fix guidance and retests.",
    },
    updated: "2026-11-10",
    title: "Security testing services",
    answer:
      "We test your application the way an attacker would, focused on what your next release puts at risk. We map the attack surface, validate each finding by hand with reproducible evidence, explain how to fix it and retest after your team ships the fix. You get findings your developers can act on, not a scanner dump.",
    related: ["/services/code-quality/", "/services/automated-testing/"],
    promiseLabel: "Promise",
    promise: [
      "Manual security testing aligned to deployment-critical risk",
      "Tool assisted assessments (Nmap, Nikto) + structured test cases",
      "Clear findings + remediation guidance for engineering teams",
    ],
    headings: {
      deliverables: "What you get",
      howItWorks: "How it works",
      evidence: "Evidence you will actually see",
      tools: "Tools we often use (examples)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Security findings report",
        detail: "Validated issues with severity, impact, and reproduction steps.",
      },
      {
        title: "Security test cases",
        detail: "Concrete test cases you can reuse for future releases and regressions.",
      },
      {
        title: "Retest checklist",
        detail: "A practical checklist to confirm fixes before shipping.",
      },
    ],
    howItWorks: [
      {
        title: "Discovery & attack surface mapping",
        bullets: [
          "Identify critical flows for release (auth, roles/permissions, sensitive actions)",
          "Map entry points and exposed services/endpoints",
          "Baseline scan to detect obvious exposure (e.g., open ports/services)",
        ],
      },
      {
        title: "Manual security testing (validated findings)",
        bullets: [
          "Manual testing to confirm real exploitability (not just scanner noise)",
          "Use Nmap/Nikto to support discovery and vulnerability detection",
          "Execute structured security test cases across flows",
        ],
      },
      {
        title: "Collaboration & fix verification",
        bullets: [
          "Align with cross-functional teams on scope + requirements",
          "Provide clear reproduction steps and expected secure behavior",
          "Retest fixes to reduce release risk and prevent incidents",
        ],
      },
    ],
    evidence: [
      "Reproduction steps (clear and repeatable)",
      "Tool outputs when relevant (Nmap/Nikto summaries)",
      "Security test case set (what to test next time)",
      "Retest confirmation notes (fixed / still failing)",
    ],
    evidenceNote: "Principle: Evidence over opinions — every claim is backed by a reproducible result.",
    tools: [
      {
        title: "Nmap (Discovery & exposure)",
        detail: "Port/service discovery, network footprint, verification of unintended exposure.",
      },
      {
        title: "Nikto (Web server baseline checks)",
        detail: "Quick detection of common server misconfigurations and risky defaults.",
      },
      {
        title: "Burp Suite / OWASP ZAP (Manual validation)",
        detail: "Intercept traffic, reproduce issues, validate exploitability (reduce scanner noise).",
      },
      {
        title: "Code scanning (SAST + dependencies)",
        detail: "Identify risky patterns and vulnerable libraries early in PRs.",
      },
      {
        title: "Threat modeling (STRIDE-lite)",
        detail: "Map entry points, trust boundaries, and “what matters” before testing deeper.",
      },
      {
        title: "Tracking & evidence (Jira + reports)",
        detail: "Clear reproduction steps, severity, expected secure behavior, and retest notes.",
      },
    ],
    faqs: [
      {
        q: "What’s included in a Security Review?",
        a: "Attack surface mapping + baseline scanning + manual security testing to validate real exploitability, with clear remediation guidance and fix verification.",
      },
      {
        q: "Do you do penetration testing or just vulnerability scanning?",
        a: "Both. Scans help find signals fast; manual testing confirms what’s truly exploitable and removes false positives.",
      },
      {
        q: "How do you decide what to test first?",
        a: "We prioritize deployment-critical flows: auth, roles/permissions, sensitive actions, integrations, and any data that creates legal or business risk.",
      },
      {
        q: "Will this affect production or user data?",
        a: "We plan safe execution: test environments when possible, rate limits, non-destructive techniques, agreed scope, and clear stop conditions.",
      },
      {
        q: "What evidence do we get from findings?",
        a: "Repro steps, impacted endpoints/flows, severity, proof-of-concept (safe), and expected secure behavior—plus retest results after fixes.",
      },
      {
        q: "Can you work with React frontends and .NET / API backends?",
        a: "Yes. We test end-to-end flows and API surfaces, and we communicate findings in a way engineers can act on quickly.",
      },
      {
        q: "Do you cover OWASP Top 10 and common web risks?",
        a: "Yes—auth/session issues, access control, injection, misconfigurations, sensitive data exposure, and insecure integrations are core focus areas.",
      },
      {
        q: "Can you integrate security checks into CI/CD?",
        a: "We can recommend lightweight gates (SAST/dependency scans) and a cadence for deeper manual reviews before high-visibility releases.",
      },
    ],
  },
  "code-quality": {
    slug: "code-quality",
    meta: {
      title: "Code Quality Review Services | Code Assurance",
      description:
        "Code quality reviews that set quality gates matching real risk, find the hotspots that cause regressions and order your technical debt by business impact.",
    },
    updated: "2026-11-10",
    title: "Code quality review services",
    answer:
      "We review your codebase to find the hotspots that keep causing regressions, set quality gates that match real risk instead of arbitrary thresholds, and order your technical debt by business impact. The result is a short list of changes your team can make in its normal cadence, with checks in CI so the gains stick.",
    related: ["/services/automated-testing/", "/services/security-review/"],
    promiseLabel: "Promise",
    promise: [
      "Quality gates that match real risk (not bureaucracy)",
      "Actionable debt list (prioritized by impact)",
      "Cleaner PRs, fewer rework cycles",
    ],
    headings: {
      deliverables: "What you get",
      howItWorks: "How it works",
      evidence: "Evidence you will actually see",
      tools: "Tools we often use (examples)",
      faqs: "FAQs",
    },
    deliverables: [
      {
        title: "Quality baseline",
        detail: "Hotspots, complexity signals, churn areas, and where bugs repeat—so we fix the right things first.",
      },
      {
        title: "Quality gates & standards",
        detail: "PR checklist + Definition of Done + automated checks aligned to your team’s workflow.",
      },
      {
        title: "Prioritized debt plan",
        detail: "High-ROI fixes and refactors ranked by impact × likelihood (not cosmetic cleanup).",
      },
    ],
    howItWorks: [
      {
        title: "Assess quality risk (where things break)",
        bullets: [
          "Identify hotspots: high-churn modules, repeated bug zones, fragile boundaries",
          "Map risk → recommended controls (tests, checks, refactor targets)",
        ],
      },
      {
        title: "Enforce standards (quality gates that stick)",
        bullets: [
          "Define merge-ready rules: lint/format/static analysis + thresholds where applicable",
          "PR hygiene: templates, checklists, ownership, review signals",
        ],
      },
      {
        title: "Reduce debt without slowing delivery",
        bullets: [
          "Refactor targets chosen by business risk (bugs/rework/maintainability), not preference",
          "Safe changes strategy: small PRs, guardrails, CI evidence",
        ],
      },
    ],
    evidence: [
      "Quality baseline report (hotspots + rationale)",
      "Quality gates checklist + PR template",
      "Before/after examples (lint issues, duplication, flaky areas)",
      "Debt backlog (impact, owner, ETA, why now)",
    ],
    evidenceNote: "Evidence over opinions: every recommendation maps to measurable risk.",
    tools: [
      {
        title: "Static Analysis & Type Safety (ESLint / SonarQube / TypeScript)",
        detail: "Lint + strict rules to prevent risky patterns, catch regressions early (contracts, nullability, unsafe calls).",
      },
      {
        title: "CI Quality Gates (Jenkins + Git workflows)",
        detail: "Merge-ready rules: lint, tests, coverage thresholds, and quality checks enforced on every PR.",
      },
      {
        title: "Automation Signals (Playwright / Cypress / Selenium)",
        detail: "CI quality signals from critical journeys/regression to keep maintainability and prevent silent breakage.",
      },
      {
        title: "API & Contract Checks (Postman / contract checks)",
        detail: "Faster feedback loops; validate integration behavior without the cost/flake risk of UI-only coverage.",
      },
      {
        title: "Tracking & Test Management (Jira + TestRail)",
        detail: "Traceability, recurring defect hotspots, ownership, and regression packs that stay actionable.",
      },
      {
        title: "Safe Refactoring + Data Integrity (small PRs + guardrails + SQL validation)",
        detail: "Refactor safely with measurable impact; verify data integrity and detect broken flows caused by backend changes.",
      },
    ],
    faqs: [
      {
        q: "What do you mean by “Code Quality” in practice?",
        a: "Code quality is how safe it is to change the code. We focus on standards + fast CI feedback to reduce regressions.",
      },
      {
        q: "How do you find quality hotspots quickly?",
        a: "We target high-churn modules, repeated bug areas, and fragile boundaries (UI/API/DB). Then we map each hotspot to a concrete control.",
      },
      {
        q: "Do you enforce standards without slowing delivery?",
        a: "Yes, PR gates stay minimal but effective (format/lint + key tests). We phase in stricter rules gradually.",
      },
      {
        q: "What should be a merge blocker vs a warning?",
        a: "Blockers: broken lint/format, failing critical tests, failing types/security checks.\\nWarnings: style improvements and non-critical rule violations.",
      },
      {
        q: "How do you reduce technical debt without massive rewrites?",
        a: "We prioritize debt by business risk, then refactor in small PRs with guardrails. Every change ships with CI evidence.",
      },
      {
        q: "Can you work with React and .NET backends / complex workflows?",
        a: "Yes. We focus controls on real boundaries: permissions, integrations, and data consistency.",
      },
      {
        q: "What deliverables do engineers actually get?",
        a: "A PR gate setup, a hotspot map, prioritized refactor targets, and reusable checklists. Everything is actionable.",
      },
      {
        q: "How do you measure improvement over time?",
        a: "Fewer regressions and lower rework, plus more stable CI (better pass/flake rate). Faster PR throughput because issues are caught earlier.",
      },
    ],
  },
};

export const serviceEyebrowEn = "Service";
