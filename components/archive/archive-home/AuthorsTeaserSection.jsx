"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { authors, authorsIntro } from "@/lib/content";
import Link from "next/link";

export function AuthorsTeaserSection() {
  return (
    <section
      id="the-authors"
      className="section-tone-paper relative"
    >
      <div aria-hidden="true" className="absolute inset-0 grid-overlay-light opacity-24" />
      <div aria-hidden="true" className="absolute inset-0 paper-rules opacity-16" />

      <Container className="section-padding relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow={authorsIntro.eyebrow}
            title={authorsIntro.title}
            body={authorsIntro.body}
            theme="editorial"
            tone="dark"
          />
          <Button href="/authors" variant="light">
            The Authors
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author, index) => (
            <Link
              key={author.name}
              href="/authors"
              className="dossier-paper block rounded-3xl p-5 transition-transform hover:-translate-y-1 md:p-6"
            >
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-700">
                    Three Authors
                  </span>
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                    A-{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-body text-2xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-3xl md:text-4xl">
                  {author.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-700">
                  {author.bio}
                </p>
                <div className="mt-5 rounded-xl border border-stone-300 bg-white/70 p-3">
                  <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                    Quote
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-800">
                    {author.quote}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
