export function OperationBriefingCard() {
  return (
    <div className="pointer-events-none absolute right-4 top-4 z-10 w-[15.5rem] rounded-xl border border-white/10 bg-black/55 px-3 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-md max-sm:right-3 max-sm:top-[18.25rem] max-sm:w-[15.5rem]">
      <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-red-300/80">
        Operation briefing
      </p>

      <p className="mt-1.5 text-[11px] leading-4 text-stone-300">
        Low electric-vehicle movement through a cramped gas pipeline.
      </p>
    </div>
  );
}
