import {
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";
import Link from "next/link";

export function ArchiveBreadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-muted)]"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const iconKey = item.iconKey ?? getRouteIconKey(item.href);

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--color-accent)]"
              >
                {iconKey ? (
                  <ArchiveInlineIcon
                    iconKey={iconKey}
                    size={14}
                    className="text-[color:var(--text-soft)]"
                  />
                ) : null}
                {item.label}
              </Link>
            ) : (
              <span
                className={`inline-flex items-center gap-2 ${
                  isLast ? "text-[color:var(--text-soft)]" : ""
                }`}
              >
                {iconKey && !isLast ? (
                  <ArchiveInlineIcon
                    iconKey={iconKey}
                    size={14}
                    className="text-[color:var(--text-soft)]"
                  />
                ) : null}
                {item.label}
              </span>
            )}
            {!isLast && (
              <ArchiveInlineIcon
                iconKey="breadcrumb"
                size={14}
                className="text-[color:var(--border-strong)]"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
