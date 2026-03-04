"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTilt3D } from "@/hooks/useTilt3D";
import { AUTHORS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function initialsFor(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function accentFor(index) {
  if (index % 3 === 1) {
    return {
      line: "bg-olive-600",
      badgeLine: "border-l-olive-600",
      badgeText: "text-olive-800",
      soft: "bg-olive-600/8",
    };
  }
  if (index % 3 === 2) {
    return {
      line: "bg-stone-900/25",
      badgeLine: "border-l-stone-900/30",
      badgeText: "text-stone-700",
      soft: "bg-stone-900/6",
    };
  }
  return {
    line: "bg-crimson-600",
    badgeLine: "border-l-crimson-600",
    badgeText: "text-crimson-700",
    soft: "bg-crimson-600/8",
  };
}

function PhotoStack({ initials, accent }) {
  const tilt = useTilt3D({ maxTilt: 7, scale: 1.03 });

  return (
    <div className="perspective-container">
      <motion.div
        ref={tilt.ref}
        style={tilt.style}
        onMouseMove={tilt.handleMouseMove}
        onMouseLeave={tilt.handleMouseLeave}
        className="relative aspect-4/5 w-full max-w-md mx-auto preserve-3d"
      >
        <div className="absolute inset-0 rounded-[2px] bg-white border border-stone-200 shadow-[0_18px_60px_rgba(28,26,23,0.14)] rotate-[-6deg] translate-x-3 translate-y-3" />
        <div className="absolute inset-0 rounded-[2px] bg-stone-50 border border-stone-200 shadow-[0_16px_50px_rgba(28,26,23,0.12)] rotate-[4deg] translate-x-1.5 translate-y-1.5" />

        <div className="relative h-full w-full rounded-[2px] bg-white border border-stone-200 overflow-hidden shadow-[0_28px_90px_rgba(28,26,23,0.16)]">
          <div aria-hidden="true" className="absolute inset-0 grid-overlay-light opacity-45" />
          <div aria-hidden="true" className="absolute inset-0 grain-overlay pointer-events-none opacity-55" />
          <div aria-hidden="true" className={cn("absolute left-0 top-0 bottom-0 w-1", accent.line)} />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-white via-transparent to-stone-200/60"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 shadow-[inset_0_0_110px_rgba(28,26,23,0.10)]"
          />

          <div className="absolute inset-0 grid place-items-center">
            <span className="font-heading text-[96px] md:text-[120px] font-black text-stone-300/55 select-none">
              {initials}
            </span>
          </div>

          <div className="absolute left-6 right-6 bottom-6 flex items-center justify-between gap-8">
            <div className="font-body text-[10px] uppercase tracking-[0.34em] text-stone-500">
              Portrait placeholder
            </div>
            <span className="crosshair-marker scale-75 opacity-60" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function QuoteCallout({ quote, accent }) {
  return (
    <div className={cn("relative rounded-[2px] border border-stone-200 bg-stone-50 overflow-hidden", accent.soft)}>
      <div aria-hidden="true" className="absolute inset-0 grid-overlay-light opacity-35" />
      <div aria-hidden="true" className="absolute inset-0 grain-overlay pointer-events-none opacity-55" />
      <div aria-hidden="true" className={cn("absolute left-0 top-0 bottom-0 w-1", accent.line)} />

      <div className="relative p-6 md:p-7">
        <div aria-hidden="true" className="font-heading font-black leading-none text-[72px] text-stone-200/80 -mt-6">
          &ldquo;
        </div>
        <p className="font-heading text-xl md:text-2xl font-medium italic leading-snug text-stone-900 text-pretty -mt-6">
          {quote}
        </p>
      </div>
    </div>
  );
}

function AuthorSection({ author, index }) {
  const isEven = index % 2 === 0;
  const sectionBg = isEven ? "bg-stone-50" : "bg-white";
  const accent = accentFor(index);

  const initials = initialsFor(author.name);
  const anchorId = `author-${index}`;
  const code = `OS-A${String(index + 1).padStart(2, "0")}`;

  return (
    <section
      id={anchorId}
      className={cn(
        "relative overflow-hidden section-padding scroll-mt-24 border-b border-stone-200",
        sectionBg,
        index > 0 && "clip-diagonal-top -mt-1",
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 grid-overlay-light opacity-45" />
      <div aria-hidden="true" className="absolute inset-0 grain-overlay pointer-events-none opacity-50" />

      <div
        aria-hidden="true"
        className={cn(
          "absolute -top-10 right-[-6vw] font-heading font-black leading-none select-none pointer-events-none",
          "text-[clamp(4.5rem,10vw,10rem)]",
          "text-stone-200/55",
        )}
      >
        {initials}
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Image */}
          <div
            className={cn(
              "relative lg:col-span-5",
              isEven ? "lg:order-2 lg:col-start-8" : "lg:order-1 lg:col-start-1",
            )}
          >
            <ScrollReveal variant="rotate-in">
              <div className={cn("relative", isEven ? "lg:pt-14" : "lg:pt-8")}>
                <PhotoStack initials={initials} accent={accent} />
              </div>
            </ScrollReveal>
          </div>

          {/* Text */}
          <div
            className={cn(
              "relative lg:col-span-7",
              isEven ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-6",
            )}
          >
            <ScrollReveal variant="clip-left">
              <div
                className={cn(
                  "relative rounded-[2px] border border-stone-200 bg-white shadow-[0_28px_90px_rgba(28,26,23,0.10)] overflow-hidden",
                  isEven ? "lg:-mr-8" : "lg:-ml-8",
                )}
              >
                <div aria-hidden="true" className="absolute inset-0 grid-overlay-light opacity-35" />
                <div aria-hidden="true" className="absolute inset-0 grain-overlay pointer-events-none opacity-55" />
                <div aria-hidden="true" className={cn("absolute left-0 top-0 bottom-0 w-1", accent.line)} />

                <div className="relative p-8 md:p-10">
                  <div className="flex items-start justify-between gap-10">
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 rounded-[2px] border border-stone-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] border-l-2",
                        accent.badgeLine,
                        accent.badgeText,
                      )}
                    >
                      <span className="crosshair-marker scale-75 opacity-55" />
                      {author.role}
                    </div>

                    <div className="text-right">
                      <div className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500 tabular-nums">
                        {code}
                      </div>
                      <div className="mt-2 font-body text-[11px] uppercase tracking-[0.32em] text-stone-400 tabular-nums">
                        {String(index + 1).padStart(2, "0")}/
                        {String(AUTHORS.length).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  <h2 className="mt-9 font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] text-stone-950 text-balance">
                    {author.name}
                  </h2>

                  <div className="mt-7 font-body text-stone-700 text-lg leading-relaxed">
                    <p>
                      <span className="font-heading text-6xl font-black text-crimson-600 float-left mr-3 mt-1 leading-none">
                        {author.bio[0]}
                      </span>
                      {author.bio.slice(1)}
                    </p>
                  </div>

                  <div className="mt-10">
                    <QuoteCallout quote={author.quote} accent={accent} />
                  </div>

                  <div className="mt-10 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-stone-500">
                      <span className="crosshair-marker scale-75 opacity-60" />
                      Archive verified
                    </div>
                    <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-stone-400">
                      <span className="tabular-nums">{anchorId.toUpperCase()}</span>
                      <span className="text-stone-300">/</span>
                      <span className="tabular-nums">OS-3.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function AuthorProfiles() {
  return (
    <div className="bg-stone-50">
      {AUTHORS.map((author, index) => (
        <AuthorSection key={author.name} author={author} index={index} />
      ))}
    </div>
  );
}
