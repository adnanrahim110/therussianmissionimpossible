"use client";

import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { evidenceItems, evidenceSection } from "@/lib/content";

export function EvidenceBoardSection() {
  return (
    <section
      id="the-evidence"
      className="section-tone-paper relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_14%_15%,rgba(145,92,72,0.15),transparent_36%),radial-gradient(circle_at_88%_20%,rgba(188,29,71,0.14),transparent_30%),radial-gradient(circle_at_60%_82%,rgba(34,197,94,0.12),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-light opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-rules opacity-18"
      />

      <Container className="section-padding relative z-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="intel-panel rounded-3xl p-5 sm:p-7">
            <SectionIntro
              title={evidenceSection.title}
              body={evidenceSection.intro}
              theme="editorial"
              tone="dark"
            />

            <div className="mt-8 rounded-3xl border border-white/12 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
                    {evidenceSection.featuredLabel}
                  </p>
                  <p className="mt-1 font-ui text-[10px] uppercase tracking-[0.24em] text-accent">
                    {evidenceSection.featuredType}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 font-ui text-[10px] uppercase tracking-[0.24em] text-stone-300">
                  {evidenceSection.featuredTitle}
                </span>
              </div>

              <h3 className="mt-5 text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-stone-100">
                {evidenceSection.featuredTitle}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-300 sm:text-lg">
                {evidenceSection.featuredBody}
              </p>

              <div className="mt-7 rounded-3xl border border-white/15 bg-stone-950/75 p-5">
                <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                  {evidenceSection.featuredNoteTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-200">
                  {evidenceSection.featuredNote}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {evidenceItems.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-stone-300 bg-white/88 p-5 shadow-[0_12px_30px_rgba(52,46,38,0.08)]"
              >
                <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-crimson-700">
                  {item.type}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
