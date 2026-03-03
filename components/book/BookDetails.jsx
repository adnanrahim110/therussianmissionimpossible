"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BOOK } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function BookDetails() {
  const [chaptersOpen, setChaptersOpen] = useState(false);

  return (
    <section className="section-padding bg-stone-50">
      <Container size="narrow">
        <ScrollReveal>
          <p className="font-heading text-xl md:text-2xl text-stone-800 leading-relaxed mb-12 text-center text-balance italic">
            {BOOK.synopsis}
          </p>
        </ScrollReveal>

        <div className="space-y-16">
          {/* Key Themes */}
          <ScrollReveal delay={0.1}>
            <SectionHeading
              title="Key Themes"
              tag="h3"
              align="center"
              className="mb-8!"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {BOOK.themes.map((theme, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white border border-stone-200 text-stone-800 rounded-lg text-sm font-semibold tracking-wide uppercase shadow-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Chapter Overview */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
              <button
                onClick={() => setChaptersOpen(!chaptersOpen)}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={chaptersOpen}
              >
                <h3 className="font-heading text-2xl font-bold text-stone-900 group-hover:text-crimson-700 transition-colors">
                  Chapter Overview ({BOOK.chapters.length})
                </h3>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 transition-transform duration-300",
                    chaptersOpen ? "rotate-180" : "",
                  )}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {chaptersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-6 pt-6 border-t border-stone-100 grid md:grid-cols-2 gap-y-4 gap-x-8">
                      {BOOK.chapters.map((chapter, i) => (
                        <li
                          key={i}
                          className="flex items-start text-stone-700 font-body"
                        >
                          <span className="text-crimson-600 font-bold mr-3 mt-0.5">
                            •
                          </span>
                          {chapter}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
