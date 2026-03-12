"use client";

import { Container } from "@/components/ui/Container";
import { mapLocations } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { DossierHeader } from "./DossierHeader";

export function MissionMapSection() {
  const [selectedLocationId, setSelectedLocationId] = useState(
    mapLocations[0]?.id ?? null,
  );
  const selectedLocation =
    mapLocations.find((location) => location.id === selectedLocationId) ??
    mapLocations[0];

  return (
    <section
      id="the-map"
      className="section-padding relative border-b border-stone-800"
    >
      <div aria-hidden="true" className="absolute inset-0 archive-map" />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-40"
      />
      <Container className="relative z-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <DossierHeader
            code="File 07"
            title="Map Section"
            subtitle="Locations are crucial to the story and its historical context. The map cannot be decorative; it needs to explain why place matters."
          />
          <div className="mt-8 space-y-3">
            {mapLocations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => setSelectedLocationId(location.id)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-[2px] border px-4 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-crimson-500",
                  selectedLocationId === location.id
                    ? "border-crimson-700 bg-stone-900/75"
                    : "border-stone-800 bg-stone-900/60 hover:border-stone-600",
                )}
              >
                <span className="crosshair-marker mt-1 scale-75 opacity-60" />
                <span>
                  <span className="block font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                    {location.region}
                  </span>
                  <span className="mt-2 block font-heading text-3xl leading-none text-stone-50">
                    {location.name}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-stone-300">
                    {location.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="archive-shell min-h-128 p-6 md:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 archive-map opacity-80"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-overlay-dark opacity-30"
            />
            <div className="relative h-full min-h-104">
              <div className="absolute inset-0 rounded-[2px] border border-stone-800/80" />
              <div className="absolute left-[8%] top-[14%] h-[68%] w-[78%] rounded-[999px] border border-stone-800/70" />
              {mapLocations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setSelectedLocationId(location.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:ring-2 focus-visible:ring-crimson-500"
                  style={{ left: location.x, top: location.y }}
                  aria-label={`Focus ${location.name}`}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                      selectedLocationId === location.id
                        ? "border-crimson-400 bg-crimson-600"
                        : "border-stone-400 bg-stone-900/90",
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-stone-50" />
                  </span>
                </button>
              ))}
              <div className="absolute bottom-0 left-0 right-0 rounded-[2px] border border-stone-800 bg-stone-950/85 p-6">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                      Selected location
                    </p>
                    <p className="mt-2 font-heading text-4xl leading-none text-stone-50">
                      {selectedLocation.name}
                    </p>
                  </div>
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                    {selectedLocation.region}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300">
                  {selectedLocation.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
