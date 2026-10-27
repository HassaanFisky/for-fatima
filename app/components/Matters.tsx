"use client";

import { useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { note } from "../lib/sound";

const CARDS = [
  {
    id: "listening",
    title: "Listening",
    quote: "Understanding someone starts with listening, not assuming.",
    deep: "It means hearing what was actually said, and what wasn't, without rushing to fill the silence or fix it with my own version. Listening once, properly, so you never have to repeat yourself.",
    glyph: (
      <path d="M6 15c0-6 4-10 9-10s8 3 8 8c0 4-3 5-4 8-1 3-3 4-5 4M12 14c0-2 2-3 3-3s3 1 3 3-2 2-2 4" />
    ),
  },
  {
    id: "respect",
    title: "Respect",
    quote: "When someone says no, their words deserve respect.",
    deep: "A boundary is not a puzzle to solve or a wall to push on. It's information about what you need. Taking it seriously the first time is the whole point.",
    glyph: <path d="M14 3 5 7v6c0 6 4 10 9 12 5-2 9-6 9-12V7zM10 14l3 3 5-6" />,
  },
  {
    id: "consistency",
    title: "Consistency",
    quote: "Real change is something you show over time, not something you announce once.",
    deep: "Words are easy on one emotional night. Change is the quiet, repeated, unremarkable choices made when nobody is watching and nobody is keeping score.",
    glyph: <path d="M4 20 11 13l4 4 9-10M18 7h6v6" />,
  },
];

export default function Matters() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="matters" className="mx-auto max-w-5xl px-5 py-20">
      <SectionHeading
        eyebrow="chapter three"
        title="The Things That Matter"
        sub="Tap a card to read the thought underneath."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((c, i) => {
          const on = open === c.id;
          return (
            <Reveal key={c.id} delay={i * 100}>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => {
                  setOpen(on ? null : c.id);
                  note(i + 2);
                }}
                className={`h-full w-full rounded-3xl border p-6 text-left transition duration-300 hover:-translate-y-1 ${
                  on
                    ? "border-plum bg-paper shadow-xl shadow-plum/10"
                    : "border-lilac/60 bg-paper/80 hover:border-plum/60"
                }`}
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-lavender text-plum">
                  <svg viewBox="0 0 28 28" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {c.glyph}
                  </svg>
                </span>
                <h3 className="font-serif text-2xl text-plum-deep">{c.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink">“{c.quote}”</p>
                <div
                  className={`grid transition-all duration-500 ${on ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden border-t border-lavender pt-0 text-sm leading-relaxed text-ink-soft">
                    <span className="block pt-4">{c.deep}</span>
                  </p>
                </div>
                <span className="mt-4 block text-xs text-plum">{on ? "close" : "read more"}</span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
