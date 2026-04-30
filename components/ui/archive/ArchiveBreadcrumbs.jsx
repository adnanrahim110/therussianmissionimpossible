import Link from "next/link";

import {
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";

export function ArchiveBreadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap items-center gap-2 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-400"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const iconKey = item.iconKey ?? getRouteIconKey(item.href);

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-stone-300 transition-colors hover:text-white"
              >
                {iconKey ? (
                  <ArchiveInlineIcon
                    iconKey={iconKey}
                    size={14}
                    className="text-stone-400"
                  />
                ) : null}
                {item.label}
              </Link>
            ) : (
              <span
                className={`inline-flex items-center gap-2 ${
                  isLast ? "text-white" : ""
                }`}
              >
                {iconKey && !isLast ? (
                  <ArchiveInlineIcon
                    iconKey={iconKey}
                    size={14}
                    className="text-stone-400"
                  />
                ) : null}
                {item.label}
              </span>
            )}
            {!isLast ? (
              <ArchiveInlineIcon
                iconKey="breadcrumb"
                size={14}
                className="text-stone-500"
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
