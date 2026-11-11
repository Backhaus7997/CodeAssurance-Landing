import type { Guide } from "../pages/types";
import { AUTHORS } from "./author";

export const howToImproveQaInYourCompany: Guide = {
  slug: "how-to-improve-qa-in-your-company",
  authors: AUTHORS,
  published: "2026-11-10",
  updated: "2026-11-10",
  seo: {
    title: "How to Improve QA in Your Company: A Practical Plan",
    description:
      "A practical plan to improve QA in your company: find where bugs escape, map risk, test at the right level, automate critical flows and fix flaky tests.",
  },
  eyebrow: "Guide",
  h1: "How to improve QA in your company",
  answer:
    "Start by finding where bugs escape today, then put your testing effort where the risk is. Map your critical flows, test each one at the cheapest level that catches its bugs, automate the checks you repeat on every release, and keep the suite trustworthy by fixing or removing flaky tests. Make quality part of how stories are written, not only how they are checked.",
  sections: [
    {
      heading: "Where are your bugs escaping today?",
      paragraphs: [
        "Improvement starts with evidence. Take the last twenty or thirty bugs that reached users or were found late, and for each one write down where it should have been caught: in the requirements, in code review, in a unit test, in an API test, or in a manual check before the release.",
        "Patterns appear quickly. Maybe most escaped bugs come from one module, from integrations with a third party, or from changes nobody tested again. That pattern tells you where to invest first, which is more useful than any generic best practice.",
      ],
    },
    {
      heading: "Which flows carry the most risk?",
      paragraphs: [
        "Not every part of a product deserves the same testing. A risk map lists your main modules and flows and rates each one on two questions: how likely is it to break, and how much does it hurt when it does? The usual suspects:",
      ],
      bullets: [
        "Flows that touch money: checkout, payments, refunds, invoices",
        "Access: sign-up, login, password reset, roles and permissions",
        "Integrations with third parties and with other internal services",
        "Areas that change often or have a history of bugs",
        "Anything with legal, security or data-loss consequences",
      ],
    },
    {
      heading: "How detailed should the risk map be?",
      paragraphs: [
        "Short enough that the whole team reads it. A page listing modules, their risk and what covers them today is enough to start. Start your effort at the top of that list, and update the map whenever an escaped bug shows that a risk was rated too low.",
        "If you can, build the map from the codebase rather than from memory: which modules exist, which tests already touch them and which flows have none. It is less flattering, and much more accurate.",
      ],
    },
    {
      heading: "At which level should you test each thing?",
      paragraphs: [
        "Each kind of test catches different bugs at a different cost. Unit tests are fast and cheap but don't see how the pieces work together. API tests check behavior and contracts without the fragility of the interface. End-to-end tests prove that a real user journey works, but they are slower and break more easily. Manual and exploratory testing finds what nobody thought to script.",
        "Test each behavior at the lowest level that can catch its bugs, and keep end-to-end tests for the critical journeys where the integration itself is the risk. A suite that leans on end-to-end tests for everything becomes slow, flaky and expensive to maintain.",
      ],
    },
    {
      heading: "What should you automate first?",
      paragraphs: ["Automation pays off on what you repeat. In order:"],
      bullets: [
        "The critical flows from your risk map, starting with a smoke suite that runs on every pull request",
        "Regression checks you repeat by hand before every release",
        "API checks for integrations and the contracts between services",
        "Test data setup, so tests don't depend on whatever someone left in the environment",
      ],
    },
    {
      heading: "Where should automated tests run?",
      paragraphs: [
        "In your CI pipeline, with their result as part of the merge decision. Tests that only run on someone's laptop don't protect anything. Keep the pull request suite fast, and run broader suites on a schedule or before releases.",
        "Make failures easy to read: the step that failed, the screenshot or the request, and the logs. When a red build takes minutes to understand instead of hours, people stop ignoring it.",
      ],
    },
    {
      heading: "How do you deal with flaky tests?",
      paragraphs: [
        "A flaky test passes and fails without any change in the code. A few of them are enough to teach a team to ignore red builds, and then the suite stops protecting anyone.",
        "Set a simple policy: every flaky test has an owner and is either fixed, quarantined while it is being fixed, or removed. Track how many tests are quarantined and treat a growing number as a problem. The usual causes are unstable selectors, fixed waits instead of waiting for a condition, shared test data, and tests that depend on the order they run in.",
      ],
    },
    {
      heading: "How do you build quality into the process, not just the testing?",
      paragraphs: ["Most bugs are cheaper to prevent than to find. A few habits do most of the work:"],
      bullets: [
        "Write acceptance criteria that can be tested, and review them before development starts",
        "Include testers in refinement, where questions are cheap to answer",
        "Add a definition of done that includes tests and a look at the risk map",
        "Make one person accountable for release readiness on each release",
        "Review escaped bugs together every few weeks, without blame, and update the risk map",
      ],
    },
    {
      heading: "How do you know it is working?",
      paragraphs: [
        "Pick a few measures and watch them over months, not days: escaped bugs per release and how severe they are, how long it takes to know whether a build is safe to ship, how many tests are flaky or quarantined, and how much of the risk map is covered by automated checks.",
        "Avoid counting test cases. A thousand tests on low-risk screens are worth less than twenty on the flows that pay your bills.",
      ],
    },
    {
      heading: "Where can outside help speed this up?",
      paragraphs: [
        "Code Assurance helps teams at each step: building the risk map from your codebase, automating the critical flows in your framework, stabilizing a flaky suite, and adding QA engineers to your sprints. Our AI QA agent maps coverage and writes tests as pull requests that a senior QA engineer reviews before they reach you.",
      ],
    },
  ],
  faq: [
    {
      q: "Where should a small team start improving QA?",
      a: "With the escaped-bug review and a short risk map. Then automate a smoke suite for the most critical flow and run it on every pull request. That alone changes how releases feel.",
    },
    {
      q: "Do we need a dedicated QA engineer to improve QA?",
      a: "Not to start. Developers can take the first steps. A dedicated QA engineer helps when testing starts to compete with building features, or when nobody owns release readiness.",
    },
    {
      q: "How much test automation is enough?",
      a: "Enough that your critical flows are checked on every change and you trust the result. Coverage percentages matter less than whether the tests cover the risks on your map.",
    },
    {
      q: "How long does it take to see results?",
      a: "The first changes, such as a smoke suite on pull requests and a flaky-test policy, show results within weeks. Fewer escaped bugs usually becomes visible over a few release cycles.",
    },
    {
      q: "Should developers write tests, or testers?",
      a: "Both. Developers usually own unit and many API tests; testers bring the risk view, exploratory testing and the end-to-end journeys. What matters is that someone owns each level.",
    },
  ],
  related: ["/services/automated-testing/", "/services/manual-qa-testing/", "/services/ai-qa-agent/", "/guides/how-to-hire-a-qa-company/"],
};
