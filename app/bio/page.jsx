import { DossierGrid } from "@/components/bio/DossierGrid";
import { Container } from "@/components/ui/Container";
import { characterDossiers, siteMeta } from "@/lib/content";

export const metadata = {
  title: `Personnel Dossiers | ${siteMeta.title}`,
  description:
    "Declassified personnel dossiers from Operation Stream 3.0 — callsigns, archetypes, behavioral profiles, and operational mentality of key participants.",
  alternates: {
    canonical: "/bio",
  },
  openGraph: {
    title: `Personnel Dossiers | ${siteMeta.title}`,
    description:
      "Declassified personnel dossiers from Operation Stream 3.0 — callsigns, archetypes, behavioral profiles, and operational mentality of key participants.",
    type: "website",
    images: [
      {
        url: "/imgs/logo-f.png",
        alt: "Personnel Dossiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Personnel Dossiers | ${siteMeta.title}`,
    description:
      "Declassified personnel dossiers from Operation Stream 3.0 — callsigns, archetypes, behavioral profiles, and operational mentality of key participants.",
    images: ["/imgs/logo-f.png"],
  },
};

export default function BioGalleryPage() {
  return (
    <section className="section-tone-obsidian relative overflow-hidden border-b border-stone-800 pt-28 pb-14 md:pt-36 md:pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-45"
      />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 ml-1">
            <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
              Classified Personnel Files
            </span>
          </div>
          <h1 className="mt-2 font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[0.9] text-stone-50">
            Character Dossiers
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-stone-300 md:text-lg">
            Declassified briefing profiles of key personnel documented across
            the operation. Each file contains archetype designation, behavioral
            analysis, and operational mentality assessment.
          </p>

          {/* System analysis banner */}
          <div className="mt-6 flex items-start gap-3 rounded border border-stone-800/60 bg-stone-900/30 px-4 py-3">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            <p className="font-ui text-[11px] leading-relaxed text-stone-400">
              This is not a collection of individuals. It is a multi-layered
              operational organism: Instinct, Structure, Belief, Adaptation,
              Control, Meaning. Each role compensates for another. Each function
              stabilizes the system.
            </p>
          </div>
        </div>

        <DossierGrid dossiers={characterDossiers} />
      </Container>
    </section>
  );
}
