"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_MODELS } from "../assets";
import { prepareModelScene } from "../materials";
import { radialPoint } from "../utils";

export function PipeCables({ curve }) {
  const pipePackGltf = useGLTF(TUNNEL_MODELS.oldPipePack);

  const cables = useMemo(() => {
    const configs = [
      { angle: 2.74, radius: 0.013, color: "#070404", phase: 0.4 },
      { angle: 2.47, radius: 0.009, color: "#1b0f0c", phase: 1.9 },
      { angle: 2.28, radius: 0.006, color: "#090606", phase: 2.8 },
      { angle: 0.40, radius: 0.011, color: "#120c09", phase: 1.2 },
      { angle: 0.67, radius: 0.007, color: "#070504", phase: 3.1 },
      { angle: 0.92, radius: 0.005, color: "#25130f", phase: 4.3 },
    ];

    return configs.map((cfg, cfgIndex) => {
      const points = [];

      for (let i = 0; i <= 95; i += 1) {
        const t = i / 95;
        const sag =
          Math.sin(t * Math.PI * 7.5 + cfg.phase) * 0.017 +
          Math.sin(t * Math.PI * 21 + cfgIndex) * 0.004;
        
        // Compute base point perfectly offset from the wall
        // We use cfg.radius * 0.9 to embed it very slightly into the wall
        const p = radialPoint(curve, t, cfg.angle, cfg.radius * 0.9);
        
        // Apply vertical sag
        p.y += sag;
        
        points.push(p);
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
      { t: 0.18, angle: 2.6, length: 0.2 },
      { t: 0.36, angle: 0.5, length: 0.26 },
      { t: 0.57, angle: 2.4, length: 0.18 },
      { t: 0.79, angle: 0.7, length: 0.23 },
    ].map((item, index) => {
      const base = radialPoint(curve, item.t, item.angle, 0.008);
      const points = [
        new THREE.Vector3(base.x, base.y, base.z + 0.05),
        new THREE.Vector3(
          base.x + (index % 2 ? 0.04 : -0.035),
          base.y - item.length * 0.45,
          base.z - 0.03,
        ),
        new THREE.Vector3(
          base.x + (index % 2 ? -0.02 : 0.03),
          base.y - item.length,
          base.z - 0.09,
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
      { t: 0.28, angle: Math.PI - 0.15, scale: 0.16, rot: 0.18 },
      { t: 0.61, angle: 0.15, scale: 0.14, rot: -0.22 },
    ].map((item, index) => {
      return {
        ...item,
        id: `industrial-side-pipe-${index}`,
        position: radialPoint(curve, item.t, item.angle, 0.08),
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

  useEffect(() => {
    return () => {
      sidePipeScenes.forEach((scene) => {
        scene.traverse((child) => {
          if (child.isMesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });
    };
  }, [sidePipeScenes]);

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
