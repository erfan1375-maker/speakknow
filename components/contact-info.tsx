import { site } from "@/lib/site";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 7.4 5.6a1 1 0 0 0 1.2 0L20 7" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21.05 3.16 2.63 10.4c-1.24.5-1.23 1.19-.22 1.5l4.72 1.47 1.82 5.6c.22.6.38.85.78.85.32 0 .47-.15.65-.33l1.86-1.8 4.86 3.59c.65.42 1.13.2 1.3-.47l3.53-16.62c.24-.98-.36-1.42-1.68-.83z" />
    </svg>
  );
}

const DETAILS = [
  { Icon: PhoneIcon, label: "شماره تماس", value: site.officePhone, href: site.officePhoneHref },
  { Icon: EmailIcon, label: "ایمیل", value: site.email, href: `mailto:${site.email}` },
  { Icon: PinIcon, label: "آدرس", value: site.address, href: null },
  { Icon: ClockIcon, label: "ساعات پاسخگویی", value: site.supportHours, href: null },
] as const;

const SOCIALS = [
  { Icon: InstagramIcon, label: "اینستاگرام", href: site.instagram },
  { Icon: TelegramIcon, label: "تلگرام", href: site.telegram },
] as const;

export function ContactInfo() {
  return (
    <div className="rounded-card bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-white sm:p-8">
      <h2 className="text-lg font-bold">راه‌های ارتباطی</h2>
      <p className="mt-1 text-sm leading-loose text-white/85">
        هر روز هفته پاسخگوی سؤالات شما هستیم.
      </p>

      <ul className="mt-6 space-y-4">
        {DETAILS.map(({ Icon, label, value, href }) => {
          const content = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-white/70">{label}</span>
                <span className="en block break-words text-sm font-medium">{value}</span>
              </span>
            </>
          );
          return (
            <li key={label}>
              {href ? (
                <a href={href} className="flex items-center gap-3 transition-opacity hover:opacity-85">
                  {content}
                </a>
              ) : (
                <span className="flex items-center gap-3">{content}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-7 border-t border-white/20 pt-6">
        <p className="text-xs text-white/70">شبکه‌های اجتماعی</p>
        <div className="mt-3 flex items-center gap-3">
          {SOCIALS.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
