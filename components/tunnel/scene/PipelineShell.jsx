"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { usePbrTextureSet } from "../materials";
import { radialPoint } from "../utils";

export function PipelineShell({ curve }) {
  const pipeMaps = usePbrTextureSet(TUNNEL_TEXTURES.pipeRust, {
    repeat: [400, 12],
    anisotropy: 16,
  });

  const geometry = useMemo(() => {
    const tube = new THREE.TubeGeometry(curve, 280, PIPE_RADIUS, 128, false);
    return tube;
  }, [curve]);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <primitive attach="geometry" object={geometry} />
        <meshPhysicalMaterial
          {...pipeMaps}
          side={THREE.BackSide}
          color="#42342c"
          roughness={0.88}
          metalness={0.85}
          normalScale={new THREE.Vector2(1.2, 1.2)}
          envMapIntensity={0.2}
          clearcoat={0.02}
          clearcoatRoughness={0.8}
          displacementScale={0.025}
          displacementBias={-0.0125}
          bumpScale={0.01}
        />
      </mesh>

      <LowerPipeStains curve={curve} />
      <PipeWallGrime curve={curve} />
    </group>
  );
}

function LowerPipeStains({ curve }) {
  const darkRustMaps = usePbrTextureSet(TUNNEL_TEXTURES.darkRust, {
    repeat: [0.75, 1.8],
    anisotropy: 6,
  });

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
            map={darkRustMaps.map}
            color="#120807"
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
  const grimeMaps = usePbrTextureSet(TUNNEL_TEXTURES.darkRust, {
    repeat: [0.55, 1.4],
    anisotropy: 6,
  });

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
            map={grimeMaps.map}
            color="#2c100b"
            transparent
            premultipliedAlpha
            opacity={item.opacity}
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
