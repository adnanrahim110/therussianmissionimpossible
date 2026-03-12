"use client";

import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback } from "react";

export function useSpotlight() {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 50 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion) return;
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [prefersReducedMotion, mouseX, mouseY],
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (prefersReducedMotion) return;
      const touch = e.touches[0];
      if (!touch) return;
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(touch.clientX - left);
      mouseY.set(touch.clientY - top);
    },
    [prefersReducedMotion, mouseX, mouseY],
  );

  return {
    springX,
    springY,
    handlers: {
      onMouseMove: handleMouseMove,
      onTouchMove: handleTouchMove,
    },
  };
}
