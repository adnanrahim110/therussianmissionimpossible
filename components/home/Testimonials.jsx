"use client";

import { Container } from "@/components/ui/Container";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { TESTIMONIALS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

function SprocketStrip({ position = "top", className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute left-0 right-0 h-8 opacity-55",
        position === "top"
          ? "top-0 border-b border-stone-800/70"
          : "bottom-0 border-t border-stone-800/70",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle at 18px 50%, rgba(250,249,247,0.18) 0 2px, transparent 2.8px)",
        backgroundSize: "44px 100%",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

function wrapIndex(index, total) {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

function formatIndex(index, total) {
  return `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
}

function formatTimecode(index, total) {
  if (total <= 1) return "00:00:00";
  const seconds = Math.floor((index / (total - 1)) * 59);
  return `00:${String(seconds).padStart(2, "0")}:00`;
}

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = TESTIMONIALS.length;

  const select = useCallback(
    (next) => {
      if (total <= 1) return;
      const nextIndex = wrapIndex(next, total);
      if (nextIndex === activeIndex) return;
      setDirection(next > activeIndex ? 1 : -1);
      setActiveIndex(nextIndex);
    },
    [activeIndex, total],
  );

  const controls = useMemo(
    () => ({
      indexLabel: formatIndex(activeIndex, total),
      timecode: formatTimecode(activeIndex, total),
    }),
    [activeIndex, total],
  );

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0.001,
      y: 22,
      rotateY: dir > 0 ? 10 : -10,
      clipPath: dir > 0 ? "inset(0 0 0 12%)" : "inset(0 12% 0 0)",
      transformPerspective: 1200,
    }),
    center: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      clipPath: "inset(0 0 0 0)",
      transformPerspective: 1200,
    },
    exit: (dir) => ({
      opacity: 0.001,
      y: -18,
      rotateY: dir > 0 ? -8 : 8,
      clipPath: dir > 0 ? "inset(0 12% 0 0)" : "inset(0 0 0 12%)",
      transformPerspective: 1200,
    }),
  };

  return (
    <section
      id="praise"
      className="relative overflow-hidden bg-stone-950 text-stone-50 border-y border-stone-800"
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
        className="absolute left-[61.8%] top-1/3 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/14 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-12 top-10 select-none pointer-events-none"
      >
        <div className="font-heading font-black leading-none text-stone-900/35 text-[14vw]">
          PRAISE
        </div>
      </div>

      <div className="section-padding relative z-10">
        <Container>
          <div className="mb-16">
            <span
              aria-hidden="true"
              className="absolute -top-10 left-0 font-heading font-black text-[120px] leading-none text-stone-900/45 select-none pointer-events-none"
            >
              03
            </span>

            <p className="relative z-10 font-body text-sm uppercase tracking-[0.28em] text-stone-400 mb-4">
              Critical Acclaim
            </p>
            <h2 className="relative z-10 font-heading text-4xl md:text-5xl font-black text-stone-50 text-balance">
              Voices From the Edge
            </h2>
            <p className="relative z-10 mt-4 font-body text-stone-400 leading-relaxed">
              Early praise for the documentary account of the pipeline siege.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-4 relative">
              <div className="rounded-[2px] border border-stone-800 bg-stone-950/55 overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                      <span className="crosshair-marker scale-75 opacity-70" />
                      <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-300">
                        Reel Control
                      </span>
                    </div>
                    <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500 tabular-nums">
                      {controls.indexLabel}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-8">
                    <span className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500 tabular-nums">
                      {controls.timecode}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => select(activeIndex - 1)}
                        aria-label="Previous testimonial"
                        className="group inline-flex items-center justify-center h-10 w-10 rounded-[2px] border border-stone-800 bg-stone-950/40 hover:bg-stone-900 transition-colors"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-stone-300 group-hover:text-stone-50 transition-colors"
                        >
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => select(activeIndex + 1)}
                        aria-label="Next testimonial"
                        className="group inline-flex items-center justify-center h-10 w-10 rounded-[2px] border border-stone-800 bg-stone-950/40 hover:bg-stone-900 transition-colors"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-stone-300 group-hover:text-stone-50 transition-colors"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 h-px bg-stone-800/80" />

                  <div className="mt-6 space-y-3">
                    {TESTIMONIALS.map((t, i) => {
                      const isActive = i === activeIndex;
                      return (
                        <button
                          key={`${t.author}-${t.role}`}
                          type="button"
                          onClick={() => select(i)}
                          className={cn(
                            "group relative w-full overflow-hidden rounded-[2px] border text-left transition-colors",
                            isActive
                              ? "border-stone-700 bg-stone-950/70"
                              : "border-stone-800 bg-stone-950/30 hover:bg-stone-950/55",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-y-0 left-0 w-px bg-crimson-600 transition-opacity",
                              isActive
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-40",
                            )}
                          />
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-0 bg-crimson-600/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              isActive
                                ? "translate-x-0"
                                : "-translate-x-full group-hover:translate-x-0",
                            )}
                          />

                          <div className="relative p-4">
                            <div className="flex items-start justify-between gap-6">
                              <div>
                                <div className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-300">
                                  {t.author}
                                </div>
                                <div className="mt-1 font-body text-[11px] uppercase tracking-[0.28em] text-stone-500">
                                  {t.role}
                                </div>
                              </div>
                              <div
                                className={cn(
                                  "font-body text-[11px] uppercase tracking-[0.32em] tabular-nums transition-colors",
                                  isActive
                                    ? "text-crimson-400"
                                    : "text-stone-600 group-hover:text-stone-500",
                                )}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="relative rounded-[2px] border border-stone-800 bg-stone-950/45 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                <SprocketStrip position="top" />
                <SprocketStrip position="bottom" />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid-overlay-dark opacity-35"
                />

                <AnimatePresence initial={false}>
                  {!prefersReducedMotion && (
                    <motion.div
                      key={`scan-${activeIndex}`}
                      aria-hidden="true"
                      initial={{ x: "-120%", opacity: 0 }}
                      animate={{ x: "120%", opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/20 to-transparent mix-blend-overlay pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div className="relative px-6 md:px-5 py-14 md:pt-13.5 md:pb-16">
                  <div className="absolute inset-6 md:inset-y-10 md:inset-x-2 rounded-[2px] border border-stone-800/70 pointer-events-none" />

                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                  >
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={
                        prefersReducedMotion ? undefined : slideVariants
                      }
                      initial={prefersReducedMotion ? false : "enter"}
                      animate="center"
                      exit="exit"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              opacity: { duration: 0.12 },
                              clipPath: {
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                              },
                              y: {
                                type: "spring",
                                stiffness: 160,
                                damping: 24,
                                mass: 0.8,
                              },
                              rotateY: {
                                type: "spring",
                                stiffness: 140,
                                damping: 22,
                                mass: 0.9,
                              },
                            }
                      }
                      drag={prefersReducedMotion ? false : "x"}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragEnd={(_, info) => {
                        if (prefersReducedMotion) return;
                        if (info.offset.x < -80) select(activeIndex + 1);
                        if (info.offset.x > 80) select(activeIndex - 1);
                      }}
                      className="touch-pan-y"
                    >
                      <TestimonialCard
                        quote={TESTIMONIALS[activeIndex]?.quote}
                        author={TESTIMONIALS[activeIndex]?.author}
                        role={TESTIMONIALS[activeIndex]?.role}
                        className="shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-10 flex items-center justify-between gap-10 text-[11px] uppercase tracking-[0.32em] text-stone-500">
                    <span className="flex items-center gap-3">
                      <span className="crosshair-marker scale-75 opacity-60" />
                      Screening notes
                    </span>
                    <span className="tabular-nums">{controls.timecode}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
