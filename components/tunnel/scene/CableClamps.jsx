"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function CableClamps({ curve }) {
  const clamps = useMemo(() => {
    const items = [];

    for (let i = 0; i < 18; i += 1) {
      const t = 0.06 + i * 0.052;
      const side = i % 3 === 0 ? 1 : -1;
      const p = curve.getPointAt(t);

      items.push({
        id: `clamp-${i}`,
        position: new THREE.Vector3(
          p.x + side * (0.43 + Math.random() * 0.04),
          p.y + 0.28 + Math.sin(i) * 0.04,
          p.z,
        ),
        side,
      });
    }

    return items;
  }, [curve]);

  return (
    <group>
      {clamps.map((item) => (
        <group key={item.id} position={item.position}>
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
