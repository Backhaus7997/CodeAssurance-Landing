import type { ReactNode } from "react";
import "../../globals.css";
import { RootDocument } from "@/components/site/RootDocument";

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
