import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { authors, personnelAuthorsPage, siteMeta } from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Authors And Witnesses | ${siteMeta.title}`,
  description: personnelAuthorsPage.summary,
  path: "/personnel/authors",
});

export default function PersonnelAuthorsPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Personnel", href: "/personnel" },
        { label: "Authors" },
      ]}
      iconKey="authors"
      eyebrow={personnelAuthorsPage.eyebrow}
      title={personnelAuthorsPage.title}
      summary={personnelAuthorsPage.summary}
    >
      <div className="grid gap-5">
        {authors.map((author, index) => (
          <ArchivePanel
            key={author.id}
            tone={index % 2 === 0 ? "mist" : "steel"}
            eyebrow={author.fileCode}
            iconKey="authors"
            title={author.name}
            summary={author.bio}
          >
            <p className="border-l-2 border-[color:var(--color-accent)] pl-4 text-sm leading-relaxed text-[color:var(--text-soft)] md:text-base">
              {author.quote}
            </p>
          </ArchivePanel>
        ))}
      </div>
    </ArchivePageShell>
  );
}
