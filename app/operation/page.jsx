import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import {
  missionPhaseCards,
  operationPage,
  purchaseCtas,
  siteMeta,
  tunnelPage,
} from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Operation File | ${siteMeta.title}`,
  description: operationPage.summary,
  path: "/operation",
});

export default function OperationPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Operation" },
      ]}
      iconKey="operation"
      eyebrow={operationPage.eyebrow}
      title={operationPage.title}
      summary={operationPage.summary}
      detail={operationPage.detail}
      actions={[
        { label: "Enter Tunnel Descent", href: "/tunnel" },
        { label: "Review Evidence", href: "/evidence", variant: "outline" },
      ]}
      aside={
        <ArchivePanel
          eyebrow={missionPhaseCards[0].code}
          iconKey="operation"
          title={missionPhaseCards[0].title}
          summary={missionPhaseCards[0].excerpt}
        />
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {missionPhaseCards.map((phase, index) => (
          <ArchivePanel
            key={phase.id}
            tone={index % 2 === 0 ? "steel" : "mist"}
            eyebrow={phase.code}
            iconKey="operation"
            title={phase.title}
            summary={phase.summary}
          >
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-[color:var(--text-soft)] md:text-base">
                {phase.excerpt}
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-[color:var(--text-soft)] md:text-base">
                {phase.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </ArchivePanel>
        ))}
      </div>

      <ArchivePanel
        eyebrow="Linked routes"
        iconKey="route"
        title={tunnelPage.title}
        summary={tunnelPage.summary}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/tunnel" iconKey={purchaseCtas.tunnel.iconKey}>
            {purchaseCtas.tunnel.label}
          </Button>
          <Button href="/evidence" variant="outline" iconKey="evidence">
            Open Evidence File
          </Button>
        </div>
      </ArchivePanel>
    </ArchivePageShell>
  );
}
