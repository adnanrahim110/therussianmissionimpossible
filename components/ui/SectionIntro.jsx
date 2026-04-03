"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

const alignments = {
  left: "text-left",
  center: "mx-auto text-center",
};

const tones = {
  dark: {
    eyebrow: "text-stone-400",
    title: "text-stone-50",
    body: "text-stone-300",
    rule: "bg-stone-700/70",
    marker: "text-crimson-300",
  },
  light: {
    eyebrow: "text-stone-600",
    title: "text-stone-950",
    body: "text-stone-700",
    rule: "bg-stone-300",
    marker: "text-crimson-700",
  },
};

const themes = {
  chapter: {
    title:
      "font-heading text-3xl leading-[0.9] tracking-[0.02em] uppercase sm:text-4xl md:text-5xl lg:text-6xl",
    eyebrow: "font-ui text-[11px] uppercase tracking-[0.32em]",
  },
  command: {
    title:
      "font-heading text-2xl leading-[0.9] tracking-[0.02em] uppercase sm:text-3xl md:text-4xl lg:text-5xl",
    eyebrow: "font-ui text-[11px] uppercase tracking-[0.32em]",
  },
  editorial: {
    title:
      "font-body text-2xl font-semibold leading-[1.04] tracking-[-0.028em] sm:text-3xl md:text-4xl lg:text-5xl",
    eyebrow: "font-ui text-[11px] uppercase tracking-[0.3em]",
  },
  minimal: {
    title:
      "font-body text-xl font-semibold leading-[1.04] tracking-[-0.028em] sm:text-2xl md:text-3xl lg:text-4xl",
    eyebrow: "font-ui text-[11px] uppercase tracking-[0.28em]",
  },
};

export function SectionIntro({
  eyebrow,
  title,
  body,
  theme = "chapter",
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  showDivider = true,
  themeLabel,
  className,
  titleClassName,
  bodyClassName,
}) {
  const palette = tones[tone] ?? tones.dark;
  const style = themes[theme] ?? themes.chapter;

  return (
    <ScrollReveal
      variant="clip-up"
      className={cn("relative max-w-3xl", alignments[align], className)}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="crosshair-marker scale-75 opacity-75" />
          <span className={cn(style.eyebrow, palette.eyebrow)}>{eyebrow}</span>
        </div>
      )}

      <Tag className={cn(style.title, palette.title, titleClassName)}>
        {title}
      </Tag>

      {body && (
        <p
          className={cn(
            "mt-6 max-w-[68ch] text-base leading-7 text-pretty md:text-lg md:leading-8",
            align === "center" && "mx-auto",
            palette.body,
            bodyClassName,
          )}
        >
          {body}
        </p>
      )}

      {showDivider && (
        <div
          className={cn(
            "mt-8 flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <div className={cn("h-px w-16", palette.rule)} />
          <span
            className={cn(
              "font-ui text-[10px] uppercase tracking-[0.32em]",
              palette.marker,
            )}
          >
            {themeLabel ?? theme}
          </span>
        </div>
      )}
    </ScrollReveal>
  );
}
