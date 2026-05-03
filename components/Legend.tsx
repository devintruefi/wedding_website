import { SIDE_ACCENT } from "@/lib/sides";

export function Legend() {
  return (
    <section className="mx-auto mt-12 sm:mt-16 max-w-5xl px-6 reveal">
      <div className="border-t border-taupe/40 pt-8">
        <p className="text-center font-sans text-[0.6rem] tracking-mega-wide uppercase text-copper mb-5">
          ✦ Legend
        </p>
        <div className="mx-auto grid max-w-3xl grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-center">
          <Item color={SIDE_ACCENT.Devin} label="Devin's side" />
          <Item color={SIDE_ACCENT.Poonam} label="Poonam's side" />
          <Item color={SIDE_ACCENT.Joint} label="Joint" />
          <SuiteItem label="Suite (forest + copper)" />
          <StripeItem label="Open / unassigned" />
          <FlagItem label="Flagged room" />
        </div>
        <p className="mt-7 text-center font-serif italic text-sm text-slate-warm/80">
          Rooms are placed top-down. Each lodge keeps its own column rhythm so a room
          on Floor 3 sits directly above its neighbor on Floor 2.
        </p>
      </div>
    </section>
  );
}

function Item({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 font-sans text-[0.7rem] tracking-wide uppercase text-slate-warm">
      <span
        className="inline-block h-3 w-3 rounded-sm"
        style={{ background: color }}
        aria-hidden
      />
      {label}
    </div>
  );
}

function SuiteItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 font-sans text-[0.7rem] tracking-wide uppercase text-slate-warm">
      <span
        className="inline-block h-3 w-3 rounded-sm border border-copper bg-forest"
        aria-hidden
      />
      {label}
    </div>
  );
}

function StripeItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 font-sans text-[0.7rem] tracking-wide uppercase text-slate-warm">
      <span
        className="stripe-open inline-block h-3 w-5 rounded-sm border border-dashed border-copper"
        aria-hidden
      />
      {label}
    </div>
  );
}

function FlagItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 font-sans text-[0.7rem] tracking-wide uppercase text-slate-warm">
      <span className="inline-block h-3 w-1 bg-copper rounded-full" aria-hidden />
      {label}
    </div>
  );
}
