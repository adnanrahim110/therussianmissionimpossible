import {
  BOOK,
  archiveIntro,
  authors as legacyAuthors,
  authorsIntro,
  bookPageBlocks,
  characterDossiers,
  contactDesk as legacyContactDesk,
  evidenceItems,
  evidenceSection,
  mapSection,
  missionFileDownload,
  missionOverview,
  mythPoll,
  operationOverview,
  pressAssets,
  purchasePage,
  siteMeta as legacySiteMeta,
  timelinePhases,
  tunnelScenes,
  tunnelSection,
} from "./content";
import { slugify } from "./slugs";

export const siteMeta = legacySiteMeta;

export const archiveHub = {
  eyebrow: archiveIntro.label,
  title: archiveIntro.title,
  summary: archiveIntro.subtitle,
  detail: missionOverview.body[0],
  accessNote: archiveIntro.note,
  metrics: [
    { label: "Mission phases", value: String(timelinePhases.length).padStart(2, "0") },
    { label: "Evidence files", value: String(evidenceItems.length).padStart(2, "0") },
    { label: "Tunnel stops", value: "06" },
    { label: "Personnel dossiers", value: String(characterDossiers.length).padStart(2, "0") },
  ],
};

export const archiveFiles = [
  {
    id: "mission",
    iconKey: "mission",
    fileCode: "File 01",
    label: "Mission",
    title: "Mission File",
    href: "/mission",
    status: "Declassified",
    summary: missionOverview.summary,
    accent: missionOverview.label,
  },
  {
    id: "operation",
    iconKey: "operation",
    fileCode: "File 02",
    label: "Operation",
    title: "Operational Sequence",
    href: "/operation",
    status: "Verified",
    summary: operationOverview.body,
    accent: timelinePhases[0].title,
  },
  {
    id: "evidence",
    iconKey: "evidence",
    fileCode: "File 03",
    label: "Evidence",
    title: "Evidence Index",
    href: "/evidence",
    status: "Open",
    summary: evidenceSection.intro,
    accent: evidenceItems[0].title,
  },
  {
    id: "tunnel",
    iconKey: "tunnel",
    fileCode: "File 04",
    label: "Tunnel",
    title: "Tunnel Descent",
    href: "/tunnel",
    status: "Interactive",
    summary: tunnelSection.intro,
    accent: tunnelSection.subtitle,
  },
  {
    id: "personnel",
    iconKey: "personnel",
    fileCode: "File 05",
    label: "Personnel",
    title: "Personnel Registry",
    href: "/personnel",
    status: "Indexed",
    summary: authorsIntro.body,
    accent: evidenceItems[2].title,
  },
];

export const supportRoutes = [
  {
    id: "book",
    iconKey: "book",
    fileCode: "Support 01",
    label: "Book",
    title: "Publication File",
    href: "/book",
    summary: purchasePage.summary,
  },
  {
    id: "press",
    iconKey: "press",
    fileCode: "Support 02",
    label: "Press",
    title: "Press Desk",
    href: "/press",
    summary: pressAssets[0].description,
  },
  {
    id: "contact",
    iconKey: "contact",
    fileCode: "Support 03",
    label: "Contact",
    title: "Support Desk",
    href: "/contact",
    summary: legacyContactDesk.summary,
  },
];

export const primaryNav = [
  { label: "Archive", href: "/", iconKey: "archive" },
  ...archiveFiles.map(({ label, href, iconKey }) => ({ label, href, iconKey })),
];

export const utilityNav = supportRoutes.map(({ label, href, iconKey }) => ({
  label,
  href,
  iconKey,
}));

export const purchaseCtas = {
  archive: { label: "Open Book File", href: "/book", iconKey: "book" },
  operation: { label: "Review Operational Sequence", href: "/operation", iconKey: "operation" },
  instructions: { label: "Contact and Rights Desk", href: "/contact", iconKey: "contact" },
  press: { label: "Open Press Desk", href: "/press", iconKey: "press" },
  tunnel: { label: "Enter Tunnel Descent", href: "/tunnel", iconKey: "tunnel" },
};

export const missionPage = {
  eyebrow: "File 01",
  title: missionOverview.title,
  summary: missionOverview.summary,
  detail: missionOverview.operationLead,
  lead: missionOverview.operationLead,
  body: missionOverview.body,
  points: missionOverview.points,
  metrics: [
    { label: "Mission points", value: String(missionOverview.points.length).padStart(2, "0") },
    { label: "Timeline phases", value: String(timelinePhases.length).padStart(2, "0") },
    { label: "Evidence items", value: String(evidenceItems.length).padStart(2, "0") },
  ],
};

export const operationPage = {
  eyebrow: "File 02",
  title: operationOverview.title,
  summary: operationOverview.body,
  detail: timelinePhases[0].excerpt,
};

export const missionPhaseCards = timelinePhases.map((phase) => ({
  ...phase,
  id: slugify(phase.title),
}));

export const evidencePage = {
  eyebrow: "File 03",
  title: evidenceSection.title,
  summary: evidenceSection.intro,
  detail: evidenceSection.featuredBody,
};

export const evidenceGallery = [
  {
    id: "operational-map-sector",
    title: "Operational Map Sector",
    type: "Map Fragment",
    image: "/imgs/map/1.jpeg",
    width: 1600,
    height: 1066,
    summary: mapSection.summary,
    note: mapSection.note,
  },
  {
    id: "mission-notes",
    title: "Mission Notes",
    type: "Document Layer",
    image: "/imgs/map/2.jpeg",
    width: 937,
    height: 1600,
    summary: evidenceItems[1].body,
    note: evidenceItems[1].body,
  },
  {
    id: "map-overlay-alpha",
    title: "Witness Language",
    type: "Testimony Layer",
    image: "/imgs/map/3.png",
    width: 487,
    height: 340,
    summary: evidenceItems[3].body,
    note: evidenceItems[3].body,
  },
  {
    id: "map-overlay-beta",
    title: "Tunnel Mechanics",
    type: "Technical Data",
    image: "/imgs/map/4.png",
    width: 490,
    height: 382,
    summary: evidenceItems[4].body,
    note: evidenceItems[4].body,
  },
  {
    id: "map-overlay-gamma",
    title: "Terrain And Emergence",
    type: "Map Overlay",
    image: "/imgs/map/5.png",
    width: 580,
    height: 326,
    summary: mapSection.detail,
    note: mapSection.note,
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

export const personnelIntro = {
  eyebrow: "File 05",
  title: "Personnel Registry",
  summary: authorsIntro.body,
  detail: evidenceItems[2].body,
  branches: [
    {
      label: "Authors",
      href: "/personnel/authors",
      iconKey: "authors",
      summary: authorsIntro.body,
    },
    {
      label: "Dossiers",
      href: "/personnel/dossiers",
      iconKey: "dossiers",
      summary: evidenceItems[2].body,
    },
  ],
};

const authorPhotoMap = {
  "anzhela-khachaturyan": "/imgs/authors/angela.png",
  "maria-voronina": "/imgs/authors/voronina.png",
  "viktoria-kataeva": "/imgs/authors/kataeva.png",
};

export const authors = legacyAuthors.map((author, index) => {
  const id = slugify(author.name);
  return {
    ...author,
    id,
    fileCode: `AUTH-${String(index + 1).padStart(2, "0")}`,
    photo: authorPhotoMap[id] ?? null,
  };
});

export const dossiers = characterDossiers.map((dossier, index) => {
  const slug = slugify(dossier.callsign);
  return {
    ...dossier,
    slug,
    href: `/personnel/dossiers/${slug}`,
    fileCode: `DOS-${String(index + 1).padStart(3, "0")}`,
  };
});

export const featuredDossiers = dossiers.slice(0, 6);

export const personnelAuthorsPage = {
  eyebrow: authorsIntro.eyebrow,
  title: "Authors And Witnesses",
  summary: authorsIntro.body,
};

export const personnelDossiersPage = {
  eyebrow: "Archive Branch",
  title: "Personnel Dossiers",
  summary: evidenceItems[2].body,
};

export const contactDesk = legacyContactDesk;

export const bookPage = {
  eyebrow: "Support 01",
  title: `${BOOK.title}: ${BOOK.subtitle}`,
  summary: BOOK.synopsis,
  detail: BOOK.excerpt,
  blocks: bookPageBlocks,
};

export const pressDeskPage = {
  eyebrow: "Support 02",
  title: "Press Desk",
  summary: pressAssets[0].description,
  assets: pressAssets,
};

export const contactPage = {
  eyebrow: "Support 03",
  title: contactDesk.title,
  summary: contactDesk.summary,
  channels: contactDesk.channels,
};

export const tunnelPage = {
  eyebrow: "File 04",
  title: tunnelSection.title,
  summary: tunnelSection.intro,
  detail: tunnelSection.subtitle,
  prompt: tunnelScenes[1].summary,
};

const hadesDossier = characterDossiers.find(({ callsign }) => callsign === "HADES");
const talismanDossier = characterDossiers.find(
  ({ callsign }) => callsign === "TALISMAN",
);

export const tunnelStops = [
  {
    id: "strategic-pathway",
    order: 1,
    eyebrow: "Stop 01",
    title: tunnelScenes[1].title,
    type: tunnelScenes[1].marker,
    image: "/imgs/map/1.jpeg",
    caption: tunnelScenes[1].summary,
    summary: tunnelScenes[1].summary,
    targetHref: "/evidence#operational-map-sector",
    targetLabel: "Open Evidence File",
  },
  {
    id: "harsh-conditions",
    order: 2,
    eyebrow: "Stop 02",
    title: tunnelScenes[2].title,
    type: tunnelScenes[2].marker,
    image: "/imgs/p1.jpg",
    caption: tunnelScenes[2].summary,
    summary: tunnelScenes[2].summary,
    targetHref: "/mission",
    targetLabel: "Open Mission File",
  },
  {
    id: "hades",
    order: 3,
    eyebrow: "Stop 03",
    title: hadesDossier?.callsign ?? "HADES",
    type: hadesDossier?.archetype ?? "Profile",
    image: hadesDossier?.photo ?? "/imgs/bio/hades.jpg",
    caption: hadesDossier?.mentality ?? evidenceItems[2].body,
    summary: hadesDossier?.summary ?? evidenceItems[2].body,
    targetHref: `/personnel/dossiers/${slugify("HADES")}`,
    targetLabel: "Open Dossier",
  },
  {
    id: "talisman",
    order: 4,
    eyebrow: "Stop 04",
    title: talismanDossier?.callsign ?? "TALISMAN",
    type: talismanDossier?.archetype ?? "Profile",
    image: talismanDossier?.photo ?? "/imgs/bio/talisman.png",
    caption: talismanDossier?.mentality ?? evidenceItems[2].body,
    summary: talismanDossier?.summary ?? evidenceItems[2].body,
    targetHref: `/personnel/dossiers/${slugify("TALISMAN")}`,
    targetLabel: "Open Dossier",
  },
  {
    id: "physical-toll",
    order: 5,
    eyebrow: "Stop 05",
    title: tunnelScenes[3].title,
    type: tunnelScenes[3].marker,
    image: "/imgs/map/4.png",
    caption: tunnelScenes[3].summary,
    summary: tunnelScenes[3].summary,
    targetHref: "/evidence#tunnel-mechanics",
    targetLabel: "Open Technical Evidence",
  },
  {
    id: "tactical-surprise",
    order: 6,
    eyebrow: "Stop 06",
    title: tunnelScenes[5].title,
    type: tunnelScenes[5].marker,
    image: "/imgs/p3.jpg",
    caption: tunnelScenes[5].summary,
    summary: tunnelScenes[5].summary,
    targetHref: "/operation",
    targetLabel: "Open Operation File",
  },
];

export const tunnelControlHints = [
  "Desktop: scroll, arrow keys, or W/S to move between tunnel stops.",
  "Mobile: use the stepper controls to advance through the guided variant.",
  "Each stop opens into a full evidence or personnel route instead of trapping the user in a single long page.",
];

export const routeCatalog = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  ...archiveFiles.map((file) => ({
    path: file.href,
    priority: 0.9,
    changeFrequency: "weekly",
  })),
  {
    path: "/personnel/authors",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/personnel/dossiers",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  ...supportRoutes.map((route) => ({
    path: route.href,
    priority: 0.7,
    changeFrequency: "monthly",
  })),
  { path: "/authors", priority: 0.4, changeFrequency: "monthly" },
  { path: "/bio", priority: 0.4, changeFrequency: "monthly" },
];

export const compatibilityRoutes = {
  authors: "/personnel/authors",
  bio: "/personnel/dossiers",
};

export {
  BOOK,
  missionFileDownload,
  mythPoll,
  mapSection,
  evidenceItems,
  evidenceSection,
};
