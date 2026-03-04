"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA_LINKS } from "@/lib/constants";

export function AuthorsContact() {
  return (
    <section className="relative section-padding bg-white text-stone-950 overflow-hidden border-t border-stone-200">
      <div aria-hidden="true" className="absolute inset-0 grid-overlay-light opacity-50" />
      <div aria-hidden="true" className="absolute inset-0 grain-overlay pointer-events-none opacity-60" />

      <div
        aria-hidden="true"
        className="absolute right-[-8vw] top-1/2 -translate-y-1/2 font-heading font-black text-[clamp(5rem,12vw,13rem)] leading-none text-stone-200/70 select-none pointer-events-none"
      >
        INQUIRIES
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal variant="clip-left">
              <p className="font-body text-sm uppercase tracking-[0.28em] text-stone-500 mb-5">
                Press &amp; Inquiries
              </p>
              <h2 className="font-heading font-black text-4xl md:text-6xl leading-[0.95] text-balance">
                Start the conversation.
              </h2>
              <p className="mt-6 font-body text-stone-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                For interviews, bulk orders, and verified statements, we route
                requests through the publisher and author team.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <ScrollReveal delay={0.15} variant="clip-up">
              <div className="flex flex-col gap-4 items-start lg:items-end">
                <Button variant="primary" size="lg" href={CTA_LINKS.contact.href}>
                  Get in Touch
                </Button>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-stone-500">
                  <span className="crosshair-marker scale-75 opacity-60" />
                  Response within 48h
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
