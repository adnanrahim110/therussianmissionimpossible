"use client";

import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { mythPoll } from "@/lib/content";
import { cn } from "@/lib/utils";

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
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl border border-stone-700/85 bg-linear-to-br from-stone-900/90 via-stone-900/86 to-stone-950/94 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/6 md:p-8">
              <SectionIntro
                title={mythPoll.title}
                body={mythPoll.intro}
                theme="editorial"
                tone="dark"
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-stone-700/85 bg-linear-to-br from-stone-900/90 via-stone-900/86 to-stone-950/94 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/6 md:p-8">
              <SectionIntro
                title={mythPoll.background.title}
                titleClassName="text-xl md:text-2xl lg:text-3xl xl:text-[37px] font-semibold"
                body={mythPoll.background.body.join(" ")}
                showDivider={false}
                tone="dark"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {mythPoll.sections.map((section, index) => (
              <div
                key={section.title}
                className={cn(
                  "intel-panel rounded-3xl p-6 md:p-8",
                  index < 2 && "xl:col-span-3",
                  index === 2 && "md:col-span-2 xl:col-span-6",
                )}
              >
                <p className="font-ui text-xl lg:text-4xl tracking-wider font-semibold uppercase text-crimson-300">
                  {section.title}
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone-200 md:text-lg">
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
