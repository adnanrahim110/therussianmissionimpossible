"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { purchaseCtas } from "@/lib/constants";
import { briefingVideo } from "@/lib/content";
import { motion } from "motion/react";
import { useState } from "react";

export function MissionBriefingSection() {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <section
      id="the-briefing"
      className="section-tone-paper relative"
    >
      <div aria-hidden="true" className="absolute inset-0 grid-overlay-light opacity-32" />
      <div aria-hidden="true" className="absolute inset-0 paper-rules opacity-18" />

      <Container className="section-padding relative z-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro
            eyebrow={briefingVideo.label}
            title={briefingVideo.title}
            body="The client wants a briefing reel, so this chapter now reads like a blueprint-and-film interface rather than another generic shell."
            theme="command"
            tone="dark"
          />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone-300">
            {briefingVideo.placeholderNote}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="intel-panel overflow-hidden rounded-3xl">
            <div className="relative aspect-video">
              <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-25" />
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-7 hidden w-10 rounded-full border border-white/10 bg-black/18 md:block"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-0 right-7 hidden w-10 rounded-full border border-white/10 bg-black/18 md:block"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-stone-950 via-stone-950/78 to-crimson-950/28" />
              <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                    Incoming briefing reel
                  </span>
                  <span className="rounded-full border border-white/10 px-2 py-1 font-ui text-[10px] uppercase tracking-[0.24em] text-stone-300">
                    {briefingVideo.status}
                  </span>
                </div>
                <div className="max-w-xl">
                  <p className="font-heading text-3xl leading-[0.88] text-stone-50 sm:text-4xl md:text-5xl lg:text-6xl">
                    Intelligence cut
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-200 md:text-base">
                    Styled as a locked reel deck, ready to swap in final media
                    when the client delivers assets.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="quiet"
                    onClick={() => setShowNotes((value) => !value)}
                  >
                    {showNotes ? "Hide briefing notes" : "Preview briefing notes"}
                  </Button>
                  <Button variant="signal" href={purchaseCtas.press.href}>
                    {purchaseCtas.press.label}
                  </Button>
                </div>
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: showNotes ? "auto" : 0,
                opacity: showNotes ? 1 : 0,
              }}
              className="overflow-hidden border-t border-white/8"
            >
              <div className="grid gap-4 p-6 md:grid-cols-2">
                {briefingVideo.beats.map((beat, index) => (
                  <div
                    key={beat}
                    className="rounded-xl border border-white/10 bg-black/18 p-4"
                  >
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                      Reel beat {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-200">
                      {beat}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
