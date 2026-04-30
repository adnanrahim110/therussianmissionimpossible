"use client";

import { ReactLenis } from "lenis/react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { AccentBackdrop } from "./AccentBackdrop";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTransition } from "./PageTransition";

function ScrollSync({ prefersReducedMotion }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || prefersReducedMotion) return;

    const update = () => ScrollTrigger.update();
    const refresh = () => lenis.resize();

    lenis.on("scroll", update);
    ScrollTrigger.addEventListener("refresh", refresh);

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.off("scroll", update);
      ScrollTrigger.removeEventListener("refresh", refresh);
    };
  }, [lenis, prefersReducedMotion]);

  return null;
}

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
      <ScrollSync prefersReducedMotion={prefersReducedMotion} />
      <AccentBackdrop />
      <div className="relative z-10 flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950"
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
