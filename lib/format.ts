export interface MapLabel {
  /** First name of the lead occupant — the scannable token for a floor-plan cell. */
  name: string;
  /** How many additional occupants share the room (for a subtle "+N"). */
  extra: number;
  /** True when the room is open / unassigned. */
  isOpen: boolean;
}

/**
 * Floor-plan label for a resort-map cell: just the lead occupant's first name
 * plus a count of any others. Cells are too narrow for full names — the full
 * roster lives in the hover tooltip, the modal, and the Guest Directory.
 *
 *   "Maya + Sunil"                 → { name: "Maya",  extra: 1 }
 *   "Priya Shah"                   → { name: "Priya", extra: 0 }
 *   "Sanat + Priti + Saloni Patel" → { name: "Sanat", extra: 2 }
 *   "Nanny (Stellan)"              → { name: "Nanny", extra: 0 }
 *   "(Open — buffer)"              → { name: "Open",  extra: 0, isOpen: true }
 *   ""                             → { name: "—",     extra: 0 }
 */
export function mapLabel(guest: string): MapLabel {
  if (!guest) return { name: "—", extra: 0, isOpen: false };
  const trimmed = guest.trim();
  const lower = trimmed.toLowerCase();

  if (
    lower.includes("(open") ||
    lower.includes("open —") ||
    lower.startsWith("open") ||
    lower.includes("buffer")
  ) {
    return { name: "Open", extra: 0, isOpen: true };
  }

  const noParen = trimmed
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const base = noParen || trimmed;

  const parts = base
    .split(/\s*\+\s*/)
    .map((p) => p.trim())
    .filter(Boolean);

  const firstName = (parts[0] || base).split(/\s+/)[0];
  return { name: firstName, extra: Math.max(0, parts.length - 1), isOpen: false };
}
