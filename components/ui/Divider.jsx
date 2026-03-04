"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function Divider({ variant = "line", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const lineVariants = prefersReducedMotion
    ? { hidden: { scaleX: 1 }, visible: { scaleX: 1 } }
    : {
        hidden: { scaleX: 0, originX: 0.5 },
        visible: {
          scaleX: 1,
          transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
        },
      };

  // Ornament — crosshair marker + asymmetric lines
  if (variant === "ornament") {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-4 py-8", className)}
      >
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-px w-12 md:w-24 bg-stone-300"
        />
        <span className="crosshair-marker" />
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-px w-20 md:w-40 bg-stone-300"
        />
      </div>
    );
  }

  // Tactical — ruler-like tick marks, animated draw from center
  if (variant === "tactical") {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-1 py-8", className)}
      >
        {/* Left ticks */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`l-${i}`}
              initial={prefersReducedMotion ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              animate={
                isInView
                  ? { scaleY: 1, opacity: 1 }
                  : prefersReducedMotion
                    ? { scaleY: 1, opacity: 1 }
                    : { scaleY: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, delay: 0.3 - i * 0.05 }}
              className={cn(
                "w-px bg-stone-400 origin-bottom",
                i % 2 === 0 ? "h-3" : "h-2",
              )}
            />
          ))}
        </div>

        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-px w-16 md:w-32 bg-stone-300"
        />

        <span className="crosshair-marker" />

        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-px w-16 md:w-32 bg-stone-300"
        />

        {/* Right ticks */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`r-${i}`}
              initial={prefersReducedMotion ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              animate={
                isInView
                  ? { scaleY: 1, opacity: 1 }
                  : prefersReducedMotion
                    ? { scaleY: 1, opacity: 1 }
                    : { scaleY: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              className={cn(
                "w-px bg-stone-400 origin-bottom",
                i % 2 === 0 ? "h-3" : "h-2",
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default line
  return (
    <div ref={ref} className={cn("py-8", className)}>
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-px bg-stone-200"
      />
    </div>
  );
}
