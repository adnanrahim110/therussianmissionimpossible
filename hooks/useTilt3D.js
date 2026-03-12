"use client";

import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useRef } from "react";

export function useTilt3D({ maxTilt = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scaleVal = useMotionValue(1);

  const springConfig = { stiffness: 300, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scaleVal, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;

      /* Guard against division-by-zero on collapsed elements */
      if (halfW === 0 || halfH === 0) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      rotateX.set(((y - halfH) / halfH) * -maxTilt);
      rotateY.set(((x - halfW) / halfW) * maxTilt);
      scaleVal.set(scale);
    },
    [prefersReducedMotion, maxTilt, scale, rotateX, rotateY, scaleVal],
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !ref.current) return;
      const touch = e.touches[0];
      if (!touch) return;

      const rect = ref.current.getBoundingClientRect();
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      if (halfW === 0 || halfH === 0) return;

      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      /* Gentler tilt for touch — half the desktop intensity */
      rotateX.set(((y - halfH) / halfH) * -(maxTilt * 0.5));
      rotateY.set(((x - halfW) / halfW) * (maxTilt * 0.5));
      scaleVal.set(scale);
    },
    [prefersReducedMotion, maxTilt, scale, rotateX, rotateY, scaleVal],
  );

  const handleReset = useCallback(() => {
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
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleReset,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleReset,
    },
  };
}
