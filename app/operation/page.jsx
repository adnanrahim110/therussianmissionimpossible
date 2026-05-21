import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import {
  missionPhaseCards,
  operationPage,
  operationPageContent,
} from "@/constants/operation";
import { purchaseCtas } from "@/constants/navigation";
import { siteMeta } from "@/constants/site";
import { tunnelPage } from "@/constants/tunnel";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${operationPage.metadataTitle} | ${siteMeta.title}`,
  description: operationPage.summary,
  path: "/operation",
});

export default function OperationPage() {
  return (
    <ArchivePageShell
      breadcrumbs={operationPageContent.breadcrumbs}
      iconKey="operation"
      eyebrow={operationPage.eyebrow}
      title={operationPage.title}
      summary={operationPage.summary}
      detail={operationPage.detail}
      actions={operationPageContent.actions}
      aside={
        <ArchivePanel
          eyebrow={missionPhaseCards[0].code}
          iconKey="operation"
          title={missionPhaseCards[0].title}
          summary={missionPhaseCards[0].details[0]}
        >
          <div className="space-y-4 text-sm leading-relaxed text-stone-200 md:text-base">
            {missionPhaseCards[0].details.slice(1).map((paragraph, idx) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ArchivePanel>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {missionPhaseCards.slice(1).map((phase, index) => (
          <ArchivePanel
            key={phase.id}
            tone={index % 2 === 0 ? "steel" : "mist"}
            eyebrow={phase.code}
            iconKey="operation"
            title={phase.title}
            summary={phase.summary}
          >
            <div className="space-y-4">
              <ul className="space-y-3 text-sm leading-relaxed text-stone-200 md:text-base">
                {phase.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </ArchivePanel>
        ))}
      </div>

      <ArchivePanel
        eyebrow={operationPageContent.linkedRoutes.eyebrow}
        iconKey="route"
        title={tunnelPage.title}
        summary={tunnelPage.summary}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/tunnel" iconKey={purchaseCtas.tunnel.iconKey}>
            {purchaseCtas.tunnel.label}
          </Button>
          <Button href="/evidence" variant="outline" iconKey="evidence">
            {operationPageContent.linkedRoutes.evidenceButton}
          </Button>
        </div>
      </ArchivePanel>
    </ArchivePageShell>
  );
}
