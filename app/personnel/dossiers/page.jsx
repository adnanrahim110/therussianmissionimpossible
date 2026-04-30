import Image from "next/image";
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
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {dossiers.map((dossier, index) => {
          const isAccent = index % 3 === 0;
          return (
            <Link
              key={dossier.slug}
              href={dossier.href}
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #0d1014 0%, #070809 100%)",
              }}
              className={cn(
                "group/dossier relative flex flex-col overflow-hidden rounded-md border transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5",
                isAccent
                  ? "border-rose-500/30 hover:border-rose-400/55"
                  : "border-white/10 hover:border-white/25",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative aspect-[4/3] overflow-hidden">
                {dossier.photo ? (
                  <Image
                    src={dossier.photo}
                    alt={dossier.callsign}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/dossier:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-black font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                    Photo classified
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
              </div>

              <div className="relative z-[2] flex flex-col p-5 text-stone-100">
                <div className="flex items-center justify-between gap-4">
                  <p
                    className={cn(
                      "font-ui text-[10px] uppercase tracking-[0.32em]",
                      isAccent ? "text-rose-300/85" : "text-stone-400",
                    )}
                  >
                    {dossier.fileCode}
                  </p>
                  <ArchiveInlineIcon
                    iconKey="next"
                    size={14}
                    className={cn(
                      "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/dossier:translate-x-1",
                      isAccent ? "text-rose-200" : "text-stone-300",
                    )}
                  />
                </div>
                <h2 className="mt-4 font-heading text-2xl font-bold tracking-wide text-white md:text-[1.7rem]">
                  {dossier.callsign}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-300">
                  {dossier.summary}
                </p>
              </div>

              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-[0.3] origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/dossier:scale-x-100",
                  isAccent
                    ? "bg-linear-to-r from-transparent via-rose-400/80 to-transparent"
                    : "bg-linear-to-r from-transparent via-white/30 to-transparent",
                )}
              />
            </Link>
          );
        })}
      </div>
    </ArchivePageShell>
  );
}
