import Image from "next/image";
import { BRAND } from "@/content/site";
import { cn } from "@/lib/utils";

// The shield is 720×820; height follows the width.
export function Logo({ size = 30, wordmark = true, className }: { size?: number; wordmark?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 font-extrabold tracking-[-0.01em]", className)}>
      <Image src="/logo.svg" alt={wordmark ? "" : BRAND} width={size} height={Math.round((size * 820) / 720)} priority unoptimized />
      {wordmark && <span>{BRAND}</span>}
    </span>
  );
}
