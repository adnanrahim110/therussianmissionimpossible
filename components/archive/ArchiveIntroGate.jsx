"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CursorGlowField } from "@/components/ui/CursorGlowField";
import { archiveIntro } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INTRO_SESSION_KEY = "archive-intro-complete-v3";
const INITIAL_HOLD_MS = 2400;
const INITIAL_HOLD_REDUCED_MS = 1600;
const STEP_DURATION_MS = 1800;
const STEP_DURATION_REDUCED_MS = 1200;
const READY_HOLD_MS = 4200;
const READY_HOLD_REDUCED_MS = 2800;
const AUTO_EXIT_MS = 9000;
const AUTO_EXIT_REDUCED_MS = 6000;
const EXIT_DURATION_MS = 920;
const EXIT_DURATION_REDUCED_MS = 560;

function persistIntroComplete() {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  }
}

function triggerClose(setIsClosing) {
  persistIntroComplete();
  setIsClosing(true);
}

export function ArchiveIntroGate() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [index, setIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  const stepCount = archiveIntro.sequence.length;
  const initialHold = prefersReducedMotion
    ? INITIAL_HOLD_REDUCED_MS
    : INITIAL_HOLD_MS;
  const stepDuration = prefersReducedMotion
    ? STEP_DURATION_REDUCED_MS
    : STEP_DURATION_MS;
  const readyHold = prefersReducedMotion
    ? READY_HOLD_REDUCED_MS
    : READY_HOLD_MS;
  const autoExitDelay = prefersReducedMotion
    ? AUTO_EXIT_REDUCED_MS
    : AUTO_EXIT_MS;
  const exitDuration = prefersReducedMotion
    ? EXIT_DURATION_REDUCED_MS
    : EXIT_DURATION_MS;

  const progressValue = Math.round(((index + 1) / stepCount) * 100);
  const progress = `${progressValue}%`;
  const activeSignal = archiveIntro.sequence[index] ?? archiveIntro.sequence[0];

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen || isClosing || isReadyToEnter) return undefined;

    const duration =
      index === 0
        ? initialHold
        : index < stepCount - 1
          ? stepDuration
          : readyHold;

    const timer = window.setTimeout(() => {
      if (index < stepCount - 1) {
        setIndex((value) => Math.min(value + 1, stepCount - 1));
        return;
      }

      setIsReadyToEnter(true);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [
    index,
    initialHold,
    isClosing,
    isOpen,
    isReadyToEnter,
    readyHold,
    stepCount,
    stepDuration,
  ]);

  useEffect(() => {
    if (!isReadyToEnter || isClosing) return undefined;

    const timer = window.setTimeout(() => {
      triggerClose(setIsClosing);
    }, autoExitDelay);

    return () => window.clearTimeout(timer);
  }, [autoExitDelay, isClosing, isReadyToEnter]);

  useEffect(() => {
    if (!isClosing) return undefined;

    const timer = window.setTimeout(() => {
      setIsOpen(false);
    }, exitDuration);

    return () => window.clearTimeout(timer);
  }, [exitDuration, isClosing]);

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
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: (isClosing ? exitDuration : prefersReducedMotion ? 220 : 360) / 1000 }}
      className="fixed inset-0 z-[70] overflow-hidden px-3 py-3 sm:px-4 sm:py-4"
    >
      <div className="pointer-events-none absolute inset-0 archive-page-glow" />
      <div className="pointer-events-none absolute inset-0 archive-grid-overlay opacity-55" />
      <div className="pointer-events-none absolute inset-0 scanline-overlay opacity-10" />
      <CursorGlowField
        className="opacity-75"
        size={740}
        color="rgba(242, 13, 13, 0.12)"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[14%] top-[10%] h-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(228,238,244,0.12),transparent_72%)] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-52 w-[min(80vw,54rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(242,13,13,0.11),transparent_72%)] blur-[150px]"
      />

      <Container
        size="wide"
        className="relative z-10 flex h-full items-center justify-center"
      >
        <motion.section
          initial={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, y: 18, scale: 0.988 }
          }
          animate={
            prefersReducedMotion
              ? undefined
              : isClosing
                ? { opacity: 0, y: -10, scale: 0.985 }
                : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{
            duration: isClosing ? exitDuration / 1000 : 0.54,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(16,27,35,0.98),rgba(9,18,24,0.99))] shadow-[0_36px_140px_rgba(6,12,18,0.52)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 26%), linear-gradient(180deg, rgba(242,13,13,0.06), transparent 48%)",
            }}
          />

          <div className="relative flex items-center justify-between gap-3 border-b border-[color:var(--border-soft)] px-4 py-3 sm:px-6 sm:py-4">
            <div className="min-w-0 flex items-center gap-3">
              <span className="crosshair-marker scale-90 opacity-85" />
              <div className="min-w-0">
                <p className="truncate font-ui text-[10px] uppercase tracking-[0.34em] text-[color:var(--text-muted)]">
                  {archiveIntro.label}
                </p>
                <p className="mt-1 font-ui text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
                  Declassified archive access
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              iconKey="close"
              onClick={() => triggerClose(setIsClosing)}
            >
              Skip
            </Button>
          </div>

          <div className="relative grid min-h-0 flex-1 gap-4 p-4 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.82fr)] lg:p-7">
            <div className="flex min-h-0 flex-col justify-center rounded-[28px] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-[color:var(--text-muted)] sm:text-[11px]">
                Mission file access
              </p>
              <h1 className="mt-4 font-heading text-[clamp(2.7rem,8vw,5rem)] leading-[0.84] text-[color:var(--text-strong)]">
                {archiveIntro.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--text-soft)] sm:text-base lg:text-lg">
                {archiveIntro.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-chip)] px-3 py-2 font-ui text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                  {progress} decrypted
                </span>
                <span className="rounded-full border border-[color:rgba(242,13,13,0.24)] bg-[color:var(--surface-chip-accent)] px-3 py-2 font-ui text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
                  Accent secured
                </span>
              </div>
            </div>

            <div className="flex min-h-0 flex-col rounded-[28px] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-panel-alt),var(--surface-panel-alt-strong))] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                    Current signal
                  </p>
                  <motion.p
                    key={activeSignal}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.16 : 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-3 text-[1.1rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--text-strong)] sm:text-[1.28rem]"
                  >
                    {activeSignal}
                  </motion.p>
                </div>

                <div className="rounded-[20px] border border-[color:var(--border-soft)] bg-[color:var(--surface-chip)] px-4 py-3 text-right">
                  <p className="font-ui text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                    Progress
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[color:var(--text-strong)]">
                    {progress}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-[color:var(--color-accent)] via-[#ff6b6b] to-[color:var(--text-strong)]"
                  animate={{ width: progress }}
                  transition={{
                    duration: prefersReducedMotion ? 0.18 : 0.7,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="mt-5 grid gap-3">
                {archiveIntro.sequence.map((step, stepIndex) => {
                  const isActive = stepIndex === index;
                  const isComplete = stepIndex < index || isReadyToEnter;

                  return (
                    <div
                      key={step}
                      className={cn(
                        "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-[18px] border px-4 py-3 transition-all duration-300",
                        isActive
                          ? "border-[color:rgba(242,13,13,0.3)] bg-[linear-gradient(180deg,rgba(31,46,58,0.98),rgba(20,33,43,0.99))]"
                          : isComplete
                            ? "border-[color:var(--border-soft)] bg-[color:var(--surface-chip)]"
                            : "border-[color:var(--border-soft)] bg-transparent",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full border font-ui text-[10px] uppercase tracking-[0.18em]",
                          isActive
                            ? "border-[color:rgba(242,13,13,0.5)] bg-[color:var(--surface-chip-accent)] text-[color:var(--text-strong)]"
                            : isComplete
                              ? "border-[color:rgba(228,238,244,0.24)] bg-[color:var(--surface-chip)] text-[color:var(--text-soft)]"
                              : "border-[color:var(--border-soft)] text-[color:var(--text-muted)]",
                        )}
                      >
                        {stepIndex + 1}
                      </span>
                      <p className="font-ui text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-soft)] sm:text-[11px]">
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-5">
                <p className="text-xs leading-relaxed text-[color:var(--text-muted)] sm:text-sm">
                  {archiveIntro.note}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant={soundEnabled ? "signal" : "outline"}
                    size="sm"
                    iconKey={soundEnabled ? "soundOn" : "soundOff"}
                    onClick={() => setSoundEnabled((value) => !value)}
                  >
                    {soundEnabled ? "Audio On" : "Audio Off"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    iconKey="enter"
                    onClick={() => triggerClose(setIsClosing)}
                    disabled={!isReadyToEnter}
                  >
                    {isReadyToEnter ? "Enter Archive" : "Decrypting..."}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </Container>
    </motion.div>
  );
}
