"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTA_LINKS } from "@/lib/constants";
import { BOOK } from "@/lib/content";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function BookHero() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-stone-950 pt-20"
    >
      {/* Abstract pipeline/tunnel motif using CSS gradients */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={prefersReducedMotion ? {} : { y, opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-stone-800)_0%,var(--color-stone-950)_70%)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-200 -translate-x-1/2 bg-linear-to-r from-transparent via-crimson-900/10 to-transparent blur-3xl opacity-50 mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-stone-950 to-transparent" />
      </motion.div>

      <Container className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-800 text-stone-300 text-xs font-semibold uppercase tracking-widest"
        >
          <span className="w-2 h-2 rounded-full bg-crimson-600" />
          {BOOK.genre}
        </motion.div>

        <AnimatedText
          text={BOOK.title}
          as="h1"
          splitBy="line"
          className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-stone-50 mb-4 max-w-4xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-xl md:text-2xl text-stone-400 font-light mb-10 max-w-2xl"
        >
          {BOOK.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button variant="primary" size="lg" href={CTA_LINKS.preorder.href}>
            {CTA_LINKS.preorder.label}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
