import { ArchiveIconBadge, ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
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
import Link from "next/link";

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
        <ArchivePanel eyebrow="Registry Map" iconKey="personnelBranch" title="Branch Access" summary={personnelIntro.detail}>
          <div className="space-y-3">
            {personnelIntro.branches.map((branch) => (
              <Link
                key={branch.label}
                href={branch.href}
                className="block rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-relaxed text-[color:var(--text-soft)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center gap-3">
                  <ArchiveIconBadge
                    iconKey={branch.iconKey}
                    className="h-10 w-10 rounded-[14px]"
                    size={16}
                    tone="muted"
                  />
                  <span className="archive-title-nav font-heading text-[color:var(--text-strong)]">
                    {branch.label}
                  </span>
                </span>
                <span className="mt-2 block">{branch.summary}</span>
              </Link>
            ))}
          </div>
        </ArchivePanel>
      }
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <ArchivePanel tone="mist" eyebrow={personnelAuthorsPage.eyebrow} iconKey="authors" title={personnelAuthorsPage.title} summary={personnelAuthorsPage.summary}>
          <Link href="/personnel/authors" className="font-ui text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
            Open author branch
          </Link>
        </ArchivePanel>
        <ArchivePanel eyebrow={personnelDossiersPage.eyebrow} iconKey="dossiers" title={personnelDossiersPage.title} summary={personnelDossiersPage.summary}>
          <Link href="/personnel/dossiers" className="font-ui text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
            Open dossier branch
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
            className="group rounded-[28px] border border-[color:var(--border-soft)] bg-white/6 p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <ArchiveIconBadge
                iconKey="dossiers"
                className="h-10 w-10 rounded-[14px]"
                size={16}
                tone="muted"
              />
              <ArchiveInlineIcon
                iconKey="next"
                size={16}
                className="mt-1 text-[color:var(--text-muted)] transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </div>
            <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
              {dossier.fileCode}
            </p>
            <h3 className="archive-title-card mt-3 font-heading text-[color:var(--text-strong)]">
              {dossier.callsign}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-soft)]">
              {dossier.summary}
            </p>
          </Link>
        ))}
      </div>
    </ArchivePageShell>
  );
}
