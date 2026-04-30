import type { FloorLayout, FloorCell } from "./types";

const r = (room: string): FloorCell => ({ kind: "room", room });
const stair = (): FloorCell => ({ kind: "stair", label: "Stair / Lift" });
const boh = (): FloorCell => ({ kind: "boh", label: "BOH" });
const pool = (): FloorCell => ({ kind: "pool", label: "Pool / Terrace" });
const blank = (): FloorCell => ({ kind: "blank" });
const ps = (): FloorCell => ({ kind: "ps", label: "Penthouse Suite" });

// Main Lodge — Floor 3 — Penthouse
// North: 207 (couple) | 205 | 203 | BOH | 201
// South: PS area      | 206 | 204 | BOH | 202
const mainLodgeP3: FloorLayout = {
  building: "Main Lodge",
  floor: "Floor 3 — Penthouse",
  label: "Main Lodge · Penthouse",
  subtitle: "Floor 3 — The Couple's Floor",
  showCorridor: true,
  rows: [
    {
      side: "north",
      cells: [r("207"), r("205"), r("203"), boh(), r("201")],
    },
    {
      side: "south",
      cells: [ps(), r("206"), r("204"), boh(), r("202")],
    },
  ],
};

// East Floor 1 — Pool/Terrace on west half
// North: pool | pool | 106 | 104 | 102
// South: pool | pool | 105 | 103 | 101
const east1: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 1",
  label: "Guest Lodge East · Floor 1",
  subtitle: "Pool & Terrace Level",
  showCorridor: true,
  rows: [
    {
      side: "north",
      cells: [pool(), pool(), r("106"), r("104"), r("102")],
    },
    {
      side: "south",
      cells: [pool(), pool(), r("105"), r("103"), r("101")],
    },
  ],
};

// East Floor 2 — 117(suite), 116, 114, [stair], 112, 110, 108, 107(suite)
//                -,         118, 115, [stair], 111, 109, -,   -
// Adjusted to make symmetric 8 columns
const east2: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 2",
  label: "Guest Lodge East · Floor 2",
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

// East Floor 3 — Friends Floor
// 130(suite), 128, 126, [stair], 124, 122, 120, 119(suite)
// -,          129, 127, [stair], 125, 123, 121, -
const east3: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 3 — Friends Floor",
  label: "Guest Lodge East · Floor 3",
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

// East Floor 4 — Devin's Family Wing
// 142(suite), 140, 138, [stair], 136, 134, 132, 131(suite)
// -,          141, 139, [stair], 137, 135, 133, -
const east4: FloorLayout = {
  building: "Guest Lodge East",
  floor: "Floor 4 — Devin's Family Wing",
  label: "Guest Lodge East · Floor 4",
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

// West Floor 2
// 312(suite), 310, 308, 306, [stair], 304, 302, -,   301(suite)
// -,          311, 309, 307, [stair], 305, 303, -,   -
const west2: FloorLayout = {
  building: "Guest Lodge West",
  floor: "Floor 2",
  label: "Guest Lodge West · Floor 2",
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

// West Floor 3
// 324(suite), 322, 320, 318, [stair], 316, 314, -,   313(suite)
// -,          323, 321, 319, [stair], 317, 315, -,   -
const west3: FloorLayout = {
  building: "Guest Lodge West",
  floor: "Floor 3",
  label: "Guest Lodge West · Floor 3",
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

// Big Sky Cabins — single row
const cabins: FloorLayout = {
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
