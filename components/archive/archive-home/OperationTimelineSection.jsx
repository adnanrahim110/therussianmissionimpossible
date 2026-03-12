"use client";

import { Container } from "@/components/ui/Container";
import { timelinePhases } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

function PhaseRailItem({ phase, index, total, activeStep, itemRef }) {
  const isActive = index === activeStep;
  const isPassed = index < activeStep;

  return (
    <li ref={itemRef} className="relative pl-10">
      {index < total - 1 && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-3.25 top-7 -bottom-3.5 w-px",
            isPassed ? "bg-crimson-500/50" : "bg-stone-800",
          )}
        />
      )}

      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
          isActive
            ? "border-crimson-400 bg-crimson-600 text-white"
            : isPassed
              ? "border-stone-600 bg-stone-900 text-stone-200"
              : "border-stone-800 bg-stone-950 text-stone-500",
        )}
      >
        <span className="font-ui text-[8px] uppercase tracking-[0.22em]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <div
        className={cn(
          "rounded-[20px] border px-4 py-3 transition-colors",
          isActive
            ? "border-crimson-500/60 bg-stone-950/96 shadow-[0_18px_50px_rgba(220,38,38,0.12)]"
            : isPassed
              ? "border-stone-700/80 bg-stone-950/76"
              : "border-stone-800/80 bg-stone-950/58",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className={cn(
              "font-ui text-[10px] uppercase tracking-[0.3em]",
              isActive ? "text-crimson-300" : "text-stone-500",
            )}
          >
            {phase.code}
          </p>
          <span className="font-ui text-[9px] uppercase tracking-[0.28em] text-stone-600">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-2 font-heading text-[1.85rem] leading-none text-stone-50">
          {phase.title}
        </p>
        <p className="mt-2 overflow-hidden text-sm leading-relaxed text-stone-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {phase.summary}
        </p>
      </div>
    </li>
  );
}

function PhaseCard({ phase, index, total, activeStep, reducedMotion }) {
  const isActive = index === activeStep;

  return (
    <motion.article
      initial={false}
      animate={
        reducedMotion
          ? undefined
          : {
              scale: isActive ? 1 : 0.988,
              opacity: isActive ? 1 : 0.8,
              y: isActive ? 0 : 8,
            }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "archive-shell relative overflow-hidden rounded-[34px] border p-6 sm:p-8 xl:p-10",
        "min-h-136 lg:min-h-[calc(100dvh-var(--header-h)-72px)]",
        isActive ? "border-crimson-500/60" : "border-stone-800/85",
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-stone-950/96 via-stone-950/94 to-stone-900/82"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 scanline-overlay opacity-15"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute -right-14 top-6 h-52 w-52 rounded-full blur-[120px]",
          isActive ? "bg-crimson-600/16" : "bg-stone-600/8",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute right-5 top-3 font-heading text-[5.5rem] leading-none text-stone-800/45 sm:text-[7rem] xl:text-[8.5rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="crosshair-marker scale-75 opacity-80" />
            <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
              {phase.code}
            </span>
          </div>
          <span className="rounded-full border border-stone-700/80 bg-stone-950/70 px-3 py-1 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-300">
            Sequence {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] xl:gap-8">
          <div className="min-w-0">
            <h3 className="max-w-xl font-heading text-[clamp(3rem,5vw,4rem)] leading-[0.84] text-stone-50">
              {phase.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200 md:text-lg">
              {phase.summary}
            </p>

            <div className="mt-8 rounded-[28px] border border-stone-800/80 bg-stone-950/74 p-5">
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                Directive excerpt
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-200 md:text-base">
                {phase.excerpt}
              </p>
              <div className="mt-6 flex gap-2">
                <span className="redacted-line w-18" />
                <span className="redacted-line w-12" />
                <span className="redacted-line w-24" />
              </div>
            </div>
          </div>

          <div className="grid content-start gap-4">
            {phase.details.map((detail, detailIndex) => (
              <div
                key={detail}
                className="rounded-[22px] border border-stone-800/85 bg-stone-950/70 p-5"
              >
                <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                  Detail {String(detailIndex + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-stone-200">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MobilePhaseCard({ phase, index, total }) {
  return (
    <article className="archive-shell p-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-30"
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="crosshair-marker scale-75 opacity-80" />
            <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
              {phase.code}
            </span>
          </div>
          <span className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-6 font-heading text-5xl leading-[0.88] text-stone-50">
          {phase.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-stone-200">
          {phase.summary}
        </p>

        <div className="mt-6 rounded-3xl border border-stone-800 bg-stone-950/70 p-4">
          <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
            Directive excerpt
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-200">
            {phase.excerpt}
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          {phase.details.map((detail, detailIndex) => (
            <div
              key={detail}
              className="rounded-[18px] border border-stone-800 bg-stone-950/60 p-4"
            >
              <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                Detail {String(detailIndex + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-200">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function OperationTimelineSection() {
  const sectionRef = useRef(null);
  const phaseRefs = useRef([]);
  const phaseRailRef = useRef(null);
  const phaseRailItemRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dialSweep = useTransform(scrollYProgress, [0, 1], [24, 320]);
  const dialRotate = useTransform(scrollYProgress, [0, 1], [-18, 16]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["18%", "78%"]);
  const deckGlow = useMotionTemplate`radial-gradient(circle at ${glowX} 34%, rgba(220,38,38,0.22), transparent 40%)`;
  const dialFill = useMotionTemplate`conic-gradient(from 220deg, rgba(248,113,113,0.88) 0deg, rgba(220,38,38,0.82) ${dialSweep}deg, rgba(68,64,60,0.18) ${dialSweep}deg, rgba(12,10,9,0.92) 360deg)`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headerHeight =
      Number.parseInt(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--header-h"),
        10,
      ) || 80;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) return;

        const nextStep = Number.parseInt(
          visibleEntries[0].target.getAttribute("data-phase-index") ?? "0",
          10,
        );

        setActiveStep((currentStep) =>
          currentStep === nextStep ? currentStep : nextStep,
        );
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: `-${headerHeight + 16}px 0px -35% 0px`,
      },
    );

    phaseRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value <= 0.02) {
      setActiveStep(0);
      return;
    }

    if (value >= 0.98) {
      setActiveStep(timelinePhases.length - 1);
    }
  });

  useEffect(() => {
    const rail = phaseRailRef.current;
    const activeItem = phaseRailItemRefs.current[activeStep];

    if (!rail || !activeItem) return;

    const targetTop =
      activeItem.offsetTop - (rail.clientHeight - activeItem.offsetHeight) / 2;

    rail.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeStep, prefersReducedMotion]);

  const activePhase = timelinePhases[activeStep];

  return (
    <section
      id="the-operation"
      className="relative border-b border-stone-800 bg-stone-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 archive-map opacity-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grain-overlay opacity-75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-overlay-dark opacity-35"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: deckGlow }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 hidden h-80 w-80 -translate-x-1/2 rounded-full bg-crimson-700/12 blur-[140px] lg:block"
        style={prefersReducedMotion ? undefined : { rotate: dialRotate }}
      />

      <Container className="section-padding relative z-10">
        <div className="max-w-3xl lg:hidden">
          <div className="flex items-center gap-3">
            <span className="crosshair-marker scale-75 opacity-75" />
            <span className="font-ui text-[11px] uppercase tracking-[0.34em] text-stone-400">
              File 02
            </span>
          </div>
          <h2 className="mt-6 font-heading text-6xl leading-[0.84] text-stone-50">
            Operation Atlas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-300">
            The mission phases are presented as stacked dossier cards on smaller
            screens so the content stays readable and nothing clips.
          </p>
        </div>

        <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-10">
          <aside
            className="hidden lg:block"
            style={{
              position: "sticky",
              top: "calc(var(--header-h) + 16px)",
              maxHeight: "calc(100dvh - var(--header-h) - 32px)",
            }}
          >
            <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-4">
              <div className="rounded-[30px] border border-stone-800/80 bg-stone-950/82 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="crosshair-marker scale-75 opacity-75" />
                    <span className="font-ui text-[10px] uppercase tracking-[0.34em] text-stone-400">
                      File 02
                    </span>
                  </div>
                  <span className="rounded-full border border-stone-700/80 px-3 py-1 font-ui text-[9px] uppercase tracking-[0.28em] text-stone-300">
                    Atlas
                  </span>
                </div>

                <h2 className="mt-5 font-heading text-3xl leading-[0.86] text-stone-50">
                  Operation Atlas
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-300">
                  A compact command panel synced to the dossier card currently
                  in view.
                </p>

                <div className="mt-5 grid grid-cols-[70px_minmax(0,1fr)] gap-4">
                  <motion.div
                    className="flex h-17.5 w-17.5 items-center justify-center rounded-full p-px"
                    style={{
                      background: dialFill,
                      rotate: prefersReducedMotion ? undefined : dialRotate,
                    }}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-stone-800/80 bg-stone-950/95">
                      <span className="font-heading text-3xl leading-none text-stone-50">
                        {String(activeStep + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>

                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-ui text-[9px] uppercase tracking-[0.32em] text-stone-500">
                        Active file
                      </span>
                      <span className="font-ui text-[9px] uppercase tracking-[0.32em] text-crimson-300">
                        {activePhase.code}
                      </span>
                    </div>
                    <p className="mt-2 font-heading text-3xl leading-none text-stone-50">
                      {activePhase.title}
                    </p>
                    <div className="mt-4 h-px w-full bg-stone-800">
                      <motion.div
                        className="h-px bg-crimson-500"
                        style={{ width: progressLine }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={phaseRailRef}
                className="min-h-0 overflow-y-auto rounded-[30px] border border-stone-800/80 bg-stone-950/76 p-4 backdrop-blur-md scroll_none"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                    Mission phases
                  </span>
                  <span className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-300">
                    {String(activeStep + 1).padStart(2, "0")} /{" "}
                    {String(timelinePhases.length).padStart(2, "0")}
                  </span>
                </div>

                <ol className="mt-4 space-y-2.5">
                  {timelinePhases.map((phase, index) => (
                    <PhaseRailItem
                      key={phase.code}
                      phase={phase}
                      index={index}
                      total={timelinePhases.length}
                      activeStep={activeStep}
                      itemRef={(node) => {
                        phaseRailItemRefs.current[index] = node;
                      }}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </aside>

          <div ref={sectionRef} className="space-y-6 lg:space-y-8">
            {timelinePhases.map((phase, index) => (
              <div
                key={phase.code}
                data-phase-index={index}
                ref={(node) => {
                  phaseRefs.current[index] = node;
                }}
              >
                <PhaseCard
                  phase={phase}
                  index={index}
                  total={timelinePhases.length}
                  activeStep={activeStep}
                  reducedMotion={prefersReducedMotion}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:hidden">
          {timelinePhases.map((phase, index) => (
            <MobilePhaseCard
              key={`mobile-${phase.code}`}
              phase={phase}
              index={index}
              total={timelinePhases.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
