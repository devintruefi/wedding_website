"use client";

import { useEffect } from "react";
import type { Room } from "@/lib/types";

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

const SIDE_ACCENT: Record<string, string> = {
  Devin: "#3E5C76",
  Poonam: "#A8527A",
  Joint: "#C9A040",
  TBD: "#8A8273",
};

export function RoomModal({ room, onClose }: RoomModalProps) {
  useEffect(() => {
    if (!room) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [room, onClose]);

  if (!room) return null;

  const accent = SIDE_ACCENT[room.side] ?? "#8A8273";

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-forest-deep/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-lg border border-taupe/50 bg-cream-warm shadow-2xl reveal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent strip */}
        <div className="h-1 w-full" style={{ background: accent }} aria-hidden />

        <div className="px-7 py-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-[0.65rem] tracking-ultra-wide uppercase text-copper">
                {room.building} · {room.floor}
              </p>
              <h3
                id="room-modal-title"
                className="mt-2 font-serif text-5xl text-forest-deep font-light"
              >
                Room {room.room}
              </h3>
              <p className="mt-1 font-sans text-[0.7rem] tracking-ultra-wide uppercase text-slate-warm">
                {room.type}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-slate-warm hover:text-forest-deep transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="my-5 h-px bg-taupe/40" />

          <dl className="grid grid-cols-3 gap-y-4 gap-x-6">
            <dt className="col-span-1 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-slate-warm">
              Guest
            </dt>
            <dd className="col-span-2 font-serif text-lg text-forest-deep">
              {room.guest || "—"}
            </dd>

            <dt className="col-span-1 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-slate-warm">
              Side
            </dt>
            <dd className="col-span-2 flex items-center gap-2 font-serif text-lg text-forest-deep">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: accent }}
                aria-hidden
              />
              {room.side}
            </dd>

            <dt className="col-span-1 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-slate-warm">
              Group
            </dt>
            <dd className="col-span-2 font-serif text-lg text-forest-deep">
              {room.group || "—"}
            </dd>

            {room.notes && (
              <>
                <dt className="col-span-1 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-slate-warm">
                  Notes
                </dt>
                <dd className="col-span-2 font-serif text-base text-forest-deep/85 italic">
                  {room.notes}
                </dd>
              </>
            )}

            {(room.flag || room.isOpen || room.isSuite || room.isCouple) && (
              <>
                <dt className="col-span-1 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-slate-warm">
                  Status
                </dt>
                <dd className="col-span-2 flex flex-wrap gap-2">
                  {room.isCouple && (
                    <span className="rounded-full border border-copper bg-copper/10 px-2.5 py-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper">
                      Couple's Suite
                    </span>
                  )}
                  {room.isSuite && !room.isCouple && (
                    <span className="rounded-full border border-copper bg-copper/10 px-2.5 py-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper">
                      Suite
                    </span>
                  )}
                  {room.isOpen && (
                    <span className="rounded-full border border-slate-warm/40 bg-cream px-2.5 py-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-slate-warm">
                      Open
                    </span>
                  )}
                  {room.flag && (
                    <span className="rounded-full border border-copper bg-copper/15 px-2.5 py-1 font-sans text-[0.6rem] tracking-ultra-wide uppercase text-copper">
                      Flagged
                    </span>
                  )}
                </dd>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
