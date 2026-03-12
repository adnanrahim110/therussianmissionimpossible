"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { purchaseCtas } from "@/lib/constants";
import { missionOverview } from "@/lib/content";

export function MissionSection() {
  return (
    <section
      id="the-mission"
      className="relative overflow-hidden border-b border-stone-800 pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <div aria-hidden="true" className="absolute inset-0 archive-map" />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 scanline-overlay opacity-25"
      />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="crosshair-marker scale-75 opacity-70" />
              <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                {missionOverview.label}
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl font-heading text-[clamp(4.5rem,11vw,9rem)] leading-[0.82] text-stone-50">
              {missionOverview.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
              {missionOverview.summary}
            </p>
            <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-stone-300">
              {missionOverview.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" href={purchaseCtas.archive.href}>
                {purchaseCtas.archive.label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                href="#the-operation"
                className="border-stone-700 text-stone-100 hover:bg-stone-800 hover:text-stone-50"
              >
                Review the Operation
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="archive-shell p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-35"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-6">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                    Archive directives
                  </span>
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                    Access level 03
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  {missionOverview.directives.map((directive, index) => (
                    <div
                      key={directive}
                      className="flex gap-4 border-t border-stone-800 pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="font-ui text-[11px] uppercase tracking-[0.28em] text-stone-500">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm leading-relaxed text-stone-200">
                        {directive}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6">
                  {missionOverview.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[2px] border border-stone-800 bg-stone-950/60 p-4"
                    >
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        className="text-4xl leading-none text-stone-50"
                      />
                      <p className="mt-3 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
