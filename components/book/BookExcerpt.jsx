"use client";

import { Container } from "@/components/ui/Container";
import { BOOK } from "@/lib/content";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function BookExcerpt() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-stone-900 border-y border-stone-800 relative overflow-hidden"
    >
      <Container size="narrow" className="relative z-10">
        {/* Parallax Quote Marks */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute top-0 -left-8 md:-left-16 text-[120px] md:text-[200px] leading-none font-heading font-black text-stone-800/50 select-none"
            style={{ y: quoteY }}
          >
            "
          </motion.div>
        )}

        <figure className="relative z-10">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-heading italic text-2xl md:text-4xl text-stone-50 leading-relaxed text-pretty text-center md:text-left drop-shadow-md"
          >
            {BOOK.excerpt}
          </motion.blockquote>

          <motion.figcaption
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex items-center justify-center md:justify-start gap-4 text-stone-400 font-body uppercase tracking-widest text-sm"
          >
            <span className="w-8 h-px bg-crimson-600" />
            Excerpt from Chapter 3
          </motion.figcaption>
        </figure>
      </Container>
    </section>
  );
}
