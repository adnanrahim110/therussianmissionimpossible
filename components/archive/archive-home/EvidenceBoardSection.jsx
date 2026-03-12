"use client";

import { Container } from "@/components/ui/Container";
import { evidenceItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { DossierHeader } from "./DossierHeader";

export function EvidenceBoardSection() {
  const [selectedId, setSelectedId] = useState(evidenceItems[0]?.id ?? null);
  const selectedItem =
    evidenceItems.find((item) => item.id === selectedId) ?? evidenceItems[0];

  return (
    <section
      id="the-evidence"
      className="section-padding relative border-b border-stone-800"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-30"
      />
      <Container className="relative z-10">
        <DossierHeader
          code="File 04"
          title="The Evidence"
          subtitle="A war-room board of maps, documents, photographs, quotes, and diagrams. Each tile is clickable and reveals a detail panel instead of flattening everything into one static collage."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {evidenceItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  "archive-shell min-h-48 p-6 text-left transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-crimson-500",
                  selectedId === item.id && "border-crimson-700",
                )}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid-overlay-dark opacity-30"
                />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                      {item.type}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-1 font-ui text-[10px] uppercase tracking-[0.24em]",
                        item.status === "ready"
                          ? "border-olive-700 text-olive-200"
                          : "border-stone-700 text-stone-400",
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-4xl leading-none text-stone-50">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-stone-300">
                    {item.summary}
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="redacted-line w-18" />
                    <span className="redacted-line w-10" />
                    <span className="redacted-line w-24" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div
              className="archive-shell sticky top-24 p-6 md:p-8"
              style={{ top: "calc(var(--header-h) + 16px)" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-35"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                    Selected evidence
                  </span>
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                    {selectedItem.status}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-5xl leading-[0.9] text-stone-50">
                  {selectedItem.title}
                </h3>
                <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                  {selectedItem.type}
                </p>
                <p className="mt-6 text-base leading-relaxed text-stone-200">
                  {selectedItem.detail}
                </p>
                <div className="mt-8 rounded-[2px] border border-stone-800 bg-stone-950/60 p-4">
                  <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                    Why it matters
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">
                    The evidence board is meant to increase time-on-site by
                    inviting curiosity and comparison. The detail panel keeps
                    that interaction structured and readable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
