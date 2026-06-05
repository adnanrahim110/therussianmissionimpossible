"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PIPE_RADIUS, TUNNEL_ENTRANCE_END } from "../constants";
import { clamp, getCameraCurveProgress, smoothstep } from "../utils";

const HEADLIGHTS = {
  left: 30,
  right: 26,
  center: 18,
};

export function VehicleCameraRig({ progress, curve }) {
  const { camera, scene } = useThree();

  const leftWallLightRef = useRef(null);
  const rightWallLightRef = useRef(null);
  const centerLightRef = useRef(null);
  const lowSoftFillRef = useRef(null);
  const redRearRef = useRef(null);

  const leftTarget = useMemo(() => new THREE.Object3D(), []);
  const rightTarget = useMemo(() => new THREE.Object3D(), []);
  const centerTarget = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    scene.add(leftTarget);
    scene.add(rightTarget);
    scene.add(centerTarget);

    if (leftWallLightRef.current) leftWallLightRef.current.target = leftTarget;
    if (rightWallLightRef.current)
      rightWallLightRef.current.target = rightTarget;
    if (centerLightRef.current) centerLightRef.current.target = centerTarget;

    return () => {
      scene.remove(leftTarget);
      scene.remove(rightTarget);
      scene.remove(centerTarget);
    };
  }, [scene, leftTarget, rightTarget, centerTarget]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const entrancePush = smoothstep(0, TUNNEL_ENTRANCE_END, progress);
    const t = clamp(getCameraCurveProgress(progress), 0, 0.985);
    const lookT = clamp(t + 0.06, 0, 1);

    const start = curve.getPointAt(0);
    const startTangent = curve.getTangentAt(0).normalize();
    const current = curve.getPointAt(t);
    const look = curve.getPointAt(lookT);

    const outsideCamera = start.clone().addScaledVector(startTangent, -2.35);
    outsideCamera.y -= PIPE_RADIUS * 0.18;

    const vibrationY =
      Math.sin(time * 28 + progress * 80) * 0.0046 * entrancePush;
    const fastShake = Math.sin(time * 54) * 0.0018 * entrancePush;
    const slowSway = Math.sin(time * 1.6 + progress * 8) * 0.016 * entrancePush;
    const lateralScrape = Math.sin(progress * 42) * 0.012 * entrancePush;

    const bumpMask =
      smoothstep(0.08, 0.16, progress) * (1 - smoothstep(0.88, 1, progress));

    const bump = Math.sin(progress * 130) * 0.0065 * bumpMask;
    const roll = Math.sin(time * 5.6 + progress * 9) * 0.009 * entrancePush;

    // Simulate speed breakers over the 3 pipe joints
    const getJointBump = (checkT) => {
      let b = 0;
      [0.25, 0.5, 0.75].forEach((jt) => {
        const dist = Math.abs(checkT - jt);
        if (dist < 0.008) {
          // Sharp curve to simulate rolling over a metal flange
          // We use (1 - smoothstep) because the custom utils.js smoothstep doesn't support inverted edges
          b += (1 - smoothstep(0, 0.008, dist)) * 0.075;
        }
      });
      return b;
    };

    const camJointBump = getJointBump(t);
    const lookJointBump = getJointBump(t + 0.004) * 0.8; // Front wheels hit first

    const insideCamera = new THREE.Vector3(
      current.x + slowSway + lateralScrape,
      current.y - PIPE_RADIUS * 0.53 + vibrationY + fastShake + bump + camJointBump,
      current.z,
    );

    const cameraPosition = outsideCamera.lerp(insideCamera, entrancePush);

    camera.position.copy(cameraPosition);
    camera.fov = 72 + entrancePush * 4 + smoothstep(0.68, 0.98, progress) * 3.8;
    camera.updateProjectionMatrix();

    camera.lookAt(
      look.x + slowSway * 0.18,
      look.y - PIPE_RADIUS * 0.36 + lookJointBump,
      look.z,
    );

    camera.rotateZ(roll);

    const flicker =
      1 + Math.sin(time * 8.2) * 0.018 + Math.sin(time * 23.7) * 0.008;

    const headlightRamp = 0.38 + entrancePush * 0.62;
    const camX = cameraPosition.x;
    const camY = cameraPosition.y;
    const camZ = cameraPosition.z;
    const lightZ = camZ + 0.12;
    const lightY = camY + 0.045;

    if (leftWallLightRef.current) {
      leftWallLightRef.current.position.set(camX - 0.22, lightY, lightZ);
      leftWallLightRef.current.intensity =
        HEADLIGHTS.left * flicker * headlightRamp;
    }

    if (rightWallLightRef.current) {
      rightWallLightRef.current.position.set(camX + 0.22, lightY, lightZ);
      rightWallLightRef.current.intensity =
        HEADLIGHTS.right * flicker * headlightRamp;
    }

    if (centerLightRef.current) {
      centerLightRef.current.position.set(camX, lightY - 0.035, lightZ);
      centerLightRef.current.intensity =
        HEADLIGHTS.center * flicker * headlightRamp;
    }

    leftTarget.position.set(
      look.x - PIPE_RADIUS * 0.86,
      look.y - PIPE_RADIUS * 0.14,
      look.z - 1.32,
    );

    rightTarget.position.set(
      look.x + PIPE_RADIUS * 0.86,
      look.y - PIPE_RADIUS * 0.14,
      look.z - 1.32,
    );

    centerTarget.position.set(
      look.x,
      look.y - PIPE_RADIUS * 0.48,
      look.z - 1.38,
    );

    leftTarget.updateMatrixWorld();
    rightTarget.updateMatrixWorld();
    centerTarget.updateMatrixWorld();

    if (lowSoftFillRef.current) {
      lowSoftFillRef.current.position.set(camX, camY + 0.08, camZ - 0.85);
      lowSoftFillRef.current.intensity = 0.3 + entrancePush * 0.12;
    }

    if (redRearRef.current) {
      redRearRef.current.position.set(
        current.x - 0.25,
        current.y - 0.12,
        current.z + 1.25,
      );
      redRearRef.current.intensity =
        (0.82 + Math.sin(time * 2.1) * 0.08) * entrancePush;
    }
  });

  return (
    <>
      <spotLight
        ref={leftWallLightRef}
        color="#dbe9ff"
        intensity={HEADLIGHTS.left}
        distance={30}
        angle={0.94}
        penumbra={1.0}
        decay={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00025}
      />

      <spotLight
        ref={rightWallLightRef}
        color="#c7dcff"
        intensity={HEADLIGHTS.right}
        distance={30}
        angle={0.94}
        penumbra={1.0}
        decay={1.8}
        castShadow={false}
      />

      <spotLight
        ref={centerLightRef}
        color="#8fbaff"
        intensity={HEADLIGHTS.center}
        distance={23}
        angle={0.62}
        penumbra={1.0}
        decay={1.9}
        castShadow={false}
      />

      <pointLight
        ref={lowSoftFillRef}
        color="#39495c"
        intensity={0.36}
        distance={4.4}
        decay={2}
      />

      <pointLight
        ref={redRearRef}
        color="#9c1117"
        intensity={2.5}
        distance={6}
        decay={2.2}
      />
    </>
  );
}
