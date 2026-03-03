"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  ornament = false,
  tag: Tag = "h2",
  className,
}) {
  const alignment = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <ScrollReveal className={cn("mb-12 md:mb-16", alignment[align], className)}>
      <Tag className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-stone-950 mb-4 text-balance">
        {title}
      </Tag>

      {subtitle && (
        <p className="font-body text-lg md:text-xl text-stone-600 max-w-2xl text-pretty mb-6 mt-4">
          {subtitle}
        </p>
      )}

      {ornament && (
        <div
          className={cn(
            "h-1 w-16 bg-crimson-600 mt-6",
            align === "center" ? "mx-auto" : "",
          )}
        />
      )}
    </ScrollReveal>
  );
}
