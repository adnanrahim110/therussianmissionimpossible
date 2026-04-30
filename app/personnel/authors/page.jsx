import Image from "next/image";

import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import {
  TerminalBlock,
  TerminalDivider,
  TerminalRow,
} from "@/components/ui/terminal/Terminal";
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
        {authors.map((author) => (
          <TerminalBlock key={author.id}>
            <div className="grid gap-6 md:grid-cols-[160px_minmax(0,1fr)] md:items-start">
              {author.photo ? (
                <div className="relative aspect-square w-40 overflow-hidden rounded-md border border-white/10 bg-black md:w-full">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    fill
                    sizes="(min-width: 768px) 160px, 160px"
                    className="object-cover grayscale-15"
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
    </ArchivePageShell>
  );
}
