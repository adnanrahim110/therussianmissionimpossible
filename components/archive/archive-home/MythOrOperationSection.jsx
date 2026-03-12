"use client";

import { Container } from "@/components/ui/Container";
import { mythPoll } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

import { DossierHeader } from "./DossierHeader";

export function MythOrOperationSection() {
  const [selection, setSelection] = useState(null);
  const responseTitle = useMemo(() => {
    if (selection === "Yes") return "You believe the operation happened.";
    if (selection === "No") return "You think the archive still needs proof.";
    if (selection === "Not sure") return "Uncertainty is part of the premise.";
    return "Cast a vote to reveal the supporting material.";
  }, [selection]);

  return (
    <section
      id="myth-or-operation"
      className="section-padding relative border-b border-stone-800"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 archive-map opacity-40"
      />
      <Container className="relative z-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <DossierHeader
            code={mythPoll.label}
            title={mythPoll.title}
            subtitle="The client explicitly wants the site to address skepticism head-on and convert that doubt into interaction."
          />
          <p className="mt-8 text-lg leading-relaxed text-stone-200">
            {mythPoll.question}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {mythPoll.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelection(option)}
                className={cn(
                  "rounded-[2px] border px-6 py-3 font-ui text-xs uppercase tracking-[0.28em] transition-colors focus-visible:ring-2 focus-visible:ring-crimson-500",
                  selection === option
                    ? "border-crimson-700 bg-crimson-600 text-white"
                    : "border-stone-800 bg-stone-900/70 text-stone-300 hover:border-stone-600 hover:text-stone-50",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="archive-shell h-full p-6 md:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-overlay-dark opacity-35"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-6">
                <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                  Reaction log
                </span>
                <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Participation enabled
                </span>
              </div>
              <h3 className="mt-6 font-heading text-4xl leading-none text-stone-50">
                {responseTitle}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-stone-300">
                After voting, the archive reveals the categories of material
                used to keep the conversation alive: diagrams, historical
                references, and book excerpts.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {mythPoll.supportMaterials.map((item) => (
                  <div
                    key={item.title}
                    className={cn(
                      "rounded-[2px] border border-stone-800 bg-stone-950/60 p-4 transition-opacity",
                      selection ? "opacity-100" : "opacity-60",
                    )}
                  >
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                      {item.type}
                    </p>
                    <h4 className="mt-3 font-heading text-3xl leading-none text-stone-50">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-stone-300">
                      {item.summary}
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
