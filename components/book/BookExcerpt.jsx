"use client";

import { Container } from "@/components/ui/Container";
import { BOOK } from "@/lib/content";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Fragment, useMemo, useRef } from "react";

const COLORS = {
  upcoming: "#A8A29E", // stone-400
  current: "#B91C1C", // crimson-700
  revealed: "#0C0A09", // stone-950
};

function KineticWord({ word, index, total, progress }) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = start + (end - start) * 0.55;

  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const color = useTransform(
    progress,
    [start, mid, end],
    [COLORS.upcoming, COLORS.current, COLORS.revealed],
  );

  return (
    <motion.span className="inline-block" style={{ opacity, color }}>
      {word}
    </motion.span>
  );
}

export function BookExcerpt() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(() => BOOK.excerpt.split(/\s+/).filter(Boolean), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  if (prefersReducedMotion) {
    return (
      <section
        ref={ref}
        className="relative bg-white text-stone-950 border-y border-stone-200"
        id="excerpt"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-white via-stone-50 to-white"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-overlay-light opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 grain-overlay pointer-events-none opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute left-[61.8%] top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-600/8 blur-[160px]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute -left-20 top-10 text-[220px] md:text-[300px] leading-none font-heading font-black text-stone-200/80 select-none">
            &ldquo;
          </div>
          <div className="absolute -right-20 bottom-0 text-[220px] md:text-[300px] leading-none font-heading font-black text-stone-200/80 select-none">
            &rdquo;
          </div>
          <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(28,26,23,0.10)]" />
        </div>

        <div className="section-padding relative z-10">
          <Container size="narrow">
            <p className="font-body text-sm uppercase tracking-[0.28em] text-stone-600 mb-6">
              Excerpt
            </p>
            <blockquote className="font-heading text-2xl md:text-4xl leading-relaxed text-pretty text-stone-950">
              {BOOK.excerpt}
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 text-stone-600 font-body uppercase tracking-[0.28em] text-xs">
              <span className="h-px w-10 bg-crimson-600" />
              Excerpt (preview)
            </figcaption>
          </Container>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative bg-white text-stone-950 border-y border-stone-200"
      id="excerpt"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-white via-stone-50 to-white"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-light opacity-55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute left-[61.8%] top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-600/8 blur-[160px]"
      />

      {/* Massive quote marks bleeding off-screen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -left-24 top-10 text-[220px] md:text-[300px] leading-none font-heading font-black text-stone-200/80 select-none">
          &ldquo;
        </div>
        <div className="absolute -right-24 bottom-0 text-[220px] md:text-[300px] leading-none font-heading font-black text-stone-200/80 select-none">
          &rdquo;
        </div>
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(28,26,23,0.10)]" />
      </div>

      <div className="relative z-10" style={{ minHeight: "180dvh" }}>
        <div
          className="lg:sticky lg:top-24 flex items-center section-padding"
          style={{ height: "calc(100dvh - 6rem)" }}
        >
          <Container size="narrow">
            <p className="font-body text-sm uppercase tracking-[0.28em] text-stone-600 mb-6">
              Excerpt
            </p>

            <p className="font-heading text-2xl md:text-4xl leading-relaxed text-pretty">
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <KineticWord
                    word={word}
                    index={i}
                    total={words.length}
                    progress={progress}
                  />
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </p>

            <motion.div
              aria-hidden="true"
              className="mt-10 h-0.5 w-full bg-stone-200 overflow-hidden"
            >
              <motion.div
                className="h-full bg-crimson-600 origin-left"
                style={{ scaleX: progress }}
              />
            </motion.div>

            <figcaption className="mt-6 flex items-center gap-4 text-stone-600 font-body uppercase tracking-[0.28em] text-xs">
              <span className="h-px w-10 bg-crimson-600" />
              Excerpt (scroll reveal)
            </figcaption>
          </Container>
        </div>
      </div>
    </section>
  );
}
