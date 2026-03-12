"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { authors } from "@/lib/content";
import Link from "next/link";

import { DossierHeader } from "./DossierHeader";

export function AuthorsTeaserSection() {
  return (
    <section
      id="the-authors"
      className="section-padding relative border-b border-stone-800"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-30"
      />
      <Container className="relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <DossierHeader
            code="File 08"
            title="The Authors"
            subtitle="The homepage keeps the author presence concise. Full dossier views stay on the dedicated route."
          />
          <Button
            href="/authors"
            variant="outline"
            className="border-stone-700 text-stone-100 hover:bg-stone-800 hover:text-stone-50"
          >
            Open Author Dossiers
          </Button>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {authors.map((author, index) => (
            <Link
              key={author.name}
              href="/authors"
              className="archive-shell block p-6 transition-transform hover:-translate-y-1 md:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                    {author.role}
                  </span>
                  <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                    A-{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-4xl leading-none text-stone-50">
                  {author.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {author.bio}
                </p>
                <div className="mt-6 rounded-[2px] border border-stone-800 bg-stone-950/60 p-4">
                  <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                    Contribution
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-200">
                    {author.contribution}
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
