import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { ArchiveSectionHeader } from "@/components/ui/archive/ArchiveSectionHeader";
import {
  missionPage,
  missionPageContent,
  mythPoll,
} from "@/constants/mission";
import { purchaseCtas } from "@/constants/navigation";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${missionPage.metadataTitle} | ${siteMeta.title}`,
  description: missionPage.summary,
  path: "/mission",
});

export default function MissionPage() {
  return (
    <ArchivePageShell
      breadcrumbs={missionPageContent.breadcrumbs}
      title={missionPage.title}
      summary={missionPage.summary}
      detail={missionPage.detail}
      actions={missionPageContent.actions}
      aside={
        <ArchivePanel
          eyebrow={missionPageContent.aside.eyebrow}
          iconKey="mission"
          title={missionPageContent.aside.title}
          summary={missionPage.lead[0]}
        >
          <div className="space-y-4 text-sm leading-relaxed text-stone-200 md:text-base">
            {missionPage.lead.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ArchivePanel>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]">
        <ArchivePanel
          eyebrow={missionPageContent.narrativePanel.eyebrow}
          iconKey="witness"
          title={missionPageContent.narrativePanel.title}
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
          eyebrow={missionPageContent.pointsPanel.eyebrow}
          iconKey="route"
          title={missionPageContent.pointsPanel.title}
        >
          <ul className="space-y-3 text-sm leading-relaxed text-stone-200 md:text-base">
            {missionPage.points.map((point, index) => (
              <li
                key={point.label}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-4 flex flex-col gap-2"
              >
                <h3 className="font-ui text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                  {String(index + 1).padStart(2, "0")} · {point.label}
                </h3>
                <p className="text-sm">{point.description}</p>
              </li>
            ))}
          </ul>
        </ArchivePanel>
      </div>

      <ArchiveSectionHeader
        eyebrow={missionPageContent.mythSection.eyebrow}
        iconKey="evidence"
        title={mythPoll.title}
        summary={mythPoll.intro}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
        <ArchivePanel
          iconKey="archive"
          eyebrow={missionPageContent.backgroundPanel.eyebrow}
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
              eyebrow={missionPageContent.mythPanel.eyebrow}
              iconKey="witness"
              title={section.title}
              summary={section.body}
              compact
            />
          ))}
        </div>
      </div>

      <ArchivePanel
        eyebrow={missionPageContent.continuePanel.eyebrow}
        iconKey="route"
        title={missionPageContent.continuePanel.title}
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
