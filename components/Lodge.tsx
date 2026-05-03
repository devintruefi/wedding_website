"use client";

import type { FloorLayout, Room } from "@/lib/types";
import { RoomCell, StructuralCell, BlankCell } from "./Room";

interface LodgeProps {
  layout: FloorLayout;
  cols: number;
  lookup: Map<string, Room>;
  matchSet: Set<string>;
  dimSet: Set<string>;
  hasFilter: boolean;
  onRoomClick: (r: Room) => void;
  /** Optional small label above the lodge (e.g. "East Lodge", "Main"). Mobile-only. */
  miniLabel?: string;
}

export function Lodge({
  layout,
  cols,
  lookup,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
  miniLabel,
}: LodgeProps) {
  return (
    <div className="lodge-frame px-1.5 py-1.5 sm:px-2 sm:py-2 reveal">
      {miniLabel && (
        <p className="md:hidden mb-1.5 text-center font-sans text-[0.55rem] tracking-ultra-wide uppercase text-copper-deep/80">
          {miniLabel}
        </p>
      )}
      <div className="space-y-1 sm:space-y-1.5">
        {layout.rows.map((row, rowIdx) => (
          <div
            key={`${layout.label}-${row.side}-${rowIdx}`}
            className="grid gap-1 sm:gap-1.5"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {row.cells.map((cell, idx) => {
              if (cell.kind === "room" && cell.room) {
                const room = lookup.get(cell.room);
                return (
                  <RoomCell
                    key={`${row.side}-${idx}-${cell.room}`}
                    room={room}
                    roomNumber={cell.room}
                    matched={hasFilter && matchSet.has(cell.room)}
                    dimmed={
                      hasFilter &&
                      !matchSet.has(cell.room) &&
                      dimSet.has(cell.room)
                    }
                    onClick={onRoomClick}
                  />
                );
              }
              if (cell.kind === "blank") {
                return <BlankCell key={`${row.side}-${idx}-blank`} />;
              }
              return (
                <StructuralCell
                  key={`${row.side}-${idx}-${cell.kind}`}
                  kind={cell.kind as "stair" | "elevator" | "boh" | "pool" | "ps"}
                  label={cell.label}
                />
              );
            })}
          </div>
        ))}

        {layout.showCorridor && layout.rows.length > 1 && (
          <div
            className="corridor-line flex h-2 items-center justify-center"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}

export function EmptyLodgeSlot({ cols }: { cols: number }) {
  // Render a faint placeholder so the cross-section preserves its column rhythm
  // for floors where this lodge doesn't exist (e.g. Main only on level 3).
  return (
    <div
      className="lodge-frame is-empty hidden md:flex items-center justify-center min-h-[60px]"
      aria-hidden
    >
      <span className="font-sans text-[0.55rem] tracking-ultra-wide uppercase text-slate-warm/40">
        — open sky —
      </span>
      <span className="sr-only">No lodge floor at this level</span>
      {/* keep the cols prop so callers can pass it without a complaint */}
      <span data-cols={cols} className="hidden" />
    </div>
  );
}
