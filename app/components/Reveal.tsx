"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fades content in once, when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-8 text-center">
      <p className={`font-hand text-2xl ${dark ? "text-dusty" : "text-plum"}`}>{eyebrow}</p>
      <h2
        className={`font-serif text-3xl sm:text-4xl leading-tight ${
          dark ? "text-ivory" : "text-plum-deep"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mx-auto mt-3 max-w-md text-sm ${dark ? "text-lilac" : "text-ink-soft"}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}
