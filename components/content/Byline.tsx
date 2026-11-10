import type { Author } from "@/content/pages/types";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** Who wrote the guide and when it was last updated: signals readers and AI assistants both look for. */
export function Byline({ author, published, updated }: { author: Author; published: string; updated: string }) {
  return (
    <p data-testid="byline" className="m-0 font-mono text-[13px] text-muted">
      By <span className="text-soft">{author.name}</span>, {author.role} · {published === updated ? "Published" : "Updated"}{" "}
      <time dateTime={updated}>{formatDate(updated)}</time>
    </p>
  );
}
