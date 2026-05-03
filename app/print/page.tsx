import { fetchRooms } from "@/lib/data";
import { FLOOR_LAYOUTS, BUILDING_ORDER } from "@/lib/layouts";
import { SIDE_ACCENT } from "@/lib/sides";
import type { Room } from "@/lib/types";

export const revalidate = 60;

export default async function PrintPage() {
  const rooms = await fetchRooms();
  const lookup = new Map<string, Room>();
  for (const r of rooms) lookup.set(r.room, r);

  const byBuilding = new Map<string, typeof FLOOR_LAYOUTS>();
  for (const b of BUILDING_ORDER) byBuilding.set(b, []);
  for (const f of FLOOR_LAYOUTS) byBuilding.get(f.building)?.push(f);

  return (
    <div className="bg-white text-forest-deep">
      <div className="mx-auto max-w-[11in] px-8 py-8">
        <header className="mb-6 border-b-2 border-copper pb-3 text-center">
          <p className="font-sans text-[0.6rem] tracking-mega-wide uppercase text-copper">
            ✦ Poonam &amp; Devin · Room Chart
          </p>
          <h1 className="font-serif text-4xl font-light">
            One &amp; Only Moonlight Basin
          </h1>
          <p className="font-sans text-[0.65rem] tracking-ultra-wide uppercase text-slate-warm">
            June 25–28, 2026 · Big Sky, Montana
          </p>
        </header>

        {BUILDING_ORDER.map((name) => {
          const floors = byBuilding.get(name) ?? [];
          if (!floors.length) return null;
          return (
            <section key={name} className="mb-8 print-page-break">
              <h2 className="font-serif text-2xl mb-3 border-b border-taupe pb-1">
                {name}
              </h2>
              {floors.map((f) => {
                const cols = f.rows[0]?.cells.length ?? 1;
                return (
                  <div key={f.label} className="mb-5">
                    <h3 className="font-serif text-base mb-2 text-forest-deep">
                      {f.label}
                      {f.subtitle && (
                        <span className="text-slate-warm font-sans text-[0.6rem] tracking-wide uppercase ml-2">
                          {f.subtitle}
                        </span>
                      )}
                    </h3>
                    {f.rows.map((row, ri) => (
                      <div
                        key={ri}
                        className="grid gap-1 mb-1"
                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                      >
                        {row.cells.map((cell, ci) => {
                          if (cell.kind === "room" && cell.room) {
                            const r = lookup.get(cell.room);
                            const accent = r ? SIDE_ACCENT[r.side] : "#ccc";
                            return (
                              <div
                                key={ci}
                                className="border rounded p-1 text-[0.6rem] leading-tight"
                                style={{ borderLeft: `3px solid ${accent}` }}
                              >
                                <div className="font-serif text-sm">
                                  {cell.room}
                                  {r?.isSuite && (
                                    <span className="text-[0.5rem] text-copper ml-1">SUITE</span>
                                  )}
                                </div>
                                <div className="text-[0.55rem]">{r?.guest || "—"}</div>
                              </div>
                            );
                          }
                          if (cell.kind === "blank") {
                            return <div key={ci} />;
                          }
                          return (
                            <div
                              key={ci}
                              className="border border-dashed rounded p-1 text-center text-[0.55rem] uppercase tracking-wide text-slate-warm"
                            >
                              {cell.label}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                );
              })}
            </section>
          );
        })}

        <footer className="mt-6 border-t border-taupe pt-3 text-center text-[0.6rem] tracking-wide uppercase text-slate-warm">
          Poonam &amp; Devin · Big Sky · June 2026 · Live data from master sheet
        </footer>
      </div>
    </div>
  );
}
