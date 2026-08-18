type IconProps = { className?: string };

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2.2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12.5c2.8 1.4 5.6 2.1 9 2.1s6.2-.7 9-2.1" />
    </svg>
  );
}

export function OpenBookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6.5c-1.8-1.4-4-2-6.5-2A2.5 2.5 0 0 0 3 7v10.5c2.5 0 4.7.6 6.5 2 1.8-1.4 4-2 6.5-2s4-.6 6.5-2V7A2.5 2.5 0 0 0 19.5 4.5c-2.5 0-4.7.6-6.5 2Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export function RibbonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="m9 13-2 8 5-2.5L17 21l-2-8" />
    </svg>
  );
}

export function BubblesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4a6 6 0 0 0-5 9.3L3 18l4.7-1a6 6 0 1 0 1.3-13Z" />
      <path d="M20.8 12.3A5 5 0 0 0 14 6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12.5 9 17l10.5-10.5" />
    </svg>
  );
}
