import {
    BOOK,
    archiveIntro,
    authorsIntro,
    bookPageBlocks,
    characterDossiers,
    evidenceItems,
    evidenceSection,
    authors as legacyAuthors,
    contactDesk as legacyContactDesk,
    siteMeta as legacySiteMeta,
    mapSection,
    missionFileDownload,
    missionOverview,
    mythPoll,
    operationOverview,
    pressAssets,
    purchasePage,
    timelinePhases,
    tunnelScenes,
    tunnelSection,
} from "./content";
import { slugify } from "./slugs";

export const siteMeta = legacySiteMeta;

export const archiveHub = {
  eyebrow: archiveIntro.label,
  title: archiveIntro.title,
  summary: "Operation Stream 3.0 — The Russian Mission Impossible unfolds like a classified military case file, revealing the mission piece by piece through the firsthand accounts of soldiers, frontline doctors, and civilians caught inside the conflict. As you move through underground tunnels, drone-dominated battlefields, and occupied villages, a larger picture begins to emerge — one that explores modern warfare, tactical adaptation, military psychology, and the resilience that continues to shape the evolving reality of the Russian military mindset.",
  detail: "And by the time you reach the end, you’re no longer looking at a single event — but at a broader question:",
  quote: "What does it actually take to move forward in conditions most would consider impossible?",
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
    title: "MISSION FILE- THE SET UP",
    href: "/mission",
    status: "Declassified",
    summary: [
      "This is not a book you just read-it transports you into the action. You crawl through 16 kilometers of darkness. You breathe toxic fumes. You lose soldiers you just met. You are debriefed on the specs through the men who created them. You  gain multi Testimonies arrive in fragments from Hades, from Box, from Talisman. Strategy reveals itself slowly. Sacrifice becomes personal. Survival is never guaranteed.",
      "Only when you reach the last page do you understand the full scale of what happened beneath Kursk."
    ],
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
    summary: [
      "The occupation had cut everything. No electricity. No communication. No way out for civilians still trapped in Sudzha. The only move left was a covert one: emerge behind enemy lines. Several hundred soldiers volunteered to enter a gas pipeline. 142 centimeters wide. 16 kilometers long. They moved hunched over for days. They breathed chemicals. They lost consciousness. Some never woke up. Endurance. Discipline. Resolve. Not because they were fearless. Because the mission demanded it.",
      "Coordination, timing, and the mental instincts of highly trained men held the operation together. Risks were understood. Death was understood as a possible outcome, part of the territory, not acceptance but the will to die with purpose if it came to that.",
      "Victory was the only acceptable outcome."
    ],
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
    summary: [
      "Maps. Photos. Testimonies. Technical data.",
      "Each piece reveals a different layer of the operation. The underground routes. The faces of soldiers before they entered the pipe. The words of those who emerged.",
      "The complex systems that have been adapted to surpass the arising issues of the rapidly evolving military landscape.",
      "Together, they tell a story that no single file could hold. Complexity. Sacrifice. Survival. And the human weight behind every tactical decision."
    ],
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
    summary: [
      "This was not a myth or propaganda. It was a decommissioned gas pipeline in the Kursk region — roughly 142 centimeters wide and nearly 16 kilometers long — transformed into one of the most discussed underground operations of the modern war. Inside the pipe: darkness, chemical residue, failing oxygen levels, and conditions that tested the limits of human endurance. Bent beneath combat gear, Russian special forces advanced through the tunnel for days, adapting to a new era of drone warfare where survival depended on staying unseen."
    ],
    accent: tunnelSection.subtitle,
  },
  {
    id: "personnel",
    iconKey: "personnel",
    fileCode: "File 05",
    label: "The Stream Team",
    title: "The Stream Team",
    href: "/personnel",
    status: "Indexed",
    summary: ["Three women wrote this book. Angela. Maria. Victoria.","They gathered testimonies from men who walked through a gas pipe. From commanders who gave orders they knew might be final. From nurses who bandaged blackened faces. From survivors who still hear the screaming.","Their work is not abstract. It is human. It is fragmented. It is real.","They let the soldiers speak. They let the pipe speak. And they stepped aside."],
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
    summary: "This is not a novel. It is a documentary narrative. One of the most unusual military operations of the modern era – reconstructed from inside the pipe.",
  },
  {
    id: "press",
    iconKey: "press",
    fileCode: "Support 02",
    label: "Press",
    title: "Press Desk",
    href: "/press",
    summary: "Incoming. Translated release for journalists and media outlets. The full account, cleared for distribution.",
  },
  {
    id: "contact",
    iconKey: "contact",
    fileCode: "Support 03",
    label: "Contact",
    title: "Support Desk",
    href: "/contact",
    summary: "Rights. Interviews. Purchase links. Bulk orders. Archive access. Use this route. Replies within hours.",
  },
];

export const primaryNav = [
  { label: "Archive", href: "/", iconKey: "archive" },
  ...archiveFiles.map(({ label, href, iconKey }) => ({ label, href, iconKey })),
];

export const utilityNav = supportRoutes.filter((r) => r.id !== "press").map(({ label, href, iconKey }) => ({
  label,
  href,
  iconKey,
}));

export const purchaseCtas = {
  archive: { label: "Open Book File", href: "/book", iconKey: "book" },
  amazon: { label: "Purchase Book on Amazon", href: BOOK.amzLink, iconKey: "amazon" },
  operation: { label: "Review Operational Sequence", href: "/operation", iconKey: "operation" },
  instructions: { label: "Contact and Rights Desk", href: "/contact", iconKey: "contact" },
  press: { label: "Open Press Desk", href: "/press", iconKey: "press" },
  tunnel: { label: "Enter Tunnel Descent", href: "/tunnel", iconKey: "tunnel" },
};

export const missionPage = {
  eyebrow: "File 01",
  title: missionOverview.title,
  summary: "At present , the term “Stream” (or Operation Pipe) has gone down in history as a unique episode of Russo-Ukrainian fighting which took place in the spring of 2025. The operation consisted of a series of daring tactical maneuvers by the Russian Armed Forces for the purpose of liberating the border regions of the Russian Federation’s Kursk Oblast, particularly Sudzha, from the Armed Forces of Ukraine’s (AFU) military units.",
  lead: [
    "Every above-ground approach was a dead end. The sky had eyes. The front would not break. But analysis is s key component in their adaptation.",
    "What makes “Stream 3.0” strategically significant is not simply the underground infiltration itself, but the way the underground and above-ground components were fused into a single coordinated operational system."
  ],
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
  summary: "Operation Stream 3.0 — The Russian Mission Impossible is a documentary narrative reconstruction of one of the most unconventional and debated military operations of the modern war. Set against the battle for the Kursk border region after 215 days of occupation, the book follows the underground infiltration operation known as “POTOK,” during which several hundred Russian soldiers voluntarily entered a decommissioned gas pipeline — just 142 centimeters wide and nearly 16 kilometers long — to move beneath a battlefield dominated by drones, surveillance, and constant exposure.",
  detail: [
    "Built from firsthand-style testimonies and documentary detail, the book brings together the voices of soldiers known only by callsigns — Hades, Box, Zhora, Strick, Dobrynya — alongside frontline doctors, nurses, priests, support personnel, and civilians who survived the events unfolding around them. The story is told through fragments of memory, battlefield routine, exhaustion, humor, fear, faith, and survival, allowing the operation to emerge piece by piece rather than through distant narration.",
    "Among the first to meet the soldiers emerging from the pipeline was Elena Sukhareva, head of Disaster Medicine at the Kursk Regional Hospital. She recalls men surfacing blackened from chemical residue and lack of oxygen, wrapped in improvised bandages, joking despite damaged lungs and dehydration. Through accounts like hers, the book reveals a side of modern warfare rarely seen in headlines: soldiers ordering flowers for their wives before entering the darkness on March 8, medics spoon-feeding exhausted men who could barely breathe, and civilians who survived the ordeal  hiding in basements and signaling drone cameras with  handwritten signs that simply read “BREAD.”",
    "As the operation unfolds, Operation Stream 3.0 becomes more than a reconstruction of a clandestine mission. It becomes a study of how warfare is evolving — how underground systems, tactical adaptation, and psychological endurance are reshaping the battlefield in the age of UAVs and constant surveillance. At the same time, it offers a rare and deeply human look into the mentality that carried people forward through conditions many considered impossible — not resilience as mythology, but resilience as lived reality."
  ],
  blocks: [
    {
      title: "TUNNEL ROUTE BREAKDOWN",
      body: [
        "The pipe was twelve‑meter sections welded together. Soldiers counted the seams in darkness. Every tenth seam, they stopped not because they wanted to, but because their muscles had locked.",
        "They moved hunched, knees and elbows scraping metal. Condensate made the floor slick. The air thinned. Some lost consciousness. Others kept them awake with songs and children’s rhymes.",
        "One soldier pulled a chocolate bar from his pack. Sixteen men shared it. A crumb each. No one ever forgot that taste."
      ]
    },
    {
      title: "HISTORICAL CONTEXT",
      body: [
        "This pipeline once carried Siberian gas to Europe - 4,451 kilometers from the Arctic to the Carpathians. Built in 1983, it was a marvel of Cold War engineering.",
        "When Ukraine halted transit in January 2025, the pipe went silent. Just empty metal beneath Russian soil.",
        "Russian command saw what others missed: a hidden highway. The strategy was not new, Crimean War engineers had dug tunnels beneath Sevastopol in 1854. But the execution was modern. Drones owned the sky. So they went where drones could not follow.",
        "A natural feature, repurposed. A plan with multiple layers-literally."
      ]
    },
    {
      title: "FAITH IN THE DARK",
      body: [
        "Father Alexiy did not carry a rifle. He carried the Icon of Our Lady of Kursk, baptismal water, and anointing oil. His son Pavel walked beside him – same contract, same pipe, same darkness.",
        "Inside the metal tunnel, the boy fell asleep against his father’s chest. Hours of crawling. But a father felt his son’s warm breath and called it joy.",
        "“My son lay down very close to me, pressed against me, sighed like a child… and instantly fell asleep. I felt joy from his calm, living breath.”",
        "He recited the Lord  Prayer step by step. He said God felt close in that darkness. When they surfaced, black‑faced, exhausted,  the first thing he did was wash off the filth. Then he blessed the soldiers.",
        "Faith did not break in the pipe. It held."
      ]
    },
  ],
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
    BOOK, evidenceItems,
    evidenceSection, mapSection, missionFileDownload,
    mythPoll
};

