"use client";

import { CountUp } from "@/components/ui/CountUp";
import { STATS } from "@/lib/constants";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const STAT_SIZES = [
  "text-[clamp(3.5rem,6vw,6.5rem)]",
  "text-[clamp(3.25rem,5.6vw,6rem)]",
  "text-[clamp(3.4rem,5.8vw,6.2rem)]",
  "text-[clamp(3.25rem,5.6vw,6rem)]",
];

const TOTAL = STATS.length;

const SPROCKET_STYLE = {
  backgroundImage:
    "radial-gradient(circle at 18px 50%, rgba(250,249,247,0.18) 0 2px, transparent 2.8px)",
  backgroundSize: "44px 100%",
  backgroundRepeat: "repeat-x",
};

const RULER_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(to right, rgba(250,249,247,0.12) 0 1px, transparent 1px 22px)",
};

export function StatsBar() {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [maxX, setMaxX] = useState(0);
  const [pinnedHeight, setPinnedHeight] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const pinnedMinHeight = `${Math.max(2, TOTAL) * 120}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (v) => -v * maxX);

  useEffect(() => {
    if (!viewportRef.current || !trackRef.current) return;

    const compute = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const viewportHeight = viewportRef.current?.clientHeight ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const nextMaxX = Math.max(0, trackWidth - viewportWidth);
      setMaxX(nextMaxX);
      setPinnedHeight(Math.max(viewportHeight * 2, nextMaxX + viewportHeight));
    };

    compute();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => compute());
    ro.observe(viewportRef.current);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const progressSmooth = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.25,
  });

  const seconds = useTransform(scrollYProgress, (v) =>
    String(Math.floor(v * 59)).padStart(2, "0"),
  );
  const timecode = useMotionTemplate`00:${seconds}:00`;

  const indexLabel = useTransform(scrollYProgress, (v) => {
    if (TOTAL <= 1) return "01/01";
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.round(v * (TOTAL - 1))));
    return `${String(idx + 1).padStart(2, "0")}/${String(TOTAL).padStart(2, "0")}`;
  });

  const showPinned = !prefersReducedMotion;

  return (
    <section
      ref={containerRef}
      className="relative text-stone-50 border-b border-stone-800 -mt-1"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-stone-950 via-stone-950 to-stone-900" />
        <div className="absolute inset-0 grid-overlay-dark opacity-70" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        <div className="absolute left-[61.8%] top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/14 blur-[150px]" />
      </div>

      {showPinned && (
        <div
          className="hidden lg:block"
          style={{
            minHeight: pinnedHeight ? undefined : pinnedMinHeight,
            height: pinnedHeight ? `${pinnedHeight}px` : undefined,
          }}
        >
          <div
            className="sticky top-0 h-dvh overflow-hidden"
            style={{ height: "100dvh" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-12 border-b border-stone-800/70 opacity-90"
              style={SPROCKET_STYLE}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-12 border-t border-stone-800/70 opacity-90"
              style={SPROCKET_STYLE}
            />

            <div className="absolute top-24 left-8 right-8 flex items-center justify-between gap-8 pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="crosshair-marker scale-75 opacity-70" />
                <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-300">
                  Key Figures
                </span>
              </div>
              <div className="flex items-center gap-4 font-body text-[11px] uppercase tracking-[0.32em] text-stone-500 tabular-nums">
                <motion.span>{indexLabel}</motion.span>
                <span className="text-stone-700">/</span>
                <motion.span>{timecode}</motion.span>
              </div>
            </div>

            <div className="absolute bottom-14 left-0 right-0 px-10">
              <div
                aria-hidden="true"
                className="h-2.5"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(250,249,247,0.10) 0 1px, transparent 1px 22px)",
                  opacity: 0.25,
                }}
              />
              <div className="h-px w-full bg-stone-800/80" />
              <motion.div
                aria-hidden="true"
                className="h-0.5 bg-crimson-600 origin-left"
                style={
                  prefersReducedMotion
                    ? { scaleX: 1 }
                    : { scaleX: progressSmooth }
                }
              />
            </div>

            <div
              ref={viewportRef}
              className="relative h-full flex items-center overflow-hidden"
            >
              <motion.div
                ref={trackRef}
                className="flex will-change-transform"
                style={{ x }}
              >
                {STATS.map((stat, i) => (
                  <StatSlide
                    key={stat.label}
                    stat={stat}
                    index={i}
                    progress={scrollYProgress}
                    sizeClass={STAT_SIZES[i] || STAT_SIZES[1]}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${showPinned ? "lg:hidden" : ""} relative z-10 py-16 md:py-24`}
      >
        <div className="container-default">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <span className="crosshair-marker scale-75 opacity-70" />
              <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-300">
                Key Figures
              </span>
            </div>
            <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Scroll dossier
            </span>
          </div>

          <div className="mt-10 space-y-10">
            {STATS.map((stat, i) => (
              <MobileStatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatSlide({ stat, index, progress, sizeClass }) {
  const mid = TOTAL <= 1 ? 0 : index / (TOTAL - 1);
  const focus = useTransform(progress, (v) => {
    if (TOTAL <= 1) return 1;
    const segment = 1 / (TOTAL - 1);
    const dist = Math.abs(v - mid);
    return 1 - Math.min(1, dist / (segment * 0.55));
  });

  const focusSpring = useSpring(focus, {
    stiffness: 180,
    damping: 30,
    mass: 0.25,
  });
  const frameOpacity = useTransform(focusSpring, [0, 1], [0.6, 1]);
  const frameScale = useTransform(focusSpring, [0, 1], [0.975, 1]);
  const frameY = useTransform(focusSpring, [0, 1], [18, 0]);
  const lineScale = useTransform(focusSpring, [0, 1], [0.18, 1]);
  const accentOpacity = useTransform(focusSpring, [0, 1], [0.12, 1]);

  const flip = index % 2 === 1;
  const code = `OS-${String(index + 1).padStart(2, "0")}`;
  const unit = stat.suffix?.trim() ? stat.suffix.trim() : "count";
  const series = `${String(index + 1).padStart(2, "0")}/${String(TOTAL).padStart(2, "0")}`;

  return (
    <motion.div
      className="w-screen shrink-0 px-8"
      style={{ opacity: frameOpacity }}
    >
      <div className="container-default">
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            className={`relative overflow-hidden rounded-[2px] border border-stone-800/90 bg-stone-950/55 shadow-[0_45px_140px_rgba(0,0,0,0.55)] lg:flex ${flip ? "lg:flex-row-reverse" : ""}`}
          >
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-br from-stone-950 via-stone-950 to-stone-900 opacity-70" />
              <div className="absolute inset-0 grid-overlay-dark opacity-60" />
              <div className="absolute inset-0 grain-overlay pointer-events-none" />
              <motion.div
                aria-hidden="true"
                className="absolute left-[61.8%] top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/18 blur-[150px]"
                style={{ opacity: accentOpacity }}
              />
            </div>

            <div
              className={`relative shrink-0 border-b border-stone-800/80 lg:w-42 lg:border-b-0 ${flip ? "lg:border-l" : "lg:border-r"}`}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-10 border-b border-stone-800/70 opacity-80"
                style={SPROCKET_STYLE}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-10 border-t border-stone-800/70 opacity-80"
                style={SPROCKET_STYLE}
              />

              <motion.div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-px bg-crimson-600 origin-top"
                style={{ scaleY: lineScale, opacity: accentOpacity }}
              />

              <div className="relative flex h-full items-start justify-between gap-10 p-6 lg:flex-col">
                <div className="flex items-center gap-3">
                  <span className="crosshair-marker scale-75 opacity-70" />
                  <span className="font-body text-[10px] uppercase tracking-[0.34em] text-stone-500">
                    Archive
                  </span>
                </div>

                <div className="flex flex-col items-end gap-2 lg:items-start">
                  <div className="font-heading text-4xl font-black leading-none tabular-nums text-stone-50">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="font-body text-[10px] uppercase tracking-[0.34em] text-stone-600 tabular-nums">
                    {series}
                  </div>
                </div>

                <div className="space-y-2 text-right lg:text-left">
                  <div className="font-body text-[10px] uppercase tracking-[0.34em] text-stone-600 tabular-nums">
                    {code}
                  </div>
                  <div className="font-body text-[10px] uppercase tracking-[0.34em] text-stone-500 tabular-nums">
                    {unit}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex-1 p-8 md:p-10">
              <div className="flex items-start justify-between gap-12">
                <div>
                  <div className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-400">
                    Marker
                  </div>
                  <h3 className="mt-3 font-heading text-[clamp(1.7rem,2.6vw,2.6rem)] font-semibold leading-[1.05] text-stone-50 text-balance">
                    {stat.label}
                  </h3>
                </div>

                <motion.div
                  style={{ opacity: accentOpacity }}
                  className="shrink-0"
                >
                  <div className="inline-flex items-center gap-3 rounded-[2px] border border-stone-800/80 bg-stone-950/35 px-3 py-2">
                    <span className="font-body text-[10px] uppercase tracking-[0.32em] text-stone-500">
                      Unit
                    </span>
                    <span className="h-3 w-px bg-stone-800/80" />
                    <span className="font-body text-[10px] uppercase tracking-[0.32em] text-stone-300 tabular-nums">
                      {unit}
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix?.trim?.() ?? ""}
                  className={`${sizeClass} leading-none text-stone-50`}
                />

                <div className="mt-6 h-px bg-stone-800/80" />
                <motion.div
                  aria-hidden="true"
                  className="mt-2 h-0.5 bg-crimson-600 origin-left"
                  style={{ scaleX: lineScale, opacity: accentOpacity }}
                />
                <motion.div
                  aria-hidden="true"
                  className="mt-3 h-2.5 origin-left opacity-25"
                  style={{ ...RULER_STYLE, scaleX: lineScale }}
                />
              </div>

              <div className="mt-8 flex items-end justify-between gap-12">
                <p className="max-w-xl font-body text-sm text-stone-400 leading-relaxed">
                  Scrub to advance the record. Each frame locks to the viewport
                  while the film advances horizontally.
                </p>
                <div className="hidden md:block font-body text-[10px] uppercase tracking-[0.34em] text-stone-600 tabular-nums">
                  {code} / {series}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileStatCard({ stat, index }) {
  const flip = index % 2 === 1;
  const code = `OS-${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)", y: 24 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        clipPath: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        y: { type: "spring", stiffness: 160, damping: 24, mass: 0.7 },
        delay: index * 0.05,
      }}
      className={`relative max-w-xl ${flip ? "ml-auto" : ""} rounded-[2px] border border-stone-800 bg-stone-950/55 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.35)]`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-px bg-crimson-600/80"
      />

      <div className="relative p-6">
        <div className="flex items-center justify-between gap-8">
          <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500 tabular-nums">
            {code}
          </span>
          <span className="crosshair-marker scale-75 opacity-70" />
        </div>

        <CountUp
          end={stat.value}
          suffix={stat.suffix.trim()}
          className="mt-6 text-5xl md:text-6xl leading-none text-stone-50"
        />

        <div className="mt-4 h-px bg-stone-800/80" />

        <p className="mt-4 font-body text-xs uppercase tracking-[0.22em] text-stone-400">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}
