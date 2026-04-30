import { Ornament } from "./Ornament";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-cream">
      {/* Layered mountain silhouette backdrop */}
      <div className="pointer-events-none absolute inset-0">
        {/* Drifting cloud */}
        <div className="absolute inset-x-0 top-12 h-24 opacity-30 animate-drift-slower">
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
          className="absolute inset-x-0 bottom-0 h-[32%] w-full"
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,330 L120,280 L260,320 L400,250 L540,310 L700,240 L860,300 L1020,260 L1180,310 L1320,270 L1460,310 L1600,280 L1600,400 L0,400 Z"
            fill="#0F1709"
          />
        </svg>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest-deep" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="reveal text-center">
          <p className="font-sans text-[0.7rem] tracking-ultra-wide text-copper uppercase">
            One &amp; Only · Moonlight Basin
          </p>
          <Ornament className="mx-auto my-6 text-copper" />
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light leading-[1.05] text-cream">
            <span className="italic font-light">Patel</span>{" "}
            <span className="text-copper-soft">&amp;</span>{" "}
            <span className="italic font-light">Patel</span>
          </h1>
          <p className="mt-8 font-serif italic text-xl sm:text-2xl text-cream/85">
            A celebration in the Montana mountains
          </p>
          <Ornament className="mx-auto my-8 text-copper" />
          <div className="font-sans text-xs sm:text-sm tracking-ultra-wide text-cream/70 uppercase">
            <span>June 25</span>
            <span className="mx-3 text-copper">·</span>
            <span>26</span>
            <span className="mx-3 text-copper">·</span>
            <span>27</span>
            <span className="mx-3 text-copper">·</span>
            <span>28</span>
            <span className="mx-3 text-copper">·</span>
            <span>2026</span>
          </div>
          <p className="mt-3 font-sans text-[0.7rem] tracking-ultra-wide text-cream/55 uppercase">
            Big Sky · Montana
          </p>
        </div>
      </div>
    </section>
  );
}
