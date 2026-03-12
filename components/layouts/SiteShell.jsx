"use client";

import { useCursorGlow } from "@/hooks/useCursorGlow";
import { ReactLenis } from "lenis/react";
import { motion, useMotionTemplate, useReducedMotion } from "motion/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTransition } from "./PageTransition";

function CursorGlow() {
  const { x, y, isDisabled } = useCursorGlow();
  const background = useMotionTemplate`radial-gradient(560px circle at ${x}px ${y}px, rgba(203, 47, 67, 0.065), transparent 75%)`;

  if (isDisabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}

export function SiteShell({ children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.5, smoothWheel: !prefersReducedMotion }}
    >
      <div className="relative flex min-h-screen-safe flex-col grain-overlay">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-70 focus:rounded-[2px] focus:bg-stone-50 focus:px-4 focus:py-2 focus:text-stone-950"
        >
          Skip to main content
        </a>
        <CursorGlow />
        <Header />
        <PageTransition>
          <main id="main-content" className="grow">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </div>
    </ReactLenis>
  );
}
