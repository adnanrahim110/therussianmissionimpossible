"use client";

import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export function useCursorGlow() {
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches,
    );
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
  }, [mouseX, mouseY]);

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || isTouchDevice) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [prefersReducedMotion, isTouchDevice, mouseX, mouseY],
  );

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, prefersReducedMotion, isTouchDevice]);

  const isDisabled = prefersReducedMotion || isTouchDevice;

  return { x: springX, y: springY, isDisabled };
}
