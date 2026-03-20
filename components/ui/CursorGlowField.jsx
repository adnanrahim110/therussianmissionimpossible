"use client";

import { useCursorGlow } from "@/hooks/useCursorGlow";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate } from "motion/react";

export function CursorGlowField({
  className,
  size = 520,
  color = "rgba(203, 47, 67, 0.12)",
}) {
  const { x, y, isDisabled } = useCursorGlow();
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 74%)`;

  if (isDisabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ background }}
    />
  );
}
