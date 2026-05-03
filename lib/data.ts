import Papa from "papaparse";
import type { Room, Side } from "./types";

export const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTX-iQl3OJbbC6EcspKPfsvqV7syVLJMwvLr8o_l5fnLoxnTbP2K7onQuB7O2v77PhPjZ88BF7b9HKx/pub?gid=980928746&single=true&output=csv";

interface RawRow {
  Building: string;
  Floor: string;
  Room: string;
  Type: string;
  Guest: string;
  Side: string;
  Group: string;
  Notes: string;
  Flag: string;
}

function normalizeSide(s: string): Side {
  // Lenient match — accepts "Devin", "Poonam", "Joint", and longer forms like
  // "Joint (bride and groom)" or "Devin's side". Anything else (incl. "TBD"
  // or "Open") falls through.
  const t = (s || "").trim().toLowerCase();
  if (t.startsWith("devin")) return "Devin";
  if (t.startsWith("poonam")) return "Poonam";
  if (t.startsWith("joint")) return "Joint";
  return "TBD";
}

function isOpenGuest(g: string): boolean {
  const t = (g || "").toLowerCase();
  return !g || t.includes("(open") || t.includes("open —") || t.includes("buffer");
}

function isSuiteType(t: string): boolean {
  const s = (t || "").toLowerCase();
  return s.includes("suite") || s.includes("cabin");
}

// Friendlier display label without having to touch the master sheet:
// "Mom's Old & Boring" → "Mom's Older Gen". Case-insensitive match on the
// "Old & Boring" fragment so any future sheet edits to the prefix still flow
// through. If the label is later renamed in the sheet, this is a no-op.
function normalizeGroup(g: string): string {
  const t = (g || "").trim();
  return t.replace(/Old\s*(&|and)\s*Boring/gi, "Older Gen");
}

function toRoom(r: RawRow): Room {
  const room = (r.Room || "").trim();
  return {
    building: (r.Building || "").trim(),
    floor: (r.Floor || "").trim(),
    room,
    type: (r.Type || "").trim(),
    guest: (r.Guest || "").trim(),
    side: normalizeSide(r.Side),
    group: normalizeGroup(r.Group),
    notes: (r.Notes || "").trim(),
    flag: (r.Flag || "").trim().toUpperCase() === "FLAG",
    isOpen: isOpenGuest(r.Guest || ""),
    isSuite: isSuiteType(r.Type || ""),
    isCouple: room === "207",
  };
}

export async function fetchRooms(): Promise<Room[]> {
  const res = await fetch(CSV_URL, {
    next: { revalidate: 60 },
    headers: { "cache-control": "no-cache" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch room chart: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  const parsed = Papa.parse<RawRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  return parsed.data
    .filter((r) => (r.Room || "").trim() !== "")
    .map(toRoom);
}

export function buildLookup(rooms: Room[]): Map<string, Room> {
  const m = new Map<string, Room>();
  for (const r of rooms) m.set(r.room, r);
  return m;
}

export function computeStats(rooms: Room[]) {
  const total = rooms.length;
  const devin = rooms.filter((r) => r.side === "Devin").length;
  const poonam = rooms.filter((r) => r.side === "Poonam").length;
  const joint = rooms.filter((r) => r.side === "Joint").length;
  const openOrFlagged = rooms.filter((r) => r.isOpen || r.flag).length;
  return { total, devin, poonam, joint, openOrFlagged };
}
