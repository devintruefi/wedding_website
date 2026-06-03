interface OrnamentProps {
  className?: string;
}

/**
 * A refined gold motif: a thin rule that tapers into a small center diamond
 * flanked by two dots. Reads as an engraved invitation flourish rather than a
 * generic asterisk. Inherits color via `currentColor`.
 */
export function Ornament({ className = "" }: OrnamentProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden
    >
      <span className="block h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-current opacity-50" />
      <span className="block h-1 w-1 rotate-45 bg-current opacity-60" />
      <span className="block h-1.5 w-1.5 rotate-45 border border-current opacity-90" />
      <span className="block h-1 w-1 rotate-45 bg-current opacity-60" />
      <span className="block h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-current opacity-50" />
    </div>
  );
}
