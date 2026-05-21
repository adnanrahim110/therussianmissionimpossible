"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { addUv2FromUv, usePbrTextureSet } from "../materials";
import { radialPoint } from "../utils";

export function PipelineShell({ curve }) {
  const pipeMaps = usePbrTextureSet(TUNNEL_TEXTURES.pipeRust, {
    repeat: [2.35, 18],
    anisotropy: 8,
  });

  const geometry = useMemo(() => {
    const tube = new THREE.TubeGeometry(curve, 280, PIPE_RADIUS, 128, false);
    return addUv2FromUv(tube);
  }, [curve]);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <primitive attach="geometry" object={geometry} />
        <meshPhysicalMaterial
          {...pipeMaps}
          side={THREE.BackSide}
          color="#6a493c"
          roughness={0.72}
          metalness={0.45}
          normalScale={new THREE.Vector2(0.86, 0.86)}
          envMapIntensity={0.12}
          clearcoat={0.05}
          clearcoatRoughness={0.78}
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
        position: radialPoint(curve, t, angle, 0.029),
        angle,
        width: 0.28 + (index % 4) * 0.045,
        height: 0.52 + (index % 5) * 0.08,
        opacity: 0.16 + (index % 4) * 0.018,
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
            opacity={stain.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
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
        position: radialPoint(curve, t, angle, 0.027),
        angle,
        width: 0.18 + (index % 3) * 0.08,
        height: 0.5 + (index % 6) * 0.1,
        opacity: 0.08 + (index % 5) * 0.018,
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
            opacity={item.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
