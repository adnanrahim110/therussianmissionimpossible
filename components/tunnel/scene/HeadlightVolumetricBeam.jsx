"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { smoothstep } from "../utils";

export function HeadlightVolumetricBeam({ progress }) {
  const { camera } = useThree();
  const groupRef = useRef(null);
  const leftMatRef = useRef(null);
  const rightMatRef = useRef(null);
  const centerMatRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.getElapsedTime();
    const entrance = smoothstep(0.04, 0.14, progress);
    const exitWash = smoothstep(0.92, 1, progress);
    const flicker =
      1 + Math.sin(time * 8.4) * 0.08 + Math.sin(time * 19.7) * 0.035;
    const opacity = entrance * (1 - exitWash * 0.3) * flicker;

    groupRef.current.position.copy(camera.position);
    groupRef.current.quaternion.copy(camera.quaternion);

    if (leftMatRef.current) leftMatRef.current.opacity = opacity * 0.058;
    if (rightMatRef.current) rightMatRef.current.opacity = opacity * 0.052;
    if (centerMatRef.current) centerMatRef.current.opacity = opacity * 0.04;
  });

  return (
    <group ref={groupRef} renderOrder={1}>
      <mesh position={[-0.18, -0.02, -3.05]} rotation={[Math.PI / 2, 0.08, 0]}>
        <coneGeometry args={[1.02, 6.1, 32, 1, true]} />
        <meshBasicMaterial
          ref={leftMatRef}
          color="#ffe2b8"
          transparent
          opacity={0.04}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0.18, -0.02, -3.05]} rotation={[Math.PI / 2, -0.08, 0]}>
        <coneGeometry args={[1, 6, 32, 1, true]} />
        <meshBasicMaterial
          ref={rightMatRef}
          color="#ffd0a0"
          transparent
          opacity={0.04}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, -0.16, -2.75]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.74, 5.5, 28, 1, true]} />
        <meshBasicMaterial
          ref={centerMatRef}
          color="#f5b36f"
          transparent
          opacity={0.03}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
