"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { cn } from "@/lib/utils";

const MAX_ITEMS_PER_ROW = 2;
const DEFAULT_RATIO = 1;

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
  if (containerWidth < 640) return { gap: 16, target: 240, max: 380 };
  if (containerWidth < 1024) return { gap: 20, target: 300, max: 440 };
  return { gap: 20, target: 340, max: 480 };
}

// Group items into rows of at most MAX_ITEMS_PER_ROW. Each row shares one
// height; cell widths are derived from each image's real aspect ratio so the
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

    rows.push({
      gap,
      // A full row distributes width by flex-grow (fills edge to edge); a
      // partial last row uses fixed widths so images keep their true ratio.
      fill: isFull,
      height,
      items: current,
    });

    current = [];
    ratioSum = 0;
  });

  return rows;
}

export function CiviliansGallery({ items = [] }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [ratios, setRatios] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              resolve([item.id, DEFAULT_RATIO]);
              return;
            }
            const image = new window.Image();
            image.onload = () =>
              resolve([
                item.id,
                image.naturalHeight
                  ? image.naturalWidth / image.naturalHeight
                  : DEFAULT_RATIO,
              ]);
            image.onerror = () => resolve([item.id, DEFAULT_RATIO]);
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

  useEffect(() => {
    if (activeIndex === null || typeof window === "undefined") return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((value) => (value > 0 ? value - 1 : value));
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((value) =>
          value < items.length - 1 ? value + 1 : value,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  const sizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        index,
        ratio: ratios[item.id] ?? DEFAULT_RATIO,
      })),
    [items, ratios],
  );

  const rows = useMemo(
    () => buildRows(sizedItems, containerWidth),
    [sizedItems, containerWidth],
  );

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const canGoPrev = activeIndex !== null && activeIndex > 0;
  const canGoNext = activeIndex !== null && activeIndex < items.length - 1;

  return (
    <>
      <div ref={containerRef} className="flex flex-col gap-4 md:gap-5">
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex w-full"
            style={{ height: row.height, gap: row.gap }}
          >
            {row.items.map((civilian) => {
              const isAccent = civilian.index % 3 === 0;
              const cellStyle = row.fill
                ? { flexGrow: civilian.ratio, flexBasis: 0, minWidth: 0 }
                : {
                    flexGrow: 0,
                    flexShrink: 0,
                    width: row.height * civilian.ratio,
                  };

              return (
                <button
                  key={civilian.id}
                  type="button"
                  onClick={() =>
                    civilian.photo && setActiveIndex(civilian.index)
                  }
                  aria-label={`View photo of ${civilian.name}`}
                  style={cellStyle}
                  className={cn(
                    "group/file relative h-full cursor-zoom-in overflow-hidden border bg-black/70 text-left transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500",
                    isAccent
                      ? "border-rose-500/30 hover:border-rose-400/60 hover:shadow-[0_28px_60px_-32px_rgba(242,13,13,0.5)]"
                      : "border-white/10 hover:border-white/30 hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.85)]",
                  )}
                >
                  {civilian.photo ? (
                    <img
                      src={civilian.photo}
                      alt={civilian.name}
                      loading="lazy"
                      draggable={false}
                      className="block h-full w-full select-none object-cover saturate-[0.85] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:scale-[1.02] group-hover/file:saturate-100"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#0a0a0c] font-ui text-[10px] uppercase tracking-[0.32em] text-stone-500">
                      Photo classified
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
                      <span
                        className={cn(
                          isAccent ? "text-rose-200" : "text-stone-100",
                        )}
                      >
                        {civilian.fileCode}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 font-ui text-[9px] tracking-[0.4em]",
                        isAccent
                          ? "border-rose-400/45 text-rose-200"
                          : "border-white/25 text-stone-100/85",
                      )}
                    >
                      <ArchiveInlineIcon iconKey="view" size={11} />
                      View
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 bg-linear-to-t from-black via-black/85 to-transparent px-4 pb-4 pt-16 text-stone-100">
                    <h3 className="font-heading text-xl font-bold tracking-wide text-white md:text-2xl">
                      {civilian.name}
                    </h3>
                    {civilian.description ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-300">
                        {civilian.description}
                      </p>
                    ) : null}
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
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {mounted && activeItem
        ? createPortal(
            <div
              className="fixed inset-0 z-90 bg-black/95"
              onClick={() => setActiveIndex(null)}
            >
              <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-5 lg:p-8">
                <div className="pointer-events-none absolute left-3 top-3 right-3 z-1 flex justify-end sm:left-5 sm:top-5 sm:right-5 lg:left-8 lg:top-8 lg:right-8">
                  <button
                    type="button"
                    aria-label="Close preview"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveIndex(null);
                    }}
                    className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-md border border-white/15 bg-stone-950 text-white transition-colors hover:border-white/30 hover:bg-stone-900"
                  >
                    <ArchiveInlineIcon iconKey="close" size={20} />
                  </button>
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-3 z-1 hidden items-center sm:flex lg:left-8">
                  <button
                    type="button"
                    aria-label="Previous image"
                    disabled={!canGoPrev}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (canGoPrev) setActiveIndex((value) => value - 1);
                    }}
                    className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-md border border-white/15 bg-stone-950 text-white transition-colors hover:border-white/30 hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArchiveInlineIcon iconKey="previous" size={20} />
                  </button>
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-3 z-1 hidden items-center sm:flex lg:right-8">
                  <button
                    type="button"
                    aria-label="Next image"
                    disabled={!canGoNext}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (canGoNext) setActiveIndex((value) => value + 1);
                    }}
                    className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-md border border-white/15 bg-stone-950 text-white transition-colors hover:border-white/30 hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArchiveInlineIcon iconKey="next" size={20} />
                  </button>
                </div>

                <div
                  className="relative z-2 flex max-h-full w-full max-w-[min(92vw,96rem)] flex-col items-center justify-center gap-4"
                  onClick={(event) => event.stopPropagation()}
                >
                  <img
                    src={activeItem.photo}
                    alt={activeItem.name}
                    draggable={false}
                    className="max-h-[calc(100dvh-10rem)] w-auto max-w-full select-none object-contain"
                  />

                  <div className="flex w-full max-w-3xl items-start justify-between gap-4 rounded-md border border-white/10 bg-stone-950 px-4 py-3 text-stone-100">
                    <div className="min-w-0">
                      <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
                        {activeItem.fileCode}
                      </p>
                      <p className="mt-1 font-heading text-base font-bold tracking-wide text-white">
                        {activeItem.name}
                      </p>
                      {activeItem.description ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-stone-300">
                          {activeItem.description}
                        </p>
                      ) : null}
                    </div>
                    <p className="shrink-0 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
                      {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                      {String(items.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
