import { Fragment } from "react";
import { Marquee } from "@/components/ui/marquee";
import type { StackContent } from "@/content/types";

export function StackMarquee({ marquee, label }: { marquee: StackContent["marquee"]; label: string }) {
  return (
    <div className="mt-14 border-y border-line py-3 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <p className="sr-only">
        {label}: {[...marquee.tools, ...marquee.languages].join(", ")}
      </p>
      <div aria-hidden="true">
        <Marquee pauseOnHover repeat={3} className="p-1 font-mono text-[14px] text-soft [--duration:48s] [--gap:2.25rem]">
          {marquee.tools.map((tool) => (
            <Fragment key={tool}>
              <span>{tool}</span>
              <span className="text-mint">▪</span>
            </Fragment>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover repeat={3} className="p-1 font-mono text-[14px] text-muted [--duration:48s] [--gap:2.25rem]">
          {marquee.languages.map((language) => (
            <Fragment key={language}>
              <span className="whitespace-nowrap">{language}</span>
              <span>·</span>
            </Fragment>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
