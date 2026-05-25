"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { createSeededRandom, radialPoint } from "../utils";

export function CableClamps({ curve }) {
  const clamps = useMemo(() => {
    const items = [];
    const rng = createSeededRandom(42);

    for (let i = 0; i < 18; i += 1) {
      const t = 0.06 + i * 0.052;
      const side = i % 3 === 0 ? 1 : -1;
      
      // Calculate angle so clamps sit on the upper sides of the pipe
      // Roughly equivalent to the old x=0.45, y=0.28 manual offsets
      const baseAngle = side > 0 ? 0.55 : 2.58; 
      const angle = baseAngle + (rng() - 0.5) * 0.15 + Math.sin(i) * 0.08;

      items.push({
        id: `clamp-${i}`,
        position: radialPoint(curve, t, angle, 0.002),
        rotation: [0, 0, angle - Math.PI / 2],
        side,
      });
    }

    return items;
  }, [curve]);

  return (
    <group>
      {clamps.map((item) => (
        <group key={item.id} position={item.position} rotation={item.rotation}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.075, 0.026, 0.055]} />
            <meshStandardMaterial
              color="#261914"
              roughness={0.82}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[item.side * 0.036, -0.012, 0]} castShadow>
            <boxGeometry args={[0.018, 0.05, 0.065]} />
            <meshStandardMaterial
              color="#0b0706"
              roughness={0.9}
              metalness={0.42}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
