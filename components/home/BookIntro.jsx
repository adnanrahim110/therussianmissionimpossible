"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BOOK } from "@/lib/content";

export function BookIntro() {
  return (
    <section className="section-padding bg-stone-50" id="book-intro">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Text Synopsis */}
          <div className="order-2 lg:order-1">
            <SectionHeading
              title="The Truth Beneath the Earth"
              subtitle={BOOK.genre}
              ornament
            />

            <ScrollReveal delay={0.1}>
              <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed mb-8">
                <p>{BOOK.synopsis}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {BOOK.themes.map((theme, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 bg-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-full"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                href="/book"
                variant="ghost"
                iconPosition="right"
                icon={(props) => (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {...props}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              >
                Discover the Chapters
              </Button>
            </ScrollReveal>
          </div>

          {/* Right: Book Cover Placeholder */}
          <div className="order-1 lg:order-2">
            <ScrollReveal
              delay={0.2}
              className="relative aspect-3/4 w-full max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-stone-200 rounded-lg shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 border border-stone-300 text-center relative group">
                <div className="absolute inset-0 bg-linear-to-br from-stone-100 to-stone-300 mix-blend-overlay" />

                <h2 className="font-heading text-4xl font-black text-stone-900 mb-2 relative z-10">
                  {BOOK.title}
                </h2>
                <p className="font-body text-stone-600 uppercase tracking-widest text-sm relative z-10 mb-8">
                  {BOOK.subtitle}
                </p>

                <p className="font-heading text-xl italic text-stone-500 relative z-10 mt-auto">
                  A Documentary
                  <br />
                  War Prose
                </p>

                {/* Simulated spine shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-stone-900/20 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
