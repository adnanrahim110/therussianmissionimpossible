import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import {
  ArchiveIconBadge,
  getRouteIconKey,
} from "./ArchiveIcons";
import { ArchiveBreadcrumbs } from "./ArchiveBreadcrumbs";
import { ArchiveStatList } from "./ArchiveStatList";

export function ArchivePageShell({
  breadcrumbs = [],
  iconKey,
  eyebrow,
  title,
  summary,
  detail,
  metrics = [],
  actions = [],
  aside,
  children,
  className,
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <section className="relative overflow-hidden border-b border-(--border-soft) pt-28 md:pt-36 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 archive-page-glow" />
        <div className="pointer-events-none absolute inset-0 archive-grid-overlay opacity-70" />

        <Container className="relative z-10 pb-14 md:pb-20">
          <ArchiveBreadcrumbs items={breadcrumbs} />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.7fr)] xl:items-start">
            <div>
              {eyebrow || iconKey ? (
                <div className="flex items-center gap-3">
                  {iconKey ? (
                    <ArchiveIconBadge
                      iconKey={iconKey}
                      tone="accent"
                      className="h-12 w-12 rounded-[18px]"
                      size={20}
                    />
                  ) : null}
                  {eyebrow ? (
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-(--text-muted)">
                      {eyebrow}
                    </p>
                  ) : null}
                </div>
              ) : null}
              <h1 className="archive-title-page mt-5 font-heading text-(--text-strong)">
                {title}
              </h1>
              {summary ? (
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-(--text-soft) md:text-xl">
                  {summary}
                </p>
              ) : null}
              {detail ? (
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-(--text-muted) md:text-lg">
                  {detail}
                </p>
              ) : null}

              {actions.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {actions.map((action) => (
                    <Button
                      key={`${action.href}-${action.label}`}
                      href={action.href}
                      variant={action.variant ?? "signal"}
                      size={action.size ?? "md"}
                      iconKey={action.iconKey ?? getRouteIconKey(action.href)}
                      iconPosition={action.iconPosition ?? "left"}
                      className={action.className}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>

            {aside ? <div>{aside}</div> : null}
          </div>

          {metrics.length ? (
            <div className="mt-10">
              <ArchiveStatList items={metrics} />
            </div>
          ) : null}
        </Container>
      </section>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 archive-grid-overlay opacity-25" />
        <Container className="relative z-10 section-padding space-y-10 lg:space-y-28">
          {children}
        </Container>
      </div>
    </div>
  );
}
