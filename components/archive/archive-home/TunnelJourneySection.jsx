"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { tunnelScenes } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { DossierHeader } from "./DossierHeader";

export function TunnelJourneySection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });
  const scaleFrame = useTransform(smooth, [0, 1], [0.78, 1.25]);
  const frameOpacity = useTransform(smooth, [0, 1], [0.2, 0.9]);
  const markerPosition = useTransform(
    smooth,
    [0, 1],
    [0, tunnelScenes.length - 1],
  );
  const markerLabel = useTransform(markerPosition, (value) => {
    const index = Math.min(
      tunnelScenes.length - 1,
      Math.max(0, Math.round(value)),
    );
    return tunnelScenes[index].marker;
  });
  const aperture = useMotionTemplate`scale(${scaleFrame})`;

  return (
    <section
      id="the-tunnel"
      ref={sectionRef}
      className="relative border-b border-stone-800 bg-stone-950"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 archive-map opacity-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-80"
      />
      <div className="relative" style={{ height: "150vh" }}>
        <div className="sticky top-0 flex min-h-screen-safe items-center">
          <Container className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <DossierHeader
                code="File 05"
                title="The Tunnel"
                subtitle="The client called this the main interactive feature. Scroll should feel like physical advancement through the route, with markers, memorial context, and a final darkness prompt."
              />
              <div className="mt-8 space-y-4">
                {tunnelScenes.map((scene) => (
                  <div
                    key={scene.id}
                    className="rounded-[2px] border border-stone-800 bg-stone-900/70 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                        {scene.marker}
                      </span>
                      {scene.memorial && (
                        <span className="rounded-full border border-stone-700 px-2 py-1 font-ui text-[10px] uppercase tracking-[0.24em] text-stone-300">
                          Memorial marker
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-heading text-3xl leading-none text-stone-50">
                      {scene.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-300">
                      {scene.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="archive-shell relative min-h-112 overflow-hidden p-8 md:p-10">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid-overlay-dark opacity-30"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 scanline-overlay opacity-25"
                />
                <div className="relative flex h-full min-h-96 items-center justify-center">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "absolute rounded-[2px] border border-stone-700/70",
                        index === 4 && "border-crimson-700/80",
                      )}
                      style={
                        prefersReducedMotion
                          ? { inset: `${index * 7}%` }
                          : {
                              transform: aperture,
                              opacity: frameOpacity,
                              inset: `${index * 7}%`,
                            }
                      }
                    />
                  ))}

                  <div className="relative z-10 w-full max-w-lg rounded-[2px] border border-stone-800 bg-stone-950/80 p-6">
                    <div className="flex items-center justify-between gap-6">
                      <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                        Current distance
                      </span>
                      <motion.span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                        {markerLabel}
                      </motion.span>
                    </div>
                    <p className="mt-6 font-heading text-6xl leading-[0.85] text-stone-50 md:text-7xl">
                      Scroll the tunnel
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-stone-300">
                      Distance markers, scene changes, and the final darkness
                      prompt all belong here. The visual is abstract on purpose
                      so the client can replace it with real route material
                      later.
                    </p>
                    <div className="mt-8 border-t border-stone-800 pt-6">
                      <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                        Exit line
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-stone-200">
                        Now imagine completing this mission in total darkness.
                      </p>
                    </div>
                    <div className="mt-8">
                      <Button href={purchaseCtas.operation.href}>
                        {purchaseCtas.operation.label}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
