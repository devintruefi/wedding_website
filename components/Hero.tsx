import { Ornament } from "./Ornament";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1Rknh0gDuxgEW6KfbTH0T-_AORABgRE9lrqnLAbj34Tk/edit?usp=sharing";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-cream-warm">
      {/* Utility bar — sits inside the dark hero, top */}
      <UtilityBar />

      {/* Layered mountain silhouette backdrop */}
      <div className="pointer-events-none absolute inset-0">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2613] via-[#1F2A1C] to-[#0F1709]" />

        {/* Stars / fine particles */}
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          aria-hidden
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="stars" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="22" r="0.6" fill="#F0E9D9" opacity="0.6" />
              <circle cx="80" cy="55" r="0.4" fill="#F0E9D9" opacity="0.4" />
              <circle cx="146" cy="18" r="0.5" fill="#F0E9D9" opacity="0.5" />
              <circle cx="48" cy="120" r="0.45" fill="#F0E9D9" opacity="0.5" />
              <circle cx="170" cy="95" r="0.5" fill="#F0E9D9" opacity="0.45" />
              <circle cx="118" cy="160" r="0.4" fill="#F0E9D9" opacity="0.35" />
              <circle cx="35" cy="178" r="0.5" fill="#F0E9D9" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)" />
        </svg>

        {/* Drifting cloud */}
        <div className="absolute inset-x-0 top-16 h-24 opacity-30 animate-drift-slower">
          <svg viewBox="0 0 1600 100" className="h-full w-[200%]" preserveAspectRatio="none">
            <path
              d="M0,60 Q120,30 260,55 T520,55 T780,50 T1040,55 T1300,55 T1600,50 L1600,100 L0,100 Z"
              fill="rgba(240,233,217,0.05)"
            />
          </svg>
        </div>

        {/* Distant ridge */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[55%] w-full"
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,260 L120,200 L240,240 L360,160 L480,210 L620,140 L760,200 L880,150 L1020,210 L1160,170 L1300,230 L1440,180 L1600,220 L1600,400 L0,400 Z"
            fill="#243018"
            opacity="0.55"
          />
        </svg>

        {/* Mid ridge */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[45%] w-full"
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,300 L100,250 L220,290 L340,220 L460,270 L600,200 L740,260 L880,210 L1020,270 L1160,230 L1300,290 L1440,240 L1600,280 L1600,400 L0,400 Z"
            fill="#1A2413"
            opacity="0.85"
          />
        </svg>

        {/* Foreground ridge */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[34%] w-full"
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,330 L120,280 L260,320 L400,250 L540,310 L700,240 L860,300 L1020,260 L1180,310 L1320,270 L1460,310 L1600,280 L1600,400 L0,400 Z"
            fill="#0F1709"
          />
        </svg>

        {/* Low evergreen silhouette */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[14%] w-full opacity-90"
          viewBox="0 0 1600 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <g fill="#0A1106">
            {[...Array(40)].map((_, i) => {
              const x = i * 42 + ((i % 3) * 6);
              const h = 30 + ((i * 13) % 25);
              return (
                <polygon
                  key={i}
                  points={`${x},80 ${x + 8},${80 - h} ${x + 16},80`}
                />
              );
            })}
          </g>
        </svg>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest-deep" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-24 sm:pt-20 sm:pb-32">
        <div className="reveal-stagger flex flex-col items-center text-center">
          {/* Monogram seal */}
          <div
            className="monogram-ring flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-forest-deep/40"
            aria-hidden
          >
            <span className="font-serif text-2xl sm:text-3xl leading-none tracking-tight text-copper-soft">
              <span className="italic">P</span>
              <span className="mx-0.5 align-middle text-base sm:text-lg text-copper">&amp;</span>
              <span className="italic">D</span>
            </span>
          </div>

          <p className="mt-7 font-sans text-[0.62rem] sm:text-[0.7rem] tracking-mega-wide text-copper-soft uppercase">
            One &amp; Only · Moonlight Basin
          </p>

          <h1 className="mt-5 font-serif text-[3.25rem] leading-[1.02] sm:text-7xl md:text-[7.5rem] font-light text-cream-warm">
            <span className="block italic font-light sm:inline">Poonam</span>{" "}
            <span className="gold-text not-italic font-normal">&amp;</span>{" "}
            <span className="block italic font-light sm:inline">Devin</span>
          </h1>

          <p className="mt-6 font-serif italic text-lg sm:text-2xl text-cream-warm/85">
            A celebration in the Montana mountains
          </p>

          <Ornament className="mx-auto my-7 sm:my-8 text-copper-soft" />

          <div className="font-sans text-sm sm:text-base tracking-ultra-wide text-cream-warm uppercase flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>June 25</span>
            <span className="text-copper-soft" aria-hidden>·</span>
            <span>26</span>
            <span className="text-copper-soft" aria-hidden>·</span>
            <span>27</span>
            <span className="text-copper-soft" aria-hidden>·</span>
            <span>28</span>
            <span className="mx-1 text-copper-soft" aria-hidden>—</span>
            <span className="text-copper-soft">2026</span>
          </div>
          <p className="mt-3 font-sans text-[0.6rem] sm:text-[0.7rem] tracking-mega-wide text-cream-warm/55 uppercase">
            Big Sky · Montana
          </p>

          {/* Quick anchor links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="#resort-map"
              className="group inline-flex items-center gap-2 rounded-full border border-copper/60 bg-copper/10 px-5 py-2.5 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-copper-soft transition-all duration-300 hover:border-copper-soft hover:bg-copper/20 hover:shadow-copper"
            >
              Resort map
              <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>↓</span>
            </a>
            <a
              href="#directory"
              className="group inline-flex items-center gap-2 rounded-full border border-cream-warm/30 bg-cream-warm/[0.06] px-5 py-2.5 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-cream-warm/85 transition-all duration-300 hover:bg-cream-warm/[0.12] hover:border-cream-warm/50"
            >
              Guest directory
              <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>↓</span>
            </a>
            <a
              href={SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-cream-warm/30 bg-cream-warm/[0.06] px-5 py-2.5 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-cream-warm/85 transition-all duration-300 hover:bg-cream-warm/[0.12] hover:border-cream-warm/50"
            >
              Open spreadsheet
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>↗</span>
            </a>
          </div>

          {/* Scroll cue */}
          <a
            href="#resort-map"
            className="no-print mt-12 hidden sm:flex flex-col items-center gap-2 text-cream-warm/45 transition-colors hover:text-copper-soft"
            aria-label="Scroll to the resort map"
          >
            <span className="font-sans text-[0.55rem] tracking-mega-wide uppercase">Explore</span>
            <svg className="scroll-cue" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function UtilityBar() {
  return (
    <div className="no-print relative z-10 border-b border-cream-warm/10 bg-forest-deep/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 py-2.5">
        <span className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-mega-wide uppercase text-cream-warm/70">
          Poonam · Devin · Room Chart
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-copper/40 bg-copper/10 px-3 py-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper-soft hover:bg-copper/20 hover:border-copper-soft transition-colors"
            aria-label="Open the master Google Sheet in a new tab"
          >
            <SheetIcon />
            <span className="hidden sm:inline">Edit sheet</span>
            <span className="sm:hidden">Sheet</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function SheetIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  );
}
