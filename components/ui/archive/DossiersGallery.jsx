"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { cn } from "@/lib/utils";

const MAX_ITEMS_PER_ROW = 3;
// Classified files have no photo; give them a portrait-ish placeholder box.
const DEFAULT_RATIO = 0.72;

const gridTexture = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

const scanlineTexture = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 4px)",
};

function getLayoutConfig(containerWidth) {
  if (containerWidth < 640) return { gap: 16, target: 320, max: 540 };
  if (containerWidth < 1024) return { gap: 20, target: 380, max: 580 };
  return { gap: 20, target: 420, max: 640 };
}

// Pack items into rows of at most MAX_ITEMS_PER_ROW. Each row shares one
// height; cell widths derive from each image's real aspect ratio so the
// rendered box matches the photo exactly (no cropping). Full rows stretch to
// fill the container width; a trailing partial row keeps its natural size.
function buildRows(items, containerWidth) {
  if (!containerWidth || !items.length) return [];

  const { gap, target, max } = getLayoutConfig(containerWidth);
  const rows = [];
  let current = [];
  let ratioSum = 0;

  items.forEach((item, index) => {
    current.push(item);
    ratioSum += item.ratio;

    const gapWidth = gap * (current.length - 1);
    const fitHeight = (containerWidth - gapWidth) / ratioSum;
    const isLast = index === items.length - 1;
    const isFull = fitHeight <= target || current.length >= MAX_ITEMS_PER_ROW;

    if (!isFull && !isLast) return;

    // A full row's width is distributed by flex-grow to span the container, so
    // its height must equal fitHeight exactly or cells would crop. Only the
    // trailing partial row (fixed widths) is clamped to a sensible height.
    const height = isFull ? fitHeight : Math.min(max, target, fitHeight);

    rows.push({ gap, fill: isFull, height, items: current });
    current = [];
    ratioSum = 0;
  });

  return rows;
}

export function DossiersGallery({ items = [], content }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [ratios, setRatios] = useState({});

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContainerWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Measure each image's natural aspect ratio on the client.
  useEffect(() => {
    let active = true;

    Promise.all(
      items.map(
        (item) =>
          new Promise((resolve) => {
            if (!item.photo) {
              resolve([item.slug, DEFAULT_RATIO]);
              return;
            }
            const image = new window.Image();
            image.onload = () =>
              resolve([
                item.slug,
                image.naturalHeight
                  ? image.naturalWidth / image.naturalHeight
                  : DEFAULT_RATIO,
              ]);
            image.onerror = () => resolve([item.slug, DEFAULT_RATIO]);
            image.src = item.photo;
          }),
      ),
    ).then((entries) => {
      if (active) setRatios(Object.fromEntries(entries));
    });

    return () => {
      active = false;
    };
  }, [items]);

  const sizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        index,
        ratio: ratios[item.slug] ?? DEFAULT_RATIO,
      })),
    [items, ratios],
  );

  const rows = useMemo(
    () => buildRows(sizedItems, containerWidth),
    [sizedItems, containerWidth],
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-4 md:gap-5">
      {rows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex w-full"
          style={{ height: row.height, gap: row.gap }}
        >
          {row.items.map((dossier) => {
            const isAccent = dossier.index % 3 === 0;
            const cellStyle = row.fill
              ? { flexGrow: dossier.ratio, flexBasis: 0, minWidth: 0 }
              : {
                  flexGrow: 0,
                  flexShrink: 0,
                  width: row.height * dossier.ratio,
                };

            return (
              <Link
                key={dossier.slug}
                href={dossier.href}
                aria-label={`${content.openDossierAriaPrefix} ${dossier.callsign}`}
                style={cellStyle}
                className={cn(
                  "group/file relative h-full overflow-hidden border bg-black/70 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isAccent
                    ? "border-rose-500/30 hover:border-rose-400/60 hover:shadow-[0_28px_60px_-32px_rgba(242,13,13,0.5)]"
                    : "border-white/10 hover:border-white/30 hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.85)]",
                )}
              >
                {dossier.photo ? (
                  <img
                    src={dossier.photo}
                    alt={dossier.callsign}
                    loading="lazy"
                    draggable={false}
                    className="block h-full w-full select-none object-cover saturate-[0.85] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:scale-[1.02] group-hover/file:saturate-100"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0a0a0c] font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                    {content.photoClassified}
                  </div>
                )}

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-1 opacity-[0.05] mix-blend-overlay"
                  style={gridTexture}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-1 opacity-60 mix-blend-overlay"
                  style={scanlineTexture}
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 z-2 flex items-start justify-between gap-3 bg-linear-to-b from-black/95 via-black/55 to-transparent px-4 pb-12 pt-3.5 font-ui text-[10px] uppercase tracking-[0.32em]">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-block h-1.5 w-1.5 rounded-full",
                        isAccent
                          ? "bg-rose-400 shadow-[0_0_10px_rgba(242,13,13,0.7)]"
                          : "bg-white/65",
                      )}
                    />
                    <span className={cn(isAccent ? "text-rose-200" : "text-stone-100")}>
                      {dossier.fileCode}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "rounded-[3px] border px-2 py-1 font-ui text-[9px] tracking-[0.4em]",
                      isAccent
                        ? "border-rose-400/45 text-rose-200"
                        : "border-white/25 text-stone-100/85",
                    )}
                  >
                    {content.declassified}
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 bg-linear-to-t from-black via-black/85 to-transparent px-4 pb-4 pt-16 text-stone-100">
                  <p
                    className={cn(
                      "font-ui text-[10px] uppercase tracking-[0.32em]",
                      isAccent ? "text-rose-300/85" : "text-stone-400",
                    )}
                  >
                    {dossier.archetype}
                  </p>
                  <h2 className="mt-1 font-heading text-2xl font-bold tracking-wide text-white md:text-[1.55rem]">
                    {dossier.callsign}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-300">
                    {dossier.summary}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
                    <span>{content.openFile}</span>
                    <ArchiveInlineIcon
                      iconKey="next"
                      size={14}
                      className={cn(
                        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:translate-x-1",
                        isAccent ? "text-rose-200" : "text-stone-300",
                      )}
                    />
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2 top-2 z-3 h-3 w-3 border-l border-t border-white/40"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2 top-2 z-3 h-3 w-3 border-r border-t border-white/40"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 left-2 z-3 h-3 w-3 border-b border-l border-white/40"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 right-2 z-3 h-3 w-3 border-b border-r border-white/40"
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 z-3 h-px origin-left scale-x-[0.25] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:scale-x-100",
                    isAccent
                      ? "bg-linear-to-r from-transparent via-rose-400/85 to-transparent"
                      : "bg-linear-to-r from-transparent via-white/45 to-transparent",
                  )}
                />
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
