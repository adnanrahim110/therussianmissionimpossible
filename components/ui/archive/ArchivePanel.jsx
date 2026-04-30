import { ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { highlightWords } from "@/lib/highlight";
import { cn } from "@/lib/utils";

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
      style={{
        backgroundImage:
          tone === "ghost"
            ? "linear-gradient(165deg, rgba(10,10,12,0.92), rgba(5,5,7,0.98))"
            : tone === "mist"
              ? "linear-gradient(180deg, rgba(20,22,28,0.96), rgba(10,12,16,0.98))"
              : "linear-gradient(180deg, #0d1014 0%, #070809 100%)",
      }}
      className={cn(
        "group/panel relative overflow-hidden rounded-md border border-white/10 text-stone-100 transition-[border-color] duration-500 hover:border-white/20",
        compact ? "p-5" : "p-6 md:p-7",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative grid gap-3">
        {eyebrow || iconKey ? (
          <div className="flex items-center gap-2.5 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
            {iconKey ? (
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] border border-white/15 bg-white/[0.02] text-stone-300">
                <ArchiveInlineIcon iconKey={iconKey} size={14} />
              </span>
            ) : null}
            {eyebrow ? <span>{eyebrow}</span> : null}
          </div>
        ) : null}

        {title ? (
          <h3
            className={cn(
              "font-heading font-bold tracking-wide text-white",
              compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
            )}
          >
            {highlightWords(title)}
          </h3>
        ) : null}

        {summary ? (
          <p className="text-sm leading-relaxed text-stone-300 md:text-base">
            {summary}
          </p>
        ) : null}

        {children ? <div>{children}</div> : null}
      </div>
    </Component>
  );
}
