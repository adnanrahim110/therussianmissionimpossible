"use client";

import { useCursorGlow } from "@/hooks/useCursorGlow";
import { motion, useMotionTemplate, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTransition } from "./PageTransition";

function CursorGlow() {
  const { x, y, isDisabled } = useCursorGlow();
  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(185, 28, 28, 0.015), transparent 80%)`;

  if (isDisabled) return null;

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
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
      <div className="flex flex-col min-h-screen grain-overlay">
        <CursorGlow />
        <Header />
        <PageTransition>
          <main className="grow">{children}</main>
        </PageTransition>
        <Footer />
      </div>
    </ReactLenis>
  );
}
