import type { EnOnlyServiceSlug } from "../types";
import type { ServiceContent } from "./types";

// Service pages that exist only in English, written for the searches US buyers make (SEO spec, 3.1).

const headings: ServiceContent["headings"] = {
  deliverables: "What you get",
  howItWorks: "How it works",
  evidence: "Evidence you will actually see",
  tools: "Tools we often use (examples)",
  faqs: "FAQs",
};

export const servicesEnOnly: Record<EnOnlyServiceSlug, ServiceContent> = {
  "manual-qa-testing": {
    slug: "manual-qa-testing",
    meta: {
      title: "Manual QA Testing Services | Code Assurance",
      description:
        "Manual QA testing by senior engineers: functional, regression and exploratory testing of your web and mobile apps, with bugs reported in your own tracker.",
    },
    updated: "2026-11-10",
    title: "Manual QA testing services",
    answer:
      "Senior QA engineers test your web and mobile apps by hand before each release: functional checks of new features, regression passes over what already works, and exploratory sessions that look for the bugs nobody wrote a test for. Every bug arrives in your tracker with steps, evidence and severity, and stable checks can be automated later.",
    related: ["/services/automated-testing/", "/services/dedicated-qa-engineers/", "/services/mobile-app-testing/", "/pricing/"],
    promiseLabel: "Promise",
    promise: [
      "Test cases written from your real flows and business rules",
      "Bugs reported with steps, logs and screenshots",
      "Regression passes timed to your release rhythm",
    ],
    headings,
    deliverables: [
      { title: "Test plan and cases", detail: "Test cases for your critical flows, kept in your test management tool" },
      { title: "Release test reports", detail: "What was tested, what passed, what failed and what is still open, per release" },
      { title: "Bug reports developers can act on", detail: "Steps to reproduce, expected and actual results, evidence and severity" },
    ],
    howItWorks: [
      {
        title: "Functional testing of new features",
        bullets: [
          "We test each story against its acceptance criteria and the business rules around it",
          "Edge cases, roles and permissions, and error states, not only the happy path",
        ],
      },
      {
        title: "Regression before each release",
        bullets: [
          "A regression pack ordered by risk, so the critical flows are always covered",
          "Passes timed to your release, with a clear go or no-go summary",
        ],
      },
      {
        title: "Exploratory testing",
        bullets: [
          "Time-boxed sessions that look for what scripted tests miss",
          "Findings become new test cases when they reveal a gap",
        ],
      },
      {
        title: "Support for user acceptance testing",
        bullets: [
          "We prepare scenarios and data so your stakeholders can sign off faster",
          "Issues found in acceptance testing are triaged with your team before the release",
        ],
      },
    ],
    evidence: [
      "Test cases and runs in your test management tool",
      "Bug reports with steps, screenshots, video and logs",
      "Release reports: coverage, open issues and risk",
      "Regression results per release",
    ],
    evidenceNote: "You always know what was tested, not just what was found.",
    tools: [
      { title: "Jira / Linear", detail: "Bugs filed where your developers already work." },
      { title: "TestRail", detail: "Test cases, runs and regression packs with traceability." },
      { title: "Azure DevOps Test Plans", detail: "Test plans and results inside your Azure DevOps project." },
      { title: "Browser developer tools", detail: "Network, console and storage evidence attached to each bug." },
    ],
    faqs: [
      {
        q: "Is manual testing still worth it if we have automated tests?",
        a: "Yes. Automation is best at repeating known checks; people are better at new features, usability problems and the unexpected. Most products need both, and we help decide what stays manual and what gets automated.",
      },
      {
        q: "What do you need from us to start?",
        a: "Access to a test environment, your tracker and whatever describes the product: stories, acceptance criteria or a walkthrough with someone who knows it. In the first week we map the critical flows and agree on how bugs are reported.",
      },
      {
        q: "Do you test mobile apps too?",
        a: "Yes, on Android and iOS, on real devices and emulators. Our mobile app testing page explains how we choose devices and OS versions.",
      },
      {
        q: "Can manual test cases be automated later?",
        a: "Yes. Stable, repetitive checks are the best candidates. We flag them as we go, and our automation engineers or our AI QA agent can turn them into tests in your framework.",
      },
      {
        q: "How do you report bugs?",
        a: "In your tracker, with steps to reproduce, expected and actual results, screenshots or video, logs when they help, and a severity agreed with your team.",
      },
    ],
  },

  "dedicated-qa-engineers": {
    slug: "dedicated-qa-engineers",
    meta: {
      title: "Dedicated QA Engineers for Your Team | Code Assurance",
      description:
        "Dedicated QA engineers who join your team: manual or automation testers in your ceremonies and tools, with US time overlap, month-to-month and no long contract.",
    },
    updated: "2026-11-10",
    title: "Dedicated QA engineers for your team",
    answer:
      "Our QA engineers join your team as if they were in-house: they attend your ceremonies, work in your tools and own testing for the projects you assign them. You choose manual testers, automation engineers or a mix, part-time or full-time, month-to-month. We work from Argentina (UTC−3), so most of the day overlaps with US teams.",
    related: ["/services/manual-qa-testing/", "/services/automated-testing/", "/services/ai-qa-agent/", "/pricing/"],
    promiseLabel: "Promise",
    promise: [
      "Manual or automation, part-time or full-time",
      "Your ceremonies, your tools, your cadence",
      "Month-to-month, with no long contract",
    ],
    headings,
    deliverables: [
      { title: "A QA owner for your projects", detail: "Someone accountable for test strategy and release readiness on each assigned project" },
      { title: "Testing in every sprint", detail: "Stories tested as they land, regression before releases and bugs triaged with your developers" },
      { title: "Quality you can see", detail: "Reports your team and stakeholders can read: what was tested and what is at risk" },
    ],
    howItWorks: [
      {
        title: "Onboarding in the first week",
        bullets: [
          "We learn your product, flows and release process, and map the codebase",
          "Access, tools and reporting are agreed with your leads before the first sprint",
        ],
      },
      {
        title: "Working inside your team",
        bullets: [
          "Daily standups, planning, refinement and reviews, like any other team member",
          "Acceptance criteria and testability questions raised during refinement, not after the code ships",
        ],
      },
      {
        title: "Manual, automation or both",
        bullets: [
          "Manual testers for functional, regression and exploratory work",
          "Automation engineers who build and maintain tests in your framework",
        ],
      },
      {
        title: "A flexible engagement",
        bullets: [
          "Part-time across one or more projects, or full-time on your critical ones",
          "Month-to-month: you can scale up or down, and if the first month doesn't work for you, you stop there",
        ],
      },
    ],
    evidence: [
      "Test results and bug reports in your tools",
      "Sprint and release QA summaries",
      "Risk notes before each release",
      "Test plans and coverage that stay with your team",
    ],
    evidenceNote: "Everything we produce lives in your tools, so it stays with you.",
    tools: [
      { title: "Your tracker", detail: "Jira, Linear or Azure DevOps: we work where your team works." },
      { title: "Your test framework", detail: "Playwright, Cypress, Selenium, Robot Framework or the one you already use." },
      { title: "Your communication tools", detail: "Slack or Teams, with standups and reviews on your schedule." },
      { title: "TestRail / Azure DevOps Test Plans", detail: "Test cases and runs traced back to stories." },
    ],
    faqs: [
      {
        q: "What is QA staff augmentation?",
        a: "It means adding QA engineers to your team without hiring them yourself. They work inside your process and tools, while we take care of hiring and managing them.",
      },
      {
        q: "How much do our time zones overlap?",
        a: "We work from Argentina (UTC−3). With US teams most of the working day overlaps, so standups, planning and reviews happen in real time.",
      },
      {
        q: "Can we start with one engineer and grow?",
        a: "Yes. You can start with one QA engineer, part-time or full-time, and add more as the product or the release pace grows. It is month-to-month.",
      },
      {
        q: "Do your engineers work in English?",
        a: "Yes. We work in English or Spanish, in meetings and in writing.",
      },
      {
        q: "Who owns the test cases and the automation?",
        a: "You do. Everything is written in your repositories and tools, so it stays with your team if the engagement ends.",
      },
    ],
  },

  "ai-qa-agent": {
    slug: "ai-qa-agent",
    meta: {
      title: "AI QA Agent for Your Test Suite | Code Assurance",
      description:
        "Our AI QA agent maps your codebase, writes tests in your framework and repairs broken locators, with every change reviewed by a senior QA engineer first.",
    },
    updated: "2026-11-10",
    title: "AI QA agent for your test suite",
    answer:
      "Our AI QA agent is a pipeline of specialized agents that a senior QA engineer runs on your codebase. It maps what is covered and what is not, writes tests in the framework you already use, sends them as pull requests, and proposes fixes when a locator breaks. Nothing reaches your repository without human review. It is an add-on to any engagement.",
    related: ["/services/automated-testing/", "/services/dedicated-qa-engineers/", "/services/code-quality/", "/pricing/"],
    promiseLabel: "Promise",
    promise: [
      "Coverage gaps found from your code, not guessed",
      "Tests written in your framework, sent as pull requests",
      "A senior QA engineer reviews everything before it reaches you",
    ],
    headings,
    deliverables: [
      { title: "Codebase coverage map", detail: "Every module, the tests it already has and the flows with none, built from your code in the first week" },
      { title: "Tests as pull requests", detail: "New tests in your framework and conventions, ready for your normal code review" },
      { title: "Self-repairing locators", detail: "When a selector breaks, the agent finds the element again on the live page and proposes the fix for approval" },
    ],
    howItWorks: [
      {
        title: "It reads before it writes",
        bullets: [
          "Scans your repositories to learn the stack, the framework and the conventions your team uses",
          "Checks the current documentation of your test tools before writing code",
        ],
      },
      {
        title: "It maps your coverage",
        bullets: [
          "Builds a map of modules, existing tests and untested flows",
          "Gaps become a prioritized backlog, starting with the flows that carry the most risk",
        ],
      },
      {
        title: "It writes and repairs tests",
        bullets: [
          "Writes tests in your framework and test cases in the tool you use, Azure DevOps Test Plans included",
          "When a locator breaks, it re-matches the element on the live page and proposes the fix, which waits for approval",
        ],
      },
      {
        title: "A person stays in charge",
        bullets: [
          "A senior QA engineer from our team runs the agent, reviews every output and decides what goes to your repository",
          "Application bugs it finds go to your developers with steps and logs; the test stays red on purpose",
        ],
      },
    ],
    evidence: [
      "The coverage map of your codebase",
      "Pull requests with the tests and the reasoning behind them",
      "Proposed locator fixes with the before and after",
      "Bug reports with steps and logs for your developers",
    ],
    evidenceNote: "Every change arrives as a pull request you can review.",
    tools: [
      { title: "Playwright / Cypress / Selenium", detail: "The agent writes in the framework you already use." },
      { title: "Robot Framework", detail: "Keyword-driven suites are supported too." },
      { title: "Jest / Vitest / pytest", detail: "Unit and integration tests alongside your code." },
      { title: "GitHub / GitLab / Azure DevOps", detail: "Tests arrive as pull requests in your repository." },
      { title: "Azure DevOps Test Plans", detail: "Test cases written into your existing test plans." },
    ],
    faqs: [
      {
        q: "Does the agent replace QA engineers?",
        a: "No. It does the repetitive work faster, but a senior QA engineer from our team runs it, reviews what it produces and decides what reaches your repository.",
      },
      {
        q: "Can it merge code on its own?",
        a: "No. Everything arrives as a pull request or a proposed fix that waits for approval. Your normal code review stays in place.",
      },
      {
        q: "Which frameworks does it work with?",
        a: "The ones your team already uses, such as Playwright, Cypress, Selenium, Robot Framework, Jest, Vitest or pytest. It follows your existing rules for how tests are written.",
      },
      {
        q: "How do we add it?",
        a: "It is an add-on to any engagement: test automation, manual QA or dedicated QA engineers. We include it in the quote after the assessment call.",
      },
      {
        q: "What happens when it finds a real bug?",
        a: "It doesn't hide it. The failing test stays red, and the bug goes to your developers with steps and logs.",
      },
    ],
  },

  "mobile-app-testing": {
    slug: "mobile-app-testing",
    meta: {
      title: "Mobile App Testing Services (Android, iOS) | Code Assurance",
      description:
        "Mobile app testing for Android and iOS on real devices and emulators: functional, regression and compatibility testing across OS versions, plus Appium.",
    },
    updated: "2026-11-10",
    title: "Mobile app testing services for Android and iOS",
    answer:
      "We test your Android and iOS apps on real devices and emulators before every release. That covers functional and regression testing, compatibility across OS versions, screen sizes and device models, and behavior on poor networks. Stable checks can be automated with Appium, and our engineers bring hands-on mobile testing experience from teams at Numerade.",
    related: ["/services/manual-qa-testing/", "/services/automated-testing/", "/services/api-testing/", "/pricing/"],
    promiseLabel: "Promise",
    promise: [
      "Real devices and emulators, Android and iOS",
      "Coverage across OS versions, screens and networks",
      "Appium automation for the checks worth repeating",
    ],
    headings,
    deliverables: [
      { title: "Device and OS matrix", detail: "The devices, OS versions and screen sizes that matter for your users, agreed up front" },
      { title: "Release test passes", detail: "Functional, regression and compatibility results per build, before it reaches the stores" },
      { title: "Automated mobile checks", detail: "Appium tests for stable, repetitive flows, running in your pipeline" },
    ],
    howItWorks: [
      {
        title: "We agree on the device matrix",
        bullets: [
          "Based on your analytics or your target market, we choose devices, OS versions and screen sizes",
          "Real devices for what emulators cannot reproduce; emulators for breadth",
        ],
      },
      {
        title: "Functional and regression testing",
        bullets: [
          "New features tested against acceptance criteria on both platforms",
          "Regression passes before each release, so updates don't break what worked",
        ],
      },
      {
        title: "Real-world conditions",
        bullets: [
          "Slow or unstable networks, interruptions, permissions and background states",
          "Install, update and upgrade paths, not only clean installs",
        ],
      },
      {
        title: "Automation where it pays off",
        bullets: ["Appium tests for the flows you run on every build", "Results and evidence attached to each run in your pipeline"],
      },
    ],
    evidence: [
      "Device and OS coverage per release",
      "Bug reports with device, OS version, steps and video",
      "Regression results per build",
      "Automated run results from your pipeline",
    ],
    evidenceNote: "Every bug says which device and OS version it happened on.",
    tools: [
      { title: "Appium", detail: "Automation for Android and iOS from one test suite." },
      { title: "Android emulators / iOS simulators", detail: "Breadth across OS versions and screen sizes." },
      { title: "Real devices", detail: "Gestures, hardware and behavior that emulators cannot reproduce." },
      { title: "Jira / TestRail", detail: "Bugs and test runs with device details attached." },
    ],
    faqs: [
      {
        q: "Do you test on real devices or emulators?",
        a: "Both. Emulators give breadth across OS versions and screen sizes; real devices catch what emulators miss, like gestures and hardware behavior. We agree on the mix with you.",
      },
      {
        q: "Which devices and OS versions do you cover?",
        a: "The ones your users have. We build the matrix from your analytics or your target market, and update it as new OS versions ship.",
      },
      {
        q: "Can you automate our mobile tests?",
        a: "Yes, with Appium, for the flows you run on every build. Exploratory and visual checks usually stay manual.",
      },
      {
        q: "Do you test before App Store and Google Play releases?",
        a: "Yes. We run regression and compatibility passes on each release candidate, so the build you submit has been tested on the devices that matter.",
      },
    ],
  },

  "api-testing": {
    slug: "api-testing",
    meta: {
      title: "API Testing Services | Code Assurance",
      description:
        "API testing services: functional and contract tests for your endpoints and integrations, data checks in SQL, and automated runs in your CI pipeline.",
    },
    updated: "2026-11-10",
    title: "API testing services",
    answer:
      "We test your APIs and integrations directly, before problems reach the user interface. That means functional tests for each endpoint, contract checks so a change on one side doesn't break the other, and SQL checks that the data underneath stays consistent. The tests run in your CI pipeline, so every merge gets fast feedback.",
    related: ["/services/automated-testing/", "/services/performance-audit/", "/services/security-review/", "/pricing/"],
    promiseLabel: "Promise",
    promise: [
      "Fast feedback before the UI breaks",
      "Contract checks between services and integrations",
      "Data verified in the database, not only in the response",
    ],
    headings,
    deliverables: [
      { title: "API test suite", detail: "Functional tests for your critical endpoints, in your stack and running in CI" },
      { title: "Contract checks", detail: "Agreements between services and third parties, tested on every change" },
      { title: "Data integrity checks", detail: "SQL validation of what the API writes, reads and updates" },
    ],
    howItWorks: [
      {
        title: "Critical endpoints first",
        bullets: [
          "We start with the endpoints behind revenue and critical flows: auth, payments, orders, integrations",
          "Positive, negative and edge cases, including permissions and error responses",
        ],
      },
      {
        title: "Contracts between services",
        bullets: [
          "Request and response contracts tested, so a change on one side doesn't silently break the other",
          "Third-party integrations covered at the boundary you control",
        ],
      },
      {
        title: "The data underneath",
        bullets: ["SQL checks confirm the API stored what it reported", "Test data set up and cleaned, so runs are repeatable"],
      },
      {
        title: "Runs in your pipeline",
        bullets: ["Fast API suites gate merges; broader runs happen on a schedule", "Failures come with the request, the response and the logs"],
      },
    ],
    evidence: [
      "Test runs in CI with request and response details",
      "Contract check results per change",
      "Data consistency findings with the queries behind them",
      "Bug reports with reproducible requests",
    ],
    evidenceNote: "Every failure includes the exact request that reproduces it.",
    tools: [
      { title: "Postman", detail: "Collections for functional API tests and fast exploration." },
      { title: "Contract checks", detail: "Request and response agreements between services, tested on every change." },
      { title: "SQL", detail: "Data validation at the database level." },
      { title: "CI/CD (Jenkins + Git workflows)", detail: "API suites that gate merges and releases." },
    ],
    faqs: [
      {
        q: "Why test the API if we already have end-to-end tests?",
        a: "API tests are faster and more stable, and they pinpoint where a failure is. End-to-end tests still matter for the critical journeys, but most checks are cheaper at the API level.",
      },
      {
        q: "What is contract testing?",
        a: "It checks that the requests and responses two services exchange still match what each side expects, so a change in one doesn't silently break the other.",
      },
      {
        q: "Do you test third-party integrations?",
        a: "We test the boundary you control: what you send, what you accept, and how you handle errors and timeouts from the other side.",
      },
      {
        q: "Where do the tests run?",
        a: "In your CI pipeline. Fast suites gate merges, and broader runs happen on a schedule or before releases.",
      },
    ],
  },
};
