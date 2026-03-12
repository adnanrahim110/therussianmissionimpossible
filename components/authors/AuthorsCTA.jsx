"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA_LINKS } from "@/lib/constants";
import { BOOK } from "@/lib/content";
import { cn } from "@/lib/utils";

export function AuthorsCTA() {
  return (
    <section className="relative section-padding bg-white overflow-hidden border-y border-stone-200">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-white via-stone-50 to-white"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-light opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-50"
      />

      {/* Diagonal accent wash */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-0 w-[52%]",
          "bg-linear-to-br from-crimson-600/10 via-crimson-600/5 to-transparent",
          "[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]",
        )}
      />

      <div
        aria-hidden="true"
        className="absolute left-[61.8%] top-0 bottom-0 w-px bg-stone-200/70"
      />

      {/* Giant background text */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 right-[-8vw] font-heading font-black text-[clamp(5rem,12vw,13rem)] leading-none text-stone-100 select-none pointer-events-none"
      >
        READ
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal variant="clip-left">
              <p className="font-body text-sm uppercase tracking-[0.28em] text-stone-500 mb-6 flex items-center gap-4">
                <span className="crosshair-marker scale-75 opacity-60" />
                <span>The Authors</span>
                <span aria-hidden="true" className="h-px flex-1 bg-stone-200" />
              </p>
              <h2 className="font-heading font-black text-4xl md:text-6xl leading-[0.95] text-balance text-stone-950">
                Their story,
                <br />
                their <span className="text-crimson-600">words</span>.
              </h2>
              <p className="mt-6 font-body text-stone-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                A verified narrative assembled from testimony, time, and the
                discipline of documentary record.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <ScrollReveal delay={0.15} variant="clip-up">
              <div className="relative w-full max-w-md rounded-[2px] border border-stone-200 bg-white ring-1 ring-stone-900/5 shadow-[0_28px_90px_rgba(28,26,23,0.10)] overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid-overlay-light opacity-40"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grain-overlay pointer-events-none opacity-50"
                />
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-600"
                />

                <div className="relative p-8">
                  <div className="flex items-start justify-between gap-10">
                    <div>
                      <div className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500">
                        Release
                      </div>
                      <div className="mt-3 font-heading text-3xl font-semibold text-stone-950 leading-tight">
                        Early {BOOK.year}
                      </div>
                    </div>
                    <div className="font-body text-[11px] uppercase tracking-[0.32em] text-stone-500 tabular-nums text-right">
                      OS-3.0
                    </div>
                  </div>

                  <div className="mt-6 h-px bg-stone-200" />

                  <div className="mt-6 flex items-center justify-between gap-6 text-xs uppercase tracking-[0.28em] text-stone-500">
                    <span className="flex items-center gap-3">
                      <span className="crosshair-marker scale-75 opacity-60" />
                      Format
                    </span>
                    <span className="text-stone-700">Hardcover</span>
                  </div>

                  <div className="mt-8">
                    <Button
                      variant="primary"
                      size="lg"
                      href={CTA_LINKS.preorder.href}
                      fullWidth
                      className="text-crimson-700"
                    >
                      Read the Book
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
