export function PipelineStatsCard() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex overflow-hidden rounded-xl border border-white/10 bg-black/58 shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-md max-sm:left-3 max-sm:right-3 max-sm:bottom-3">
      <div className="border-r border-white/10 px-4 py-3 max-sm:flex-1 max-sm:px-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-stone-400">
          Diameter
        </p>

        <div className="mt-1 flex items-end gap-1.5">
          <span className="font-heading text-3xl font-black leading-none text-white max-sm:text-2xl">
            1.4
          </span>
          <span className="pb-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-stone-300">
            m
          </span>
        </div>
      </div>

      <div className="px-4 py-3 max-sm:flex-1 max-sm:px-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-stone-400">
          Pipeline
        </p>

        <div className="mt-1 flex items-end gap-1.5">
          <span className="font-heading text-3xl font-black leading-none text-white max-sm:text-2xl">
            15
          </span>
          <span className="pb-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-stone-300">
            km
          </span>
        </div>
      </div>
    </div>
  );
}
