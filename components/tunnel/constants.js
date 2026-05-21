export const PIPE_DIAMETER = 1.4;
export const PIPE_RADIUS = PIPE_DIAMETER / 2;

export const TUNNEL_ENTRANCE_END = 0.1;
export const TUNNEL_EXIT_START = 0.88;
export const TUNNEL_CAMERA_MAX_T = 0.985;

export const MAP_ROUTE_POINTS = [
  { x: -5, y: 86 },
  { x: 7, y: 78 },
  { x: 18, y: 76 },
  { x: 30, y: 69 },
  { x: 39, y: 63 },
  { x: 49, y: 57 },
  { x: 58, y: 48 },
  { x: 64, y: 36 },
  { x: 75, y: 30 },
  { x: 91, y: 22 },
];

export const DEFAULT_OPERATION_STOPS = [
  { id: "entry", number: "01", progress: 0, title: "Entry Point" },
  { id: "crawl", number: "02", progress: 0.2, title: "Low Transit" },
  { id: "sudzha", number: "03", progress: 0.4, title: "Sudzha Sector" },
  { id: "pipeline", number: "04", progress: 0.58, title: "Pipeline Bend" },
  { id: "prep", number: "05", progress: 0.76, title: "Preparatory Tunnel" },
  { id: "exit", number: "06", progress: 1, title: "Exit Point" },
];
