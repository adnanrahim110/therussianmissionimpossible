"use client";

export function DossierHeader({ code, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="crosshair-marker scale-75 opacity-70" />
        <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
          {code}
        </span>
      </div>
      <h2 className="mt-6 font-heading text-5xl leading-[0.9] text-stone-50 md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
