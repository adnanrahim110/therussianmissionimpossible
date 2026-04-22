import { ArchiveIconBadge } from "@/components/ui/archive/ArchiveIcons";
import { cn } from "@/lib/utils";

const toneClasses = {
  steel:
    "border-[color:var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-panel),var(--surface-panel-strong))] text-[color:var(--text-primary)] shadow-[0_24px_80px_rgba(6,12,18,0.3)]",
  mist:
    "border-[color:var(--border-strong)] bg-[linear-gradient(180deg,var(--surface-panel-alt),var(--surface-panel-alt-strong))] text-[color:var(--text-primary)] shadow-[0_24px_80px_rgba(6,12,18,0.24)]",
  ghost:
    "border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] text-[color:var(--text-primary)] shadow-[0_20px_55px_rgba(6,12,18,0.18)]",
};

export function ArchivePanel({
  as: Component = "article",
  eyebrow,
  iconKey,
  title,
  summary,
  children,
  className,
  tone = "steel",
  compact = false,
  ...props
}) {
  return (
    <Component
      {...props}
      className={cn(
        "relative overflow-hidden rounded-[28px] border backdrop-blur-xl",
        compact ? "p-5 md:p-6" : "p-6 md:p-8",
        toneClasses[tone] ?? toneClasses.steel,
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 26%), linear-gradient(180deg, rgba(242,13,13,0.07), transparent 42%)",
        }}
      />
      <div className="relative">
        {eyebrow || iconKey ? (
          <div className="flex items-center gap-3">
            {iconKey ? (
              <ArchiveIconBadge
                iconKey={iconKey}
                size={compact ? 16 : 18}
                className={compact ? "h-10 w-10 rounded-[14px]" : ""}
              />
            ) : null}
            {eyebrow ? (
              <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
                {eyebrow}
              </p>
            ) : null}
          </div>
        ) : null}
        {title ? (
          <h3
            className={cn(
              "font-heading text-[color:var(--text-strong)]",
              compact
                ? eyebrow || iconKey
                  ? "archive-title-panel-compact mt-3"
                  : "archive-title-panel-compact"
                : eyebrow || iconKey
                  ? "archive-title-panel mt-4"
                  : "archive-title-panel",
            )}
          >
            {title}
          </h3>
        ) : null}
        {summary ? (
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-soft)] md:text-base">
            {summary}
          </p>
        ) : null}
        {children ? <div className={summary ? "mt-6" : title || eyebrow ? "mt-5" : ""}>{children}</div> : null}
      </div>
    </Component>
  );
}
