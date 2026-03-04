"use client";

import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA_LINKS } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="section-padding bg-stone-50 overflow-hidden" id="preorder">
      {/* Full-width breakout */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-stone-200 rounded-[2px] shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Pre-order (dark) */}
            <div className="relative bg-stone-950 text-stone-50 p-10 md:p-16 overflow-hidden grain-overlay lg:w-7/12 lg:z-10 lg:[clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]">
              <div className="absolute inset-0 grid-overlay-dark opacity-60" />
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-crimson-900/25 blur-[140px] rounded-full pointer-events-none" />

              <ScrollReveal variant="clip-left" className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-crimson-700/50 text-crimson-200 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="crosshair-marker scale-75 opacity-80" />
                  Coming Early 2026
                </div>

                <h2 className="font-heading font-black text-5xl md:text-7xl leading-[0.95] mb-4 text-balance">
                  Secure Your{" "}
                  <span className="text-crimson-500">Copy</span>
                </h2>

                <p className="font-body text-stone-300 text-lg md:text-xl mb-10 max-w-xl font-light leading-relaxed">
                  Pre-order the definitive documentary account of the harrowing
                  215-day occupation underneath Sudzha.
                </p>

                <Button variant="primary" size="lg" href={CTA_LINKS.preorder.href}>
                  {CTA_LINKS.preorder.label}
                </Button>
              </ScrollReveal>
            </div>

            {/* Right: Newsletter (light) */}
            <div className="relative bg-white p-10 md:p-16 border-t border-stone-200 lg:border-t-0 lg:border-l lg:w-5/12 lg:-ml-16 lg:pl-24">
              <ScrollReveal delay={0.15} variant="clip-up">
                <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-stone-950">
                  Join the Newsletter
                </h3>

                <p className="font-body text-stone-600 mb-8 max-w-md leading-relaxed">
                  Receive updates on publication dates, author events, and
                  exclusive excerpts directly to your inbox.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <FormInput
                    label="Email address"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                  <Button variant="secondary" type="submit" fullWidth>
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
      </div>
    </section>
  );
}
