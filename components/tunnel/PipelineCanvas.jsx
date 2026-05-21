"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { CableClamps } from "./scene/CableClamps";
import { CrawlerTracks } from "./scene/CrawlerTracks";
import { ForegroundOccluders } from "./scene/ForegroundOccluders";
import { JunctionBoxes } from "./scene/JunctionBoxes";
import { NearDust } from "./scene/NearDust";
import { PipeCables } from "./scene/PipeCables";
import { PipeRings } from "./scene/PipeRings";
import { PipelineShell } from "./scene/PipelineShell";
import { RepairPatches } from "./scene/RepairPatches";
import { RouteStencils } from "./scene/RouteStencils";
import { SedimentAndDebris } from "./scene/SedimentAndDebris";
import { TunnelEntrancePortal } from "./scene/TunnelEntrancePortal";
import { TunnelExitPortal } from "./scene/TunnelExitPortal";
import { VehicleCameraRig } from "./scene/VehicleCameraRig";
import { WallContactShadows } from "./scene/WallContactShadows";
import { WallScratches } from "./scene/WallScratches";
import { WetBottomRibbon } from "./scene/WetBottomRibbon";
import { createPipeCurve } from "./utils";

export function PipelineCanvas({ progress }) {
  const curve = useMemo(() => createPipeCurve(), []);

  return (
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
      <color attach="background" args={["#060403"]} />
      <fog attach="fog" args={["#130907", 3.2, 19]} />

      <ambientLight intensity={0.07} color="#6b4537" />

      <hemisphereLight
        skyColor="#3c261e"
        groundColor="#090403"
        intensity={0.14}
      />

      <Suspense fallback={null}>
        <PipelineShell curve={curve} />
        <WetBottomRibbon curve={curve} />
        <CrawlerTracks curve={curve} />
        <PipeRings curve={curve} />
        <PipeCables curve={curve} />
        <CableClamps curve={curve} />
        <RepairPatches curve={curve} />
        <JunctionBoxes curve={curve} />
        <WallContactShadows curve={curve} />
        <RouteStencils curve={curve} />
        <WallScratches curve={curve} />
        <SedimentAndDebris curve={curve} />
        <ForegroundOccluders curve={curve} />
        <NearDust progress={progress} curve={curve} />
        <TunnelEntrancePortal progress={progress} curve={curve} />
        <TunnelExitPortal progress={progress} curve={curve} />
      </Suspense>

      <VehicleCameraRig progress={progress} curve={curve} />
    </Canvas>
  );
}
