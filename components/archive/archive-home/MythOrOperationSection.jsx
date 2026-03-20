"use client";

import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { mythPoll } from "@/lib/content";

export function MythOrOperationSection() {
  return (
    <section id="myth-or-operation" className="section-tone-command relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-16"
      />
      <div
        aria-hidden="true"
        className="absolute right-[12%] top-[14%] h-72 w-72 rounded-full bg-crimson-700/12 blur-[150px]"
      />

      <Container className="section-padding relative z-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="dossier-paper rounded-3xl p-5 md:p-7">
            <SectionIntro
              title={mythPoll.title}
              body={mythPoll.intro}
              theme="editorial"
              tone="light"
            />
          </div>

          <div className="grid gap-4">
            {mythPoll.sections.map((section) => (
              <div key={section.title} className="intel-panel rounded-3xl p-5 md:p-7">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                  {section.title}
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone-300 md:text-lg">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
