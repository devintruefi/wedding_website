"use client";

import { useEffect, useRef } from "react";
import type { Room } from "@/lib/types";
import { SIDE_ACCENT, SIDE_LABEL } from "@/lib/sides";

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

export function RoomModal({ room, onClose }: RoomModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!room) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Focus the close button on open for keyboard navigation
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Return focus to the originating button
      lastFocusedRef.current?.focus?.();
    };
  }, [room, onClose]);

  if (!room) return null;

  const accent = SIDE_ACCENT[room.side] ?? "#8A8273";
  const sideLabel = SIDE_LABEL[room.side] ?? room.side;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-forest-deep/65 p-3 sm:p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-taupe/50 bg-cream-bright shadow-paper-lg reveal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent strip */}
        <div className="h-1 w-full" style={{ background: accent }} aria-hidden />

        <div className="px-6 sm:px-7 py-6 sm:py-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-mega-wide uppercase text-copper">
                {room.building} · {room.floor}
              </p>
              <h3
                id="room-modal-title"
                className="mt-2 font-serif text-4xl sm:text-5xl text-forest-deep font-light leading-none"
              >
                Room {room.room}
              </h3>
              <p className="mt-2 font-sans text-[0.65rem] sm:text-[0.7rem] tracking-ultra-wide uppercase text-slate-warm">
                {room.type}
              </p>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close"
              className="text-slate-warm hover:text-forest-deep transition-colors text-3xl leading-none -mt-1"
            >
              ×
            </button>
          </div>

          <div className="my-5 h-px bg-taupe/40" />

          <dl className="grid grid-cols-3 gap-y-4 gap-x-6">
            <dt className="col-span-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm">
              Guest
            </dt>
            <dd className="col-span-2 font-serif text-lg text-forest-deep">
              {room.guest || "—"}
            </dd>

            <dt className="col-span-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm">
              Side
            </dt>
            <dd className="col-span-2 flex items-center gap-2 font-serif text-lg text-forest-deep">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: accent }}
                aria-hidden
              />
              {sideLabel}
            </dd>

            <dt className="col-span-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm">
              Group
            </dt>
            <dd className="col-span-2 font-serif text-lg text-forest-deep">
              {room.group || "—"}
            </dd>

            {room.notes && (
              <>
                <dt className="col-span-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm">
                  Notes
                </dt>
                <dd className="col-span-2 font-serif text-base text-forest-deep/85 italic">
                  {room.notes}
                </dd>
              </>
            )}

            {(room.flag || room.isOpen || room.isSuite || room.isCouple) && (
              <>
                <dt className="col-span-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm">
                  Status
                </dt>
                <dd className="col-span-2 flex flex-wrap gap-2">
                  {room.isCouple && (
                    <Tag tone="copper">Couple's Suite</Tag>
                  )}
                  {room.isSuite && !room.isCouple && (
                    <Tag tone="copper">Suite</Tag>
                  )}
                  {room.isOpen && <Tag tone="muted">Open</Tag>}
                  {room.flag && <Tag tone="copper-strong">Flagged</Tag>}
                </dd>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "copper" | "copper-strong" | "muted";
}) {
  const styles = {
    copper:
      "border-copper bg-copper/10 text-copper",
    "copper-strong":
      "border-copper bg-copper/20 text-copper-deep",
    muted:
      "border-slate-warm/40 bg-cream-warm text-slate-warm",
  } as const;
  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
