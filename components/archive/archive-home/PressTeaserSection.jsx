"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pressAssets, missionFileDownload } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PressTeaserSection() {
  const readyCount = pressAssets.filter(
    (asset) => asset.status === "ready",
  ).length;

  return (
    <section
      id="the-press"
      className="section-tone-command relative"
    >
      <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-14" />

      <Container className="section-padding relative z-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro
            eyebrow="File 09"
            title="Press and Downloads"
            body="This teaser now behaves like a media shelf: cleaner, lighter in density, and easier to scan for status."
            theme="command"
            tone="dark"
          />

          <div className="glass-panel mt-6 rounded-3xl p-5">
            <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
              Mission file download
            </p>
            <h3 className="mt-4 font-body text-xl font-semibold tracking-[-0.03em] text-stone-50 md:text-2xl lg:text-3xl">
              {missionFileDownload.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              {missionFileDownload.summary}
            </p>
            <p className="mt-5 font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
              Status: {missionFileDownload.status}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 md:grid-cols-2">
            {pressAssets.map((asset) => (
              <div key={asset.id} className="intel-panel rounded-2xl p-4">
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
                          : "border-stone-600 text-stone-400",
                      )}
                    >
                      {asset.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-body text-lg font-semibold tracking-[-0.03em] text-stone-50 md:text-xl lg:text-2xl">
                    {asset.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">
                    {asset.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel mt-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5">
            <p className="max-w-xl text-sm leading-relaxed text-stone-300">
              {readyCount} of {pressAssets.length} press assets are already
              modeled in the archive and can be surfaced cleanly without broken
              links.
            </p>
            <Button variant="signal" href="/press">
              Open press desk
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
