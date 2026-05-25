"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { PIPE_RADIUS } from "../constants";
import { createSeededRandom } from "../utils";

export function SedimentAndDebris({ curve }) {
  const debris = useMemo(() => {
    const items = [];
    const rng = createSeededRandom(9876);

    for (let i = 0; i < 42; i += 1) {
      const t = 0.03 + rng() * 0.92;
      const p = curve.getPointAt(t);

      items.push({
        id: `debris-${i}`,
        position: new THREE.Vector3(
          p.x + (rng() - 0.5) * 0.42,
          p.y - PIPE_RADIUS + 0.045 + rng() * 0.03,
          p.z + (rng() - 0.5) * 0.16,
        ),
        scale: [
          0.03 + rng() * 0.08,
          0.006 + rng() * 0.012,
          0.04 + rng() * 0.14,
        ],
        rotation: [0, rng() * Math.PI * 2, 0],
      });
    }

    return items;
  }, [curve]);

  return (
    <group>
      {debris.map((item) => (
        <mesh
          key={item.id}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial
            color="#120c09"
            roughness={0.94}
            metalness={0.06}
          />
        </mesh>
      ))}
    </group>
  );
}
