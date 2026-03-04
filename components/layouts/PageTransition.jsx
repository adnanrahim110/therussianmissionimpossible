"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex flex-col grow" key={pathname}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="w-full h-full flex flex-col grow relative"
      >
        {children}

        {/* Cinematic wipe overlay (doesn't clip page content → sticky works) */}
        <motion.div
          className="fixed inset-0 z-[45] pointer-events-none bg-stone-950"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          exit={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Crimson leading edge bar */}
        <motion.div
          className="fixed left-0 right-0 top-0 h-1 bg-crimson-600 z-[46] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
