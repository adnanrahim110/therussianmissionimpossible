"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { seoBlocks } from "@/lib/content";

export function AccessCTASection() {
  return (
    <section id="access" className="section-padding relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 archive-map" />
      <div
        aria-hidden="true"
        className="absolute inset-0 scanline-overlay opacity-25"
      />
      <Container className="relative z-10">
        <div className="archive-shell p-8 md:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid-overlay-dark opacity-30"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="crosshair-marker scale-75 opacity-70" />
                <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                  Final clearance
                </span>
              </div>
              <h2 className="mt-6 font-heading text-6xl leading-[0.85] text-stone-50 md:text-7xl">
                Access the full story.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200">
                The archive is built to provoke curiosity. The book is where the
                full mission narrative, context, and testimony are meant to
                resolve.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" href={purchaseCtas.archive.href}>
                  {purchaseCtas.archive.label}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  href={purchaseCtas.instructions.href}
                  className="border-stone-700 text-stone-100 hover:bg-stone-800 hover:text-stone-50"
                >
                  {purchaseCtas.instructions.label}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-4">
                {seoBlocks.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-[2px] border border-stone-800 bg-stone-950/65 p-4"
                  >
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                      {block.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-300">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
