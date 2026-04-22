import { ArchiveIconBadge } from "@/components/ui/archive/ArchiveIcons";
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
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {iconKey ? <ArchiveIconBadge iconKey={iconKey} /> : null}
          {eyebrow ? (
            <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
              {eyebrow}
            </p>
          ) : null}
        </div>
      ) : null}
      {title ? (
        <h2 className="archive-title-section mt-4 font-heading text-[color:var(--text-strong)]">
          {title}
        </h2>
      ) : null}
      {summary ? (
        <p className="mt-4 text-base leading-relaxed text-[color:var(--text-soft)] md:text-lg">
          {summary}
        </p>
      ) : null}
    </header>
  );
}
