"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TerminalBlock, TerminalRow } from "@/components/ui/terminal/Terminal";
import { archiveIntro } from "@/lib/content";
import { cn } from "@/lib/utils";

const INTRO_SESSION_KEY = "archive-intro-complete-v3";
const INITIAL_HOLD_MS = 1600;
const INITIAL_HOLD_REDUCED_MS = 1000;
const STEP_DURATION_MS = 1200;
const STEP_DURATION_REDUCED_MS = 800;
const READY_HOLD_MS = 1100;
const READY_HOLD_REDUCED_MS = 700;
const AUTO_EXIT_MS = 700;
const AUTO_EXIT_REDUCED_MS = 400;
const EXIT_DURATION_MS = 720;
const EXIT_DURATION_REDUCED_MS = 460;

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
      transition={{
        duration:
          (isClosing ? exitDuration : prefersReducedMotion ? 220 : 360) / 1000,
      }}
      className="fixed inset-0 z-70 overflow-hidden bg-black/95 px-3 py-3 sm:px-4 sm:py-4"
    >
      <Container
        size="wide"
        className="relative z-10 flex h-full items-center justify-center"
      >
        <motion.section
          initial={
            prefersReducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.988 }
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
          className="relative mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-md border border-white/10 bg-stone-950"
        >
          <header className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span aria-hidden="true" className="size-2 rounded-full bg-rose-500" />
              <div className="min-w-0">
                <p className="truncate font-ui text-[10px] font-medium uppercase tracking-[0.32em] text-stone-400">
                  {archiveIntro.label}
                </p>
                <p className="mt-1 font-ui text-[10px] uppercase tracking-[0.28em] text-rose-300">
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
          </header>

          <div className="relative grid min-h-0 flex-1 gap-4 p-4 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.82fr)] lg:p-7">
            <div className="flex min-h-0 flex-col justify-center rounded-md border border-white/10 bg-black/40 p-5 sm:p-6 lg:p-8">
              <p className="font-ui text-[10px] font-medium uppercase tracking-[0.32em] text-stone-400 sm:text-[11px]">
                Mission file access
              </p>
              <h1 className="mt-4 font-heading text-[clamp(2.7rem,8vw,5rem)] font-bold leading-[0.84] text-white">
                {archiveIntro.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base lg:text-lg">
                {archiveIntro.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-ui text-[10px] uppercase tracking-[0.24em]">
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-stone-300">
                  {progress} decrypted
                </span>
                <span className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-rose-200">
                  Accent secured
                </span>
              </div>
            </div>

            <div className="flex min-h-0 flex-col gap-5 rounded-md border border-white/10 bg-black/40 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-ui text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">
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
                    className="mt-3 truncate font-ui text-[1.1rem] font-bold uppercase tracking-wider text-white sm:text-[1.28rem]"
                  >
                    {activeSignal}
                  </motion.p>
                </div>

                <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-right">
                  <p className="font-ui text-[10px] font-medium uppercase tracking-[0.24em] text-stone-400">
                    Progress
                  </p>
                  <p className="mt-2 font-ui text-2xl font-bold text-white">
                    {progress}
                  </p>
                </div>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-rose-400"
                  animate={{ width: progress }}
                  transition={{
                    duration: prefersReducedMotion ? 0.18 : 0.7,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <TerminalBlock compact>
                {archiveIntro.sequence.map((step, stepIndex) => {
                  const isActive = stepIndex === index;
                  const isReady =
                    stepIndex === stepCount - 1 && isReadyToEnter;
                  const isHidden = stepIndex > index;
                  const numberLabel = String(stepIndex + 1).padStart(2, "0");

                  return (
                    <TerminalRow
                      key={step}
                      variant={isReady ? "status" : "default"}
                      className={cn(
                        "transition-opacity duration-300",
                        isHidden && "opacity-20",
                        isActive && !isReady && "opacity-100",
                      )}
                    >
                      {numberLabel} {step}
                    </TerminalRow>
                  );
                })}
              </TerminalBlock>

              <div className="mt-auto flex flex-wrap gap-3">
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
        </motion.section>
      </Container>
    </motion.div>
  );
}
