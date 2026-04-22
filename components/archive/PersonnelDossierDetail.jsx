import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { siteMeta } from "@/lib/archive-data";
import Image from "next/image";

export function PersonnelDossierDetail({ dossier }) {
  const traits = dossier.traits ?? [];

  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Personnel", href: "/personnel" },
        { label: "Dossiers", href: "/personnel/dossiers" },
        { label: dossier.callsign },
      ]}
      iconKey="dossiers"
      eyebrow={dossier.fileCode}
      title={`"${dossier.callsign}"`}
      summary={dossier.summary}
      detail={`${dossier.archetype} / ${dossier.role}`}
      actions={[
        { label: "Back to Dossiers", href: "/personnel/dossiers", variant: "outline" },
        { label: "Contact Desk", href: "/contact", variant: "ghost" },
      ]}
      aside={
        <ArchivePanel eyebrow="Status" iconKey="dossiers" title="Declassified" summary={dossier.role}>
          <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
            {siteMeta.shortTitle}
          </p>
        </ArchivePanel>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <ArchivePanel tone="mist" iconKey="dossiers" className="overflow-hidden">
          <div className="space-y-4">
            {dossier.photo ? (
              <div className="archive-image-frame overflow-hidden rounded-[24px]">
                <Image
                  src={dossier.photo}
                  alt={dossier.callsign}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="archive-image-frame flex h-[28rem] items-center justify-center rounded-[24px] bg-[color:var(--surface-panel)]">
                <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                  Photo classified
                </p>
              </div>
            )}
            <p className="font-ui text-[11px] uppercase tracking-[0.26em] text-[color:var(--text-muted)]">
              Role: {dossier.role}
            </p>
          </div>
        </ArchivePanel>

        <div className="grid gap-6">
          <ArchivePanel eyebrow="Archetype" iconKey="personnel" title={dossier.archetype} summary={dossier.analysis} />
          <ArchivePanel eyebrow="Mentality" iconKey="witness" title={dossier.mentality} />
          <ArchivePanel eyebrow="Traits" iconKey="authors" title="Behavior Profile">
            <div className="flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-[color:var(--text-soft)]"
                >
                  {trait}
                </span>
              ))}
            </div>
          </ArchivePanel>
          <ArchivePanel eyebrow="Archive Routing" iconKey="route" title="Continue Browsing" summary={dossier.analysis}>
            <div className="flex flex-wrap gap-3">
              <Button href="/tunnel" iconKey="tunnel">Enter Tunnel Descent</Button>
              <Button href="/evidence" variant="outline" iconKey="evidence">
                Review Evidence
              </Button>
            </div>
          </ArchivePanel>
        </div>
      </div>
    </ArchivePageShell>
  );
}
