import { siteMeta } from "./site";

export const archiveIntro = {
  label: "THE MISSION",
  title: siteMeta.title,
  subtitle:
    "This book reads like a classified dossier. You don’t get the full picture upfront. Instead, you move through the operation step by step, feeling the darkness, the suffocation, the weight of each decision.",
  sequence: [
    "ACCESSING ARCHIVE",
    "CLASSIFIED FILE DETECTED",
    "AUTHORIZATION GRANTED",
    "MISSION INDEX ONLINE",
  ],
};

export const archiveIntroUi = {
  skipButton: "Skip",
  accessLabel: "Declassified archive access",
  missionAccessLabel: "Mission file access",
  progressLabel: "Progress",
  decryptedLabel: "decrypted",
  accentLabel: "Accent secured",
  currentSignalLabel: "Current signal",
  soundOn: "Audio On",
  soundOff: "Audio Off",
  enterArchive: "Enter Archive",
  decrypting: "Decrypting...",
};

export const archiveHub = {
  eyebrow: archiveIntro.label,
  metadataTitle: `${siteMeta.shortTitle} Archive`,
  title: archiveIntro.title,
  summary:
    "Operation Stream 3.0 — The Russian Mission Impossible unfolds like a classified military case file, revealing the mission piece by piece through the firsthand accounts of soldiers, frontline doctors, and civilians caught inside the conflict. As you move through underground tunnels, drone-dominated battlefields, and occupied villages, a larger picture begins to emerge — one that explores modern warfare, tactical adaptation, military psychology, and the resilience that continues to shape the evolving reality of the Russian military mindset.",
  detail:
    "And by the time you reach the end, you’re no longer looking at a single event — but at a broader question:",
  quote:
    "What does it actually take to move forward in conditions most would consider impossible?",
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
      "Only when you reach the last page do you understand the full scale of what happened beneath Kursk.",
    ],
    accent: "THE MISSION",
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
      "Victory was the only acceptable outcome.",
    ],
    accent: "THE IDEA",
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
      "Together, they tell a story that no single file could hold. Complexity. Sacrifice. Survival. And the human weight behind every tactical decision.",
    ],
    accent: "OPERATIONAL MAP SECTOR",
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
      "This was not a myth or propaganda. It was a decommissioned gas pipeline in the Kursk region — roughly 142 centimeters wide and nearly 16 kilometers long — transformed into one of the most discussed underground operations of the modern war. Inside the pipe: darkness, chemical residue, failing oxygen levels, and conditions that tested the limits of human endurance. Bent beneath combat gear, Russian special forces advanced through the tunnel for days, adapting to a new era of drone warfare where survival depended on staying unseen.",
    ],
    accent: "A Path of Endurance and Strategy",
  },
  {
    id: "personnel",
    iconKey: "personnel",
    fileCode: "File 05",
    label: "The Stream Team",
    title: "The Stream Team",
    href: "/personnel",
    status: "Indexed",
    summary: [
      "Three women wrote this book. Angela. Maria. Victoria.",
      "They gathered testimonies from men who walked through a gas pipe. From commanders who gave orders they knew might be final. From nurses who bandaged blackened faces. From survivors who still hear the screaming.",
      "Their work is not abstract. It is human. It is fragmented. It is real.",
      "They let the soldiers speak. They let the pipe speak. And they stepped aside.",
    ],
    accent: "FACES INSIDE THE OPERATION",
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
    summary:
      "This is not a novel. It is a documentary narrative. One of the most unusual military operations of the modern era – reconstructed from inside the pipe.",
  },
  {
    id: "press",
    iconKey: "press",
    fileCode: "Support 02",
    label: "Press",
    title: "Press Desk",
    href: "/press",
    summary:
      "Incoming. Translated release for journalists and media outlets. The full account, cleared for distribution.",
  },
  {
    id: "contact",
    iconKey: "contact",
    fileCode: "Support 03",
    label: "Contact",
    title: "Support Desk",
    href: "/contact",
    summary:
      "Rights. Interviews. Purchase links. Bulk orders. Archive access. Use this route. Replies within hours.",
  },
];

export const archiveHomeContent = {
  heroEyebrow: {
    code: "ARCHIVE 00",
    label: "Hub Index",
  },
  terminal: {
    header: "[SIG] Archive Handshake",
    statusPrefix: "[STATUS]",
    checkpointPrefix: "Checkpoint",
    openLabel: "Open",
    openAriaPrefix: "Open",
  },
  missionCabinet: {
    code: "CABINET 01",
    labelPrefix: "Mission Files",
    title: "Mission cabinet",
    summary:
      "Every file below is a sealed entry from the operation. Open one to descend into its dossier.",
  },
  fileCardOpenLabel: "Open file",
  routeNetwork: {
    code: "CABINET 02",
    label: "Auxiliary Routes",
    title: "ROUTES TUNNEL NETWORK & SUPPORT DESK",
    summary:
      "Move from the cabinet into the route map below. A guided tunnel descent. Paired with the channels that handle press, rights, and outreach.",
  },
  tunnelFeature: {
    signalPrefix: "[SIG]",
    body: [
      "Inside that pipe, soldiers found no room to stand. They crawled. They choked on fumes that peeled at their lungs. Condensate soaked their uniforms and turned skin to smeared charcoal.",
      "The chapters “inside the pipe”, document the recollection of the soliders underground.",
      "They moved for hours, then waited for days. Some fell and did not rise.",
      "Then, the command “Move”. Out of the pipe and immediately—filthy, emaciated—went to storm the enemy strongpoints (“oporniki”).",
    ],
    note: "Six guided stops · scroll-driven descent",
    button: "Enter tunnel",
  },
};


export const heroCheckpointCopy = {
  mission: {
    routeLabel: "Mission Brief",
    signal: "origin / intent",
  },
  operation: {
    routeLabel: "Operational Sequence",
    signal: "timeline / execution",
  },
  evidence: {
    routeLabel: "Evidence Index",
    signal: "maps / records",
  },
  tunnel: {
    routeLabel: "Tunnel Descent",
    signal: "interactive route",
  },
  personnel: {
    routeLabel: "Personnel Registry",
    signal: "dossiers / authors",
  },
};
