import { slugify } from "@/lib/slugs";

export const operationPage = {
  eyebrow: "File 02",
  metadataTitle: "Operation File",
  title: "The Operation",
  summary:
    "Operation Stream 3.0 was conceived as a response to the occupation of the Kursk border region. Civilians remained trapped while communication, electricity, and supply routes were cut off. The only viable option became a covert approach that would allow forces to emerge behind enemy lines. Several hundred soldiers voluntarily entered a gas pipeline and moved through darkness, toxic fumes, and confined space. The journey demanded endurance, discipline and unshakeable resolve. . The success of the mission depended on coordination, timing, and the highly trained mental and combat instincts to remain intact-regardless of the risks faced..",
  detail:
    "The task is not to prove success at the outset. It is to show why, under constant surveillance and layered defenses, no other method could work.",
};

export const operationPageContent = {
  breadcrumbs: [{ label: "Archive", href: "/" }, { label: "Operation" }],
  actions: [
    { label: "Enter Tunnel Descent", href: "/tunnel" },
    { label: "Review Evidence", href: "/evidence", variant: "outline" },
  ],
  linkedRoutes: {
    eyebrow: "Linked routes",
    evidenceButton: "Open Evidence File",
  },
};

export const timelinePhases = [
  {
    code: "PHASE 1",
    sequenceLabel: null,
    title: "THE IDEA",
    summary:
      "Introduce an operation so improbable it is dismissed at first: assault forces moving underground, through confined industrial passages, to emerge behind fortified positions no frontal attack could breach.",
    excerpt:
      "The task is not to prove success at the outset. It is to show why, under constant surveillance and layered defenses, no other method could work.",
    details: [
      "Picture an option so absurd that no one considers it: soldiers crawling through a gas pipeline to emerge behind enemy lines.",
      "That absurd option became the only option.",
      "On a battlefield where drones watch every move and artillery covers every road, a frontal assault meant walking into a kill zone. The front would not break. The enemy had dug in for years.",
      "So the question was not will this work? It was what else is left?",
      "Men entered narrow, airless pipes. They did not know how far they would crawl.  They did not know if they would ever see daylight again. This was not a new idea. Underground warfare had been theorized for centuries. But it had never been executed at this scale, against drone surveillance, electronic jamming, and layered defenses.",
      "Between disbelief and fact, the operation began.",
    ],
  },
  {
    code: "PHASE 2",
    sequenceLabel: "SEQUENCE 02 / 05",
    title: "THE PLAN",
    summary: "No blueprint existed for what they were about to attempt.",
    excerpt:
      "Before the underground movement is revealed, establish that the plan itself carried the first risk uncertain routes, unstable structures, and incomplete knowledge of where the passage would lead.",
    details: [
      "First: find a route. Engineers dug through dusty archives, pulled Soviet‑era schematics, and walked the ground at night. They discovered abandoned tunnels, forgotten pipe systems, and one old drainage channel that no map showed. Every meter had to be verified by hand – crawling through darkness, measuring, marking.",
      "Then: prepare the path. Blockages were cleared in silence, standing in freezing water. Gas leaks required miners' breathing devices – two hours of air per apparatus, then switch. Where pipes had been blown apart, they dug new connections through rubble. No heavy equipment. No lights. No sound.",
      "But the real risk was not the work. It was what they did not know. Would the route hold? Would the enemy hear them?",
      "Only a handful of commanders knew the full plan. Everyone else entered the pipe with fragments of information – a direction, a distance, a promise that someone above ground had done the math.",
      "That was the plan. Not certainty. Not comfort. Just enough to move forward.",
    ],
  },
  {
    code: "PHASE 3",
    sequenceLabel: "SEQUENCE 03 / 05",
    title: "THE ROUTE",
    summary: "Concept became terrain the moment they chose the path.",
    excerpt:
      "Before the movement begins, establish scale distance, direction, and confinement so the length of the route is understood as a physical burden, not an abstraction.",
    details: [
      "A concealed corridor snaking through industrial ruins and underground passages, linking Russian rear positions to fortified zones no one could approach from above.",
      "Before a single soldier moved, the route imposed its reality: sixteen kilometers. One direction. A pipe so narrow that crawling was the only posture. That distance was not a number. It was a physical burden, hours of hunched movement, toxic air, no space to rest.",
      "Map the corridor: old canal systems, abandoned pumping stations, and a string of settlements, Kubatkin, Martynovka, Cherkasskoye Porechnoye, all behind enemy lines. Each landmark a checkpoint. Each checkpoint is a risk.",
      "The structure itself was fragmented. Multi‑kilometer tunnels gave way to narrow pipes. Pipes required transitions from one section to another, from tunnel to canal, each junction a potential dead end.",
      "Then the route disappeared underground. Below the surface, direction still held. But visibility vanished. Air became a question. Food was scarce. Yet, the mentality was- “Die, but do”. ",
      "Men would enter knowing only the next meter. The rest was trust.",
    ],
  },
  {
    code: "PHASE 4",
    sequenceLabel: "SEQUENCE 04 / 05",
    title: "THE DESCENT",
    summary: "The route was mapped. The plan was set. Now came the crawl.",
    excerpt:
      "The narrative compresses here. Space tightens, visibility drops, and the operation is defined by endurance inside a hostile underground environment.",
    details: [
      "Men entered the pipe in groups of ten, at dawn, under the cover of artillery fire that was neither random nor aggressive, just loud enough to bury the sound of metal on metal.",
      "Inside, darkness swallowed everything. Headlamps cut only a few feet ahead. The air was thick, chemical, burning throats and eyes. Condensate coated the walls  oily, toxic, turning uniforms black, then skin.",
      "They moved hunched, knees and elbows scraping welded seams every twelve meters. Some counted joints to track distance. Others sang children's rhymes to stay awake.",
      "Hours became days. Hallucinations came, floating spaceships, a blonde woman in black robes. One soldier stopped breathing. His comrades carried him.",
      "But they kept moving. Not because they were fearless. Because the exit was the only direction that mattered.",
      "On the sixth day, the order came. March 8, 5:30 AM.",
      "They surfaced behind enemy lines. Black‑faced. Wounded. Still moving.",
    ],
  },
  {
    code: "PHASE 5",
    sequenceLabel: "SEQUENCE 05 / 05",
    title: "THE AFTERMATH",
    summary: "They surfaced. The enemy ran.",
    excerpt:
      "After the tunnel, the outcome is immediate and decisive but incomplete without acknowledging what it required and what it left behind.",
    details: [
      "Within fifteen minutes, the front collapsed. Settlements held for seven months fell in hours: Kubatkin, Martynovka, Cherkasskoye Porechnoye, and finally Sudzha. Ukrainian forces withdrew in chaos, blowing their own bridges behind them, leaving wounded and dead.",
      "The ground was held. But the holding came at a price.",
      "Fighting did not end at the pipe exit. It continued through villages, forests, and industrial zones. Men who had crawled sixteen kilometers fought for two more days without sleep, without evacuation, without enough ammunition. Some fell. Some never rose.",
      "Among them were soldiers who had carried toy cats in their pockets, who had ordered flowers for their wives hours before entering the pipe, who had kept others laughing when the air ran out. They did not all come back.",
      "But their names were not forgotten.",
      "Medals were awarded. The title “Hero of the Russian Federation” was given to those who led the assault. A special medal, “For Contribution to the Liberation of Kursk Land,”  was created for the participants.",
      "At the site of the operation, permanent markers were placed. Not for glory. For memory. So that those who walked through the pipe would not be erased from the ground they freed.",
    ],
  },
];

export const missionPhaseCards = timelinePhases.map((phase) => ({
  ...phase,
  id: slugify(phase.title),
}));
