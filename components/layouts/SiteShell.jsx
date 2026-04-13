"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTransition } from "./PageTransition";

export function SiteShell({ children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        duration: 1.0,
        smoothWheel: !prefersReducedMotion,
        allowNestedScroll: true,
      }}
    >
      <div className="relative flex min-h-screen-safe flex-col grain-overlay">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-70 focus:rounded-[2px] focus:bg-stone-50 focus:px-4 focus:py-2 focus:text-stone-950"
        >
          Skip to main content
        </a>
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
