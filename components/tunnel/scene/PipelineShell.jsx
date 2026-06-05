"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { usePbrTextureSet } from "../materials";
import {
  createRunoffStreakTexture,
  createSootWallTexture,
  createWallGrimeTexture,
  SOOT_WALL_TEXTURE_VERSION,
} from "../textures";
import { createSeededRandom, radialPoint } from "../utils";

export function PipelineShell({ curve }) {
  const sootWallMap = useMemo(
    () => createSootWallTexture(),
    [SOOT_WALL_TEXTURE_VERSION],
  );
  const wallSurfaceMaps = usePbrTextureSet(TUNNEL_TEXTURES.pipeRust, {
    repeat: [135, 9],
    anisotropy: 16,
  });

  const geometry = useMemo(() => {
    const tube = new THREE.TubeGeometry(curve, 280, PIPE_RADIUS, 128, false);
    return tube;
  }, [curve]);

  const wallDetailMaps = useMemo(() => {
    const { map: _unusedColorMap, ...detailMaps } = wallSurfaceMaps;
    return detailMaps;
  }, [wallSurfaceMaps]);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <primitive attach="geometry" object={geometry} />
        <meshPhysicalMaterial
          {...wallDetailMaps}
          map={sootWallMap}
          side={THREE.BackSide}
          color="#a2adb0"
          roughness={0.94}
          metalness={0.2}
          normalScale={new THREE.Vector2(0.82, 0.82)}
          envMapIntensity={0.025}
          clearcoat={0}
          clearcoatRoughness={1}
          displacementScale={0.006}
          displacementBias={-0.003}
          bumpScale={0.008}
        />
      </mesh>

      <LowerPipeStains curve={curve} />
      <PipeWallGrime curve={curve} />
      <PipeWallDeposits curve={curve} />
      <WallRunoffStreaks curve={curve} />
    </group>
  );
}

function LowerPipeStains({ curve }) {
  const stainTexture = useMemo(() => createWallGrimeTexture(), []);

  const stains = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => {
      const t = 0.045 + index * 0.052;
      const angle = -Math.PI / 2 + (index % 3 - 1) * 0.17;

      return {
        id: `lower-pipe-stain-${index}`,
        position: radialPoint(curve, t, angle, 0.002),
        angle,
        width: 0.28 + (index % 4) * 0.045,
        height: 0.52 + (index % 5) * 0.08,
        opacity: 0.25 + (index % 4) * 0.025,
      };
    });
  }, [curve]);

  if (!stainTexture) return null;

  return (
    <group>
      {stains.map((stain) => (
        <mesh
          key={stain.id}
          position={stain.position}
          rotation={[Math.PI / 2, 0, stain.angle + Math.PI / 2]}
          renderOrder={1}
        >
          <planeGeometry args={[stain.width, stain.height]} />
          <meshBasicMaterial
            map={stainTexture}
            color="#030303"
            transparent
            premultipliedAlpha
            opacity={stain.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.MultiplyBlending}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      ))}
    </group>
  );
}

function PipeWallGrime({ curve }) {
  const grimeTexture = useMemo(() => createWallGrimeTexture(), []);

  const grime = useMemo(() => {
    return Array.from({ length: 26 }, (_, index) => {
      const side = index % 2 === 0 ? 1 : -1;
      const angle =
        side > 0
          ? Math.PI * (0.18 + (index % 7) * 0.045)
          : Math.PI * (0.82 - (index % 7) * 0.045);
      const t = 0.035 + index * 0.035;

      return {
        id: `pipe-wall-grime-${index}`,
        position: radialPoint(curve, t, angle, 0.002),
        angle,
        width: 0.18 + (index % 3) * 0.08,
        height: 0.5 + (index % 6) * 0.1,
        opacity: 0.14 + (index % 5) * 0.025,
      };
    });
  }, [curve]);

  if (!grimeTexture) return null;

  return (
    <group>
      {grime.map((item) => (
        <mesh
          key={item.id}
          position={item.position}
          rotation={[Math.PI / 2, 0, item.angle + Math.PI / 2]}
          renderOrder={1}
        >
          <planeGeometry args={[item.width, item.height]} />
          <meshBasicMaterial
            map={grimeTexture}
            color="#020303"
            transparent
            premultipliedAlpha
            opacity={item.opacity + 0.06}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.MultiplyBlending}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}
    </group>
  );
}

function PipeWallDeposits({ curve }) {
  const grimeTexture = useMemo(() => createWallGrimeTexture(), []);

  const deposits = useMemo(() => {
    const rng = createSeededRandom(7151);

    return Array.from({ length: 42 }, (_, index) => {
      const t = 0.03 + rng() * 0.92;
      const band = rng();
      const angle =
        band < 0.38
          ? -Math.PI / 2 + (rng() - 0.5) * 0.9
          : band < 0.72
            ? (rng() > 0.5 ? 1 : -1) * (0.24 + rng() * 0.34) * Math.PI
            : Math.PI / 2 + (rng() - 0.5) * 0.76;

      return {
        id: `pipe-wall-deposit-${index}`,
        position: radialPoint(curve, t, angle, 0.003),
        angle,
        rotation: (rng() - 0.5) * 0.35,
        width: 0.28 + rng() * 0.58,
        height: 0.42 + rng() * 0.92,
        opacity: 0.16 + rng() * 0.16,
      };
    });
  }, [curve]);

  if (!grimeTexture) return null;

  return (
    <group>
      {deposits.map((deposit) => (
        <mesh
          key={deposit.id}
          position={deposit.position}
          rotation={[
            Math.PI / 2,
            0,
            deposit.angle + Math.PI / 2 + deposit.rotation,
          ]}
          renderOrder={2}
        >
          <planeGeometry args={[deposit.width, deposit.height]} />
          <meshBasicMaterial
            map={grimeTexture}
            color="#050607"
            transparent
            premultipliedAlpha
            opacity={deposit.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.MultiplyBlending}
            polygonOffset
            polygonOffsetFactor={-3}
            polygonOffsetUnits={-3}
          />
        </mesh>
      ))}
    </group>
  );
}

function WallRunoffStreaks({ curve }) {
  const streakTexture = useMemo(() => createRunoffStreakTexture(), []);

  const streaks = useMemo(() => {
    const rng = createSeededRandom(9247);

    return Array.from({ length: 28 }, (_, index) => {
      const side = rng() > 0.5 ? 1 : -1;
      const angle =
        side * (0.18 + rng() * 0.28) * Math.PI +
        (rng() - 0.5) * 0.08;
      const t = 0.05 + rng() * 0.86;

      return {
        id: `wall-runoff-streak-${index}`,
        position: radialPoint(curve, t, angle, 0.004),
        angle,
        width: 0.05 + rng() * 0.08,
        height: 0.62 + rng() * 1.25,
        opacity: 0.18 + rng() * 0.16,
      };
    });
  }, [curve]);

  if (!streakTexture) return null;

  return (
    <group>
      {streaks.map((streak) => (
        <mesh
          key={streak.id}
          position={streak.position}
          rotation={[Math.PI / 2, 0, streak.angle + Math.PI / 2]}
          renderOrder={3}
        >
          <planeGeometry args={[streak.width, streak.height]} />
          <meshBasicMaterial
            map={streakTexture}
            color="#020303"
            transparent
            premultipliedAlpha
            opacity={streak.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.MultiplyBlending}
            polygonOffset
            polygonOffsetFactor={-4}
            polygonOffsetUnits={-4}
          />
        </mesh>
      ))}
    </group>
  );
}
