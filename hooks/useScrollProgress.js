"use client";

import { useScroll } from "motion/react";

export function useScrollProgress(ref, offset = ["start end", "end start"]) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  return scrollYProgress;
}
