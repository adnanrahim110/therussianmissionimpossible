"use client";

import { Container } from "@/components/ui/Container";
import { CursorGlowField } from "@/components/ui/CursorGlowField";
import { missionOverview, operationOverview } from "@/lib/content";
import { cn } from "@/lib/utils";

export function MissionSection() {
  return (
    <section
      id="the-mission"
      className="section-tone-obsidian relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32"
    >
      <CursorGlowField
        className="opacity-80"
        size={680}
        color="rgba(203, 47, 67, 0.14)"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-28"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute left-[72%] top-[18%] h-72 w-72 rounded-full bg-slate-400/12 blur-[140px]"
      />

      <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
          <div>
            <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-stone-400">
              {missionOverview.label}
            </p>
            <h1 className="mt-5 max-w-5xl font-heading text-[clamp(2.5rem,5vw+0.5rem,5rem)] leading-[0.88] text-stone-50">
              {missionOverview.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-200 md:text-lg lg:text-xl">
              {missionOverview.summary}
            </p>

            <div className="mt-8 max-w-3xl space-y-6 text-base md:text-lg leading-relaxed text-stone-300">
              {missionOverview.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8">
            <div className="relative">
              <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-accent">
                MISSION POINTS
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {missionOverview.points.map((point, index) => (
                  <div
                    key={point}
                    className={cn(
                      "rounded-2xl border border-white/10 bg-black/18 p-4",
                      index === 0 && "md:col-span-2 lg:col-span-1",
                    )}
                  >
                    <p className="font-ui text-[10px] uppercase tracking-[0.34em] text-stone-500">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-200 md:text-base">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/18 p-5">
                <p className="font-ui text-[10px] uppercase tracking-[0.34em] text-stone-500">
                  {operationOverview.eyebrow}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {operationOverview.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
