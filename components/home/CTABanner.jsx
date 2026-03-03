"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FormInput } from "@/components/ui/FormInput"; // Will be created in UI Kit next or shortly
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA_LINKS } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="section-padding bg-transparent" id="preorder">
      <Container>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Pre-Order */}
            <div className="bg-stone-900 text-stone-50 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-900/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

              <ScrollReveal>
                <div className="inline-block px-3 py-1 bg-crimson-900/40 border border-crimson-700/50 text-crimson-200 text-xs font-bold uppercase tracking-widest rounded-full mb-6 relative z-10">
                  Coming Early 2026
                </div>

                <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 relative z-10 text-balance">
                  Secure Your Copy
                </h2>

                <p className="text-stone-300 text-lg mb-8 max-w-md relative z-10">
                  Pre-order the definitive documentary account of the harrowing
                  215-day occupation underneath Sudzha.
                </p>

                <div className="relative z-10">
                  <Button variant="primary" size="lg" href="#">
                    {CTA_LINKS.preorder.label}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Newsletter */}
            <div className="bg-stone-100 p-10 md:p-16 flex flex-col justify-center">
              <ScrollReveal delay={0.2}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-stone-900">
                  Join the Newsletter
                </h2>

                <p className="text-stone-600 mb-8 max-w-md">
                  Receive updates on publication dates, author events, and
                  exclusive excerpts directly to your inbox.
                </p>

                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grow">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <Button variant="secondary" type="submit">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-stone-400 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
