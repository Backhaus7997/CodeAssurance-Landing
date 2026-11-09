// The outbound one-pager (linked from the second email of the sequence), ported as approved.
import { en } from "./en";
import type { HowWeWorkContent } from "./types";

export const howWeWork: HowWeWorkContent = {
  meta: {
    title: "How we work | Code Assurance",
    description:
      "Senior QA engineers and an AI QA agent that works inside your repos, your tickets and your test framework. Manual QA, automation and dedicated QA teams, month-to-month.",
  },
  hero: {
    title: "QA built around your product, not a template",
    lead: "Senior QA engineers plus an AI QA agent that works inside your repositories, your tickets and the test framework you already use. We test manually, automate what's worth automating and keep the suite healthy release after release.",
    primaryCta: "Book a 15-minute call",
    secondaryCta: "See how we work",
    emailCta: "Email us",
    emailPrefix: "Prefer email?",
  },
  pr: {
    title: "qa: password reset and refunds coverage",
    ticket: "PROJ-123",
    badge: "Draft",
    branch: "qa/auto-northwind-2026-11-12",
    status: "waiting for your review",
    summary: [
      { text: "Mapped 14 modules. Password reset, refunds and role changes had no tests." },
      { text: "Added 31 tests in your existing Playwright and Jest setup, following your naming and folder conventions." },
      { text: "2 failures look like application bugs. Flagged for your developers, not patched over.", tone: "bug" },
      { text: "1 broken checkout locator re-matched against the live page. Fix proposed, waiting for approval.", tone: "wait" },
    ],
    files: [],
    checks: ["unit (Jest) passed", "e2e (Playwright) passed", "test standards check passed"],
    caption: "An example of what lands in your repository. Nothing is merged until your team approves it.",
  },
  stack: {
    index: "01",
    label: "Your stack",
    title: "We adapt to your stack, your process and your business rules",
    description:
      "Every engagement starts by learning how your product works and how your team ships. Then we set up the agent and the test plan around that: your tools, your conventions, your release rhythm. If your team already has rules for how tests are written, we follow them, and the agent keeps following them.",
    rows: [
      { label: "Code", value: "GitHub, GitLab or Azure DevOps. Tests arrive as pull requests in your repo." },
      { label: "Tickets", value: "Jira, Linear or GitHub Issues. A ticket can become a test plan and a set of tests." },
      { label: "Test cases", value: "In the test management tool you use, including Azure DevOps Test Plans." },
      { label: "Frameworks", value: "Playwright, Cypress, Selenium, Robot Framework, Jest, Vitest, pytest and others." },
      { label: "Languages", value: "TypeScript and JavaScript, Python, Java, .NET, Go, Ruby and PHP." },
      { label: "Platforms", value: "Web and mobile, native Android and iOS, on real devices and emulators." },
    ],
    diagram: en.agent.stack.diagram,
    marquee: en.agent.stack.marquee,
  },
  agent: {
    index: "02",
    label: "Agent",
    title: "How the agent works on your codebase",
    description:
      "A pipeline of specialized agents, each responsible for one stage. A senior QA engineer from our team runs it, reviews the output and decides what goes to your repo.",
    stages: [
      { name: "scan", description: "Detects your framework, language and what can be tested." },
      { name: "map", description: "Builds a working model of your codebase: critical paths, risk areas, patterns and the tests you already have." },
      { name: "research", description: "Checks current docs for your testing stack so tests match today's APIs." },
      { name: "analyze", description: "Ranks risk and defines the test inventory: how much unit, API, integration and end-to-end." },
      { name: "plan", description: "Groups test cases by feature and decides where each one lives." },
      { name: "generate", description: "Writes tests, page objects and fixtures that read like your team wrote them." },
      { name: "validate", description: "Runs four layers of checks and separates real application bugs from test mistakes." },
      { name: "deliver", description: "Opens a draft pull request with the analysis, the counts and the open questions." },
    ],
    startingPoints: [
      { tone: "mint", title: "No tests yet", text: "We design the test repository from scratch and deliver a first suite on your critical flows." },
      { tone: "wait", title: "Tests that keep breaking", text: "We fix what's broken, standardize the rest and fill the coverage gaps that matter." },
      { tone: "muted", title: "A mature suite", text: "Targeted additions only, where coverage is thin. Working tests stay untouched." },
    ],
    extrasLabel: "Also part of the agent",
    extras: [
      { title: "From ticket to tests", text: "Point it at a ticket and it drafts the test cases and the automation for that feature." },
      { title: "Broken locators, fixed with approval", text: "When the UI changes, it re-checks the live page, proposes the fix and waits for a yes before applying it." },
      { title: "Audits with a score", text: "A quality audit of your current tests, gaps between dev and QA repos, and test IDs added to components where they're missing." },
    ],
    triage: en.agent.triage,
  },
  plans: {
    index: "03",
    label: "Plans",
    title: "Ways to work with us",
    description: "Pick the one that fits where your product is today. Each one is sized to your scope, and you can move between them.",
    packages: en.plans.packages,
    specialists:
      "Also available on their own or alongside any plan: performance audits (load, stress, bottlenecks), security reviews (code scanning, threat modeling, compliance checks) and code quality reviews (static analysis, architecture, technical debt).",
  },
  team: {
    index: "04",
    label: "Team",
    title: "Senior people lead every engagement",
    statement:
      "A QA engineer with 8+ years of experience owns the strategy, reviews every test and works in your team's cadence, in English or Spanish, in a US-friendly time zone.",
    trackRecordLabel: "Track record",
    trackRecord: "Our engineers have delivered QA on teams at Disney, FIFA, PayPal, Royal Caribbean, Deloitte, Globant and Numerade.",
  },
  start: {
    index: "05",
    label: "How it starts",
    title: "Month-to-month, no long contract",
    description: "You pay to start. If the first month doesn't work for you, you stop there. Let's look at your product together.",
    steps: [
      { title: "A 15-minute call", text: "Your product, your stack and what's hurting today." },
      { title: "Assessment", text: "A risk map by module, the top issues with quick wins and a prioritized testing backlog." },
      { title: "Plan", text: "Test strategy, coverage plan and quality gates you can measure." },
      { title: "Delivery", text: "Testing and automation inside your sprints, with flaky tests triaged and the pipeline hardened." },
    ],
    primaryCta: "Book a 15-minute call",
    emailCta: "Email us",
  },
};
