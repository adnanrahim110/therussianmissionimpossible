"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { createSoftShadowTexture } from "../textures";
import { radialPoint } from "../utils";

const BOX_SHADOWS = [
  { t: 0.24, angle: Math.PI * 0.64, w: 0.46, h: 0.32, opacity: 0.46 },
  { t: 0.48, angle: -Math.PI * 0.5, w: 0.42, h: 0.3, opacity: 0.4 },
  { t: 0.73, angle: Math.PI * 0.28, w: 0.44, h: 0.32, opacity: 0.44 },
];

const PATCH_SHADOWS = [
  { t: 0.1, angle: Math.PI * 0.18, w: 0.36, h: 0.48, opacity: 0.24 },
  { t: 0.19, angle: Math.PI * 0.78, w: 0.32, h: 0.4, opacity: 0.22 },
  { t: 0.31, angle: -Math.PI * 0.74, w: 0.42, h: 0.52, opacity: 0.25 },
  { t: 0.43, angle: Math.PI * 0.34, w: 0.34, h: 0.4, opacity: 0.22 },
  { t: 0.56, angle: -Math.PI * 0.2, w: 0.4, h: 0.48, opacity: 0.24 },
  { t: 0.7, angle: Math.PI * 0.72, w: 0.32, h: 0.38, opacity: 0.2 },
  { t: 0.84, angle: -Math.PI * 0.58, w: 0.38, h: 0.44, opacity: 0.24 },
];

export function WallContactShadows({ curve }) {
  const shadowTexture = useMemo(() => createSoftShadowTexture(), []);

  const shadows = useMemo(() => {
    const cableShadows = Array.from({ length: 12 }, (_, index) => {
      const side = index % 2 === 0 ? 1 : -1;

      return {
        t: 0.07 + index * 0.072,
        angle: side > 0 ? Math.PI * 0.22 : Math.PI * 0.78,
        w: 0.24,
        h: 0.12,
        opacity: 0.18,
      };
    });

    return [...BOX_SHADOWS, ...PATCH_SHADOWS, ...cableShadows].map(
      (item, index) => ({
        ...item,
        id: `contact-shadow-${index}`,
        position: radialPoint(curve, item.t, item.angle, 0.028),
      }),
    );
  }, [curve]);

  if (!shadowTexture) return null;

  return (
    <group>
      {shadows.map((item) => (
        <mesh
          key={item.id}
          position={item.position}
          rotation={[Math.PI / 2, 0, item.angle + Math.PI / 2]}
          renderOrder={1}
        >
          <planeGeometry args={[item.w, item.h]} />
          <meshBasicMaterial
            map={shadowTexture}
            color="#050302"
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
