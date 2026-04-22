"use client";

import {
  ArchiveIconBadge,
  ArchiveInlineIcon,
} from "@/components/ui/archive/ArchiveIcons";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GAP_PX = 16;
const MAX_ITEMS_PER_ROW = 3;
const MIN_HEIGHT = 150;
const MAX_HEIGHT = 340;

function getTargetRowHeight(containerWidth) {
  if (containerWidth < 640) return 164;
  if (containerWidth < 1024) return 210;
  return 250;
}

function buildRows(items, containerWidth) {
  if (!containerWidth || !items.length) return [];

  const rows = [];
  const targetHeight = getTargetRowHeight(containerWidth);
  let current = [];
  let ratioSum = 0;

  items.forEach((item, index) => {
    const ratio = item.width / item.height;
    current.push({ ...item, ratio });
    ratioSum += ratio;

    const gapWidth = GAP_PX * (current.length - 1);
    const estimatedHeight = (containerWidth - gapWidth) / ratioSum;
    const isLast = index === items.length - 1;
    const shouldClose =
      estimatedHeight <= targetHeight ||
      current.length >= MAX_ITEMS_PER_ROW ||
      isLast;

    if (!shouldClose) return;

    const baseHeight = Math.min(
      MAX_HEIGHT,
      Math.max(MIN_HEIGHT, estimatedHeight),
    );
    const rowWidth = baseHeight * ratioSum + gapWidth;
    const stretch = rowWidth ? containerWidth / rowWidth : 1;
    const finalHeight = Math.max(MIN_HEIGHT, Math.round(baseHeight * stretch));

    const preparedItems = current.map((entry) => ({
      ...entry,
      renderHeight: finalHeight,
      renderWidth: Math.max(110, Math.round(entry.ratio * finalHeight)),
    }));

    const usedWidth =
      preparedItems.reduce((sum, entry) => sum + entry.renderWidth, 0) +
      gapWidth;
    const delta = containerWidth - usedWidth;

    if (preparedItems.length && delta !== 0) {
      const lastItem = preparedItems[preparedItems.length - 1];
      lastItem.renderWidth = Math.max(110, lastItem.renderWidth + delta);
    }

    rows.push(preparedItems);
    current = [];
    ratioSum = 0;
  });

  return rows;
}

function IconButton({
  label,
  onClick,
  disabled = false,
  className = "",
  iconKey,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(180deg,rgba(14,24,31,0.9),rgba(7,13,18,0.94))] text-(--text-strong) shadow-[0_18px_45px_rgba(0,0,0,0.32)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[rgba(242,13,13,0.34)] hover:bg-[linear-gradient(180deg,rgba(25,38,48,0.96),rgba(10,18,24,0.98))] hover:text-white active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:border-white/18 ${className}`}
    >
      <ArchiveInlineIcon iconKey={iconKey} size={20} />
    </button>
  );
}

export function ArchiveMapGallery({ items = [] }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setContainerWidth(Math.floor(entry.contentRect.width));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const rows = useMemo(
    () => buildRows(items, containerWidth),
    [containerWidth, items],
  );

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const canGoPrev = activeIndex !== null && activeIndex > 0;
  const canGoNext = activeIndex !== null && activeIndex < items.length - 1;

  return (
    <>
      <div ref={containerRef} className="space-y-4">
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex w-full items-start gap-4"
            style={{ minHeight: row[0]?.renderHeight ?? 0 }}
          >
            {row.map((item) => {
              const absoluteIndex = items.findIndex(
                (entry) => entry.id === item.id,
              );

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(absoluteIndex)}
                  className="group relative shrink-0 overflow-hidden rounded-3xl border border-(--border-soft) bg-[linear-gradient(180deg,var(--surface-panel),var(--surface-panel-strong))] shadow-[0_24px_70px_rgba(6,12,18,0.22)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[rgba(242,13,13,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-(--surface-canvas)"
                  style={{
                    width: item.renderWidth,
                    height: item.renderHeight,
                  }}
                  aria-label={`Preview ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,19,0.08),rgba(7,14,19,0.62))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(180deg,rgba(14,24,31,0.9),rgba(9,16,22,0.94))] text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:scale-100 group-hover:translate-y-0 translate-y-2">
                      <ArchiveInlineIcon iconKey="view" size={24} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {mounted && activeItem
        ? createPortal(
            <div
              className="fixed inset-0 z-90 bg-[rgba(4,8,12,0.92)] backdrop-blur-md"
              onClick={() => setActiveIndex(null)}
            >
              <div className="absolute inset-0 archive-grid-overlay opacity-15" />

              <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-5 lg:p-8">
                <div className="pointer-events-none absolute left-3 top-3 right-3 z-1 flex justify-end sm:left-5 sm:top-5 sm:right-5 lg:left-8 lg:top-8 lg:right-8">
                  <div className="pointer-events-auto">
                    <IconButton
                      label="Close preview"
                      iconKey="close"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveIndex(null);
                      }}
                    />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-3 z-1 hidden items-center sm:flex lg:left-8">
                  <div className="pointer-events-auto">
                    <IconButton
                      label="Previous image"
                      iconKey="previous"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (canGoPrev) setActiveIndex((value) => value - 1);
                      }}
                      disabled={!canGoPrev}
                    />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-3 z-1 hidden items-center sm:flex lg:right-8">
                  <div className="pointer-events-auto">
                    <IconButton
                      label="Next image"
                      iconKey="next"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (canGoNext) setActiveIndex((value) => value + 1);
                      }}
                      disabled={!canGoNext}
                    />
                  </div>
                </div>

                <div
                  className="relative z-2 flex max-h-full w-full max-w-[min(92vw,96rem)] flex-col items-center justify-center gap-4"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    width={activeItem.width}
                    height={activeItem.height}
                    className="h-[calc(100dvh-8rem)] w-auto"
                    priority
                  />

                  <div className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-3xl border border-(--border-soft) bg-[linear-gradient(180deg,rgba(14,24,31,0.88),rgba(8,14,19,0.92))] px-4 py-3 text-(--text-primary) shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
                    <div className="flex min-w-0 items-center gap-3">
                      <ArchiveIconBadge
                        iconKey="gallery"
                        className="h-10 w-10 rounded-[14px]"
                        size={16}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-ui text-[10px] uppercase tracking-[0.28em] text-(--text-muted)">
                          {activeItem.type}
                        </p>
                        <p className="truncate text-sm text-(--text-strong) sm:text-base">
                          {activeItem.title}
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 font-ui text-[10px] uppercase tracking-[0.28em] text-(--text-muted)">
                      {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                      {String(items.length).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:hidden">
                    <IconButton
                      label="Previous image"
                      iconKey="previous"
                      onClick={() =>
                        canGoPrev && setActiveIndex((value) => value - 1)
                      }
                      disabled={!canGoPrev}
                    />
                    <IconButton
                      label="Next image"
                      iconKey="next"
                      onClick={() =>
                        canGoNext && setActiveIndex((value) => value + 1)
                      }
                      disabled={!canGoNext}
                    />
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
