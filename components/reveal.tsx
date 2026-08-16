"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ShownContext = createContext(false);

/** Fades + slides children up as a staggered group when they scroll into view. */
export function RevealGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <ShownContext.Provider value={shown}>{children}</ShownContext.Provider>
    </div>
  );
}

export function RevealItem({
  index = 0,
  className = "",
  children,
}: {
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const shown = useContext(ShownContext);
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      {children}
    </div>
  );
}
