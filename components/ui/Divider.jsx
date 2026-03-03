"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function Divider({ variant = "line", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0.5 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const safeVariants = prefersReducedMotion
    ? { hidden: { scaleX: 1 }, visible: { scaleX: 1 } }
    : lineVariants;

  if (variant === "ornament") {
    return (
      <div
        className={cn("flex items-center justify-center gap-4 py-8", className)}
      >
        <motion.div
          ref={ref}
          variants={safeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-px w-16 md:w-32 bg-stone-300"
        />
        <div className="w-2 h-2 rounded-full bg-crimson-600" />
        <motion.div
          ref={ref}
          variants={safeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-px w-16 md:w-32 bg-stone-300"
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn("flex items-center justify-center gap-2 py-8", className)}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
        <div className="w-2 h-2 rounded-full bg-crimson-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
      </div>
    );
  }

  // default line
  return (
    <div className={cn("py-8", className)}>
      <motion.div
        ref={ref}
        variants={safeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-px bg-stone-200"
      />
    </div>
  );
}
