"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { TUNNEL_MODELS, TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { findFirstMesh, usePbrTextureSet } from "../materials";
import { getCurveFrame } from "../utils";

// A pipe joint is a raised band/collar around the pipe with two visible
// flange ridges and bolts.  Everything is built from torus rings at
// slightly larger radii than the pipe wall so they sit ON the wall.

const R = PIPE_RADIUS;                // base pipe radius  (0.7)
const COLLAR_R = R + 0.015;           // collar band sits 15mm proud of pipe
const FLANGE_R = R + 0.035;           // flange lip extends 35mm past pipe
const BOLT_R = R + 0.042;             // bolt circle

export function PipeJoints({ curve }) {
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

  const joints = useMemo(() => {
    return [0.25, 0.5, 0.75].map((t, index) => {
      const frame = getCurveFrame(curve, t);
      return {
        id: `joint-${index}`,
        point: frame.point,
        quaternion: frame.quaternion,
      };
    });
  }, [curve]);

  return (
    <group>
      {joints.map((joint) => (
        <group
          key={joint.id}
          position={joint.point}
          quaternion={joint.quaternion}
        >
          {/* Wide collar band — the raised section of pipe around the joint */}
          <mesh receiveShadow>
            <torusGeometry args={[COLLAR_R, 0.018, 16, 128]} />
            <meshStandardMaterial
              map={darkRustMaps.map}
              normalMap={darkRustMaps.normalMap}
              roughnessMap={darkRustMaps.roughnessMap}
              metalnessMap={darkRustMaps.metalnessMap}
              color="#2d1a12"
              roughness={0.78}
              metalness={0.7}
              normalScale={new THREE.Vector2(0.8, 0.8)}
            />
          </mesh>

          {/* Left flange ridge */}
          <mesh position={[0, 0, -0.035]} castShadow receiveShadow>
            <torusGeometry args={[FLANGE_R, 0.012, 14, 128]} />
            <meshStandardMaterial
              map={darkRustMaps.map}
              normalMap={darkRustMaps.normalMap}
              roughnessMap={darkRustMaps.roughnessMap}
              metalnessMap={darkRustMaps.metalnessMap}
              color="#241510"
              roughness={0.74}
              metalness={0.74}
              normalScale={new THREE.Vector2(0.6, 0.6)}
            />
          </mesh>

          {/* Right flange ridge */}
          <mesh position={[0, 0, 0.035]} castShadow receiveShadow>
            <torusGeometry args={[FLANGE_R, 0.012, 14, 128]} />
            <meshStandardMaterial
              map={darkRustMaps.map}
              normalMap={darkRustMaps.normalMap}
              roughnessMap={darkRustMaps.roughnessMap}
              metalnessMap={darkRustMaps.metalnessMap}
              color="#241510"
              roughness={0.74}
              metalness={0.74}
              normalScale={new THREE.Vector2(0.6, 0.6)}
            />
          </mesh>

          {/* Intermediate collar rings for thickness/detail */}
          <mesh position={[0, 0, -0.018]} receiveShadow>
            <torusGeometry args={[COLLAR_R + 0.004, 0.01, 10, 128]} />
            <meshStandardMaterial color="#1e120c" roughness={0.82} metalness={0.65} />
          </mesh>
          <mesh position={[0, 0, 0.018]} receiveShadow>
            <torusGeometry args={[COLLAR_R + 0.004, 0.01, 10, 128]} />
            <meshStandardMaterial color="#1e120c" roughness={0.82} metalness={0.65} />
          </mesh>

          {/* Rubber gasket line in the center */}
          <mesh receiveShadow>
            <torusGeometry args={[COLLAR_R + 0.006, 0.004, 8, 128]} />
            <meshStandardMaterial color="#080808" roughness={0.95} metalness={0.05} />
          </mesh>

          {/* Weld beads at the outer edges of the collar */}
          <mesh position={[0, 0, -0.05]} receiveShadow>
            <torusGeometry args={[R + 0.006, 0.005, 8, 128]} />
            <meshStandardMaterial color="#1a0e09" roughness={0.88} metalness={0.55} />
          </mesh>
          <mesh position={[0, 0, 0.05]} receiveShadow>
            <torusGeometry args={[R + 0.006, 0.005, 8, 128]} />
            <meshStandardMaterial color="#1a0e09" roughness={0.88} metalness={0.55} />
          </mesh>

          {/* Shadow contact rings */}
          <mesh position={[0, 0, -0.055]} renderOrder={1}>
            <torusGeometry args={[R + 0.003, 0.01, 8, 128]} />
            <meshBasicMaterial color="#020101" transparent opacity={0.3} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, 0.055]} renderOrder={1}>
            <torusGeometry args={[R + 0.003, 0.01, 8, 128]} />
            <meshBasicMaterial color="#020101" transparent opacity={0.3} depthWrite={false} />
          </mesh>

          {boltGeometry && (
            <JointBolts
              geometry={boltGeometry}
              material={boltMaterial}
              radius={BOLT_R}
            />
          )}
        </group>
      ))}
    </group>
  );
}

function JointBolts({ geometry, material, radius }) {
  const instancedRef = useRef(null);
  const count = 24;

  useEffect(() => {
    if (!instancedRef.current) return;

    const dummy = new THREE.Object3D();
    const halfCount = count / 2;

    for (let index = 0; index < count; index += 1) {
      const side = index < halfCount ? -1 : 1;
      const localIndex = index % halfCount;
      const angle = (localIndex / halfCount) * Math.PI * 2;

      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        side * 0.038,
      );

      dummy.rotation.set(0, 0, angle + Math.PI / 2);
      dummy.scale.setScalar(0.022);
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

useGLTF.preload(TUNNEL_MODELS.bolt);
