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
    <div className="flex flex-col items-center justify-center gap-1.5 px-3 py-4 sm:px-6 sm:py-5">
      {accent && (
        <span
          className="block h-1 w-8 rounded-full"
          style={{ background: accent }}
          aria-hidden
        />
      )}
      <span className="font-serif text-3xl sm:text-4xl text-forest-deep leading-none">
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
    <section className="border-y border-taupe/40 bg-cream-warm/70">
      <div className="mx-auto grid max-w-6xl grid-cols-3 sm:grid-cols-5 divide-x divide-taupe/30">
        <Stat value={stats.total} label="Total Rooms" />
        <Stat
          value={stats.devin}
          label="Devin's Side"
          accent="#3B5871"
        />
        <Stat
          value={stats.poonam}
          label="Poonam's Side"
          accent="#A8527A"
        />
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
