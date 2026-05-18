import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  showTagline?: boolean;
};

export function BrandLogo({ className, showTagline = true }: BrandLogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <span className="relative flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
        <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
        <Sparkles className="relative size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-black tracking-tight text-slate-950 dark:text-white">
          StudyMate AI
        </span>
        {showTagline ? (
          <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
            by J &amp; J Media
          </span>
        ) : null}
      </span>
    </Link>
  );
}
