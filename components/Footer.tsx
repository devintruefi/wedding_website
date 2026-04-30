import { Ornament } from "./Ornament";

export function Footer() {
  return (
    <footer className="relative bg-forest-deep text-cream/80 print:hidden">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Ornament className="mx-auto text-copper mb-6" />
        <p className="font-serif italic text-2xl text-cream">
          To the mountains, to a beginning, to forever.
        </p>
        <p className="mt-6 font-sans text-[0.65rem] tracking-ultra-wide uppercase text-cream/55">
          Patel &amp; Patel · Big Sky · June 2026
        </p>
        <p className="mt-2 font-sans text-[0.6rem] tracking-wide text-cream/40">
          Live data · Refreshes from Google Sheets every 60 seconds
        </p>
      </div>
    </footer>
  );
}
