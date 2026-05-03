"use client";

import { useEffect, useMemo, useState } from "react";
import type { Room } from "@/lib/types";
import { Controls } from "./Controls";
import { StatsBar } from "./StatsBar";
import { ResortMap } from "./ResortMap";
import { Directory } from "./Directory";
import { RoomModal } from "./RoomModal";
import { Legend } from "./Legend";

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

  // Auto-refresh — pauses when tab is hidden so we don't burn requests
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      if (typeof document !== "undefined" && document.hidden) return;
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
    const onVisible = () => {
      if (typeof document !== "undefined" && !document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const lookup = useMemo(() => {
    const m = new Map<string, Room>();
    for (const r of rooms) m.set(r.room, r);
    return m;
  }, [rooms]);

  const { matchSet, dimSet, hasFilter, matchCount } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const hasSearch = q.length > 0;
    const hasPill = filter !== "all";
    const hasFilter = hasSearch || hasPill;

    const matchSet = new Set<string>();
    const dimSet = new Set<string>();
    if (!hasFilter) {
      return { matchSet, dimSet, hasFilter: false, matchCount: null as number | null };
    }

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
    return { matchSet, dimSet, hasFilter, matchCount: matchSet.size };
  }, [rooms, search, filter]);

  return (
    <>
      <Controls
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        lastSyncedAt={lastSyncedAt}
        matchCount={matchCount}
      />

      <StatsBar stats={stats} />

      <main className="pb-16 sm:pb-24">
        <ResortMap
          lookup={lookup}
          matchSet={matchSet}
          dimSet={dimSet}
          hasFilter={hasFilter}
          onRoomClick={(r) => setSelected(r)}
        />

        <Directory
          lookup={lookup}
          matchSet={matchSet}
          dimSet={dimSet}
          hasFilter={hasFilter}
          onRoomClick={(r) => setSelected(r)}
        />

        <Legend />
      </main>

      <RoomModal room={selected} onClose={() => setSelected(null)} />
    </>
  );
}
