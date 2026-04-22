import { ArchiveIconBadge, ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { dossiers, personnelDossiersPage, siteMeta } from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

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
        {dossiers.map((dossier, index) => (
          <Link
            key={dossier.slug}
            href={dossier.href}
            className={index % 3 === 0 ? "group overflow-hidden rounded-[28px] border border-[color:rgba(242,13,13,0.2)] bg-[linear-gradient(180deg,rgba(28,42,53,0.97),rgba(16,26,33,0.99))] transition-transform duration-300 hover:-translate-y-1" : "group overflow-hidden rounded-[28px] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-panel-alt),var(--surface-panel-alt-strong))] transition-transform duration-300 hover:-translate-y-1"}
          >
            <div className="relative aspect-[4/3]">
              {dossier.photo ? (
                <Image
                  src={dossier.photo}
                  alt={dossier.callsign}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[color:var(--surface-panel)] text-[color:var(--text-muted)]">
                  Photo classified
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            <div className="px-5 py-5 text-[color:var(--text-primary)]">
              <div className="flex items-start justify-between gap-4">
                <ArchiveIconBadge
                  iconKey="dossiers"
                  tone={index % 3 === 0 ? "accent" : "muted"}
                  className="h-10 w-10 rounded-[14px]"
                  size={16}
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
              <h2 className="archive-title-card mt-3 font-heading text-[color:var(--text-strong)]">
                {dossier.callsign}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-soft)]">
                {dossier.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </ArchivePageShell>
  );
}
