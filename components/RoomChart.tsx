"use client";

import { useEffect, useMemo, useState } from "react";
import type { Room } from "@/lib/types";
import { FLOOR_LAYOUTS, BUILDING_ORDER, groupByBuilding } from "@/lib/layouts";
import { Controls } from "./Controls";
import { StatsBar } from "./StatsBar";
import { Building } from "./Building";
import { RoomModal } from "./RoomModal";

export type FilterMode =
  | "all"
  | "devin"
  | "poonam"
  | "joint"
  | "suites"
  | "open";

interface RoomChartProps {
  initialRooms: Room[];
  initialStats: {
    total: number;
    devin: number;
    poonam: number;
    joint: number;
    openOrFlagged: number;
  };
  initialSyncedAt: number;
}

function statsFor(rooms: Room[]) {
  return {
    total: rooms.length,
    devin: rooms.filter((r) => r.side === "Devin").length,
    poonam: rooms.filter((r) => r.side === "Poonam").length,
    joint: rooms.filter((r) => r.side === "Joint").length,
    openOrFlagged: rooms.filter((r) => r.isOpen || r.flag).length,
  };
}

export function RoomChart({
  initialRooms,
  initialStats,
  initialSyncedAt,
}: RoomChartProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [stats, setStats] = useState(initialStats);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [selected, setSelected] = useState<Room | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<number>(initialSyncedAt);

  // Auto-refresh every 60s without page reload
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch("/api/rooms", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { rooms: Room[]; syncedAt: number };
        if (cancelled) return;
        setRooms(data.rooms);
        setStats(statsFor(data.rooms));
        setLastSyncedAt(data.syncedAt);
      } catch {
        /* swallow */
      }
    };
    const id = setInterval(tick, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const lookup = useMemo(() => {
    const m = new Map<string, Room>();
    for (const r of rooms) m.set(r.room, r);
    return m;
  }, [rooms]);

  const { matchSet, dimSet, hasFilter } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const hasSearch = q.length > 0;
    const hasPill = filter !== "all";
    const hasFilter = hasSearch || hasPill;

    const matchSet = new Set<string>();
    const dimSet = new Set<string>();
    if (!hasFilter) return { matchSet, dimSet, hasFilter: false };

    for (const r of rooms) {
      let isPillMatch = true;
      if (filter === "devin") isPillMatch = r.side === "Devin";
      else if (filter === "poonam") isPillMatch = r.side === "Poonam";
      else if (filter === "joint") isPillMatch = r.side === "Joint";
      else if (filter === "suites") isPillMatch = r.isSuite;
      else if (filter === "open") isPillMatch = r.isOpen || r.flag;

      let isSearchMatch = true;
      if (hasSearch) {
        const hay = `${r.guest} ${r.room} ${r.group} ${r.building} ${r.notes} ${r.type}`.toLowerCase();
        isSearchMatch = hay.includes(q);
      }

      if (isPillMatch && isSearchMatch) matchSet.add(r.room);
      else dimSet.add(r.room);
    }
    return { matchSet, dimSet, hasFilter };
  }, [rooms, search, filter]);

  const buildings = useMemo(() => groupByBuilding(), []);

  return (
    <>
      <Controls
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        lastSyncedAt={lastSyncedAt}
      />

      <StatsBar stats={stats} />

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {BUILDING_ORDER.map((name) => (
          <Building
            key={name}
            name={name}
            floors={buildings.get(name) ?? []}
            lookup={lookup}
            matchSet={matchSet}
            dimSet={dimSet}
            hasFilter={hasFilter}
            onRoomClick={(r) => setSelected(r)}
          />
        ))}

        {/* Legend */}
        <section className="reveal mt-8 border-t border-taupe/40 pt-8">
          <p className="text-center font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper mb-4">
            ✦ Legend
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 text-center">
            <LegendSwatch color="#3E5C76" label="Devin's side" />
            <LegendSwatch color="#A8527A" label="Poonam's side" />
            <LegendSwatch color="#C9A040" label="Joint" />
            <LegendSwatch color="#1F2A1C" label="Suite (dark green)" />
            <LegendStripe label="Open / unassigned" />
            <LegendFlag label="Flagged room" />
          </div>
        </section>
      </main>

      <RoomModal room={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
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

function LegendStripe({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 font-sans text-[0.7rem] tracking-wide uppercase text-slate-warm">
      <span className="stripe-open inline-block h-3 w-5 rounded-sm border border-dashed border-copper" aria-hidden />
      {label}
    </div>
  );
}

function LegendFlag({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 font-sans text-[0.7rem] tracking-wide uppercase text-slate-warm">
      <span className="inline-block h-3 w-1 bg-copper rounded-full" aria-hidden />
      {label}
    </div>
  );
}
