"use client";

import type { Room } from "@/lib/types";
import { RESORT_STORIES, LODGE_COLS, cabins } from "@/lib/layouts";
import { Lodge, EmptyLodgeSlot } from "./Lodge";

interface ResortMapProps {
  lookup: Map<string, Room>;
  matchSet: Set<string>;
  dimSet: Set<string>;
  hasFilter: boolean;
  onRoomClick: (r: Room) => void;
}

const STORY_GRID_TEMPLATE = `${LODGE_COLS.east}fr ${LODGE_COLS.main}fr ${LODGE_COLS.west}fr`;

export function ResortMap({
  lookup,
  matchSet,
  dimSet,
  hasFilter,
  onRoomClick,
}: ResortMapProps) {
  return (
    <section
      className="reveal mx-auto mt-10 sm:mt-14 max-w-[1320px] px-3 sm:px-6"
      id="resort-map"
    >
      <header className="mb-6 sm:mb-10 text-center">
        <p className="font-sans text-[0.6rem] tracking-mega-wide uppercase text-copper">
          ✦ The Resort
        </p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl text-forest-deep font-light">
          One &amp; Only Moonlight Basin
        </h2>
        <p className="mt-3 font-serif italic text-base sm:text-lg text-slate-warm/90">
          A top-down view across all four buildings
        </p>
        <CompassStrip />
      </header>

      {/* The architectural paper surface */}
      <div className="paper-surface relative rounded-2xl border border-taupe/40 shadow-paper-lg p-3 sm:p-6 md:p-8">
        {/* Mountain ridge top edge */}
        <RidgeTop />

        {/* Lodge headers — visible on md+ above the cross-section */}
        <div
          className="hidden md:grid gap-3 sm:gap-4 mt-2 mb-3"
          style={{ gridTemplateColumns: STORY_GRID_TEMPLATE }}
        >
          <LodgeColumnHeader title="Guest Lodge East" caption="West façade" />
          <LodgeColumnHeader title="Main Lodge" caption="Center" emphasis />
          <LodgeColumnHeader title="Guest Lodge West" caption="East façade" />
        </div>

        {/* Stories — top floor first (top-down view from above means we present
            level 4 at top so the drawing reads like an architectural elevation) */}
        <div className="space-y-4 sm:space-y-6">
          {RESORT_STORIES.map((story) => (
            <StoryRow
              key={story.level}
              level={story.level}
              label={story.label}
              caption={story.caption}
            >
              {/* East slot */}
              {story.east ? (
                <Lodge
                  layout={story.east}
                  cols={LODGE_COLS.east}
                  lookup={lookup}
                  matchSet={matchSet}
                  dimSet={dimSet}
                  hasFilter={hasFilter}
                  onRoomClick={onRoomClick}
                  miniLabel="East Lodge"
                />
              ) : (
                <EmptyLodgeSlot cols={LODGE_COLS.east} />
              )}

              {/* Main slot */}
              {story.main ? (
                <Lodge
                  layout={story.main}
                  cols={LODGE_COLS.main}
                  lookup={lookup}
                  matchSet={matchSet}
                  dimSet={dimSet}
                  hasFilter={hasFilter}
                  onRoomClick={onRoomClick}
                  miniLabel="Main Lodge · Penthouse"
                />
              ) : (
                <EmptyLodgeSlot cols={LODGE_COLS.main} />
              )}

              {/* West slot */}
              {story.west ? (
                <Lodge
                  layout={story.west}
                  cols={LODGE_COLS.west}
                  lookup={lookup}
                  matchSet={matchSet}
                  dimSet={dimSet}
                  hasFilter={hasFilter}
                  onRoomClick={onRoomClick}
                  miniLabel="West Lodge"
                />
              ) : (
                <EmptyLodgeSlot cols={LODGE_COLS.west} />
              )}
            </StoryRow>
          ))}
        </div>

        {/* Ground separator */}
        <div className="my-6 sm:my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-taupe/60 to-transparent" />
          <span className="font-sans text-[0.55rem] tracking-mega-wide uppercase text-slate-warm/70">
            ↓ Ground level — standalone cabins
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-taupe/60 to-transparent" />
        </div>

        {/* Cabins row */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-baseline justify-between px-2">
            <h3 className="font-serif text-lg sm:text-xl text-forest-deep">
              Big Sky Cabins
            </h3>
            <span className="font-sans text-[0.55rem] tracking-ultra-wide uppercase text-slate-warm/80">
              Two-bed standalone cabins · 420–425
            </span>
          </div>
          <Lodge
            layout={cabins}
            cols={LODGE_COLS.cabin}
            lookup={lookup}
            matchSet={matchSet}
            dimSet={dimSet}
            hasFilter={hasFilter}
            onRoomClick={onRoomClick}
          />
        </div>
      </div>

      {/* Tiny helper hint */}
      <p className="mt-4 text-center font-sans text-[0.65rem] tracking-wide uppercase text-slate-warm/70">
        Tap any room for full details ·{" "}
        <a
          href="#directory"
          className="text-copper hover:text-copper-soft underline underline-offset-2 transition-colors"
        >
          jump to guest directory ↓
        </a>
      </p>
    </section>
  );
}

function StoryRow({
  level,
  label,
  caption,
  children,
}: {
  level: number;
  label: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="story-row">
      {/* Story label band (mobile: full width above; desktop: floating-left) */}
      <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
        <div className="flex items-baseline gap-3">
          <span
            className="font-serif text-2xl sm:text-3xl font-light text-forest-deep/85"
            aria-hidden
          >
            {level}
          </span>
          <div>
            <p className="font-sans text-[0.6rem] tracking-mega-wide uppercase text-copper">
              {label}
            </p>
            {caption && (
              <p className="font-serif italic text-xs sm:text-sm text-slate-warm/85">
                {caption}
              </p>
            )}
          </div>
        </div>
        <span className="hidden sm:inline-block h-px flex-1 max-w-[60%] bg-gradient-to-r from-transparent via-taupe/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-3 lg:gap-4 md:[grid-template-columns:8fr_5fr_9fr]">
        {children}
      </div>
    </div>
  );
}

function LodgeColumnHeader({
  title,
  caption,
  emphasis,
}: {
  title: string;
  caption?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="text-center px-1 pb-2 border-b border-taupe/30">
      <p
        className={`font-serif text-base lg:text-lg font-light ${
          emphasis ? "text-forest-deep" : "text-forest-deep/85"
        }`}
      >
        {title}
      </p>
      {caption && (
        <p className="font-sans text-[0.55rem] tracking-ultra-wide uppercase text-slate-warm/70 mt-0.5">
          {caption}
        </p>
      )}
    </div>
  );
}

function RidgeTop() {
  return (
    <div className="ridge-edge mb-3 -mx-3 sm:-mx-6 md:-mx-8 h-6 rounded-t-2xl pointer-events-none">
      <svg
        viewBox="0 0 1320 24"
        className="w-full h-full opacity-80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,18 L60,8 L130,16 L210,4 L300,14 L380,6 L470,16 L560,9 L660,17 L760,7 L860,15 L950,8 L1050,16 L1140,9 L1240,15 L1320,10 L1320,24 L0,24 Z"
          fill="rgba(34,51,42,0.18)"
        />
      </svg>
    </div>
  );
}

function CompassStrip() {
  return (
    <div className="mt-5 flex items-center justify-center gap-3 font-sans text-[0.55rem] tracking-ultra-wide uppercase text-slate-warm/80">
      <span className="text-copper">East</span>
      <span aria-hidden>←</span>
      <span className="block h-px w-10 bg-taupe/60" aria-hidden />
      <span className="font-serif italic text-xs text-forest-deep/80 normal-case tracking-normal">
        cross-section
      </span>
      <span className="block h-px w-10 bg-taupe/60" aria-hidden />
      <span aria-hidden>→</span>
      <span className="text-copper">West</span>
    </div>
  );
}
