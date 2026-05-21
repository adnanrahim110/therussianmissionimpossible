"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { usePbrTextureSet } from "../materials";
import { createStencilTexture } from "../textures";
import { getCurveFrame, smoothstep } from "../utils";

export function TunnelExitPortal({ progress, curve }) {
  const groupRef = useRef(null);
  const plateMatRef = useRef(null);
  const rimMatRef = useRef(null);
  const diskMatRef = useRef(null);
  const hazeMatRef = useRef(null);
  const redMarkerMatRef = useRef(null);
  const warmLightRef = useRef(null);
  const redLightRef = useRef(null);

  const corrugatedMaps = usePbrTextureSet(TUNNEL_TEXTURES.corrugatedIron, {
    repeat: [1.35, 1],
    anisotropy: 8,
  });
  const darkRustMaps = usePbrTextureSet(TUNNEL_TEXTURES.darkRust, {
    repeat: [0.7, 0.7],
    anisotropy: 6,
  });
  const exitStencil = useMemo(() => createStencilTexture("EXIT", "POINT"), []);
  const frame = useMemo(() => getCurveFrame(curve, 1), [curve]);
  const portalReveal = smoothstep(0.84, 0.955, progress);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const reveal = smoothstep(0.84, 0.955, progress);
    const finalBloom = smoothstep(0.965, 1, progress);
    const pulse = 1 + Math.sin(time * 1.4) * 0.012;
    const redPulse = 1 + Math.sin(time * 7.5) * 0.12;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(
        (0.78 + reveal * 0.24 + finalBloom * 0.08) * pulse,
      );
    }

    if (plateMatRef.current) plateMatRef.current.opacity = reveal * 0.76;
    if (rimMatRef.current) rimMatRef.current.opacity = reveal;
    if (diskMatRef.current) {
      diskMatRef.current.opacity = reveal * 0.5 + finalBloom * 0.36;
    }
    if (hazeMatRef.current) {
      hazeMatRef.current.opacity = reveal * 0.18 + finalBloom * 0.26;
    }
    if (redMarkerMatRef.current) redMarkerMatRef.current.opacity = reveal;

    if (warmLightRef.current) {
      warmLightRef.current.intensity = reveal * 6.2 + finalBloom * 5.4;
    }

    if (redLightRef.current) {
      redLightRef.current.intensity = reveal * 1.8 * redPulse;
    }
  });

  return (
    <group ref={groupRef} position={frame.point} quaternion={frame.quaternion}>
      <pointLight
        ref={warmLightRef}
        position={[0, PIPE_RADIUS * 0.08, 0.85]}
        color="#ffe6c2"
        intensity={0}
        distance={12}
        decay={1.2}
      />

      <pointLight
        ref={redLightRef}
        position={[PIPE_RADIUS * 0.92, PIPE_RADIUS * 0.5, -0.05]}
        color="#ef233c"
        intensity={0}
        distance={3.5}
        decay={1.7}
      />

      <mesh position={[0, 0, 0.025]} receiveShadow>
        <ringGeometry args={[PIPE_RADIUS * 0.98, PIPE_RADIUS * 1.56, 150]} />
        <meshStandardMaterial
          ref={plateMatRef}
          map={corrugatedMaps.map}
          normalMap={corrugatedMaps.normalMap}
          roughnessMap={corrugatedMaps.roughnessMap}
          metalnessMap={corrugatedMaps.metalnessMap}
          color="#20110d"
          roughness={0.72}
          metalness={0.54}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh castShadow receiveShadow>
        <torusGeometry args={[PIPE_RADIUS * 1.005, 0.047, 14, 140]} />
        <meshStandardMaterial
          ref={rimMatRef}
          map={darkRustMaps.map}
          normalMap={darkRustMaps.normalMap}
          roughnessMap={darkRustMaps.roughnessMap}
          metalnessMap={darkRustMaps.metalnessMap}
          color="#5a3a2c"
          roughness={0.62}
          metalness={0.74}
          transparent
          opacity={0}
        />
      </mesh>

      <mesh position={[0, 0, 0.12]}>
        <circleGeometry args={[PIPE_RADIUS * 0.9, 80]} />
        <meshBasicMaterial
          ref={diskMatRef}
          color="#fff0cf"
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.09]}>
        <ringGeometry args={[PIPE_RADIUS * 0.46, PIPE_RADIUS * 1.18, 96]} />
        <meshBasicMaterial
          ref={hazeMatRef}
          color="#ffd9aa"
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group
        position={[PIPE_RADIUS * 0.88, PIPE_RADIUS * 0.52, -0.03]}
        rotation={[0, 0, 0.12]}
      >
        {exitStencil && (
          <mesh>
            <planeGeometry args={[0.34, 0.17]} />
            <meshBasicMaterial
              ref={redMarkerMatRef}
              map={exitStencil}
              color="#ef233c"
              transparent
              opacity={0}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      <mesh
        position={[-PIPE_RADIUS * 0.98, -PIPE_RADIUS * 0.72, -0.03]}
        rotation={[0, 0, -0.2]}
      >
        <boxGeometry args={[0.36, 0.025, 0.018]} />
        <meshStandardMaterial
          color="#170c09"
          roughness={0.84}
          metalness={0.42}
          transparent
          opacity={portalReveal * 0.5}
        />
      </mesh>
    </group>
  );
}
