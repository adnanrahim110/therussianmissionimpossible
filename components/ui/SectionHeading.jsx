"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  ornament = false,
  tag: Tag = "h2",
  index,
  className,
}) {
  const alignment = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <ScrollReveal
      variant="clip-up"
      className={cn("mb-12 md:mb-16 relative", alignment[align], className)}
    >
      {/* Giant index number behind heading */}
      {index && (
        <span
          className={cn(
            "absolute -top-8 font-heading font-black text-[120px] md:text-[160px] leading-none text-stone-200/50 select-none pointer-events-none z-0",
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
          )}
          aria-hidden="true"
        >
          {index}
        </span>
      )}

      {/* Eyebrow subtitle */}
      {subtitle && (
        <p className="font-body text-sm uppercase tracking-[0.2em] text-stone-500 mb-4 relative z-10">
          {subtitle}
        </p>
      )}

      <Tag className="font-heading font-semibold text-4xl md:text-5xl lg:text-6xl text-stone-950 mb-4 text-balance relative z-10">
        {title}
      </Tag>

      {/* Ornament → crosshair marker */}
      {ornament && (
        <div
          className={cn(
            "flex items-center gap-3 mt-6 relative z-10",
            align === "center" ? "justify-center" : "",
          )}
        >
          <div className="h-px w-8 bg-stone-300" />
          <span className="crosshair-marker" />
          <div className="h-px w-8 bg-stone-300" />
        </div>
      )}
    </ScrollReveal>
  );
}
