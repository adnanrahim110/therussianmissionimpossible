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
      options={{ lerp: 0.1, duration: 1.5, smoothWheel: !prefersReducedMotion }}
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <PageTransition>
          <main className="grow">{children}</main>
        </PageTransition>
        <Footer />
      </div>
    </ReactLenis>
  );
}
