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
