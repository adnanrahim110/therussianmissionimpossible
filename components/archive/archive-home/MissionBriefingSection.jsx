"use client";

import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { briefingVideo } from "@/lib/content";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { DossierHeader } from "./DossierHeader";

export function MissionBriefingSection() {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <section
      id="the-briefing"
      className="section-padding relative border-b border-stone-800"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-30"
      />
      <Container className="relative z-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <DossierHeader
            code={briefingVideo.label}
            title={briefingVideo.title}
            subtitle={briefingVideo.summary}
          />
          <p className="mt-8 text-base leading-relaxed text-stone-300">
            {briefingVideo.placeholderNote}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="archive-shell overflow-hidden">
            <div className="relative aspect-video">
              <div
                aria-hidden="true"
                className="absolute inset-0 archive-map opacity-80"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 scanline-overlay opacity-30"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-stone-950 via-transparent to-crimson-950/40" />
              <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                    Incoming briefing
                  </span>
                  <span className="rounded-full border border-stone-700 px-2 py-1 font-ui text-[10px] uppercase tracking-[0.24em] text-stone-300">
                    {briefingVideo.status}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-6xl leading-[0.85] text-stone-50 md:text-7xl">
                    Intelligence cut
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-200 md:text-base">
                    This placeholder is intentionally styled like a locked
                    briefing reel so it can be replaced cleanly once the client
                    delivers final media.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-[2px] border border-stone-700 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-100 transition-colors hover:border-stone-500"
                    onClick={() => setShowNotes((value) => !value)}
                  >
                    {showNotes
                      ? "Hide Briefing Notes"
                      : "Preview Briefing Notes"}
                  </button>
                  <Link
                    href={purchaseCtas.press.href}
                    className="rounded-[2px] border border-crimson-700 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-crimson-300 transition-colors hover:bg-crimson-600 hover:text-white"
                  >
                    {purchaseCtas.press.label}
                  </Link>
                </div>
              </div>
            </div>
            <motion.div
              initial={false}
              animate={{
                height: showNotes ? "auto" : 0,
                opacity: showNotes ? 1 : 0,
              }}
              className="overflow-hidden border-t border-stone-800"
            >
              <div className="grid gap-4 p-6 md:grid-cols-2">
                {briefingVideo.beats.map((beat) => (
                  <div
                    key={beat}
                    className="rounded-[2px] border border-stone-800 bg-stone-950/70 p-4"
                  >
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                      Briefing beat
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
