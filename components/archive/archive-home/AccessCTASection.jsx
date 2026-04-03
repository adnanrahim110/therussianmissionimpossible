"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { purchasePage, seoBlocks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function AccessCTASection() {
  return (
    <section
      id="access"
      className="section-tone-paper relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-light opacity-34"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-rules opacity-18"
      />
      <div
        aria-hidden="true"
        className="absolute right-[12%] top-[16%] h-72 w-72 rounded-full bg-crimson-700/14 blur-[160px]"
      />

      <Container className="section-padding relative z-10">
        <div className="intel-panel rounded-3xl p-6 md:p-8 lg:p-12">
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="crosshair-marker scale-75 opacity-70" />
                <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                  {purchasePage.label}
                </span>
              </div>
              <h2 className="mt-6 max-w-4xl font-heading text-3xl leading-[0.88] text-stone-50 sm:text-4xl md:text-5xl lg:text-6xl">
                {purchasePage.title}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-200 md:text-lg">
                {purchasePage.synopsis}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="signal"
                  href={purchaseCtas.archive.href}
                >
                  {purchaseCtas.archive.label}
                </Button>
                <Button
                  size="lg"
                  variant="quiet"
                  href={purchaseCtas.instructions.href}
                >
                  {purchaseCtas.instructions.label}
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {seoBlocks.map((block, index) => (
                <div
                  key={block.title}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-black/20 p-4",
                    index === 0 && "md:col-span-2 lg:col-span-1",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                      {block.title}
                    </p>
                    <span className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300 md:text-base">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
