import type { PageCopy } from "./pages/types";

// No prices are published: every engagement is quoted after an assessment (SEO spec, section 2).
export const pricing: PageCopy = {
  seo: {
    title: "How QA Pricing Works | Code Assurance",
    description:
      "How Code Assurance prices QA work: a short call, an assessment of your product and scope, and a written quote. No price list and no long contracts.",
  },
  eyebrow: "Pricing",
  h1: "How pricing works",
  answer:
    "We don't publish fixed prices, because two QA engagements are rarely the same size. Instead, we start with a short call, assess your product and what you need, and send a written quote for the work. Engagements run month-to-month with no long contract, and if the first month doesn't work for you, you stop there.",
  sections: [
    {
      heading: "What happens on the call?",
      paragraphs: [
        "The first call takes about 15 minutes. We ask what you are building, how you ship today and where quality hurts: escaped bugs, slow releases, a test suite nobody trusts, or no QA at all.",
        "If it makes sense to continue, we look at your product and, when you can share it, your code. That assessment is what the quote is based on.",
      ],
    },
    {
      heading: "What changes the price?",
      paragraphs: ["The price follows the work, so these are the factors we look at:"],
      bullets: [
        "How many critical flows and integrations need coverage: payments, third-party APIs, roles and permissions",
        "Which platforms are involved: web, Android, iOS, APIs",
        "Where your test suite stands: starting from zero, extending one you already have, or keeping one maintained",
        "Manual testing, automation or both",
        "Dedication: part-time or full-time engineers, and how many",
        "Whether you add our AI QA agent to the engagement",
        "Focused work such as a performance audit or a security review",
      ],
    },
    {
      heading: "What does the quote include?",
      paragraphs: [
        "A written scope: what we will test or automate first, what you get each month and how progress is reported.",
        "The team: who works on your product and with what dedication. And the terms: month-to-month, with no long contract.",
      ],
    },
    {
      heading: "How does an engagement run?",
      paragraphs: [
        "The first deliverable of every engagement is a coverage map of your codebase, built in the first week. From there, the work follows your sprints and releases, with evidence you can check in your own tools.",
        "You can scale up, scale down or stop from one month to the next.",
      ],
    },
  ],
  faq: [
    {
      q: "Why don't you publish prices?",
      a: "Because scope varies too much. A regression pass on one web app and a dedicated team across three products are different projects. A quote based on your actual scope is more useful than a number that fits nobody.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No. Engagements are month-to-month. If the first month doesn't work for you, you stop there.",
    },
    {
      q: "Is the AI QA agent included?",
      a: "It is an add-on you can include in any engagement. If you want it, it is part of the quote.",
    },
    {
      q: "Can we start small?",
      a: "Yes. You can start with one engineer or one focused piece of work, like automating your critical flows or a performance audit, and grow from there.",
    },
    {
      q: "What do you need from us to send a quote?",
      a: "A short call about your product and how you ship. If you can share a test environment or your repository, the assessment is more precise, and so is the quote.",
    },
  ],
  related: ["/services/", "/services/automated-testing/", "/services/dedicated-qa-engineers/", "/services/ai-qa-agent/"],
  updated: "2026-11-10",
};
