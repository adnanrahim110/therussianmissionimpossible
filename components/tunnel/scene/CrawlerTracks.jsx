"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { PIPE_RADIUS } from "../constants";

export function CrawlerTracks({ curve }) {
  const tracks = useMemo(() => {
    return [-0.18, 0.18].map((xOffset) => {
      const points = [];

      for (let i = 0; i <= 95; i += 1) {
        const t = i / 95;
        const p = curve.getPointAt(t);

        points.push(
          new THREE.Vector3(p.x + xOffset, p.y - PIPE_RADIUS + 0.074, p.z),
        );
      }

      return new THREE.CatmullRomCurve3(points);
    });
  }, [curve]);

  return (
    <group>
      {tracks.map((track, index) => (
        <mesh key={`crawler-track-${index}`} receiveShadow>
          <tubeGeometry args={[track, 190, 0.01, 8, false]} />
          <meshStandardMaterial
            color="#050404"
            roughness={0.68}
            metalness={0.42}
          />
        </mesh>
      ))}
    </group>
  );
}
