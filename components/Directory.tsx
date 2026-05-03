"use client";

import type { FloorLayout, Room } from "@/lib/types";
import { FLOOR_LAYOUTS } from "@/lib/layouts";
import { SIDE_ACCENT, SIDE_LABEL } from "@/lib/sides";

interface DirectoryProps {
  lookup: Map<string, Room>;
  matchSet: Set<string>;
  dimSet: Set<string>;
  hasFilter: boolean;
  onRoomClick: (r: Room) => void;
}

// Floors render top-down through the property, just like the resort map. This
// keeps mental orientation consistent — a guest looking at the East · Floor 4
// section sees the same room arrangement they saw above in the cross-section.
const DIRECTORY_ORDER = [
  "Main Lodge · Penthouse",
  "East · Floor 4",
  "East · Floor 3",
  "East · Floor 2",
  "East · Floor 1",
  "West · Floor 3",
  "West · Floor 2",
  "Big Sky Cabins",
];

function orderedFloors(): FloorLayout[] {
  const byLabel = new Map(FLOOR_LAYOUTS.map((f) => [f.label, f]));
  return DIRECTORY_ORDER.map((label) => byLabel.get(label)).filter(
    (f): f is FloorLayout => Boolean(f),
  );
}

function roomsInFloor(floor: FloorLayout, lookup: Map<string, Room>): Room[] {
  const out: Room[] = [];
  for (const row of floor.rows) {
    for (const cell of row.cells) {
      if (cell.kind === "room" && cell.room) {
        const r = lookup.get(cell.room);
        if (r) out.push(r);
      }
    }
  }
  return out;
}

export function Directory({
  lookup,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
}: DirectoryProps) {
  const floors = orderedFloors();

  return (
    <section
      className="reveal mx-auto mt-16 sm:mt-24 max-w-[1320px] px-3 sm:px-6"
      id="directory"
    >
      <header className="mb-8 sm:mb-10 text-center">
        <p className="font-sans text-[0.6rem] tracking-mega-wide uppercase text-copper">
          ✦ Guest Directory
        </p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl text-forest-deep font-light">
          Who&rsquo;s in each room
        </h2>
        <p className="mt-3 font-serif italic text-sm sm:text-base text-slate-warm/85">
          Each floor laid out as it sits — north row above, south row below,
          corridor between. Swipe horizontally on a phone.
        </p>
      </header>

      <div className="space-y-12 sm:space-y-14">
        {floors.map((floor) => (
          <DirectoryFloor
            key={floor.label}
            floor={floor}
            rooms={roomsInFloor(floor, lookup)}
            lookup={lookup}
            matchSet={matchSet}
            dimSet={dimSet}
            hasFilter={hasFilter}
            onRoomClick={onRoomClick}
          />
        ))}
      </div>
    </section>
  );
}

function DirectoryFloor({
  floor,
  rooms,
  lookup,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
}: {
  floor: FloorLayout;
  rooms: Room[];
  lookup: Map<string, Room>;
  matchSet: Set<string>;
  dimSet: Set<string>;
  hasFilter: boolean;
  onRoomClick: (r: Room) => void;
}) {
  const cols = Math.max(...floor.rows.map((r) => r.cells.length), 1);
  const matchCount = hasFilter
    ? rooms.filter((r) => matchSet.has(r.room)).length
    : null;
  const sectionDimmed = hasFilter && matchCount === 0;

  // Per-cell minimum width — keep room names readable. Total floor strip
  // width = cols * minCellWidth, which exceeds phone widths and triggers
  // a per-floor horizontal scroll without forcing the rest of the page.
  const minCell = 150;
  const minStripWidth = cols * minCell + (cols - 1) * 8 + 16;

  return (
    <section className={sectionDimmed ? "opacity-50" : ""}>
      <header className="mb-3 sm:mb-4 flex items-end justify-between gap-3 border-b border-taupe/40 pb-2 px-1">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-forest-deep font-light">
            {floor.label.replace(
              "Main Lodge · Penthouse",
              "Main Lodge — Penthouse",
            )}
          </h3>
          {floor.subtitle && (
            <p className="mt-0.5 font-sans text-[0.6rem] sm:text-[0.65rem] tracking-ultra-wide uppercase text-copper-deep/85">
              {floor.subtitle}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          {matchCount !== null && (
            <p className="font-sans text-[0.6rem] tracking-wide uppercase text-copper">
              {matchCount} / {rooms.length} match
            </p>
          )}
          <p className="font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm/80">
            {rooms.length} {rooms.length === 1 ? "room" : "rooms"}
          </p>
        </div>
      </header>

      {/* Per-floor horizontal scroll — wraps just this floor strip so the rest
          of the page stays put when a guest swipes through one floor. */}
      <div className="floor-scroll overflow-x-auto pb-3 -mx-1 px-1">
        <div
          className="space-y-2"
          style={{ minWidth: `${minStripWidth}px` }}
        >
          {floor.rows.map((row, rowIdx) => (
            <div
              key={`${floor.label}-${row.side}-${rowIdx}`}
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(${minCell}px, 1fr))`,
              }}
            >
              {row.cells.map((cell, ci) => {
                if (cell.kind === "room" && cell.room) {
                  const room = lookup.get(cell.room);
                  if (!room) {
                    return (
                      <MissingCell
                        key={`${row.side}-${ci}-${cell.room}`}
                        roomNumber={cell.room}
                      />
                    );
                  }
                  return (
                    <DirectoryRoomCard
                      key={`${row.side}-${ci}-${cell.room}`}
                      room={room}
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
                  return <BlankSpacer key={`${row.side}-${ci}-blank`} />;
                }
                return (
                  <DirectoryStructural
                    key={`${row.side}-${ci}-${cell.kind}`}
                    kind={cell.kind as "stair" | "elevator" | "boh" | "pool" | "ps"}
                    label={cell.label}
                  />
                );
              })}
            </div>
          ))}

          {floor.showCorridor && floor.rows.length > 1 && (
            <div
              className="corridor-line my-1 flex h-3 items-center justify-center"
              aria-hidden
            >
              <span className="bg-cream-warm px-2 font-sans text-[0.55rem] tracking-mega-wide uppercase text-slate-warm/70">
                Corridor
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DirectoryRoomCard({
  room,
  matched,
  dimmed,
  onClick,
}: {
  room: Room;
  matched: boolean;
  dimmed: boolean;
  onClick: (r: Room) => void;
}) {
  const accent = SIDE_ACCENT[room.side] ?? "#8A8273";
  const sideLabel = SIDE_LABEL[room.side] ?? room.side;
  const { isCouple, isOpen, isSuite, flag } = room;

  const base =
    "group relative flex flex-col gap-1 rounded-md border pl-3 pr-2.5 py-2.5 text-left transition-all duration-300 cursor-pointer overflow-hidden min-h-[120px]";

  const surface = isSuite
    ? "bg-forest text-cream-warm border-copper/60 hover:border-copper-soft hover:shadow-copper"
    : "bg-cream-bright text-forest-deep border-taupe/45 hover:border-copper hover:shadow-paper";

  const coupleRing = isCouple
    ? "ring-1 ring-copper ring-offset-2 ring-offset-cream-warm"
    : "";
  const openTreatment = isOpen
    ? "stripe-open border-dashed border-copper text-slate-warm"
    : "";
  const matchClass = matched
    ? "ring-2 ring-copper shadow-[0_0_0_4px_rgba(185,140,63,0.18)] -translate-y-0.5 z-10"
    : "";
  const dimClass = dimmed ? "opacity-25" : "";

  return (
    <button
      onClick={() => onClick(room)}
      className={`${base} ${surface} ${coupleRing} ${openTreatment} ${matchClass} ${dimClass} hover:-translate-y-0.5`}
      aria-label={`Room ${room.room} — ${room.guest || "open"}`}
    >
      <span
        className="absolute left-0 top-0 h-full w-[3px] transition-all duration-300 group-hover:w-[5px]"
        style={{ background: accent }}
        aria-hidden
      />
      {flag && (
        <span
          className="absolute right-0 top-0 h-full w-[3px] bg-copper"
          aria-hidden
        />
      )}

      {/* Top: room number + suite tag */}
      <div className="flex items-baseline justify-between gap-1.5">
        <span
          className={`font-serif leading-none ${
            isSuite
              ? "text-2xl text-copper-soft"
              : "text-2xl"
          } ${isCouple ? "text-copper-soft" : ""}`}
        >
          {room.room}
        </span>
        {isSuite && (
          <span className="font-sans text-[0.5rem] tracking-ultra-wide uppercase text-copper-soft/85 whitespace-nowrap">
            {isCouple ? "Couple" : "Suite"}
          </span>
        )}
      </div>

      {/* Type — small, just below the room number */}
      <p
        className={`font-sans text-[0.55rem] tracking-ultra-wide uppercase truncate ${
          isSuite ? "text-cream-warm/55" : "text-slate-warm"
        }`}
      >
        {room.type}
      </p>

      {/* Full guest name */}
      <p
        className={`mt-0.5 font-serif text-[0.92rem] leading-snug line-clamp-2 ${
          isSuite ? "text-cream-warm" : "text-forest-deep"
        } ${isOpen ? "italic text-slate-warm" : ""}`}
      >
        {room.guest || "—"}
      </p>

      {/* Side + group footer */}
      <div className="mt-auto pt-1 flex items-center gap-1.5 min-w-0">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
          style={{ background: accent }}
          aria-hidden
        />
        <span
          className={`font-sans text-[0.55rem] tracking-wide uppercase truncate ${
            isSuite ? "text-cream-warm/65" : "text-slate-warm"
          }`}
        >
          {sideLabel}
        </span>
        {room.group && (
          <>
            <span
              className={`shrink-0 ${
                isSuite ? "text-cream-warm/40" : "text-slate-warm/40"
              }`}
              aria-hidden
            >
              ·
            </span>
            <span
              className={`font-serif italic text-[0.7rem] truncate ${
                isSuite ? "text-cream-warm/75" : "text-slate-warm/85"
              }`}
            >
              {room.group}
            </span>
          </>
        )}
      </div>

      {room.notes && (
        <p
          className={`font-serif italic text-[0.7rem] leading-snug line-clamp-2 ${
            isSuite ? "text-cream-warm/70" : "text-slate-warm/80"
          }`}
        >
          {room.notes}
        </p>
      )}
    </button>
  );
}

function MissingCell({ roomNumber }: { roomNumber: string }) {
  return (
    <div className="flex min-h-[120px] flex-col justify-center rounded-md border border-dashed border-taupe/60 bg-cream/40 px-3 py-2">
      <span className="font-serif text-xl text-slate-warm/60">{roomNumber}</span>
      <span className="font-sans text-[0.55rem] tracking-ultra-wide text-slate-warm/60 uppercase">
        Missing from sheet
      </span>
    </div>
  );
}

function DirectoryStructural({
  kind,
  label,
}: {
  kind: "stair" | "elevator" | "boh" | "pool" | "ps";
  label?: string;
}) {
  const styles: Record<string, string> = {
    stair: "bg-forest-deep/[0.04] border-forest-deep/15 text-slate-warm/80",
    elevator: "bg-forest-deep/[0.04] border-forest-deep/15 text-slate-warm/80",
    boh: "bg-forest-deep/[0.03] border-forest-deep/10 text-slate-warm/55",
    pool: "bg-side-devin/10 border-side-devin/30 text-side-devin",
    ps: "bg-forest/90 border-copper/60 text-copper-soft",
  };
  const icon: Record<string, string> = {
    stair: "≡",
    elevator: "≡",
    boh: "·",
    pool: "≈",
    ps: "✦",
  };
  return (
    <div
      className={`flex min-h-[120px] flex-col items-center justify-center rounded-md border px-2 py-2 text-center ${styles[kind]}`}
      aria-hidden
      title={label}
    >
      <span className="font-serif text-2xl leading-none opacity-80">
        {icon[kind]}
      </span>
      <span className="mt-1.5 font-sans text-[0.55rem] tracking-ultra-wide uppercase opacity-90">
        {label}
      </span>
    </div>
  );
}

function BlankSpacer() {
  return <div className="min-h-[120px]" aria-hidden />;
}
