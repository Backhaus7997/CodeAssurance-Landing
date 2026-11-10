import { breadcrumbLd } from "@/lib/jsonld";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

/** Visible trail plus the same steps as BreadcrumbList data. The last step is the current page. */
export function Breadcrumbs({ trail, className }: { trail: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(trail)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 font-mono text-[13px] text-muted">
          {trail.map((step, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={step.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-soft">
                    {step.name}
                  </span>
                ) : (
                  <>
                    <a href={step.path} className="text-muted no-underline transition-colors hover:text-paper">
                      {step.name}
                    </a>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
