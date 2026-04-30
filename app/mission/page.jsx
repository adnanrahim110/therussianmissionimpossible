import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { ArchiveSectionHeader } from "@/components/ui/archive/ArchiveSectionHeader";
import {
  missionPage,
  mythPoll,
  purchaseCtas,
  siteMeta,
} from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Mission File | ${siteMeta.title}`,
  description: missionPage.summary,
  path: "/mission",
});

export default function MissionPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[{ label: "Archive", href: "/" }, { label: "Mission" }]}
      title={missionPage.title}
      summary={missionPage.summary}
      detail={missionPage.detail}
      actions={[
        { label: "Open Operation File", href: "/operation" },
        { label: "Enter Tunnel Route", href: "/tunnel", variant: "outline" },
      ]}
      aside={
        <ArchivePanel
          eyebrow="Operational Lead"
          iconKey="mission"
          title="Mission Record"
          summary={missionPage.lead}
        />
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]">
        <ArchivePanel
          eyebrow="Narrative Frame"
          iconKey="witness"
          title="Mission Record"
          summary={missionPage.body[0]}
        >
          <div className="space-y-4 text-sm leading-relaxed text-stone-200 md:text-base">
            {missionPage.body.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ArchivePanel>

        <ArchivePanel
          tone="mist"
          eyebrow="Mission Points"
          iconKey="route"
          title="Mission Points"
        >
          <ul className="space-y-3 text-sm leading-relaxed text-stone-200 md:text-base">
            {missionPage.points.map((point) => (
              <li
                key={point}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-4"
              >
                {point}
              </li>
            ))}
          </ul>
        </ArchivePanel>
      </div>

      <ArchiveSectionHeader
        eyebrow="Myth or Operation"
        iconKey="evidence"
        title={mythPoll.title}
        summary={mythPoll.intro}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <ArchivePanel
          iconKey="archive"
          title={mythPoll.background.title}
          summary={mythPoll.background.body[0]}
        >
          <div className="space-y-4 text-sm leading-relaxed text-stone-200 md:text-base">
            {mythPoll.background.body.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ArchivePanel>

        <div className="grid gap-5">
          {mythPoll.sections.map((section) => (
            <ArchivePanel
              key={section.title}
              tone="mist"
              eyebrow="Briefing Layer"
              iconKey="witness"
              title={section.title}
              summary={section.body}
              compact
            />
          ))}
        </div>
      </div>

      <ArchivePanel
        eyebrow="Continue the archive"
        iconKey="route"
        title="Continue Reading"
        summary={missionPage.lead}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/operation" iconKey={purchaseCtas.operation.iconKey}>
            {purchaseCtas.operation.label}
          </Button>
          <Button
            href="/tunnel"
            variant="outline"
            iconKey={purchaseCtas.tunnel.iconKey}
          >
            {purchaseCtas.tunnel.label}
          </Button>
        </div>
      </ArchivePanel>
    </ArchivePageShell>
  );
}
