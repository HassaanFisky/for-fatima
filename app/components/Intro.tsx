"use client";

import { useState } from "react";
import { chord, chime } from "../lib/sound";

const NOTE_LINES = [
  "hey fatima...",
  "I wanted to make something instead of simply sending another message.",
  "Something I could put real thought into.",
  "You don't have to respond to this.\nI just wanted to make something meaningful, and I hope it gives you a small reason to smile.",
];

/** Tiny background stars for the intro. Deterministic so SSR and client match. */
const SPARKS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  delay: (i % 7) * 0.5,
  size: 2 + (i % 3),
}));

export default function Intro({ onEnter }: { onEnter: () => void }) {
  const [open, setOpen] = useState(false);

  const openEnvelope = () => {
    setOpen(true);
    chord();
  };

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16 text-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #e9e0f5 0%, #fbf7f0 55%, #f6e8ee 100%)",
      }}
    >
      {SPARKS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-twinkle absolute rounded-full bg-lilac"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-lg">
        <h1 className="animate-rise font-serif text-5xl text-plum-deep sm:text-6xl">
          for fatima <span aria-hidden>💜</span>
        </h1>
        <p
          className="animate-rise mt-5 text-base leading-relaxed text-ink-soft sm:text-lg"
          style={{ animationDelay: "0.25s" }}
        >
          I made you a little something...
          <br />
          <span className="font-hand text-2xl text-plum">
            no pressure, just a little piece of my heart.
          </span>
        </p>

        {/* envelope */}
        <div
          className={`mx-auto mt-10 ${open ? "envelope-open" : ""}`}
          style={{ perspective: 900 }}
        >
          {!open ? (
            <button
              type="button"
              onClick={openEnvelope}
              aria-label="Open the envelope"
              className="animate-floaty group mx-auto block"
            >
              <svg viewBox="0 0 220 150" width="240" className="drop-shadow-xl transition group-hover:scale-105">
                <rect x="6" y="26" width="208" height="118" rx="10" fill="#f3e9fb" stroke="#cdb9e8" strokeWidth="2" />
                <path d="M6 36 110 100 214 36" fill="none" stroke="#cdb9e8" strokeWidth="2" />
                <path d="M6 144 90 86M214 144 130 86" stroke="#e1d2f1" strokeWidth="2" />
                <path d="M6 26 110 96 214 26Z" fill="#e9dcf6" stroke="#cdb9e8" strokeWidth="2" />
                <g transform="translate(110 78)">
                  <circle r="14" fill="#6b3f7e" />
                  <path d="M0 6c-8-5-8-10-4-11 2 0 3 1 4 3 1-2 2-3 4-3 4 1 4 6-4 11z" fill="#fbf7f0" transform="translate(0 -1) scale(.9)" />
                </g>
              </svg>
              <span className="mt-3 block font-serif text-lg text-plum-deep">Tap to open the envelope</span>
              <span className="text-xs text-ink-soft">a handwritten note inside</span>
            </button>
          ) : (
            <div
              className="animate-pop mx-auto w-full rounded-3xl border border-lilac/70 bg-paper p-6 text-left shadow-2xl shadow-plum/10 sm:p-9"
              role="region"
              aria-label="A note from Hassaan"
            >
              <div className="letter-lines space-y-4 font-hand text-[1.55rem] leading-[2.1rem] text-plum-deep">
                {NOTE_LINES.map((l, i) => (
                  <p
                    key={i}
                    className="animate-rise whitespace-pre-line"
                    style={{ animationDelay: `${0.25 + i * 0.7}s` }}
                  >
                    {l}
                  </p>
                ))}
              </div>
              <div
                className="animate-rise mt-7 flex justify-center"
                style={{ animationDelay: `${0.25 + NOTE_LINES.length * 0.7}s` }}
              >
                <button
                  type="button"
                  onClick={() => {
                    chime(660, 1.4);
                    onEnter();
                  }}
                  className="rounded-full bg-plum-deep px-7 py-3 text-sm font-medium text-ivory shadow-md transition hover:bg-plum"
                >
                  Step inside the little universe ✦
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onEnter}
          className="mt-8 text-xs text-ink-soft underline underline-offset-4 transition hover:text-plum-deep"
        >
          Skip intro and explore →
        </button>
      </div>
    </section>
  );
}
