"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTA_LINKS } from "@/lib/constants";
import { BOOK } from "@/lib/content";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

function TunnelFrame({ index, shift }) {
  const z = useTransform(shift, (latest) => latest - (index + 1) * 180);
  const opacity = useTransform(z, [-1200, -800, -300, 200, 420], [0.06, 0.12, 0.28, 0.18, 0.06]);
  const transform = useMotionTemplate`translateZ(${z}px)`;

  const isAccent = index === 0 || index === 3;

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 rounded-[2px] border border-stone-700/50 shadow-[0_0_0_1px_rgba(28,26,23,0.6)]"
      style={{ transform, opacity }}
    >
      {isAccent && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-crimson-600/60 to-transparent" />
      )}
      <div className="absolute inset-6 rounded-[2px] border border-stone-800/60" />
    </motion.div>
  );
}

function TunnelBackdrop({ scrollYProgress }) {
  const shift = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [-14, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [10, 2]);
  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="perspective-container w-full max-w-5xl h-[56vh] min-h-96">
        <motion.div className="relative h-full w-full preserve-3d" style={{ transform }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <TunnelFrame key={i} index={i} shift={shift} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function BookHero() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[86vh] flex items-center justify-center overflow-hidden bg-stone-950 pt-20 border-b border-stone-800"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={prefersReducedMotion ? {} : { scale: bgScale, opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
        <div className="absolute inset-0 grid-overlay-dark opacity-70" />
        <div className="absolute left-[61.8%] top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-900/20 blur-[140px] opacity-70" />
      </motion.div>

      {/* Tunnel frames */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-[1] opacity-80">
          <TunnelBackdrop scrollYProgress={scrollYProgress} />
        </div>
      )}

      {/* Film grain */}
      <div className="absolute inset-0 z-[2] grain-overlay pointer-events-none" />

      <Container className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 180, damping: 22, mass: 0.8 }
          }
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-stone-900/70 border border-stone-800 text-stone-300 text-xs font-semibold uppercase tracking-[0.25em]"
        >
          <span className="crosshair-marker scale-75 opacity-80" />
          {BOOK.genre}
        </motion.div>

        <AnimatedText
          text={BOOK.title}
          as="h1"
          splitBy="char"
          className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-stone-50 mb-4 max-w-5xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.35, delay: 0.25 },
                  y: { type: "spring", stiffness: 170, damping: 22, delay: 0.25 },
                }
          }
          className="font-body text-xl md:text-2xl text-stone-400 font-light mb-10 max-w-2xl"
        >
          {BOOK.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.35, delay: 0.4 },
                  y: { type: "spring", stiffness: 170, damping: 22, delay: 0.4 },
                }
          }
        >
          <Button variant="primary" size="lg" href={CTA_LINKS.preorder.href}>
            {CTA_LINKS.preorder.label}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
