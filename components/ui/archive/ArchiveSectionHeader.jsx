import { ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { highlightWords } from "@/lib/highlight";
import { cn } from "@/lib/utils";

export function ArchiveSectionHeader({
  eyebrow,
  iconKey,
  title,
  summary,
  className,
  align = "left",
}) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow || iconKey ? (
        <div
          className={cn(
            "flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.32em]",
            align === "center" && "justify-center",
          )}
        >
          {iconKey ? (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] border border-white/15 bg-white/[0.02] text-stone-300">
              <ArchiveInlineIcon iconKey={iconKey} size={14} />
            </span>
          ) : null}
          {eyebrow ? <span className="text-stone-300">{eyebrow}</span> : null}
          <span aria-hidden="true" className="h-px w-10 bg-white/15" />
        </div>
      ) : null}
      {title ? (
        <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
          {highlightWords(title)}
        </h2>
      ) : null}
      {summary ? (
        <p className="mt-4 text-base leading-relaxed text-stone-300 md:text-lg">
          {summary}
        </p>
      ) : null}
    </header>
  );
}
