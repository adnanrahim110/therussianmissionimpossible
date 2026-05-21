"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { addUv2FromUv, usePbrTextureSet } from "../materials";

export function WetBottomRibbon({ curve }) {
  const mudMaps = usePbrTextureSet(TUNNEL_TEXTURES.mud, {
    repeat: [1.2, 13],
    anisotropy: 8,
  });

  const bottomCurve = useMemo(() => {
    const points = [];

    for (let i = 0; i <= 95; i += 1) {
      const t = i / 95;
      const p = curve.getPointAt(t);
      points.push(new THREE.Vector3(p.x, p.y - PIPE_RADIUS + 0.035, p.z));
    }

    return new THREE.CatmullRomCurve3(points);
  }, [curve]);

  const geometry = useMemo(() => {
    const tube = new THREE.TubeGeometry(bottomCurve, 190, 0.14, 18, false);
    return addUv2FromUv(tube);
  }, [bottomCurve]);

  return (
    <group>
      <mesh receiveShadow>
        <primitive attach="geometry" object={geometry} />
        <meshPhysicalMaterial
          {...mudMaps}
          color="#17110d"
          roughness={0.46}
          metalness={0.08}
          normalScale={new THREE.Vector2(0.55, 0.55)}
          clearcoat={0.35}
          clearcoatRoughness={0.38}
          specularIntensity={0.7}
          transparent
          opacity={0.72}
        />
      </mesh>

      <GlossyPuddleStrips curve={curve} />
    </group>
  );
}

function GlossyPuddleStrips({ curve }) {
  const aerialMudMaps = usePbrTextureSet(TUNNEL_TEXTURES.aerialMud, {
    repeat: [0.8, 7.5],
    anisotropy: 8,
  });

  const strips = useMemo(() => {
    return [-0.11, 0.02, 0.13].map((xOffset, index) => {
      const points = [];

      for (let i = 0; i <= 76; i += 1) {
        const t = i / 76;
        const p = curve.getPointAt(t);
        const waviness = Math.sin(t * Math.PI * 8 + index) * 0.018;

        points.push(
          new THREE.Vector3(
            p.x + xOffset + waviness,
            p.y - PIPE_RADIUS + 0.082 + index * 0.004,
            p.z,
          ),
        );
      }

      const tube = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        130,
        index === 1 ? 0.038 : 0.026,
        10,
        false,
      );

      return {
        id: `glossy-puddle-strip-${index}`,
        geometry: addUv2FromUv(tube),
        opacity: index === 1 ? 0.36 : 0.28,
      };
    });
  }, [curve]);

  return (
    <group>
      {strips.map((strip) => (
        <mesh key={strip.id} receiveShadow>
          <primitive attach="geometry" object={strip.geometry} />
          <meshPhysicalMaterial
            {...aerialMudMaps}
            color="#10100f"
            roughness={0.2}
            metalness={0.04}
            clearcoat={0.88}
            clearcoatRoughness={0.16}
            specularIntensity={0.95}
            transparent
            opacity={strip.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
