interface OrnamentProps {
  className?: string;
}

export function Ornament({ className = "" }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="block h-px w-12 bg-current opacity-40" />
      <span className="text-base leading-none">✦</span>
      <span className="block h-px w-12 bg-current opacity-40" />
    </div>
  );
}

export function CompassRose({ className = "" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="32" cy="32" r="22" opacity="0.3" />
        <circle cx="32" cy="32" r="14" opacity="0.4" />
      </g>
      <g fill="currentColor">
        <polygon points="32,8 34.5,30 32,32 29.5,30" opacity="0.95" />
        <polygon points="32,56 29.5,34 32,32 34.5,34" opacity="0.55" />
        <polygon points="56,32 34,29.5 32,32 34,34.5" opacity="0.7" />
        <polygon points="8,32 30,34.5 32,32 30,29.5" opacity="0.7" />
      </g>
      <g fill="currentColor" fontSize="6" fontFamily="serif" textAnchor="middle">
        <text x="32" y="6.5">N</text>
        <text x="32" y="62">S</text>
        <text x="61" y="34">E</text>
        <text x="3" y="34">W</text>
      </g>
    </svg>
  );
}
