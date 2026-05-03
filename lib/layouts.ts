import type { FloorLayout, FloorCell, FloorRow } from "./types";

const r = (room: string): FloorCell => ({ kind: "room", room });
const stair = (): FloorCell => ({ kind: "stair", label: "Stair / Lift" });
const boh = (): FloorCell => ({ kind: "boh", label: "BOH" });
const pool = (): FloorCell => ({ kind: "pool", label: "Pool / Terrace" });
const blank = (): FloorCell => ({ kind: "blank" });
const ps = (): FloorCell => ({ kind: "ps", label: "Penthouse Suite" });

// ---------- Per-lodge column widths ----------
// Each lodge keeps a consistent column count across its floors so vertical
// alignment is preserved (room directly above another room sits in the same
// column). Floors with fewer rooms get padded with blanks.
export const LODGE_COLS = {
  east: 8,
  main: 5,
  west: 9,
  cabin: 6,
} as const;

// Pad a floor row to a target column count by appending blanks on the right.
function padRow(row: FloorRow, target: number): FloorRow {
  if (row.cells.length >= target) return row;
  const pad: FloorCell[] = Array.from(
    { length: target - row.cells.length },
    () => blank(),
  );
  return { ...row, cells: [...row.cells, ...pad] };
}

function padFloor(layout: FloorLayout, target: number): FloorLayout {
  return {
    ...layout,
    rows: layout.rows.map((row) => padRow(row, target)),
  };
}

// ---------- Main Lodge — Penthouse Floor (Floor 3) ----------
const mainLodgeP3Raw: FloorLayout = {
  building: "Main Lodge",
  floor: "Floor 3 — Penthouse",
  label: "Main Lodge · Penthouse",
  subtitle: "The Couple's Floor",
  showCorridor: true,
  rows: [
    { side: "north", cells: [r("207"), r("205"), r("203"), boh(), r("201")] },
    { side: "south", cells: [ps(), r("206"), r("204"), boh(), r("202")] },
  ],
};
const mainLodgeP3 = padFloor(mainLodgeP3Raw, LODGE_COLS.main);

// ---------- Guest Lodge East ----------
const east1Raw: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 1",
  label: "East · Floor 1",
  subtitle: "Pool & Terrace Level",
  showCorridor: true,
  rows: [
    { side: "north", cells: [pool(), pool(), r("106"), r("104"), r("102")] },
    { side: "south", cells: [pool(), pool(), r("105"), r("103"), r("101")] },
  ],
};
const east1 = padFloor(east1Raw, LODGE_COLS.east);

const east2Raw: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 2",
  label: "East · Floor 2",
  showCorridor: true,
  rows: [
    {
      side: "north",
      cells: [r("117"), r("116"), r("114"), stair(), r("112"), r("110"), r("108"), r("107")],
    },
    {
      side: "south",
      cells: [blank(), r("118"), r("115"), stair(), r("113"), r("111"), r("109"), blank()],
    },
  ],
};
const east2 = padFloor(east2Raw, LODGE_COLS.east);

const east3Raw: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 3 — Friends Floor",
  label: "East · Floor 3",
  subtitle: "Friends Floor",
  showCorridor: true,
  rows: [
    {
      side: "north",
      cells: [r("130"), r("128"), r("126"), stair(), r("124"), r("122"), r("120"), r("119")],
    },
    {
      side: "south",
      cells: [blank(), r("129"), r("127"), stair(), r("125"), r("123"), r("121"), blank()],
    },
  ],
};
const east3 = padFloor(east3Raw, LODGE_COLS.east);

const east4Raw: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 4 — Devin's Family Wing",
  label: "East · Floor 4",
  subtitle: "Devin's Family Wing",
  showCorridor: true,
  rows: [
    {
      side: "north",
      cells: [r("142"), r("140"), r("138"), stair(), r("136"), r("134"), r("132"), r("131")],
    },
    {
      side: "south",
      cells: [blank(), r("141"), r("139"), stair(), r("137"), r("135"), r("133"), blank()],
    },
  ],
};
const east4 = padFloor(east4Raw, LODGE_COLS.east);

// ---------- Guest Lodge West ----------
const west2Raw: FloorLayout = {
  building: "Guest Lodge West",
  floor: "Floor 2",
  label: "West · Floor 2",
  showCorridor: true,
  rows: [
    {
      side: "north",
      cells: [
        r("312"),
        r("310"),
        r("308"),
        r("306"),
        stair(),
        r("304"),
        r("302"),
        blank(),
        r("301"),
      ],
    },
    {
      side: "south",
      cells: [
        blank(),
        r("311"),
        r("309"),
        r("307"),
        stair(),
        r("305"),
        r("303"),
        blank(),
        blank(),
      ],
    },
  ],
};
const west2 = padFloor(west2Raw, LODGE_COLS.west);

const west3Raw: FloorLayout = {
  building: "Guest Lodge West",
  floor: "Floor 3",
  label: "West · Floor 3",
  showCorridor: true,
  rows: [
    {
      side: "north",
      cells: [
        r("324"),
        r("322"),
        r("320"),
        r("318"),
        stair(),
        r("316"),
        r("314"),
        blank(),
        r("313"),
      ],
    },
    {
      side: "south",
      cells: [
        blank(),
        r("323"),
        r("321"),
        r("319"),
        stair(),
        r("317"),
        r("315"),
        blank(),
        blank(),
      ],
    },
  ],
};
const west3 = padFloor(west3Raw, LODGE_COLS.west);

// ---------- Big Sky Cabins ----------
const cabinsRaw: FloorLayout = {
  building: "Big Sky Cabins",
  floor: "Two-bed Cabins",
  label: "Big Sky Cabins",
  subtitle: "Two-bed Standalone Cabins",
  showCorridor: false,
  rows: [
    {
      side: "north",
      cells: [r("420"), r("421"), r("422"), r("423"), r("424"), r("425")],
    },
  ],
};
export const cabins = padFloor(cabinsRaw, LODGE_COLS.cabin);

// ---------- Resort cross-section: stories from top to bottom ----------
// East = left, Main = center, West = right. Slots sized by lodge column counts
// so cells stay aligned vertically across floors of the same lodge.
export interface ResortStory {
  level: number;
  label: string;
  caption?: string;
  east: FloorLayout | null;
  main: FloorLayout | null;
  west: FloorLayout | null;
}

export const RESORT_STORIES: ResortStory[] = [
  {
    level: 4,
    label: "Level 4",
    caption: "Devin's Family Wing",
    east: east4,
    main: null,
    west: null,
  },
  {
    level: 3,
    label: "Level 3",
    caption: "Penthouse · Friends Floor",
    east: east3,
    main: mainLodgeP3,
    west: west3,
  },
  {
    level: 2,
    label: "Level 2",
    caption: "Mid-lodge guest rooms",
    east: east2,
    main: null,
    west: west2,
  },
  {
    level: 1,
    label: "Level 1",
    caption: "Pool & Terrace",
    east: east1,
    main: null,
    west: null,
  },
];

// ---------- Existing exports preserved for /print and /by-group ----------
export const FLOOR_LAYOUTS: FloorLayout[] = [
  mainLodgeP3,
  east1,
  east2,
  east3,
  east4,
  west2,
  west3,
  cabins,
];

export const BUILDING_ORDER = [
  "Main Lodge",
  "Guest Lodge East",
  "Guest Lodge West",
  "Big Sky Cabins",
];

export function groupByBuilding(): Map<string, FloorLayout[]> {
  const m = new Map<string, FloorLayout[]>();
  for (const b of BUILDING_ORDER) m.set(b, []);
  for (const f of FLOOR_LAYOUTS) {
    const arr = m.get(f.building);
    if (arr) arr.push(f);
  }
  return m;
}
