"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { PIPE_DIAMETER, PIPE_RADIUS } from "../constants";
import { usePbrTextureSet } from "../materials";
import { createStencilTexture } from "../textures";
import { getCurveFrame, smoothstep } from "../utils";

export function TunnelEntrancePortal({ progress, curve }) {
  const groupRef = useRef(null);
  const plateMatRef = useRef(null);
  const outerRimMatRef = useRef(null);
  const innerRimMatRef = useRef(null);
  const wetLipMatRef = useRef(null);
  const measureMatRef = useRef(null);
  const redLensMatRef = useRef(null);
  const redGlowRef = useRef(null);
  const exteriorLightRef = useRef(null);

  const corrugatedMaps = usePbrTextureSet(TUNNEL_TEXTURES.corrugatedIron, {
    repeat: [1.6, 1.1],
    anisotropy: 8,
  });
  const darkRustMaps = usePbrTextureSet(TUNNEL_TEXTURES.darkRust, {
    repeat: [0.7, 0.7],
    anisotropy: 6,
  });
  const scaleStencil = useMemo(
    () => createStencilTexture("140 CM", "PIPE MOUTH"),
    [],
  );
  const frame = useMemo(() => getCurveFrame(curve, 0), [curve]);
  const portalOpacity = 1 - smoothstep(0.075, 0.22, progress);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const visible = 1 - smoothstep(0.075, 0.22, progress);
    const pushIn = smoothstep(0, 0.1, progress);
    const flicker =
      1 + Math.sin(time * 10.5) * 0.08 + Math.sin(time * 23) * 0.035;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 + pushIn * 0.04);
    }

    if (plateMatRef.current) plateMatRef.current.opacity = visible * 0.94;
    if (outerRimMatRef.current) outerRimMatRef.current.opacity = visible;
    if (innerRimMatRef.current) innerRimMatRef.current.opacity = visible;
    if (wetLipMatRef.current) wetLipMatRef.current.opacity = visible * 0.75;
    if (measureMatRef.current) measureMatRef.current.opacity = visible * 0.9;
    if (redLensMatRef.current) redLensMatRef.current.opacity = visible;

    if (redGlowRef.current) {
      redGlowRef.current.intensity = visible * 2.4 * flicker;
    }

    if (exteriorLightRef.current) {
      exteriorLightRef.current.intensity = visible * 3.8;
    }
  });

  return (
    <group ref={groupRef} position={frame.point} quaternion={frame.quaternion}>
      <pointLight
        ref={exteriorLightRef}
        position={[0, PIPE_RADIUS * 0.25, -1.15]}
        color="#c8d7ef"
        intensity={3.8}
        distance={7.5}
        decay={1.6}
      />

      <pointLight
        ref={redGlowRef}
        position={[-PIPE_RADIUS * 1.13, PIPE_RADIUS * 0.78, -0.22]}
        color="#ef233c"
        intensity={2.4}
        distance={3.2}
        decay={1.7}
      />

      <mesh position={[0, 0, -0.018]} receiveShadow>
        <ringGeometry args={[PIPE_RADIUS * 1.02, PIPE_RADIUS * 1.78, 160]} />
        <meshStandardMaterial
          ref={plateMatRef}
          map={corrugatedMaps.map}
          normalMap={corrugatedMaps.normalMap}
          roughnessMap={corrugatedMaps.roughnessMap}
          metalnessMap={corrugatedMaps.metalnessMap}
          color="#100b08"
          roughness={0.84}
          metalness={0.46}
          transparent
          opacity={0.94}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh castShadow receiveShadow>
        <torusGeometry args={[PIPE_RADIUS * 1.025, 0.055, 14, 150]} />
        <meshStandardMaterial
          ref={outerRimMatRef}
          map={corrugatedMaps.map}
          normalMap={corrugatedMaps.normalMap}
          roughnessMap={corrugatedMaps.roughnessMap}
          metalnessMap={corrugatedMaps.metalnessMap}
          color="#4b3328"
          roughness={0.7}
          metalness={0.7}
          transparent
          opacity={1}
        />
      </mesh>

      <mesh position={[0, 0, -0.04]} castShadow receiveShadow>
        <torusGeometry args={[PIPE_RADIUS * 0.91, 0.022, 10, 120]} />
        <meshStandardMaterial
          ref={innerRimMatRef}
          map={darkRustMaps.map}
          normalMap={darkRustMaps.normalMap}
          roughnessMap={darkRustMaps.roughnessMap}
          metalnessMap={darkRustMaps.metalnessMap}
          color="#1a100c"
          roughness={0.86}
          metalness={0.5}
          transparent
          opacity={1}
        />
      </mesh>

      <mesh position={[0, -PIPE_RADIUS - 0.045, -0.05]} receiveShadow>
        <boxGeometry args={[PIPE_DIAMETER * 1.9, 0.06, 0.04]} />
        <meshPhysicalMaterial
          ref={wetLipMatRef}
          color="#090707"
          roughness={0.48}
          metalness={0.18}
          clearcoat={0.22}
          clearcoatRoughness={0.62}
          transparent
          opacity={0.75}
        />
      </mesh>

      <group position={[PIPE_RADIUS + 0.24, 0, -0.055]}>
        <mesh>
          <boxGeometry args={[0.016, PIPE_DIAMETER, 0.018]} />
          <meshBasicMaterial
            ref={measureMatRef}
            color="#ffffff"
            transparent
            opacity={0.9}
          />
        </mesh>

        <mesh position={[0, PIPE_RADIUS, 0]}>
          <boxGeometry args={[0.115, 0.014, 0.018]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={portalOpacity * 0.82}
          />
        </mesh>

        <mesh position={[0, -PIPE_RADIUS, 0]}>
          <boxGeometry args={[0.115, 0.014, 0.018]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={portalOpacity * 0.82}
          />
        </mesh>
      </group>

      {scaleStencil && (
        <mesh position={[PIPE_RADIUS + 0.42, -PIPE_RADIUS * 0.24, -0.06]}>
          <planeGeometry args={[0.34, 0.17]} />
          <meshBasicMaterial
            map={scaleStencil}
            transparent
            opacity={portalOpacity * 0.78}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <mesh position={[-PIPE_RADIUS * 1.13, PIPE_RADIUS * 0.78, -0.07]}>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshBasicMaterial
          ref={redLensMatRef}
          color="#ef233c"
          transparent
          opacity={1}
        />
      </mesh>

      <mesh
        position={[-PIPE_RADIUS * 0.55, -PIPE_RADIUS * 0.92, -0.035]}
        rotation={[0, 0, -0.14]}
      >
        <boxGeometry args={[0.34, 0.025, 0.018]} />
        <meshStandardMaterial
          color="#2a1711"
          roughness={0.78}
          metalness={0.48}
          transparent
          opacity={portalOpacity * 0.72}
        />
      </mesh>

      <mesh
        position={[PIPE_RADIUS * 0.42, PIPE_RADIUS * 0.98, -0.035]}
        rotation={[0, 0, 0.18]}
      >
        <boxGeometry args={[0.28, 0.018, 0.016]} />
        <meshStandardMaterial
          color="#5a241b"
          roughness={0.82}
          metalness={0.34}
          transparent
          opacity={portalOpacity * 0.54}
        />
      </mesh>
    </group>
  );
}
