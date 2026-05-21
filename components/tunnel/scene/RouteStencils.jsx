"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { createStencilTexture } from "../textures";
import { radialPoint } from "../utils";

export function RouteStencils({ curve }) {
  const textures = useMemo(
    () => [
      createStencilTexture("140", "CM PIPE"),
      createStencilTexture("15 KM", "PIPELINE"),
      createStencilTexture("4 KM", "PREP"),
      createStencilTexture("EXIT", "POINT"),
    ],
    [],
  );

  const stencils = useMemo(() => {
    return [
      { t: 0.16, angle: Math.PI * 0.34, textureIndex: 0, w: 0.28, h: 0.14 },
      { t: 0.38, angle: -Math.PI * 0.42, textureIndex: 1, w: 0.34, h: 0.16 },
      { t: 0.63, angle: Math.PI * 0.52, textureIndex: 2, w: 0.32, h: 0.15 },
      { t: 0.86, angle: -Math.PI * 0.28, textureIndex: 3, w: 0.3, h: 0.14 },
    ].map((item, index) => ({
      ...item,
      id: `stencil-${index}`,
      position: radialPoint(curve, item.t, item.angle, 0.038),
    }));
  }, [curve]);

  return (
    <group>
      {stencils.map((item) => {
        const texture = textures[item.textureIndex];
        if (!texture) return null;

        return (
          <mesh
            key={item.id}
            position={item.position}
            rotation={[Math.PI / 2, 0, item.angle + Math.PI / 2]}
            renderOrder={2}
          >
            <planeGeometry args={[item.w, item.h]} />
            <meshBasicMaterial
              map={texture}
              transparent
              opacity={0.72}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}
