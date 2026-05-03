import { Ornament } from "./Ornament";

export function LoadingState() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <Ornament className="text-copper mb-6" />
      <p className="font-serif italic text-2xl text-forest-deep">
        Loading the floor plan…
      </p>
      <p className="mt-3 font-sans text-[0.7rem] tracking-ultra-wide uppercase text-slate-warm">
        Pulling live data from the master sheet
      </p>
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <Ornament className="text-copper mb-6" />
      <p className="font-serif italic text-2xl text-forest-deep">
        The floor plan is briefly unavailable.
      </p>
      <p className="mt-4 font-sans text-sm text-slate-warm max-w-md">
        We couldn't reach the master Google Sheet. Please refresh in a moment.
      </p>
      {message && (
        <p className="mt-3 font-sans text-[0.65rem] tracking-wide text-slate-warm/70">
          {message}
        </p>
      )}
    </div>
  );
}
