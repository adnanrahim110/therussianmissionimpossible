"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

function DossierCard({ dossier, index, onClick }) {
  const hasPhoto = !!dossier.photo;
  const fileNum = String(index + 1).padStart(3, "0");

  return (
    <article
      className="dossier-card dossier-corner-mark group rounded-lg cursor-pointer transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(242,13,13,0.06)]"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="dossier-scanlines relative z-10">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-stone-800/60 px-4 py-2.5">
          <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-stone-500">
            File {fileNum}
          </span>
          <span className="dossier-stamp">Declassified</span>
        </div>

        {/* Photo + info */}
        <div className="flex gap-0">
          {/* Photo column */}
          <div className="relative w-28 shrink-0 sm:w-36 md:w-40">
            {hasPhoto ? (
              <div className="relative h-full min-h-[160px]">
                <img
                  src={dossier.photo}
                  alt={dossier.callsign}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-950/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
              </div>
            ) : (
              <div className="flex h-full min-h-[160px] items-center justify-center bg-stone-900/60">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-full border border-stone-700/60 bg-stone-800/40 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-stone-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
                      />
                    </svg>
                  </div>
                  <span className="font-ui text-[9px] uppercase tracking-[0.25em] text-stone-600">
                    Classified
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Info column */}
          <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
            <div>
              {/* Callsign */}
              <h3 className="font-heading text-2xl leading-none text-stone-50 sm:text-3xl">
                &ldquo;{dossier.callsign}&rdquo;
              </h3>

              {/* Archetype */}
              <div className="mt-2 flex items-center gap-2">
                <span className="h-px flex-1 max-w-6 bg-accent/40" />
                <span className="font-ui text-[10px] uppercase tracking-[0.2em] text-accent/80">
                  {dossier.archetype}
                </span>
              </div>

              {/* Role */}
              <p className="mt-2 font-ui text-[11px] uppercase tracking-[0.15em] text-stone-400">
                {dossier.role}
              </p>

              {/* Summary excerpt */}
              <p className="mt-3 text-sm leading-relaxed text-stone-300 line-clamp-2">
                {dossier.summary}
              </p>
            </div>

            {/* Mentality quote */}
            <div className="mt-4 border-l-2 border-accent/30 pl-3">
              <p className="font-ui text-xs italic leading-relaxed text-stone-400">
                &ldquo;{dossier.mentality}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stone-800/40 px-4 py-2">
          <div className="flex items-center gap-3">
            {dossier.traits.slice(0, 2).map((trait) => (
              <span
                key={trait}
                className="font-ui text-[9px] uppercase tracking-[0.15em] text-stone-500"
              >
                {trait}
              </span>
            ))}
          </div>
          <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-stone-600 transition-colors group-hover:text-accent/60">
            Open File &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}

function DossierModal({ dossier, index, onClose, onPrev, onNext, canPrev, canNext }) {
  const fileNum = String(index + 1).padStart(3, "0");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canPrev) onPrev();
      if (e.key === "ArrowRight" && canNext) onNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext, canPrev, canNext]);

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/94 p-3 sm:p-6"
      style={{ zIndex: 2147483647 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier: ${dossier.callsign}`}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close dossier"
        onClick={onClose}
        className="absolute right-3 top-3 z-50 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white transition-all duration-300 hover:scale-105 hover:border-white/55 hover:bg-black/82 hover:text-accent sm:right-4 sm:top-4"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </svg>
      </button>

      {/* Nav buttons */}
      <button
        type="button"
        aria-label="Previous dossier"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={!canPrev}
        className="absolute left-3 top-1/2 z-50 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white transition-all duration-300 hover:scale-105 hover:border-white/45 hover:bg-black/78 disabled:cursor-not-allowed disabled:opacity-30 sm:left-4"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next dossier"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={!canNext}
        className="absolute right-3 top-1/2 z-50 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white transition-all duration-300 hover:scale-105 hover:border-white/45 hover:bg-black/78 disabled:cursor-not-allowed disabled:opacity-30 sm:right-4"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>

      {/* Dossier content */}
      <div
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dossier-card dossier-corner-mark flex flex-col overflow-hidden rounded-lg">
          <div className="dossier-scanlines relative z-10 flex flex-col overflow-hidden">
            {/* Top classification bar — pinned */}
            <div className="shrink-0 flex items-center justify-between border-b border-stone-800/60 px-5 py-3 sm:px-8">
              <div className="flex items-center gap-4">
                <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-stone-500">
                  Dossier File {fileNum}
                </span>
                <span className="dossier-stamp-alt">
                  Operation Stream 3.0
                </span>
              </div>
              <span className="dossier-stamp">Declassified</span>
            </div>

            {/* Scrollable body */}
            <div className="dossier-scroll min-h-0 flex-1 p-5 sm:p-8">
              {/* Photo + Primary Info row */}
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Photo */}
                <div className="shrink-0">
                  {dossier.photo ? (
                    <div className="relative h-52 w-40 overflow-hidden rounded border border-stone-700/60 sm:h-60 sm:w-44">
                      <img
                        src={dossier.photo}
                        alt={dossier.callsign}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent" />
                      {/* Corner brackets on photo */}
                      <div className="absolute top-1.5 left-1.5 h-3 w-3 border-t border-l border-accent/40" />
                      <div className="absolute top-1.5 right-1.5 h-3 w-3 border-t border-r border-accent/40" />
                      <div className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b border-l border-accent/40" />
                      <div className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b border-r border-accent/40" />
                    </div>
                  ) : (
                    <div className="flex h-52 w-40 items-center justify-center rounded border border-stone-700/40 bg-stone-900/50 sm:h-60 sm:w-44">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-stone-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
                          />
                        </svg>
                        <span className="mt-2 block font-ui text-[9px] uppercase tracking-[0.25em] text-stone-600">
                          Photo Classified
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary info */}
                <div className="flex-1">
                  <h2 className="font-heading text-4xl leading-none text-stone-50 sm:text-5xl">
                    &ldquo;{dossier.callsign}&rdquo;
                  </h2>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-px w-8 bg-accent/50" />
                    <span className="font-ui text-xs uppercase tracking-[0.25em] text-accent/90">
                      {dossier.archetype}
                    </span>
                  </div>

                  <div className="dossier-divider my-4" />

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <span className="dossier-field-label">Designation</span>
                      <p className="mt-0.5 text-sm text-stone-200">{dossier.role}</p>
                    </div>
                    <div>
                      <span className="dossier-field-label">Classification</span>
                      <p className="mt-0.5 text-sm text-stone-200">Active Personnel File</p>
                    </div>
                  </div>

                  {/* Mentality */}
                  <div className="mt-5 rounded border border-accent/15 bg-accent/[0.03] px-4 py-3">
                    <span className="dossier-field-label">Operational Mentality</span>
                    <p className="mt-1 font-heading text-lg leading-tight text-stone-100 sm:text-xl">
                      &ldquo;{dossier.mentality}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="dossier-divider my-6" />

              {/* Subject Profile */}
              <div>
                <span className="dossier-field-label">Subject Profile</span>
                <p className="mt-2 text-sm leading-relaxed text-stone-300 sm:text-base">
                  {dossier.summary}
                </p>
              </div>

              {/* Traits grid */}
              <div className="mt-6">
                <span className="dossier-field-label">Identified Characteristics</span>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {dossier.traits.map((trait, i) => (
                    <div
                      key={trait}
                      className="flex items-center gap-2.5 rounded border border-stone-800/40 bg-stone-900/30 px-3 py-2"
                    >
                      <span className="font-ui text-[10px] text-accent/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-stone-300">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analysis */}
              <div className="mt-6">
                <span className="dossier-field-label">Behavioral Analysis</span>
                <p className="mt-2 text-sm leading-relaxed text-stone-400 italic">
                  {dossier.analysis}
                </p>
              </div>

              {/* View full dossier link */}
              <div className="dossier-divider my-6" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                  <span className="font-ui text-[9px] uppercase tracking-[0.25em] text-stone-500">
                    End of File {fileNum}
                  </span>
                </div>
                <Link
                  href={`/bio/${dossier.callsign.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                  className="font-ui text-[11px] uppercase tracking-[0.2em] text-stone-400 transition-colors hover:text-accent"
                  onClick={(e) => e.stopPropagation()}
                >
                  Full Dossier &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function DossierGrid({ dossiers }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const canPrev = activeIndex !== null && activeIndex > 0;
  const canNext = activeIndex !== null && activeIndex < dossiers.length - 1;

  return (
    <div className="mt-10">
      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {dossiers.map((dossier, i) => (
          <DossierCard
            key={dossier.callsign}
            dossier={dossier}
            index={i}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* Modal */}
      {mounted && activeIndex !== null && (
        <DossierModal
          dossier={dossiers[activeIndex]}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={() => canPrev && setActiveIndex((v) => v - 1)}
          onNext={() => canNext && setActiveIndex((v) => v + 1)}
          canPrev={canPrev}
          canNext={canNext}
        />
      )}
    </div>
  );
}
