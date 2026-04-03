"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { authors, authorsIntro } from "@/lib/content";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AuthorsTeaserSection() {
  return (
    <section id="the-authors" className="section-tone-paper relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-light opacity-24"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-rules opacity-16"
      />

      <Container className="section-padding relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow={authorsIntro.eyebrow}
            title={authorsIntro.title}
            body={authorsIntro.body}
            theme="editorial"
            tone="dark"
            className="max-w-4xl"
          />
          <Button href="/authors" variant="light">
            The Authors
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {authors.map((author, index) => (
            <Link
              key={author.name}
              href="/authors"
              className={cn(
                "group relative block overflow-hidden rounded-3xl border border-stone-700/85 bg-linear-to-b from-stone-900/92 via-stone-900/88 to-stone-950/94 p-6 text-stone-100 shadow-[0_22px_55px_rgba(0,0,0,0.36)] ring-1 ring-inset ring-white/6 transition-transform duration-300 hover:-translate-y-1 md:p-8",
                index === 0 && "xl:col-span-3",
                index === 1 && "xl:col-span-3",
                index === 2 && "md:col-span-2 xl:col-span-6",
              )}
            >
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                    Three Authors
                  </span>
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                    A-{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-body text-2xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-3xl md:text-4xl">
                  {author.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-200 md:text-base">
                  {author.bio}
                </p>
                <div className="mt-6 rounded-2xl border border-stone-700 bg-black/24 p-4">
                  <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                    Quote
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-200 md:text-base">
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
