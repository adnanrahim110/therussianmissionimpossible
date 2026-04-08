import { BioJustifiedGallery } from "@/components/bio/BioJustifiedGallery";
import { Container } from "@/components/ui/Container";
import { siteMeta } from "@/lib/content";

const bioPhotos = [
  {
    src: "/imgs/bio/alexei.jpg",
    name: "Father Alexei",
  },
  {
    src: "/imgs/bio/santa.jpeg",
    name: "Santa",
  },
  {
    src: "/imgs/bio/gagin.jpg",
    name: "Gagin",
  },
  {
    src: "/imgs/bio/issa.jpeg",
    name: "Issa",
  },
  {
    src: "/imgs/bio/morpekh.png",
    name: "Morpekh",
    tagline:
      "Hero of Russia Alexander Tyuterev, commander of the Veterans volunteer brigade and author of new strategies for modern warfare.",
  },
  {
    src: "/imgs/bio/box.png",
    name: "Box",
  },
  {
    src: "/imgs/bio/talisman.png",
    name: "Talisman",
  },
  {
    src: "/imgs/bio/tridsatka.png",
    name: "Tridsatka",
  },
  {
    src: "/imgs/bio/hades.jpg",
    name: "Hades",
  },
  {
    src: "/imgs/bio/nalchik.png",
    name: "Nalchik",
  },
  {
    src: "/imgs/bio/thikiy.jpg",
    name: "Tikhiy",
  },
  {
    src: "/imgs/bio/kuzya.png",
    name: "Kuzya",
  },
  {
    src: "/imgs/bio/apti.webp",
    name: "Apti",
  },
  {
    src: "/imgs/bio/strick.png",
    name: "Strick",
  },
  {
    src: "/imgs/bio/rondoi.jpg",
    name: "Rodnoi",
  },
];

export const metadata = {
  title: `Field Bio Gallery | ${siteMeta.title}`,
  description:
    "Browse the Operation Stream 3.0 field bio gallery featuring key personnel portraits, frontline visuals, and documentary identity references.",
  alternates: {
    canonical: "/bio",
  },
  openGraph: {
    title: `Field Bio Gallery | ${siteMeta.title}`,
    description:
      "Browse the Operation Stream 3.0 field bio gallery featuring key personnel portraits, frontline visuals, and documentary identity references.",
    type: "website",
    images: [
      {
        url: "/imgs/logo-f.png",
        alt: "Bio Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Field Bio Gallery | ${siteMeta.title}`,
    description:
      "Browse the Operation Stream 3.0 field bio gallery featuring key personnel portraits, frontline visuals, and documentary identity references.",
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
              Bios
            </span>
          </div>
          <h1 className="mt-2 font-heading text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[0.9] text-stone-50">
            Photo Gallery
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-stone-200 md:text-lg">
            A visual index of contributors and field identities documented
            across the mission timeline.
          </p>
        </div>

        <BioJustifiedGallery photos={bioPhotos} />
      </Container>
    </section>
  );
}
