export const pressAssets = [
  {
    id: "press-release",
    title: "Translated press release",
    type: "Press kit",
    description:
      "Official release for media – cleared for distribution, pending final declassification.",
    status: "pending",
  },
  {
    id: "downloadable-images",
    title: "Downloadable images",
    type: "Media assets",
    description:
      "High‑resolution stills from the operation: soldiers, the pipeline, and the faces behind the mission.",
    status: "pending",
  },
  {
    id: "author-bios",
    title: "Author bios",
    type: "Reference",
    description:
      "Short and extended bios of Angela Khachaturyan, Maria Voronina, and Victoria Kataeva – for interviews and citation.",
    status: "ready",
  },
  {
    id: "book-summary",
    title: "Book summary",
    type: "Reference",
    description:
      "A clear, factual summary of the underground mission, its planning, its execution, and the human cost recorded by those who were there.",
    status: "ready",
  },
  {
    id: "contact-sheet",
    title: "Contact information",
    type: "Support",
    description:
      "Direct route for press requests, interview scheduling, bulk orders, and archive access.",
    status: "ready",
  },
];

export const missionFileDownload = {
  title: "Downloadable Mission File",
  summary:
    "A shareable, classified‑styled dossier intended for readers and journalists alike. It will eventually bundle summary notes, operational diagrams, sector maps, book excerpts, and possibly audio recordings.",
  status: "pending",
};

export const pressDeskPage = {
  eyebrow: "Support 02",
  metadataTitle: "Press Desk",
  title: "Press Desk",
  summary: pressAssets[0].description,
  assets: pressAssets,
};

export const pressPageContent = {
  breadcrumbs: [{ label: "Archive", href: "/" }, { label: "Press" }],
  actions: [
    { label: "Open Contact Desk", href: "/contact" },
    { label: "Open Publication File", href: "/book", variant: "outline" },
  ],
  aside: {
    eyebrow: "Mission File",
    summary: [
      "“Only those who pass the trial by fire will know their true selves.” — Hades, Commander of Akhmat special forces",
      "A shareable classified‑style dossier intended for readers and journalists. It will eventually bundle summary notes, diagrams, maps, excerpts, and possibly audio.",
    ],
    statusLabel: "Status:",
  },
  linkedRouteButton: "Open linked route",
};

export const pressAssetLinks = {
  "author-bios": "/personnel/authors",
  "book-summary": "/book",
  "contact-sheet": "/contact",
};
