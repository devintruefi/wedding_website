"use client";

import type { FloorLayout } from "@/lib/types";
import type { Room } from "@/lib/types";
import { RoomCell, StructuralCell, BlankCell } from "./Room";

interface FloorProps {
  layout: FloorLayout;
  lookup: Map<string, Room>;
  matchSet: Set<string>;
  dimSet: Set<string>;
  hasFilter: boolean;
  onRoomClick: (r: Room) => void;
}

export function Floor({
  layout,
  lookup,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
}: FloorProps) {
  const cols = layout.rows[0]?.cells.length ?? 1;

  return (
    <div className="reveal mb-12">
      <header className="mb-4 flex items-baseline justify-between gap-4 border-b border-taupe/40 pb-2">
        <div>
          <h3 className="font-serif text-2xl text-forest-deep">{layout.label}</h3>
          {layout.subtitle && (
            <p className="font-sans text-[0.7rem] tracking-ultra-wide uppercase text-slate-warm/80">
              {layout.subtitle}
            </p>
          )}
        </div>
        <span className="font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper">
          ✦ Top-down view
        </span>
      </header>

      <div className="floor-scroll overflow-x-auto pb-2">
        <div className="min-w-[920px]">
          {layout.rows.map((row, rowIdx) => (
            <div
              key={`${layout.label}-${row.side}-${rowIdx}`}
              className="grid gap-2 mb-2"
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
                      dimmed={hasFilter && !matchSet.has(cell.room) && dimSet.has(cell.room)}
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
              className="corridor-line my-1 h-3 flex items-center justify-center"
              aria-hidden
            >
              <span className="bg-cream-warm px-2 font-sans text-[0.55rem] tracking-ultra-wide uppercase text-slate-warm/70">
                Corridor
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
