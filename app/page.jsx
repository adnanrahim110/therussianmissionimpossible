import { ArchiveHub } from "@/components/archive/ArchiveHub";
import { archiveHub, siteMeta } from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${siteMeta.shortTitle} Archive | ${siteMeta.title}`,
  description: archiveHub.summary,
  path: "/",
});

export default function Home() {
  return <ArchiveHub />;
}

