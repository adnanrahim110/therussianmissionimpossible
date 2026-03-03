"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { Container } from "@/components/ui/Container";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function ContactHero() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center overflow-hidden bg-stone-900 border-b border-stone-800"
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        style={prefersReducedMotion ? {} : { y, opacity }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-stone-500/10 rounded-full blur-3xl opacity-40 mix-blend-overlay translate-y-1/2 -translate-x-1/4" />
      </motion.div>

      <Container className="relative z-10 text-center flex flex-col items-center">
        <AnimatedText
          text="Get In Touch"
          as="h1"
          splitBy="line"
          className="font-heading font-black text-4xl md:text-5xl lg:text-7xl text-stone-50 mb-6 drop-shadow-sm"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-xl md:text-2xl text-stone-400 font-light max-w-2xl leading-relaxed"
        >
          For media inquiries, interview requests, or securing bulk orders of
          Operation Stream 3.0.
        </motion.p>
      </Container>
    </section>
  );
}
