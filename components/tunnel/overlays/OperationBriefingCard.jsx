export function OperationBriefingCard({
  stops = [],
  activeIndex = 0,
  progress = 0,
  onSelectStop,
}) {
  const activeStop = stops[activeIndex] ?? stops[0];

  if (!activeStop) return null;

  const activeProgress = Math.round(
    ((activeStop.progress ?? progress) || 0) * 100,
  );

  return (
    <aside className="pointer-events-auto absolute bottom-4 right-4 top-4 z-10 flex w-84 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-white/10 bg-black/70 shadow-[0_24px_80px_rgba(0,0,0,0.66)] backdrop-blur-md max-xl:w-76 max-lg:bottom-24 max-lg:top-auto max-lg:max-h-92 max-lg:w-[min(23rem,calc(100vw-1.5rem))] max-sm:right-3 max-sm:bottom-24">
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-red-300/80">
            Operation briefing
          </p>

          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-stone-400">
            {activeStop.eyebrow ?? `Stop ${activeStop.number}`}
          </span>
        </div>

        <h2 className="mt-3 text-xl font-black uppercase leading-none text-white">
          {activeStop.title}
        </h2>

        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
          {activeStop.type}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 scroll_thin">
        {activeStop.image ? (
          <div className="mb-4 overflow-hidden rounded-lg border border-white/10 bg-stone-950">
            <img
              src={activeStop.image}
              alt=""
              className="h-28 w-full object-cover opacity-[0.82]"
              loading="lazy"
            />
          </div>
        ) : null}

        <p className="text-sm leading-6 text-stone-200">
          {activeStop.summary ?? activeStop.caption}
        </p>

        <div className="mt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-stone-500">
            Tunnel stops
          </p>

          <div className="mt-2 divide-y divide-white/10">
            {stops.map((stop, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => onSelectStop?.(index)}
                  className="flex w-full items-start gap-3 py-2.5 text-left transition-colors hover:text-white"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[9px] ${
                      active
                        ? "border-red-300 bg-red-500 text-white"
                        : "border-white/20 bg-white/5 text-stone-400"
                    }`}
                  >
                    {stop.number}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block text-xs font-bold uppercase leading-4 ${
                        active ? "text-white" : "text-stone-300"
                      }`}
                    >
                      {stop.title}
                    </span>
                    <span className="block truncate font-mono text-[9px] uppercase tracking-[0.16em] text-stone-500">
                      {stop.type}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeStop.targetHref ? (
        <a
          href={activeStop.targetHref}
          className="border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-red-200 transition-colors hover:bg-white/5 hover:text-white"
        >
          {activeStop.targetLabel ?? "Open file"}
        </a>
      ) : null}
    </aside>
  );
}
