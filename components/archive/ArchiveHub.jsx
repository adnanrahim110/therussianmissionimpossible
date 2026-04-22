"use client";

import { ArchiveIntroGate } from "@/components/archive/ArchiveIntroGate";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  ArchiveIconBadge,
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";
import { ArchiveFileCard } from "@/components/ui/archive/ArchiveFileCard";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { ArchiveStatList } from "@/components/ui/archive/ArchiveStatList";
import {
  archiveFiles,
  archiveHub,
  purchaseCtas,
  supportRoutes,
  tunnelStops,
} from "@/lib/archive-data";
import { archiveIntro, tunnelSection } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { useRef } from "react";

export function ArchiveHub() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hub-copy]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        });

        gsap.from("[data-hub-card]", {
          autoAlpha: 0,
          y: 48,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.16,
        });

        gsap.from("[data-hub-support]", {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.3,
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative overflow-hidden">
      <ArchiveIntroGate />
      <section className="relative overflow-hidden border-b border-(--border-soft) pt-28 md:pt-36 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 archive-page-glow" />
        <div className="pointer-events-none absolute inset-0 archive-grid-overlay opacity-70" />

        <Container className="relative z-10 pb-14 md:pb-20">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.7fr)] xl:items-start">
            <div>
              <div data-hub-copy className="flex items-center gap-3">
                <ArchiveIconBadge
                  iconKey="archive"
                  tone="accent"
                  className="h-12 w-12 rounded-[18px]"
                  size={20}
                />
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-(--text-muted)">
                  {archiveHub.eyebrow}
                </p>
              </div>
              <h1
                data-hub-copy
                className="archive-title-display mt-5 max-w-5xl font-heading text-(--text-strong)"
              >
                {archiveHub.title}
              </h1>
              <p
                data-hub-copy
                className="mt-6 max-w-3xl text-lg leading-relaxed text-(--text-soft) md:text-xl"
              >
                {archiveHub.summary}
              </p>
              <p
                data-hub-copy
                className="mt-5 max-w-3xl text-base leading-relaxed text-(--text-muted) md:text-lg"
              >
                {archiveHub.detail}
              </p>

              <div data-hub-copy className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  href={purchaseCtas.tunnel.href}
                  iconKey={purchaseCtas.tunnel.iconKey}
                >
                  {purchaseCtas.tunnel.label}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  href={purchaseCtas.archive.href}
                  iconKey={purchaseCtas.archive.iconKey}
                >
                  {purchaseCtas.archive.label}
                </Button>
              </div>
            </div>

            <ArchivePanel
              className="xl:mt-3"
              eyebrow="Archive Handshake"
              iconKey="access"
              title={archiveIntro.sequence[archiveIntro.sequence.length - 1]}
              summary={archiveHub.accessNote}
            >
              <div className="space-y-3">
                {archiveIntro.sequence.map((step, index) => (
                  <div
                    key={step}
                    className="archive-subcard rounded-[18px] px-4 py-4"
                  >
                    <p className="font-ui text-[10px] uppercase tracking-[0.26em] text-(--text-muted)">
                      Checkpoint {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="text-lg mt-1 font-heading text-(--text-strong)">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </ArchivePanel>
          </div>
        </Container>
      </section>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 archive-grid-overlay opacity-20" />
        <Container className="relative z-10 section-padding">
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-6">
            {archiveFiles.map((file, index) => (
              <div
                key={file.id}
                data-hub-card
                className={
                  index === 0 || index === 1 ? "xl:col-span-3" : "xl:col-span-2"
                }
              >
                <ArchiveFileCard file={file} priority={index === 0} />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.68fr)]">
            <ArchivePanel
              tone="mist"
              data-hub-support="true"
              eyebrow={tunnelSection.title}
              iconKey="tunnel"
              title={tunnelSection.subtitle}
              summary={tunnelSection.intro}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {tunnelStops.slice(0, 4).map((stop) => (
                  <Link
                    key={stop.id}
                    href={stop.targetHref}
                    className="archive-subcard rounded-[18px] px-4 py-4 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <ArchiveInlineIcon
                        iconKey={getRouteIconKey(stop.targetHref)}
                        size={15}
                        className="text-(--text-muted)"
                      />
                      <p className="font-ui text-[10px] uppercase tracking-[0.26em] text-(--text-muted)">
                        {stop.eyebrow}
                      </p>
                    </div>
                    <p className="archive-title-card mt-2 font-heading text-(--text-strong)">
                      {stop.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-(--text-soft)">
                      {stop.type}
                    </p>
                  </Link>
                ))}
              </div>
            </ArchivePanel>

            <div className="grid gap-5" data-hub-support>
              {supportRoutes.map((route) => (
                <ArchivePanel
                  key={route.id}
                  eyebrow={route.fileCode}
                  iconKey={route.iconKey}
                  title={route.title}
                  summary={route.summary}
                  compact
                >
                  <Button href={route.href} variant="ghost" iconKey={route.iconKey}>
                    Open {route.label}
                  </Button>
                </ArchivePanel>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
