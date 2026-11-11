import type { Author } from "@/content/pages/types";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** Who wrote the guide and when it was last updated: signals readers and AI assistants both look for. */
/** "Martin Backhaus and Mariano Backhaus, Founders" (one shared role is named once, in plural). */
function signature(authors: Author[]): string {
  const names = authors.map((a) => a.name);
  const joined = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
  const roles = [...new Set(authors.map((a) => a.role))];
  const role = roles.length === 1 ? (authors.length > 1 ? `${roles[0]}s` : roles[0]) : authors.map((a) => a.role).join(" and ");
  return `${joined}, ${role}`;
}

export function Byline({ authors, published, updated }: { authors: Author[]; published: string; updated: string }) {
  return (
    <p data-testid="byline" className="m-0 font-mono text-[13px] text-muted">
      By <span className="text-soft">{signature(authors)}</span> · {published === updated ? "Published" : "Updated"}{" "}
      <time dateTime={updated}>{formatDate(updated)}</time>
    </p>
  );
}
