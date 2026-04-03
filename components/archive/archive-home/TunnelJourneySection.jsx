"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CursorGlowField } from "@/components/ui/CursorGlowField";
import { purchaseCtas } from "@/lib/constants";
import { tunnelScenes, tunnelSection } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TunnelJourneySection() {
  return (
    <section
      id="the-tunnel"
      className="section-tone-void relative overflow-hidden"
    >
      <CursorGlowField
        className="opacity-28"
        size={640}
        color="rgba(203, 47, 67, 0.08)"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-18"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(237,240,242,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,240,242,0.03) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      <Container className="section-padding relative z-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:items-end">
          <div>
            <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
              {tunnelSection.title}
            </p>
            <h2 className="mt-5 font-heading text-[clamp(2.25rem,5vw,3rem)] leading-none text-stone-50 max-w-xl">
              {tunnelSection.subtitle}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-300 md:text-lg">
              {tunnelSection.intro}
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8">
            <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
              Access the Full Story
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-200 md:text-base">
              Continue from this tunnel chapter into the complete operation
              record with structured context, timelines, and witness-driven
              notes.
            </p>
            <div className="mt-6">
              <Button variant="signal" href={purchaseCtas.operation.href}>
                {purchaseCtas.operation.label}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tunnelScenes.map((scene, index) => (
            <article
              key={scene.id}
              className={cn(
                "rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6",
                index === 0 && "md:col-span-2",
                index === 1 && "xl:col-span-2",
                index === tunnelScenes.length - 1 &&
                  "md:col-span-2 xl:col-span-4",
              )}
            >
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-medal-200">
                {scene.marker}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-stone-50 normal-case md:text-3xl">
                {scene.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-200 md:text-base">
                {scene.summary}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
