"use client";

import { useState, type ReactElement } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { note } from "../lib/sound";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ITEMS: { id: string; title: string; hint: string; message: string; art: ReactElement }[] = [
  {
    id: "envelope",
    title: "A tiny envelope",
    hint: "tap to open",
    message: "Some things deserve more thought than a quick message.",
    art: (
      <svg viewBox="0 0 48 48" width="44" aria-hidden>
        <rect x="6" y="12" width="36" height="25" rx="4" {...stroke} />
        <path d="m6 15 18 13 18-13" {...stroke} />
      </svg>
    ),
  },
  {
    id: "star",
    title: "A quiet star",
    hint: "tap to light it",
    message: "Not everything meaningful needs a perfect explanation.",
    art: (
      <svg viewBox="0 0 48 48" width="44" aria-hidden>
        <path d="m24 7 4.9 10 11 1.6-8 7.7 1.9 10.9L24 31.9 14.2 37.2l1.9-10.9-8-7.7 11-1.6z" {...stroke} />
      </svg>
    ),
  },
  {
    id: "heart",
    title: "A paper heart",
    hint: "tap to unfold",
    message: "Sometimes the smallest details carry the most care.",
    art: (
      <svg viewBox="0 0 48 48" width="44" aria-hidden>
        <path d="M24 39S8 30 8 19a8 8 0 0 1 16-2 8 8 0 0 1 16 2c0 11-16 20-16 20z" {...stroke} />
        <path d="M24 17v22" {...stroke} strokeDasharray="2 4" />
      </svg>
    ),
  },
  {
    id: "flower",
    title: "A small flower",
    hint: "tap to see",
    message: "Good things grow slowly, and nobody should have to rush them.",
    art: (
      <svg viewBox="0 0 48 48" width="44" aria-hidden>
        <circle cx="24" cy="18" r="4" {...stroke} />
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="24" cy="9" rx="3.5" ry="5" transform={`rotate(${a} 24 18)`} {...stroke} />
        ))}
        <path d="M24 27v16M24 36c-5 0-8-3-8-6 5 0 8 2 8 6z" {...stroke} />
      </svg>
    ),
  },
  {
    id: "box",
    title: "A memory box",
    hint: "tap to peek",
    message: "Only real moments belong in here, so it stays honest and a little bit empty until they do.",
    art: (
      <svg viewBox="0 0 48 48" width="44" aria-hidden>
        <rect x="8" y="20" width="32" height="20" rx="3" {...stroke} />
        <path d="M6 14h36v6H6zM24 14v26" {...stroke} />
        <path d="M24 14c-4-6-10-5-9-2s6 2 9 2c3 0 8 1 9-2s-5-4-9 2z" {...stroke} />
      </svg>
    ),
  },
];

export default function Details() {
  const [active, setActive] = useState<string | null>(null);
  const current = ITEMS.find((i) => i.id === active);

  return (
    <section id="details" className="mx-auto max-w-4xl px-5 py-20">
      <SectionHeading
        eyebrow="chapter one"
        title="The Little Details"
        sub="Tap an object to see the thought kept inside it."
      />
      <Reveal>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {ITEMS.map((it, idx) => {
            const on = active === it.id;
            return (
              <li key={it.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setActive(on ? null : it.id);
                    note(idx);
                  }}
                  className={`flex h-full w-full flex-col items-center gap-2 rounded-2xl border p-4 text-center transition duration-300 hover:-translate-y-1 ${
                    on
                      ? "border-plum-deep bg-plum-deep text-ivory shadow-lg"
                      : "border-lilac/60 bg-paper text-plum hover:border-plum"
                  }`}
                >
                  <span className={on ? "animate-pop" : ""}>{it.art}</span>
                  <span className="font-serif text-sm">{it.title}</span>
                  <span className={`text-[11px] ${on ? "text-lilac" : "text-ink-soft"}`}>{it.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
      <div className="mt-6 min-h-[7.5rem]" aria-live="polite">
        {current && (
          <figure
            key={current.id}
            className="animate-pop mx-auto max-w-xl rounded-3xl border border-lilac/60 bg-paper px-7 py-6 text-center shadow-sm"
          >
            <blockquote className="font-serif text-lg italic leading-relaxed text-plum-deep sm:text-xl">
              “{current.message}”
            </blockquote>
          </figure>
        )}
      </div>
    </section>
  );
}
