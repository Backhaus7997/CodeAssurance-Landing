import type { Locale } from "@/content/types";

/** Small interface labels shared by the content templates. */
export const LABELS: Record<Locale, { home: string; services: string; related: string }> = {
  en: { home: "Home", services: "Services", related: "Related" },
  es: { home: "Inicio", services: "Servicios", related: "Relacionados" },
};
