import { TunnelExperience } from "@/components/archive/TunnelExperience";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import {
  siteMeta,
  tunnelControlHints,
  tunnelPage,
  tunnelStops,
} from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Tunnel Descent | ${siteMeta.title}`,
  description: tunnelPage.summary,
  path: "/tunnel",
});

export default function TunnelPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Tunnel" },
      ]}
      iconKey="tunnel"
      eyebrow={tunnelPage.eyebrow}
      title={tunnelPage.title}
      summary={tunnelPage.summary}
      detail={tunnelPage.detail}
      actions={[
        { label: "Open Personnel Registry", href: "/personnel" },
        { label: "Review Evidence", href: "/evidence", variant: "outline" },
      ]}
      aside={
        <ArchivePanel eyebrow="Interactive Route" iconKey="tunnel" title={tunnelPage.detail} summary={tunnelPage.prompt} />
      }
    >
      <TunnelExperience
        stops={tunnelStops}
        prompt={tunnelPage.prompt}
        hints={tunnelControlHints}
      />
    </ArchivePageShell>
  );
}
