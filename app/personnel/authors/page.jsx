import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchiveSectionHeader } from "@/components/ui/archive/ArchiveSectionHeader";
import { CiviliansGallery } from "@/components/ui/archive/CiviliansGallery";
import {
  TerminalBlock,
  TerminalDivider,
  TerminalRow,
} from "@/components/ui/terminal/Terminal";
import {
  authors,
  civilians,
  personnelAuthorsContent,
  personnelAuthorsPage,
} from "@/constants/personnel";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${personnelAuthorsPage.metadataTitle} | ${siteMeta.title}`,
  description: personnelAuthorsPage.summary,
  path: "/personnel/authors",
});

export default function PersonnelAuthorsPage() {
  return (
    <ArchivePageShell
      breadcrumbs={personnelAuthorsContent.breadcrumbs}
      iconKey="authors"
      eyebrow={personnelAuthorsPage.eyebrow}
      title={personnelAuthorsPage.title}
      summary={personnelAuthorsPage.summary}
    >
      <ArchiveSectionHeader
        eyebrow={"Authors"}
        iconKey="authors"
        title={"Authors"}
        summary="Their work is not commentary. It is a dossier. Interviews, diaries, and field notes are arranged so the reader crawls the pipe themselves. No narrator. Just the truth of those who were there."
      />
      <div className="grid gap-5">
        {authors.map((author) => (
          <TerminalBlock key={author.id}>
            <div className="grid gap-6 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:items-start">
              {author.photo ? (
                <div className="relative w-full max-w-65 overflow-hidden rounded-md border border-white/10 bg-black">
                  <img
                    src={author.photo}
                    alt={author.name}
                    draggable={false}
                    className="block h-auto w-full select-none object-cover grayscale-15"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.6)_0_1px,transparent_1px_4px)] opacity-[0.06]"
                  />
                </div>
              ) : null}

              <div className="grid gap-3">
                <TerminalRow variant="header">[{author.fileCode}]</TerminalRow>
                <TerminalRow variant="title">{author.name}</TerminalRow>
                <TerminalDivider />
                {author.bio
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((para, idx) => (
                    <TerminalRow key={idx} variant="note" caret="//">
                      {para}
                    </TerminalRow>
                  ))}
                <TerminalDivider />
                <TerminalRow variant="status" caret='"'>
                  {author.quote}
                </TerminalRow>
              </div>
            </div>
          </TerminalBlock>
        ))}
      </div>

      <ArchiveSectionHeader
        eyebrow={"Civilians"}
        iconKey="witness"
        title={"Civilians"}
        summary="They were not soldiers. They became the reason soldiers crawled through the pipe."
      />
      <CiviliansGallery items={civilians} />
    </ArchivePageShell>
  );
}
