"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TUNNEL_TEXTURES } from "../assets";
import { PIPE_RADIUS } from "../constants";
import { usePbrTextureSet } from "../materials";

export function WetBottomRibbon({ curve }) {
  const mudMaps = usePbrTextureSet(TUNNEL_TEXTURES.mud, {
    repeat: [400, 4],
    anisotropy: 16,
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
    return tube;
  }, [bottomCurve]);

  return (
    <group>
      <mesh receiveShadow>
        <primitive attach="geometry" object={geometry} />
        <meshPhysicalMaterial
          {...mudMaps}
          color="#161210"
          roughness={0.65}
          metalness={0.08}
          normalScale={new THREE.Vector2(1.2, 1.2)}
          clearcoat={0.25}
          clearcoatRoughness={0.45}
          specularIntensity={0.5}
          displacementScale={0.015}
          displacementBias={-0.0075}
          transparent
          opacity={0.85}
        />
      </mesh>

      <GlossyPuddleStrips curve={curve} />
    </group>
  );
}

function GlossyPuddleStrips({ curve }) {
  const aerialMudMaps = usePbrTextureSet(TUNNEL_TEXTURES.aerialMud, {
    repeat: [200, 2],
    anisotropy: 16,
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
        geometry: tube,
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
            color="#14110f"
            roughness={0.35}
            metalness={0.05}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
            specularIntensity={0.7}
            transparent
            opacity={strip.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
