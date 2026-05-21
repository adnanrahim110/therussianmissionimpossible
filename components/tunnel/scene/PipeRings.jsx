"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { TUNNEL_MODELS, TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { findFirstMesh, usePbrTextureSet } from "../materials";
import { getCurveFrame } from "../utils";

export function PipeRings({ curve }) {
  const darkRustMaps = usePbrTextureSet(TUNNEL_TEXTURES.darkRust, {
    repeat: [1.4, 0.55],
    anisotropy: 6,
  });
  const boltGltf = useGLTF(TUNNEL_MODELS.bolt);
  const boltSource = useMemo(
    () => findFirstMesh(boltGltf.scene),
    [boltGltf.scene],
  );
  const boltGeometry = boltSource?.geometry;
  const boltMaterial = useMemo(() => {
    const material =
      boltSource?.material?.clone() ??
      new THREE.MeshStandardMaterial({
        color: "#170e0a",
        roughness: 0.62,
        metalness: 0.82,
      });

    material.color?.lerp(new THREE.Color("#28110b"), 0.62);
    material.roughness = Math.max(material.roughness ?? 0.55, 0.58);
    material.metalness = Math.max(material.metalness ?? 0.6, 0.78);

    return material;
  }, [boltSource]);

  const rings = useMemo(() => {
    return Array.from({ length: 46 }, (_, index) => {
      const t = index / 45;
      const heavy = index % 5 === 0;
      const frame = getCurveFrame(curve, t);

      return {
        id: `ring-${index}`,
        point: frame.point,
        quaternion: frame.quaternion,
        heavy,
        radius: PIPE_RADIUS * 0.992,
        tube: heavy ? 0.023 : 0.007,
        tint: heavy
          ? index % 10 === 0
            ? "#3a2118"
            : "#4d3023"
          : "#20130f",
      };
    });
  }, [curve]);

  return (
    <group>
      {rings.map((ring) => (
        <group
          key={ring.id}
          position={ring.point}
          quaternion={ring.quaternion}
        >
          {ring.heavy && (
            <>
              <mesh position={[0, 0, -0.032]} renderOrder={1}>
                <torusGeometry args={[ring.radius * 0.996, 0.01, 8, 116]} />
                <meshBasicMaterial
                  color="#050303"
                  transparent
                  opacity={0.46}
                  depthWrite={false}
                />
              </mesh>

              <mesh position={[0, 0, 0.032]} renderOrder={1}>
                <torusGeometry args={[ring.radius * 0.996, 0.007, 8, 116]} />
                <meshBasicMaterial
                  color="#0b0504"
                  transparent
                  opacity={0.32}
                  depthWrite={false}
                />
              </mesh>
            </>
          )}

          <mesh castShadow={ring.heavy} receiveShadow>
            <torusGeometry
              args={[ring.radius, ring.tube, ring.heavy ? 14 : 8, 116]}
            />
            <meshStandardMaterial
              map={darkRustMaps.map}
              normalMap={darkRustMaps.normalMap}
              roughnessMap={darkRustMaps.roughnessMap}
              metalnessMap={darkRustMaps.metalnessMap}
              color={ring.tint}
              roughness={ring.heavy ? 0.76 : 0.86}
              metalness={ring.heavy ? 0.58 : 0.42}
              normalScale={new THREE.Vector2(0.45, 0.45)}
            />
          </mesh>

          {ring.heavy && boltGeometry && (
            <RingBolts
              geometry={boltGeometry}
              material={boltMaterial}
              radius={ring.radius}
            />
          )}
        </group>
      ))}
    </group>
  );
}

function RingBolts({ geometry, material, radius }) {
  const instancedRef = useRef(null);
  const count = 12;

  useEffect(() => {
    if (!instancedRef.current) return;

    const dummy = new THREE.Object3D();

    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2;

      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        index % 2 === 0 ? -0.018 : 0.018,
      );
      dummy.rotation.set(0, 0, angle + Math.PI / 2);
      dummy.scale.setScalar(0.024);
      dummy.updateMatrix();

      instancedRef.current.setMatrixAt(index, dummy.matrix);
    }

    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [geometry, radius]);

  return (
    <instancedMesh
      ref={instancedRef}
      args={[geometry, material, count]}
      castShadow={false}
      receiveShadow
    />
  );
}
