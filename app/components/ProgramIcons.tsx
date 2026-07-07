type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FlameIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c1 3-2.5 4.5-2.5 8a4 4 0 0 0 8 0c0-1.2-.5-2-1-2.7.2 1.5-.6 2.2-1.3 2.2-1 0-1.4-.8-1.2-1.8.3-1.5-.5-3-2-5.7Z" />
      <path d="M9.5 13c-1 1.2-1.5 2.3-1.5 3.5a4 4 0 0 0 8 0c0-.6-.1-1.2-.3-1.8" />
    </svg>
  );
}

export function DumbbellIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="9" width="3" height="6" rx="1" />
      <rect x="19" y="9" width="3" height="6" rx="1" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="8" y1="7" x2="8" y2="17" />
      <line x1="16" y1="7" x2="16" y2="17" />
    </svg>
  );
}

export function BalanceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="3" x2="12" y2="19" />
      <line x1="4" y1="7" x2="20" y2="7" />
      <path d="M4 7l-2.5 5.5a2.8 2.8 0 0 0 5 0L4 7Z" />
      <path d="M20 7l-2.5 5.5a2.8 2.8 0 0 0 5 0L20 7Z" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
  );
}

export function LaptopIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4.5" width="16" height="10.5" rx="1.2" />
      <line x1="2" y1="19" x2="22" y2="19" />
      <line x1="9" y1="19" x2="15" y2="19" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4c-9 0-15 5-15 13 0 .6.1 1.2.2 1.8C13 18 20 13 20 4Z" />
      <path d="M5.5 18.5C9 15 12.5 11.5 17 8" />
    </svg>
  );
}
