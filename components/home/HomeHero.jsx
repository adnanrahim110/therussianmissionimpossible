"use client";

import { Button } from "@/components/ui/Button";
import { useTilt3D } from "@/hooks/useTilt3D";
import { CTA_LINKS, STATS } from "@/lib/constants";
import { BOOK } from "@/lib/content";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMemo, useRef } from "react";

function FilmEdge() {
  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute left-0 top-0 bottom-0 w-12 bg-stone-950 border-r border-stone-800/80"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 16px, rgba(250,249,247,0.16) 0 2px, transparent 2.5px)",
          backgroundSize: "100% 28px",
          backgroundRepeat: "repeat-y",
        }}
      />
      <div className="absolute left-1/2 top-24 -translate-x-1/2 h-40 w-px bg-stone-800/80" />
      <div className="absolute left-1/2 bottom-24 -translate-x-1/2 h-40 w-px bg-stone-800/80" />
    </div>
  );
}

function LogRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <span className="font-body text-[11px] uppercase tracking-[0.28em] text-stone-400">
        {label}
      </span>
      <span className="font-heading text-lg md:text-xl font-semibold text-stone-50">
        {value}
      </span>
    </div>
  );
}

function MissionLog({ progress, prefersReducedMotion }) {
  const { ref, style, handlers } = useTilt3D({
    maxTilt: 8,
    scale: 1.01,
  });
  const fill = useTransform(progress, [0, 1], [0.05, 1]);
  const fillSpring = useSpring(fill, {
    stiffness: 160,
    damping: 28,
    mass: 0.25,
  });
  const fillStyle = prefersReducedMotion
    ? { scaleX: 1 }
    : { scaleX: fillSpring };

  const seconds = useTransform(progress, (v) =>
    String(Math.floor(v * 59)).padStart(2, "0"),
  );
  const timecode = useMotionTemplate`00:${seconds}:00`;

  return (
    <div className="perspective-container">
      <motion.div
        ref={ref}
        style={style}
        {...handlers}
        className="relative rounded-[2px] border border-stone-800 bg-stone-950/70 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.35)] will-change-transform"
      >
        <div className="absolute inset-0 grid-overlay-dark opacity-60" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-crimson-900/20 blur-[120px]" />

        <div className="relative p-6 md:p-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="crosshair-marker scale-75 opacity-80" />
              <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-300">
                Mission Log
              </span>
            </div>
            <motion.span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500">
              {timecode}
            </motion.span>
          </div>

          <div className="mt-6 h-0.5 w-full bg-stone-800 overflow-hidden">
            <motion.div
              aria-hidden="true"
              className="h-full bg-crimson-600 origin-left"
              style={fillStyle}
            />
          </div>

          <div className="mt-8 space-y-6">
            <LogRow
              label="Duration"
              value={`${STATS[2].value}${STATS[2].suffix}`}
            />
            <LogRow
              label="Traversal"
              value={`${STATS[1].value}${STATS[1].suffix}`}
            />
            <LogRow label="Chapters" value={`${STATS[3].value}`} />
          </div>

          <div className="mt-8 flex items-center justify-between gap-6 text-[11px] uppercase tracking-[0.32em] text-stone-500">
            <span className="flex items-center gap-3">
              <span className="crosshair-marker scale-75 opacity-60" />
              {BOOK.publisher}
            </span>
            <span>{BOOK.year}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HomeHero() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });

  const bgOpacity = useTransform(progress, [0, 0.9], [1, 0]);
  const mastheadY = useTransform(progress, [0, 1], ["0%", "-18%"]);

  const { titleA, titleB, version } = useMemo(() => {
    const parts = BOOK.title.split(" ").filter(Boolean);
    const maybeVersion = parts.at(-1) === "3.0" ? parts.pop() : null;
    return {
      titleA: parts[0] || "Operation",
      titleB: parts.slice(1).join(" ") || "Stream",
      version: maybeVersion || "3.0",
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen-safe flex items-stretch overflow-hidden bg-stone-950 pt-20 border-b border-stone-800 md:pl-12"
    >
      <FilmEdge />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={prefersReducedMotion ? {} : { opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-stone-950 via-stone-900 to-stone-950" />
        <div className="absolute inset-0 grid-overlay-dark opacity-70" />
        <div className="absolute left-[61.8%] top-1/3 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/18 blur-[150px] opacity-80" />
      </motion.div>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div
        aria-hidden="true"
        className="hidden lg:block absolute -left-8 top-28 select-none pointer-events-none"
      >
        <div className="font-heading font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(250,249,247,0.08)] text-[18vw]">
          OPERATION
        </div>
      </div>

      <div className="container-default relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end w-full pb-16 md:pb-20">
        <motion.div
          className="lg:col-span-7 pt-16 md:pt-24"
          style={prefersReducedMotion ? {} : { y: mastheadY }}
        >
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-[2px] border border-stone-800 bg-stone-950/60 backdrop-blur text-stone-300">
            <span className="crosshair-marker scale-75 opacity-70" />
            <span className="font-body text-[11px] uppercase tracking-[0.32em]">
              {BOOK.genre}
            </span>
          </div>

          <h1 className="mt-8 font-heading font-black tracking-tight leading-[0.82]">
            <motion.span
              className="block text-stone-50"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      clipPath: "inset(0 100% 0 0)",
                      y: 18,
                      rotateX: -12,
                      transformPerspective: 1000,
                    }
              }
              animate={{
                clipPath: "inset(0 0% 0 0)",
                y: 0,
                rotateX: 0,
                transformPerspective: 1000,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      clipPath: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                      y: {
                        type: "spring",
                        stiffness: 160,
                        damping: 22,
                        mass: 0.7,
                      },
                      rotateX: {
                        type: "spring",
                        stiffness: 140,
                        damping: 20,
                        mass: 0.8,
                      },
                    }
              }
            >
              <span className="text-[clamp(3.5rem,6vw,7.5rem)]">{titleA}</span>
            </motion.span>

            <motion.span
              className="block -mt-4 md:-mt-6 text-transparent [-webkit-text-stroke:1px_rgba(250,249,247,0.35)]"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      clipPath: "inset(0 100% 0 0)",
                      y: 22,
                      rotateX: -12,
                      transformPerspective: 1000,
                    }
              }
              animate={{
                clipPath: "inset(0 0% 0 0)",
                y: 0,
                rotateX: 0,
                transformPerspective: 1000,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      delay: 0.06,
                      clipPath: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
                      y: {
                        type: "spring",
                        stiffness: 150,
                        damping: 22,
                        mass: 0.75,
                      },
                      rotateX: {
                        type: "spring",
                        stiffness: 130,
                        damping: 20,
                        mass: 0.85,
                      },
                    }
              }
            >
              <span className="text-[clamp(4rem,7vw,8.5rem)]">{titleB}</span>
              <span className="inline-block align-top ml-3 md:ml-4 -translate-y-6 md:-translate-y-10 text-crimson-500 text-xl md:text-2xl [-webkit-text-stroke:0px]">
                {version}
              </span>
            </motion.span>
          </h1>

          <p className="mt-8 font-body text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            {BOOK.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" href={CTA_LINKS.preorder.href}>
              {CTA_LINKS.preorder.label}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/book"
              className="border-stone-600 text-stone-200 hover:bg-stone-800 hover:text-stone-50"
            >
              Read the Story
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-stone-500">
            <span className="crosshair-marker scale-75 opacity-60" />
            Documentary war prose
            <span className="text-crimson-600">/</span>
            Non-fiction
          </div>
        </motion.div>

        <div className="lg:col-span-5 lg:pb-10">
          <MissionLog
            progress={progress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 right-8 hidden md:flex items-center gap-4 text-stone-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { delay: 0.9, duration: 0.6 }
        }
      >
        <span className="font-body text-[10px] uppercase tracking-[0.32em]">
          Scroll
        </span>
        <div className="h-px w-20 bg-linear-to-r from-crimson-600/70 to-transparent" />
      </motion.div>
    </section>
  );
}
