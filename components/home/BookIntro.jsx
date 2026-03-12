"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTilt3D } from "@/hooks/useTilt3D";
import { BOOK } from "@/lib/content";
import { motion } from "motion/react";

function BookCover3D() {
  const { ref, style, handlers } = useTilt3D({
    maxTilt: 10,
  });

  return (
    <div className="perspective-container">
      <motion.div
        ref={ref}
        style={style}
        {...handlers}
        className="relative aspect-1067/1600 w-full max-w-md mx-auto will-change-transform"
      >
        <div className="absolute inset-4 bg-stone-400/20 rounded-[2px] translate-x-3 translate-y-3 blur-md" />
        <div className="absolute inset-2 bg-stone-300/30 rounded-[2px] translate-x-1.5 translate-y-1.5" />

        <div className="absolute inset-0 bg-stone-200 bg-cover bg-center bg-no-repeat bg-[url(/imgs/bookcover.jpg)] rounded-[2px] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 border border-stone-300 text-center">
          <div className="absolute inset-0 bg-linear-to-br from-stone-100 to-stone-300 mix-blend-overlay" />
          <div className="absolute right-0 top-2 bottom-2 w-2 bg-linear-to-l from-stone-400/40 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-stone-900/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

export function BookIntro() {
  return (
    <section
      className="section-padding bg-stone-50 clip-diagonal-top -mt-1"
      id="book-intro"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <SectionHeading
              title="The Truth Beneath the Earth"
              subtitle={BOOK.genre}
              ornament
              index="01"
            />

            <ScrollReveal delay={0.1}>
              <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed mb-8">
                <p>
                  <span className="font-heading text-5xl font-bold text-crimson-600 float-left mr-3 mt-1 leading-none">
                    {BOOK.synopsis[0]}
                  </span>
                  {BOOK.synopsis.slice(1)}
                </p>

                <div className="flex flex-wrap gap-2 mt-6 not-prose">
                  {BOOK.themes.map((theme, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 bg-stone-50 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-[2px] border-l-2 border-olive-600"
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

          <div className="order-1 lg:order-2 lg:col-span-5">
            <ScrollReveal delay={0.2} variant="scale">
              <BookCover3D />
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
