export const siteMeta = {
  title: "The Russian Mission Impossible",
  shortTitle: "TRMI Archive",
  description:
    "An immersive classified archive exploring a controversial tunnel operation through mission files, evidence, maps, and the book that reveals the full story.",
  tagline: "Declassified archive access",
  publisher: "CGG International W.L.L.",
  contactEmail: "info@cgg-international.com",
  contactAddress: [
    "1404 Manama Centre, Building 145",
    "Road 380, Block 304, Manama",
    "Kingdom of Bahrain",
  ],
};

export const archiveIntro = {
  label: "Archive entry protocol",
  title: "The Russian Mission Impossible",
  subtitle:
    "Enter a declassified mission file built to feel like an intelligence archive rather than a standard book website.",
  note: "Audio is muted by default. Enable it to hear the archive handshake.",
  sequence: [
    "ACCESSING ARCHIVE",
    "CLASSIFIED FILE DETECTED",
    "AUTHORIZATION GRANTED",
    "MISSION INDEX ONLINE",
  ],
};

export const missionOverview = {
  label: "File 01",
  title: "The Mission",
  summary:
    "The site is the campaign's opening dossier. Instead of presenting the book immediately, it stages the story as an archive breach: visitors move through mission phases, confront the evidence, and only then unlock the full account.",
  body: [
    "The client wants intrigue first and sales second. Every section should make visitors feel like they are piecing together a real operation on their own.",
    "The framing is intentionally declassified, cinematic, and investigative. It should support PR, reader curiosity, and time spent exploring the record.",
  ],
  stats: [
    { value: 215, suffix: "days", label: "Occupation documented" },
    { value: 16, suffix: "km", label: "Tunnel route traced" },
    { value: 5, suffix: "phases", label: "Operational sequence" },
    { value: 1, suffix: "story", label: "Full narrative to unlock" },
  ],
  directives: [
    "Make the visitor feel like an observer entering a restricted war-room archive.",
    "Frame navigation as mission files, not brochure sections.",
    "Use evidence, maps, and timeline storytelling to keep discovery active.",
  ],
};

export const timelinePhases = [
  {
    code: "PHASE 1",
    title: "The Idea",
    summary:
      "Introduce the premise of a mission so unusual that many readers will question whether it happened at all.",
    excerpt:
      "The first task is not proving the end of the mission. It is establishing why such an idea would even be attempted.",
    details: [
      "Position the operation as improbable from the start.",
      "Open with narrative intrigue instead of explanatory biography.",
      "Anchor the site in the tension between rumor and record.",
    ],
  },
  {
    code: "PHASE 2",
    title: "The Plan",
    summary:
      "Explain how the concept turned into an actionable operation through planning, secrecy, and route selection.",
    excerpt:
      "Before the tunnel becomes a visual spectacle, the audience should understand that the plan itself carried the first layer of risk.",
    details: [
      "Show diagrams, route logic, and planning fragments.",
      "Use short text blocks that feel like briefing notes.",
      "Keep the tone procedural and tense.",
    ],
  },
  {
    code: "PHASE 3",
    title: "The Route",
    summary:
      "Move from abstraction to terrain. The route section introduces place, distance, and the physical scale of the tunnel operation.",
    excerpt:
      "Maps, coordinates, and distance markers should make the visitor feel the length of the mission before they read its outcome.",
    details: [
      "Map the geography that makes the mission historically meaningful.",
      "Use distance markers and topographic cues.",
      "Prepare the transition into the tunnel sequence.",
    ],
  },
  {
    code: "PHASE 4",
    title: "The Operation",
    summary:
      "This is the high-intensity core: the tunnel journey, the visual evidence wall, and the question of what happened in darkness.",
    excerpt:
      "The archive should narrow here. Visuals become more claustrophobic, copy gets tighter, and the tunnel takes over the screen.",
    details: [
      "Treat the tunnel as the primary interactive feature.",
      "Surface memorial context for the character who died in the tunnel.",
      "Link the climax directly to the full story.",
    ],
  },
  {
    code: "PHASE 5",
    title: "The Aftermath",
    summary:
      "Close by widening back out: evidence, authors, media, and the invitation to access the complete narrative in book form.",
    excerpt:
      "After the tunnel, the visitor should leave with one question: how much more is in the book that the archive only hints at?",
    details: [
      "Bridge from experience into purchase and press pathways.",
      "Support both readers and journalists.",
      "End with a strong archive-consistent CTA.",
    ],
  },
];

export const mythPoll = {
  label: "File 03",
  title: "Myth or Operation?",
  question: "Do you believe this mission actually happened?",
  options: ["Yes", "No", "Not sure"],
  supportMaterials: [
    {
      type: "Diagram",
      title: "Tunnel route breakdown",
      summary: "A planning-led view of the route, scale, and physical progression.",
    },
    {
      type: "Reference",
      title: "Historical context",
      summary: "Context markers that locate the mission inside a larger military timeline.",
    },
    {
      type: "Excerpt",
      title: "Book fragments",
      summary: "Short passages that turn the abstract mission into lived experience.",
    },
  ],
};

export const evidenceItems = [
  {
    id: "board-map",
    type: "Map fragment",
    title: "Operational map sector",
    summary: "The mission depends on terrain. The map board establishes the geography before any narrative claim is made.",
    detail:
      "Use layered coordinates, route callouts, and redacted labels. This item should feel like it was pinned to a war-room wall for operational use rather than public display.",
    status: "ready",
  },
  {
    id: "board-doc",
    type: "Redacted document",
    title: "Mission notes",
    summary: "A heavily marked note sheet that implies planning, review, and last-minute changes.",
    detail:
      "This panel stands in for official material the client will provide later. Until then it should be represented as a controlled archive placeholder, not fake final evidence.",
    status: "pending",
  },
  {
    id: "board-photo",
    type: "Photograph",
    title: "Faces inside the operation",
    summary: "Photos of key people encountered along the route, including memorial treatment where relevant.",
    detail:
      "The client specifically called out the need to differentiate the photo of the character who died in the tunnel. The UI should support memorial styling without becoming melodramatic.",
    status: "pending",
  },
  {
    id: "board-quote",
    type: "Quote file",
    title: "Witness language",
    summary: "A text-first evidence card pairing short testimony fragments with restrained metadata.",
    detail:
      "This item should keep the emotional core visible and balance the colder diagrams, coordinates, and route abstractions elsewhere in the board.",
    status: "ready",
  },
  {
    id: "board-diagram",
    type: "Schematic",
    title: "Tunnel mechanics",
    summary: "A stripped-down technical read of how the route behaves in space and darkness.",
    detail:
      "This is where the site can borrow from briefing graphics: distance, compression, grade, and movement. It should be simple enough to scan and dramatic enough to hold attention.",
    status: "pending",
  },
];

export const tunnelScenes = [
  {
    id: "entry",
    marker: "0.0 km",
    title: "Entry point",
    summary:
      "The route begins as an act of commitment. Visitors enter a constrained viewport with only enough information to keep moving forward.",
  },
  {
    id: "compression",
    marker: "4.0 km",
    title: "Compression",
    summary:
      "Distance starts to matter. Markers tighten, contrast sharpens, and the interface should feel more physically enclosed.",
  },
  {
    id: "memorial",
    marker: "9.5 km",
    title: "Memorial marker",
    summary:
      "Introduce the character who died in the tunnel. This scene should pause the scroll rhythm briefly and acknowledge loss with restraint.",
    memorial: true,
  },
  {
    id: "blind-run",
    marker: "13.0 km",
    title: "Total darkness",
    summary:
      "The archive reaches its most abstract point. Language becomes spare, markers feel procedural, and the user is asked to imagine the mission without light.",
  },
  {
    id: "exit",
    marker: "16.0 km",
    title: "Exit prompt",
    summary:
      "End on the client's requested line: a prompt that makes the user picture the mission in darkness before being sent to the full story.",
  },
];

export const briefingVideo = {
  label: "File 06",
  title: "Mission Briefing",
  status: "pending",
  summary:
    "The client wants a short intelligence-briefing style video rather than a conventional book trailer.",
  beats: [
    "Redacted documents",
    "Operation maps",
    "Schematic diagrams",
    "Timeline graphics",
  ],
  placeholderNote:
    "Client video materials are still pending. The interface should present this as an incoming briefing, not a broken player.",
};

export const mapLocations = [
  {
    id: "sudzha",
    name: "Sudzha",
    region: "Primary story location",
    description:
      "The map section should ground the mission in place and explain why location matters to the story's stakes.",
    x: "24%",
    y: "52%",
  },
  {
    id: "route-origin",
    name: "Approach route",
    region: "Operational setup",
    description:
      "A staging marker used to imply movement toward the tunnel operation.",
    x: "38%",
    y: "44%",
  },
  {
    id: "tunnel-axis",
    name: "Tunnel axis",
    region: "Scroll-linked path",
    description:
      "The tunnel section and map section should visually rhyme through markers, distance, and route notation.",
    x: "54%",
    y: "56%",
  },
  {
    id: "breach-point",
    name: "Breach point",
    region: "Mission contact",
    description:
      "A focused marker used to tie timeline events to geography.",
    x: "67%",
    y: "38%",
  },
];

export const authors = [
  {
    name: "Angela Khachaturyan",
    role: "Lead author",
    status: "ready",
    bio:
      "Presented here as the lead compiler of the archive: the authorial voice responsible for turning reported fragments, mission context, and testimony into a narrative readers can move through.",
    quote:
      "The archive is not trying to flatten the mission into certainty. It is trying to show why people keep arguing about it.",
    contribution:
      "Frames the investigation, controls tone, and anchors the archive in documentary tension rather than spectacle.",
  },
  {
    name: "Maria Voronina",
    role: "Co-author",
    status: "ready",
    bio:
      "Functions as the contextual voice in the dossier. Her profile should read like the layer that keeps the mission tied to history instead of myth alone.",
    quote:
      "When a mission sounds impossible, context is the first thing that stops it from becoming folklore.",
    contribution:
      "Supplies historical framing, chronology, and the connective material between evidence fragments.",
  },
  {
    name: "Victoria Kataeva",
    role: "Co-author",
    status: "ready",
    bio:
      "Occupies the analytical side of the archive, translating route, planning, and operational detail into language that supports the tunnel and evidence sections.",
    quote:
      "A mission file only works when the technical trace and the human trace stay visible together.",
    contribution:
      "Supports structural explanation of the operation, route visuals, and evidence interpretation.",
  },
];

export const pressAssets = [
  {
    id: "press-release",
    title: "Translated press release",
    type: "Press kit",
    description:
      "Incoming translated release for journalists and media outlets.",
    status: "pending",
  },
  {
    id: "downloadable-images",
    title: "Downloadable images",
    type: "Media assets",
    description:
      "High-resolution stills and supporting visuals for coverage.",
    status: "pending",
  },
  {
    id: "author-bios",
    title: "Author bios",
    type: "Reference",
    description:
      "Short and extended author biographies for interviews, coverage, and citation.",
    status: "ready",
  },
  {
    id: "book-summary",
    title: "Book summary",
    type: "Reference",
    description:
      "A concise summary of the mission narrative intended for media packets and purchase context.",
    status: "ready",
  },
  {
    id: "contact-sheet",
    title: "Contact information",
    type: "Support",
    description:
      "Direct route for press requests, interviews, bulk orders, and purchase-link requests.",
    status: "ready",
  },
];

export const missionFileDownload = {
  title: "Downloadable Mission File",
  summary:
    "A shareable classified-style dossier intended for readers and journalists. It will eventually bundle summary notes, diagrams, maps, excerpts, and possibly audio.",
  status: "pending",
  href: null,
};

export const purchasePage = {
  label: "Access route",
  title: "Access the Full Story",
  summary:
    "The archive experience is only the surface file. The full account lives in the book, supported by longer narrative, character detail, and the complete mission arc.",
  synopsis:
    "This route keeps the purchase experience inside the campaign tone. It should feel like the final clearance step after the visitor has reviewed the mission files, not like a generic sales page.",
  excerpt:
    "The walls of the pipe were slick with condensation. We had been moving long enough for time to become useless. Ahead, the smallest visible trace of light carried more authority than any spoken command.",
  bullets: [
    "Short synopsis framed as a declassified briefing.",
    "Selective excerpt to maintain intrigue.",
    "CTA language consistent with archive access.",
    "Optional mission-file download teaser for later asset delivery.",
  ],
};

export const contactDesk = {
  title: "Support and Press Desk",
  summary:
    "Use this route for rights questions, interviews, purchase-link requests, bulk orders, and general archive support.",
  channels: [
    {
      label: "Press requests",
      value: "Media interviews, journalist access, and press coordination.",
    },
    {
      label: "Purchase-link requests",
      value: "Route readers to the final purchase destination until the external storefront is supplied.",
    },
    {
      label: "Bulk and partner inquiries",
      value: "Handle outreach from bookstores, events, and distribution partners.",
    },
  ],
};

export const seoBlocks = [
  {
    title: "Secret military operations",
    text:
      "The archive positions the book alongside discussions of covert planning, restricted movement, and the storytelling of missions that seem implausible until records begin to surface.",
  },
  {
    title: "Underground warfare",
    text:
      "Tunnel movement, darkness, distance, and confinement are treated as central themes rather than background details, making the site relevant to readers researching subterranean conflict narratives.",
  },
  {
    title: "Modern military history",
    text:
      "The site blends dramatic presentation with timeline structure, maps, and operational context so the story remains legible as contemporary history, not only marketing.",
  },
  {
    title: "Real mission stories",
    text:
      "The interactive dossier format is designed to amplify the question the client wants readers to ask: if this sounds impossible, what does the complete story reveal?",
  },
];

export const BOOK = {
  title: "Operation Stream 3.0",
  subtitle:
    "The definitive documentary account of 215 days beneath the Iron Curtain — a tunnel operation so improbable it reads like fiction.",
  genre: "Documentary Nonfiction",
  publisher: siteMeta.publisher,
  year: 2026,
  synopsis:
    "Beneath the divided streets of Cold War Berlin, a small team carved a passage that would challenge the boundary between courage and recklessness. Drawing on declassified records, survivor testimony, and on-site investigation, this account traces every phase of the operation — from the first shovel strike to the final collapse of silence. The result is a narrative that forces the reader to decide where ingenuity ends and madness begins.",
  themes: ["Occupation", "Survival", "Espionage", "Truth"],
  chapters: [
    "The Idea",
    "The Plan",
    "The Route",
    "Day One",
    "The Descent",
    "Contact",
    "Darkness",
    "The Collapse",
    "Aftermath",
  ],
  excerpt:
    "The earth swallowed them whole. Ahead, the beam of a single torch carved a ragged circle against wet clay. Behind, the opening had already closed to a pale crescent. Down here, time was measured in arm-lengths of freshly dug wall, in the slow drip from an unseen seam, in the irregular rhythm of breathing that each man tried to keep quiet enough not to hear. No one spoke. Orders had been clear: sound carries through soil the way it never carries through air.",
};

export const AUTHORS = authors;

export const TESTIMONIALS = [
  {
    quote:
      "A masterwork of investigative narrative. It forces you to confront the line between bravery and insanity.",
    author: "Dr. Elena Volkov",
    role: "Historian, Cold War Studies",
  },
  {
    quote:
      "Reads like a thriller, but every sentence is anchored in the documentary record. Unputdownable.",
    author: "James Whitfield",
    role: "Literary Critic",
  },
  {
    quote:
      "The most vivid account of tunnel operations I have encountered. Essential reading.",
    author: "Col. Richard Haines (Ret.)",
    role: "Military Analyst",
  },
  {
    quote:
      "This book does what the best nonfiction should — it makes the impossible feel inevitable.",
    author: "Sophia Reinhardt",
    role: "Journalist, Der Spiegel",
  },
];

export const TIMELINE = [
  { date: "June 1961", event: "First reconnaissance survey", type: "operations" },
  { date: "August 1961", event: "The Wall goes up", type: "conflict" },
  { date: "October 1961", event: "Planning begins in secret", type: "operations" },
  { date: "January 1962", event: "Route finalised", type: "operations" },
  { date: "March 1962", event: "Digging commences", type: "operations" },
  { date: "July 1962", event: "First tunnel collapse", type: "conflict" },
  { date: "September 1962", event: "Breakthrough beneath the border", type: "operations" },
  { date: "October 1962", event: "29 crossings completed", type: "liberation" },
  { date: "November 1962", event: "Operation exposed", type: "conflict" },
  { date: "December 1962", event: "Tunnel sealed", type: "conflict" },
  { date: "2026", event: "Full account published", type: "liberation" },
];
