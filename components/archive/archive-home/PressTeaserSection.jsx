"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { missionFileDownload, pressAssets } from "@/lib/content";
import { cn } from "@/lib/utils";

import { DossierHeader } from "./DossierHeader";

export function PressTeaserSection() {
  const readyCount = pressAssets.filter(
    (asset) => asset.status === "ready",
  ).length;

  return (
    <section
      id="the-press"
      className="section-padding relative border-b border-stone-800"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 archive-map opacity-35"
      />
      <Container className="relative z-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <DossierHeader
            code="File 09"
            title="Press and Downloads"
            subtitle="The client wants a dedicated media area with downloadable material, bios, summary, and contact information. This teaser drives into the future `/press` route."
          />
          <div className="mt-8 rounded-[2px] border border-stone-800 bg-stone-900/70 p-6">
            <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Mission file download
            </p>
            <h3 className="mt-3 font-heading text-4xl leading-none text-stone-50">
              {missionFileDownload.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              {missionFileDownload.summary}
            </p>
            <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
              Status: {missionFileDownload.status}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 md:grid-cols-2">
            {pressAssets.map((asset) => (
              <div key={asset.id} className="archive-shell p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid-overlay-dark opacity-30"
                />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                      {asset.type}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-1 font-ui text-[10px] uppercase tracking-[0.24em]",
                        asset.status === "ready"
                          ? "border-olive-700 text-olive-200"
                          : "border-stone-700 text-stone-400",
                      )}
                    >
                      {asset.status}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-4xl leading-none text-stone-50">
                    {asset.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">
                    {asset.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[2px] border border-stone-800 bg-stone-900/70 p-6">
            <p className="text-sm leading-relaxed text-stone-300">
              {readyCount} of {pressAssets.length} press assets are already
              modeled in the archive and can be surfaced cleanly without broken
              links.
            </p>
            <Button href="/press">{purchaseCtas.press.label}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
