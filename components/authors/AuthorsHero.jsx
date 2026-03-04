"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { Container } from "@/components/ui/Container";
import { AUTHORS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const PANEL_BACKGROUNDS = [
  "from-stone-950 via-stone-950 to-stone-900",
  "from-olive-900/18 via-stone-950 to-stone-950",
  "from-stone-900/20 via-stone-950 to-stone-950",
];

const PANEL_ACCENTS = ["crimson", "olive", "stone"];

function accentClasses(accent) {
  if (accent === "olive") {
    return {
      line: "bg-olive-600/85",
      badgeBorder: "border-olive-700/50",
      badgeText: "text-olive-200",
      glow: "bg-olive-900/22",
    };
  }
  if (accent === "stone") {
    return {
      line: "bg-stone-50/14",
      badgeBorder: "border-stone-50/20",
      badgeText: "text-stone-200",
      glow: "bg-stone-50/8",
    };
  }

  return {
    line: "bg-crimson-600/85",
    badgeBorder: "border-crimson-700/50",
    badgeText: "text-crimson-200",
    glow: "bg-crimson-900/25",
  };
}

export function AuthorsHero() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);

  const authors = useMemo(
    () =>
      AUTHORS.map((a, i) => ({
        ...a,
        index: i,
        initials: getInitials(a.name),
        anchor: `author-${i}`,
        code: `A-${String(i + 1).padStart(2, "0")}`,
        accent: PANEL_ACCENTS[i % PANEL_ACCENTS.length],
        panelBg: PANEL_BACKGROUNDS[i % PANEL_BACKGROUNDS.length],
      })),
    [],
  );

  return (
    <section className="relative overflow-hidden bg-stone-950 text-stone-50 border-b border-stone-800 pt-24 md:pt-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-stone-950 via-stone-950 to-stone-900"
      />
      <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 grain-overlay pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute left-[61.8%] top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/14 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="absolute -top-12 right-[-8vw] font-heading font-black text-mega text-stone-900/35 select-none pointer-events-none"
      >
        AUTHORS
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-stone-400 mb-6">
              Operation Stream 3.0
            </p>
            <AnimatedText
              text={"Meet\nthe Authors"}
              as="h1"
              splitBy="line"
              className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-stone-50 leading-[0.95] max-w-3xl"
            />
            <p className="mt-6 font-body text-stone-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              Three contributors. One record. Each profile reads like a page
              torn from the archive.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[2px] border border-stone-800/80 bg-stone-950/55 ring-1 ring-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden backdrop-blur-md">
              <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-45" />
              <div aria-hidden="true" className="absolute inset-0 grain-overlay pointer-events-none opacity-55" />
              <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-600/80" />

              <div className="relative p-6 md:p-7">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <div className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-400">
                      Dossier Index
                    </div>
                    <div className="mt-3 font-heading text-3xl font-semibold text-stone-50 leading-tight">
                      03 Profiles
                    </div>
                  </div>
                  <div className="text-right font-body text-[11px] uppercase tracking-[0.32em] text-stone-400 tabular-nums">
                    OS-3.0
                  </div>
                </div>

                <div className="mt-6 h-px bg-stone-800/80" />

                <div className="mt-6 grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.28em] text-stone-400">
                  <span className="flex items-center gap-3">
                    <span className="crosshair-marker scale-75 opacity-60" />
                    Format
                  </span>
                  <span className="text-right text-stone-200">Editorial</span>
                  <span className="flex items-center gap-3">
                    <span className="crosshair-marker scale-75 opacity-60" />
                    Motion
                  </span>
                  <span className="text-right text-stone-200">Spring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pb-16 md:pb-20">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {authors.map((author, i) => {
              const isActive = activeIndex === i;
              const isOtherActive = activeIndex !== null && !isActive;
              const accent = accentClasses(author.accent);

              const growTarget =
                prefersReducedMotion || activeIndex === null
                  ? 1
                  : isActive
                    ? 1.55
                    : 0.85;

              const Panel = prefersReducedMotion ? "div" : motion.div;
              const panelProps = prefersReducedMotion
                ? { style: { flexGrow: 1 } }
                : {
                    animate: { flexGrow: growTarget },
                    transition: { type: "spring", stiffness: 170, damping: 26 },
                  };

              return (
                <Panel
                  key={author.name}
                  className={cn(
                    "relative w-full md:flex-1 md:basis-0 overflow-hidden rounded-[2px] border border-stone-800/80 bg-stone-950/55 ring-1 ring-white/5 shadow-[0_30px_110px_rgba(0,0,0,0.55)] backdrop-blur-md",
                    "min-h-[220px] md:min-h-[340px]",
                  )}
                  {...panelProps}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      author.panelBg,
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 grid-overlay-dark opacity-40"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 grain-overlay pointer-events-none opacity-50"
                  />

                  <div
                    aria-hidden="true"
                    className={cn("absolute left-0 top-0 bottom-0 w-1", accent.line)}
                  />
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-24 -right-24 h-80 w-80 rounded-full blur-[120px]",
                      accent.glow,
                      !prefersReducedMotion &&
                        "transition-opacity duration-500",
                      isOtherActive ? "opacity-35" : "opacity-100",
                    )}
                  />

                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-10 -right-8 font-heading font-black leading-none select-none pointer-events-none",
                      "text-[160px] md:text-[220px]",
                      "text-stone-50/10",
                      !prefersReducedMotion &&
                        "transition-opacity duration-500",
                      isOtherActive ? "opacity-25" : "opacity-100",
                    )}
                  >
                    {author.initials}
                  </div>

                  <Link
                    href={`#${author.anchor}`}
                    className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-500"
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => setActiveIndex(i)}
                    onBlur={() => setActiveIndex(null)}
                  >
                    <span className="sr-only">{author.name}</span>
                  </Link>

                  <div className="relative z-20 h-full p-6 md:p-7">
                    <div className="flex items-start justify-between gap-10">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-[2px] border bg-stone-950/45 ring-1 ring-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.32em] backdrop-blur-sm",
                          accent.badgeBorder,
                          accent.badgeText,
                        )}
                      >
                        <span className="crosshair-marker scale-[0.65] opacity-70" />
                        {author.role}
                      </div>

                      <div className="text-right font-body text-[10px] uppercase tracking-[0.34em] text-stone-400 tabular-nums">
                        {author.code}
                      </div>
                    </div>

                    <div className="mt-7 md:mt-10">
                      <p className="font-heading text-2xl md:text-3xl font-semibold text-stone-50 leading-tight text-balance">
                        {author.name}
                      </p>
                      <p className="mt-4 font-body text-sm md:text-base text-stone-300 leading-relaxed max-w-[54ch]">
                        {author.bio}
                      </p>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-10">
                      <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-400">
                        View profile
                      </span>
                      <span className="crosshair-marker scale-75 opacity-50" />
                    </div>
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
