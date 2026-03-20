"use client";

import { cn } from "@/lib/utils";
import { SectionIntro } from "./SectionIntro";

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  ornament = false,
  tag: Tag = "h2",
  index,
  className,
}) {
  return (
    <div className={cn("relative mb-12 md:mb-16", className)}>
      {index && (
        <span
          className={cn(
            "pointer-events-none absolute -top-8 z-0 select-none font-heading text-[120px] leading-none text-stone-200/50 md:text-[160px]",
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
          )}
          aria-hidden="true"
        >
          {index}
        </span>
      )}

      <SectionIntro
        eyebrow={subtitle}
        title={title}
        theme="chapter"
        tone="light"
        align={align}
        as={Tag}
        showDivider={false}
        className="relative z-10"
      />

      {ornament && (
        <div
          className={cn(
            "relative z-10 mt-6 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <div className="h-px w-8 bg-stone-300" />
          <span className="crosshair-marker" />
          <div className="h-px w-8 bg-stone-300" />
        </div>
      )}
    </div>
  );
}
