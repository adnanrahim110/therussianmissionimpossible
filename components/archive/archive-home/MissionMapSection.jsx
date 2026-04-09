"use client";

import { BioJustifiedGallery } from "@/components/bio/BioJustifiedGallery";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { mapSection } from "@/lib/content";

const mapPhotos = [
  {
    src: "/imgs/map/1.jpeg",
    name: "Kursk Administrative Map",
  },
  {
    src: "/imgs/map/2.jpeg",
    name: "Operational District Detail",
  },
  {
    src: "/imgs/map/3.png",
    name: "Aerial Recon Snapshot",
  },
  {
    src: "/imgs/map/4.png",
    name: "Operation Stream Route Map",
  },
  {
    src: "/imgs/map/5.png",
    name: "Operation Stream Infographic",
  },
];

export function MissionMapSection() {
  return (
    <section id="the-map" className="section-tone-terrain relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 terrain-lines opacity-22"
      />
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[16%] h-72 w-72 rounded-full bg-medal-300/10 blur-[140px]"
      />

      <Container className="section-padding relative z-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionIntro
              title={mapSection.title}
              body={mapSection.summary}
              theme="command"
              tone="dark"
            />

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/28 p-6">
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-medal-200">
                MAP FRAGMENT
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-300 md:text-lg">
                {mapSection.detail}
              </p>
            </div>
          </div>

          <div className="intel-panel rounded-3xl p-6 md:p-8">
            <div className="rounded-3xl border border-white/10 bg-white/4 p-6">
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                WHY IT MATTERS
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-300 md:text-base">
                {mapSection.note}
              </p>
              <p className="mt-6 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                KEY EVIDENT POINTS
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone-300 md:text-base">
                {mapSection.keyPoints?.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-medal-300"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <BioJustifiedGallery
            photos={mapPhotos}
            showCardTitles={false}
            showModalTitle={false}
          />
        </div>
      </Container>
    </section>
  );
}
