"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { usePbrTextureSet } from "../materials";
import { radialPoint, radialRotation } from "../utils";

export function RepairPatches({ curve }) {
  const patchMaps = usePbrTextureSet(TUNNEL_TEXTURES.darkRust, {
    repeat: [0.85, 0.65],
    anisotropy: 6,
  });

  const patches = useMemo(() => {
    return [
      { t: 0.1, angle: Math.PI * 0.18, w: 0.24, z: 0.42 },
      { t: 0.19, angle: Math.PI * 0.78, w: 0.2, z: 0.34 },
      { t: 0.31, angle: -Math.PI * 0.74, w: 0.28, z: 0.46 },
      { t: 0.43, angle: Math.PI * 0.34, w: 0.22, z: 0.34 },
      { t: 0.56, angle: -Math.PI * 0.2, w: 0.26, z: 0.42 },
      { t: 0.7, angle: Math.PI * 0.72, w: 0.2, z: 0.32 },
      { t: 0.84, angle: -Math.PI * 0.58, w: 0.25, z: 0.38 },
    ].map((item, index) => ({
      ...item,
      id: `repair-patch-${index}`,
      position: radialPoint(curve, item.t, item.angle, 0.035),
    }));
  }, [curve]);

  return (
    <group>
      {patches.map((patch, index) => (
        <group
          key={patch.id}
          position={patch.position}
          rotation={radialRotation(patch.angle)}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[patch.w, 0.015, patch.z]} />
            <meshStandardMaterial
              map={patchMaps.map}
              normalMap={patchMaps.normalMap}
              roughnessMap={patchMaps.roughnessMap}
              metalnessMap={patchMaps.metalnessMap}
              color={index % 2 ? "#3a251d" : "#513326"}
              roughness={0.72}
              metalness={0.58}
              normalScale={new THREE.Vector2(0.35, 0.35)}
            />
          </mesh>

          {[
            [-patch.w * 0.39, -0.013, -patch.z * 0.38],
            [patch.w * 0.39, -0.013, -patch.z * 0.38],
            [-patch.w * 0.39, -0.013, patch.z * 0.38],
            [patch.w * 0.39, -0.013, patch.z * 0.38],
          ].map(([x, y, z], boltIndex) => (
            <mesh key={boltIndex} position={[x, y, z]} castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.012, 6]} />
              <meshStandardMaterial
                color="#0b0807"
                roughness={0.62}
                metalness={0.8}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
