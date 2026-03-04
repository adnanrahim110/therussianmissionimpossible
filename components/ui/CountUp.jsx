"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export function CountUp({ end, suffix = "", label, duration = 2, className }) {
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
      // Spring-based animation
      const controls = animate(count, end, {
        type: "spring",
        stiffness: 50,
        damping: 20,
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest).toString());
        },
      });
      return controls.stop;
    }
  }, [isInView, end, duration, count, prefersReducedMotion]);

  return (
    <div ref={ref} className={cn("font-heading tabular-nums", className)}>
      <span>{displayValue}</span>
      {suffix && (
        <span className="text-[0.6em] text-stone-400 ml-1">{suffix}</span>
      )}
    </div>
  );
}
