"use client";

import {
  clipReveal,
  clipRevealLeft,
  fadeUpSpring,
  rotateIn,
  safeVariants,
  scaleIn,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const variantMap = {
  "fade-up": fadeUpSpring,
  "clip-up": clipReveal,
  "clip-left": clipRevealLeft,
  "rotate-in": rotateIn,
  scale: scaleIn,
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
  variant = "fade-up",
  variants: customVariants = null,
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  // Get base variants from the variant map or use custom
  const baseVariants = customVariants || variantMap[variant] || fadeUpSpring;

  // Apply delay to the visible state transition
  const delayedVariants = {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        delay: (baseVariants.visible.transition?.delay || 0) + delay,
      },
    },
  };

  const resolvedVariants = safeVariants(delayedVariants, prefersReducedMotion);

  return (
    <motion.div
      ref={ref}
      variants={resolvedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
