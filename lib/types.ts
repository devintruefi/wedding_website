export type Side = "Devin" | "Poonam" | "Joint" | "TBD";

export interface Room {
  building: string;
  floor: string;
  room: string;
  type: string;
  guest: string;
  side: Side;
  group: string;
  notes: string;
  flag: boolean;
  isOpen: boolean;
  isSuite: boolean;
  isCouple: boolean;
}

export type CellKind = "room" | "stair" | "elevator" | "boh" | "pool" | "blank" | "ps";

export interface FloorCell {
  kind: CellKind;
  room?: string;
  label?: string;
}

export interface FloorRow {
  side: "north" | "south";
  cells: FloorCell[];
}

export interface FloorLayout {
  building: string;
  floor: string;
  label: string;
  subtitle?: string;
  rows: FloorRow[];
  showCorridor?: boolean;
}
