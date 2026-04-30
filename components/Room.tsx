"use client";

import type { Room } from "@/lib/types";

interface RoomProps {
  room: Room | undefined;
  roomNumber: string;
  matched: boolean;
  dimmed: boolean;
  onClick: (r: Room) => void;
}

const SIDE_ACCENT: Record<string, string> = {
  Devin: "#3E5C76",
  Poonam: "#A8527A",
  Joint: "#C9A040",
  TBD: "#8A8273",
};

export function RoomCell({ room, roomNumber, matched, dimmed, onClick }: RoomProps) {
  if (!room) {
    return (
      <div className="flex min-h-[88px] flex-col justify-center rounded-md border border-dashed border-taupe/60 bg-cream/60 px-3 py-2">
        <span className="font-serif text-lg text-slate-warm/60">{roomNumber}</span>
        <span className="font-sans text-[0.55rem] tracking-ultra-wide text-slate-warm/60 uppercase">
          Missing
        </span>
      </div>
    );
  }

  const accent = SIDE_ACCENT[room.side] ?? "#8A8273";
  const isCouple = room.isCouple;
  const isOpen = room.isOpen;

  const baseClasses =
    "group relative flex min-h-[88px] flex-col justify-between overflow-hidden rounded-md border px-3 py-2 text-left transition-all duration-300 cursor-pointer";

  // Suite styling — dark green, gold border + number
  const suiteClasses = room.isSuite
    ? "bg-forest text-cream border-copper hover:border-copper-soft hover:shadow-[0_8px_24px_-12px_rgba(201,160,64,0.55)]"
    : "bg-cream-warm text-forest-deep border-taupe/60 hover:border-copper hover:shadow-[0_6px_20px_-12px_rgba(31,42,28,0.35)]";

  // Couple's suite — extra special treatment
  const coupleClasses = isCouple
    ? "ring-1 ring-copper ring-offset-1 ring-offset-cream-warm"
    : "";

  // Open / unassigned — diagonal stripes, gold dashed border
  const openClasses = isOpen
    ? "stripe-open border-dashed border-copper text-slate-warm"
    : "";

  // Search match / dim
  const matchClasses = matched
    ? "ring-2 ring-copper shadow-[0_0_0_4px_rgba(201,160,64,0.18)] scale-[1.02]"
    : "";
  const dimClasses = dimmed ? "opacity-25" : "opacity-100";

  return (
    <button
      onClick={() => onClick(room)}
      className={`${baseClasses} ${suiteClasses} ${coupleClasses} ${openClasses} ${matchClasses} ${dimClasses} hover:-translate-y-0.5`}
      aria-label={`Room ${room.room} — ${room.guest}`}
    >
      {/* Side accent strip */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] transition-all duration-300 group-hover:w-[5px]"
        style={{ background: accent }}
        aria-hidden
      />

      {/* Flag accent — top-right gold dot strip */}
      {room.flag && (
        <span className="absolute right-0 top-0 h-full w-[3px] bg-copper" aria-hidden />
      )}

      <div className="flex items-baseline justify-between gap-2 pl-1">
        <span
          className={`font-serif leading-none ${
            room.isSuite ? "text-2xl text-copper" : "text-xl"
          } ${isCouple ? "text-copper-soft" : ""}`}
        >
          {room.room}
        </span>
        {room.isSuite && (
          <span className="font-sans text-[0.55rem] tracking-ultra-wide uppercase text-copper">
            {isCouple ? "Couple" : "Suite"}
          </span>
        )}
      </div>

      <div className="pl-1">
        <p
          className={`font-serif text-[0.95rem] leading-tight line-clamp-2 ${
            room.isSuite ? "text-cream/95" : "text-forest-deep"
          } ${isOpen ? "italic text-slate-warm" : ""}`}
        >
          {room.guest || "—"}
        </p>
        <p
          className={`mt-1 font-sans text-[0.6rem] tracking-wide uppercase ${
            room.isSuite ? "text-cream/55" : "text-slate-warm"
          }`}
        >
          {room.type}
        </p>
      </div>
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
    stair: "bg-forest-deep/5 border-forest-deep/15 text-slate-warm",
    elevator: "bg-forest-deep/5 border-forest-deep/15 text-slate-warm",
    boh: "bg-forest-deep/[0.04] border-forest-deep/15 text-slate-warm",
    pool: "bg-side-devin/10 border-side-devin/30 text-side-devin",
    ps: "bg-forest/90 border-copper/60 text-copper",
  };

  return (
    <div
      className={`flex min-h-[88px] flex-col items-center justify-center rounded-md border px-3 py-2 text-center ${styles[kind]}`}
      aria-hidden
    >
      <span className="font-sans text-[0.6rem] tracking-ultra-wide uppercase opacity-90">
        {label}
      </span>
    </div>
  );
}

export function BlankCell() {
  return <div className="min-h-[88px]" aria-hidden />;
}
