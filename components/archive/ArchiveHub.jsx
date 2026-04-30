"use client";

import { useRef } from "react";

import { ArchiveIntroGate } from "@/components/archive/ArchiveIntroGate";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArchiveFileCard } from "@/components/ui/archive/ArchiveFileCard";
import {
  ArchiveInlineIcon,
  getArchiveIcon,
} from "@/components/ui/archive/ArchiveIcons";
import {
  TerminalBlock,
  TerminalDivider,
  TerminalRow,
} from "@/components/ui/terminal/Terminal";
import {
  archiveFiles,
  archiveHub,
  purchaseCtas,
  supportRoutes,
  tunnelStops,
} from "@/lib/archive-data";
import { archiveIntro, tunnelSection } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { highlightWords } from "@/lib/highlight";
import { cn } from "@/lib/utils";

const supportToneMap = {
  book: {
    accent: "text-amber-200",
    border: "border-amber-400/25 hover:border-amber-300/55",
    line: "bg-linear-to-r from-transparent via-amber-300/70 to-transparent",
  },
  press: {
    accent: "text-sky-200",
    border: "border-sky-400/20 hover:border-sky-300/50",
    line: "bg-linear-to-r from-transparent via-sky-300/70 to-transparent",
  },
  contact: {
    accent: "text-rose-200",
    border: "border-rose-500/30 hover:border-rose-400/65",
    line: "bg-linear-to-r from-transparent via-rose-400/80 to-transparent",
  },
};

function ArchiveSceneBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 80%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function SectionEyebrow({ code, label, iconKey, accent = false }) {
  return (
    <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.32em]">
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-[3px] border",
          accent
            ? "border-rose-500/40 bg-rose-500/8 text-rose-200"
            : "border-white/15 bg-white/2 text-stone-300",
        )}
      >
        <ArchiveInlineIcon iconKey={iconKey} size={14} />
      </span>
      <span
        className={cn("font-medium", accent ? "text-rose-200" : "text-stone-300")}
      >
        {code}
      </span>
      <span aria-hidden="true" className="h-px w-10 bg-white/15" />
      <span className="text-stone-400">{label}</span>
    </div>
  );
}

function TunnelStopTile({ stop, index }) {
  return (
    <a
      href={stop.targetHref}
      style={{
        backgroundImage:
          "linear-gradient(155deg, rgba(15,8,8,0.92), rgba(8,8,10,0.98))",
      }}
      className="group/tn relative block overflow-hidden rounded-md border border-white/10 p-4 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-rose-500/40"
    >
      <div className="relative flex items-start justify-between gap-2">
        <span className="font-ui text-[10px] font-medium uppercase tracking-[0.32em] text-rose-300/80">
          {String(index + 1).padStart(2, "0")} · {stop.eyebrow}
        </span>
        <ArchiveInlineIcon
          iconKey="next"
          size={12}
          className="text-stone-500 transition-[transform,color] duration-500 group-hover/tn:translate-x-1 group-hover/tn:text-rose-300"
        />
      </div>
      <p className="relative mt-3 font-heading text-base font-bold tracking-wide text-white">
        {stop.title}
      </p>
      <p className="relative mt-1 font-ui text-[10px] uppercase tracking-[0.24em] text-stone-400">
        {stop.type}
      </p>
    </a>
  );
}

function SupportRouteCard({ route }) {
  const tone = supportToneMap[route.id] ?? supportToneMap.contact;
  const Icon = getArchiveIcon(route.iconKey);

  return (
    <a
      href={route.href}
      style={{
        backgroundImage:
          "linear-gradient(160deg, rgba(15,16,20,0.94), rgba(7,8,10,0.99))",
      }}
      className={cn(
        "group/sup relative flex h-full flex-col overflow-hidden rounded-md border p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5",
        tone.border,
      )}
    >
      {Icon ? (
        <Icon
          aria-hidden="true"
          stroke={1.2}
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 text-white/4 transition-[transform,color] duration-700 group-hover/sup:scale-105 group-hover/sup:text-white/[0.07]"
        />
      ) : null}

      <div className="relative flex items-center justify-between gap-3">
        <p
          className={cn(
            "font-ui text-[10px] uppercase tracking-[0.32em]",
            tone.accent,
          )}
        >
          {route.fileCode}
        </p>
        <ArchiveInlineIcon
          iconKey="next"
          size={14}
          className={cn(
            "transition-transform duration-500 group-hover/sup:translate-x-1",
            tone.accent,
          )}
        />
      </div>

      <h4 className="relative mt-5 font-heading text-xl font-bold tracking-wide text-white">
        {route.title}
      </h4>
      <p className="relative mt-2 text-sm leading-relaxed text-stone-300">
        {route.summary}
      </p>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-[0.3] origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/sup:scale-x-100",
          tone.line,
        )}
      />
    </a>
  );
}

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
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-hub-files]",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from("[data-hub-tunnel-tile]", {
          autoAlpha: 0,
          y: 26,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-hub-tunnel]",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from("[data-hub-support]", {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-hub-support-grid]",
            start: "top 84%",
            once: true,
          },
        });

        gsap.utils.toArray("[data-hub-section-head]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 22,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  const lastStep = archiveIntro.sequence[archiveIntro.sequence.length - 1];

  return (
    <div ref={scope} className="relative overflow-hidden">
      <ArchiveIntroGate />

      <section className="relative overflow-hidden pt-28 md:pt-36 lg:pt-40">
        <ArchiveSceneBackdrop />
        <Container className="relative z-10 pb-14 md:pb-20">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.7fr)] xl:items-start">
            <div>
              <div data-hub-copy>
                <SectionEyebrow
                  code="ARCHIVE 00"
                  label="Hub Index"
                  iconKey="archive"
                  accent
                />
              </div>
              <h1
                data-hub-copy
                className="mt-5 max-w-5xl font-heading text-4xl font-bold leading-[0.95] text-white md:text-6xl lg:text-7xl"
              >
                {highlightWords(archiveHub.title)}
              </h1>
              <p
                data-hub-copy
                className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl"
              >
                {archiveHub.summary}
              </p>
              <p
                data-hub-copy
                className="mt-5 max-w-3xl text-base leading-relaxed text-stone-300 md:text-lg"
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

            <TerminalBlock data-hub-copy="true" className="xl:mt-3">
              <TerminalRow variant="header">
                [SIG] Archive Handshake
              </TerminalRow>
              <TerminalRow variant="status">[STATUS] {lastStep}</TerminalRow>
              <TerminalDivider />
              {archiveIntro.sequence.map((step, index) => {
                const isLast = index === archiveIntro.sequence.length - 1;
                return (
                  <TerminalRow
                    key={step}
                    variant={isLast ? "status" : "success"}
                  >
                    Checkpoint {String(index + 1).padStart(2, "0")} — {step}
                  </TerminalRow>
                );
              })}
            </TerminalBlock>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container className="relative z-10 py-12 md:py-20 lg:py-28">
          <div
            data-hub-section-head
            className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-8"
          >
            <div className="max-w-2xl">
              <SectionEyebrow
                code="CABINET 01"
                label={`Mission Files / ${String(archiveFiles.length).padStart(2, "0")}`}
                iconKey="open"
              />
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.7rem]">
                Mission cabinet
              </h2>
              <p className="mt-3 text-base leading-relaxed text-stone-300 md:text-lg">
                Every file below is a sealed entry from the operation. Open one
                to descend into its dossier.
              </p>
            </div>
          </div>

          <div
            data-hub-files
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6"
          >
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
        </Container>
      </section>

      <section className="relative">
        <Container className="relative z-10 pb-20 md:pb-28 lg:pb-32">
          <div data-hub-section-head className="mb-10 max-w-2xl md:mb-14">
            <SectionEyebrow
              code="CABINET 02"
              label="Auxiliary Routes"
              iconKey="route"
            />
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.7rem]">
              Tunnel network &amp; support desk
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-300 md:text-lg">
              Move from the cabinet into the route map below — a guided tunnel
              descent paired with the channels that handle press, rights, and
              outreach.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)] xl:items-start">
            <article
              data-hub-tunnel
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at top, rgba(242,13,13,0.07), transparent 65%), linear-gradient(180deg, #0c0708 0%, #070708 100%)",
              }}
              className="relative overflow-hidden rounded-md border border-rose-500/20 p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                  maskImage:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)",
                }}
              />

              <div className="relative flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.32em] text-rose-200">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] border border-rose-500/40 bg-rose-500/8">
                  <ArchiveInlineIcon iconKey="tunnel" size={14} />
                </span>
                [SIG] {tunnelSection.title}
                <span aria-hidden="true" className="ml-1 h-px flex-1 bg-linear-to-r from-rose-500/40 via-white/15 to-transparent" />
              </div>

              <h3 className="relative mt-5 font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
                {tunnelSection.subtitle}
              </h3>
              <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
                {tunnelSection.intro}
              </p>

              <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
                {tunnelStops.slice(0, 4).map((stop, idx) => (
                  <div key={stop.id} data-hub-tunnel-tile>
                    <TunnelStopTile stop={stop} index={idx} />
                  </div>
                ))}
              </div>

              <div className="relative mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
                <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
                  Six guided stops · scroll-driven descent
                </p>
                <Button
                  size="sm"
                  variant="signal"
                  href={purchaseCtas.tunnel.href}
                  iconKey={purchaseCtas.tunnel.iconKey}
                >
                  Enter tunnel
                </Button>
              </div>
            </article>

            <div data-hub-support-grid className="grid gap-5">
              {supportRoutes.map((route) => (
                <div key={route.id} data-hub-support>
                  <SupportRouteCard route={route} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
