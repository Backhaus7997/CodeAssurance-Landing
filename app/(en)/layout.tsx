import type { ReactNode } from "react";
import "../globals.css";
import { RootDocument } from "@/components/site/RootDocument";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
