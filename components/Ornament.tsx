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
