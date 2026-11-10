import { type Ld, serializeJsonLd } from "@/lib/jsonld";

export function JsonLd({ data }: { data: Ld | Ld[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
