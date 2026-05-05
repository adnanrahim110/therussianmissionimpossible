import Link from "next/link";

import { ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { dossiers, personnelDossiersPage, siteMeta } from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: `Personnel Dossiers | ${siteMeta.title}`,
  description: personnelDossiersPage.summary,
  path: "/personnel/dossiers",
});

const photoAspects = {
  "/imgs/bio/hades.jpg": 0.993,
  "/imgs/bio/box.png": 0.67,
  "/imgs/bio/talisman.png": 0.695,
  "/imgs/bio/medved.png": 1.345,
  "/imgs/bio/kuzya.png": 0.563,
  "/imgs/bio/tridsatka.png": 0.75,
  "/imgs/bio/strick.png": 0.75,
  "/imgs/bio/thikiy.jpg": 1.499,
  "/imgs/bio/nalchik.png": 0.75,
  "/imgs/bio/santa.jpeg": 0.747,
  "/imgs/bio/rondoi.jpg": 1.335,
  "/imgs/bio/morpekh.png": 0.881,
  "/imgs/bio/issa.jpeg": 1.501,
  "/imgs/bio/alexei.jpg": 0.75,
  "/imgs/bio/gagin.jpg": 1.341,
  "/imgs/bio/timso.jpeg": 0.746,
};

const DEFAULT_ASPECT = 0.75;

const gridTexture = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

const scanlineTexture = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 4px)",
};

export default function PersonnelDossiersPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Personnel", href: "/personnel" },
        { label: "Dossiers" },
      ]}
      iconKey="dossiers"
      eyebrow={personnelDossiersPage.eyebrow}
      title={personnelDossiersPage.title}
      summary={personnelDossiersPage.summary}
    >
      <div className="flex items-center justify-between gap-4 border-y border-white/10 bg-white/2 px-4 py-3 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
          <span className="text-stone-200">
            Cabinet 03 / Personnel Dossiers
          </span>
        </div>
        <span className="hidden sm:inline">
          {dossiers.length.toString().padStart(2, "0")} files on record
        </span>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-5">
        {dossiers.map((dossier, index) => {
          const isAccent = index % 3 === 0;
          const aspect = dossier.photo
            ? (photoAspects[dossier.photo] ?? DEFAULT_ASPECT)
            : DEFAULT_ASPECT;
          return (
            <Link
              key={dossier.slug}
              href={dossier.href}
              aria-label={`Open dossier ${dossier.callsign}`}
              style={{ "--aspect": aspect }}
              className={cn(
                "group/file relative w-full overflow-hidden border bg-black/70 transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5",
                "md:h-96 md:w-auto md:basis-0 md:grow-(--aspect) md:min-w-[calc(50%-0.625rem)]",
                "xl:h-112 xl:min-w-[calc(33.333%-0.834rem)]",
                isAccent
                  ? "border-rose-500/30 hover:border-rose-400/60 hover:shadow-[0_28px_60px_-32px_rgba(242,13,13,0.5)]"
                  : "border-white/10 hover:border-white/30 hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.85)]",
              )}
            >
              {dossier.photo ? (
                <img
                  src={dossier.photo}
                  alt={dossier.callsign}
                  loading="lazy"
                  draggable={false}
                  className="block h-auto w-full select-none object-cover saturate-[0.85] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:saturate-100 md:h-full md:w-full"
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center bg-[#0a0a0c] font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500 md:h-full">
                  Photo classified
                </div>
              )}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-1 opacity-[0.05] mix-blend-overlay"
                style={gridTexture}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-1 opacity-60 mix-blend-overlay"
                style={scanlineTexture}
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 z-2 flex items-start justify-between gap-3 bg-linear-to-b from-black/95 via-black/55 to-transparent px-4 pb-12 pt-3.5 font-ui text-[10px] uppercase tracking-[0.32em]">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-block h-1.5 w-1.5 rounded-full",
                      isAccent
                        ? "bg-rose-400 shadow-[0_0_10px_rgba(242,13,13,0.7)]"
                        : "bg-white/65",
                    )}
                  />
                  <span
                    className={cn(
                      isAccent ? "text-rose-200" : "text-stone-100",
                    )}
                  >
                    {dossier.fileCode}
                  </span>
                </span>
                <span
                  className={cn(
                    "rounded-[3px] border px-2 py-1 font-ui text-[9px] tracking-[0.4em]",
                    isAccent
                      ? "border-rose-400/45 text-rose-200"
                      : "border-white/25 text-stone-100/85",
                  )}
                >
                  Declassified
                </span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 bg-linear-to-t from-black via-black/85 to-transparent px-4 pb-4 pt-16 text-stone-100">
                <p
                  className={cn(
                    "font-ui text-[10px] uppercase tracking-[0.32em]",
                    isAccent ? "text-rose-300/85" : "text-stone-400",
                  )}
                >
                  {dossier.archetype}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-bold tracking-wide text-white md:text-[1.55rem]">
                  {dossier.callsign}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-300">
                  {dossier.summary}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
                  <span>Open file</span>
                  <ArchiveInlineIcon
                    iconKey="next"
                    size={14}
                    className={cn(
                      "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:translate-x-1",
                      isAccent ? "text-rose-200" : "text-stone-300",
                    )}
                  />
                </div>
              </div>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-2 top-2 z-3 h-3 w-3 border-l border-t border-white/40"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-2 z-3 h-3 w-3 border-r border-t border-white/40"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 left-2 z-3 h-3 w-3 border-b border-l border-white/40"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 right-2 z-3 h-3 w-3 border-b border-r border-white/40"
              />

              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 z-3 h-px origin-left scale-x-[0.25] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:scale-x-100",
                  isAccent
                    ? "bg-linear-to-r from-transparent via-rose-400/85 to-transparent"
                    : "bg-linear-to-r from-transparent via-white/45 to-transparent",
                )}
              />
            </Link>
          );
        })}
      </div>
    </ArchivePageShell>
  );
}
