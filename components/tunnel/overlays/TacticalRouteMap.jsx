"use client";

import { useId } from "react";
import { MAP_ROUTE_POINTS } from "../constants";
import { interpolatePolyline } from "../utils";

const MAP_LABELS = [
  { x: 11, y: 18, text: "GAS PIPELINE", anchor: "start" },
  { x: 72, y: 17, text: "PREP TUNNEL", anchor: "middle" },
  { x: 43, y: 57, text: "EXIT", anchor: "middle" },
];

function getVisibleRoutePosition(progress) {
  const position = interpolatePolyline(MAP_ROUTE_POINTS, progress ?? 0);

  return {
    x: Math.max(4.5, Math.min(position.x, 95.5)),
    y: Math.max(5, Math.min(position.y, 95)),
  };
}

export function TacticalRouteMap({ stops, activeIndex, progress, onSelect }) {
  const currentPosition = getVisibleRoutePosition(progress);
  const routePoints = MAP_ROUTE_POINTS.map(
    (point) => `${point.x},${point.y}`,
  ).join(" ");
  const patternId = useId().replace(/:/g, "");
  const activeStop = stops[activeIndex] ?? stops[0];

  return (
    <div className="pointer-events-auto absolute left-4 top-4 z-10 w-[16.75rem] overflow-hidden rounded-xl border border-red-500/20 bg-[#080708]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_70px_rgba(0,0,0,0.72)] backdrop-blur-md max-sm:left-3 max-sm:top-3 max-sm:w-[15.25rem]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-300/80">
          Route map
        </p>

        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-stone-400">
          {activeStop?.number ?? "01"}
        </span>
      </div>

      <div className="relative aspect-[1.18/1] overflow-hidden bg-[#111010]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern
              id={`${patternId}-grid`}
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M8 0H0V8"
                fill="none"
                stroke="rgba(255,255,255,0.055)"
                strokeWidth="0.38"
              />
            </pattern>

            <radialGradient id={`${patternId}-red`} cx="53%" cy="56%" r="72%">
              <stop offset="0%" stopColor="#7c1016" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#250306" stopOpacity="0" />
            </radialGradient>

          </defs>

          <rect width="100" height="100" fill="#0e0d0e" />
          <rect width="100" height="100" fill={`url(#${patternId}-grid)`} />

          <path
            d="M-12 90 C9 80 22 75 36 65 C50 55 51 44 63 38 C75 31 84 24 110 16 L110 110 L-12 110Z"
            fill={`url(#${patternId}-red)`}
            opacity="0.86"
          />

          {MAP_LABELS.map((label) => (
            <text
              key={label.text}
              x={label.x}
              y={label.y}
              textAnchor={label.anchor}
              fill="#d8d2c0"
              className="font-mono text-[3.6px] font-bold uppercase"
            >
              {label.text}
            </text>
          ))}

          <path
            d="M2 86 L8 78 L18 76 L30 68 L39 63 L49 57 L58 48 L64 36 L75 30 L91 22"
            fill="none"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="7.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={routePoints}
            fill="none"
            stroke="rgba(255,255,255,0.98)"
            strokeWidth="3.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={routePoints}
            fill="none"
            stroke="#ef233c"
            strokeWidth="3.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - progress * 100}
          />

          <g>
            <path
              d="M35 63 L39 59 L44 61 L44 66 L39 69 L35 67Z"
              fill="#8b0f16"
              stroke="#ef233c"
              strokeWidth="0.9"
            />
          </g>

          {stops.map((stop, index) => {
            const active = index === activeIndex;
            const reached = progress + 0.01 >= stop.progress;
            const stopPosition = getVisibleRoutePosition(stop.progress);

            return (
              <g
                key={stop.id}
                className="cursor-pointer"
                onClick={() => onSelect(index)}
              >
                <circle
                  cx={stopPosition.x}
                  cy={stopPosition.y}
                  r="6.5"
                  fill="transparent"
                />
                <circle
                  cx={stopPosition.x}
                  cy={stopPosition.y}
                  r={active ? 4.1 : 3}
                  fill={reached ? "#ef233c" : "#171717"}
                  stroke="#ffffff"
                  strokeWidth={active ? 1.2 : 0.75}
                />
                <text
                  x={stopPosition.x}
                  y={stopPosition.y + 1.15}
                  textAnchor="middle"
                  fill="#ffffff"
                  className="pointer-events-none font-mono text-[3px] font-black"
                >
                  {stop.number}
                </text>
              </g>
            );
          })}

          <g transform={`translate(${currentPosition.x} ${currentPosition.y})`}>
            <circle r="7" fill="#ef233c" opacity="0.16" />
            <circle r="3.5" fill="#ef233c" stroke="#ffffff" strokeWidth="1" />
            <path
              d="M0 -2.4 2 2.3 0 1.15 -2 2.3Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
