"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_MODELS } from "../assets";
import { prepareModelScene } from "../materials";

export function PipeCables({ curve }) {
  const pipePackGltf = useGLTF(TUNNEL_MODELS.oldPipePack);

  const cables = useMemo(() => {
    const configs = [
      { x: -0.5, y: 0.21, radius: 0.013, color: "#070404", phase: 0.4 },
      { x: -0.43, y: 0.34, radius: 0.009, color: "#1b0f0c", phase: 1.9 },
      { x: -0.36, y: 0.42, radius: 0.006, color: "#090606", phase: 2.8 },
      { x: 0.52, y: 0.22, radius: 0.011, color: "#120c09", phase: 1.2 },
      { x: 0.44, y: 0.36, radius: 0.007, color: "#070504", phase: 3.1 },
      { x: 0.35, y: 0.46, radius: 0.005, color: "#25130f", phase: 4.3 },
    ];

    return configs.map((cfg, cfgIndex) => {
      const points = [];

      for (let i = 0; i <= 95; i += 1) {
        const t = i / 95;
        const p = curve.getPointAt(t);
        const sag =
          Math.sin(t * Math.PI * 7.5 + cfg.phase) * 0.017 +
          Math.sin(t * Math.PI * 21 + cfgIndex) * 0.004;
        const wander = Math.sin(t * Math.PI * 4 + cfg.phase) * 0.018;

        points.push(
          new THREE.Vector3(p.x + cfg.x + wander, p.y + cfg.y + sag, p.z),
        );
      }

      return {
        id: `pipe-cable-${cfgIndex}`,
        curve: new THREE.CatmullRomCurve3(points),
        radius: cfg.radius,
        color: cfg.color,
      };
    });
  }, [curve]);

  const brokenDrops = useMemo(() => {
    return [
      { t: 0.18, x: -0.47, y: 0.3, length: 0.2 },
      { t: 0.36, x: 0.47, y: 0.31, length: 0.26 },
      { t: 0.57, x: -0.42, y: 0.37, length: 0.18 },
      { t: 0.79, x: 0.39, y: 0.43, length: 0.23 },
    ].map((item, index) => {
      const p = curve.getPointAt(item.t);
      const points = [
        new THREE.Vector3(p.x + item.x, p.y + item.y, p.z + 0.05),
        new THREE.Vector3(
          p.x + item.x + (index % 2 ? 0.04 : -0.035),
          p.y + item.y - item.length * 0.45,
          p.z - 0.03,
        ),
        new THREE.Vector3(
          p.x + item.x + (index % 2 ? -0.02 : 0.03),
          p.y + item.y - item.length,
          p.z - 0.09,
        ),
      ];

      return {
        id: `broken-cable-drop-${index}`,
        curve: new THREE.CatmullRomCurve3(points),
        radius: index % 2 ? 0.006 : 0.008,
      };
    });
  }, [curve]);

  const sidePipeProps = useMemo(() => {
    return [
      { t: 0.28, x: -0.52, y: 0.05, scale: 0.16, rot: 0.18 },
      { t: 0.61, x: 0.5, y: 0.08, scale: 0.14, rot: -0.22 },
    ].map((item, index) => {
      const p = curve.getPointAt(item.t);

      return {
        ...item,
        id: `industrial-side-pipe-${index}`,
        position: new THREE.Vector3(p.x + item.x, p.y + item.y, p.z),
      };
    });
  }, [curve]);

  const sidePipeScenes = useMemo(() => {
    return sidePipeProps.map((_, index) =>
      prepareModelScene(pipePackGltf.scene, {
        castShadow: index === 0,
        receiveShadow: true,
        color: "#2b1710",
        colorMix: 0.5,
      }),
    );
  }, [pipePackGltf.scene, sidePipeProps]);

  return (
    <group>
      {cables.map((cable) => (
        <mesh key={cable.id} castShadow receiveShadow>
          <tubeGeometry args={[cable.curve, 160, cable.radius, 8, false]} />
          <meshStandardMaterial
            color={cable.color}
            roughness={0.9}
            metalness={0.26}
          />
        </mesh>
      ))}

      {brokenDrops.map((drop) => (
        <mesh key={drop.id} castShadow>
          <tubeGeometry args={[drop.curve, 24, drop.radius, 8, false]} />
          <meshStandardMaterial
            color="#050303"
            roughness={0.94}
            metalness={0.18}
          />
        </mesh>
      ))}

      {sidePipeProps.map((item, index) => (
        <primitive
          key={item.id}
          object={sidePipeScenes[index]}
          position={item.position}
          rotation={[0, Math.PI / 2, item.rot]}
          scale={item.scale}
        />
      ))}
    </group>
  );
}
