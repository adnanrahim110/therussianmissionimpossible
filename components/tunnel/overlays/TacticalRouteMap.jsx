"use client";

import { useId } from "react";
import { MAP_ROUTE_POINTS } from "../constants";
import { interpolatePolyline } from "../utils";

export function TacticalRouteMap({ stops, activeIndex, progress, onSelect }) {
  const currentPosition = interpolatePolyline(MAP_ROUTE_POINTS, progress);
  const routePoints = MAP_ROUTE_POINTS.map(
    (point) => `${point.x},${point.y}`,
  ).join(" ");
  const patternId = useId().replace(/:/g, "");

  return (
    <div className="pointer-events-auto absolute left-4 top-4 z-10 w-[18rem] overflow-hidden rounded-xl border border-red-500/20 bg-[#080708]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_70px_rgba(0,0,0,0.72)] backdrop-blur-md max-sm:left-3 max-sm:top-3 max-sm:w-[15.5rem]">
      <div className="border-b border-white/10 px-3 py-2">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-300/80">
          Gas pipeline route map
        </p>
      </div>

      <div className="relative aspect-[1.08/1] overflow-hidden bg-[#111010]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
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
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="0.42"
              />
            </pattern>

            <radialGradient id={`${patternId}-red`} cx="53%" cy="56%" r="72%">
              <stop offset="0%" stopColor="#7c1016" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#250306" stopOpacity="0" />
            </radialGradient>

            <marker
              id={`${patternId}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 10 5 0 10z" fill="#ef233c" />
            </marker>
          </defs>

          <rect width="100" height="100" fill="#0e0d0e" />
          <rect width="100" height="100" fill={`url(#${patternId}-grid)`} />

          <path
            d="M-12 88 C10 78 23 73 36 64 C48 55 50 44 62 38 C75 31 84 24 110 16 L110 110 L-12 110Z"
            fill={`url(#${patternId}-red)`}
            opacity="0.96"
          />

          <path
            d="M9 43 H66"
            fill="none"
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          <text
            x="17"
            y="39.5"
            fill="#d9d1bc"
            className="font-mono text-[4px] font-bold"
          >
            URENGOY-POMARU-UZHHOROD
          </text>

          <text
            x="17"
            y="44.2"
            fill="#d9d1bc"
            className="font-mono text-[4px] font-bold"
          >
            GAS PIPELINE
          </text>

          <path
            d="M2 86 L8 78 L18 76 L30 68 L39 63 L49 57 L58 48 L64 36 L75 30 L91 22"
            fill="none"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="7.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={routePoints}
            fill="none"
            stroke="rgba(255,255,255,0.98)"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={routePoints}
            fill="none"
            stroke="#ef233c"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - progress * 100}
          />

          <path
            d="M93 33 L67 38"
            fill="none"
            stroke="#ef233c"
            strokeWidth="3"
            strokeLinecap="round"
            markerEnd={`url(#${patternId}-arrow)`}
          />

          <text
            x="69"
            y="26"
            fill="#f4d2d2"
            className="font-mono text-[4px] font-bold"
          >
            4 KM PREP TUNNEL
          </text>

          <g>
            <path
              d="M35 63 L39 59 L44 61 L44 66 L39 69 L35 67Z"
              fill="#8b0f16"
              stroke="#ef233c"
              strokeWidth="1.1"
            />
            <text
              x="47"
              y="65"
              fill="#f1e8d4"
              className="font-mono text-[4px] font-bold"
            >
              EXIT POINT
            </text>
          </g>

          {[
            { x: 15, y: 30, label: "NIKOLSKIY" },
            { x: 7, y: 52, label: "LEBEDEVKA" },
            { x: 31, y: 74, label: "SUDZHA" },
            { x: 58, y: 61, label: "MARTYNOVKA" },
            { x: 52, y: 82, label: "MIRNYI" },
            { x: 41, y: 91, label: "MAHNOVKA" },
            { x: 80, y: 45, label: "BIRJUKOVKA" },
          ].map((item) => (
            <g key={item.label}>
              <rect
                x={item.x - 1.8}
                y={item.y - 1.8}
                width="3.6"
                height="3.6"
                fill="#ef233c"
                stroke="#fff"
                strokeWidth="0.8"
              />

              <text
                x={item.x + 3.8}
                y={item.y + 1.1}
                fill="#d8d2c0"
                className="font-mono text-[3.7px] font-bold uppercase"
              >
                {item.label}
              </text>
            </g>
          ))}

          {stops.map((stop, index) => {
            const active = index === activeIndex;
            const reached = progress + 0.01 >= stop.progress;

            return (
              <g
                key={stop.id}
                className="cursor-pointer"
                onClick={() => onSelect(index)}
              >
                <circle
                  cx={stop.map.x}
                  cy={stop.map.y}
                  r={active ? 3.6 : 2.3}
                  fill={reached ? "#ef233c" : "#131313"}
                  stroke="#ffffff"
                  strokeWidth={active ? 1.35 : 0.8}
                />
              </g>
            );
          })}

          <g transform={`translate(${currentPosition.x} ${currentPosition.y})`}>
            <circle r="7.5" fill="#ef233c" opacity="0.18" />
            <circle r="4" fill="#ef233c" stroke="#ffffff" strokeWidth="1.1" />
            <path
              d="M0 -2.7 2.3 2.6 0 1.35 -2.3 2.6Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
