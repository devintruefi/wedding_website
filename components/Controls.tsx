"use client";

import type { FilterMode } from "./RoomChart";

interface ControlsProps {
  search: string;
  setSearch: (s: string) => void;
  filter: FilterMode;
  setFilter: (f: FilterMode) => void;
  lastSyncedAt: number | null;
}

const FILTERS: { id: FilterMode; label: string }[] = [
  { id: "all", label: "All Rooms" },
  { id: "devin", label: "Devin's Side" },
  { id: "poonam", label: "Poonam's Side" },
  { id: "joint", label: "Joint" },
  { id: "suites", label: "Suites Only" },
  { id: "open", label: "Open / Flagged" },
];

function formatTime(ts: number | null) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function Controls({
  search,
  setSearch,
  filter,
  setFilter,
  lastSyncedAt,
}: ControlsProps) {
  return (
    <section className="no-print sticky top-0 z-30 border-b border-taupe/40 bg-cream-warm/95 backdrop-blur supports-[backdrop-filter]:bg-cream-warm/85">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-warm"
              aria-hidden
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, room, group, building…"
              className="w-full rounded-md border border-taupe/60 bg-cream-warm/80 px-9 py-2 font-sans text-sm text-forest-deep placeholder:text-slate-warm/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-warm hover:text-forest-deep transition"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-3.5 py-1.5 font-sans text-[0.7rem] tracking-wide uppercase transition-all ${
                  filter === f.id
                    ? "border-forest-deep bg-forest-deep text-cream-warm shadow-sm"
                    : "border-taupe/60 bg-cream-warm text-slate-warm hover:border-forest-deep/50 hover:text-forest-deep"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sync indicator */}
        <div className="mt-2 flex items-center justify-end gap-2 font-sans text-[0.6rem] tracking-wide uppercase text-slate-warm/70">
          <span className="block h-1.5 w-1.5 rounded-full bg-copper animate-pulse" aria-hidden />
          Live · synced {formatTime(lastSyncedAt)}
        </div>
      </div>
    </section>
  );
}
