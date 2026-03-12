"use client";

import { Container } from "@/components/ui/Container";
import { TIMELINE } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const RULER_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(to right, rgba(250,249,247,0.14) 0 1px, transparent 1px 24px)",
};

function typeStyles(type) {
  if (type === "liberation") {
    return {
      badge: "border-olive-800/70 text-olive-200 bg-olive-950/35",
      dot: "bg-olive-400",
      bar: "bg-olive-500/80",
      glow: "bg-olive-500/10",
    };
  }

  if (type === "operations") {
    return {
      badge: "border-stone-700/70 text-stone-200 bg-stone-950/35",
      dot: "bg-stone-300",
      bar: "bg-stone-50/10",
      glow: "bg-stone-50/5",
    };
  }

  return {
    badge: "border-crimson-800/70 text-crimson-200 bg-crimson-950/35",
    dot: "bg-crimson-500",
    bar: "bg-crimson-600/80",
    glow: "bg-crimson-600/10",
  };
}

function TimelineCard({ item, index, total, className }) {
  const styles = typeStyles(item.type);

  return (
    <div
      className={cn(
        "relative shrink-0 rounded-[2px] border border-stone-800/80 overflow-hidden",
        "bg-linear-to-br from-stone-950/80 via-stone-950/70 to-stone-900/40",
        "ring-1 ring-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute -top-24 -right-24 h-80 w-80 rounded-full blur-[120px]",
          styles.glow,
        )}
      />
      <div
        aria-hidden="true"
        className={cn("absolute left-0 top-0 bottom-0 w-1", styles.bar)}
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-8 font-heading font-black leading-none text-[160px] text-stone-900/35 select-none pointer-events-none"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between gap-6">
          <div className="inline-flex items-center gap-3">
            <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
            <time className="font-body text-[11px] uppercase tracking-[0.28em] text-stone-300">
              {item.date}
            </time>
          </div>

          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-[2px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.32em]",
              styles.badge,
            )}
          >
            <span className="crosshair-marker scale-[0.65] opacity-70" />
            {item.type}
          </span>
        </div>

        <p className="mt-6 font-heading text-xl md:text-2xl font-medium text-stone-50 leading-snug text-balance">
          {item.event}
        </p>

        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-stone-500">
            <span className="crosshair-marker scale-75 opacity-50" />
            Marker
          </div>
          <div className="text-xs uppercase tracking-[0.28em] text-stone-600 tabular-nums">
            {String(index + 1).padStart(2, "0")}/
            {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [maxX, setMaxX] = useState(0);
  const [pinnedHeight, setPinnedHeight] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });

  const progressClamped = useTransform(progress, (v) =>
    Math.max(0, Math.min(1, v)),
  );
  const x = useTransform(progressClamped, (v) => -v * maxX);

  useEffect(() => {
    if (!viewportRef.current || !trackRef.current) return;

    const compute = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const viewportHeight = viewportRef.current?.clientHeight ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;

      const nextMaxX = Math.max(0, trackWidth - viewportWidth);
      setMaxX(nextMaxX);

      if (viewportWidth === 0 || viewportHeight === 0) {
        setPinnedHeight(null);
        return;
      }

      setPinnedHeight(Math.max(viewportHeight * 2, nextMaxX + viewportHeight));
    };

    compute();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => compute());
    ro.observe(viewportRef.current);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-950 text-stone-50 border-y border-stone-800"
      id="chronology"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-stone-950 via-stone-950 to-stone-900"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute left-[61.8%] top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/14 blur-[160px]"
      />

      <div
        className={cn(
          "section-padding relative z-10",
          prefersReducedMotion ? "block" : "lg:hidden",
        )}
      >
        <Container>
          <div className="max-w-2xl">
            <p className="font-body text-sm uppercase tracking-[0.28em] text-stone-400 mb-4 flex items-center gap-4">
              <span className="crosshair-marker scale-75 opacity-60" />
              <span>Chronology</span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-stone-800/80"
              />
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-50 mb-4 text-balance">
              Chronology of the Mission
            </h2>
            <p className="font-body text-stone-400 leading-relaxed max-w-xl">
              Key events spanning the occupation—rendered as stamped markers in
              a clean record.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {TIMELINE.map((item, index) => (
              <TimelineCard
                key={`${item.date}-${item.event}`}
                item={item}
                index={index}
                total={TIMELINE.length}
                className={cn(
                  "w-full max-w-2xl",
                  index % 2 === 1 && "sm:ml-auto",
                )}
              />
            ))}
          </div>
        </Container>
      </div>

      {!prefersReducedMotion && (
        <div
          className="hidden lg:block relative"
          style={{
            minHeight: pinnedHeight ? undefined : "300vh",
            height: pinnedHeight ? `${pinnedHeight}px` : undefined,
          }}
        >
          <div className="sticky top-0 flex flex-col z-10 h-screen-safe">
            <Container className="pt-24 pb-10">
              <div className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-7">
                  <p className="font-body text-sm uppercase tracking-[0.28em] text-stone-400 mb-4 flex items-center gap-4">
                    <span className="crosshair-marker scale-75 opacity-60" />
                    <span>Chronology</span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-stone-800/80"
                    />
                  </p>
                  <h2 className="font-heading text-4xl xl:text-5xl font-semibold text-stone-50 mb-4 text-balance">
                    Chronology of the Mission
                  </h2>
                  <p className="font-body text-stone-400 leading-relaxed max-w-xl">
                    Vertical scroll drives a horizontal timeline—events
                    categorized, stamped, and pinned to time.
                  </p>
                </div>
                <div className="col-span-5 flex justify-end">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-stone-400">
                    <span className="crosshair-marker scale-75 opacity-60" />
                    Scroll to advance
                  </div>
                </div>
              </div>
            </Container>

            <div
              ref={viewportRef}
              className="relative flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-12 border-b border-stone-800/70 opacity-90"
                style={RULER_STYLE}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-12 border-t border-stone-800/70 opacity-90"
                style={RULER_STYLE}
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.45)]"
              />

              <motion.div
                ref={trackRef}
                style={{ x }}
                className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-8 px-[6vw] pr-[18vw]"
              >
                {TIMELINE.map((item, index) => (
                  <TimelineCard
                    key={`${item.date}-${item.event}`}
                    item={item}
                    index={index}
                    total={TIMELINE.length}
                    className="w-90 xl:w-105"
                  />
                ))}
              </motion.div>

              <div className="absolute left-0 right-0 bottom-16 px-[6vw]">
                <div className="relative h-0.5 w-full bg-stone-800 overflow-hidden">
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 bg-crimson-600 origin-left"
                    style={{ scaleX: progressClamped }}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="mt-3 h-px w-full opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(250,249,247,0.25) 1px, transparent 1px)",
                    backgroundSize: "24px 1px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
