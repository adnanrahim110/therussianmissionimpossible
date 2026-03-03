"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA_LINKS } from "@/lib/constants";

export function AuthorsCTA() {
  return (
    <section className="py-24 md:py-32 bg-stone-900 border-t border-stone-800 text-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-stone-950 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-crimson-900/10 blur-3xl rounded-full pointer-events-none" />

      <Container size="narrow" className="relative z-10">
        <ScrollReveal>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-50 mb-6 drop-shadow-md">
            Their story, their words.
          </h2>

          <p className="font-body text-xl text-stone-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Discover the gripping narrative synthesized from hundreds of hours
            of raw accounts.
          </p>

          <Button variant="primary" size="lg" href={CTA_LINKS.preorder.href}>
            Read the Book
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
