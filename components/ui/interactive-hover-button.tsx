import { ArrowRight } from "lucide-react"
import type { AnchorHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

// Adapted from Magic UI's InteractiveHoverButton: renders a link (every CTA navigates), uses the
// mint/ink tokens, and animates only transform and opacity. Hover styles apply on hover devices only.
export function InteractiveHoverLink({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "group press relative inline-flex min-h-[50px] cursor-pointer items-center overflow-hidden rounded-[2px] border border-mint bg-mint px-5 text-center font-semibold text-ink no-underline",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2.5">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-ink transition-transform duration-300 ease-out group-hover:scale-[100.8]"
        />
        <span className="inline-block transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-mint opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
      >
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  )
}
