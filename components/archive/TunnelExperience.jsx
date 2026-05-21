"use client";

import { Button } from "@/components/ui/Button";
import {
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const PIPE_DIAMETER = 1.4;
const PIPE_RADIUS = PIPE_DIAMETER / 2;
const SOLDIER_HEIGHT = 1.95;
const PIPE_VISUAL_LENGTH = 58;

const DEFAULT_OPERATION_STOPS = [
  {
    id: "entry",
    number: "01",
    progress: 0,
    map: { x: 10, y: 78 },
    eyebrow: "ENTRY POINT",
    title: "Pipeline Entry",
    type: "Gas pipeline access",
    caption:
      "A low, cramped entry into the pipeline route. The camera sits close to the pipe floor instead of standing upright.",
    summary:
      "The operation begins inside a narrow industrial pipe, not a walkable tunnel. Movement is low, restricted, and physically uncomfortable.",
    targetLabel: "View archive",
    targetHref: "/archive",
  },
  {
    id: "diameter",
    number: "02",
    progress: 0.18,
    map: { x: 28, y: 70 },
    eyebrow: "DIAMETER CHECK",
    title: "Only 1.4m Wide",
    type: "Scale restriction",
    caption:
      "The pipe diameter is only 140 cm, smaller than a standing soldier.",
    summary:
      "The scene should feel claustrophobic. A person cannot stand here. They would crawl, crouch, or ride a small electric vehicle.",
    targetLabel: "View details",
    targetHref: "/operations",
  },
  {
    id: "crawler",
    number: "03",
    progress: 0.36,
    map: { x: 47, y: 58 },
    eyebrow: "MOVEMENT METHOD",
    title: "Electric Vehicle Movement",
    type: "Low cart / crawler movement",
    caption:
      "The motion should feel like a small vehicle vibrating through a pipe.",
    summary:
      "The camera movement uses low mechanical vibration, subtle bumps, and headlamp shake instead of a normal walking bob.",
    targetLabel: "View personnel",
    targetHref: "/personnel",
  },
  {
    id: "route",
    number: "04",
    progress: 0.56,
    map: { x: 62, y: 42 },
    eyebrow: "PIPELINE ROUTE",
    title: "15 KM Pipeline Route",
    type: "Long-distance underground route",
    caption:
      "The visual route bends through the map rather than feeling like a straight corridor.",
    summary:
      "The 3D tunnel uses a slight curved pipe path and a tactical route overlay to connect the scene with the operation map.",
    targetLabel: "View route",
    targetHref: "/archive",
  },
  {
    id: "prep",
    number: "05",
    progress: 0.76,
    map: { x: 76, y: 30 },
    eyebrow: "PREPARATORY TUNNEL",
    title: "4 KM Preparatory Tunnel",
    type: "Operation preparation section",
    caption:
      "A red operation marker highlights the preparatory section and route split.",
    summary:
      "This stage introduces the tactical overlay: route arrow, branch point, distance metrics, and military operation styling.",
    targetLabel: "View map",
    targetHref: "/operations",
  },
  {
    id: "exit",
    number: "06",
    progress: 1,
    map: { x: 90, y: 22 },
    eyebrow: "EXIT POINT",
    title: "Exit Near Sudzha",
    type: "Pipeline exit point",
    caption:
      "The tunnel opens into a harsh white/red glow as the route reaches the exit marker.",
    summary:
      "The ending should reveal the exit with physical light and fog first, not just a flat white fade.",
    targetLabel: "View report",
    targetHref: "/archive",
  },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / Math.max(edge1 - edge0, 0.0001), 0, 1);
  return t * t * (3 - 2 * t);
}

function normalizeStops(stops) {
  const source =
    Array.isArray(stops) && stops.length ? stops : DEFAULT_OPERATION_STOPS;
  const last = Math.max(source.length - 1, 1);

  return source.map((stop, index) => ({
    ...stop,
    id: stop.id ?? `operation-stop-${index}`,
    number: stop.number ?? String(index + 1).padStart(2, "0"),
    progress: typeof stop.progress === "number" ? stop.progress : index / last,
    map: stop.map ??
      DEFAULT_OPERATION_STOPS[index]?.map ?? {
        x: 12 + index * 15,
        y: 78 - index * 10,
      },
    eyebrow:
      stop.eyebrow ??
      DEFAULT_OPERATION_STOPS[index]?.eyebrow ??
      "OPERATION NODE",
    title:
      stop.title ??
      DEFAULT_OPERATION_STOPS[index]?.title ??
      `Route Node ${index + 1}`,
    type:
      stop.type ?? DEFAULT_OPERATION_STOPS[index]?.type ?? "Pipeline section",
    caption: stop.caption ?? DEFAULT_OPERATION_STOPS[index]?.caption ?? "",
    summary: stop.summary ?? DEFAULT_OPERATION_STOPS[index]?.summary ?? "",
    targetLabel:
      stop.targetLabel ??
      DEFAULT_OPERATION_STOPS[index]?.targetLabel ??
      "View details",
    targetHref:
      stop.targetHref ??
      DEFAULT_OPERATION_STOPS[index]?.targetHref ??
      "/archive",
  }));
}

function getStopIndexByProgress(stops, progress) {
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  stops.forEach((stop, index) => {
    const distance = Math.abs(stop.progress - progress);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

function getMapPosition(stops, progress) {
  if (!stops.length) return { x: 0, y: 0 };
  if (progress <= stops[0].progress) return stops[0].map;

  for (let index = 1; index < stops.length; index += 1) {
    const previous = stops[index - 1];
    const next = stops[index];

    if (progress <= next.progress) {
      const span = Math.max(next.progress - previous.progress, 0.001);
      const segmentProgress = clamp(
        (progress - previous.progress) / span,
        0,
        1,
      );

      return {
        x: previous.map.x + (next.map.x - previous.map.x) * segmentProgress,
        y: previous.map.y + (next.map.y - previous.map.y) * segmentProgress,
      };
    }
  }

  return stops[stops.length - 1].map;
}

function dispatchTunnelHeaderVisibility(visible) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("tunnel-section-visibility", {
      detail: { visible },
    }),
  );
}

function createTunnelAmbience() {
  if (typeof window === "undefined") return () => {};

  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext || null;

  if (!AudioContextClass) return () => {};

  const context = new AudioContextClass();
  const buffer = context.createBuffer(
    1,
    context.sampleRate * 2,
    context.sampleRate,
  );
  const data = buffer.getChannelData(0);

  let last = 0;
  for (let index = 0; index < data.length; index += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.022 * white) / 1.022;
    data[index] = last * 2.4;
  }

  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const lowpass = context.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 95;
  lowpass.Q.value = 0.7;

  const rumble = context.createOscillator();
  rumble.type = "sawtooth";
  rumble.frequency.value = 34;

  const rumbleGain = context.createGain();
  rumbleGain.gain.value = 0.0045;

  const gain = context.createGain();
  gain.gain.value = 0.014;

  noise.connect(lowpass);
  lowpass.connect(gain);
  rumble.connect(rumbleGain);
  rumbleGain.connect(gain);
  gain.connect(context.destination);

  noise.start();
  rumble.start();

  return () => {
    try {
      noise.stop();
      rumble.stop();
      context.close();
    } catch {}
  };
}

function createPipeTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const base = ctx.createLinearGradient(0, 0, canvas.width, 0);
  base.addColorStop(0, "#070504");
  base.addColorStop(0.18, "#211612");
  base.addColorStop(0.5, "#3a2921");
  base.addColorStop(0.82, "#17100e");
  base.addColorStop(1, "#060403");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Longitudinal brushed metal scratches.
  for (let y = 0; y < canvas.height; y += 3) {
    const alpha = Math.random() * 0.09;
    ctx.strokeStyle =
      Math.random() > 0.52
        ? `rgba(255,230,200,${alpha})`
        : `rgba(0,0,0,${alpha + 0.05})`;
    ctx.lineWidth = Math.random() * 1.6 + 0.2;
    ctx.beginPath();
    ctx.moveTo(Math.random() * 40, y);
    ctx.lineTo(
      canvas.width - Math.random() * 40,
      y + (Math.random() - 0.5) * 4,
    );
    ctx.stroke();
  }

  // Weld seams and circular pipe joints.
  for (let y = 0; y < canvas.height; y += 220) {
    ctx.fillStyle = "rgba(0,0,0,0.48)";
    ctx.fillRect(0, y - 3, canvas.width, 7);
    ctx.fillStyle = "rgba(255,230,190,0.045)";
    ctx.fillRect(0, y + 5, canvas.width, 1);
  }

  // Dark moisture streaks.
  for (let i = 0; i < 180; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = 30 + Math.random() * 190;
    const drip = ctx.createLinearGradient(x, y, x, y + length);
    drip.addColorStop(0, `rgba(7,10,12,${0.28 + Math.random() * 0.28})`);
    drip.addColorStop(0.55, `rgba(18,18,18,${0.12 + Math.random() * 0.2})`);
    drip.addColorStop(1, "rgba(18,18,18,0)");
    ctx.strokeStyle = drip;
    ctx.lineWidth = 0.8 + Math.random() * 3.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 7, y + length);
    ctx.stroke();
  }

  // Rust and dirt clouds.
  for (let i = 0; i < 95; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 30 + Math.random() * 150;
    const stain = ctx.createRadialGradient(x, y, 0, x, y, r);
    stain.addColorStop(0, "rgba(120,38,22,0.28)");
    stain.addColorStop(0.48, "rgba(65,24,18,0.16)");
    stain.addColorStop(1, "rgba(65,24,18,0)");
    ctx.fillStyle = stain;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Red operation paint marks, subtle not decorative.
  for (let i = 0; i < 18; i += 1) {
    const x = 70 + Math.random() * (canvas.width - 140);
    const y = Math.random() * canvas.height;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.25);
    ctx.fillStyle = `rgba(190,24,35,${0.14 + Math.random() * 0.14})`;
    ctx.fillRect(-35, -3, 70 + Math.random() * 35, 6 + Math.random() * 5);
    ctx.restore();
  }

  // Fine grime grain.
  for (let i = 0; i < 9000; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const a = Math.random() * 0.12;
    ctx.fillStyle =
      Math.random() > 0.55
        ? `rgba(255,255,255,${a * 0.6})`
        : `rgba(0,0,0,${a})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3.5, 14);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function createWetBottomTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 2048;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const center = ctx.createLinearGradient(0, 0, canvas.width, 0);
  center.addColorStop(0, "rgba(0,0,0,0)");
  center.addColorStop(0.5, "rgba(40,45,48,0.8)");
  center.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = center;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 32; i += 1) {
    const x = canvas.width * 0.5 + (Math.random() - 0.5) * canvas.width * 0.55;
    const y = Math.random() * canvas.height;
    const rx = 20 + Math.random() * 100;
    const ry = 25 + Math.random() * 190;
    const puddle = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    puddle.addColorStop(0, "rgba(120,145,155,0.13)");
    puddle.addColorStop(0.5, "rgba(30,40,45,0.2)");
    puddle.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = puddle;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 900; i += 1) {
    ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.055})`;
    ctx.lineWidth = Math.random() * 1.4;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 12, y + 30 + Math.random() * 70);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 10);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function createMarkerTexture(label) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#070606";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#981b22";
  ctx.fillRect(0, 0, 12, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 10, canvas.width - 26, canvas.height - 20);

  ctx.fillStyle = "#d5d0bd";
  ctx.font = "bold 18px ui-monospace, Menlo, monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("ROUTE", 30, 38);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px ui-monospace, Menlo, monospace";
  ctx.fillText(label, 30, 84);

  for (let i = 0; i < 900; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.55})`;
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 3,
      Math.random() * 3,
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function createPipeCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 2.5),
    new THREE.Vector3(0.04, -0.01, -5),
    new THREE.Vector3(-0.14, 0.02, -14),
    new THREE.Vector3(0.2, -0.02, -24),
    new THREE.Vector3(-0.08, 0.02, -35),
    new THREE.Vector3(0.1, 0, -46),
  ]);
}

function getCurveFrame(curve, t) {
  const point = curve.getPointAt(clamp(t, 0, 1));
  const tangent = curve.getTangentAt(clamp(t, 0, 1)).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    tangent,
  );

  return { point, tangent, quaternion };
}

function CameraRig({ progress, curve }) {
  const { camera, scene } = useThree();

  const headlampRef = useRef(null);
  const redRef = useRef(null);
  const fillRef = useRef(null);

  const headlampTarget = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    scene.add(headlampTarget);
    if (headlampRef.current) {
      headlampRef.current.target = headlampTarget;
    }

    return () => {
      scene.remove(headlampTarget);
    };
  }, [scene, headlampTarget]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const t = clamp(progress * 0.965, 0, 0.965);
    const lookT = clamp(t + 0.045, 0, 1);

    const current = curve.getPointAt(t);
    const look = curve.getPointAt(lookT);

    const vibration = Math.sin(time * 27.0 + progress * 80) * 0.006;
    const fastShake = Math.sin(time * 53.0) * 0.0028;
    const slowSway = Math.sin(time * 1.7 + progress * 8) * 0.022;
    const lateralScrape = Math.sin(progress * 42) * 0.018;
    const bumpMask =
      smoothstep(0.08, 0.16, progress) * (1 - smoothstep(0.88, 1, progress));
    const bump = Math.sin(progress * 130) * 0.01 * bumpMask;
    const roll = Math.sin(time * 5.8 + progress * 9) * 0.015;

    const camX = current.x + slowSway + lateralScrape;
    const camY = current.y - PIPE_RADIUS * 0.54 + vibration + fastShake + bump;
    const camZ = current.z;

    camera.position.set(camX, camY, camZ);
    camera.fov = 82 + smoothstep(0.68, 0.98, progress) * 6;
    camera.updateProjectionMatrix();

    camera.lookAt(
      look.x + slowSway * 0.28,
      look.y - PIPE_RADIUS * 0.45,
      look.z,
    );
    camera.rotateZ(roll);

    if (headlampRef.current) {
      headlampRef.current.position.set(camX, camY + 0.045, camZ + 0.04);
      headlampRef.current.intensity =
        20 + Math.sin(time * 13.5) * 0.8 + Math.sin(time * 31) * 0.28;
    }

    headlampTarget.position.set(
      look.x + slowSway * 0.2,
      look.y - PIPE_RADIUS * 0.42,
      look.z,
    );
    headlampTarget.updateMatrixWorld();

    if (redRef.current) {
      redRef.current.position.set(
        current.x - 0.22,
        current.y - 0.12,
        current.z + 1.4,
      );
      redRef.current.intensity = 1.25 + Math.sin(time * 2.2) * 0.15;
    }

    if (fillRef.current) {
      fillRef.current.position.set(current.x, current.y - 0.2, current.z - 0.8);
      fillRef.current.intensity = 0.18;
    }
  });

  return (
    <>
      <spotLight
        ref={headlampRef}
        color="#fff2df"
        intensity={20}
        distance={9}
        angle={0.52}
        penumbra={0.82}
        decay={1.75}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00025}
      />
      <pointLight
        ref={redRef}
        color="#b5161d"
        intensity={1.25}
        distance={4.2}
        decay={2.2}
      />
      <pointLight
        ref={fillRef}
        color="#23120f"
        intensity={0.18}
        distance={2.4}
        decay={2}
      />
    </>
  );
}

function PipelineShell({ curve }) {
  const pipeTexture = useMemo(() => createPipeTexture(), []);

  return (
    <mesh castShadow receiveShadow>
      <tubeGeometry args={[curve, 260, PIPE_RADIUS, 112, false]} />
      <meshPhysicalMaterial
        map={pipeTexture}
        bumpMap={pipeTexture}
        bumpScale={0.035}
        side={THREE.BackSide}
        color="#2d201a"
        roughness={0.78}
        metalness={0.46}
        clearcoat={0.18}
        clearcoatRoughness={0.55}
      />
    </mesh>
  );
}

function PipeRings({ curve }) {
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
        tube: heavy ? 0.018 : 0.007,
      };
    });
  }, [curve]);

  return (
    <group>
      {rings.map((ring) => (
        <mesh
          key={ring.id}
          position={ring.point}
          quaternion={ring.quaternion}
          castShadow
          receiveShadow
        >
          <torusGeometry
            args={[ring.radius, ring.tube, ring.heavy ? 12 : 8, 96]}
          />
          <meshStandardMaterial
            color={ring.heavy ? "#33231d" : "#18110e"}
            roughness={0.84}
            metalness={0.58}
          />
        </mesh>
      ))}
    </group>
  );
}

function WetBottomRibbon({ curve }) {
  const texture = useMemo(() => createWetBottomTexture(), []);

  const bottomCurve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 90; i += 1) {
      const t = i / 90;
      const p = curve.getPointAt(t);
      points.push(new THREE.Vector3(p.x, p.y - PIPE_RADIUS + 0.03, p.z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [curve]);

  return (
    <mesh receiveShadow>
      <tubeGeometry args={[bottomCurve, 180, 0.135, 16, false]} />
      <meshPhysicalMaterial
        map={texture}
        color="#111417"
        roughness={0.34}
        metalness={0.2}
        clearcoat={0.82}
        clearcoatRoughness={0.18}
        transparent
        opacity={0.78}
      />
    </mesh>
  );
}

function CrawlerTracks({ curve }) {
  const tracks = useMemo(() => {
    return [-0.18, 0.18].map((xOffset) => {
      const points = [];
      for (let i = 0; i <= 90; i += 1) {
        const t = i / 90;
        const p = curve.getPointAt(t);
        points.push(
          new THREE.Vector3(p.x + xOffset, p.y - PIPE_RADIUS + 0.07, p.z),
        );
      }

      return new THREE.CatmullRomCurve3(points);
    });
  }, [curve]);

  return (
    <group>
      {tracks.map((track, index) => (
        <mesh key={`crawler-track-${index}`} receiveShadow>
          <tubeGeometry args={[track, 180, 0.011, 8, false]} />
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

function PipeCables({ curve }) {
  const cables = useMemo(() => {
    const configs = [
      { x: -0.48, y: 0.22, radius: 0.012, color: "#080606" },
      { x: -0.42, y: 0.32, radius: 0.009, color: "#1c1110" },
      { x: 0.5, y: 0.24, radius: 0.01, color: "#120d0b" },
    ];

    return configs.map((cfg, cfgIndex) => {
      const points = [];
      for (let i = 0; i <= 90; i += 1) {
        const t = i / 90;
        const p = curve.getPointAt(t);
        const sag = Math.sin(t * Math.PI * 9 + cfgIndex) * 0.012;
        points.push(new THREE.Vector3(p.x + cfg.x, p.y + cfg.y + sag, p.z));
      }

      return {
        id: `pipe-cable-${cfgIndex}`,
        curve: new THREE.CatmullRomCurve3(points),
        radius: cfg.radius,
        color: cfg.color,
      };
    });
  }, [curve]);

  return (
    <group>
      {cables.map((cable) => (
        <mesh key={cable.id} castShadow receiveShadow>
          <tubeGeometry args={[cable.curve, 150, cable.radius, 8, false]} />
          <meshStandardMaterial
            color={cable.color}
            roughness={0.9}
            metalness={0.26}
          />
        </mesh>
      ))}
    </group>
  );
}

function OperationMarkers({ curve }) {
  const markers = useMemo(() => {
    return [
      { t: 0.12, label: "01", side: -1 },
      { t: 0.28, label: "140", side: 1 },
      { t: 0.47, label: "15K", side: -1 },
      { t: 0.66, label: "4K", side: 1 },
      { t: 0.84, label: "EXIT", side: -1 },
    ].map((item) => {
      const point = curve.getPointAt(item.t);
      return {
        ...item,
        position: new THREE.Vector3(
          point.x + item.side * (PIPE_RADIUS - 0.035),
          point.y - 0.12,
          point.z,
        ),
      };
    });
  }, [curve]);

  const textures = useMemo(
    () => markers.map((marker) => createMarkerTexture(marker.label)),
    [markers],
  );

  return (
    <group>
      {markers.map((marker, index) => {
        const texture = textures[index];
        if (!texture) return null;

        return (
          <mesh
            key={`operation-marker-${marker.label}-${index}`}
            position={marker.position}
            rotation={[0, marker.side > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[0.34, 0.17]} />
            <meshStandardMaterial
              map={texture}
              side={THREE.DoubleSide}
              roughness={0.64}
              metalness={0.18}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ForegroundOccluders({ curve }) {
  const objects = useMemo(() => {
    return [
      { t: 0.2, x: -0.4, y: 0.38, r: 0.018 },
      { t: 0.41, x: 0.46, y: 0.3, r: 0.014 },
      { t: 0.62, x: -0.48, y: 0.12, r: 0.016 },
      { t: 0.79, x: 0.38, y: 0.42, r: 0.012 },
    ].map((item, index) => {
      const p = curve.getPointAt(item.t);
      const points = [
        new THREE.Vector3(p.x + item.x, p.y + item.y, p.z + 1.2),
        new THREE.Vector3(p.x + item.x * 0.7, p.y + item.y - 0.1, p.z),
        new THREE.Vector3(p.x + item.x * 1.1, p.y + item.y + 0.05, p.z - 1.1),
      ];

      return {
        id: `close-cable-${index}`,
        curve: new THREE.CatmullRomCurve3(points),
        radius: item.r,
      };
    });
  }, [curve]);

  return (
    <group>
      {objects.map((item) => (
        <mesh key={item.id} castShadow>
          <tubeGeometry args={[item.curve, 36, item.radius, 8, false]} />
          <meshStandardMaterial
            color="#050303"
            roughness={0.92}
            metalness={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}

function NearDust({ progress, curve }) {
  const pointsRef = useRef(null);
  const count = 220;

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      data[index * 3] = (Math.random() - 0.5) * 1.25;
      data[index * 3 + 1] = (Math.random() - 0.5) * 0.8;
      data[index * 3 + 2] = 1.2 - Math.random() * 5.5;
    }

    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const p = curve.getPointAt(clamp(progress * 0.965, 0, 0.965));
    pointsRef.current.position.set(p.x, p.y - 0.18, p.z);
    pointsRef.current.rotation.z =
      Math.sin(clock.getElapsedTime() * 0.16) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d9c5aa"
        size={0.008}
        sizeAttenuation
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </points>
  );
}

function EntryHatch({ progress, curve }) {
  const groupRef = useRef(null);
  const doorMatRef = useRef(null);
  const rimMatRef = useRef(null);
  const glowMatRef = useRef(null);

  const frame = useMemo(() => getCurveFrame(curve, 0), [curve]);

  useFrame(() => {
    const fade = 1 - smoothstep(0.015, 0.105, progress);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 + (1 - fade) * 0.04);
    }

    if (doorMatRef.current) doorMatRef.current.opacity = fade;
    if (rimMatRef.current) rimMatRef.current.opacity = fade * 0.92;
    if (glowMatRef.current) glowMatRef.current.opacity = fade * 0.36;
  });

  return (
    <group ref={groupRef} position={frame.point} quaternion={frame.quaternion}>
      <mesh position={[0, 0, -0.025]}>
        <circleGeometry args={[PIPE_RADIUS * 0.92, 96]} />
        <meshStandardMaterial
          ref={doorMatRef}
          color="#020202"
          roughness={0.9}
          metalness={0.52}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[PIPE_RADIUS * 0.94, 0.045, 12, 96]} />
        <meshStandardMaterial
          ref={rimMatRef}
          color="#3d2c24"
          roughness={0.72}
          metalness={0.68}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[PIPE_RADIUS * 0.68, PIPE_RADIUS * 0.99, 96]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color="#d8e7ff"
          transparent
          opacity={0.36}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function EntranceDaylight({ progress, curve }) {
  const lightRef = useRef(null);
  const hemiRef = useRef(null);
  const start = useMemo(() => curve.getPointAt(0), [curve]);

  useFrame(() => {
    const fade = 1 - smoothstep(0, 0.2, progress);

    if (lightRef.current) {
      lightRef.current.intensity = fade * 4.2;
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = fade * 0.18;
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[start.x, start.y + 0.15, start.z + 0.45]}
        color="#bfcde0"
        intensity={4.2}
        distance={5.2}
        decay={1.7}
      />
      <hemisphereLight
        ref={hemiRef}
        color="#bfcde0"
        groundColor="#100806"
        intensity={0.18}
      />
    </>
  );
}

function ExitGlow({ progress, curve }) {
  const lightRef = useRef(null);
  const diskMatRef = useRef(null);
  const haloMatRef = useRef(null);
  const flareMatRef = useRef(null);
  const diskRef = useRef(null);
  const haloRef = useRef(null);

  const frame = useMemo(() => getCurveFrame(curve, 1), [curve]);

  useFrame(({ clock }) => {
    const reveal = smoothstep(0.68, 0.94, progress);
    const bloom = smoothstep(0.88, 1, progress);
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.4) * 0.018;

    if (lightRef.current) {
      lightRef.current.intensity = reveal * 5.8 + bloom * 9;
    }

    if (diskMatRef.current) {
      diskMatRef.current.opacity = reveal * 0.86;
    }

    if (haloMatRef.current) {
      haloMatRef.current.opacity = reveal * 0.5 + bloom * 0.25;
    }

    if (flareMatRef.current) {
      flareMatRef.current.opacity = bloom * 0.42;
    }

    if (diskRef.current) {
      diskRef.current.scale.setScalar(
        (0.35 + reveal * 1.15 + bloom * 0.75) * pulse,
      );
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(
        (0.7 + reveal * 2.4 + bloom * 1.2) * pulse,
      );
    }
  });

  return (
    <>
      <group position={frame.point} quaternion={frame.quaternion}>
        <pointLight
          ref={lightRef}
          color="#ffe6c2"
          intensity={0}
          distance={13}
          decay={1.25}
        />
        <mesh ref={diskRef} position={[0, 0, -0.1]}>
          <circleGeometry args={[0.38, 48]} />
          <meshBasicMaterial
            ref={diskMatRef}
            color="#fff0cf"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={haloRef}>
          <sphereGeometry args={[0.52, 32, 32]} />
          <meshBasicMaterial
            ref={haloMatRef}
            color="#ffdfb2"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <mesh position={[frame.point.x, frame.point.y, frame.point.z + 2]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          ref={flareMatRef}
          color="#fff2d6"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

function PipelineCanvas({ progress }) {
  const curve = useMemo(() => createPipeCurve(), []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{
        fov: 82,
        near: 0.025,
        far: 80,
        position: [0, -0.38, 2],
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.82;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      className="absolute inset-0"
    >
      <color attach="background" args={["#030202"]} />
      <fog attach="fog" args={["#080504", 2.2, 13.5]} />

      <ambientLight intensity={0.055} color="#4b2c24" />
      <hemisphereLight
        skyColor="#1d1410"
        groundColor="#020202"
        intensity={0.12}
      />

      <PipelineShell curve={curve} />
      <WetBottomRibbon curve={curve} />
      <CrawlerTracks curve={curve} />
      <PipeRings curve={curve} />
      <PipeCables curve={curve} />
      <OperationMarkers curve={curve} />
      <ForegroundOccluders curve={curve} />
      <NearDust progress={progress} curve={curve} />

      <EntryHatch progress={progress} curve={curve} />
      <EntranceDaylight progress={progress} curve={curve} />
      <ExitGlow progress={progress} curve={curve} />
      <CameraRig progress={progress} curve={curve} />
    </Canvas>
  );
}

function TacticalOperationMap({ stops, activeIndex, progress, onSelect }) {
  const currentPosition = getMapPosition(stops, progress);
  const completedPercent = Math.round(progress * 100);
  const routePoints = stops
    .map((stop) => `${stop.map.x},${stop.map.y}`)
    .join(" ");
  const patternId = useId().replace(/:/g, "");

  return (
    <div className="pointer-events-auto absolute left-4 top-4 z-10 w-76 overflow-hidden rounded-xl border border-red-500/20 bg-[#080708]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_70px_rgba(0,0,0,0.7)] backdrop-blur-md max-sm:left-3 max-sm:top-3 max-sm:w-[16rem]">
      <div className="border-b border-white/10 px-3 py-2.5">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-300/80">
          Operation "Stream"
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h3 className="font-heading text-lg font-black uppercase leading-none text-white">
            Route Monitor
          </h3>
          <span className="rounded border border-red-400/30 bg-red-500/10 px-2 py-1 font-mono text-[9px] font-bold text-red-100">
            {completedPercent}%
          </span>
        </div>
      </div>

      <div className="relative aspect-[1.15/1] overflow-hidden bg-[#121112]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <defs>
            <pattern
              id={`${patternId}-grid`}
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M7 0H0V7"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.4"
              />
            </pattern>
            <radialGradient id={`${patternId}-red`} cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#7f1016" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#220306" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="100" height="100" fill="#100f10" />
          <rect width="100" height="100" fill={`url(#${patternId}-grid)`} />

          <path
            d="M-10 86 C16 76 26 72 38 61 C48 52 50 39 63 35 C76 30 83 23 108 17 L108 108 L-10 108Z"
            fill={`url(#${patternId}-red)`}
            opacity="0.9"
          />

          <path
            d="M6 82 L18 74 L31 71 L44 61 L58 50 L66 36 L78 30 L92 22"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={routePoints}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={routePoints}
            fill="none"
            stroke="#ef233c"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - progress * 100}
          />

          <path
            d="M69 36 L90 25"
            stroke="#ef233c"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <path d="M90 25 L82 23 L85 31Z" fill="#ef233c" />

          {[
            { x: 18, y: 68, label: "SUDZHA" },
            { x: 64, y: 55, label: "MARTYNOVKA" },
            { x: 74, y: 18, label: "BIRJUKOVKA" },
            { x: 12, y: 50, label: "LEBEDEVKA" },
            { x: 35, y: 80, label: "MIRNYI" },
          ].map((item) => (
            <g key={item.label}>
              <rect
                x={item.x - 2}
                y={item.y - 2}
                width="4"
                height="4"
                fill="#ef233c"
                stroke="#fff"
                strokeWidth="0.8"
              />
              <text
                x={item.x + 4}
                y={item.y + 1.2}
                fill="#d8d2c0"
                className="font-mono text-[4px] font-bold uppercase"
              >
                {item.label}
              </text>
            </g>
          ))}

          {stops.map((stop, index) => {
            const reached = progress + 0.01 >= stop.progress;
            const active = index === activeIndex;

            return (
              <g
                key={stop.id}
                className="cursor-pointer"
                onClick={() => onSelect(index)}
              >
                <circle
                  cx={stop.map.x}
                  cy={stop.map.y}
                  r={active ? 4.5 : 3.2}
                  fill={reached ? "#ef233c" : "#111"}
                  stroke="#ffffff"
                  strokeWidth={active ? 1.6 : 1}
                />
                <text
                  x={stop.map.x}
                  y={stop.map.y + 1.2}
                  textAnchor="middle"
                  fill="#ffffff"
                  className="font-mono text-[3.2px] font-black"
                >
                  {index + 1}
                </text>
              </g>
            );
          })}

          <g transform={`translate(${currentPosition.x} ${currentPosition.y})`}>
            <circle r="7.5" fill="#ef233c" opacity="0.18" />
            <circle r="4.2" fill="#ef233c" stroke="#ffffff" strokeWidth="1.2" />
            <path d="M0 -2.7 2.3 2.6 0 1.35 -2.3 2.6Z" fill="#ffffff" />
          </g>
        </svg>

        <div className="absolute bottom-2 left-2 right-2 rounded-lg border border-white/10 bg-black/70 px-2.5 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-stone-400">
              Pipeline route
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-red-200">
              15 KM
            </p>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,35,60,0.85)]"
              style={{ width: `${completedPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DiameterScaleOverlay() {
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden w-84 rounded-xl border border-white/10 bg-black/55 p-3 backdrop-blur-md xl:block">
      <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-red-200/80">
        Diameter comparison
      </p>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div className="text-center">
          <div className="grid size-28 place-items-center rounded-full border-2 border-white bg-white text-black">
            <span className="font-heading text-xl font-black">140 cm</span>
          </div>
          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-stone-300">
            Pipe diameter
          </p>
        </div>

        <div className="relative h-40 w-20">
          <div className="absolute bottom-0 left-1/2 h-36 w-10 -translate-x-1/2 rounded-t-full bg-white" />
          <div className="absolute bottom-[8.7rem] left-1/2 size-8 -translate-x-1/2 rounded-full bg-white" />
          <div className="absolute bottom-0 right-0 h-40 w-px bg-white/80" />
          <p className="absolute right-2 top-0 font-heading text-lg font-black text-white">
            195 cm
          </p>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-4 text-stone-300">
        The viewer is inside a 1.4m pipe, so the camera must feel low,
        compressed, and uncomfortable — never upright.
      </p>
    </div>
  );
}

function SceneStats({ progress }) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-end gap-2 max-md:hidden">
      <div className="rounded-lg border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-stone-400">
          Diameter
        </p>
        <div className="mt-1 flex items-end gap-1.5">
          <span className="font-heading text-3xl font-black leading-none text-white">
            1.4
          </span>
          <span className="pb-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-stone-300">
            meters
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-stone-400">
          Pipeline
        </p>
        <p className="mt-1 text-xs font-semibold text-white">
          {Math.round(progress * 15)} / 15 km
        </p>
      </div>

      <div className="rounded-lg border border-red-500/30 bg-red-950/50 px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-red-200/80">
          Status
        </p>
        <p className="mt-1 text-xs font-semibold text-white">
          {progress < 0.16
            ? "Entry"
            : progress > 0.84
              ? "Exit approach"
              : "Inside pipe"}
        </p>
      </div>
    </div>
  );
}

function TunnelScene({ progress, activeIndex, stops, onSelectStop }) {
  const exitFade = smoothstep(0.93, 1, progress);

  return (
    <div className="relative h-full min-h-0 overflow-hidden rounded-2xl bg-black">
      <PipelineCanvas progress={progress} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,0,0,0.5)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.56),transparent_28%,transparent_72%,rgba(0,0,0,0.58)),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_48%,rgba(0,0,0,0.42))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.45)_0_1px,transparent_1px_3px)]" />

      <TacticalOperationMap
        stops={stops}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelectStop}
      />

      <SceneStats progress={progress} />
      <DiameterScaleOverlay />

      <div
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(255,239,202,0.94)_0%,rgba(255,225,180,0.72)_38%,rgba(255,255,255,0.64)_100%)]"
        style={{ opacity: exitFade }}
      />
    </div>
  );
}

function DetailImage({ stop }) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(stop?.image) && !failed;

  return (
    <div className="relative h-28 overflow-hidden rounded-xl border border-white/10 bg-stone-950">
      {hasImage ? (
        <Image
          src={stop.image}
          alt={stop.title ?? "Operation image"}
          fill
          sizes="360px"
          className="object-cover opacity-55"
          onError={() => setFailed(true)}
        />
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_30%,rgba(239,35,60,0.28),transparent_24%),linear-gradient(135deg,rgba(20,5,5,0.35),rgba(3,3,3,0.96))]" />

      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-red-200/80">
          {stop?.eyebrow}
        </p>
        <p className="mt-1 font-heading text-lg font-black text-white">
          {stop?.title}
        </p>
      </div>
    </div>
  );
}

function RightDetails({
  stop,
  stops,
  activeIndex,
  progress,
  audioEnabled,
  onToggleAudio,
  onSelectStop,
}) {
  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#080707]/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div className="shrink-0 border-b border-white/10 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-300/80">
              Operation briefing
            </p>
            <h2 className="mt-1 font-heading text-2xl font-black uppercase leading-none text-white">
              Stream
            </h2>
          </div>

          <button
            type="button"
            onClick={onToggleAudio}
            className={cn(
              "rounded-md border px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] transition-colors",
              audioEnabled
                ? "border-red-400/40 bg-red-500/15 text-red-100"
                : "border-white/10 bg-white/5 text-stone-300 hover:bg-white/10",
            )}
          >
            {audioEnabled ? "Audio on" : "Audio off"}
          </button>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,35,60,0.85)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-stone-500">
          <span>Entry</span>
          <span>{Math.round(progress * 100)}%</span>
          <span>Exit</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <DetailImage stop={stop} />

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-red-200/80">
              {stop?.eyebrow}
            </p>
            <h3 className="mt-1.5 font-heading text-2xl font-black leading-tight text-white">
              {stop?.title}
            </h3>
          </div>

          <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-red-300/25 bg-red-500/15 font-heading text-base font-black text-white">
            {stop?.number}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-6 text-stone-300">
          {stop?.caption}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-lg border border-white/10 bg-white/4 p-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-stone-500">
              Type
            </p>
            <p className="mt-1.5 text-xs font-semibold text-white">
              {stop?.type}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/4 p-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-stone-500">
              Distance
            </p>
            <p className="mt-1.5 text-xs font-semibold text-white">
              {Math.round((stop?.progress ?? 0) * 15)} km
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-950/20 p-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-red-200/70">
            Mission note
          </p>
          <p className="mt-2 text-[13px] leading-6 text-stone-300">
            {stop?.summary}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-white/10 bg-black/40 p-2.5 text-center">
            <p className="font-heading text-xl font-black text-white">1.4m</p>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.18em] text-stone-500">
              diameter
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 p-2.5 text-center">
            <p className="font-heading text-xl font-black text-white">15km</p>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.18em] text-stone-500">
              pipeline
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 p-2.5 text-center">
            <p className="font-heading text-xl font-black text-white">4km</p>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.18em] text-stone-500">
              prep
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {stop?.targetHref ? (
            <Button
              href={stop.targetHref}
              iconKey={getRouteIconKey(stop.targetHref)}
            >
              {stop?.targetLabel ?? "View details"}
            </Button>
          ) : null}

          <Button href="/personnel" variant="outline" iconKey="personnel">
            Personnel
          </Button>
        </div>

        <div className="mt-5 space-y-2">
          {stops.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectStop(index)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors",
                index === activeIndex
                  ? "border-red-500/40 bg-red-500/12"
                  : "border-white/10 bg-white/3 hover:bg-white/6",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border text-[10px] font-black",
                  progress + 0.01 >= item.progress
                    ? "border-white bg-red-700 text-white"
                    : "border-white/15 bg-black/30 text-stone-500",
                )}
              >
                {index + 1}
              </span>

              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold text-white xl:text-sm">
                  {item.title}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 truncate text-[10px] text-stone-400 xl:text-[11px]">
                  <ArchiveInlineIcon
                    iconKey={getRouteIconKey(item.targetHref)}
                    size={11}
                  />
                  {item.eyebrow}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function MobileScene({
  stops,
  activeIndex,
  progress,
  audioEnabled,
  onToggleAudio,
  onSelectStop,
}) {
  const activeStop = stops[activeIndex] ?? stops[0];

  return (
    <div className="grid gap-3 lg:hidden">
      <div className="h-[68svh] min-h-136 overflow-hidden rounded-2xl border border-white/10 bg-black">
        <TunnelScene
          progress={progress}
          activeIndex={activeIndex}
          stops={stops}
          onSelectStop={onSelectStop}
        />
      </div>

      <div className="max-h-[80svh] overflow-hidden">
        <RightDetails
          stop={activeStop}
          stops={stops}
          activeIndex={activeIndex}
          progress={progress}
          audioEnabled={audioEnabled}
          onToggleAudio={onToggleAudio}
          onSelectStop={onSelectStop}
        />
      </div>
    </div>
  );
}

export function TunnelExperience({ stops = [], prompt }) {
  const componentRef = useRef(null);
  const stageRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const audioCleanupRef = useRef(null);

  const normalizedStops = useMemo(() => normalizeStops(stops), [stops]);
  const lastIndex = Math.max(normalizedStops.length - 1, 0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const activeStop = normalizedStops[activeIndex] ?? normalizedStops[0];

  useEffect(() => {
    if (!audioEnabled) {
      audioCleanupRef.current?.();
      audioCleanupRef.current = null;
      return;
    }

    audioCleanupRef.current = createTunnelAmbience();

    return () => {
      audioCleanupRef.current?.();
      audioCleanupRef.current = null;
    };
  }, [audioEnabled]);

  useEffect(() => {
    return () => dispatchTunnelHeaderVisibility(false);
  }, []);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          if (!conditions?.desktop) {
            const headerTrigger = ScrollTrigger.create({
              id: "operation-stream-pipeline-header-mobile",
              trigger: componentRef.current,
              start: "top top",
              end: "bottom top",
              onEnter: () => dispatchTunnelHeaderVisibility(true),
              onEnterBack: () => dispatchTunnelHeaderVisibility(true),
              onLeave: () => dispatchTunnelHeaderVisibility(false),
              onLeaveBack: () => dispatchTunnelHeaderVisibility(false),
              onRefresh: (self) =>
                dispatchTunnelHeaderVisibility(Boolean(self.isActive)),
            });

            dispatchTunnelHeaderVisibility(Boolean(headerTrigger.isActive));

            return () => {
              dispatchTunnelHeaderVisibility(false);
              headerTrigger.kill();
            };
          }

          const trigger = ScrollTrigger.create({
            id: "operation-stream-pipeline-scene",
            trigger: stage,
            start: "top top",
            end: `+=${window.innerHeight * (normalizedStops.length + 1)}`,
            pin: true,
            scrub: conditions.reduce ? false : 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => dispatchTunnelHeaderVisibility(true),
            onEnterBack: () => dispatchTunnelHeaderVisibility(true),
            onLeave: () => dispatchTunnelHeaderVisibility(false),
            onLeaveBack: () => dispatchTunnelHeaderVisibility(false),
            onRefresh: (self) =>
              dispatchTunnelHeaderVisibility(Boolean(self.isActive)),
            snap: conditions.reduce
              ? false
              : {
                  snapTo: normalizedStops.map((stop) => stop.progress),
                  duration: 0.24,
                  ease: "power1.inOut",
                },
            onUpdate(self) {
              const nextProgress = clamp(self.progress, 0, 1);
              const nextIndex = getStopIndexByProgress(
                normalizedStops,
                nextProgress,
              );

              setProgress(nextProgress);
              setActiveIndex(nextIndex);
            },
          });

          scrollTriggerRef.current = trigger;
          dispatchTunnelHeaderVisibility(Boolean(trigger.isActive));

          return () => {
            dispatchTunnelHeaderVisibility(false);
            trigger.kill();
            scrollTriggerRef.current = null;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: componentRef, dependencies: [normalizedStops.length] },
  );

  const jumpToStop = (index) => {
    const clampedIndex = clamp(index, 0, lastIndex);
    const nextProgress = normalizedStops[clampedIndex]?.progress ?? 0;

    setProgress(nextProgress);
    setActiveIndex(clampedIndex);

    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const target = trigger.start + (trigger.end - trigger.start) * nextProgress;

    gsap.to(window, {
      scrollTo: target,
      duration: 0.85,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      ref={componentRef}
      data-hide-header
      className="relative w-full max-w-full overflow-x-hidden bg-stone-950 text-white"
    >
      <div className="w-full max-w-full overflow-x-hidden px-0">
        <div className="mb-3 flex items-center justify-between gap-3 px-3 pt-3 lg:hidden">
          <div className="rounded-xl border border-white/10 bg-white/3 px-4 py-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-red-300/80">
              Operation "Stream"
            </p>
            <p className="mt-1 text-sm text-stone-300">
              {prompt ??
                "A cramped 1.4m gas-pipeline route with tactical movement, route data, and military briefing overlays."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => jumpToStop(activeIndex + 1)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]"
          >
            Next
          </button>
        </div>

        <div
          ref={stageRef}
          className="relative min-h-screen w-full overflow-hidden px-3 py-3 lg:h-screen"
        >
          <div className="hidden h-full min-h-0 grid-cols-[minmax(0,1fr)_23rem] gap-3 lg:grid">
            <TunnelScene
              progress={progress}
              activeIndex={activeIndex}
              stops={normalizedStops}
              onSelectStop={jumpToStop}
            />

            <RightDetails
              stop={activeStop}
              stops={normalizedStops}
              activeIndex={activeIndex}
              progress={progress}
              audioEnabled={audioEnabled}
              onToggleAudio={() => setAudioEnabled((value) => !value)}
              onSelectStop={jumpToStop}
            />
          </div>

          <MobileScene
            stops={normalizedStops}
            activeIndex={activeIndex}
            progress={progress}
            audioEnabled={audioEnabled}
            onToggleAudio={() => setAudioEnabled((value) => !value)}
            onSelectStop={jumpToStop}
          />
        </div>
      </div>
    </section>
  );
}
