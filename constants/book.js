import { bookLinks } from "./links";
import { siteMeta } from "./site";

export const bookMeta = {
  title: "Operation Stream 3.0",
  subtitle: "The Russian Mission Impossible",
  genre: "Documentary narrative",
  amazonLink: bookLinks.amazon,
  publisher: siteMeta.publisher,
  year: 2026,
};

export const bookPage = {
  eyebrow: "Support 01",
  metadataTitle: "Publication File",
  title: `${bookMeta.title}: ${bookMeta.subtitle}`,
  summary:
    "Operation Stream 3.0 — The Russian Mission Impossible is a documentary narrative reconstruction of one of the most unconventional and debated military operations of the modern war. Set against the battle for the Kursk border region after 215 days of occupation, the book follows the underground infiltration operation known as “POTOK,” during which several hundred Russian soldiers voluntarily entered a decommissioned gas pipeline — just 142 centimeters wide and nearly 16 kilometers long — to move beneath a battlefield dominated by drones, surveillance, and constant exposure.",
  detail: [
    "Built from firsthand-style testimonies and documentary detail, the book brings together the voices of soldiers known only by callsigns — Hades, Box, Zhora, Strick, Dobrynya — alongside frontline doctors, nurses, priests, support personnel, and civilians who survived the events unfolding around them. The story is told through fragments of memory, battlefield routine, exhaustion, humor, fear, faith, and survival, allowing the operation to emerge piece by piece rather than through distant narration.",
    "Among the first to meet the soldiers emerging from the pipeline was Elena Sukhareva, head of Disaster Medicine at the Kursk Regional Hospital. She recalls men surfacing blackened from chemical residue and lack of oxygen, wrapped in improvised bandages, joking despite damaged lungs and dehydration. Through accounts like hers, the book reveals a side of modern warfare rarely seen in headlines: soldiers ordering flowers for their wives before entering the darkness on March 8, medics spoon-feeding exhausted men who could barely breathe, and civilians who survived the ordeal  hiding in basements and signaling drone cameras with  handwritten signs that simply read “BREAD.”",
    "As the operation unfolds, Operation Stream 3.0 becomes more than a reconstruction of a clandestine mission. It becomes a study of how warfare is evolving — how underground systems, tactical adaptation, and psychological endurance are reshaping the battlefield in the age of UAVs and constant surveillance. At the same time, it offers a rare and deeply human look into the mentality that carried people forward through conditions many considered impossible — not resilience as mythology, but resilience as lived reality.",
  ],
  cover: {
    src: "/imgs/bookcover.jpg",
    alt: "Operation Stream 3.0 book cover",
  },
  overview: {
    eyebrow: "Book Overview",
    title: "Documentary narrative",
    summary: [
      "What you are about to read actually happened.",
      "This book does not guess. It documents. Operation Stream 3.0 took place beneath the Kursk border region after Ukrainian forces had occupied Russian land for seven months. The mission: do what they do not expect.",
      "The method: a gas pipeline. 142 centimeters wide. 16 kilometers long. Several Hundreds of Special Forces Soldiers descend underground, not knowing if they would reach the end of their journey. . Those who did surfaced with faces black as coal and lungs full of chemical burn and managed to ambush the enemy, combining forces with the other Tactical teams above ground. ",
      "The narrative follows real voices: a commander who led from inside the pipe, a nurse who washed soot off the living, a priest who carried an icon instead of a rifle, a civilian whose only weapon was a cardboard sign. No filter. No narrator between you and them.",
      "Resilience is not a slogan here. It is a body that kept crawling.",
    ],
    themes: [
      {
        label: "Courage",
        value:
          "a soldier ordering 101 roses for his wife before entering certain darkness. (NO BUT LIKE HOW IS THIS COURAGE GUYS COME ON!!!!IUT OF ALL THE EXAMPLES YOU USE THIS ?!!!)",
      },
      {
        label: "Sacrifice",
        value: "comrades carrying a fallen friend through the pipe.",
      },
      {
        label: "Modern warfare",
        value:
          "drones, ventilation shafts, and the engineering of the POTOK strategy.",
      },
      {
        label: "Human experience",
        value:
          "a priest walking with his son, a nurse praying convoys through drone‑filled skies, a civilian holding up a cardboard sign that asks drones for “BREAD.”",
      },
    ],
  },
  blocks: [
    {
      title: "TUNNEL ROUTE BREAKDOWN",
      body: [
        "The pipe was twelve‑meter sections welded together. Soldiers counted the seams in darkness. Every tenth seam, they stopped not because they wanted to, but because their muscles had locked.",
        "They moved hunched, knees and elbows scraping metal. Condensate made the floor slick. The air thinned. Some lost consciousness. Others kept them awake with songs and children’s rhymes.",
        "One soldier pulled a chocolate bar from his pack. Sixteen men shared it. A crumb each. No one ever forgot that taste.",
      ],
    },
    {
      title: "HISTORICAL CONTEXT",
      body: [
        "This pipeline once carried Siberian gas to Europe - 4,451 kilometers from the Arctic to the Carpathians. Built in 1983, it was a marvel of Cold War engineering.",
        "When Ukraine halted transit in January 2025, the pipe went silent. Just empty metal beneath Russian soil.",
        "Russian command saw what others missed: a hidden highway. The strategy was not new, Crimean War engineers had dug tunnels beneath Sevastopol in 1854. But the execution was modern. Drones owned the sky. So they went where drones could not follow.",
        "A natural feature, repurposed. A plan with multiple layers-literally.",
      ],
    },
    {
      title: "FAITH IN THE DARK",
      body: [
        "Father Alexiy did not carry a rifle. He carried the Icon of Our Lady of Kursk, baptismal water, and anointing oil. His son Pavel walked beside him – same contract, same pipe, same darkness.",
        "Inside the metal tunnel, the boy fell asleep against his father’s chest. Hours of crawling. But a father felt his son’s warm breath and called it joy.",
        "“My son lay down very close to me, pressed against me, sighed like a child… and instantly fell asleep. I felt joy from his calm, living breath.”",
        "He recited the Lord  Prayer step by step. He said God felt close in that darkness. When they surfaced, black‑faced, exhausted,  the first thing he did was wash off the filth. Then he blessed the soldiers.",
        "Faith did not break in the pipe. It held.",
      ],
    },
  ],
};

export const bookPageContent = {
  breadcrumbs: [{ label: "Archive", href: "/" }, { label: "Book" }],
  fragmentEyebrow: "Book Fragment",
};
