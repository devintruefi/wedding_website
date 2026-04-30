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
}

function Stat({ value, label, accent }: StatProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-5 sm:px-6">
      {accent && (
        <span
          className="block h-1 w-8 rounded-full"
          style={{ background: accent }}
          aria-hidden
        />
      )}
      <span className="font-serif text-3xl sm:text-4xl text-forest-deep">
        {value}
      </span>
      <span className="font-sans text-[0.65rem] sm:text-[0.7rem] tracking-ultra-wide text-slate-warm uppercase text-center">
        {label}
      </span>
    </div>
  );
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="border-y border-taupe/40 bg-cream-warm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-5 divide-x divide-taupe/30">
        <Stat value={stats.total} label="Total Rooms" />
        <Stat value={stats.devin} label="Devin's Side" accent="#3E5C76" />
        <Stat value={stats.poonam} label="Poonam's Side" accent="#A8527A" />
        <Stat value={stats.joint} label="Joint" accent="#C9A040" />
        <Stat value={stats.openOrFlagged} label="Open / Flagged" />
      </div>
    </section>
  );
}
