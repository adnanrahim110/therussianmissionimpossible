import * as THREE from "three";
import {
    DEFAULT_OPERATION_STOPS,
    MAP_ROUTE_POINTS,
    PIPE_RADIUS,
    TUNNEL_CAMERA_MAX_T,
    TUNNEL_ENTRANCE_END,
} from "./constants";

export function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / Math.max(edge1 - edge0, 0.0001), 0, 1);
  return t * t * (3 - 2 * t);
}

export function interpolatePolyline(points, progress) {
  const t = clamp(progress, 0, 1);
  const distances = [];
  let total = 0;

  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    distances.push(distance);
    total += distance;
  }

  let target = total * t;

  for (let i = 1; i < points.length; i += 1) {
    const segment = distances[i - 1];

    if (target <= segment) {
      const local = segment <= 0 ? 0 : target / segment;

      return {
        x: points[i - 1].x + (points[i].x - points[i - 1].x) * local,
        y: points[i - 1].y + (points[i].y - points[i - 1].y) * local,
      };
    }

    target -= segment;
  }

  return points[points.length - 1];
}

export function normalizeStops(stops) {
  const source =
    Array.isArray(stops) && stops.length ? stops : DEFAULT_OPERATION_STOPS;

  const last = Math.max(source.length - 1, 1);

  return source.map((stop, index) => {
    const progress =
      typeof stop.progress === "number" ? stop.progress : index / last;

    return {
      ...stop,
      id: stop.id ?? `operation-stop-${index}`,
      number: stop.number ?? String(index + 1).padStart(2, "0"),
      progress,
      map: stop.map ?? interpolatePolyline(MAP_ROUTE_POINTS, progress),
      title: stop.title ?? DEFAULT_OPERATION_STOPS[index]?.title ?? "Route Node",
    };
  });
}

export function getStopIndexByProgress(stops, progress) {
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

export function dispatchTunnelHeaderVisibility(visible) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("tunnel-section-visibility", {
      detail: { visible },
    }),
  );
}

export function getTunnelTravelProgress(progress) {
  return clamp(
    (progress - TUNNEL_ENTRANCE_END) /
      Math.max(1 - TUNNEL_ENTRANCE_END, 0.0001),
    0,
    1,
  );
}

export function getCameraCurveProgress(progress) {
  return getTunnelTravelProgress(progress) * TUNNEL_CAMERA_MAX_T;
}

export function radialPoint(curve, t, angle, inset = 0.025) {
  const p = curve.getPointAt(clamp(t, 0, 1));
  const radius = PIPE_RADIUS - inset;

  return new THREE.Vector3(
    p.x + Math.cos(angle) * radius,
    p.y + Math.sin(angle) * radius,
    p.z,
  );
}

export function radialRotation(angle) {
  return [0, 0, angle - Math.PI / 2];
}

export function createPipeCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 2.5),
    new THREE.Vector3(0.04, -0.01, -5),
    new THREE.Vector3(-0.14, 0.02, -14),
    new THREE.Vector3(0.2, -0.02, -24),
    new THREE.Vector3(-0.08, 0.02, -35),
    new THREE.Vector3(0.1, 0, -46),
  ]);
}

export function getCurveFrame(curve, t) {
  const point = curve.getPointAt(clamp(t, 0, 1));
  const tangent = curve.getTangentAt(clamp(t, 0, 1)).normalize();

  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    tangent,
  );

  return { point, tangent, quaternion };
}

export function createSeededRandom(seed) {
  let currentSeed = seed % 2147483647;
  if (currentSeed <= 0) currentSeed += 2147483646;
  return function() {
    currentSeed = (currentSeed * 16807) % 2147483647;
    return (currentSeed - 1) / 2147483646;
  };
}
