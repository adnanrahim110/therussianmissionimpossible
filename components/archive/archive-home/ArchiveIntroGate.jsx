"use client";

import { Container } from "@/components/ui/Container";
import { archiveIntro } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function ArchiveIntroGate() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("archive-intro-complete") === "true") {
      setIsOpen(false);
      return;
    }
    if (prefersReducedMotion) {
      const timer = window.setTimeout(() => {
        window.sessionStorage.setItem("archive-intro-complete", "true");
        setIsOpen(false);
      }, 600);
      return () => window.clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return undefined;

    if (index < archiveIntro.sequence.length - 1) {
      const timer = window.setTimeout(() => {
        setIndex((value) => value + 1);
      }, 650);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("archive-intro-complete", "true");
      }
      setIsOpen(false);
    }, 1300);

    return () => window.clearTimeout(timer);
  }, [index, isOpen, prefersReducedMotion]);

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
    oscillator.type =
      index === archiveIntro.sequence.length - 1 ? "triangle" : "sine";
    oscillator.frequency.value = 360 + index * 70;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.03, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.25);

    return () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }, [index, isOpen, soundEnabled]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 flex items-center justify-center overflow-hidden bg-stone-950"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 scanline-overlay opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/20 blur-[180px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl rounded-[2px] border border-stone-800 bg-stone-950/80 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.6)] md:p-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="crosshair-marker scale-75 opacity-70" />
                <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                  {archiveIntro.label}
                </span>
              </div>
              <div className="mt-8 space-y-3">
                {archiveIntro.sequence.map((line, lineIndex) => (
                  <div
                    key={line}
                    className={cn(
                      "font-ui text-sm uppercase tracking-[0.32em] transition-all duration-500 md:text-base",
                      lineIndex < index
                        ? "text-stone-500"
                        : lineIndex === index
                          ? "text-stone-50"
                          : "text-stone-700",
                    )}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-md">
              <div className="font-heading text-6xl leading-[0.85] text-stone-50 md:text-7xl">
                {archiveIntro.title}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-300 md:text-base">
                {archiveIntro.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-stone-800 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-sm text-stone-400">
              {archiveIntro.note}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className={cn(
                  "rounded-[2px] border px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] transition-colors focus-visible:ring-2 focus-visible:ring-crimson-500",
                  soundEnabled
                    ? "border-crimson-700 bg-crimson-600 text-white"
                    : "border-stone-800 text-stone-300 hover:border-stone-600 hover:text-stone-50",
                )}
                onClick={() => setSoundEnabled((value) => !value)}
              >
                {soundEnabled ? "Audio Enabled" : "Enable Audio"}
              </button>
              <button
                type="button"
                className="rounded-[2px] border border-stone-800 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-300 transition-colors hover:border-stone-600 hover:text-stone-50 focus-visible:ring-2 focus-visible:ring-crimson-500"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.sessionStorage.setItem(
                      "archive-intro-complete",
                      "true",
                    );
                  }
                  setIsOpen(false);
                }}
              >
                Skip Intro
              </button>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
}
