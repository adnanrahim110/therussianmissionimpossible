export function ArchiveStatList({ items = [], light = false }) {
  if (!items.length) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={`${item.label}-${item.value}`}
          className={`rounded-[22px] border px-4 py-4 ${
            light
              ? "border-[color:var(--border-strong)] bg-[linear-gradient(180deg,var(--surface-panel-alt),var(--surface-panel-alt-strong))] text-[color:var(--text-primary)]"
              : "border-[color:var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-chip-strong),var(--surface-chip))] text-[color:var(--text-primary)]"
          }`}
        >
          <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
            {item.label}
          </p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--text-strong)]">
            {item.value}
          </p>
        </article>
      ))}
    </div>
  );
}
