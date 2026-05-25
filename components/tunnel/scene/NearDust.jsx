"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createDustSpriteTexture } from "../textures";
import { clamp, createSeededRandom } from "../utils";

export function NearDust({ progress, curve }) {
  const pointsRef = useRef(null);
  const count = 168;
  const dustTexture = useMemo(() => createDustSpriteTexture(), []);

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    const rng = createSeededRandom(2468);

    for (let index = 0; index < count; index += 1) {
      let x = (rng() - 0.5) * 1.05;
      let y = -0.18 + (rng() - 0.5) * 0.64;

      if (Math.abs(x) < 0.16 && y < -0.12) {
        x += x >= 0 ? 0.22 : -0.22;
      }

      data[index * 3] = x;
      data[index * 3 + 1] = y;
      data[index * 3 + 2] = 0.8 - rng() * 6.4;
    }

    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const p = curve.getPointAt(clamp(progress * 0.965, 0, 0.965));

    pointsRef.current.position.set(p.x, p.y - 0.11, p.z);
    pointsRef.current.rotation.z =
      Math.sin(clock.getElapsedTime() * 0.1) * 0.014;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        map={dustTexture}
        color="#f4c08b"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.082}
        alphaTest={0.03}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
