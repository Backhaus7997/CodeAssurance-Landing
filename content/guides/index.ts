import type { Guide, GuideSlug } from "../pages/types";
import { howToHireAQaCompany } from "./how-to-hire-a-qa-company";
import { howToImproveQaInYourCompany } from "./how-to-improve-qa-in-your-company";
import { qaOutsourcingCost } from "./qa-outsourcing-cost";
import { qaOutsourcingVsInHouseQa } from "./qa-outsourcing-vs-in-house-qa";

/** Every guide, in suggested reading order. Adding a guide: one file in this folder and one line here. */
export const guides: Guide[] = [howToHireAQaCompany, qaOutsourcingVsInHouseQa, howToImproveQaInYourCompany, qaOutsourcingCost];

/** Newest first, for the guides index. */
export function guidesByUpdated(): Guide[] {
  return [...guides].sort((a, b) => b.updated.localeCompare(a.updated));
}

export function guideBySlug(slug: GuideSlug): Guide {
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) throw new Error(`No guide with slug "${slug}"`);
  return guide;
}
