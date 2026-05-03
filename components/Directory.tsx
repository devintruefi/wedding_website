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

// Display floors in a hotel-directory order rather than physical level —
// this section is the "who's where" reference, so reading top to bottom by
// lodge keeps it scannable.
const DIRECTORY_ORDER = [
  "Main Lodge · Penthouse",
  "East · Floor 1",
  "East · Floor 2",
  "East · Floor 3",
  "East · Floor 4",
  "West · Floor 2",
  "West · Floor 3",
  "Big Sky Cabins",
];

function orderedFloors(): FloorLayout[] {
  const byLabel = new Map(FLOOR_LAYOUTS.map((f) => [f.label, f]));
  return DIRECTORY_ORDER.map((label) => byLabel.get(label)).filter(
    (f): f is FloorLayout => Boolean(f),
  );
}

export function Directory({
  lookup,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
}: DirectoryProps) {
  const sections = orderedFloors().map((floor) => {
    const rooms: Room[] = [];
    for (const row of floor.rows) {
      for (const cell of row.cells) {
        if (cell.kind === "room" && cell.room) {
          const r = lookup.get(cell.room);
          if (r) rooms.push(r);
        }
      }
    }
    rooms.sort((a, b) => a.room.localeCompare(b.room, undefined, { numeric: true }));
    return { floor, rooms };
  });

  return (
    <section
      className="reveal mx-auto mt-16 sm:mt-24 max-w-6xl px-4 sm:px-6"
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
          Every guest, listed by floor — searchable and filterable from the bar above.
        </p>
      </header>

      <div className="space-y-12 sm:space-y-14">
        {sections.map(({ floor, rooms }) => {
          if (!rooms.length) return null;
          const sectionMatchCount = hasFilter
            ? rooms.filter((r) => matchSet.has(r.room)).length
            : null;
          return (
            <FloorSection
              key={floor.label}
              floor={floor}
              rooms={rooms}
              matchSet={matchSet}
              dimSet={dimSet}
              hasFilter={hasFilter}
              onRoomClick={onRoomClick}
              matchCount={sectionMatchCount}
            />
          );
        })}
      </div>
    </section>
  );
}

function FloorSection({
  floor,
  rooms,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
  matchCount,
}: {
  floor: FloorLayout;
  rooms: Room[];
  matchSet: Set<string>;
  dimSet: Set<string>;
  hasFilter: boolean;
  onRoomClick: (r: Room) => void;
  matchCount: number | null;
}) {
  // When a filter is active and zero rooms match in this section, soften
  // the whole section but keep it visible so the directory layout stays stable.
  const sectionDimmed = hasFilter && matchCount === 0;

  return (
    <section className={sectionDimmed ? "opacity-50" : ""}>
      <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3 border-b border-taupe/40 pb-2">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-forest-deep font-light">
            {floor.label.replace("Main Lodge · Penthouse", "Main Lodge — Penthouse")}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
        {rooms.map((r) => (
          <RoomCard
            key={r.room}
            room={r}
            matched={hasFilter && matchSet.has(r.room)}
            dimmed={hasFilter && !matchSet.has(r.room) && dimSet.has(r.room)}
            onClick={onRoomClick}
          />
        ))}
      </div>
    </section>
  );
}

function RoomCard({
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
    "group relative flex w-full items-stretch gap-3 rounded-lg border px-3 py-3 text-left transition-all duration-300 cursor-pointer overflow-hidden";

  const surface = isSuite
    ? "bg-forest text-cream-warm border-copper/60 hover:border-copper-soft hover:shadow-copper"
    : "bg-cream-bright text-forest-deep border-taupe/45 hover:border-copper hover:shadow-paper";

  const coupleRing = isCouple ? "ring-1 ring-copper ring-offset-2 ring-offset-cream-warm" : "";
  const openTreatment = isOpen
    ? "stripe-open border-dashed border-copper text-slate-warm"
    : "";
  const matchClass = matched
    ? "ring-2 ring-copper shadow-[0_0_0_4px_rgba(185,140,63,0.18)] -translate-y-0.5"
    : "";
  const dimClass = dimmed ? "opacity-25" : "";

  return (
    <button
      onClick={() => onClick(room)}
      className={`${base} ${surface} ${coupleRing} ${openTreatment} ${matchClass} ${dimClass} hover:-translate-y-0.5`}
      aria-label={`Room ${room.room} — ${room.guest || "open"}`}
    >
      {/* Side accent strip */}
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

      {/* Room number column */}
      <div className="flex flex-col items-center justify-center min-w-[52px] sm:min-w-[58px] pl-1.5">
        <span
          className={`font-serif leading-none ${
            isSuite
              ? "text-2xl sm:text-3xl text-copper-soft"
              : "text-2xl sm:text-3xl"
          } ${isCouple ? "text-copper-soft" : ""}`}
        >
          {room.room}
        </span>
        {isSuite && (
          <span className="mt-1 font-sans text-[0.5rem] tracking-ultra-wide uppercase text-copper-soft/85">
            {isCouple ? "Couple" : "Suite"}
          </span>
        )}
      </div>

      {/* Vertical divider */}
      <span
        className={`w-px self-stretch ${
          isSuite ? "bg-copper/25" : "bg-taupe/40"
        }`}
        aria-hidden
      />

      {/* Guest details */}
      <div className="min-w-0 flex-1 flex flex-col justify-center py-0.5">
        <p
          className={`font-serif text-base sm:text-[1.05rem] leading-snug ${
            isSuite ? "text-cream-warm" : "text-forest-deep"
          } ${isOpen ? "italic text-slate-warm" : ""}`}
        >
          {room.guest || "—"}
        </p>
        <div
          className={`mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-sans text-[0.6rem] tracking-wide uppercase ${
            isSuite ? "text-cream-warm/65" : "text-slate-warm"
          }`}
        >
          <span className="truncate">{room.type}</span>
          <span aria-hidden className="opacity-50">·</span>
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
              aria-hidden
            />
            {sideLabel}
          </span>
          {room.group && (
            <>
              <span aria-hidden className="opacity-50">·</span>
              <span className="truncate normal-case tracking-normal font-serif italic text-[0.7rem] text-slate-warm/85">
                {room.group}
              </span>
            </>
          )}
        </div>
        {room.notes && (
          <p
            className={`mt-1.5 font-serif italic text-[0.75rem] leading-snug line-clamp-2 ${
              isSuite ? "text-cream-warm/75" : "text-slate-warm/85"
            }`}
          >
            {room.notes}
          </p>
        )}
      </div>
    </button>
  );
}
