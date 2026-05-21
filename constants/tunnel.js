export const tunnelSection = {
  title: "The Tunnel",
  subtitle: "A Path of Endurance and Strategy",
  intro:
    "This hidden, narrow gas pipeline became a symbol of resilience during Operation Stream 3.0, serving as a tactical route for Russian forces. The soldiers\u2019 journey through this confined, toxic space was a test of physical endurance and mental strength, enabling a surprise attack behind enemy lines.",
};

export const tunnelPage = {
  eyebrow: "File 04",
  metadataTitle: "Tunnel Descent",
  title: tunnelSection.title,
  summary: tunnelSection.intro,
  detail: tunnelSection.subtitle,
  prompt:
    "The gas pipeline served as an unconventional but crucial route for infiltrating behind enemy lines, providing the Russian special forces with a path for surprise attacks.",
};

export const tunnelPageContent = {
  breadcrumbs: [{ label: "Archive", href: "/" }, { label: "Tunnel" }],
  actions: [
    { label: "Open Personnel Registry", href: "/personnel" },
    { label: "Review Evidence", href: "/evidence", variant: "outline" },
  ],
  aside: {
    eyebrow: "Interactive Route",
  },
};

export const tunnelStops = [
  {
    id: "strategic-pathway",
    order: 1,
    number: "01",
    eyebrow: "Stop 01",
    title: "Strategic Pathway",
    type: "Critical Route",
    image: "/imgs/map/1.jpeg",
    caption:
      "The gas pipeline served as an unconventional but crucial route for infiltrating behind enemy lines, providing the Russian special forces with a path for surprise attacks.",
    summary:
      "The gas pipeline served as an unconventional but crucial route for infiltrating behind enemy lines, providing the Russian special forces with a path for surprise attacks.",
    targetHref: "/evidence#operational-map-sector",
    targetLabel: "Open Evidence File",
    progress: 0,
    map: { x: 88, y: 26 },
  },
  {
    id: "harsh-conditions",
    order: 2,
    number: "02",
    eyebrow: "Stop 02",
    title: "Harsh Conditions",
    type: "Toxic Environment",
    image: "/imgs/p1.jpg",
    caption:
      "The soldiers navigated through a narrow pipeline, enduring toxic fumes and extreme physical constraints, testing their endurance and willpower to the limit.",
    summary:
      "The soldiers navigated through a narrow pipeline, enduring toxic fumes and extreme physical constraints, testing their endurance and willpower to the limit.",
    targetHref: "/mission",
    targetLabel: "Open Mission File",
    progress: 0.14,
    map: { x: 79, y: 39 },
  },
  {
    id: "hades",
    order: 3,
    number: "03",
    eyebrow: "Stop 03",
    title: "HADES",
    type: "The Mind",
    image: "/imgs/bio/hades.jpg",
    caption: "Don't ask when it ends. Execute.",
    summary:
      "The intersection of intellect, adaptability, and operational clarity. Operates simultaneously across two domains: the confined, deteriorating reality of fighters underground and the fluid, information-driven battlefield above.",
    targetHref: "/personnel/dossiers/hades",
    targetLabel: "Open Dossier",
    progress: 0.3,
    map: { x: 69, y: 51 },
  },
  {
    id: "talisman",
    order: 4,
    number: "04",
    eyebrow: "Stop 04",
    title: "TALISMAN",
    type: "The Spirit",
    image: "/imgs/bio/talisman.png",
    caption: "We move forward — because he made it possible.",
    summary:
      "Embodies the biological and psychological limit of endurance. His defining role is not his decline — but his influence on the group: providing certainty in uncertainty, stabilizing others through belief.",
    targetHref: "/personnel/dossiers/talisman",
    targetLabel: "Open Dossier",
    progress: 0.48,
    map: { x: 57, y: 58 },
  },
  {
    id: "physical-toll",
    order: 5,
    number: "05",
    eyebrow: "Stop 05",
    title: "Physical Toll",
    type: "Endurance Test",
    image: "/imgs/map/4.png",
    caption:
      "The confined space, combined with minimal oxygen and the weight of military gear, created unbearable conditions, leading many soldiers to face exhaustion and life-threatening health risks.",
    summary:
      "The confined space, combined with minimal oxygen and the weight of military gear, created unbearable conditions, leading many soldiers to face exhaustion and life-threatening health risks.",
    targetHref: "/evidence#tunnel-mechanics",
    targetLabel: "Open Technical Evidence",
    progress: 0.62,
    map: { x: 47, y: 60 },
  },
  {
    id: "tactical-surprise",
    order: 6,
    number: "06",
    eyebrow: "Stop 06",
    title: "Tactical Surprise",
    type: "Ambush Opportunity",
    image: "/imgs/p3.jpg",
    caption:
      "Emerging from the pipeline behind Ukrainian positions, Russian forces used the tunnel\u2019s covert nature to launch a successful surprise attack, turning the tide in the mission's favor.",
    summary:
      "Emerging from the pipeline behind Ukrainian positions, Russian forces used the tunnel\u2019s covert nature to launch a successful surprise attack, turning the tide in the mission's favor.",
    targetHref: "/operation",
    targetLabel: "Open Operation File",
    progress: 0.75,
    map: { x: 39, y: 66 },
  },
];

export const tunnelMapData = {
  objectiveBranches: [
    { id: "trenches", from: { x: 47, y: 60 }, to: { x: 58, y: 48 }, at: 0.58 },
    { id: "bridge", from: { x: 39, y: 66 }, to: { x: 34, y: 79 }, at: 0.72 },
    { id: "hotel", from: { x: 39, y: 66 }, to: { x: 36, y: 39 }, at: 0.8 },
    { id: "exit", from: { x: 31, y: 54 }, to: { x: 18, y: 45 }, at: 0.92 },
  ],
  roads: [
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
  ],
  zones: [
    { id: "rail-yard", x: 4, y: 7, width: 27, height: 18, rx: 4 },
    { id: "industrial", x: 61, y: 12, width: 28, height: 19, rx: 5 },
    { id: "river", x: 9, y: 77, width: 38, height: 14, rx: 7 },
    { id: "sector", x: 66, y: 63, width: 24, height: 18, rx: 5 },
  ],
  labels: [
    { id: "entry-label", x: 81, y: 18, label: "Entry" },
    { id: "pipe-label", x: 53, y: 42, label: "Main pipe" },
    { id: "split-label", x: 42, y: 72, label: "Branch" },
    { id: "exit-label", x: 10, y: 39, label: "Exit" },
  ],
};

export const tunnelUiText = {
  hud: {
    liveNavigation: "Live Navigation",
    left: "left",
    svgLabel: "Operation Stream tunnel route map",
    routeTitle: "Pipe Entry to Exit Point",
    routeSubtitle: "Underground route",
  },
  stats: {
    diameter: "Diameter",
    diameterValue: "1.4",
    diameterUnit: "m",
    travel: "Travel",
    status: "Status",
    entry: "Entry",
    egress: "Egress",
    inPipe: "In Pipe",
  },
  details: {
    imageAltFallback: "Tunnel stop",
    operation: "Operation",
    stream: "STREAM",
    audioOn: "Audio on",
    audioOff: "Audio off",
    entry: "Entry",
    exit: "Exit",
    type: "Type",
    distance: "Distance",
    missionNote: "Mission Note",
    personnel: "Personnel",
  },
  mobile: {
    title: "Guided tunnel scene",
    fallbackPrompt: "Scroll the scene to move through the tunnel.",
    next: "Next",
  },
};
