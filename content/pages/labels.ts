import type { Locale } from "@/content/types";

/** Small interface labels shared by the content templates. */
export const LABELS: Record<Locale, { home: string; services: string; guides: string; related: string }> = {
  en: { home: "Home", services: "Services", guides: "Guides", related: "Related" },
  es: { home: "Inicio", services: "Servicios", guides: "Guías", related: "Relacionados" },
};
