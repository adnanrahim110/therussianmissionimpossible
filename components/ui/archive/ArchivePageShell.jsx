import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArchiveBreadcrumbs } from "@/components/ui/archive/ArchiveBreadcrumbs";
import {
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";
import { ArchiveStatList } from "@/components/ui/archive/ArchiveStatList";
import { highlightWords } from "@/lib/highlight";
import { cn } from "@/lib/utils";

function ShellBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 85%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

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
  noSpacing = false,
}) {
  return (
    <div className={cn("relative", className)}>
      <section className="relative overflow-hidden border-b border-white/10 pt-28 md:pt-36 lg:pt-40">
        <ShellBackdrop />
        <Container className="relative z-10 pb-14 md:pb-20">
          <ArchiveBreadcrumbs items={breadcrumbs} />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.7fr)] xl:items-start">
            <div>
              {eyebrow || iconKey ? (
                <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.32em]">
                  {iconKey ? (
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] border border-rose-500/40 bg-rose-500/8 text-rose-200">
                      <ArchiveInlineIcon iconKey={iconKey} size={14} />
                    </span>
                  ) : null}
                  {eyebrow ? (
                    <span className="font-medium text-rose-200">{eyebrow}</span>
                  ) : null}
                  <span aria-hidden="true" className="h-px w-10 bg-white/15" />
                  <span className="text-stone-400">Declassified</span>
                </div>
              ) : null}

              <h1 className="mt-5 font-heading text-4xl font-bold leading-[0.95] text-white md:text-5xl lg:text-6xl">
                {highlightWords(title)}
              </h1>

              {summary ? (
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
                  {summary}
                </p>
              ) : null}
              {detail ? (
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-300 md:text-lg">
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
        {noSpacing ? (
          children
        ) : (
          <Container className="relative z-10 space-y-10 py-12 md:py-20 lg:space-y-20 lg:py-28">
            {children}
          </Container>
        )}
      </div>
    </div>
  );
}
