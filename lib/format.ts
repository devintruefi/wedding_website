/**
 * Render a guest name in a tight, scannable form for the resort map cells —
 * where horizontal space is the binding constraint. The full name continues
 * to render in the Guest Directory below the map and in the room modal.
 *
 *   "Maya + Sunil"                    → "Maya + Sunil"
 *   "Mehak Verma + Guest"             → "Mehak + Guest"
 *   "Mitch + Lisa Soloman"            → "Mitch + Lisa"
 *   "Sanat + Priti + Saloni Patel"    → "Sanat +2"
 *   "Tushar + Urvashi + Amani + Karina" → "Tushar +3"
 *   "Felicia + Harvin + Newborn"      → "Felicia +2"
 *   "Nanny (Stellan)"                 → "Nanny"
 *   "(Open — buffer)"                 → "Open"
 *   "Ba + Dada (on hold)"             → "Ba + Dada"
 *   ""                                → "—"
 */
export function compactGuest(guest: string): string {
  if (!guest) return "—";
  const trimmed = guest.trim();
  const lower = trimmed.toLowerCase();

  if (lower.includes("(open") || lower.includes("open —") || lower.startsWith("open")) {
    return "Open";
  }

  // Strip parenthetical asides like "(on hold)" or "(Stellan)"
  const noParen = trimmed.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
  const base = noParen || trimmed;

  // Split on "+" with optional whitespace
  const parts = base
    .split(/\s*\+\s*/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    // Single name — return as-is, the cell's CSS will line-clamp if needed
    return base;
  }

  if (parts.length === 2) {
    const joined = parts.join(" + ");
    if (joined.length <= 18) return joined;
    // Drop everything after the first word in each part
    const firstA = parts[0].split(/\s+/)[0];
    const firstB = parts[1].split(/\s+/)[0];
    return `${firstA} + ${firstB}`;
  }

  // 3 or more — first person's first name, then "+N" where N is the rest
  const firstFirstName = parts[0].split(/\s+/)[0];
  return `${firstFirstName} +${parts.length - 1}`;
}
