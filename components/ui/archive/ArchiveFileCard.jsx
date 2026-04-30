import Link from "next/link";

import {
  ArchiveInlineIcon,
  getArchiveIcon,
} from "@/components/ui/archive/ArchiveIcons";
import { cn } from "@/lib/utils";

export function ArchiveFileCard({ file, priority = false }) {
  const WatermarkIcon = getArchiveIcon(file.iconKey);

  return (
    <Link
      href={file.href}
      style={{
        backgroundImage: priority
          ? "radial-gradient(circle at top right, rgba(242,13,13,0.14), transparent 60%), linear-gradient(180deg, #0e0708 0%, #070708 100%)"
          : "linear-gradient(180deg, #0d1014 0%, #070809 100%)",
      }}
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-md border text-stone-100 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        "border-white/10 hover:-translate-y-0.5 hover:border-white/25",
        priority &&
          "border-rose-500/30 hover:border-rose-400/55 hover:shadow-[0_24px_50px_-30px_rgba(242,13,13,0.45)]",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {WatermarkIcon ? (
        <WatermarkIcon
          aria-hidden="true"
          stroke={1.2}
          className={cn(
            "pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.04]",
            priority
              ? "text-rose-500/[0.07] group-hover/card:text-rose-400/[0.12]"
              : "text-white/[0.04] group-hover/card:text-white/[0.07]",
          )}
        />
      ) : null}

      <div className="relative z-[2] flex h-full flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              "font-ui text-[10px] font-medium uppercase tracking-[0.32em]",
              priority ? "text-rose-300/85" : "text-stone-400",
            )}
          >
            {file.fileCode}
          </span>
          <span
            className={cn(
              "font-ui text-[9px] uppercase tracking-[0.28em]",
              priority ? "text-rose-200/80" : "text-stone-500",
            )}
          >
            {file.status}
          </span>
        </div>

        <h3 className="mt-6 font-heading text-2xl font-bold tracking-wide text-white md:text-[1.7rem]">
          {file.title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-stone-300 md:text-[0.95rem]">
          {file.summary}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <span
            className={cn(
              "font-ui text-[10px] uppercase tracking-[0.28em]",
              priority ? "text-rose-200" : "text-stone-300",
            )}
          >
            Open file
          </span>
          <ArchiveInlineIcon
            iconKey="next"
            size={16}
            className={cn(
              "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-1",
              priority ? "text-rose-200" : "text-stone-300",
            )}
          />
        </div>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-[0.4] origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-x-100",
          priority
            ? "bg-linear-to-r from-rose-500/0 via-rose-400/80 to-rose-500/0"
            : "bg-linear-to-r from-transparent via-white/30 to-transparent",
        )}
      />
    </Link>
  );
}
