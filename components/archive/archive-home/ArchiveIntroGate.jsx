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
        className="absolute inset-0 grid-overlay-dark opacity-24"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 scanline-overlay opacity-12"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/14 blur-[140px]"
      />

      <Container
        size="wide"
        className="relative z-10 flex min-h-[calc(100dvh-1.5rem)] items-center justify-center sm:min-h-[calc(100dvh-2rem)]"
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
          className="glass-panel mx-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-y-auto rounded-3xl border border-white/12 shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
        >
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex items-center gap-3">
                <span className="crosshair-marker scale-75 opacity-75" />
                <span className="truncate font-ui text-[10px] uppercase tracking-[0.34em] text-stone-300 sm:text-[11px]">
                  {archiveIntro.label}
                </span>
              </div>

              <button
                type="button"
                className="rounded-full border border-white/12 bg-white/6 px-4 py-2 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-200 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-crimson-500 sm:text-[11px]"
                onClick={() => markIntroComplete(setIsOpen)}
              >
                Skip
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:gap-5">
              <p className="font-ui text-[10px] uppercase tracking-[0.34em] text-accent sm:text-[11px]">
                Archive handshake
              </p>
              <h1 className="font-heading text-[clamp(2rem,8vw,4rem)] leading-[0.9] text-stone-50">
                {archiveIntro.title}
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base">
                {archiveIntro.subtitle}
              </p>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                  Live signal
                </p>
                <p className="mt-2 text-base font-semibold tracking-[-0.02em] text-stone-100 sm:text-lg">
                  {activeSignal}
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-accent via-crimson-300 to-white"
                    animate={{ width: progress }}
                    transition={{
                      duration: prefersReducedMotion
                        ? 0.12
                        : stepDuration / 1000,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
                  <span>
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(stepCount).padStart(2, "0")}
                  </span>
                  <span>{progress}</span>
                  <span>~ {estimatedDuration}s</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <p className="text-xs leading-relaxed text-stone-400 sm:text-sm">
                  {archiveIntro.note}
                </p>
                <button
                  type="button"
                  className={cn(
                    "rounded-full border px-4 py-2 font-ui text-[10px] uppercase tracking-[0.28em] transition-colors focus-visible:ring-2 focus-visible:ring-crimson-500 sm:text-[11px]",
                    soundEnabled
                      ? "border-accent bg-accent text-white"
                      : "border-white/12 bg-white/6 text-stone-200 hover:border-white/22 hover:bg-white/10 hover:text-white",
                  )}
                  onClick={() => setSoundEnabled((value) => !value)}
                >
                  {soundEnabled ? "Audio on" : "Audio off"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </motion.div>
  );
}
