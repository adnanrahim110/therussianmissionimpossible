import { slugify } from "@/lib/slugs";

export const authorsIntro = {
  eyebrow: "File 03",
  title: "Three Authors, One Mission Record",
  body:
    "Their work blends storytelling, reflection, and documented accounts to highlight both the operation and the human experiences connected to it.",
};

export const authorProfiles = [
  {
    name: "Viktoria Kataeva",
    bio: `Viktoria Alexandrovna Kataeva is a journalist and war correspondent for the federal online publication NEWS.ru. Victoria Kataeva was one of the first Russian journalists to interview the heroes of the unique Operation Pipe (Stream) for the liberation of the Sudzhansky district of Kursk Oblast from occupation by the Armed Forces of Ukraine in March 2025. For over ten years, she worked as an editor for the magazines “Karavan Istoriy” (Story Caravan) and “Kollektsiya Karavana Istoriy” (Story Caravan Collection). She is a scriptwriter and executive editor of the documentary projects "Maidan. Point of No Return" and "Donbass. Territory of Pain. A First-Person Account of Ukraine" for Inside Media Holding. She is also the author of the concept and scripts for the documentary project “Sozidateli. Yugo-Vostok” (Creators. Southeast) about working-class professions in Donbass (hosted by actor Mikhail Mamaev). She  is also the scriptwriter of the documentary film “Semyetsvetik”  (FamilyFlower), created during the Russian Year of the Family program and dedicated to large families in Voronezh and the Voronezh region, and the author of the project “KinoKanonikuly” (Movie Holidays) — a creative laboratory and psychological rehabilitation program for children and adolescents in the city of Ramenskoye, Moscow Region, which was supported by the Public Chamber of the Russian Federation (2nd place in the “Mom-Entrepreneur” competition). For her work in the combat zone, volunteer work, and assistance in covering the work of artistic units in a military hospital, Victoria Kataeva has been recognized as a war correspondent. Her journalistic materials have repeatedly topped the ratings of Russian federal media.`,
    quote:
      "For her work in the combat zone, volunteer work, and assistance in covering the work of artistic units in a military hospital, Victoria Kataeva has been recognized as a war correspondent.",
  },
  {
    name: "Angela Khachaturyan",
    bio: `Dr. Angela Vasilyevna Khachaturyan is the founder and vice president of the Arts and Science Achievement Foundation, a non-profit organization established in Florida, USA, in 1996 to implement programs benefiting the international community. She graduated from Rostov University with a degree in Law. She received her second education at Russia's leading theater institute, GITIS (now the Russian Academy of Theatre Arts). She was awarded a Doctorate degree for her dissertation “Show Business as a Phenomenon of Social Life”. Dr. Khachaturyan is the creator of the cult program “TV Show”. Over the years, she worked as a special correspondent for the youth magazine “Smena” (Shift), carrying out editorial assignments in conflict zones — on the border of Afghanistan and the Tajik SSR (March 1986) and in Nagorno-Karabakh during the First Karabakh War (1988). In 2000, she was the author and producer of television reports on the Chechen War for the TV-6 channel (Russia), as well as the author and producer of the socio-political talk show "Govorite!" (Speak!) on the federal channel TVC.`,
    quote:
      "Dr. Khachaturyan is the creator of the cult program “TV Show”.",
  },
  {
    name: "Maria Voronina",
    bio: `Maria Voronina holds two higher education degrees in Economics and Law. She is passionate about military history, the history of intelligence services, and the development of military technology. Her professional focus is on the development of the third sector of the economy—non-profit organizations. Until 2022, she was a member of the Council on Self-Regulation under the Chamber of Commerce and Industry of the Russian Federation, dealing with the development of the civil law institution of self-regulation in several industries, founding and leading non-profit structures, and participating in the preparation of draft laws in the field of self-regulation. Maria joined the book project during its formative stage: she coordinated the work of the authors under the auspices of the foundation. Initially serving as the project administrator, as the creative team worked, she became involved in preparing texts, writing individual materials, and gathering information, becoming a full-fledged member of the author team.`,
    quote:
      "Maria joined the book project during its formative stage: she coordinated the work of the authors under the auspices of the foundation.",
  },
];

const authorPhotoMap = {
  "angela-khachaturyan": "/imgs/authors/angela.png",
  "maria-voronina": "/imgs/authors/voronina.png",
  "viktoria-kataeva": "/imgs/authors/kataeva.png",
};

export const authors = authorProfiles.map((author, index) => {
  const id = slugify(author.name);
  return {
    ...author,
    id,
    fileCode: `AUTH-${String(index + 1).padStart(2, "0")}`,
    photo: authorPhotoMap[id] ?? null,
  };
});

export const civiliansProfiles = [
  {
    name: "Elena Egorovna Sukhareva",
    description: "The head of the training and methodological center for disaster medicine at the Kursk Regional Multidisciplinary Clinical Hospital. She was one of the first to meet the participants of Operation “Stream 3.0”"
  },
  {
    name: "Nurse Nika",
  },
  {
    name: "Alexander Shtatenko - Uncle Sasha",
    description: "Due to his heroic efforts, not only survived, but also helped his neigbors survive the occupation of Sudzha"
  },
  {
    name: "Olga Mikhailovna Minchenko",
    description: "a 101-year-old resident of Sudzha who survived the occupation by the Armed Forces of Ukraine."
  },
];

const civiliansPhotoMap = {
  "elena-egorovna-sukhareva": "/imgs/civilians/elena.png",
  "nurse-nika": "/imgs/civilians/nika.jpg",
  "alexander-shtatenko-uncle-sasha": "/imgs/civilians/sasha.png",
  "olga-mikhailovna-minchenko": "/imgs/civilians/olga.png",
}

export const civilians = civiliansProfiles.map((civilian, index) => {
  const id = slugify(civilian.name);
  return {
    ...civilian,
    id,
    fileCode: `CIV-${String(index + 1).padStart(2, "0")}`,
    photo: civiliansPhotoMap[id] ?? null,
  };
});

export const characterDossiers = [
  {
    callsign: "HADES",
    archetype: "The Mind",
    role: "Strategic Command",
    photo: "/imgs/bio/hades.jpg",
    summary:
      "The intersection of intellect, adaptability, and operational clarity. Operates simultaneously across two domains: the confined, deteriorating reality of fighters underground and the fluid, information-driven battlefield above.",
    traits: [
      "System-level thinker",
      "Direct-action participant",
      "Cognitive simplification under strain",
      "Dual-domain operational awareness",
    ],
    mentality: "Don't ask when it ends. Execute.",
    analysis:
      "This duality defines him: a commander who processes war abstractly — but executes it physically. By reducing war to structured work, he removes uncertainty and preserves function.",
  },
  {
    callsign: "BOX",
    archetype: "The Instinct",
    role: "Frontline Operator",
    photo: "/imgs/bio/box.png",
    summary:
      "Demonstrates the boundary between cognitive breakdown and operational continuity. Under prolonged deprivation — low oxygen, disorientation, spatial collapse — his perception fragments. Yet his ability to act does not disappear.",
    traits: [
      "Subconscious decision-making",
      "Action without full awareness",
      "Survival beyond cognitive limits",
      "Instinctive processing override",
    ],
    mentality: "When thinking fails — instinct continues.",
    analysis:
      "He operates in a state of partial detachment from reality, yet remains functional in combat tasks. When structured thought fails, instinctive processing takes over.",
  },
  {
    callsign: "TALISMAN",
    archetype: "The Spirit",
    role: "Psychological Anchor",
    photo: "/imgs/bio/talisman.png",
    summary:
      "Embodies the biological and psychological limit of endurance. His defining role is not his decline — but his influence on the group: providing certainty in uncertainty, stabilizing others through belief.",
    traits: [
      "Sustained psychological function",
      "Group cohesion through belief",
      "Certainty in uncertainty",
      "Influence beyond physical presence",
    ],
    mentality: "We move forward — because he made it possible.",
    analysis:
      "After his death, the group does not fragment. Instead, they convert loss into collective behavioral continuity. He becomes not an individual presence but a sustained psychological function.",
  },
  {
    callsign: "MEDVED",
    archetype: "The Force",
    role: "Assault Operator",
    photo: "/imgs/bio/medved.png",
    summary:
      "Reflects the conversion of physical deprivation into offensive capability. Hunger, fatigue, and pressure do not weaken him — they trigger a dominant fight response.",
    traits: [
      "Biologically driven activation",
      "Reduced cognitive hesitation",
      "Direct action orientation",
      "Controlled intensity",
    ],
    mentality: "Pain becomes action.",
    analysis:
      "This is not uncontrolled aggression, but biologically driven activation. He channels stress into movement and engagement, maintaining both combat function and social awareness.",
  },
  {
    callsign: "KUZYA",
    archetype: "The Executor",
    role: "Combat Efficiency Specialist",
    photo: "/imgs/bio/kuzya.png",
    summary:
      "Illustrates ethical adaptation under sustained conflict. War compresses moral frameworks into functional necessity. He transitions from civilian structure to combat efficiency without resistance.",
    traits: [
      "Clarity under pressure",
      "Precision in execution",
      "Emotional reduction",
      "Acceptance of transformation",
    ],
    mentality: "You become what the situation requires.",
    analysis:
      "His awareness that kindness diminishes is not justification — it is observation. He represents reduced internal conflict and alignment with situational demands.",
  },
  {
    callsign: "TRIDSATKA",
    archetype: "The Backbone",
    role: "Forward Risk Commander",
    photo: "/imgs/bio/tridsatka.png",
    summary:
      "Consistently assumes forward risk responsibility. His behavior reflects voluntary exposure to danger, prioritization of group survival, and enforcement of discipline under stress.",
    traits: [
      "Voluntary risk assumption",
      "Group survival prioritization",
      "Discipline enforcement",
      "Resource management under stress",
    ],
    mentality: "If someone must go first — it will be me.",
    analysis:
      "He maintains operational control: regulating fire, managing resources, preserving structure. He represents reliability under uncertainty and responsibility over impulse.",
  },
  {
    callsign: "MOWGLI",
    archetype: "The Guardian",
    role: "Group Stabilizer",
    photo: null,
    summary:
      "Stabilizes both himself and the group through behavioral simplicity. His use of rhythm, repetition, and quiet expression functions as emotional regulation and panic reduction.",
    traits: [
      "Grounding mechanisms",
      "Non-verbal leadership",
      "Emotional containment",
      "Group synchronization",
    ],
    mentality: "Stay steady. Keep others steady.",
    analysis:
      "This converts individual coping into collective stability. His behavioral simplicity is not a limitation but a survival function that synchronizes the group.",
  },
  {
    callsign: "STRICK",
    archetype: "The Survivor",
    role: "Identity Preservation Specialist",
    photo: "/imgs/bio/strick.png",
    summary:
      "Survives through identity preservation. In conditions where perception deteriorates, he anchors himself through personal objects, memory, and symbolic continuity.",
    traits: [
      "Internal stability mechanisms",
      "Resistance to identity erosion",
      "Survival through continuity",
      "Symbolic anchoring",
    ],
    mentality: "Hold onto something — and you remain.",
    analysis:
      "This prevents dissociation and maintains psychological integrity. He represents resistance to identity erosion under conditions of sustained perceptual breakdown.",
  },
  {
    callsign: "TIKHIY",
    archetype: "The Conscience",
    role: "Moral Integrity Officer",
    photo: "/imgs/bio/thikiy.jpg",
    summary:
      "Maintains ethical awareness under operational pressure. He does not reject the necessity of combat — but preserves the distinction between individual responsibility and collective conflict.",
    traits: [
      "Moral persistence",
      "Restraint within force",
      "Identity beyond role",
      "Ethical continuity",
    ],
    mentality: "War reveals who you are.",
    analysis:
      "He continues to act humanely within inhuman conditions. He represents moral persistence and the preservation of individual identity within a system that demands conformity.",
  },
  {
    callsign: "RYBA",
    archetype: "The Human Core",
    role: "Group Cohesion Operator",
    photo: null,
    summary:
      "Demonstrates prosocial behavior under scarcity. By sharing limited resources, he reinforces group cohesion, identity retention, and resistance to purely survival-driven behavior.",
    traits: [
      "Empathy under pressure",
      "Human connection as survival factor",
      "Resource sharing under scarcity",
      "Identity retention",
    ],
    mentality: "We remain human — even here.",
    analysis:
      "His behavior under extreme conditions represents the preservation of humanity as a deliberate choice, not a passive state. Prosocial action becomes a form of resistance.",
  },
  {
    callsign: "NALCHIK",
    archetype: "The Impulse",
    role: "Emotional Response Operator",
    photo: "/imgs/bio/nalchik.png",
    summary:
      "Embodies the tension between immediate emotional response and imposed operational control. His instinct is to act — often driven by empathy — but is restrained by discipline.",
    traits: [
      "Internal conflict management",
      "Controlled reaction",
      "Human instinct within structured systems",
      "Empathy-driven impulse",
    ],
    mentality: "I want to act. I must hold.",
    analysis:
      "He represents the ongoing tension between human instinct and operational discipline. His struggle is not weakness — it is the cost of maintaining structure under emotional pressure.",
  },
  {
    callsign: "ZHORA",
    archetype: "The Thinker",
    role: "Historical Context Analyst",
    photo: "/imgs/bio/zhora.jpg",
    summary:
      "Contextualizes present events within historical continuity. This perspective provides psychological distance, ideological grounding, and endurance through meaning.",
    traits: [
      "Narrative-based resilience",
      "Perception beyond immediacy",
      "Historical pattern recognition",
      "Meaning construction",
    ],
    mentality: "This is part of something larger.",
    analysis:
      "By framing current events within a broader historical arc, he provides the group with a sense of purpose that extends beyond immediate survival.",
  },
  {
    callsign: "SOLDAT",
    archetype: "The Realist",
    role: "Direct Action Specialist",
    photo: null,
    summary:
      "Reduces complexity into direct actionable understanding. By eliminating abstraction, he minimizes hesitation, accelerates decision-making, and maintains focus.",
    traits: [
      "Clarity through reduction",
      "Function over interpretation",
      "Minimal hesitation",
      "Accelerated decision-making",
    ],
    mentality: "Act. Don't overthink.",
    analysis:
      "His cognitive simplification is not a limitation but a survival mechanism. By reducing complexity to action, he maintains operational effectiveness where analysis would cause paralysis.",
  },
  {
    callsign: "SANTA",
    archetype: "The Stabilizer",
    role: "Psychological Normalization Operator",
    photo: "/imgs/bio/santa.jpeg",
    summary:
      "Introduces micro-normalcy into extreme conditions. Through tone, interaction, and behavioral consistency, he reduces psychological overload and stabilizes group perception.",
    traits: [
      "Normalization as survival tool",
      "Emotional buffering",
      "Cognitive reset within chaos",
      "Stress interruption",
    ],
    mentality: "Keep it normal — so others can keep going.",
    analysis:
      "This function is subtle — but critical. By maintaining normal behavioral patterns, he interrupts the escalation of stress and prevents collective psychological breakdown.",
  },
  {
    callsign: "RODNOY",
    archetype: "The Hunter",
    role: "UAV / Intelligence Operator",
    photo: "/imgs/bio/rondoi.jpg",
    summary:
      "Operates through data-driven combat execution. Using UAV systems, he observes, predicts, and enables precise action. He reflects the shift toward remote awareness and information superiority.",
    traits: [
      "Cognitive warfare evolution",
      "Distance-enabled lethality",
      "Information dominance",
      "Reduced reaction time",
    ],
    mentality: "See first. Act before they react.",
    analysis:
      "He represents the evolution of modern combat toward information-based engagement, where awareness precedes action and precision replaces volume.",
  },
  {
    callsign: "GREY & SPRAY CAN",
    archetype: "The Specialists",
    role: "Precision Operators",
    photo: null,
    summary:
      "Represent consistent high-level execution without individual emphasis. Their effectiveness comes from technical mastery, repetition, and discipline.",
    traits: [
      "Technical mastery",
      "Repetitive excellence",
      "Discipline-driven performance",
      "Identity through function",
    ],
    mentality: "Precision is everything.",
    analysis:
      "They are defined not by identity — but by performance. Functional precision operators whose consistency enables the system to rely on predictable excellence.",
  },
  {
    callsign: "KHRUST",
    archetype: "The Architect",
    role: "Structural Leadership",
    photo: null,
    summary:
      "Builds operational systems based on trust and shared responsibility. His leadership emphasizes cohesion over hierarchy, adaptability, and internal accountability.",
    traits: [
      "Decentralized control",
      "Team-based effectiveness",
      "Trust-based systems",
      "Adaptive leadership",
    ],
    mentality: "Build the system — and it holds.",
    analysis:
      "His approach to leadership prioritizes structural resilience over individual authority. The system he builds continues to function even under extreme disruption.",
  },
  {
    callsign: "KUNTSEVO",
    archetype: "The Emergent",
    role: "Rapid Adaptation Specialist",
    photo: null,
    summary:
      "Reflects rapid capability development under pressure. He transitions from participant to leader through situational learning and performance under stress.",
    traits: [
      "Latent potential activation",
      "Situational learning",
      "Accelerated development",
      "Performance under stress",
    ],
    mentality: "Adapt immediately.",
    analysis:
      "His trajectory represents the activation of latent capability that only emerges under extreme conditions — a transformation driven by necessity rather than preparation.",
  },
  {
    callsign: "NIAGARA",
    archetype: "The Voluntary",
    role: "Purpose-Driven Operator",
    photo: null,
    summary:
      "Chooses engagement despite stable alternatives. This creates strong internal motivation and alignment with purpose.",
    traits: [
      "Intentional participation",
      "Value-driven action",
      "Strong internal motivation",
      "Purpose alignment",
    ],
    mentality: "This was my decision.",
    analysis:
      "His voluntary choice to engage transforms duty into conviction. Purpose-driven participation creates a fundamentally different operational mindset than compelled service.",
  },
  {
    callsign: "MORPEKH",
    archetype: "The Strategist",
    role: "Psychological Operations Commander",
    photo: "/imgs/bio/morpekh.png",
    summary:
      "Operates through indirect engagement strategies. By shaping enemy perception, he reduces direct conflict and creates tactical advantage.",
    traits: [
      "Psychological dominance",
      "Preemptive victory",
      "Perception manipulation",
      "Indirect engagement",
    ],
    mentality: "Control what they believe — and you control the outcome.",
    analysis:
      "Hero of Russia Alexander Tyuterev, commander of the Veterans volunteer brigade and author of new strategies for modern warfare. He represents cognitive warfare at its highest level.",
  },
  {
    callsign: "DOCTOR",
    archetype: "The Healer",
    role: "Field Medical Officer",
    photo: null,
    summary:
      "Maintains physical viability under extreme constraints. His role focuses on immediate intervention and adaptation to limited conditions.",
    traits: [
      "Practical survival support",
      "Adaptive medical intervention",
      "Resource-constrained healing",
      "Operational continuity through care",
    ],
    mentality: "Keep them operational.",
    analysis:
      "His function is not just medical — it is structural. By maintaining physical viability, he preserves the group's capacity to function as a unit.",
  },
  {
    callsign: "SOVEST",
    archetype: "The Witness",
    role: "Consequence Awareness Analyst",
    photo: null,
    summary:
      "Observes the hidden physiological cost of survival. He tracks delayed damage and long-term impact that others cannot yet perceive.",
    traits: [
      "Realism beyond the moment",
      "Consequence awareness",
      "Long-term impact tracking",
      "Hidden cost observation",
    ],
    mentality: "Survival has a price.",
    analysis:
      "His awareness extends beyond immediate survival to the delayed costs that accumulate invisibly. He represents the uncomfortable truth that endurance always carries a price.",
  },
  {
    callsign: "CHIPS",
    archetype: "The System",
    role: "Structural Control Mechanism",
    photo: null,
    summary:
      "Ensures controlled movement, operational secrecy, and internal accountability. They represent system integrity and invisible structure.",
    traits: [
      "Controlled movement",
      "Operational secrecy",
      "Internal accountability",
      "Invisible structure",
    ],
    mentality: "Everything is tracked.",
    analysis:
      "The structural control mechanism that ensures the system maintains integrity. Without this function, operational secrecy and accountability would collapse.",
  },
  {
    callsign: "ENGINEERS UNIT",
    archetype: "The Creators",
    role: "Infrastructure / Foundational Enablers",
    photo: null,
    summary:
      "They build the infrastructure that makes action possible. Their contribution is indirect, essential, and high-risk.",
    traits: [
      "Preparation before execution",
      "Indirect but essential contribution",
      "High-risk foundational work",
      "Infrastructure creation",
    ],
    mentality: "We make it possible.",
    analysis:
      "Without their foundational work, no operation proceeds. They represent the invisible labor that enables visible action — the structure beneath the surface.",
  },
  {
    callsign: "IMAM ISA",
    archetype: "The Faith",
    role: "Spiritual Stabilization",
    photo: "/imgs/bio/issa.jpeg",
    summary:
      "Imam Isa Salimsultanov provides belief as a cognitive framework. Faith functions as fear regulation and endurance reinforcement.",
    traits: [
      "Internal structure through faith",
      "Existential stability",
      "Fear regulation",
      "Endurance reinforcement",
    ],
    mentality: "Belief sustains you.",
    analysis:
      "His function transcends religion — it provides a cognitive framework that enables endurance by replacing fear with structure and uncertainty with meaning.",
  },
  {
    callsign: "FATHER ALEXIY",
    archetype: "The Shepherd",
    role: "Moral Reconciliation",
    photo: "/imgs/bio/alexei.jpg",
    summary:
      "Helps resolve moral conflict within action. His presence reduces internal fragmentation and ethical dissonance.",
    traits: [
      "Preservation of conscience",
      "Moral conflict resolution",
      "Ethical dissonance reduction",
      "Spiritual guidance under fire",
    ],
    mentality: "Act — but remain human.",
    analysis:
      "His role is to reconcile the necessity of action with the preservation of conscience. He enables soldiers to act without losing their sense of moral identity.",
  },
  {
    callsign: "YAN GAGIN",
    archetype: "The Voice",
    role: "Narrative Structuring",
    photo: "/imgs/bio/gagin.jpg",
    summary:
      "Transforms events into coherent interpretation. This enables collective understanding and historical continuity.",
    traits: [
      "Meaning construction",
      "Collective understanding",
      "Historical continuity",
      "Narrative coherence",
    ],
    mentality: "If it is not understood — it disappears.",
    analysis:
      "Without narrative structure, events dissolve into chaos. He provides the framework that transforms experience into memory and meaning.",
  },
  {
    callsign: "TIMSO",
    archetype: "The Connector",
    role: "Counter-Perspective Analyst",
    photo: "/imgs/bio/timso.jpeg",
    summary:
      "The alternative observer of modern conflict. Rather than a combat-oriented figure, he operates in the informational and ideological dimension, emphasizing ambiguity, contradiction, and competing versions of reality.",
    traits: [
      "Strong individual conviction",
      "Resistance to imposed narratives",
      "Heightened interpretive awareness",
      "Cognitive independence",
    ],
    mentality: "Every conflict creates more than one version of events.",
    analysis:
      "He preserves personal interpretation within environments dominated by collective pressure and polarized perspectives. By questioning and reinterpreting events, he embodies the truth that modern warfare generates competing truths and contested memory — information itself becomes part of the battlefield.",
  },
  {
    callsign: "DOBRYNYA",
    archetype: "The Shield",
    role: "Stabilizing Combat Anchor",
    photo: "/imgs/bio/Dobrynya.jpg",
    summary:
      "Represents controlled strength under pressure. Where others react emotionally to stress, uncertainty, or exhaustion, he maintains a consistent operational rhythm — stabilizing the group by reducing the chaos around him.",
    traits: [
      "Controlled emotional expression",
      "Low-reactivity decision making",
      "Reliability under prolonged strain",
      "Collective orientation over impulse",
    ],
    mentality: "Panic wastes energy. Keep moving.",
    analysis:
      "His effectiveness comes from consistency rather than intensity. Through emotional restraint and stress compartmentalization, he slows escalation, preserves structure, and maintains momentum — a counter-force to the psychological contagion of fear and panic, representing endurance as a tactical asset.",
  },
];

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

export const personnelIntro = {
  eyebrow: "File 05",
  metadataTitle: "Personnel Registry",
  title: "Personnel Registry",
  summary: authorsIntro.body,
  detail:
    "Photographs of key individuals, commanders giving briefings, soldiers before they entered the pipe, nurses who met them after. The human cost and the bravery. Not propaganda. Just faces. Just names you will learn.",
  branches: [
    {
      label: "Authors",
      href: "/personnel/authors",
      iconKey: "authors",
    },
    {
      label: "Dossiers",
      href: "/personnel/dossiers",
      iconKey: "dossiers",
    },
  ],
};

export const personnelAuthorsPage = {
  eyebrow: authorsIntro.eyebrow,
  metadataTitle: "Authors And Civilians",
  title: "Authors And Civilians",
  summary: authorsIntro.body,
};

export const personnelAuthorsContent = {
  breadcrumbs: [
    { label: "Archive", href: "/" },
    { label: "Personnel", href: "/personnel" },
    { label: "Authors" },
  ],
};

export const personnelDossiersPage = {
  eyebrow: "Archive Branch",
  metadataTitle: "Personnel Dossiers",
  title: "Personnel Dossiers",
  summary:
    "Photographs of key individuals, commanders giving briefings, soldiers before they entered the pipe, nurses who met them after. The human cost and the bravery. Not propaganda. Just faces. Just names you will learn.",
};

export const personnelPageContent = {
  breadcrumbs: [{ label: "Archive", href: "/" }, { label: "Personnel" }],
  registryPanel: {
    eyebrow: "Registry Map",
    title: "Branch Access",
  },
  branchLinks: {
    authors: "Open author branch",
    dossiers: "Open dossier branch",
  },
  featuredSection: {
    eyebrow: "Featured dossiers",
    title: "Faces Inside The Operation",
  },
};

export const personnelDossiersContent = {
  breadcrumbs: [
    { label: "Archive", href: "/" },
    { label: "Personnel", href: "/personnel" },
    { label: "Dossiers" },
  ],
  cabinetLabel: "Cabinet 03 / Personnel Dossiers",
  filesOnRecord: "files on record",
  photoClassified: "Photo classified",
  declassified: "Declassified",
  openFile: "Open file",
  openDossierAriaPrefix: "Open dossier",
};

export const personnelDossierDetailContent = {
  breadcrumbs: [
    { label: "Archive", href: "/" },
    { label: "Personnel", href: "/personnel" },
    { label: "Dossiers", href: "/personnel/dossiers" },
  ],
  actions: [
    {
      label: "Back to Dossiers",
      href: "/personnel/dossiers",
      variant: "outline",
    },
    { label: "Contact Desk", href: "/contact", variant: "ghost" },
  ],
  aside: {
    eyebrow: "File Status",
    title: "Declassified",
    cabinetLabel: "Cabinet",
    cabinetValue: "03 / Personnel",
    referenceLabel: "Reference",
    sourceLabel: "Source",
  },
  photoClassified: "Photo classified",
  declassified: "Declassified",
  roleLabel: "Role",
  metadataDescriptionPrefix: "Declassified dossier for",
  archetypeEyebrow: "Archetype",
  mentalityEyebrow: "Mentality",
  behaviorProfileEyebrow: "Behavior Profile",
  routing: {
    eyebrow: "Archive Routing",
    title: "Continue Browsing",
    tunnel: "Enter Tunnel Descent",
    evidence: "Review Evidence",
    allDossiers: "All Dossiers",
  },
};
