"use client";

import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

/**
 * Unified scroll-driven animation hook.
 *
 * @param {Object} opts
 * @param {"full"|"enter"|"exit"} opts.phase  – Which scroll phase to animate over
 * @param {[number,number]}       opts.offset – Framer Motion scroll offset pair
 * @param {number}                opts.parallaxY – Pixels of vertical parallax shift
 * @param {number}                opts.parallaxScale – Scale multiplier on scroll
 * @param {boolean}               opts.fade   – Whether to fade opacity with scroll
 */
export function useScrollReveal({
  phase = "enter",
  offset,
  parallaxY = 0,
  parallaxScale = 0,
  fade = false,
} = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const defaultOffset =
    phase === "full"
      ? ["start end", "end start"]
      : phase === "exit"
        ? ["start start", "end start"]
        : ["start end", "end start"];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset ?? defaultOffset,
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const safeProgress = prefersReducedMotion ? scrollYProgress : springProgress;

  const y = useTransform(
    safeProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [parallaxY, -parallaxY],
  );

  const scale = useTransform(
    safeProgress,
    [0, 1],
    prefersReducedMotion
      ? [1, 1]
      : [1, 1 + parallaxScale],
  );

  const opacity = useTransform(
    safeProgress,
    [0, 0.15, 0.85, 1],
    fade && !prefersReducedMotion ? [0, 1, 1, 0] : [1, 1, 1, 1],
  );

  return {
    ref,
    progress: safeProgress,
    style: { y, scale, opacity },
  };
}
