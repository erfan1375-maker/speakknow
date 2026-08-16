import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      role="img"
      aria-label="speakKnow"
    >
      <rect x="0" y="0" width="800" height="800" rx="144" ry="144" fill="#FF7AAC" />
      <path
        d="M 400 408 C 335 315 235 330 226 408 C 235 486 335 501 400 408 C 465 315 565 330 574 408 C 565 486 465 501 400 408 Z"
        fill="none"
        stroke="#0D0D0D"
        strokeWidth="72"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="512" cy="330" r="14" fill="#FF7AAC" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="speakKnow — صفحه اصلی"
    >
      <LogoMark className="h-9 w-9 rounded-[0.5rem] transition-transform duration-300 group-hover:-rotate-6" />
      <span className="en text-[1.4rem] font-semibold tracking-tight" aria-hidden>
        <span className="text-ink">speak</span>
        <span className="text-brand-500">Know</span>
      </span>
    </Link>
  );
}
