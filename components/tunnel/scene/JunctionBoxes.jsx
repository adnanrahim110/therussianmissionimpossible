"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { TUNNEL_MODELS } from "../assets";
import { prepareModelScene } from "../materials";
import { radialPoint, radialRotation } from "../utils";

export function JunctionBoxes({ curve }) {
  const electricalBoxesGltf = useGLTF(TUNNEL_MODELS.electricalBoxes);

  const boxes = useMemo(() => {
    return [
      { t: 0.24, angle: Math.PI * 0.64, scale: 0.38 },
      { t: 0.48, angle: -Math.PI * 0.5, scale: 0.34 },
      { t: 0.73, angle: Math.PI * 0.28, scale: 0.36 },
    ].map((item, index) => ({
      ...item,
      id: `junction-box-${index}`,
      position: radialPoint(curve, item.t, item.angle, 0.07),
    }));
  }, [curve]);

  const boxScenes = useMemo(() => {
    return boxes.map((_, index) =>
      prepareModelScene(electricalBoxesGltf.scene, {
        castShadow: index === 0,
        receiveShadow: true,
        color: "#24140e",
        colorMix: 0.45,
      }),
    );
  }, [boxes, electricalBoxesGltf.scene]);

  return (
    <group>
      {boxes.map((item, index) => (
        <group
          key={item.id}
          position={item.position}
          rotation={radialRotation(item.angle)}
        >
          <primitive
            object={boxScenes[index]}
            position={[0, -0.038, 0]}
            rotation={[0, 0, Math.PI / 2]}
            scale={item.scale}
          />

          <mesh position={[0.08, -0.065, 0.11]} renderOrder={2}>
            <sphereGeometry args={[0.012, 10, 10]} />
            <meshBasicMaterial color="#ef233c" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
