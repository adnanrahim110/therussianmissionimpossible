export function ArchiveStatList({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={`${item.label}-${item.value}`}
          style={{
            backgroundImage:
              "linear-gradient(180deg, #0d1014 0%, #070809 100%)",
          }}
          className="group/stat relative overflow-hidden rounded-md border border-white/10 px-4 py-4 text-stone-100 transition-[border-color] duration-500 hover:border-white/25"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <p className="relative font-ui text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400">
            {item.label}
          </p>
          <p className="relative mt-2 font-ui text-lg font-bold text-white">
            {item.value}
          </p>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-[0.3] origin-left bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/stat:scale-x-100"
          />
        </article>
      ))}
    </div>
  );
}
