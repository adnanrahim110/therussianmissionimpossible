
"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTA_LINKS } from "@/lib/constants";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function ContactPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-stone-50 border-t border-stone-200 overflow-hidden"
    >
      <Container className="py-16 md:py-20">
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <p className="font-body text-sm uppercase tracking-[0.25em] text-stone-500 mb-4">
              Press & Inquiries
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 mb-4 text-balance">
              Start the conversation.
            </h2>
            <p className="font-body text-stone-600 text-lg leading-relaxed">
              For media interviews, bulk orders, or direct communication with the
              publisher and authors.
            </p>
          </div>

          <div className="shrink-0">
            <Button variant="secondary" size="lg" href={CTA_LINKS.contact.href}>
              {CTA_LINKS.contact.label}
            </Button>
          </div>

          {/* Oversized arrow on far right */}
          <div
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-display text-stone-900/10 select-none pointer-events-none"
            aria-hidden="true"
          >
            →
          </div>
        </div>
      </Container>

      {/* Animated crimson bottom border */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 h-0.5 w-full bg-crimson-600 origin-left"
      />
    </section>
  );
}
