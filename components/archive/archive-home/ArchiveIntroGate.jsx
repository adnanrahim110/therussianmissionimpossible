"use client";

import { Container } from "@/components/ui/Container";
import { CursorGlowField } from "@/components/ui/CursorGlowField";
import { archiveIntro } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STEP_DURATION_MS = 720;
const STEP_DURATION_REDUCED_MS = 220;
const FINAL_HOLD_MS = 1450;
const FINAL_HOLD_REDUCED_MS = 900;

function markIntroComplete(setIsOpen) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("archive-intro-complete", "true");
  }
  setIsOpen(false);
}

export function ArchiveIntroGate() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  const stepCount = archiveIntro.sequence.length;
  const stepDuration = prefersReducedMotion
    ? STEP_DURATION_REDUCED_MS
    : STEP_DURATION_MS;
  const finalHold = prefersReducedMotion
    ? FINAL_HOLD_REDUCED_MS
    : FINAL_HOLD_MS;
  const progress = `${Math.round(((index + 1) / stepCount) * 100)}%`;
  const estimatedDuration = (
    ((stepCount - 1) * stepDuration + finalHold) /
    1000
  ).toFixed(1);
  const activeSignal = archiveIntro.sequence[index] ?? archiveIntro.sequence[0];

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem("archive-intro-complete") === "true") {
      setIsOpen(false);
      return;
    }

    if (!prefersReducedMotion) return;

    setIndex(stepCount - 1);
    const timer = window.setTimeout(() => {
      markIntroComplete(setIsOpen);
    }, finalHold);

    return () => window.clearTimeout(timer);
  }, [finalHold, prefersReducedMotion, stepCount]);

  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return undefined;

    const timer =
      index < stepCount - 1
        ? window.setTimeout(() => {
            setIndex((value) => Math.min(value + 1, stepCount - 1));
          }, stepDuration)
        : window.setTimeout(() => {
            markIntroComplete(setIsOpen);
          }, finalHold);

    return () => window.clearTimeout(timer);
  }, [finalHold, index, isOpen, prefersReducedMotion, stepCount, stepDuration]);

  useEffect(() => {
    if (!isOpen || !soundEnabled || typeof window === "undefined") return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioRef.current) {
      audioRef.current = new AudioContextClass();
    }

    const context = audioRef.current;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = index === stepCount - 1 ? "triangle" : "sine";
    oscillator.frequency.value = 320 + index * 64;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.022, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.22);

    return () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }, [index, isOpen, soundEnabled, stepCount]);

  useEffect(
    () => () => {
      const context = audioRef.current;
      if (!context) return;
      if (typeof context.close === "function" && context.state !== "closed") {
        context.close().catch(() => {});
      }
    },
    [],
  );

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.18 : 0.32 }}
      className="section-tone-obsidian fixed inset-0 z-60 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-4"
    >
      <CursorGlowField
        className="opacity-90"
        size={620}
        color="rgba(203, 47, 67, 0.18)"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 scanline-overlay opacity-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black via-black/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute left-[10%] top-[12%] h-48 w-48 rounded-full bg-white/6 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[14%] h-64 w-64 rounded-full bg-accent/14 blur-[140px]"
      />

      <Container
        size="wide"
        className="relative z-10 flex min-h-[calc(100dvh-1.5rem)] items-center sm:min-h-[calc(100dvh-2rem)]"
      >
        <motion.div
          initial={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, y: 20, scale: 0.985 }
          }
          animate={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] border border-white/12 shadow-[0_30px_120px_rgba(0,0,0,0.42)]"
        >
          <div className="border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="crosshair-marker scale-75 opacity-75" />
                  <span className="font-ui text-[10px] uppercase tracking-[0.34em] text-stone-300 sm:text-[11px]">
                    {archiveIntro.label}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-400 sm:text-base">
                  {activeSignal}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-white/10 bg-white/6 px-3 py-2 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-200">
                  Sequence {String(index + 1).padStart(2, "0")} /{" "}
                  {String(stepCount).padStart(2, "0")}
                </div>
                <div className="rounded-full border border-white/10 bg-black/18 px-3 py-2 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
                  ~ {estimatedDuration}s
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-200 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-crimson-500 sm:text-[11px]"
                  onClick={() => markIntroComplete(setIsOpen)}
                >
                  Skip intro
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-accent via-crimson-300 to-white"
                  animate={{ width: progress }}
                  transition={{
                    duration: prefersReducedMotion ? 0.12 : stepDuration / 1000,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                <span>Authentication sequence</span>
                <span>{progress} synchronized</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.18fr)] lg:gap-10 lg:px-8 lg:py-8">
            <div className="order-2 space-y-4 lg:order-1">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-3xl border border-white/10 bg-black/18 p-4 sm:p-5">
                  <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                    Current relay
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-stone-50 sm:text-xl">
                    {activeSignal}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/18 p-4 sm:p-5">
                  <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                    Archive note
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">
                    {archiveIntro.note}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-stone-950/70 p-3 sm:p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {archiveIntro.sequence.map((line, lineIndex) => {
                    const isPast = lineIndex < index;
                    const isActive = lineIndex === index;

                    return (
                      <motion.div
                        key={line}
                        initial={false}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                opacity: isActive || isPast ? 1 : 0.55,
                                y: isActive ? 0 : 2,
                              }
                        }
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className={cn(
                          "rounded-2xl border px-3 py-3 sm:px-4",
                          isActive
                            ? "border-accent/40 bg-accent/12 shadow-[0_18px_45px_rgba(242,13,13,0.18)]"
                            : isPast
                              ? "border-white/10 bg-white/4"
                              : "border-white/6 bg-black/10",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={cn(
                              "font-ui text-[10px] uppercase tracking-[0.28em]",
                              isActive
                                ? "text-stone-50"
                                : isPast
                                  ? "text-stone-300"
                                  : "text-stone-600",
                            )}
                          >
                            {line}
                          </span>
                          <span
                            className={cn(
                              "font-ui text-[10px] uppercase tracking-[0.28em]",
                              isActive
                                ? "text-accent"
                                : isPast
                                  ? "text-stone-400"
                                  : "text-stone-600",
                            )}
                          >
                            {String(lineIndex + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="order-1 flex flex-col justify-between gap-8 lg:order-2">
              <div className="max-w-3xl">
                <p className="font-ui text-[10px] uppercase tracking-[0.34em] text-accent sm:text-[11px]">
                  A documentary narrative
                </p>
                <h1 className="mt-4 font-heading text-[clamp(2.5rem,6vw,5.75rem)] leading-[0.86] text-stone-50">
                  {archiveIntro.title}
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base md:text-lg">
                  {archiveIntro.subtitle}
                </p>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div className="rounded-3xl border border-white/10 bg-black/16 p-4 sm:p-5">
                  <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                    System state
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300 sm:text-base">
                    The gate remains open long enough for the relay sequence to
                    complete before handing off to the archive.
                  </p>
                </div>

                <button
                  type="button"
                  className={cn(
                    "min-w-40 rounded-full border px-4 py-3 font-ui text-[10px] uppercase tracking-[0.28em] transition-colors focus-visible:ring-2 focus-visible:ring-crimson-500 sm:text-[11px]",
                    soundEnabled
                      ? "border-accent bg-accent text-white"
                      : "border-white/12 bg-white/6 text-stone-200 hover:border-white/22 hover:bg-white/10 hover:text-white",
                  )}
                  onClick={() => setSoundEnabled((value) => !value)}
                >
                  {soundEnabled ? "Audio enabled" : "Enable audio"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </motion.div>
  );
}
