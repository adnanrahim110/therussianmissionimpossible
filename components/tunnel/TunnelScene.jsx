"use client";

import { OperationBriefingCard } from "./overlays/OperationBriefingCard";
import { PipelineStatsCard } from "./overlays/PipelineStatsCard";
import { TacticalRouteMap } from "./overlays/TacticalRouteMap";
import { PipelineCanvas } from "./PipelineCanvas";
import { smoothstep } from "./utils";

export function TunnelScene({ progress, activeIndex, stops, onSelectStop }) {
  const entranceVignette = 1 - smoothstep(0.02, 0.18, progress);
  const exitFade = smoothstep(0.965, 1, progress);
  const uiOpacity = smoothstep(0.08, 0.12, progress);

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-black">
      <PipelineCanvas progress={progress} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(0,0,0,0.22)_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.22),transparent_30%,transparent_70%,rgba(0,0,0,0.26)),linear-gradient(180deg,rgba(255,255,255,0.018),transparent_48%,rgba(0,0,0,0.18))]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.018] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.45)_0_1px,transparent_1px_3px)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen bg-[radial-gradient(circle_at_28%_18%,rgba(255,220,170,0.22)_0_1px,transparent_2px),radial-gradient(circle_at_68%_42%,rgba(255,210,160,0.16)_0_1px,transparent_2px),radial-gradient(circle_at_48%_74%,rgba(255,240,210,0.12)_0_1px,transparent_2px)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.22)_0_1px,transparent_1px_5px)]" />

      <div
        className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_34%,rgba(0,0,0,0.45)_76%,rgba(0,0,0,0.76)_100%)]"
        style={{ opacity: entranceVignette }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ opacity: uiOpacity }}
      >
        <TacticalRouteMap
          stops={stops}
          activeIndex={activeIndex}
          progress={progress}
          onSelect={onSelectStop}
        />

        <OperationBriefingCard />
        <PipelineStatsCard />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(255,239,202,0.78)_0%,rgba(255,225,180,0.42)_38%,rgba(255,255,255,0.26)_100%)]"
        style={{ opacity: exitFade }}
      />
    </div>
  );
}
