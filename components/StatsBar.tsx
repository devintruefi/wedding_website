interface StatsBarProps {
  stats: {
    total: number;
    devin: number;
    poonam: number;
    joint: number;
    openOrFlagged: number;
  };
}

interface StatProps {
  value: number;
  label: string;
  accent?: string;
  hint?: string;
}

function Stat({ value, label, accent, hint }: StatProps) {
  return (
    <div className="group relative flex flex-col items-center justify-center gap-1.5 px-3 py-5 sm:px-6 sm:py-6 transition-colors duration-300 hover:bg-cream-bright/60">
      <span
        className="block h-[3px] w-7 rounded-full transition-all duration-300 group-hover:w-10"
        style={{ background: accent ?? "rgba(107,95,78,0.45)" }}
        aria-hidden
      />
      <span className="tnum font-serif text-[2rem] sm:text-[2.75rem] text-forest-deep leading-none transition-transform duration-300 group-hover:-translate-y-0.5">
        {value}
      </span>
      <span className="font-sans text-[0.55rem] sm:text-[0.65rem] tracking-ultra-wide text-slate-warm uppercase text-center">
        {label}
      </span>
      {hint && (
        <span className="hidden sm:block font-serif italic text-[0.65rem] text-slate-warm/70 mt-0.5">
          {hint}
        </span>
      )}
    </div>
  );
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="relative border-y border-taupe/40 bg-cream-warm/70">
      {/* Gold hairline accent along the top edge */}
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto grid max-w-6xl grid-cols-3 sm:grid-cols-5 divide-x divide-taupe/30">
        <Stat value={stats.total} label="Total Rooms" accent="#22332A" />
        <Stat value={stats.devin} label="Devin's Side" accent="#3B5871" />
        <Stat value={stats.poonam} label="Poonam's Side" accent="#A8527A" />
        <Stat value={stats.joint} label="Joint" accent="#B98C3F" hint="The couple" />
        <Stat
          value={stats.openOrFlagged}
          label="Open / Flagged"
          accent="#8A8273"
          hint="Needs attention"
        />
      </div>
    </section>
  );
}
