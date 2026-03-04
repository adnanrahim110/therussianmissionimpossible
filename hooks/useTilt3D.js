"use client";

import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useRef } from "react";

export function useTilt3D({ maxTilt = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scaleVal = useMotionValue(1);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const springScale = useSpring(scaleVal, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !ref.current) return;

      // Check for touch device
      if ("ontouchstart" in window) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      rotateX.set(tiltX);
      rotateY.set(tiltY);
      scaleVal.set(scale);
    },
    [prefersReducedMotion, maxTilt, scale, rotateX, rotateY, scaleVal],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scaleVal.set(1);
  }, [rotateX, rotateY, scaleVal]);

  return {
    ref,
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      scale: springScale,
      transformStyle: "preserve-3d",
    },
    handleMouseMove,
    handleMouseLeave,
  };
}
