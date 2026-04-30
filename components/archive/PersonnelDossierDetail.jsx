import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { siteMeta } from "@/lib/archive-data";

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
        {
          label: "Back to Dossiers",
          href: "/personnel/dossiers",
          variant: "outline",
        },
        { label: "Contact Desk", href: "/contact", variant: "ghost" },
      ]}
      aside={
        <ArchivePanel
          eyebrow="Status"
          iconKey="dossiers"
          title="Declassified"
          summary={dossier.role}
        >
          <p className="font-ui text-[11px] font-medium uppercase tracking-[0.28em] text-rose-300">
            {siteMeta.shortTitle}
          </p>
        </ArchivePanel>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <ArchivePanel tone="mist" iconKey="dossiers">
          <div className="space-y-4">
            {dossier.photo ? (
              <div className="overflow-hidden rounded-md border border-white/10 bg-black">
                <Image
                  src={dossier.photo}
                  alt={dossier.callsign}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-[28rem] items-center justify-center rounded-md border border-white/10 bg-black">
                <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-stone-400">
                  Photo classified
                </p>
              </div>
            )}
            <p className="font-ui text-[11px] uppercase tracking-[0.26em] text-stone-400">
              Role: {dossier.role}
            </p>
          </div>
        </ArchivePanel>

        <div className="grid gap-6">
          <ArchivePanel
            eyebrow="Archetype"
            iconKey="personnel"
            title={dossier.archetype}
            summary={dossier.analysis}
          />
          <ArchivePanel
            eyebrow="Mentality"
            iconKey="witness"
            title={dossier.mentality}
          />
          <ArchivePanel
            eyebrow="Traits"
            iconKey="authors"
            title="Behavior Profile"
          >
            <div className="flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100"
                >
                  {trait}
                </span>
              ))}
            </div>
          </ArchivePanel>
          <ArchivePanel
            eyebrow="Archive Routing"
            iconKey="route"
            title="Continue Browsing"
            summary={dossier.analysis}
          >
            <div className="flex flex-wrap gap-3">
              <Button href="/tunnel" iconKey="tunnel">
                Enter Tunnel Descent
              </Button>
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
