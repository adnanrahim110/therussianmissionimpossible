"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { clamp, createSeededRandom, radialPoint } from "../utils";

export function WallScratches({ curve }) {
  const scratches = useMemo(() => {
    const items = [];
    const rng = createSeededRandom(1234);

    for (let i = 0; i < 92; i += 1) {
      const t = 0.04 + rng() * 0.9;
      const angle =
        rng() > 0.5
          ? Math.PI * (0.12 + rng() * 0.72)
          : -Math.PI * (0.12 + rng() * 0.72);

      const length = 0.12 + rng() * 0.45;
      const start = radialPoint(curve, t, angle, 0.032);
      const end = radialPoint(curve, clamp(t + length / 55, 0, 1), angle, 0.032);

      items.push({
        id: `scratch-${i}`,
        curve: new THREE.CatmullRomCurve3([start, end]),
        color: rng() > 0.58 ? "#5f717b" : "#020304",
        opacity: 0.12 + rng() * 0.2,
        radius: 0.0014 + rng() * 0.0012,
      });
    }

    return items;
  }, [curve]);

  return (
    <group>
      {scratches.map((scratch) => (
        <mesh key={scratch.id}>
          <tubeGeometry args={[scratch.curve, 8, scratch.radius, 5, false]} />
          <meshBasicMaterial
            color={scratch.color}
            transparent
            opacity={scratch.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}
