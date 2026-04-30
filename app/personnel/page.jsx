import Link from "next/link";

import { ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { ArchiveSectionHeader } from "@/components/ui/archive/ArchiveSectionHeader";
import {
  featuredDossiers,
  personnelAuthorsPage,
  personnelDossiersPage,
  personnelIntro,
  siteMeta,
} from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Personnel Registry | ${siteMeta.title}`,
  description: personnelIntro.summary,
  path: "/personnel",
});

export default function PersonnelPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Personnel" },
      ]}
      iconKey="personnel"
      eyebrow={personnelIntro.eyebrow}
      title={personnelIntro.title}
      summary={personnelIntro.summary}
      detail={personnelIntro.detail}
      aside={
        <ArchivePanel
          eyebrow="Registry Map"
          iconKey="personnelBranch"
          title="Branch Access"
          summary={personnelIntro.detail}
        >
          <div className="space-y-3">
            {personnelIntro.branches.map((branch) => (
              <Link
                key={branch.label}
                href={branch.href}
                className="group/branch flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-sm leading-relaxed text-stone-200 transition-[border-color,background-color] duration-500 hover:border-white/30 hover:bg-white/[0.05]"
              >
                <span className="inline-flex min-w-0 items-center gap-3">
                  <ArchiveInlineIcon
                    iconKey={branch.iconKey}
                    size={16}
                    className="text-stone-400 transition-colors group-hover/branch:text-rose-300"
                  />
                  <span className="font-heading text-base font-bold tracking-wide text-white">
                    {branch.label}
                  </span>
                </span>
                <ArchiveInlineIcon
                  iconKey="next"
                  size={14}
                  className="text-stone-500 transition-[transform,color] group-hover/branch:translate-x-1 group-hover/branch:text-rose-300"
                />
              </Link>
            ))}
          </div>
        </ArchivePanel>
      }
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <ArchivePanel
          tone="mist"
          eyebrow={personnelAuthorsPage.eyebrow}
          iconKey="authors"
          title={personnelAuthorsPage.title}
          summary={personnelAuthorsPage.summary}
        >
          <Link
            href="/personnel/authors"
            className="inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.28em] text-rose-300 transition-colors hover:text-rose-200"
          >
            Open author branch
            <ArchiveInlineIcon iconKey="next" size={12} />
          </Link>
        </ArchivePanel>
        <ArchivePanel
          eyebrow={personnelDossiersPage.eyebrow}
          iconKey="dossiers"
          title={personnelDossiersPage.title}
          summary={personnelDossiersPage.summary}
        >
          <Link
            href="/personnel/dossiers"
            className="inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.28em] text-rose-300 transition-colors hover:text-rose-200"
          >
            Open dossier branch
            <ArchiveInlineIcon iconKey="next" size={12} />
          </Link>
        </ArchivePanel>
      </div>

      <ArchiveSectionHeader
        eyebrow="Featured dossiers"
        iconKey="dossiers"
        title="Faces Inside The Operation"
        summary={personnelDossiersPage.summary}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredDossiers.map((dossier) => (
          <Link
            key={dossier.slug}
            href={dossier.href}
            style={{
              backgroundImage:
                "linear-gradient(180deg, #0d1014 0%, #070809 100%)",
            }}
            className="group/dossier relative flex flex-col overflow-hidden rounded-md border border-white/10 p-5 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/25"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative flex items-center justify-between gap-4">
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
                {dossier.fileCode}
              </p>
              <ArchiveInlineIcon
                iconKey="next"
                size={14}
                className="text-stone-300 transition-transform duration-500 group-hover/dossier:translate-x-1"
              />
            </div>
            <h3 className="relative mt-4 font-heading text-2xl font-bold tracking-wide text-white">
              {dossier.callsign}
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-stone-300">
              {dossier.summary}
            </p>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-[0.3] origin-left bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/dossier:scale-x-100"
            />
          </Link>
        ))}
      </div>
    </ArchivePageShell>
  );
}
