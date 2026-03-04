"use client";

import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect } from "react";

export function useCursorGlow() {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [prefersReducedMotion, mouseX, mouseY],
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, prefersReducedMotion]);

  return { x: springX, y: springY, isDisabled: prefersReducedMotion };
}
