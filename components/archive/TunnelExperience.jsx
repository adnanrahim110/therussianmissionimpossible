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

const TUNNEL_LENGTH = 56;
const TUNNEL_RADIUS = 1.95;
const TUNNEL_TRAVEL = 34;

const defaultTunnelStops = [
  {
    id: "entry",
    number: "01",
    eyebrow: "Entry",
    title: "Pipe Entry",
    summary:
      "The route begins at the access hatch before the camera descends into the pipe.",
    caption:
      "The user starts at the access point, then moves through the circular hatch into the pipeline interior.",
    type: "Entry Point",
    targetHref: "/archive/operation-stream/entry",
    targetLabel: "Open Entry Record",
    image: "/images/tunnel/entry.jpg",
    progress: 0,
    map: { x: 88, y: 26 },
  },
  {
    id: "collector",
    number: "02",
    eyebrow: "Collector",
    title: "Main Collector",
    summary:
      "The route passes through a larger collector section before narrowing again.",
    caption:
      "This stage briefly opens the visual scale, then compresses the route back into a claustrophobic pipe journey.",
    type: "Collector Chamber",
    targetHref: "/archive/operation-stream/collector",
    targetLabel: "Open Collector Record",
    image: "/images/tunnel/collector.jpg",
    progress: 0.14,
    map: { x: 79, y: 39 },
  },
  {
    id: "pipe",
    number: "03",
    eyebrow: "Interior",
    title: "1.4m Pipe Crawl",
    summary:
      "The core tunnel movement happens inside a dirty, ribbed, enclosed metal pipe.",
    caption:
      "The scene uses actual cylinder geometry, close wall ribs, seams, grime, damp streaks, and camera sway to feel like a real tunnel.",
    type: "Tunnel Passage",
    targetHref: "/archive/operation-stream/pipe",
    targetLabel: "Open Pipe Record",
    image: "/images/tunnel/pipe.jpg",
    progress: 0.3,
    map: { x: 69, y: 51 },
  },
  {
    id: "split",
    number: "04",
    eyebrow: "Split",
    title: "Forward Split",
    summary:
      "The underground route reaches the forward split where objective branches begin.",
    caption:
      "The route HUD activates branch indicators while the camera keeps moving inside the same pipe scene.",
    type: "Forward Route",
    targetHref: "/archive/operation-stream/split",
    targetLabel: "Open Split Record",
    image: "/images/tunnel/split.jpg",
    progress: 0.48,
    map: { x: 57, y: 58 },
  },
  {
    id: "trenches",
    number: "05",
    eyebrow: "Group 1",
    title: "Trench Objective",
    summary: "The first output group branches toward trench positions.",
    caption:
      "The HUD highlights the first objective branch while the tunnel remains the main visual environment.",
    type: "Output Group",
    targetHref: "/archive/operation-stream/trenches",
    targetLabel: "Open Group 1 Record",
    image: "/images/tunnel/trenches.jpg",
    progress: 0.62,
    map: { x: 47, y: 60 },
  },
  {
    id: "bridge",
    number: "06",
    eyebrow: "Group 2",
    title: "Bridge Objective",
    summary: "A second branch moves toward the bridge objective.",
    caption:
      "The route marker advances and the bridge line turns active on the tactical display.",
    type: "Output Group",
    targetHref: "/archive/operation-stream/bridge",
    targetLabel: "Open Bridge Record",
    image: "/images/tunnel/bridge.jpg",
    progress: 0.75,
    map: { x: 39, y: 66 },
  },
  {
    id: "hotel",
    number: "07",
    eyebrow: "Group 2",
    title: "Hotel Sector",
    summary: "The objective branch pushes toward the hotel sector.",
    caption:
      "The end of the tunnel begins to brighten while the objective branches become easier to read.",
    type: "Output Group",
    targetHref: "/archive/operation-stream/hotel",
    targetLabel: "Open Hotel Record",
    image: "/images/tunnel/hotel.jpg",
    progress: 0.87,
    map: { x: 35, y: 49 },
  },
  {
    id: "exit",
    number: "08",
    eyebrow: "Exit",
    title: "Exit Point",
    summary: "The camera reaches the exit glow and completes the tunnel route.",
    caption:
      "The final stage opens the tunnel with a controlled bloom while the full route remains visible on the HUD.",
    type: "Exit Point",
    targetHref: "/archive/operation-stream/exit",
    targetLabel: "Open Exit Record",
    image: "/images/tunnel/exit.jpg",
    progress: 1,
    map: { x: 18, y: 45 },
  },
];

const objectiveBranches = [
  { id: "trenches", from: { x: 47, y: 60 }, to: { x: 58, y: 48 }, at: 0.58 },
  { id: "bridge", from: { x: 39, y: 66 }, to: { x: 34, y: 79 }, at: 0.72 },
  { id: "hotel", from: { x: 39, y: 66 }, to: { x: 36, y: 39 }, at: 0.8 },
  { id: "exit", from: { x: 31, y: 54 }, to: { x: 18, y: 45 }, at: 0.92 },
];

const hudMapRoads = [
  {
    id: "north-service",
    d: "M6 23 C22 19 31 20 42 25 S64 33 79 24 96 18",
    width: 4.4,
  },
  {
    id: "central-service",
    d: "M-2 70 C14 63 27 66 41 60 S68 51 78 44 101 40",
    width: 5.2,
  },
  {
    id: "south-service",
    d: "M4 90 C18 84 32 78 45 79 S66 88 88 78",
    width: 3.6,
  },
  {
    id: "connector-a",
    d: "M28 4 C31 17 35 31 44 43 S53 57 54 78",
    width: 3,
  },
  {
    id: "connector-b",
    d: "M72 5 C67 20 62 34 57 49 S49 75 47 98",
    width: 3.2,
  },
];

const hudMapZones = [
  { id: "rail-yard", x: 4, y: 7, width: 27, height: 18, rx: 4 },
  { id: "industrial", x: 61, y: 12, width: 28, height: 19, rx: 5 },
  { id: "river", x: 9, y: 77, width: 38, height: 14, rx: 7 },
  { id: "sector", x: 66, y: 63, width: 24, height: 18, rx: 5 },
];

const hudMapLabels = [
  { id: "entry-label", x: 81, y: 18, label: "Entry" },
  { id: "pipe-label", x: 53, y: 42, label: "Main pipe" },
  { id: "split-label", x: 42, y: 72, label: "Branch" },
  { id: "exit-label", x: 10, y: 39, label: "Exit" },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function normalizeStops(stops) {
  const source =
    Array.isArray(stops) && stops.length ? stops : defaultTunnelStops;
  const last = Math.max(source.length - 1, 1);

  return source.map((stop, index) => ({
    ...defaultTunnelStops[index % defaultTunnelStops.length],
    ...stop,
    number: stop.number ?? String(index + 1).padStart(2, "0"),
    progress: typeof stop.progress === "number" ? stop.progress : index / last,
    map: stop.map ?? defaultTunnelStops[index % defaultTunnelStops.length]?.map,
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
    last = (last + 0.028 * white) / 1.028;
    data[index] = last * 2.1;
  }

  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 125;
  filter.Q.value = 0.65;

  const rumble = context.createOscillator();
  rumble.type = "triangle";
  rumble.frequency.value = 41;

  const rumbleGain = context.createGain();
  rumbleGain.gain.value = 0.008;

  const gain = context.createGain();
  gain.gain.value = 0.018;

  noise.connect(filter);
  filter.connect(gain);
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
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, "#1d1815");
  base.addColorStop(0.35, "#3a2f29");
  base.addColorStop(0.55, "#22191595");
  base.addColorStop(0.78, "#403229");
  base.addColorStop(1, "#1c1613");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // panel seams (vertical, simulating welded plates around the circumference)
  for (let x = 0; x < canvas.width; x += 128) {
    const seam = ctx.createLinearGradient(x - 4, 0, x + 4, 0);
    seam.addColorStop(0, "rgba(0,0,0,0)");
    seam.addColorStop(0.5, "rgba(0,0,0,0.55)");
    seam.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = seam;
    ctx.fillRect(x - 4, 0, 8, canvas.height);
  }

  // horizontal joining bands
  for (let y = 0; y < canvas.height; y += 256) {
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.fillRect(0, y - 1, canvas.width, 3);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(0, y + 2, canvas.width, 1);
  }

  // micro horizontal scuffs
  for (let y = 0; y < canvas.height; y += 6) {
    ctx.fillStyle =
      Math.random() > 0.7 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.16)";
    ctx.fillRect(0, y, canvas.width, 1 + Math.random() * 2);
  }

  // bolts along seams
  for (let x = 0; x < canvas.width; x += 128) {
    for (let y = 32; y < canvas.height; y += 96) {
      const bx = x + (Math.random() - 0.5) * 2;
      const by = y + (Math.random() - 0.5) * 2;
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.beginPath();
      ctx.arc(bx, by, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(180,160,140,0.55)";
      ctx.beginPath();
      ctx.arc(bx - 0.6, by - 0.6, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // damp drips
  for (let index = 0; index < 240; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = 18 + Math.random() * 130;
    const alpha = 0.05 + Math.random() * 0.12;
    const drip = ctx.createLinearGradient(x, y, x, y + length);
    drip.addColorStop(0, `rgba(225,220,205,${alpha})`);
    drip.addColorStop(1, "rgba(225,220,205,0)");
    ctx.strokeStyle = drip;
    ctx.lineWidth = 0.7 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 5, y + length);
    ctx.stroke();
  }

  // rust stains
  for (let index = 0; index < 70; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 22 + Math.random() * 90;
    const stain = ctx.createRadialGradient(x, y, 0, x, y, radius);
    stain.addColorStop(0, "rgba(120,42,24,0.35)");
    stain.addColorStop(0.45, "rgba(70,32,22,0.18)");
    stain.addColorStop(1, "rgba(70,32,22,0)");
    ctx.fillStyle = stain;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  // grain
  for (let index = 0; index < 6500; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 1.2;
    const alpha = Math.random() * 0.14;
    ctx.fillStyle =
      Math.random() > 0.55
        ? `rgba(255,255,255,${alpha})`
        : `rgba(0,0,0,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 8);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createFloorTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // dark wet concrete base
  const base = ctx.createLinearGradient(0, 0, canvas.width, 0);
  base.addColorStop(0, "#0e0b09");
  base.addColorStop(0.5, "#1c1613");
  base.addColorStop(1, "#0e0b09");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // central walking strip — slightly lighter scuffed concrete
  const stripX = canvas.width * 0.32;
  const stripW = canvas.width * 0.36;
  const strip = ctx.createLinearGradient(stripX, 0, stripX + stripW, 0);
  strip.addColorStop(0, "rgba(58,46,40,0)");
  strip.addColorStop(0.5, "rgba(82,68,58,0.7)");
  strip.addColorStop(1, "rgba(58,46,40,0)");
  ctx.fillStyle = strip;
  ctx.fillRect(stripX, 0, stripW, canvas.height);

  // tread/diamond plate hint along strip
  for (let y = 0; y < canvas.height; y += 14) {
    for (let x = stripX + 8; x < stripX + stripW - 8; x += 18) {
      const off = (y / 14) % 2 === 0 ? 0 : 9;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(x + off, y, 6, 4);
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(x + off, y + 4, 6, 1);
    }
  }

  // puddles — irregular dark wet patches
  for (let index = 0; index < 14; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const rx = 30 + Math.random() * 110;
    const ry = 18 + Math.random() * 60;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI);
    const puddle = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
    puddle.addColorStop(0, "rgba(8,12,18,0.85)");
    puddle.addColorStop(0.6, "rgba(20,24,30,0.5)");
    puddle.addColorStop(1, "rgba(20,24,30,0)");
    ctx.fillStyle = puddle;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    // wet highlight
    ctx.fillStyle = "rgba(180,200,215,0.06)";
    ctx.beginPath();
    ctx.ellipse(-rx * 0.2, -ry * 0.2, rx * 0.6, ry * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // dirt streaks
  for (let index = 0; index < 280; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = 8 + Math.random() * 60;
    ctx.strokeStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.1})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 8, y + length);
    ctx.stroke();
  }

  // grain
  for (let index = 0; index < 4500; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle =
      Math.random() > 0.5
        ? `rgba(255,255,255,${Math.random() * 0.06})`
        : `rgba(0,0,0,${Math.random() * 0.18})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 6);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createHazardStripeTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#1a1411";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // diagonal yellow/black hazard stripes
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 6);
  for (let x = -canvas.width; x < canvas.width; x += 24) {
    ctx.fillStyle = "#c9a23a";
    ctx.fillRect(x, -canvas.height, 12, canvas.height * 2);
    ctx.fillStyle = "#15110d";
    ctx.fillRect(x + 12, -canvas.height, 12, canvas.height * 2);
  }
  ctx.restore();

  // grime overlay
  for (let i = 0; i < 250; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.4})`;
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 3,
      Math.random() * 3,
    );
  }
  for (let i = 0; i < 80; i += 1) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      1,
      1,
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

function createMarkerTexture(label) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#0e0b09";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // thick border frame
  ctx.strokeStyle = "#c9a23a";
  ctx.lineWidth = 8;
  ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);

  // small top eyebrow
  ctx.fillStyle = "#9a7a25";
  ctx.font = "bold 22px ui-monospace, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SECTOR", canvas.width / 2, 56);

  // big label
  ctx.fillStyle = "#e8dfb8";
  ctx.font = "bold 110px ui-monospace, Menlo, monospace";
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 14);

  // grime
  for (let i = 0; i < 800; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.45})`;
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2.5,
      Math.random() * 2.5,
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function CameraRig({ progress }) {
  const { camera, scene } = useThree();
  const headlampRef = useRef(null);
  const rearLightRef = useRef(null);
  const fillLightRef = useRef(null);
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
    const z = 2.4 - progress * TUNNEL_TRAVEL;

    // Walking-style cadence: vertical bob ties to a step rhythm,
    // lateral sway is half that frequency, slight roll on each step.
    const stepFreq = 1.8;
    const stepPhase = time * stepFreq + progress * 22;
    const bobY = -0.32 + Math.abs(Math.sin(stepPhase)) * 0.06 - 0.03;
    const swayX = Math.sin(stepPhase * 0.5) * 0.07;
    const breathY = Math.cos(time * 0.55) * 0.012;
    const roll = Math.sin(stepPhase * 0.5) * 0.022;
    const yaw = Math.sin(time * 0.18) * 0.012;

    camera.position.set(swayX, bobY + breathY, z);
    camera.rotation.set(0, yaw, roll);
    camera.fov = 70 + Math.sin(progress * Math.PI) * 3.5;
    camera.updateProjectionMatrix();

    const lookX = swayX * 0.4;
    const lookY = (bobY + breathY) * 0.4 - 0.05;
    camera.lookAt(lookX, lookY, z - 8);

    if (headlampRef.current) {
      headlampRef.current.position.set(swayX, bobY + breathY + 0.05, z - 0.05);
      headlampRef.current.intensity = 18 + Math.sin(time * 9.4) * 0.4;
    }
    headlampTarget.position.set(lookX, lookY - 0.15, z - 9);
    headlampTarget.updateMatrixWorld();

    if (rearLightRef.current) {
      rearLightRef.current.position.set(0, -1.1, z + 1.4);
      rearLightRef.current.intensity = 0.9 + Math.sin(time * 2.4) * 0.1;
    }

    if (fillLightRef.current) {
      fillLightRef.current.position.set(0, 0.4, z - 1.2);
      fillLightRef.current.intensity = 0.55;
    }
  });

  return (
    <>
      <spotLight
        ref={headlampRef}
        color="#fff1d8"
        intensity={18}
        distance={22}
        angle={0.7}
        penumbra={0.55}
        decay={1.4}
        castShadow={false}
      />
      <pointLight
        ref={fillLightRef}
        color="#3a2620"
        intensity={0.55}
        distance={4}
        decay={2}
      />
      <pointLight
        ref={rearLightRef}
        color="#7a1a14"
        intensity={0.9}
        distance={6}
        decay={2}
      />
    </>
  );
}

function TunnelShell() {
  const pipeTexture = useMemo(() => createPipeTexture(), []);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -22]}>
      <cylinderGeometry
        args={[TUNNEL_RADIUS, TUNNEL_RADIUS, TUNNEL_LENGTH, 96, 96, true]}
      />
      <meshStandardMaterial
        map={pipeTexture}
        bumpMap={pipeTexture}
        bumpScale={0.06}
        side={THREE.BackSide}
        roughness={0.94}
        metalness={0.18}
        color="#5a4a41"
      />
    </mesh>
  );
}

function TunnelRibs() {
  const ribs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 38; i += 1) {
      const z = 3.4 - i * 1.55;
      const heavy = i % 4 === 0;
      items.push({
        z,
        heavy,
        tube: heavy ? 0.05 : 0.022,
        radius: heavy ? 1.9 : 1.92,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {ribs.map((rib, index) => (
        <mesh key={`rib-${index}`} position={[0, 0, rib.z]}>
          <torusGeometry args={[rib.radius, rib.tube, 14, 96]} />
          <meshStandardMaterial
            color={rib.heavy ? "#4a3d36" : "#28201d"}
            roughness={0.85}
            metalness={0.42}
          />
        </mesh>
      ))}
      {ribs
        .filter((rib) => rib.heavy)
        .map((rib, index) => (
          <group key={`bracket-${index}`} position={[0, 0, rib.z]}>
            {[
              Math.PI * 0.18,
              Math.PI - 0.18,
              -Math.PI * 0.18,
              -Math.PI + 0.18,
            ].map((angle, i) => (
              <mesh
                key={i}
                position={[Math.cos(angle) * 1.86, Math.sin(angle) * 1.86, 0]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[0.14, 0.06, 0.05]} />
                <meshStandardMaterial
                  color="#1a1614"
                  roughness={0.8}
                  metalness={0.55}
                />
              </mesh>
            ))}
          </group>
        ))}
    </group>
  );
}

function TunnelFloor() {
  const floorTexture = useMemo(() => createFloorTexture(), []);

  return (
    <group>
      <mesh
        position={[0, -1.55, -22]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.6, TUNNEL_LENGTH]} />
        <meshStandardMaterial
          map={floorTexture}
          bumpMap={floorTexture}
          bumpScale={0.025}
          roughness={0.78}
          metalness={0.14}
          color="#2a221e"
        />
      </mesh>

      <mesh position={[0, -1.548, -22]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, TUNNEL_LENGTH]} />
        <meshBasicMaterial
          color="#0e1418"
          transparent
          opacity={0.35}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, -1.546, -22]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.55, TUNNEL_LENGTH]} />
        <meshBasicMaterial
          color="#7a3a26"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0.78, -1.42, -22]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.14, 0.07, TUNNEL_LENGTH]} />
        <meshStandardMaterial
          color="#1d1815"
          roughness={0.85}
          metalness={0.45}
        />
      </mesh>
      <mesh position={[0.7, -1.39, -22]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.05, TUNNEL_LENGTH]} />
        <meshStandardMaterial
          color="#100c0a"
          roughness={0.85}
          metalness={0.45}
        />
      </mesh>
      <mesh position={[0.86, -1.39, -22]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.05, TUNNEL_LENGTH]} />
        <meshStandardMaterial
          color="#100c0a"
          roughness={0.85}
          metalness={0.45}
        />
      </mesh>
    </group>
  );
}

function TunnelSeams() {
  return (
    <group>
      <mesh position={[-0.42, -1.547, -22]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, TUNNEL_LENGTH]} />
        <meshStandardMaterial
          color="#0a0807"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>
      {[-0.92, 0.92].map((x, index) => (
        <mesh
          key={`seam-${index}`}
          position={[x, -1.32, -22]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[0.04, 0.022, TUNNEL_LENGTH]} />
          <meshStandardMaterial
            color="#15110f"
            roughness={0.92}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function TunnelCables() {
  const cables = useMemo(() => {
    const sets = [];
    const offsets = [
      { x: -1.7, y: 0.95, color: "#1a1311" },
      { x: -1.78, y: 0.78, color: "#0f0c0a" },
      { x: -1.72, y: 0.6, color: "#2a1e15" },
      { x: 1.74, y: 1.05, color: "#15100e" },
    ];

    offsets.forEach((cfg) => {
      const points = [];
      for (let i = 0; i <= 50; i += 1) {
        const t = i / 50;
        const z = 4 - t * TUNNEL_LENGTH;
        const sag = Math.sin(t * Math.PI * 9) * 0.025;
        points.push(new THREE.Vector3(cfg.x, cfg.y + sag, z));
      }
      sets.push({
        curve: new THREE.CatmullRomCurve3(points),
        color: cfg.color,
      });
    });

    return sets;
  }, []);

  return (
    <group>
      {cables.map((cable, index) => (
        <mesh key={`cable-${index}`}>
          <tubeGeometry args={[cable.curve, 140, 0.028, 8, false]} />
          <meshStandardMaterial
            color={cable.color}
            roughness={0.92}
            metalness={0.18}
          />
        </mesh>
      ))}

      {Array.from({ length: 9 }, (_, index) => {
        const z = 2 - index * 4;
        return (
          <group key={`hanger-${index}`} position={[-1.74, 0.84, z]}>
            <mesh>
              <boxGeometry args={[0.05, 0.18, 0.04]} />
              <meshStandardMaterial
                color="#100c0a"
                roughness={0.85}
                metalness={0.45}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function HazardStripes() {
  const texture = useMemo(() => createHazardStripeTexture(), []);

  // hazard bands placed at warning intervals along both walls
  const bands = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 6; i += 1) {
      const z = -2 - i * 5.5;
      arr.push({ z, side: -1 });
      arr.push({ z: z - 2.7, side: 1 });
    }
    return arr;
  }, []);

  if (!texture) return null;

  return (
    <group>
      {bands.map((band, index) => (
        <mesh
          key={`hazard-${index}`}
          position={[band.side * 1.84, -0.95, band.z]}
          rotation={[0, band.side > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}
        >
          <planeGeometry args={[1.0, 0.18]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.85}
            metalness={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function WallMarkers() {
  const markers = useMemo(() => {
    return [
      { z: -3.5, label: "01", side: -1 },
      { z: -10, label: "02", side: 1 },
      { z: -16.5, label: "03", side: -1 },
      { z: -23, label: "04", side: 1 },
      { z: -29, label: "05", side: -1 },
      { z: -34.5, label: "06", side: 1 },
    ];
  }, []);

  const textures = useMemo(
    () => markers.map((m) => createMarkerTexture(m.label)),
    [markers],
  );

  return (
    <group>
      {markers.map((marker, index) => {
        const texture = textures[index];
        if (!texture) return null;
        return (
          <mesh
            key={`marker-${index}`}
            position={[marker.side * 1.83, 0.15, marker.z]}
            rotation={[
              0,
              marker.side > 0 ? -Math.PI / 2 - 0.04 : Math.PI / 2 + 0.04,
              0,
            ]}
          >
            <planeGeometry args={[0.55, 0.55]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.78}
              metalness={0.16}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function WallSconces() {
  // Periodic warm wall lamps that pass the camera as it advances.
  const lamps = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i += 1) {
      const z = -1.5 - i * 5;
      arr.push({ z, side: i % 2 === 0 ? -1 : 1 });
    }
    return arr;
  }, []);

  return (
    <group>
      {lamps.map((lamp, index) => (
        <group
          key={`lamp-${index}`}
          position={[lamp.side * 1.78, 0.85, lamp.z]}
        >
          <mesh>
            <boxGeometry args={[0.1, 0.08, 0.18]} />
            <meshStandardMaterial
              color="#0a0807"
              roughness={0.85}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[lamp.side * -0.04, 0, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#ffb86c" />
          </mesh>
          <pointLight
            position={[lamp.side * -0.1, -0.05, 0]}
            color="#ff9a3c"
            intensity={0.55}
            distance={2.4}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}

function NearDust() {
  const pointsRef = useRef(null);
  const count = 180;

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      data[index * 3] = (Math.random() - 0.5) * 2.0;
      data[index * 3 + 1] = (Math.random() - 0.5) * 1.4;
      data[index * 3 + 2] = 1.5 - Math.random() * 6;
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.z =
      Math.sin(clock.getElapsedTime() * 0.12) * 0.018;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d7c8b3"
        size={0.009}
        sizeAttenuation
        transparent
        opacity={0.16}
        depthWrite={false}
      />
    </points>
  );
}

function EntryHatch({ progress }) {
  const groupRef = useRef(null);
  const doorMatRef = useRef(null);
  const rimMatRef = useRef(null);
  const collarMatRef = useRef(null);
  const innerMatRef = useRef(null);
  const haloMatRef = useRef(null);

  useFrame(() => {
    // Keep the entrance hardware physically attached to the pipe. A
    // short fade prevents the camera from clipping through the hatch
    // without scaling the ring into a floating halo.
    const phase = smoothstep(0.015, 0.095, progress);
    const opacity = 1 - phase;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 + phase * 0.08);
      groupRef.current.position.z = 1.36 + phase * 0.16;
    }
    if (doorMatRef.current) doorMatRef.current.opacity = opacity;
    if (rimMatRef.current) rimMatRef.current.opacity = opacity * 0.95;
    if (collarMatRef.current) collarMatRef.current.opacity = opacity * 0.9;
    if (innerMatRef.current) innerMatRef.current.opacity = opacity * 0.9;
    if (haloMatRef.current)
      haloMatRef.current.opacity = (1 - smoothstep(0, 0.075, progress)) * 0.48;
  });

  return (
    <group ref={groupRef} position={[0, 0, 1.36]}>
      <mesh position={[0, 0, -0.035]}>
        <ringGeometry args={[1.5, TUNNEL_RADIUS - 0.02, 96]} />
        <meshStandardMaterial
          ref={collarMatRef}
          color="#211b18"
          roughness={0.86}
          metalness={0.58}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <ringGeometry args={[1.43, TUNNEL_RADIUS - 0.08, 96]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color="#cfd8e6"
          transparent
          opacity={0.48}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[1.45, 96]} />
        <meshStandardMaterial
          ref={doorMatRef}
          color="#080606"
          roughness={0.9}
          metalness={0.45}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.52, 0.1, 14, 112]} />
        <meshStandardMaterial
          ref={rimMatRef}
          color="#5a4a42"
          roughness={0.84}
          metalness={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[0.58, 0.025, 12, 96]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color="#1d1917"
          roughness={0.84}
          metalness={0.45}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

function EntranceDaylight({ progress }) {
  const lightRef = useRef(null);
  const skyRef = useRef(null);

  useFrame(() => {
    // Cool daylight bleeding in from outside the entrance — fades as
    // the camera moves deeper into the pipe. A second softer drop-off
    // keeps a hint of light at the start of the journey.
    const fade = 1 - smoothstep(0, 0.22, progress);
    const trail = 1 - smoothstep(0.18, 0.45, progress);
    if (lightRef.current) lightRef.current.intensity = fade * 7 + trail * 1.5;
    if (skyRef.current) skyRef.current.intensity = fade * 0.55;
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 0.6, 2.4]}
        color="#cad4e0"
        intensity={7}
        distance={9}
        decay={1.6}
      />
      <hemisphereLight
        ref={skyRef}
        position={[0, 1, 2.6]}
        color="#bfcad6"
        groundColor="#1a1310"
        intensity={0.55}
      />
    </>
  );
}

function ExitGlow({ progress }) {
  const lightRef = useRef(null);
  const fillRef = useRef(null);
  const haloMatRef = useRef(null);
  const haloMeshRef = useRef(null);
  const diskMatRef = useRef(null);
  const diskMeshRef = useRef(null);
  const flareMatRef = useRef(null);

  useFrame(({ clock }) => {
    // Two overlapping curves: a long rise from 0.55 onward (the light
    // reveals itself) and a final aggressive bloom at 0.85+ when the
    // camera is about to exit.
    const reveal = smoothstep(0.55, 0.95, progress);
    const bloom = smoothstep(0.85, 1, progress);
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.6) * 0.02;

    if (diskMeshRef.current)
      diskMeshRef.current.scale.setScalar(
        (0.6 + reveal * 1.5 + bloom * 1.8) * pulse,
      );
    if (diskMatRef.current) diskMatRef.current.opacity = reveal * 0.95;
    if (haloMeshRef.current)
      haloMeshRef.current.scale.setScalar(
        (0.8 + reveal * 3 + bloom * 1.6) * pulse,
      );
    if (haloMatRef.current) haloMatRef.current.opacity = reveal * 0.7;
    if (flareMatRef.current) flareMatRef.current.opacity = bloom * 0.6;
    if (lightRef.current) lightRef.current.intensity = reveal * 9 + bloom * 8;
    if (fillRef.current) fillRef.current.intensity = bloom * 6;
  });

  return (
    <>
      <group position={[0, 0, -34]}>
        <pointLight
          ref={lightRef}
          color="#ffe9c8"
          intensity={0}
          distance={32}
          decay={1.05}
        />
        <mesh ref={diskMeshRef} position={[0, 0, -0.05]}>
          <circleGeometry args={[0.6, 48]} />
          <meshBasicMaterial
            ref={diskMatRef}
            color="#fff4d8"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={haloMeshRef}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial
            ref={haloMatRef}
            color="#fff4d8"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
      <mesh position={[0, 0, -30]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial
          ref={flareMatRef}
          color="#fff4d8"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight
        ref={fillRef}
        position={[0, 0, -30]}
        color="#ffe2b6"
        intensity={0}
        distance={14}
        decay={1.4}
      />
    </>
  );
}

function TunnelCanvas({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 70, near: 0.05, far: 120, position: [0, 0, 2.4] }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      className="absolute inset-0"
    >
      <color attach="background" args={["#070605"]} />
      <fog attach="fog" args={["#0a0907", 4, 18]} />
      <ambientLight intensity={0.12} color="#5d4d44" />
      <hemisphereLight
        skyColor="#3a2a22"
        groundColor="#0a0707"
        intensity={0.18}
      />

      <TunnelShell />
      <TunnelFloor />
      <TunnelRibs />
      <TunnelSeams />
      <TunnelCables />
      <HazardStripes />
      <WallMarkers />
      <WallSconces />
      <NearDust />
      <EntranceDaylight progress={progress} />
      <ExitGlow progress={progress} />
      <CameraRig progress={progress} />
    </Canvas>
  );
}

function TacticalHudMap({ stops, activeIndex, progress, onSelect }) {
  const activeStop = stops[activeIndex] ?? stops[0];
  const routePoints = stops.map((stop) => `${stop.map.x},${stop.map.y}`);
  const points = routePoints.join(" ");
  const currentPosition = getMapPosition(stops, progress);
  const markerId = useId().replace(/:/g, "");
  const gridId = `${markerId}-grid`;
  const remainingKm = Math.max(0, Math.round((1 - progress) * 15));
  const completedPercent = Math.round(progress * 100);

  return (
    <div
      data-tunnel-hud-map
      className="pointer-events-auto absolute left-4 top-4 z-10 w-73 overflow-hidden rounded-lg border border-white/15 bg-[#101113]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_44px_rgba(0,0,0,0.5)] backdrop-blur-sm max-sm:left-3 max-sm:top-3 max-sm:w-56"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#8f969f]">
            Live Navigation
          </p>
          <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-white">
            {activeStop?.title}
          </p>
        </div>
        <div className="shrink-0 rounded-md border border-[#2b5dcc]/30 bg-[#1a73e8]/15 px-2 py-1 text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#9fc2ff]">
            {remainingKm} km
          </p>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white">
            left
          </p>
        </div>
      </div>

      <div className="relative aspect-[1.28/1] overflow-hidden bg-[#f5f2e8]">
        <div
          aria-hidden="true"
          className="absolute left-2 top-2 z-10 overflow-hidden rounded-md border border-black/10 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.15)]"
        >
          <span className="grid size-7 place-items-center border-b border-black/10 text-sm font-semibold leading-none text-slate-700">
            +
          </span>
          <span className="grid size-7 place-items-center text-sm font-semibold leading-none text-slate-700">
            -
          </span>
        </div>

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full"
          aria-label="Operation Stream tunnel route map"
        >
          <defs>
            <pattern
              id={gridId}
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M8 0H0V8"
                fill="none"
                stroke="#d7d5cc"
                strokeWidth="0.35"
              />
            </pattern>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 10 5 0 10z" fill="#1a73e8" />
            </marker>
          </defs>

          <rect width="100" height="100" fill="#f5f2e8" />
          <rect
            width="100"
            height="100"
            fill={`url(#${gridId})`}
            opacity="0.7"
          />

          {hudMapZones.map((zone) => (
            <rect
              key={zone.id}
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              rx={zone.rx}
              fill="#dce7d5"
              opacity="0.72"
            />
          ))}

          <path
            d="M-6 8 C9 16 18 25 24 38 C32 55 37 66 52 73 C65 79 78 90 104 82"
            fill="none"
            stroke="#cbd9e7"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M-6 8 C9 16 18 25 24 38 C32 55 37 66 52 73 C65 79 78 90 104 82"
            fill="none"
            stroke="#eaf3ff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.95"
          />

          {hudMapRoads.map((road) => (
            <path
              key={`${road.id}-case`}
              d={road.d}
              fill="none"
              stroke="#d5d4ca"
              strokeWidth={road.width + 1.8}
              strokeLinecap="round"
            />
          ))}
          {hudMapRoads.map((road) => (
            <path
              key={road.id}
              d={road.d}
              fill="none"
              stroke="#ffffff"
              strokeWidth={road.width}
              strokeLinecap="round"
            />
          ))}

          {hudMapLabels.map((item) => (
            <text
              key={item.id}
              x={item.x}
              y={item.y}
              fill="#67727e"
              className="font-mono text-[4px] font-semibold uppercase tracking-[0.08em]"
            >
              {item.label}
            </text>
          ))}

          {objectiveBranches.map((branch) => {
            const active = progress >= branch.at;

            return (
              <g key={branch.id}>
                <line
                  x1={branch.from.x}
                  y1={branch.from.y}
                  x2={branch.to.x}
                  y2={branch.to.y}
                  stroke="#ffffff"
                  strokeWidth="5.4"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <line
                  x1={branch.from.x}
                  y1={branch.from.y}
                  x2={branch.to.x}
                  y2={branch.to.y}
                  stroke={active ? "#1a73e8" : "#94a3b8"}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeDasharray={active ? "0" : "2.5 2.5"}
                  markerEnd={`url(#${markerId})`}
                />
              </g>
            );
          })}

          <polyline
            points={points}
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#7d91a8"
            strokeWidth="5.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#1a73e8"
            strokeWidth="5.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - progress * 100}
          />

          {stops.map((stop, index) => {
            const reached = progress + 0.01 >= stop.progress;
            const active = index === activeIndex;
            const terminal = index === 0 || index === stops.length - 1;
            const label =
              index === 0 ? "S" : index === stops.length - 1 ? "E" : index + 1;
            const fill =
              index === 0
                ? "#16a34a"
                : index === stops.length - 1
                  ? "#dc2626"
                  : reached
                    ? "#1a73e8"
                    : "#ffffff";

            return (
              <g
                key={stop.id}
                onClick={() => onSelect(index)}
                className="cursor-pointer"
              >
                <circle
                  cx={stop.map.x}
                  cy={stop.map.y}
                  r={active ? 5.1 : terminal ? 4.3 : 3.7}
                  fill={fill}
                  stroke={active ? "#0b57d0" : "#ffffff"}
                  strokeWidth={active ? 1.8 : 1.2}
                />
                <text
                  x={stop.map.x}
                  y={stop.map.y + 1.35}
                  textAnchor="middle"
                  fill={reached || terminal ? "#ffffff" : "#475569"}
                  className="font-mono text-[3.5px] font-bold"
                >
                  {label}
                </text>
              </g>
            );
          })}

          <g transform={`translate(${currentPosition.x} ${currentPosition.y})`}>
            <circle r="7.6" fill="#1a73e8" opacity="0.18" />
            <circle r="4.7" fill="#1a73e8" stroke="#ffffff" strokeWidth="1.4" />
            <path
              d="M0 -2.7 2.4 2.7 0.7 1.8 0 3 -0.7 1.8 -2.4 2.7Z"
              fill="#ffffff"
              opacity="0.9"
            />
          </g>
        </svg>

        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-md bg-white/90 px-2.5 py-1.5 text-slate-800 shadow-[0_7px_20px_rgba(15,23,42,0.12)]">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold leading-none">
              Pipe Entry to Exit Point
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500">
              Underground route
            </p>
          </div>
          <div className="ml-2 rounded-md bg-[#1a73e8] px-2 py-1 font-mono text-[8px] font-semibold text-white">
            {completedPercent}%
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-3 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-xs font-semibold text-white">
            {activeStop?.title}
          </p>
          <p className="shrink-0 font-mono text-[8px] uppercase tracking-[0.18em] text-[#8f969f]">
            {String(activeIndex + 1).padStart(2, "0")}/
            {String(stops.length).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#1a73e8]"
            style={{ width: `${completedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SceneStats({ progress }) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 flex items-end gap-2.5">
      <div className="rounded-lg border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-stone-400">
          Diameter
        </p>
        <div className="mt-1 flex items-end gap-1.5">
          <span className="font-heading text-3xl font-black leading-none text-white">
            1.4
          </span>
          <span className="pb-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-stone-300">
            m
          </span>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-stone-400">
          Travel
        </p>
        <p className="mt-1 text-xs font-semibold text-white">
          {Math.round(progress * 15)} km
        </p>
      </div>
      <div className="rounded-lg border border-rose-500/30 bg-rose-950/50 px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-rose-200/80">
          Status
        </p>
        <p className="mt-1 text-xs font-semibold text-white">
          {progress < 0.16 ? "Entry" : progress > 0.82 ? "Egress" : "In Pipe"}
        </p>
      </div>
    </div>
  );
}

function TunnelScene({ progress, activeIndex, stops, onSelectStop }) {
  const exitFade = smoothstep(0.86, 1, progress);

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-black">
      <TunnelCanvas progress={progress} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45),transparent_22%,transparent_78%,rgba(0,0,0,0.5)),linear-gradient(180deg,rgba(255,255,255,0.012),transparent_54%,rgba(0,0,0,0.6))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.5)_0_1px,transparent_1px_3px)]" />

      <TacticalHudMap
        stops={stops}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelectStop}
      />
      <SceneStats progress={progress} />
      <div
        data-exit-fade
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(255,249,224,0.98)_0%,rgba(255,239,202,0.9)_42%,rgba(255,255,255,0.78)_100%)]"
        style={{ opacity: exitFade }}
      />
    </div>
  );
}

function DetailImage({ stop }) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(stop?.image) && !failed;

  return (
    <div className="relative h-24 overflow-hidden rounded-lg border border-white/10 bg-stone-950 xl:h-28">
      {hasImage ? (
        <Image
          src={stop.image}
          alt={stop.title ?? "Tunnel stop"}
          fill
          sizes="320px"
          className="object-cover opacity-64"
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(255,255,255,0.18),transparent_16%),radial-gradient(circle_at_36%_54%,rgba(248,113,113,0.28),transparent_34%),linear-gradient(135deg,rgba(12,10,9,0.32),rgba(12,10,9,0.95))]" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-stone-300">
          {stop?.eyebrow}
        </p>
        <p className="mt-1 font-heading text-base font-black text-white xl:text-lg">
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
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#100e0e]/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
      <div className="shrink-0 border-b border-white/10 px-3.5 py-3.5 xl:px-4 xl:py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-stone-400">
              Operation
            </p>
            <h2 className="mt-1 font-heading text-xl font-black leading-none text-white xl:text-2xl">
              STREAM
            </h2>
          </div>
          <button
            type="button"
            onClick={onToggleAudio}
            className={cn(
              "rounded-md border px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] transition-colors",
              audioEnabled
                ? "border-rose-400/40 bg-rose-500/14 text-rose-100"
                : "border-white/10 bg-white/5 text-stone-300 hover:bg-white/10",
            )}
          >
            {audioEnabled ? "Audio on" : "Audio off"}
          </button>
        </div>

        <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.75)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-stone-500">
          <span>Entry</span>
          <span>{Math.round(progress * 100)}%</span>
          <span>Exit</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-3.5 [scrollbar-width:none] xl:px-4 xl:py-4 [&::-webkit-scrollbar]:hidden">
        <DetailImage stop={stop} />

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-rose-200/80">
              {stop?.eyebrow}
            </p>
            <h3 className="mt-1.5 font-heading text-xl font-black leading-tight text-white xl:text-2xl">
              {stop?.title}
            </h3>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-rose-300/25 bg-rose-500/14 font-heading text-base font-black text-white">
            {stop?.number}
          </span>
        </div>

        <p className="mt-3 text-[12px] leading-5 text-stone-300 xl:text-[13px] xl:leading-6">
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

        <div className="mt-4 rounded-lg border border-white/10 bg-white/4 p-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-stone-500">
            Mission Note
          </p>
          <p className="mt-2 text-[12px] leading-5 text-stone-300 xl:text-[13px] xl:leading-6">
            {stop?.summary}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            href={stop?.targetHref}
            iconKey={getRouteIconKey(stop?.targetHref)}
          >
            {stop?.targetLabel}
          </Button>
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
                  ? "border-rose-500/35 bg-rose-500/10"
                  : "border-white/10 bg-white/3 hover:bg-white/6",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border text-[10px] font-black",
                  progress + 0.01 >= item.progress
                    ? "border-white bg-rose-700 text-white"
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
      <div className="h-[68svh] min-h-130 overflow-hidden rounded-2xl border border-white/10 bg-black">
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

export function TunnelExperience({ stops = defaultTunnelStops, prompt }) {
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
              id: "operation-stream-tunnel-header-mobile",
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
            id: "operation-stream-three-tunnel-scene",
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
                  duration: 0.22,
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
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-stone-400">
              Guided tunnel scene
            </p>
            <p className="mt-1 text-sm text-stone-300">
              {prompt ?? "Scroll the scene to move through the tunnel."}
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
          className="relative hidden h-svh w-full max-w-full min-h-170 overflow-hidden bg-black lg:block"
        >
          <div className="absolute inset-0">
            <TunnelScene
              progress={progress}
              activeIndex={activeIndex}
              stops={normalizedStops}
              onSelectStop={jumpToStop}
            />
          </div>
          <div className="pointer-events-auto absolute right-4 top-4 bottom-4 z-10 w-75 xl:right-5 xl:top-5 xl:bottom-5 xl:w-[320px] 2xl:right-6 2xl:top-6 2xl:bottom-6 2xl:w-85">
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
        </div>

        <div className="px-3 pb-3 lg:hidden">
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

export default TunnelExperience;
