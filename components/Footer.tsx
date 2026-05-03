import { Ornament } from "./Ornament";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1Rknh0gDuxgEW6KfbTH0T-_AORABgRE9lrqnLAbj34Tk/edit?usp=sharing";

export function Footer() {
  return (
    <footer className="relative bg-forest-deep text-cream-warm/80 print:hidden">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Ornament className="mx-auto text-copper-soft mb-6" />
        <p className="font-serif italic text-xl sm:text-2xl text-cream-warm">
          To the mountains, to a beginning, to forever.
        </p>
        <p className="mt-6 font-sans text-[0.6rem] sm:text-[0.65rem] tracking-mega-wide uppercase text-cream-warm/60">
          Poonam &amp; Devin · Big Sky · June 2026
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a
            href="/"
            className="rounded-full border border-cream-warm/20 px-3 py-1.5 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-cream-warm/75 hover:border-cream-warm/50 hover:text-cream-warm transition-colors"
          >
            Resort map
          </a>
          <a
            href="/by-group"
            className="rounded-full border border-cream-warm/20 px-3 py-1.5 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-cream-warm/75 hover:border-cream-warm/50 hover:text-cream-warm transition-colors"
          >
            By group
          </a>
          <a
            href="/print"
            className="rounded-full border border-cream-warm/20 px-3 py-1.5 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-cream-warm/75 hover:border-cream-warm/50 hover:text-cream-warm transition-colors"
          >
            Print view
          </a>
          <a
            href={SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-copper/40 bg-copper/10 px-3 py-1.5 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper-soft hover:bg-copper/20 hover:border-copper-soft transition-colors"
          >
            Open spreadsheet ↗
          </a>
        </div>

        <p className="mt-7 font-sans text-[0.55rem] tracking-wide text-cream-warm/35">
          Live data · refreshes from Google Sheets every 60 seconds
        </p>
      </div>
    </footer>
  );
}
