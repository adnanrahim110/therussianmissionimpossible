"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { CTA_LINKS } from "@/lib/constants";
import { BOOK } from "@/lib/content";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function HomeHero() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 pt-20"
    >
      {/* Premium Cinematic Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 bg-stone-950 overflow-hidden"
        style={prefersReducedMotion ? {} : { y: yBg, opacity }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

        {/* Animated Orbs */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-crimson-900/10 blur-[100px] mix-blend-screen"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-stone-500/10 blur-[120px] mix-blend-screen"
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-stone-50 to-transparent z-10" />
      </motion.div>

      <div className="container-default relative z-10 flex flex-col items-center text-center">
        <AnimatedText
          text={BOOK.title}
          as="h1"
          splitBy="word"
          className="font-heading font-black text-5xl md:text-7xl lg:text-hero text-stone-50 mb-6 drop-shadow-lg"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-xl md:text-2xl text-stone-300 max-w-2xl mb-12 font-light tracking-wide uppercase"
        >
          {BOOK.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="primary" size="lg" href={CTA_LINKS.preorder.href}>
            {CTA_LINKS.preorder.label}
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/book"
            className="border-stone-600 text-stone-200 hover:bg-stone-800 hover:text-stone-50"
          >
            Read the Story
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator down arrow */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-500 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
