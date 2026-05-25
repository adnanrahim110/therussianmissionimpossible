"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  clamp,
  dispatchTunnelHeaderVisibility,
  getStopIndexByProgress,
  normalizeStops,
} from "./utils";
import { TunnelScene } from "./TunnelScene";

export function TunnelExperience({ stops = [] }) {
  const componentRef = useRef(null);
  const stageRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const normalizedStops = useMemo(() => normalizeStops(stops), [stops]);
  const lastIndex = Math.max(normalizedStops.length - 1, 0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => dispatchTunnelHeaderVisibility(false);
  }, []);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const trigger = ScrollTrigger.create({
            id: "operation-stream-pipeline-scene",
            trigger: stage,
            start: "top top",
            end: `+=${window.innerHeight * (normalizedStops.length + 1)}`,
            pin: Boolean(conditions?.desktop),
            scrub: conditions?.reduce ? false : 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => dispatchTunnelHeaderVisibility(true),
            onEnterBack: () => dispatchTunnelHeaderVisibility(true),
            onLeave: () => dispatchTunnelHeaderVisibility(false),
            onLeaveBack: () => dispatchTunnelHeaderVisibility(false),
            onRefresh: (self) =>
              dispatchTunnelHeaderVisibility(Boolean(self.isActive)),
            snap: false,
            onUpdate(self) {
              const nextProgress = clamp(self.progress, 0, 1);
              const nextIndex = getStopIndexByProgress(
                normalizedStops,
                nextProgress,
              );

              setProgress(nextProgress);
              setActiveIndex(nextIndex);
            },
          });

          scrollTriggerRef.current = trigger;
          dispatchTunnelHeaderVisibility(Boolean(trigger.isActive));

          return () => {
            dispatchTunnelHeaderVisibility(false);
            trigger.kill();
            scrollTriggerRef.current = null;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: componentRef, dependencies: [normalizedStops.length] },
  );

  const jumpToStop = (index) => {
    const clampedIndex = clamp(index, 0, lastIndex);
    const nextProgress = normalizedStops[clampedIndex]?.progress ?? 0;

    setProgress(nextProgress);
    setActiveIndex(clampedIndex);

    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const target = trigger.start + (trigger.end - trigger.start) * nextProgress;

    gsap.to(window, {
      scrollTo: target,
      duration: 0.85,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      ref={componentRef}
      data-hide-header
      className="relative w-full max-w-full overflow-x-hidden bg-stone-950 text-white"
    >
      <div
        ref={stageRef}
        className="relative h-screen min-h-[42rem] w-full overflow-hidden bg-black"
      >
        <TunnelScene
          progress={progress}
          activeIndex={activeIndex}
          stops={normalizedStops}
          onSelectStop={jumpToStop}
        />
      </div>
    </section>
  );
}
