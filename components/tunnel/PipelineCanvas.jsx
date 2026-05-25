"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { CableClamps } from "./scene/CableClamps";
import { CrawlerTracks } from "./scene/CrawlerTracks";
import { JunctionBoxes } from "./scene/JunctionBoxes";
import { NearDust } from "./scene/NearDust";
import { PipeCables } from "./scene/PipeCables";
import { PipeJoints } from "./scene/PipeJoints";
import { PipelineShell } from "./scene/PipelineShell";
import { RouteStencils } from "./scene/RouteStencils";
import { SedimentAndDebris } from "./scene/SedimentAndDebris";
import { TunnelEntrancePortal } from "./scene/TunnelEntrancePortal";
import { TunnelExitPortal } from "./scene/TunnelExitPortal";
import { VehicleCameraRig } from "./scene/VehicleCameraRig";
import { WallContactShadows } from "./scene/WallContactShadows";
import { WallScratches } from "./scene/WallScratches";
import { WetBottomRibbon } from "./scene/WetBottomRibbon";
import { createPipeCurve } from "./utils";

import { useProgress } from "@react-three/drei";

function CanvasLoader() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-[#060403]">
      <div className="flex flex-col items-center justify-center">
        <div className="text-[#ef233c] font-mono text-sm tracking-[0.3em] uppercase mb-3 text-center">
          Initializing Assets
        </div>
        <div className="w-48 h-[2px] bg-[#2a1711] overflow-hidden">
          <div 
            className="h-full bg-[#ef233c] transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="text-[#ef233c] font-mono text-xs mt-3 opacity-60">
          {progress.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

export function PipelineCanvas({ progress }) {
  const curve = useMemo(() => createPipeCurve(), []);

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          fov: 76,
          near: 0.025,
          far: 80,
          position: [0, -0.38, 2],
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.18;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        className="absolute inset-0"
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#020101", 3.2, 19]} />

        <Suspense fallback={null}>
          <PipelineShell curve={curve} />
          <WetBottomRibbon curve={curve} />
          <CrawlerTracks curve={curve} />
          <PipeJoints curve={curve} />
          <PipeCables curve={curve} />
          <CableClamps curve={curve} />
          <JunctionBoxes curve={curve} />
          <WallContactShadows curve={curve} />
          <RouteStencils curve={curve} />
          <WallScratches curve={curve} />
          <SedimentAndDebris curve={curve} />
          <NearDust progress={progress} curve={curve} />
          <TunnelEntrancePortal progress={progress} curve={curve} />
          <TunnelExitPortal progress={progress} curve={curve} />
        </Suspense>

        <VehicleCameraRig progress={progress} curve={curve} />
      </Canvas>
      
      <CanvasLoader />
    </>
  );
}
