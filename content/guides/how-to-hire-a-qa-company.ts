import type { Guide } from "../pages/types";
import { AUTHORS } from "./author";

export const howToHireAQaCompany: Guide = {
  slug: "how-to-hire-a-qa-company",
  authors: AUTHORS,
  published: "2026-11-10",
  updated: "2026-11-10",
  seo: {
    title: "How to Hire a QA Company: A Buyer's Checklist",
    description:
      "A practical checklist for hiring a QA company: when it makes sense, the three engagement models, questions to ask, red flags and what the first month shows.",
  },
  eyebrow: "Guide",
  h1: "How to hire a QA company: a buyer's checklist",
  answer:
    "Hire a QA company when bugs keep reaching users, releases slow down because nobody trusts the tests, or your developers spend their time testing instead of building. Choose the engagement model first: a project, a dedicated team or engineers inside your team. Then judge vendors by how they learn your product, what they deliver in the first month and who owns the work.",
  sections: [
    {
      heading: "When does it make sense to hire a QA company?",
      paragraphs: [
        "Most teams don't start with QA. Developers test their own work, someone clicks through the main flows before a release, and that is enough until it isn't. The signals that you have outgrown that stage are easy to see once you name them:",
      ],
      bullets: [
        "Bugs reach users that a basic regression pass would have caught",
        "Releases slip because nobody is confident the build is safe to ship",
        "Automated tests fail at random, so the team has learned to ignore them",
        "Developers spend a large share of each sprint testing instead of building",
        "A launch, an audit or an important customer is coming, and you need evidence that the product works",
      ],
    },
    {
      heading: "Is outside help the right next step?",
      paragraphs: [
        "If two or more of those signals sound familiar, outside help is usually faster than hiring and training an in-house team from scratch. A QA company brings people who have already set up test strategies, automation and release checks on other products, so you skip the months of learning that a first hire would need.",
        "If none of them sound familiar, you may not need a QA company yet. A good vendor will tell you so on the first call instead of selling you a service you don't need.",
      ],
    },
    {
      heading: "Which engagement model do you need?",
      pull: "Choose the model first: it makes vendors much easier to compare.",
      paragraphs: ["QA companies usually work in one of three ways, and choosing the model first makes vendors much easier to compare:"],
      bullets: [
        "A project with a clear end: a performance audit, a security review, or the first version of an automated test suite. It fits when the problem is specific and bounded.",
        "A dedicated QA team that owns testing for a product: they plan, test, automate and report, and you get the outcome. It fits when you have no QA function at all.",
        "Engineers inside your team, often called QA staff augmentation: testers who join your ceremonies and work in your tools. It fits when you already have a process and need more hands or skills in it.",
      ],
    },
    {
      heading: "Can you combine the models?",
      paragraphs: [
        "Yes, and over time it is common. A focused project can stabilize a flaky test suite, and then one or two engineers keep it healthy inside your sprints. Or an outside team covers day-to-day testing while specialists run a performance audit before a big launch.",
        "What matters is that you know which model you are buying at each moment, because each one is judged differently: a project by what it delivers at the end, a team by the outcomes it owns, and embedded engineers by how well they work inside your process.",
      ],
    },
    {
      heading: "What should you ask a QA company before hiring it?",
      paragraphs: ["The answers to these questions tell you more than any case study:"],
      bullets: [
        "How will you learn our product in the first two weeks, and what will you need from us?",
        "What will we have at the end of the first month that we don't have today?",
        "Will you work in our framework, repositories and tracker, or bring your own?",
        "Who reviews the tests you write, and how do you keep them stable?",
        "How do you report bugs, and how do you report progress to people who don't read test results?",
        "Who exactly will work on our product, and how much of their time will it get?",
        "What happens to the test cases and the automation if we stop working together?",
        "How much do our working hours overlap?",
      ],
    },
    {
      heading: "How do you judge the answers?",
      paragraphs: [
        "Pay attention to how specific the answers are. A vendor who has done this before will describe the first weeks concretely: what they will look at, what they will ask for and what you will see by when. A vague answer usually means a generic process that will be adapted to your product slowly, at your expense.",
        "Also notice what they ask you. Good QA teams ask about your users, your release process and the bugs that hurt most before they talk about tools or headcount.",
      ],
    },
    {
      heading: "What are the red flags?",
      paragraphs: ["None of these is a deal-breaker on its own, but each one deserves a direct question:"],
      bullets: [
        "A fixed offer and price before anyone has looked at your product",
        "Promises of total coverage or zero bugs; no honest QA team can guarantee either",
        "Tests written in a proprietary tool that you can't run or keep without the vendor",
        "Metrics that count test cases instead of risks covered or bugs caught before release",
        "No clear owner on their side, or a team that changes every few weeks",
        "A long contract before you have seen any results",
      ],
    },
    {
      heading: "What should the first month look like?",
      paragraphs: [
        "The first month is the best test of a QA company, so agree on it before you sign. In the first week, expect questions about your product, your users, how you ship and where it hurts. A good team builds a map of what is already tested and what is not, so the work starts from risk, not from a template.",
        "By the end of the month you should see real output: bugs found and reported in your tracker, the first critical flows covered by tests that run in your pipeline, and a plan for the next months that you understand and agree with. If you can't point to any of that, the engagement is not working, and month-to-month terms let you stop there.",
      ],
    },
    {
      heading: "How should you prepare before talking to vendors?",
      paragraphs: [
        "You don't need a formal requirements document. Half an hour of notes makes the first call much more useful, and the quotes you get back become easier to compare. Write down:",
      ],
      bullets: [
        "What the product does, who uses it, and which flows make money or would hurt most if they broke",
        "How you build and release today: environments, CI, release cadence",
        "What testing already exists, even if it is just a checklist",
        "The last few bugs that reached users, and what they cost you",
        "What a good outcome looks like in three months",
      ],
    },
    {
      heading: "How does Code Assurance work?",
      paragraphs: [
        "Code Assurance offers all three models: focused projects such as test automation, performance audits and security reviews; dedicated QA for your product; and QA engineers who join your team. Every engagement starts with a short call and an assessment, the first deliverable is a coverage map built from your codebase, and the work runs month-to-month. Our AI QA agent can be added to any engagement.",
      ],
    },
  ],
  faq: [
    {
      q: "How long does it take to start working with a QA company?",
      a: "It depends on the vendor and on access. Once a test environment and your tools are available, a prepared team can start learning your product in the first week and produce useful output within the first month.",
    },
    {
      q: "Should we hire a QA company or build an in-house team?",
      a: "It depends on how fast you need results, how steady the workload is and whether you want to manage QA yourself. Our guide on QA outsourcing vs. an in-house team compares both in detail.",
    },
    {
      q: "Can a QA company work with our developers in the same sprint?",
      a: "Yes, if you choose a model where testers join your team. They attend planning and refinement, test stories as they land and file bugs where your developers already work.",
    },
    {
      q: "Who should own the test automation, us or the vendor?",
      a: "You should. The tests should live in your repositories and run in your pipeline, so they keep working if the vendor leaves.",
    },
    {
      q: "What does a QA company need from us to start?",
      a: "Access to a test environment, your tracker and your repositories, plus someone who knows the product and can answer questions during the first weeks.",
    },
  ],
  related: ["/guides/qa-outsourcing-vs-in-house-qa/", "/guides/qa-outsourcing-cost/", "/services/dedicated-qa-engineers/", "/pricing/"],
};
