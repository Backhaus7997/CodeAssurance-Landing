import { en } from "@/content/en";
import { es } from "@/content/es";
import { servicesEn } from "@/content/services/en";
import { servicesHub } from "@/content/hubs";
import { servicesEs } from "@/content/services/es";
import { BRAND } from "@/content/site";
import { EN_ONLY_SERVICE_SLUGS, SERVICE_SLUGS, type Locale } from "@/content/types";

export type PageSection = "home" | "services" | "pricing" | "guides" | "privacy";

/** A page that search engines and AI assistants should index. Feeds the sitemap, llms.txt and link checks. */
export type IndexablePage = {
  path: string;
  locale: Locale;
  /** The same page in the other language, when it exists. */
  alternatePath?: string;
  /** Link text for the page: its h1 (the brand for the home pages). */
  label: string;
  title: string;
  description: string;
  /** ISO date of the last change to the page's text. */
  updated: string;
  section: PageSection;
};

/** Exported pages that stay out of search results and out of every list built from this registry. */
export const NOINDEX_PATHS = ["/how-we-work/"];

export function indexablePages(): IndexablePage[] {
  const home = (locale: Locale): IndexablePage => {
    const site = locale === "en" ? en : es;
    return {
      path: locale === "en" ? "/" : "/es/",
      locale,
      alternatePath: locale === "en" ? "/es/" : "/",
      label: BRAND,
      title: site.meta.title,
      description: site.meta.description,
      updated: site.meta.updated,
      section: "home",
    };
  };

  const privacy = (locale: Locale): IndexablePage => {
    const { privacy } = locale === "en" ? en : es;
    return {
      path: locale === "en" ? "/privacy/" : "/es/privacy/",
      locale,
      alternatePath: locale === "en" ? "/es/privacy/" : "/privacy/",
      label: privacy.title,
      title: privacy.meta.title,
      description: privacy.meta.description,
      updated: privacy.meta.updated,
      section: "privacy",
    };
  };

  const services = SERVICE_SLUGS.flatMap((slug): IndexablePage[] => {
    const enPath = `/services/${slug}/`;
    const esPath = `/es/services/${slug}/`;
    const page = (locale: Locale): IndexablePage => {
      const service = locale === "en" ? servicesEn[slug] : servicesEs[slug];
      return {
        path: locale === "en" ? enPath : esPath,
        locale,
        alternatePath: locale === "en" ? esPath : enPath,
        label: service.title,
        title: service.meta.title,
        description: service.meta.description,
        updated: service.updated,
        section: "services",
      };
    };
    return [page("en"), page("es")];
  });

  const englishOnlyServices = EN_ONLY_SERVICE_SLUGS.map((slug): IndexablePage => {
    const service = servicesEn[slug];
    return {
      path: `/services/${slug}/`,
      locale: "en",
      label: service.title,
      title: service.meta.title,
      description: service.meta.description,
      updated: service.updated,
      section: "services",
    };
  });

  const servicesIndex: IndexablePage = {
    path: "/services/",
    locale: "en",
    label: servicesHub.h1,
    title: servicesHub.seo.title,
    description: servicesHub.seo.description,
    updated: servicesHub.updated,
    section: "services",
  };

  return [home("en"), home("es"), servicesIndex, ...services, ...englishOnlyServices, privacy("en"), privacy("es")];
}

export function pageByPath(path: string): IndexablePage | undefined {
  return indexablePages().find((page) => page.path === path);
}
