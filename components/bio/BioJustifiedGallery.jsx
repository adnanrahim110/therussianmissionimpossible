"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GAP_PX = 12;
const MAX_ITEMS_PER_ROW = 3;

function getTargetRowHeight(containerWidth) {
  if (containerWidth < 640) return 210;
  if (containerWidth < 1024) return 260;
  return 320;
}

function buildRows(photos, dimensions, containerWidth) {
  if (!containerWidth || photos.length === 0) return [];

  const targetHeight = getTargetRowHeight(containerWidth);
  const minHeight = 160;
  const maxHeight = 520;

  const rows = [];
  let current = [];
  let ratioSum = 0;

  photos.forEach((photo, index) => {
    const dimension = dimensions[photo.src];
    const ratio = dimension ? dimension.width / dimension.height : 1;

    current.push({ photo, ratio });
    ratioSum += ratio;

    const gapWidth = GAP_PX * (current.length - 1);
    const estimatedHeight = (containerWidth - gapWidth) / ratioSum;
    const shouldCloseRow =
      estimatedHeight <= targetHeight ||
      current.length >= MAX_ITEMS_PER_ROW ||
      index === photos.length - 1;

    if (!shouldCloseRow) return;

    const safeHeight = Math.min(
      maxHeight,
      Math.max(minHeight, estimatedHeight),
    );
    const rowWidthFromItems = safeHeight * ratioSum + gapWidth;
    const stretch = rowWidthFromItems ? containerWidth / rowWidthFromItems : 1;

    const items = current.map((item) => {
      const width = Math.max(
        120,
        Math.round(item.ratio * safeHeight * stretch),
      );
      const height = Math.max(120, Math.round(safeHeight * stretch));

      return {
        ...item,
        width,
        height,
      };
    });

    rows.push(items);
    current = [];
    ratioSum = 0;
  });

  return rows;
}

export function BioJustifiedGallery({ photos }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dimensions, setDimensions] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  const canGoPrev = activeIndex !== null && activeIndex > 0;
  const canGoNext = activeIndex !== null && activeIndex < photos.length - 1;

  const handleClose = () => setActiveIndex(null);
  const handlePrev = () => {
    if (!canGoPrev) return;
    setActiveIndex((value) => value - 1);
  };
  const handleNext = () => {
    if (!canGoNext) return;
    setActiveIndex((value) => value + 1);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = Math.floor(entry.contentRect.width);
      setContainerWidth((prev) => (prev === width ? prev : width));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    photos.forEach((photo) => {
      if (dimensions[photo.src]) return;

      const img = new window.Image();
      img.onload = () => {
        if (cancelled || !img.naturalWidth || !img.naturalHeight) return;

        setDimensions((prev) => {
          if (prev[photo.src]) return prev;

          return {
            ...prev,
            [photo.src]: {
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
          };
        });
      };
      img.src = photo.src;
    });

    return () => {
      cancelled = true;
    };
  }, [photos, dimensions]);

  useEffect(() => {
    if (activeIndex === null || typeof window === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlTouchAction = document.documentElement.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.touchAction = "none";

    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.documentElement.style.touchAction = previousHtmlTouchAction;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, canGoNext, canGoPrev]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rows = useMemo(
    () => buildRows(photos, dimensions, containerWidth),
    [photos, dimensions, containerWidth],
  );

  return (
    <div ref={containerRef} className="mt-8 space-y-3 md:space-y-4">
      {rows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex w-full items-start gap-3 md:gap-4"
          style={{ minHeight: row[0]?.height ?? 0 }}
        >
          {row.map(({ photo, width, height }) => (
            <article
              key={photo.src}
              className="group archive-shell relative shrink-0 overflow-hidden rounded-xl cursor-zoom-in"
              style={{ width, height }}
              role="button"
              tabIndex={0}
              onClick={() =>
                setActiveIndex(
                  photos.findIndex((item) => item.src === photo.src),
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(
                    photos.findIndex((item) => item.src === photo.src),
                  );
                }
              }}
            >
              <img
                src={photo.src}
                alt={photo.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <h2 className="font-heading text-lg leading-[0.92] text-white sm:text-xl font-bold capitalize">
                  {photo.name}
                </h2>
              </div>
              {photo.tagline && (
                <p className="absolute top-2 left-0 mx-2 p-1.5 rounded-md bg-black/30 border border-black/20 backdrop-blur-sm text-xs leading-tight text-white sm:text-sm">
                  {photo.tagline}
                </p>
              )}
            </article>
          ))}
        </div>
      ))}

      {mounted &&
        activeIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/92 p-2 sm:p-4"
            style={{ zIndex: 2147483647 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={handleClose}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={handleClose}
              className="absolute right-3 top-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white shadow-[0_6px_24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 hover:border-white/55 hover:bg-black/82 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent sm:right-4 sm:top-4"
              style={{ zIndex: 2147483647 }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6 18 18" />
                <path d="M18 6 6 18" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                handlePrev();
              }}
              disabled={!canGoPrev}
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white transition-all duration-300 hover:scale-105 hover:border-white/45 hover:bg-black/78 focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-black/30 disabled:text-white/35 disabled:hover:scale-100 disabled:hover:border-white/15 disabled:hover:bg-black/30 sm:left-4"
              style={{ zIndex: 2147483647 }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                handleNext();
              }}
              disabled={!canGoNext}
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white transition-all duration-300 hover:scale-105 hover:border-white/45 hover:bg-black/78 focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-black/30 disabled:text-white/35 disabled:hover:scale-100 disabled:hover:border-white/15 disabled:hover:bg-black/30 sm:right-4"
              style={{ zIndex: 2147483647 }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>

            <div
              className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-center overflow-hidden sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="inline-flex max-w-full flex-col items-stretch">
                <img
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].name}
                  className="block max-h-[calc(100dvh-6.5rem)] max-w-full object-contain sm:max-h-[calc(100dvh-7.5rem)]"
                />
                <div className="mt-3 w-full rounded-lg border border-white/15 bg-black/55 px-4 py-3 backdrop-blur-sm">
                  <p className="font-heading text-xl leading-none text-white sm:text-2xl">
                    {photos[activeIndex].name}
                  </p>
                  {photos[activeIndex].tagline && (
                    <p className="mt-2 text-sm leading-relaxed text-stone-100 sm:text-base">
                      {photos[activeIndex].tagline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
