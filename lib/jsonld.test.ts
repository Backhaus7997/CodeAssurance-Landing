import { describe, expect, it } from "vitest";
import {
  ORG_ID,
  articleLd,
  breadcrumbLd,
  faqLd,
  itemListLd,
  organizationLd,
  serializeJsonLd,
  serviceLd,
  websiteLd,
} from "./jsonld";

function keys(node: unknown): string[] {
  if (Array.isArray(node)) return node.flatMap(keys);
  if (node && typeof node === "object") return Object.entries(node).flatMap(([k, v]) => [k, ...keys(v)]);
  return [];
}

describe("serializeJsonLd", () => {
  it("cannot close the script tag and round-trips the text", () => {
    const text = 'say "hi" </script><script>alert(1)</script>';
    const out = serializeJsonLd({ text });
    expect(out).not.toContain("</script");
    expect(out).not.toContain("<");
    expect(JSON.parse(out)).toEqual({ text });
  });
});

describe("organizationLd", () => {
  const org = organizationLd();

  it("names the legal entity behind the brand", () => {
    expect(org).toMatchObject({
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Code Assurance",
      legalName: "Backhaustin S.A.S.",
      url: "https://www.code-assurance.com",
      logo: "https://www.code-assurance.com/apple-icon.png",
      email: "martin.backhaus@code-assurance.com",
      areaServed: { "@type": "Country", name: "United States" },
    });
  });

  it("omits sameAs while there are no profiles", () => {
    expect(org).not.toHaveProperty("sameAs");
  });
});

describe("faqLd", () => {
  it("wraps each visible question and answer", () => {
    expect(faqLd([{ q: "Do you publish prices?", a: "No. We quote after an assessment." }])).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you publish prices?",
          acceptedAnswer: { "@type": "Answer", text: "No. We quote after an assessment." },
        },
      ],
    });
  });
});

describe("breadcrumbLd", () => {
  it("numbers positions from 1 with absolute URLs", () => {
    const ld = breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services/" },
    ]);
    expect(ld).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.code-assurance.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.code-assurance.com/services/" },
      ],
    });
  });
});

describe("page-level builders", () => {
  it("credits the organization as the service provider", () => {
    expect(serviceLd({ name: "API testing services", description: "d", path: "/services/api-testing/", serviceType: "API testing" })).toMatchObject({
      "@type": "Service",
      provider: { "@id": ORG_ID },
      url: "https://www.code-assurance.com/services/api-testing/",
      areaServed: { "@type": "Country", name: "United States" },
    });
  });

  it("dates articles and names their author", () => {
    expect(
      articleLd({
        headline: "How to hire a QA company",
        description: "d",
        path: "/guides/how-to-hire-a-qa-company/",
        author: { name: "Martin Backhaus", role: "Founder" },
        published: "2026-11-10",
        updated: "2026-11-12",
      }),
    ).toMatchObject({
      "@type": "Article",
      author: { "@type": "Person", name: "Martin Backhaus", jobTitle: "Founder" },
      publisher: { "@id": ORG_ID },
      datePublished: "2026-11-10",
      dateModified: "2026-11-12",
    });
  });

  it("lists items in order", () => {
    expect(itemListLd([{ name: "A", path: "/a/" }])).toMatchObject({
      "@type": "ItemList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "A", url: "https://www.code-assurance.com/a/" }],
    });
  });

  it("never claims reviews or ratings", () => {
    const all = [
      organizationLd(),
      websiteLd(),
      serviceLd({ name: "n", description: "d", path: "/", serviceType: "t" }),
      faqLd([{ q: "q", a: "a" }]),
    ];
    expect(keys(all).filter((k) => /review|rating/i.test(k))).toEqual([]);
  });
});
