"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_MODELS } from "../assets";
import { prepareModelScene } from "../materials";

export function ForegroundOccluders({ curve }) {
  const wiresGltf = useGLTF(TUNNEL_MODELS.wires);

  const objects = useMemo(() => {
    return [
      { t: 0.16, x: -0.4, y: 0.38, r: 0.018 },
      { t: 0.33, x: 0.46, y: 0.3, r: 0.014 },
      { t: 0.52, x: -0.48, y: 0.12, r: 0.016 },
      { t: 0.68, x: 0.38, y: 0.42, r: 0.012 },
      { t: 0.81, x: -0.32, y: 0.44, r: 0.011 },
    ].map((item, index) => {
      const p = curve.getPointAt(item.t);

      const points = [
        new THREE.Vector3(p.x + item.x, p.y + item.y, p.z + 1.2),
        new THREE.Vector3(p.x + item.x * 0.7, p.y + item.y - 0.1, p.z),
        new THREE.Vector3(p.x + item.x * 1.1, p.y + item.y + 0.05, p.z - 1.1),
      ];

      return {
        id: `close-cable-${index}`,
        curve: new THREE.CatmullRomCurve3(points),
        radius: item.r,
      };
    });
  }, [curve]);

  const wireProps = useMemo(() => {
    return [
      { t: 0.22, x: -0.34, y: 0.36, scale: 0.0042, rot: 0.7 },
      { t: 0.66, x: 0.36, y: 0.32, scale: 0.0035, rot: -0.55 },
    ].map((item, index) => {
      const p = curve.getPointAt(item.t);

      return {
        ...item,
        id: `wire-model-occluder-${index}`,
        position: new THREE.Vector3(p.x + item.x, p.y + item.y, p.z - 0.28),
      };
    });
  }, [curve]);

  const wireScenes = useMemo(() => {
    return wireProps.map(() =>
      prepareModelScene(wiresGltf.scene, {
        castShadow: false,
        receiveShadow: false,
        color: "#070403",
        colorMix: 0.55,
      }),
    );
  }, [wireProps, wiresGltf.scene]);

  return (
    <group>
      {objects.map((item) => (
        <mesh key={item.id} castShadow>
          <tubeGeometry args={[item.curve, 40, item.radius, 8, false]} />
          <meshStandardMaterial
            color="#050303"
            roughness={0.92}
            metalness={0.22}
          />
        </mesh>
      ))}

      {wireProps.map((item, index) => (
        <primitive
          key={item.id}
          object={wireScenes[index]}
          position={item.position}
          rotation={[0.1, item.rot, Math.PI * 0.08]}
          scale={item.scale}
        />
      ))}
    </group>
  );
}
