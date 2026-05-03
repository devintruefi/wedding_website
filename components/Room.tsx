"use client";

import type { Room } from "@/lib/types";
import { SIDE_ACCENT } from "@/lib/sides";
import { compactGuest } from "@/lib/format";

interface RoomProps {
  room: Room | undefined;
  roomNumber: string;
  matched: boolean;
  dimmed: boolean;
  onClick: (r: Room) => void;
}

export function RoomCell({
  room,
  roomNumber,
  matched,
  dimmed,
  onClick,
}: RoomProps) {
  if (!room) {
    return (
      <div
        className="room-tile flex min-h-[60px] sm:min-h-[68px] flex-col justify-between rounded-md border border-dashed border-taupe/60 bg-cream/40 px-1.5 py-1.5"
        title={`Room ${roomNumber} — not in sheet`}
      >
        <span className="font-serif text-sm leading-none text-slate-warm/60">
          {roomNumber}
        </span>
        <span className="font-sans text-[0.5rem] tracking-ultra-wide text-slate-warm/60 uppercase truncate">
          Missing
        </span>
      </div>
    );
  }

  const accent = SIDE_ACCENT[room.side] ?? "#8A8273";
  const { isCouple, isOpen, isSuite, flag } = room;
  const compact = compactGuest(room.guest);

  const baseClasses =
    "room-tile group relative flex min-h-[60px] sm:min-h-[68px] md:min-h-[72px] flex-col justify-between overflow-hidden rounded-md border pl-2 pr-1.5 py-1.5 text-left transition-all duration-300 cursor-pointer";

  const suiteClasses = isSuite
    ? "bg-forest text-cream-warm border-copper/70 hover:border-copper-soft hover:shadow-copper"
    : "bg-cream-bright text-forest-deep border-taupe/55 hover:border-copper hover:shadow-paper";

  const coupleClasses = isCouple
    ? "ring-1 ring-copper ring-offset-2 ring-offset-cream-warm shadow-copper"
    : "";

  const openClasses = isOpen
    ? "stripe-open border-dashed border-copper text-slate-warm"
    : "";

  const matchClasses = matched
    ? "ring-2 ring-copper shadow-[0_0_0_4px_rgba(185,140,63,0.18)] -translate-y-0.5 z-10"
    : "";
  const dimClasses = dimmed ? "opacity-25" : "opacity-100";

  return (
    <button
      onClick={() => onClick(room)}
      className={`${baseClasses} ${suiteClasses} ${coupleClasses} ${openClasses} ${matchClasses} ${dimClasses} hover:-translate-y-0.5`}
      aria-label={`Room ${room.room} — ${room.guest || "open"}`}
      title={`${room.room} · ${room.guest || "Open"}`}
    >
      {/* Side accent strip */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] transition-all duration-300 group-hover:w-[5px]"
        style={{ background: accent }}
        aria-hidden
      />

      {/* Flag accent */}
      {flag && (
        <span
          className="absolute right-0 top-0 h-full w-[3px] bg-copper"
          aria-hidden
        />
      )}

      {/* Top row: room number + suite tag */}
      <div className="flex items-baseline justify-between gap-1 leading-none">
        <span
          className={`font-serif leading-none ${
            isSuite
              ? "text-sm sm:text-base text-copper-soft"
              : "text-sm sm:text-base"
          } ${isCouple ? "text-copper-soft" : ""}`}
        >
          {room.room}
        </span>
        {isSuite && (
          <span className="font-sans text-[0.45rem] sm:text-[0.5rem] tracking-ultra-wide uppercase text-copper-soft/85">
            {isCouple ? "Couple" : "Suite"}
          </span>
        )}
      </div>

      {/* Guest name — always visible, compacted to fit */}
      <p
        className={`room-guest mt-1 font-serif leading-[1.1] line-clamp-2 break-words text-[0.62rem] sm:text-[0.68rem] md:text-[0.72rem] ${
          isSuite ? "text-cream-warm/95" : "text-forest-deep"
        } ${isOpen ? "italic text-slate-warm" : ""}`}
      >
        {compact}
      </p>
    </button>
  );
}

export function StructuralCell({
  kind,
  label,
}: {
  kind: "stair" | "elevator" | "boh" | "pool" | "ps";
  label?: string;
}) {
  const styles: Record<string, string> = {
    stair: "bg-forest-deep/[0.04] border-forest-deep/15 text-slate-warm/80",
    elevator: "bg-forest-deep/[0.04] border-forest-deep/15 text-slate-warm/80",
    boh: "bg-forest-deep/[0.03] border-forest-deep/10 text-slate-warm/60",
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
      className={`structural-cell flex min-h-[60px] sm:min-h-[68px] md:min-h-[72px] flex-col items-center justify-center rounded-md border px-1 py-1 text-center ${styles[kind]}`}
      aria-hidden
      title={label}
    >
      <span className="font-serif text-base sm:text-lg leading-none opacity-80">
        {icon[kind]}
      </span>
      <span className="mt-0.5 hidden sm:block font-sans text-[0.5rem] tracking-ultra-wide uppercase opacity-90 truncate w-full">
        {label}
      </span>
    </div>
  );
}

export function BlankCell() {
  return <div className="min-h-[60px] sm:min-h-[68px] md:min-h-[72px]" aria-hidden />;
}
