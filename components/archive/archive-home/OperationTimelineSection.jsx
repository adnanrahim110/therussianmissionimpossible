"use client";

import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { operationOverview, timelinePhases } from "@/lib/content";

export function OperationTimelineSection() {
  return (
    <section id="the-operation" className="section-tone-paper relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-overlay-light opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 paper-rules opacity-18"
      />

      <Container className="section-padding relative z-10">
        <SectionIntro
          eyebrow={operationOverview.eyebrow}
          title={operationOverview.title}
          body={operationOverview.body}
          theme="editorial"
          tone="dark"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {timelinePhases.map((phase) => (
            <article
              key={phase.code}
              className="intel-panel relative overflow-hidden rounded-3xl p-5 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 blueprint-grid opacity-30"
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-4">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-accent">
                    {phase.code}
                  </span>
                  {phase.sequenceLabel && (
                    <span className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
                      {phase.sequenceLabel}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.88] text-stone-50">
                  {phase.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-stone-200 md:text-lg">
                  {phase.summary}
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/24 p-4">
                  <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                    DIRECTIVE EXCERPT
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-200 md:text-base">
                    {phase.excerpt}
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  {phase.details.map((detail, detailIndex) => (
                    <div
                      key={detail}
                      className="rounded-2xl border border-white/10 bg-white/4 p-4"
                    >
                      <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                        DETAIL {String(detailIndex + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-stone-200">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
