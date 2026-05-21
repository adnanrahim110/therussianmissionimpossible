export const evidenceSection = {
  title: "THE EVIDENCE",
  intro:
    "A collection of critical materials that offer a deeper understanding of the Russian military operation. These elements from maps and photos to testimonies and technical data reveal the operation's complexity and human impact.",
  featuredLabel: "MAP FRAGMENT",
  featuredTitle: "Operational Map Sector",
  featuredBody:
    "The Operational Map Sector refers to the geographically defined area shown in the map that identifies the primary zone of military activity. It focuses on the Sudzha region within Kursk Oblast, located near the Russian-Ukrainian border, and highlights its importance as the central operational environment. ",
  featuredNote:
    "The map presents Sudzha as the administrative center of the Sudzhansky District and shows its proximity to key cities such as Kursk and Sumy, indicating the strategic positioning of the sector for both defensive and offensive operations. The distances between these locations further emphasize the operational depth and logistical considerations involved in planning movements within the sector.",
};

export const evidencePage = {
  eyebrow: "File 03",
  metadataTitle: "Evidence File",
  title: evidenceSection.title,
  summary: evidenceSection.intro,
  detail: evidenceSection.featuredBody,
};

export const evidencePageContent = {
  breadcrumbs: [{ label: "Archive", href: "/" }, { label: "Evidence" }],
  actions: [
    { label: "Open Personnel File", href: "/personnel" },
    { label: "Enter Tunnel Descent", href: "/tunnel", variant: "outline" },
  ],
  buttonLabel: "Open linked file",
  gallerySection: {
    eyebrow: "Gallery",
    title: "Evidence Gallery",
    summary:
      "Archive map materials are presented as a justified gallery, with shared row heights and natural image widths.",
  },
};

export const evidenceItems = [
  {
    id: "operational-map-sector",
    type: "Map Fragment",
    title: "OPERATIONAL MAP SECTOR",
    body:
      "A visual layout showing the geography of the battlefield, critical terrain for strategic planning and troop movements. The pipeline route, the settlements behind enemy lines, and the axes of advance. Not a drawing. A decision‑making tool.",
  },
  {
    id: "mission-notes",
    type: "DOCUMENT",
    title: "MISSION NOTES",
    body:
      "Key documents capturing real‑time decisions, tactical adjustments, and shifting plans made throughout the operation. Orders scribbled in bunkers. Maps marked by headlamp. Choices that could not be unmade.",
  },
  {
    id: "faces-inside-the-operation",
    type: "PHOTOGRAPHS",
    title: "FACES INSIDE THE OPERATION",
    body:
      "Photographs of key individuals, commanders giving briefings, soldiers before they entered the pipe, nurses who met them after. The human cost and the bravery. Not propaganda. Just faces. Just names you will learn.",
  },
  {
    id: "witness-language",
    type: "TESTIMONIES",
    title: "WITNESS LANGUAGE",
    body:
      "Firsthand accounts – unfiltered, unpolished. What they saw. What they breathed. What they carried. Hades. Box. Strick. Uncle Sasha. Nurse Nika. Their words. No narrator between you and them.",
  },
  {
    id: "tunnel-mechanics",
    type: "TECHNICAL DATA",
    title: "TUNNEL MECHANICS",
    body:
      "142 centimeters wide. 16 kilometers long. Ventilation shafts every 150 meters. Side pockets carved for ammunition and water. Oxygen pumped in. Condensate scraped off. This is the engineering sheet. The impossible, calculated.",
  },
];

export const evidenceGallery = [
  {
    id: "operational-map-sector",
    title: "Operational Map Sector",
    type: "Map Fragment",
    image: "/imgs/map/1.jpeg",
    width: 1600,
    height: 1066,
  },
  {
    id: "mission-notes",
    title: "Mission Notes",
    type: "Document Layer",
    image: "/imgs/map/2.jpeg",
    width: 937,
    height: 1600,
  },
  {
    id: "map-overlay-alpha",
    title: "Witness Language",
    type: "Testimony Layer",
    image: "/imgs/map/3.png",
    width: 487,
    height: 340,
  },
  {
    id: "map-overlay-beta",
    title: "Tunnel Mechanics",
    type: "Technical Data",
    image: "/imgs/map/4.png",
    width: 490,
    height: 382,
  },
  {
    id: "map-overlay-gamma",
    title: "Terrain And Emergence",
    type: "Map Overlay",
    image: "/imgs/map/5.png",
    width: 580,
    height: 326,
  },
];

export const evidenceHighlights = evidenceItems.map((item, index) => ({
  ...item,
  href:
    item.id === "faces-inside-the-operation"
      ? "/personnel/dossiers"
      : `/evidence#${item.id}`,
  image: evidenceGallery[index]?.image ?? "/imgs/map/1.jpeg",
}));
