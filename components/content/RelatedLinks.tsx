import { GlowingEffect } from "@/components/ui/glowing-effect";
import { pageByPath } from "@/lib/routes";
import { Section } from "./Section";

/** Links to related pages, labelled with each page's h1. An unknown path stops the build. */
export function RelatedLinks({ title, hrefs, index }: { title: string; hrefs: string[]; index?: string }) {
  if (hrefs.length === 0) return null;
  const links = hrefs.map((href) => {
    const page = pageByPath(href);
    if (!page) throw new Error(`Related link ${href} is not an indexable page`);
    return { href, label: page.label, description: page.description };
  });
  return (
    <Section title={title} testId="related" index={index}>
      <ul className="m-0 grid list-none grid-cols-1 gap-px border border-line bg-line p-0 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.href} data-glow-card="" className="relative bg-ink">
            <GlowingEffect disabled={false} proximity={48} spread={30} inactiveZone={0.01} borderWidth={1} />
            <a href={link.href} className="flex h-full flex-col gap-2 px-5 py-5 no-underline transition-colors hover:bg-surface">
              <span className="text-[17px] font-semibold text-paper">{link.label} →</span>
              <span className="text-[15px] text-soft">{link.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
