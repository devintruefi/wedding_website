"use client";

import type { FloorLayout, Room } from "@/lib/types";
import { Floor } from "./Floor";

interface BuildingProps {
  name: string;
  floors: FloorLayout[];
  lookup: Map<string, Room>;
  matchSet: Set<string>;
  dimSet: Set<string>;
  hasFilter: boolean;
  onRoomClick: (r: Room) => void;
}

export function Building({
  name,
  floors,
  lookup,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
}: BuildingProps) {
  if (!floors.length) return null;

  return (
    <section
      className="reveal mb-20 print-page-break"
      id={`building-${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <header className="mb-8 text-center">
        <p className="font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper mb-2">
          ✦ Building
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest-deep font-light">
          {name}
        </h2>
        <div className="mx-auto mt-4 h-px w-20 bg-copper/60" aria-hidden />
      </header>

      {floors.map((f) => (
        <Floor
          key={`${f.building}-${f.floor}`}
          layout={f}
          lookup={lookup}
          matchSet={matchSet}
          dimSet={dimSet}
          hasFilter={hasFilter}
          onRoomClick={onRoomClick}
        />
      ))}
    </section>
  );
}
