import {
  ArchiveIconBadge,
  ArchiveInlineIcon,
} from "@/components/ui/archive/ArchiveIcons";
import Link from "next/link";

export function ArchiveFileCard({ file, priority = false }) {
  return (
    <Link
      href={file.href}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-6 transition-transform duration-300 hover:-translate-y-1 ${
        priority
          ? "border-[rgba(242,13,13,0.28)] bg-[linear-gradient(180deg,rgba(28,42,53,0.98),rgba(16,26,33,0.99))] text-(--text-primary) shadow-[0_30px_90px_rgba(8,16,22,0.34)]"
          : "border-(--border-soft) bg-[linear-gradient(180deg,var(--surface-panel-alt),var(--surface-panel-alt-strong))] text-(--text-primary) shadow-[0_24px_60px_rgba(8,16,22,0.2)]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.16), transparent 28%), linear-gradient(180deg, rgba(242,13,13,0.09), transparent 42%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div>
              <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-(--text-muted)">
                {file.fileCode}
              </p>
              <h3 className="archive-title-card mt-3 font-heading text-(--text-strong)">
                {file.title}
              </h3>
            </div>
          </div>
          <span
            className={`rounded-full border px-3 py-1 font-ui text-[10px] uppercase tracking-[0.24em] ${
              priority
                ? "border-[rgba(255,255,255,0.14)] text-(--text-soft)"
                : "border-(--border-strong) text-(--text-muted)"
            }`}
          >
            {file.status}
          </span>
        </div>

        <div className="mt-5 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--border-soft) bg-(--surface-panel-alt) px-3 py-2 font-ui text-[10px] uppercase tracking-[0.24em] text-(--text-muted)">
            <ArchiveInlineIcon
              iconKey={file.iconKey}
              size={14}
              className="text-(--text-soft)"
            />
            {file.label}
          </div>
          <p className="text-sm leading-relaxed text-(--text-soft) md:text-base">
            {file.summary}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <p
            className={`font-ui text-[11px] uppercase tracking-[0.28em] ${
              priority ? "text-accent" : "text-(--text-muted)"
            }`}
          >
            {file.accent}
          </p>
          <span className="inline-flex items-center whitespace-nowrap gap-2 font-ui text-[10px] uppercase tracking-[0.24em] text-(--text-soft) transition-colors group-hover:text-(--text-strong)">
            Open file
            <ArchiveInlineIcon
              iconKey="next"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
