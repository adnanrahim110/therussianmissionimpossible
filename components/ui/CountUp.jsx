"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export function CountUp({ end, suffix = "", duration = 2, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState("0");
  const count = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(end.toString());
      return;
    }

    if (isInView) {
      const controls = animate(count, end, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest).toString());
        },
      });
      return controls.stop;
    }
  }, [isInView, end, duration, count, prefersReducedMotion]);

  return (
    <div ref={ref} className={cn("font-heading tabular-nums", className)}>
      {displayValue}
      {suffix}
    </div>
  );
}
