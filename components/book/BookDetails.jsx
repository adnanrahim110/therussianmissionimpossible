"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA_LINKS } from "@/lib/constants";
import { BOOK } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function BookDetails() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(null);

  const synopsisLead = (() => {
    const lead = BOOK.synopsis.split(".")[0]?.trim();
    return lead ? `${lead}.` : BOOK.synopsis;
  })();

  return (
    <section className="relative section-padding bg-stone-50 overflow-hidden clip-diagonal-top -mt-1">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-stone-50 via-white to-stone-50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-light opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute left-[61.8%] top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson-600/6 blur-[140px]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left: synopsis + themes */}
          <div className="lg:col-span-5">
            <SectionHeading
              title="Synopsis"
              subtitle="A record of 215 days"
              ornament
              tag="h2"
              className="mb-10"
            />

            <ScrollReveal variant="clip-up">
              <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed">
                <p>
                  <span className="font-heading text-6xl font-black text-crimson-600 float-left mr-3 mt-1 leading-none">
                    {BOOK.synopsis[0]}
                  </span>
                  {BOOK.synopsis.slice(1)}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} variant="clip-left" className="mt-10">
              <div className="flex flex-wrap gap-2">
                {BOOK.themes.map((theme) => (
                  <span
                    key={theme}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-[2px] border-l-2 border-l-olive-600"
                  >
                    <span className="crosshair-marker scale-75 opacity-40" />
                    {theme}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: zigzag chapter accordion */}
          <div className="lg:col-span-7">
            <SectionHeading
              title="Chapter Overview"
              subtitle={`${BOOK.chapters.length} chapters (preview)`}
              tag="h2"
              className="mb-10"
            />

            <div className="space-y-4 md:space-y-6">
              {BOOK.chapters.map((chapter, index) => {
                const align = index % 2 === 0 ? "left" : "right";
                const isOpen = openIndex === index;

                return (
                  <div
                    key={chapter}
                    className={cn(
                      "relative",
                      align === "left" ? "md:pr-20" : "md:pl-20",
                    )}
                  >
                    <div
                      className={cn(
                        "md:max-w-xl",
                        align === "right" ? "md:ml-auto" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "group relative overflow-hidden rounded-[2px] border border-stone-200 bg-white shadow-[0_18px_60px_rgba(28,26,23,0.06)]",
                          isOpen && "border-stone-300",
                        )}
                      >
                        <div
                          aria-hidden="true"
                          className={cn(
                            "absolute -top-8 font-heading font-black text-[96px] leading-none text-stone-200/55 select-none pointer-events-none",
                            align === "right" ? "right-6" : "left-6",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <button
                          type="button"
                          className="w-full flex items-start justify-between gap-6 p-6 md:p-8 text-left focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:ring-inset rounded-[2px]"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          aria-expanded={isOpen}
                        >
                          <div>
                            <p className="font-body text-xs uppercase tracking-[0.25em] text-stone-500 mb-2">
                              Chapter {index + 1}
                            </p>
                            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-stone-950 group-hover:text-crimson-700 transition-colors text-balance">
                              {chapter}
                            </h3>
                          </div>

                          <motion.div
                            aria-hidden="true"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={
                              prefersReducedMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 22,
                                  }
                            }
                            className="shrink-0 mt-2 h-10 w-10 rounded-[2px] border border-stone-200 bg-stone-50 text-stone-700 grid place-items-center"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={
                                prefersReducedMotion
                                  ? { height: "auto", opacity: 1 }
                                  : { height: 0, opacity: 0 }
                              }
                              animate={{ height: "auto", opacity: 1 }}
                              exit={
                                prefersReducedMotion
                                  ? { height: "auto", opacity: 1 }
                                  : { height: 0, opacity: 0 }
                              }
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : {
                                      type: "spring",
                                      stiffness: 220,
                                      damping: 28,
                                    }
                              }
                              className="overflow-hidden"
                            >
                              <div className="px-6 md:px-8 pb-6 md:pb-8">
                                <div className="h-px w-full bg-linear-to-r from-transparent via-stone-200 to-transparent mb-6" />
                                <p className="font-body text-sm text-stone-600 leading-relaxed">
                                  {synopsisLead}
                                </p>
                                <div className="mt-6 flex items-center justify-between gap-6">
                                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-stone-500">
                                    <span className="crosshair-marker scale-75 opacity-50" />
                                    {BOOK.publisher} - {BOOK.year}
                                  </div>
                                  <a
                                    href={CTA_LINKS.preorder.href}
                                    className="text-xs font-semibold uppercase tracking-[0.25em] text-crimson-700 hover:text-crimson-600 transition-colors"
                                  >
                                    Pre-order
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Side accent */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            "absolute top-0 bottom-0 w-1 bg-crimson-600",
                            align === "right" ? "right-0" : "left-0",
                            isOpen
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-60",
                            "transition-opacity duration-300",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
