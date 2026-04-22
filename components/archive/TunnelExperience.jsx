"use client";

import { Button } from "@/components/ui/Button";
import {
  ArchiveIconBadge,
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { gsap, Observer, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function createTunnelAmbience() {
  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext || null;

  if (!AudioContextClass) return () => {};

  const context = new AudioContextClass();
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;

  for (let index = 0; index < data.length; index += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[index] = last * 2.6;
  }

  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 180;
  filter.Q.value = 0.6;

  const rumble = context.createOscillator();
  rumble.type = "triangle";
  rumble.frequency.value = 48;

  const rumbleGain = context.createGain();
  rumbleGain.gain.value = 0.006;

  const gain = context.createGain();
  gain.gain.value = 0.018;

  const lfo = context.createOscillator();
  lfo.frequency.value = 0.14;

  const lfoGain = context.createGain();
  lfoGain.gain.value = 0.005;

  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);

  noise.connect(filter);
  filter.connect(gain);
  rumble.connect(rumbleGain);
  rumbleGain.connect(gain);
  gain.connect(context.destination);

  noise.start();
  rumble.start();
  lfo.start();

  return () => {
    try {
      noise.stop();
      rumble.stop();
      lfo.stop();
      context.close();
    } catch {}
  };
}

export function TunnelExperience({ stops = [], prompt, hints = [] }) {
  const scope = useRef(null);
  const desktopIndexRef = useRef(0);
  const desktopGoToRef = useRef(null);
  const desktopInfoRef = useRef(null);
  const mobileInfoRef = useRef(null);
  const audioCleanupRef = useRef(null);

  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const activeDesktopStop = stops[activeDesktopIndex] ?? stops[0];
  const activeMobileStop = stops[activeMobileIndex] ?? stops[0];
  const lastIndex = Math.max(stops.length - 1, 0);

  useEffect(() => {
    if (!audioEnabled) {
      audioCleanupRef.current?.();
      audioCleanupRef.current = null;
      return;
    }

    audioCleanupRef.current = createTunnelAmbience();

    return () => {
      audioCleanupRef.current?.();
      audioCleanupRef.current = null;
    };
  }, [audioEnabled]);

  useEffect(() => {
    if (!desktopInfoRef.current) return;

    gsap.fromTo(
      desktopInfoRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" },
    );
  }, [activeDesktopIndex]);

  useEffect(() => {
    if (!mobileInfoRef.current) return;

    gsap.fromTo(
      mobileInfoRef.current,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" },
    );
  }, [activeMobileIndex]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1100px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const { isDesktop, reduce } = conditions;

          if (!isDesktop) {
            gsap.from("[data-mobile-stop]", {
              autoAlpha: 0,
              y: 24,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: "[data-mobile-track]",
                start: "top 78%",
              },
            });
            return;
          }

          const desktopRoot = scope.current?.querySelector("[data-tunnel-desktop]");
          const visual = scope.current?.querySelector("[data-tunnel-visual]");
          const beam = scope.current?.querySelector("[data-tunnel-beam]");
          const scenes = gsap.utils.toArray("[data-tunnel-scene]", scope.current);
          const rings = gsap.utils.toArray("[data-tunnel-ring]", scope.current);
          const dots = gsap.utils.toArray("[data-tunnel-dot]", scope.current);

          if (!desktopRoot || !visual || !scenes.length) return;

          const applyActiveScene = (index) => {
            const clampedIndex = Math.max(0, Math.min(index, lastIndex));

            if (desktopIndexRef.current === clampedIndex) return;
            desktopIndexRef.current = clampedIndex;

            setActiveDesktopIndex(clampedIndex);

            scenes.forEach((scene, sceneIndex) => {
              gsap.to(scene, {
                autoAlpha: sceneIndex === clampedIndex ? 1 : 0,
                scale: sceneIndex === clampedIndex ? 1 : 0.82,
                y: sceneIndex === clampedIndex ? 0 : 42,
                duration: reduce ? 0.1 : 0.45,
                ease: "power2.out",
                overwrite: "auto",
              });
            });

            dots.forEach((dot, dotIndex) => {
              gsap.to(dot, {
                scale: dotIndex === clampedIndex ? 1.1 : 1,
                backgroundColor:
                  dotIndex === clampedIndex
                    ? "var(--color-accent)"
                    : "rgba(229,239,245,0.18)",
                borderColor:
                  dotIndex === clampedIndex
                    ? "rgba(242,13,13,0.46)"
                    : "rgba(229,239,245,0.12)",
                duration: reduce ? 0.1 : 0.28,
                overwrite: "auto",
              });
            });
          };

          gsap.set(scenes, { autoAlpha: 0, scale: 0.82, y: 42 });
          gsap.set(scenes[0], { autoAlpha: 1, scale: 1, y: 0 });
          gsap.set(dots[0], {
            backgroundColor: "var(--color-accent)",
            borderColor: "rgba(242,13,13,0.46)",
          });
          desktopIndexRef.current = 0;

          const ringTweens = reduce
            ? []
            : rings.map((ring, index) =>
                gsap.fromTo(
                  ring,
                  { scale: 0.34, autoAlpha: 0.28 },
                  {
                    scale: 1.8,
                    autoAlpha: 0,
                    duration: 2.6,
                    ease: "none",
                    repeat: -1,
                    delay: index * 0.24,
                  },
                ),
              );

          const scrollTrigger = ScrollTrigger.create({
            id: "archive-tunnel-route",
            trigger: desktopRoot,
            start: "top top",
            end: `+=${window.innerHeight * (stops.length + 1)}`,
            pin: true,
            scrub: reduce ? false : 0.85,
            snap: reduce
              ? false
              : {
                  snapTo: 1 / Math.max(stops.length - 1, 1),
                  duration: 0.2,
                  ease: "power1.inOut",
                },
            onUpdate(self) {
              const index = Math.round(self.progress * Math.max(stops.length - 1, 1));
              applyActiveScene(index);

              gsap.to(beam, {
                opacity: 0.2 + self.progress * 0.45,
                duration: 0.2,
                overwrite: "auto",
              });

              gsap.to(visual, {
                backgroundPositionY: `${self.progress * 180}px`,
                duration: 0.2,
                overwrite: "auto",
              });
            },
          });

          const goTo = (index) => {
            const clampedIndex = Math.max(0, Math.min(index, lastIndex));
            const span = scrollTrigger.end - scrollTrigger.start;
            const step = span / Math.max(stops.length - 1, 1);
            const target = scrollTrigger.start + step * clampedIndex;

            gsap.to(window, {
              duration: reduce ? 0.01 : 0.9,
              ease: "power2.inOut",
              scrollTo: target,
            });
          };

          desktopGoToRef.current = goTo;

          const observer = Observer.create({
            target: desktopRoot,
            type: "touch,pointer",
            tolerance: 28,
            preventDefault: true,
            onDown: () => {
              if (scrollTrigger.isActive) goTo(desktopIndexRef.current + 1);
            },
            onUp: () => {
              if (scrollTrigger.isActive) goTo(desktopIndexRef.current - 1);
            },
          });

          const handleKey = (event) => {
            if (!scrollTrigger.isActive) return;

            if (["ArrowDown", "s", "S"].includes(event.key)) {
              event.preventDefault();
              goTo(desktopIndexRef.current + 1);
            }

            if (["ArrowUp", "w", "W"].includes(event.key)) {
              event.preventDefault();
              goTo(desktopIndexRef.current - 1);
            }
          };

          window.addEventListener("keydown", handleKey);

          return () => {
            ringTweens.forEach((tween) => tween.kill());
            observer.kill();
            scrollTrigger.kill();
            window.removeEventListener("keydown", handleKey);
            desktopGoToRef.current = null;
          };
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  const goDesktop = (index) => {
    desktopGoToRef.current?.(index);
  };

  const goMobile = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, lastIndex));
    setActiveMobileIndex(clampedIndex);
  };

  const controlHints = useMemo(() => hints.filter(Boolean), [hints]);

  return (
    <div ref={scope} className="space-y-6">
      <ArchivePanel
        eyebrow="Tunnel Controls"
        iconKey="tunnelControl"
        title="Guided descent"
        summary={prompt}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant={audioEnabled ? "signal" : "outline"}
            iconKey={audioEnabled ? "soundOn" : "soundOff"}
            onClick={() => setAudioEnabled((value) => !value)}
          >
            {audioEnabled ? "Disable Ambient Audio" : "Enable Ambient Audio"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            iconKey="previous"
            iconPosition="left"
            onClick={() => goDesktop(activeDesktopIndex - 1)}
          >
            Previous stop
          </Button>
          <Button
            type="button"
            variant="ghost"
            iconKey="next"
            onClick={() => goDesktop(activeDesktopIndex + 1)}
          >
            Next stop
          </Button>
        </div>
        {controlHints.length ? (
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {controlHints.map((hint) => (
              <div
                key={hint}
                className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-relaxed text-[color:var(--text-soft)]"
              >
                <div className="flex items-start gap-3">
                  <ArchiveIconBadge
                    iconKey="route"
                    className="h-9 w-9 rounded-[12px]"
                    size={15}
                    tone="muted"
                  />
                  <span>{hint}</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </ArchivePanel>

      <div data-tunnel-desktop className="hidden xl:grid xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.7fr)] xl:gap-6">
        <div
          data-tunnel-visual
          className="relative min-h-[78svh] overflow-hidden rounded-[32px] border border-[color:rgba(229,239,245,0.1)] bg-[#041018]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 22%, rgba(242,13,13,0.12), transparent 18%), radial-gradient(circle at 50% 36%, rgba(229,239,245,0.12), transparent 24%), linear-gradient(180deg, rgba(7,15,22,0.98), rgba(4,9,14,0.98))",
          }}
        >
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-y-0 left-[18%] w-px bg-white/10" />
            <div className="absolute inset-y-0 right-[18%] w-px bg-white/10" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/8" />
            <div
              className="absolute inset-0 opacity-55"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(229,239,245,0.09) 0 3px, transparent 3px 80px), linear-gradient(90deg, transparent 0%, rgba(229,239,245,0.04) 48%, rgba(229,239,245,0.07) 50%, rgba(229,239,245,0.04) 52%, transparent 100%)",
              }}
            />
          </div>

          {[...Array(8)].map((_, index) => (
            <div
              key={`ring-${index}`}
              data-tunnel-ring
              className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-white/10 opacity-0"
            />
          ))}

          <div
            data-tunnel-beam
            className="pointer-events-none absolute inset-x-[26%] bottom-0 top-[14%] rounded-full bg-[radial-gradient(circle_at_center,rgba(242,13,13,0.18),transparent_66%)] opacity-25 blur-3xl"
          />

          {stops.map((stop) => (
            <article
              key={stop.id}
              data-tunnel-scene
              className="absolute left-1/2 top-1/2 w-[min(70%,480px)] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="overflow-hidden rounded-[28px] border border-white/12 bg-white/6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-lg">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={stop.image}
                    alt={stop.title}
                    fill
                    sizes="(min-width: 1280px) 420px, 80vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041018] via-transparent to-transparent" />
                </div>
                <div className="px-5 py-5">
                  <ArchiveInlineIcon
                    iconKey={getRouteIconKey(stop.targetHref)}
                    size={14}
                    className="mb-3 text-[color:var(--text-muted)]"
                  />
                  <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                    {stop.eyebrow} · {stop.type}
                  </p>
                  <h3 className="archive-title-card mt-3 font-heading text-[color:var(--text-strong)]">
                    {stop.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-soft)]">
                    {stop.caption}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <ArchivePanel
            compact
            eyebrow="Progress"
            iconKey="route"
            title={`${String(activeDesktopIndex + 1).padStart(2, "0")} / ${String(stops.length).padStart(2, "0")}`}
            summary="Each stop links outward into a dedicated archive route."
          >
            <div className="grid grid-cols-6 gap-2">
              {stops.map((stop, index) => (
                <button
                  key={stop.id}
                  type="button"
                  data-tunnel-dot
                  onClick={() => goDesktop(index)}
                  className="h-11 rounded-full border border-white/10 bg-white/10 font-ui text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-primary)] transition-colors"
                  aria-label={`Jump to ${stop.title}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </ArchivePanel>

          <div ref={desktopInfoRef}>
            <ArchivePanel
              eyebrow={activeDesktopStop?.eyebrow}
              iconKey={getRouteIconKey(activeDesktopStop?.targetHref)}
              title={activeDesktopStop?.title}
              summary={activeDesktopStop?.summary}
            >
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-[color:var(--text-soft)]">
                  {activeDesktopStop?.caption}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    href={activeDesktopStop?.targetHref}
                    iconKey={getRouteIconKey(activeDesktopStop?.targetHref)}
                  >
                    {activeDesktopStop?.targetLabel}
                  </Button>
                  <Button href="/personnel" variant="outline" iconKey="personnel">
                    Open Personnel Registry
                  </Button>
                </div>
              </div>
            </ArchivePanel>
          </div>

          <div className="grid gap-3">
            {stops.map((stop, index) => (
              <button
                key={stop.id}
                type="button"
                onClick={() => goDesktop(index)}
                className={cn(
                  "rounded-[24px] border px-4 py-4 text-left transition-all duration-300",
                  index === activeDesktopIndex
                    ? "border-[color:rgba(242,13,13,0.32)] bg-[linear-gradient(180deg,rgba(34,49,61,0.96),rgba(24,34,44,0.98))]"
                    : "border-[color:var(--border-soft)] bg-white/6 hover:bg-white/10",
                )}
              >
                <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                  {stop.eyebrow}
                </p>
                <p className="archive-title-nav mt-2 font-heading text-[color:var(--text-strong)]">
                  {stop.title}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 text-sm leading-relaxed text-[color:var(--text-soft)]">
                  <ArchiveInlineIcon
                    iconKey={getRouteIconKey(stop.targetHref)}
                    size={14}
                  />
                  <span>{stop.type}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="xl:hidden">
        <div ref={mobileInfoRef}>
          <ArchivePanel
            tone="mist"
            eyebrow="Mobile Route"
            iconKey={getRouteIconKey(activeMobileStop?.targetHref)}
            title={activeMobileStop?.title}
            summary={activeMobileStop?.summary}
          >
            <div className="space-y-4">
              <div className="archive-image-frame overflow-hidden rounded-[24px]">
                <Image
                  src={activeMobileStop?.image}
                  alt={activeMobileStop?.title ?? "Tunnel stop"}
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="text-sm leading-relaxed text-[color:var(--text-soft)]">
                {activeMobileStop?.caption}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  iconKey="previous"
                  onClick={() => goMobile(activeMobileIndex - 1)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  iconKey="next"
                  onClick={() => goMobile(activeMobileIndex + 1)}
                >
                  Next
                </Button>
                <Button
                  href={activeMobileStop?.targetHref}
                  variant="ghost"
                  iconKey={getRouteIconKey(activeMobileStop?.targetHref)}
                >
                  {activeMobileStop?.targetLabel}
                </Button>
              </div>
            </div>
          </ArchivePanel>
        </div>

        <div data-mobile-track className="mt-5 grid gap-3">
          {stops.map((stop, index) => (
            <button
              key={stop.id}
              type="button"
              data-mobile-stop
              onClick={() => goMobile(index)}
              className={cn(
                "rounded-[24px] border px-4 py-4 text-left transition-all duration-300",
                index === activeMobileIndex
                  ? "border-[color:rgba(242,13,13,0.3)] bg-[linear-gradient(180deg,rgba(27,39,50,0.96),rgba(20,31,40,0.98))]"
                  : "border-[color:var(--border-soft)] bg-white/6",
              )}
            >
              <p className="font-ui text-[10px] uppercase tracking-[0.26em] text-[color:var(--text-muted)]">
                {stop.eyebrow}
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="archive-title-nav font-heading text-[color:var(--text-strong)]">
                    {stop.title}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 text-sm leading-relaxed text-[color:var(--text-soft)]">
                    <ArchiveInlineIcon
                      iconKey={getRouteIconKey(stop.targetHref)}
                      size={14}
                    />
                    <span>{stop.type}</span>
                  </div>
                </div>
                <span className="rounded-full border border-white/12 px-3 py-2 font-ui text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-primary)]">
                  {index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
