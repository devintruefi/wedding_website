import { fetchRooms } from "@/lib/data";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import type { Room } from "@/lib/types";

export const revalidate = 60;

const SIDE_ACCENT: Record<string, string> = {
  Devin: "#3E5C76",
  Poonam: "#A8527A",
  Joint: "#C9A040",
  TBD: "#8A8273",
};

export default async function ByGroupPage() {
  const rooms = await fetchRooms();
  const groups = new Map<string, Room[]>();
  for (const r of rooms) {
    const key = r.group || "—";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }

  const sortedGroups = Array.from(groups.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  return (
    <>
      <Hero />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12 text-center">
          <p className="font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper mb-2">
            ✦ View by group
          </p>
          <h1 className="font-serif text-4xl font-light text-forest-deep">
            Guests by Group
          </h1>
          <p className="mt-3 font-sans text-sm text-slate-warm">
            Grouped by the "Group" column rather than physical room.
          </p>
        </header>

        {sortedGroups.map(([group, list]) => (
          <section key={group} className="mb-10 reveal">
            <header className="mb-3 flex items-baseline justify-between border-b border-taupe/40 pb-1">
              <h2 className="font-serif text-2xl text-forest-deep">{group}</h2>
              <span className="font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm">
                {list.length} {list.length === 1 ? "room" : "rooms"}
              </span>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {list.map((r) => (
                <div
                  key={r.room}
                  className="rounded-md border border-taupe/40 bg-cream-warm p-3 transition-shadow hover:shadow-md"
                  style={{ borderLeft: `3px solid ${SIDE_ACCENT[r.side]}` }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-xl text-forest-deep">
                      {r.room}
                    </span>
                    <span className="font-sans text-[0.55rem] tracking-ultra-wide uppercase text-slate-warm">
                      {r.building}
                    </span>
                  </div>
                  <p className="font-serif text-base text-forest-deep">
                    {r.guest}
                  </p>
                  <p className="font-sans text-[0.6rem] tracking-wide uppercase text-slate-warm">
                    {r.type} · {r.side}
                  </p>
                  {r.notes && (
                    <p className="mt-1 font-serif italic text-xs text-slate-warm/80">
                      {r.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
