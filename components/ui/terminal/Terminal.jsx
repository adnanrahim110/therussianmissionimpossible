import Link from "next/link";

import { cn } from "@/lib/utils";

const blockBase =
  "relative rounded-md border border-white/10 bg-stone-950 text-stone-100";

export function TerminalBlock({
  children,
  className,
  compact = false,
  scanline = true,
  as: Component = "article",
  ...props
}) {
  return (
    <Component
      {...props}
      className={cn(blockBase, compact ? "p-5" : "p-6", className)}
    >
      {scanline ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.6)_0_1px,transparent_1px_4px)] opacity-[0.05]"
        />
      ) : null}
      <div className="relative grid gap-3">{children}</div>
    </Component>
  );
}

const rowVariants = {
  default: "text-stone-100 text-sm",
  header: "text-green-500 text-[11px] tracking-[0.32em] font-medium uppercase",
  title: "text-white text-base md:text-lg tracking-wide",
  status: "text-accent text-sm tracking-wider",
  success: "text-green-500 text-sm tracking-wider",
  note: "text-stone-300 text-sm font-normal normal-case tracking-normal leading-relaxed",
};

const caretVariants = {
  default: "text-emerald-400/70",
  header: "text-stone-500",
  title: "text-emerald-400/80",
  status: "text-accent",
  note: "text-emerald-400/60",
};

export function TerminalRow({
  children,
  variant = "default",
  caret = ">",
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 font-ui",
        rowVariants[variant] ?? rowVariants.default,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("shrink-0 leading-tight", caretVariants[variant])}
      >
        {caret}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </div>
  );
}

export function TerminalDivider({ className }) {
  return (
    <div role="separator" className={cn("my-1 h-px bg-white/10", className)} />
  );
}

export function TerminalLink({
  href,
  index,
  title,
  meta,
  icon: Icon,
  accent = false,
  external = false,
  className,
}) {
  const Component = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      href={href}
      {...externalProps}
      className={cn(
        "group flex items-center gap-3 rounded-md border border-white/10 bg-black/40 px-4 py-3 font-ui text-sm text-stone-100 transition-colors hover:border-white/30 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
        accent &&
          "border-rose-500/30 hover:border-rose-400/60 hover:bg-rose-500/10",
        className,
      )}
    >
      {index ? (
        <span
          className={cn(
            "shrink-0 tracking-wider",
            accent ? "text-rose-300" : "text-stone-400",
          )}
        >
          {index}
        </span>
      ) : null}
      {Icon ? (
        <Icon
          className={cn(
            "size-4 shrink-0",
            accent ? "text-rose-300" : "text-emerald-400/80",
          )}
        />
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate tracking-wide text-white">{title}</span>
        {meta ? (
          <span className="mt-0.5 block truncate text-[11px] tracking-[0.18em] text-stone-400 normal-case">
            {meta}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "shrink-0 text-base transition-transform group-hover:translate-x-1",
          accent ? "text-rose-300" : "text-stone-300",
        )}
      >
        →
      </span>
    </Component>
  );
}
