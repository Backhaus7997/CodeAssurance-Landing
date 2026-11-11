import type { Guide } from "../pages/types";
import { AUTHORS } from "./author";

// No figures on purpose: Code Assurance publishes no prices (SEO spec, section 2).
export const qaOutsourcingCost: Guide = {
  slug: "qa-outsourcing-cost",
  authors: AUTHORS,
  published: "2026-11-10",
  updated: "2026-11-10",
  seo: {
    title: "What QA Outsourcing Costs Depend On",
    description:
      "What drives the cost of QA outsourcing: engagement model, scope, platforms, the state of your test suite, team dedication and tools, and how to get a quote.",
  },
  eyebrow: "Guide",
  h1: "What QA outsourcing costs depend on",
  answer:
    "QA outsourcing costs depend mostly on five things: the engagement model, the scope you need covered, the platforms involved, the state of your test suite and how much dedication the work needs. Tools and environments add to it. The way to get an accurate number is an assessment of your product, not a price list, because the same label can hide very different work.",
  sections: [
    {
      heading: "Why is there no standard price for QA outsourcing?",
      pull: "A price list has to guess; an assessment doesn't.",
      paragraphs: [
        "Two requests that sound the same can be very different projects. \"Automate our regression tests\" can mean twenty flows on one web app with a clean API, or two hundred flows across web, Android and iOS with half the test environments missing. A price list has to guess; an assessment doesn't.",
        "That is why most QA companies quote after looking at the product, and why quotes from different vendors are hard to compare unless you ask what each one actually includes.",
      ],
    },
    {
      heading: "How does the engagement model change the cost?",
      paragraphs: ["Each model is priced on a different basis:"],
      bullets: [
        "A project with a defined end, such as an audit or the first version of a test suite, is priced on the scope of that work",
        "A dedicated team that owns testing for a product is priced on the people and their dedication over time",
        "Engineers inside your team are priced on how many people, with which skills, and for how many hours",
      ],
    },
    {
      heading: "Does the length of the commitment matter?",
      paragraphs: [
        "Ongoing work runs either month to month or on longer contracts. Longer commitments are sometimes traded for better terms, but they also lock you in before you have seen results.",
        "Month-to-month terms give you an easy way out if the work isn't paying off, which makes them the safer choice while you are still evaluating a vendor.",
      ],
    },
    {
      heading: "How does scope change it?",
      paragraphs: ["Scope is the biggest factor. These are the questions a vendor will ask:"],
      bullets: [
        "How many critical flows and business rules need coverage?",
        "How many integrations: payments, third-party APIs, internal services?",
        "How many user roles and permission combinations?",
        "Which platforms: web, Android, iOS, APIs, and how many browsers or devices?",
        "Is the work manual testing, automation or both?",
      ],
    },
    {
      heading: "Why do platforms multiply the work?",
      paragraphs: [
        "Every platform adds its own testing. The same checkout flow on the web, on Android and on iOS is three sets of tests, each with its own tools, devices and quirks. Mobile testing across a device matrix costs more than the same flows on one browser, and supporting old OS versions or many browsers adds more.",
        "Be clear about which platforms and versions really matter to your users. Testing everywhere is expensive; testing where your users are is usually enough.",
      ],
    },
    {
      heading: "How much does the state of your test suite matter?",
      paragraphs: [
        "A lot. Starting from zero means choosing a framework, setting up the pipeline and test data, and writing the first tests. Extending an existing suite means learning its conventions and often fixing what is broken first. Maintaining a healthy suite is the lightest of the three, but it never stops: tests change every time the product does.",
        "Unstable environments, missing test data and flaky tests all add hidden work. A good assessment finds them before the quote, not after.",
      ],
    },
    {
      heading: "What about team size and seniority?",
      paragraphs: [
        "For ongoing work, the main question is how many engineers, with which skills, and for how much of their time. A part-time tester across two small projects and a full-time automation engineer inside a busy team are different commitments.",
        "Seniority matters too. Senior engineers cost more per hour but usually need less direction and avoid expensive mistakes, such as automating the wrong flows or building a suite nobody can maintain.",
      ],
    },
    {
      heading: "What other costs should you expect?",
      paragraphs: ["Ask each vendor which of these the quote includes and which you are expected to provide:"],
      bullets: [
        "Test management and tracking tools, if you don't already have them",
        "Device clouds or real devices for mobile testing",
        "Test environments and data that are stable enough to test against",
        "Load-testing infrastructure for performance work",
        "Time from your own team to answer questions and review results",
      ],
    },
    {
      heading: "How should you compare quotes from different vendors?",
      paragraphs: [
        "Put the quotes side by side and compare scope first: which flows, platforms and kinds of testing each one covers, what you receive each month, and who does the work. A lower total that covers half the flows is not cheaper.",
        "Then compare how each vendor reports progress and what happens to the work if you stop. Tests and documentation that stay in your tools are part of what you are paying for.",
      ],
    },
    {
      heading: "How do you get an accurate quote?",
      paragraphs: ["Give the vendor what it needs to quote the real work:"],
      bullets: [
        "Describe the product, its users and its critical flows",
        "Share how you build and release today, and what testing exists",
        "Give access to a test environment or the repository if you can",
        "Say what a good outcome looks like in three months",
        "Ask for a written scope, not only a number, and compare scopes, not totals",
      ],
    },
    {
      heading: "How does Code Assurance price its work?",
      paragraphs: [
        "Code Assurance quotes every engagement after a short call and an assessment of your product. There is no long contract: work runs month to month, and if the first month doesn't work for you, you stop there. Our pricing page explains what the quote includes.",
      ],
    },
  ],
  faq: [
    {
      q: "Is it cheaper to outsource QA or to hire in-house?",
      a: "It depends on how steady the work is and how fast you need results. Our guide on QA outsourcing vs. an in-house team compares both, including the costs that are easy to miss.",
    },
    {
      q: "Do QA companies charge by the hour or by the month?",
      a: "Both models exist. Ongoing work is usually priced per engineer and dedication over a month; projects are priced on their scope. Ask what is included either way.",
    },
    {
      q: "Does test automation reduce QA costs?",
      a: "Over time, it reduces the cost of each release by replacing repeated manual checks. It has an upfront cost and needs maintenance, so it pays off on the flows you test often.",
    },
    {
      q: "Why do QA quotes vary so much between vendors?",
      a: "Because they assume different scopes, seniority and dedication. Compare what each quote includes, not just the total.",
    },
    {
      q: "Does Code Assurance publish prices?",
      a: "No. We quote after an assessment, because the same request can mean very different work. Our pricing page explains what the quote includes.",
    },
  ],
  related: ["/pricing/", "/guides/qa-outsourcing-vs-in-house-qa/", "/guides/how-to-hire-a-qa-company/", "/services/dedicated-qa-engineers/"],
};
